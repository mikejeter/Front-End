import React, { useState } from 'react';
import { Card, CardText, Form, Input, Label, CardBody, CardTitle, CardSubtitle, Button, FormGroup } from 'reactstrap';
import { connect } from 'react-redux';

import './card.css';

// import "react-datepicker/dist/react-datepicker.css";
// import DatePicker from 'react-datepicker';


import { deleteTodo, getList, editTodo } from '../../actions';
import axiosWithAuth from '../../utils/axiosWithAuth';


const CardItem = props => {

  const currentDate = new Date(2017, 5, 25);


  const initFormData = {
    id: Date.now(),
    title: '',
    description: '',
    completeDate: '',
    complete: 0,
    users_id: 2
  }

  const [editing, setEditing] = useState(false);

  const [dataToEdit, setDataToEdit] = useState({});

  const [formData, setFormData] = useState(initFormData);

  const handleChange = evt => {
    const { name, value } = evt.target;
    setDataToEdit({ ...dataToEdit, [name]: value });
  };

  const dateChange = date => {
    // setDate(date);
    setFormData({ ...formData, completeDate: date })
    // console.log('DATE:', date);
    // console.log('formdata have date?', formData)
  }

  const handleClick = () => {
    const newFormData = {
      ...dataToEdit,
      completeDate: Date.now()
    };
    // console.log('new form data', newFormData)
    // console.log('testing handleClick', formData.completeDate)
    props.editTodo(newFormData)
      .then(() => props.getList());
    // setFormData(initFormData);
  };

  // let className = 'complete';

  const changeStyling = () => {
    if (props.props.complete === 1) {
      // console.log('class changing?', props.props.complete)
      return 'completed_now';
    }
  }

  return (
    <div className='cardItem'>

      <Card width='33%' className={changeStyling()}>

        <CardBody>
          {/* <CardText className='editlink' onEdit={editPop}>Edit</CardText> */}
          {/* Insert route, link to an edit page/popover */}
          <CardTitle>Task: {props.props.title}</CardTitle>
          <CardSubtitle>Description: {props.props.description}</CardSubtitle>
          <CardText>Due date: {props.props.completeDate}</CardText>
          <Button
            color="primary"
            className="edit_task"
            onClick={
              e => {
                e.stopPropagation();
                // console.log('is c date working', currentDate);
                // console.log('test edit button response', props.props.id);
                setEditing(true);
                axiosWithAuth()
                  .get(`/api/task/${props.props.id}`)
                  .then(res => {
                    setDataToEdit(res.data);
                    // console.log('is res working', res.data)
                    // console.log('seeing if form data worked', dataToEdit)
                  })
                  .catch(err => console.log(err))

                // props.editTodo(props.props.id)
                // .then(() => props.getList())
              }}>Edit</Button>

          {/* <Button className="update-button" onClick={() => {
            console.log('test NEW edit button', props.props.id);
            this.props.history.push(`/update-task/${props.props.id}`)
          }}>Update Task</Button> */}

          <Button
            color='danger'
            className="delete_task"
            onClick={
              // () =>
              // deleteTodo(props.props)
              e => {
                e.stopPropagation();
                // console.log('testing delete button response', props.props);
                // console.log(deleteTodo)
                props.deleteTodo(props.props).then(() => props.getList());
              }
            }>Delete</Button>
          {/* <Button className='donebtn' onDone={doneStatus}>Done</Button> */}
          {/* Done checkbox will change status of the ticket. This element is NOT available for already 'Done' todo cards */}
          <CardText>{props.props.due_date}</CardText>
          <Button
            color="success"
            className="completed_button"
            onClick={
              e => {
                e.preventDefault();
                // console.log('what is the complete field', props.props.complete);
                setFormData(
                  props.props.complete = 1)
                // console.log('what is the complete field', props.props);
              }}

          >Mark complete</Button>
        </CardBody>

        {editing &&
          <Form className="todo-form"
            onSubmit={e => {
              e.preventDefault();
              e.stopPropagation();
              handleClick();
            }} >
            <CardTitle>Add your next todo</CardTitle>
            <CardBody>
              <FormGroup>
                <Input
                  type='text'
                  name="title"
                  placeholder="Task title"
                  onChange={handleChange}
                  value={dataToEdit.title} />
              </FormGroup>
              <FormGroup>
                <Input
                  type='textarea'
                  name="description"
                  placeholder="Describe your task"
                  onChange={handleChange}
                  value={dataToEdit.description} />
              </FormGroup>
              <FormGroup>
                <Label for="data">Due date</Label><br />
                {/* <DatePicker name='date' selected={dataToEdit.completeDate} onChange={dateChange} /> */}
              </FormGroup>
              <Button type="submit">Submit Edits</Button>
              {/* <Button onClick={props.clearTodos}>Clear all</Button> */}
            </CardBody>
          </Form>}


      </Card>

    </div >
  );
}

const mapStateToProps = state => {
  return {

  }
}

export default connect(
  mapStateToProps,
  { deleteTodo, getList, editTodo }
)(CardItem);
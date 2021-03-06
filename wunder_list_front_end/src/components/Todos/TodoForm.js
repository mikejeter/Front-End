import React, { useState } from 'react';
import '../../App.css';
import "react-datepicker/dist/react-datepicker.css";
// import DatePicker from 'react-datepicker';

import { connect } from 'react-redux';

import { Card, CardTitle, Form, CardBody, FormGroup, Input, Label, Col, Button } from 'reactstrap';

import { addTodo, getList } from '../../actions';

function TodoForm(props) {

  const initFormData = {
    id: Date.now(),
    title: '',
    description: '',
    completeDate: '03/05/2020',
    complete: 0,
    users_id: 2
  }

  const [formData, setFormData] = useState(initFormData);
  // const [date, setDate] = useState(Date.now());

  const handleChange = evt => {
    const { name, value } = evt.target;
    // console.log(formData)
    setFormData({ ...formData, [name]: value });
  };

  // const dateChange = date => {
  //   setDate(date);
  //   setFormData({ ...formData, completeDate: date })
  //   console.log('DATE:', date);
  //   console.log('formdata have date?', formData)
  // }

  const handleClick = () => {
    // const newFormData = {
    //   ...formData,
    //   completeDate: ""
    // };
    // console.log('form data', formData)
    // console.log('testing handleClick', formData.completeDate)
    props.addTodo(formData)
      .then(() => props.getList());
    setFormData(initFormData);
  };

  // const { title, description } = formData;
  // console.log(typeof formData.completeDate)
  return (
    <Card>
      <Form className="todo-form"
        onSubmit={e => {
          e.preventDefault();
          e.stopPropagation();
          handleClick();
        }} >
        <CardTitle className='todo-title'>Add your next todo</CardTitle>
        <CardBody>
          <FormGroup>
            <Input
              type='text'
              name="title"
              placeholder="Task title"
              onChange={handleChange}
              value={formData.title} />
          </FormGroup>
          <FormGroup>
            <Input
              type='textarea'
              name="description"
              placeholder="Describe your task"
              onChange={handleChange}
              value={formData.description} />
          </FormGroup>
          {/* <FormGroup>
            <Input
              type='date'
              name="date"
              placeholder="pick your due date"
              onChange={dateChange}
              value={formData.completeDate} />
          </FormGroup> */}

          {/* <FormGroup row>
            <Label for="data" sm={4}>Due date</Label>
              <DatePicker name='date' selected={formData.completeDate} onChange={dateChange} />
          </FormGroup> */}
          <Button type="submit">Add</Button>

        </CardBody>
      </Form>
    </Card>

  );
}

const mapStateToProps = state => {
  return {

  }
}

export default connect(
  mapStateToProps,
  { addTodo, getList }
)(TodoForm);

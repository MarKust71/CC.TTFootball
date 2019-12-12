import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Form, Input, TextArea, Button } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

class NewLeague extends React.Component {
  state = {
    name: '',
    description: '',
    startDate: '',
    postSuccessful: false,
  };

  handleInputChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  };
  handleDateChange = date => {
    this.setState({
      startDate: date,
    });
  };

  onFormSubmit = async e => {
    e.preventDefault();

    await axios({
      url: '/api/leagues',
      method: 'post',
      data: {
        name: this.state.name,
        description: this.state.description,
        date: { started: this.state.startDate },
        rounds: 2,
        matchFrequency: 3,
      },
      headers: {
        'x-auth-token': localStorage.getItem('token'),
      },
    })
      .then(postLeague => {
        alert(`Założone!!
            ${postLeague.data.owner.name} - jesteś sędzią głównym w lidze: ${postLeague.data.name}`);
        this.setState({ postSuccessful: true });
      })
      .catch(postLeague => {
        alert(postLeague.response.data[0].message || postLeague.response.data);
      });
  };

  render() {
    if (this.state.postSuccessful) return <Redirect to="/Leagues" />;
    return (
      <div >
        <Form onSubmit={this.onFormSubmit}>
          <Form.Group >
            <Form.Input
              name="name"
              control={Input}
              label="Nazwa"
              placeholder="Jak nazwiesz ligę?"
              onChange={this.handleInputChange}
              width={12}
            />
            <Form.Input name="date" label="Data startu">
              {
                <DatePicker
                  selected={this.state.startDate}
                  onChange={this.handleDateChange}
                  minDate={Date.now()}
                  placeholderText="Kiedy zaczynacie?"
                />
              }
            </Form.Input>
          </Form.Group>
          <Form.Input
            name="description"
            control={TextArea}
            maxLength="255"
            label="Opis (opcjonalny)"
            placeholder="Dodaj kilka słów, jeśli chcesz"
            onChange={this.handleInputChange}
            // value={this.state.description}
          />
          <Button type="submit" id="submit" content="Załóż" />
        </Form>
      </div>
    );
  }
}

export default NewLeague;

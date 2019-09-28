import React from 'react';
import axios from 'axios';
import { Button, Checkbox, Form, Segment } from 'semantic-ui-react';

class Register extends React.Component {
  state = {
    division: 'WRO',
    divisions: [
      { text: 'Wrocek', value: 'WRO', selected: true },
      { text: 'Warszawka', value: 'WAR' },
      { text: 'Kraków', value: 'KRA' },
    ],
  };

  componentDidMount() {
    this.getDivisions();
  }

  getDivisions = async () => {
    try {
      const { data } = await axios.get('/api/division');
      console.log(data);
      const divisions = data.filter(({ status }) => status !== 'deleted').map(({ _id }) => ({ value: _id, text: _id }));
      this.setState({ divisions });
    } catch (ex) {
      console.error(ex);
    }
  };

  onFormChange = ({ target }, { name, value }) => {
    //zamiane na controlled, walidacje i pierdoly zostawiam Tobie Piotrek
    this.setState({ [name]: value });
  };

  onFormSubmit = async e => {
    e.preventDefault();
    const [nick, email, pass, , name, surname] = e.target;

    const response = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify({
        email: email.value,
        password: pass.value,
        nickname: nick.value,
        name: name.value,
        surname: surname.value,
        division: this.state.division,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      alert('Konto utworzone, teraz weź się zaloguj');
    } else {
      alert('Error');
    }
  };

  render() {
    return (
      <Segment>
        Rejestracja
        <Form onSubmit={this.onFormSubmit}>
          <Form.Input name="nickname" label="Nick" placeholder="Nick" onChange={this.onFormChange} />
          <Form.Input name="email" type="email" label="Email" placeholder="Email" />
          <Form.Input type="password" label="Hasło" placeholder="Hasło" />
          <Form.Input type="password" label="Powtórz hasło" placeholder="Powtórz hasło" />
          <Form.Input label="Imie" placeholder="Imie" />
          <Form.Input label="Nazwisko" placeholder="Nazwisko" />
          <Form.Select
            name="division"
            options={this.state.divisions}
            label="Dywizja"
            value={this.state.division}
            onChange={this.onFormChange}
          />
          <Form.Field>
            <Checkbox label="Akceptuje regulamin i zgadzam się z warunkami użytkowania" />
          </Form.Field>
          <Button type="submit">Rejestruj!</Button>
        </Form>
      </Segment>
    );
  }
}

export default Register;

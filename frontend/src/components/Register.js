import React from 'react';
import { Button, Checkbox, Form, Segment, Message } from 'semantic-ui-react';

class Register extends React.Component {
  state = {
    nickname: '',
    email: '',
    password: '',
    passwordr: '',
    name: '',
    surname: '',
    division: 'WRO',
    invalidData: false
  };

  divisions = [
    { text: 'Wrocek', value: 'WRO', selected: true },
    { text: 'Warszawka', value: 'WAR' },
    { text: 'Kraków', value: 'KRA' },
  ];

  onFormChange = ({ target }, { name, value }) => {
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
      this.setState({ invalidData: true });
    }
  };

  render() {
    return (
      <Segment>
        {this.state.invalidData && <NegativeMessage />}
        <Form onSubmit={this.onFormSubmit}>
          <Form.Input name="nickname" label="Nick" placeholder="Nick" onChange={this.onFormChange} />
          <Form.Input name="email" type="email" label="Email" placeholder="Email" onChange={this.onFormChange} />
          <Form.Input type="password" label="Hasło" placeholder="Hasło" onChange={this.onFormChange} />
          <Form.Input type="password" label="Powtórz hasło" placeholder="Powtórz hasło" onChange={this.onFormChange} />
          <Form.Input label="Imie" placeholder="Imie" onChange={this.onFormChange} />
          <Form.Input label="Nazwisko" placeholder="Nazwisko" onChange={this.onFormChange} />
          <Form.Select
            name="division"
            options={this.divisions}
            label="Dywizja"
            value={this.state.division}
            onChange={this.onFormChange}
          />
          <Form.Field>
            <Checkbox label="Akceptuję regulamin i zgadzam się z warunkami użytkowania" />
          </Form.Field>
          <Button type="submit">Rejestruj!</Button>
        </Form>
      </Segment>
    );
  }
}

const NegativeMessage = () => (
  <Message negative>
    <Message.Header>Coś nie wyszło</Message.Header>
    <p>Spróbuj ponownie wypełnić formularz</p>
  </Message>
);
export default Register;

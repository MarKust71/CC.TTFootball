import React from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Form, Segment } from 'semantic-ui-react';

import Store from '../Store';

class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  static contextType = Store;

  onFormSubmit = async e => {
    e.preventDefault();
    const [email, password] = e.target;

    const response = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.status === 200) {
      const token = response.headers.get('x-auth-token');
      localStorage.setItem('token', token);
      await response.json();
      this.context.changeStore('isLogged', true);
    } else {
      alert('Błędny email lub hasło');
    }
  };

  render() {
    if (this.context.isLogged) return <Redirect to="/" />;
    return (
      <Segment>
        Logowanie
        <Form onSubmit={this.onFormSubmit}>
          <Form.Input name="email" type="email" label="Email" placeholder="Email" />
          <Form.Input type="password" label="Hasło" placeholder="Hasło" />
          <Button type="submit">Zaloguj!</Button>
        </Form>
      </Segment>
    );
  }
}

export default Login;

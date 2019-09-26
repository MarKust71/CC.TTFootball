import React from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Form, Segment } from 'semantic-ui-react';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLogged: false };
  }

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
      console.log(token);
      localStorage.setItem('token', token);
      const jason = await response.json();
      console.log(jason);
      console.log('zalogowano');
      this.setState({ isLogged: true });
    } else {
      alert('Błędny email lub hasło');
    }
  };

  render() {
    if (this.state.isLogged) return <Redirect to="/" />;
    return (
        <Segment inverted>
          Logowanie
        <Form inverted onSubmit={this.onFormSubmit}>
          <Form.Input name="email" type="email" label="Email" placeholder="Email" />
          <Form.Input type="password" label="Hasło" placeholder="Hasło" />
          <Button type="submit">Zaloguj!</Button>
        </Form>
        </Segment>      
    );
  }
}

export default Login;

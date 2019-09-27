import React from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Form, Segment, Message } from 'semantic-ui-react';

import Store from '../Store';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLogged: false, invalidData: false, termEmail: '', termPass: '' };
  }

  static contextType = Store;

  onFormSubmit = async e => {
    e.preventDefault();
    const [email, password] = [this.state.termEmail, this.state.termPass];

    const response = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
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
      this.setState({ invalidData: true });
    }
  };

  render() {
    if (this.context.isLogged) return <Redirect to="/" />;
    return (
      <Segment>
        Logowanie
        {this.state.invalidData && <NegativeMessage />}
        <Form onSubmit={this.onFormSubmit}>
          <Form.Input
            name="email"
            type="email"
            label="Email"
            placeholder="Email"
            value={this.state.termEmail}
            onChange={e => this.setState({ termEmail: e.target.value })}
          />
          <Form.Input
            type="password"
            label="Hasło"
            placeholder="Hasło"
            value={this.state.termPass}
            onChange={e => this.setState({ termPass: e.target.value })}
          />
          <Button type="submit">Zaloguj!</Button>
        </Form>
      </Segment>
    );
  }
}

const NegativeMessage = () => (
  <Message negative>
    <Message.Header>Błędny email lub hasło</Message.Header>
    <p>Spróbuj ponownie</p>
  </Message>
);

export default Login;

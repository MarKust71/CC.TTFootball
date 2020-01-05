import React from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Form, Segment } from 'semantic-ui-react';
import NegativeMessage from './NegativeMessage';
import jwt from 'jwt-decode';

import Store from '../Store';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLogged: false, invalidData: false, termNick: '', termPass: '' };
  }

  static contextType = Store;

  onFormSubmit = async e => {
    e.preventDefault();
    const [nick, password] = [this.state.termNick, this.state.termPass];

    const response = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({
        nick,
        password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.status === 200) {
      const token = response.headers.get('x-auth-token');
      localStorage.setItem('token', token);
      localStorage.setItem('id', jwt(token)._id);
      await response.json();
      this.context.changeStore('isLogged', true);
      this.setState({ isLogged: true });
    } else {
      this.setState({ invalidData: true });
    }
  };

  render() {
    if (this.context.isLogged) return <Redirect to="/" />;
    return (
      <Segment>
        Logowanie
        {this.state.invalidData && <NegativeMessage header="Błędny email lub hasło" />}
        <Form onSubmit={this.onFormSubmit}>
          <Form.Input
            name="nick"
            type="string"
            label="Nick"
            placeholder="Nick"
            value={this.state.termNick}
            onChange={e => this.setState({ termNick: e.target.value })}
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

export default Login;

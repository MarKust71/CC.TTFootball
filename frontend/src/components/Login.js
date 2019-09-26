import React from 'react';
import { Redirect } from 'react-router-dom';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLogged: false };
  }

  submitLogin = async e => {
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
      <div className=" ui container">
        <div className="ui segment">Logowanie</div>
        <form className="ui form" onSubmit={this.submitLogin}>
          <div className="field">
            <label htmlFor="E-mail">E-mail</label>
            <input className="login-input" type="text" name="E-mail" placeholder="E-mail" />
          </div>
          <div className="field">
            <label htmlFor="Password">Hasło</label>
            <input className="login-input" type="password" name="Password" placeholder="Password" />
          </div>
          <button type="submit" className="ui basic green button">
            Zaloguj
          </button>
        </form>
      </div>
    );
  }
}

export default Login;

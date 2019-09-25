import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  submitLogin = () => {
    console.log('zalogowano');
  };

  render() {
    return (
      <div className=" ui container">
        <div className="ui segment">Logowanie</div>
        <form className="ui form">
          <div className="field">
            <label htmlFor="E-mail">E-mail</label>
            <input className="login-input" type="text" name="E-mail" placeholder="E-mail" />
          </div>
          <div className="field">
            <label htmlFor="Password">Hasło</label>
            <input className="login-input" type="password" name="Password" placeholder="Password" />
          </div>
          <button type="button" className="ui basic green button" onClick={this.submitLogin}>
            Zaloguj
          </button>
        </form>
      </div>
    );
  }
}

export default Login;

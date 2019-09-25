import React from 'react';
import Login from './Login';
import Register from './Register';

class RegisterOrLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoginOpen: true, isRegisterOpen: false };
  }

  showLoginBox = () => {
    this.setState({ isLoginOpen: true, isRegisterOpen: false });
  };

  showRegisterBox = () => {
    this.setState({ isLoginOpen: false, isRegisterOpen: true });
  };

  render() {
    return (
      <div className="ui container">
        <div className="ui segment">
          <div className="ui card" onClick={this.showLoginBox}>
            Logowanie
          </div>
          <div className="ui card" onClick={this.showRegisterBox}>
            Rejestracja
          </div>
        </div>
        <div className="ui segment">
          {this.state.isLoginOpen && <Login />}
          {this.state.isRegisterOpen && <Register />}
        </div>
      </div>
    );
  }
}

export default RegisterOrLogin;

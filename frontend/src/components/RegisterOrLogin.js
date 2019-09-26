import React from 'react';
import Login from './Login';
import Register from './Register';
import { Button, Segment } from 'semantic-ui-react';

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
      <div className="container">
        <Segment inverted>
          <Button onClick={this.showLoginBox}>
            Logowanie
          </Button>
          <Button onClick={this.showRegisterBox}>
            Rejestracja
          </Button>
        </Segment> 
        <Segment inverted>
          {this.state.isLoginOpen && <Login />}
          {this.state.isRegisterOpen && <Register />}
        </Segment> 
      </div> 
    );
  }
}

export default RegisterOrLogin;

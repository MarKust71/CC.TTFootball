import React from 'react';

class Register extends React.Component {
  render() {
    return (
      <div className=" ui container">
        <div className="ui segment">Rejestracja</div>
        <form className="ui form">
        <div className="field">
            <label htmlFor="Login">Login*</label>
            <div className="login input">
            <input className="text" type="text" name="Login" placeholder="Login" />
            </div>
          </div>

          <div className="field">
            <label htmlFor="E-mail">E-mail*</label>
            <div className="login input">
            <input className="text" type="text" name="E-mail" placeholder="E-mail" />
            </div>
          </div>

          <div className="field">
            <label htmlFor="Name">Imię</label>
            <div className="login input">
            <input className="text" type="text" name="Name" placeholder="Name" />
              </div>
          </div>
          
          <div className="field">
            <label htmlFor="Surname">Nazwisko</label>
            <div className="login input">
            <input className="text" type="text" name="Surname" placeholder="Surname" />
              </div>
          </div>

          <div className="field">
            <label htmlFor="Password">Hasło*</label>
            <div className="login input">
            <input className="login-input" type="password" name="Password" placeholder="Password" />
            </div>
          </div>

          <div className="field">
          <label htmlFor="Division">Dywizja*</label>
          <div className="ui selection dropdown" name="Division">
          <i className="dropdown icon"></i>
          <div className="default text">Division</div>
          </div>
          </div>
    
          <div className='ui segment'>Pola oznaczone gwiazdką są wymagane.</div>

          <button type="button" className="ui primary button" >
            Zarejestruj
          </button>
          <button type="button" className="ui button" >
            Wyczyść
          </button>
        </form>
      </div>
    );
  }
}

export default Register;


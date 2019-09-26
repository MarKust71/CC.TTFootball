import React from 'react';
import isLogged from '../../utils/isLogged';

const AppBar = () => {
  const handleLogout = () => {
    localStorage.removeItem('token');
  };
  return (
    <div className="container">
      <div className="center">
        <img alt="nie ma obrazka" src="images/nowelogo.jpg" />
      </div>
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <button
              aria-expanded="false"
              className="navbar-toggle collapsed"
              data-target="#navbar"
              data-toggle="collapse"
              type="button"
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="/">
              <span className="blue">
                <b>PAN</b>karzyki
              </span>
            </a>

            {isLogged() && (
              <ul className="nav navbar-nav navbar-left">
                <li>
                  <a href="/">Główna</a>
                </li>
                <li>
                  <a href="/">Terminarz</a>
                </li>
              </ul>
            )}
          </div>
          <div className="collapse navbar-collapse" id="navbar">
            <ul className="nav navbar-nav navbar-right">
              {/* <li>
                <a href="/">Zapisz się</a>
              </li> */}
              {isLogged() && (
                <li>
                  <a onClick={handleLogout} href="/">
                    Wyjdź
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default AppBar;

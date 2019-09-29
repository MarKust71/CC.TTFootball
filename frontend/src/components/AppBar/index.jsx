import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Store from '../../Store';

const AppBar = () => {
  const { isLogged, changeStore } = useContext(Store);
  const handleLogout = () => {
    localStorage.removeItem('token');
    changeStore('isLogged', false);
    changeStore('me', null);
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
            <Link className="navbar-brand" to="/">
              <span className="blue">
                <b>PAN</b>karzyki
              </span>
            </Link>

            {isLogged && (
              <ul className="nav navbar-nav navbar-left">
                <li>
                  <Link to="/">Główna</Link>
                </li>
                <li>
                  <Link to="/Schedule">Terminarz</Link>
                </li>
                <li>
                  <Link to="/Leagues">Ligi</Link>
                </li>
                <li>
                  <Link to="/Teams">Drużyny</Link>
                </li>
              </ul>
            )}
          </div>
          <div className="collapse navbar-collapse" id="navbar">
            <ul className="nav navbar-nav navbar-right">
              {/* <li>
                <Link to="/">Zapisz się</Link>
              </li> */}
              {isLogged && (
                <li>
                  <Link onClick={handleLogout} to="/">
                    Wyjdź
                  </Link>
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

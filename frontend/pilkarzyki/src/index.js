import React from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  return (
    <div className="container">
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
            <a className="navbar-brand">
              <span className="blue">
                <b>PAN</b>karzyki
              </span>
            </a>
          </div>
          <div className="collapse navbar-collapse" id="navbar">
            <ul className="nav navbar-nav navbar-right">
              <li>
                <a href="#">Zapisz się</a>
              </li>
              <li>
                <a href="#">Wejdź</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <main>
        <p>
          O co chodzi? Gramy ligę!! Dobierz się w drużynę, zapisz do rozgrywek, zapisuj wyniki, sprawdzaj kto kogo
          złoił. Wyłonimy zwycięzcę! :) Wanna Join?
        </p>
      </main>
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));

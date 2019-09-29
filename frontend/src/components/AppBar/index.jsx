import React, { useContext, Component } from 'react';
import { Link } from 'react-router-dom';
import {Menu, Segment} from 'semantic-ui-react';
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
        <Menu secondary>
          <Menu.Item as={Link} name='PANkarzyki' to='/' />
            
          {isLogged && (
            <Menu.Menu>
              <Menu.Item as={Link} name='Główna' to='/'/>            
              <Menu.Item as={Link} name='Terminarz' to='/Schedule'/>    
              <Menu.Item as={Link} name='Ligi' to='/Leagues'/>     
              <Menu.Item as={Link} name='Drużyny' to='/Teams' />     
              <Menu.Item as={Link} name='Nowa Liga' to='/NewLeague'/>  
            </Menu.Menu>  
                                    
          )}        
          <Menu.Item as={Link} name='Wyjdź' to='/' onClick={handleLogout} position='right' />
        </Menu>
    </div>
  );
};

export default AppBar;

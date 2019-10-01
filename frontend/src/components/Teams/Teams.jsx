import React from 'react';
import axios from 'axios';
import Store from '../../Store';

class Teams extends React.Component {
  
  static contextType = Store;

  _getUsers() {
    // async getUsers() {
    // const users = await axios(
    //   {
    //     url: '/api/users/',
    //     method: 'get',
    //     data: {},
    //     headers:
    //     {
    //       'x-auth-token': localStorage.getItem('token')
    //     }
    //   }
    // ).then(
    //   (res) => {
    //     this.users = res.data.map( (el) => { return {
    //       key: el._id,
    //       value: `${el.surname}, ${el.name}`,
    //       text: `${el._id}: ${el.surname}, ${el.name}`
    //     }; } );
    //     console.log(this.users);
    //   },
    //   (err) => { console.log(err.errmsg); }
    // )
    return [
      // powinno się ciągnąć z bazy, ale nie znalazłem endpointa na razie...
      { key: 'John', value: 'Front, John', text: 'Front, John' },
      { key: 'kris', value: 'stoiczkow, kristof', text: 'stoiczkow, kristof' },
      { key: 'Marcin', value: 'Woś, Marcin', text: 'Woś, Marcin' },
      { key: 'MareK', value: 'K, Marek', text: 'K, Marek' },
    ];
  }

  async _getTeams(resType = 'names', id) {
    let ret;
    // eslint-disable-next-line
    await axios(
      {
        url: '/api/teams/',
        method: 'get',
        data: {},
        headers:
        {
          // 'x-auth-token': localStorage.getItem('token')
          'x-auth-token': localStorage.token
        }
      }
    ).then(
      (res) => { 
        switch(resType) {
          case 'names':
            // this.teams = res.data.map( (el) => { return el.name; } );
            ret = res.data.map( (el) => { return el.name; } );
            break;
          case 'forSelect':
            // this.teams = res.data.map( (el) => { 
            ret = res.data.map( (el) => { 
              return {
                key: el._id,
                value: el.name,
                text: el.name
              }; 
            } );
            break;
          case 'all':
            // this.teamsAll = res.data;
            ret = res.data;
            break;
          default:
            // this.teams = res.data.map( (el) => { return el.name; } );
            ret = res.data.map( (el) => { return el.name; } );
        };
      },
      (err) => { console.log(err.errmsg); }
    )
    // return this.teams;
    return ret;
  }

  _getDivisions() {
    return [
      // powinno się ciągnąć z bazy, ale nie znalazłem endpointa na razie...
      { key: 'WRO', value: 'WRO', text: 'Wrocław' },
      { key: 'KRK', value: 'KRK', text: 'Kraków' },
      { key: 'WAW', value: 'WAW', text: 'Warszawa' },
      { key: 'League_Division_0', value: 'League_Division_0', text: 'League_Division_0' },
    ];
  }
}

export default Teams;

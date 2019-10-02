import React from 'react';
import axios from 'axios';
import Store from '../../Store';

class Teams extends React.Component {
  
  static contextType = Store;

  componentDidMount() {
    console.log('Teams->', this.context);
    // console.log('Teams->', this.context.me.division);
    // console.log('Teams->', localStorage.token);
  }

  async getUsers(division = '') {
    await axios(
      {
        url: `/api/users?division=${this.context.me.division}`,
        // url: `/api/users`,
        method: 'get',
        data: {},
        // data: { 'division': division },
        // data: { 'division': this.context.me.division },
        headers:
        {
          'x-auth-token': localStorage.token
        }
      }
    ).then(
      (res) => { 
        this.users = res.data.map( (el) => { return {
          key: el._id,
          value: `${el.surname}, ${el.name}`,
          text: `${el._id}: ${el.surname || '(brak)'}, ${el.name || '(brak)'}`
        }; } );
      },
      (err) => { console.log(err.errmsg); }
    )
  }

  // _gu = async (type) => {
  //   let ret = [];
  //   try { 
  //     ret = await this.getUsers(type); 
  //     switch(type) {
  //       case 'forSelect':
  //         this.users = ret;
  //         break;
  //       case 'all':
  //         this.users = ret;
  //         break;
  //       default:
  //         this.users = ret.map( (el) => { return {
  //           key: el._id,
  //           value: `${el.surname}, ${el.name}`,
  //           text: `${el._id}: ${el.surname}, ${el.name}`
  //         }; } );
  //         break;
  //     }
  //   }
  //   catch (e) { console.log('Coś nie tak', e); };
  // }

  // _gu = async (type) => {
  //   // try { 
  //     const ret = await this.getUsers(type)
  //       .then( 
  //         (res) => {
  //           console.log('1->', res);
  //     // switch(type) {
  //     //   case 'forSelect':
  //     //     this.users = ret;
  //     //     break;
  //     //   case 'all':
  //     //     this.users = ret;
  //     //     break;
  //     //   default:
  //     //     this.users = ret.map( (el) => { return {
  //     //       key: el._id,
  //     //       value: `${el.surname}, ${el.name}`,
  //     //       text: `${el._id}: ${el.surname}, ${el.name}`
  //     //     }; } );
  //     //     break;
  //     // }
  //       },
  //         (err) => { console.log('Coś nie tak', err); }
  //       ); 
  //   // }
  //   // catch (e) { console.log('Coś nie tak', e); };
  // }

  // _getUsers() {
  //   return [
  //     // powinno się ciągnąć z bazy, ale nie znalazłem endpointa na razie...
  //     { key: 'John', value: 'Front, John', text: 'Front, John' },
  //     { key: 'kris', value: 'stoiczkow, kristof', text: 'stoiczkow, kristof' },
  //     { key: 'Marcin', value: 'Woś, Marcin', text: 'Woś, Marcin' },
  //     { key: 'MareK', value: 'K, Marek', text: 'K, Marek' },
  //   ];
  // }

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

  _gt = async (type) => {
    let ret;
    try { 
      ret = await this._getTeams(type); 
      switch(type) {
        case 'forSelect':
          this.teams = ret;
          this.teams.sort( (a, b) => { return (a.text.toLowerCase() < b.text.toLowerCase()) ? -1 : 1; } ); 
          this.setState( 
            () => { return { 
              team: this.teams[0].text,
              teamId:  this.teams[0].key
            }}
          );
          // console.log('1->', this.teams);
          break;
        case 'all':
          this.teamsAll = ret;
          // console.log('2->', this.teamsAll);
          // console.log('3->', this.teamsAll[0].players.first.surname || '(brak)');
          this.setState( 
            () => { return { 
              players: {
                first: {
                  _id: this.teamsAll[0].players.first._id,
                  name: `${this.teamsAll[0].players.first.surname || '(brak)'}, ${this.teamsAll[0].players.first.name || '(brak)'}`
                },
                second: {
                  _id: this.teamsAll[0].players.second._id,
                  name: `${this.teamsAll[0].players.second.surname || '(brak)'}, ${this.teamsAll[0].players.second.name || '(brak)'}`
                }
              }
            }}
          );
          break;
        default:
          break;
      }
    }
    catch (e) { console.log('Coś nie tak', e.errmsg); };
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

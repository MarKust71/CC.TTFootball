import React from 'react';
import axios from 'axios';
import Store from '../../Store';

class Teams extends React.Component {
  
  static contextType = Store;

  componentDidMount() {
    console.log('Teams->', this.context);
  }

  async getUsers(division = '') {
    await axios(
      {
        url: `/api/users?division=${this.context.me.division}`,
        method: 'get',
        data: {},
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
        }; } ).sort( (a, b) => { return (a.text.toLowerCase() < b.text.toLowerCase()) ? -1 : 1; } );
      },
      (err) => { console.log('getUsers->', err.errmsg); }
    )
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
          'x-auth-token': localStorage.token
        }
      }
    ).then(
      (res) => { 
        switch(resType) {
          case 'names':
            ret = res.data.map( (el) => { return el.name; } );
            break;
          case 'forSelect':
            ret = res.data.map( (el) => { 
              return {
                key: el._id,
                value: el.name,
                text: el.name
              }; 
            } );
            break;
          case 'all':
            ret = res.data;
            break;
          default:
            ret = res.data.map( (el) => { return el.name; } );
        };
      },
      (err) => { console.log('_getTeams->', err.errmsg); }
    )
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
          break;
        case 'all':
          this.teamsAll = ret;
          this.teamsAll.sort( (a, b) => { return (a.name.toLowerCase() < b.name.toLowerCase()) ? -1 : 1; } ); 
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
              },
              statistics: {
                matches: {
                  won: this.teamsAll[0].statistics.matches.won,
                  lost: this.teamsAll[0].statistics.matches.lost
                },
                goals: {
                  for: this.teamsAll[0].statistics.goals.for,
                  against: this.teamsAll[0].statistics.goals.against
                }
              }
            }}
          );
          break;
        default:
          break;
      }
    }
    catch (e) { console.log('_gt: Coś nie tak', e.errmsg); };
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

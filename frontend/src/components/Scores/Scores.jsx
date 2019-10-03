import React from 'react';
import axios from 'axios';
import Store from '../../Store';

class Scores extends React.Component {
  static contextType = Store;

  async getLeagues(resType = 'names') {
    let ret;
    await axios({
      url: '/api/leagues/',
      method: 'get',
      data: {},
      headers: {
        'x-auth-token': localStorage.token
      }
    }).then(
      (res) => {
        switch (resType) {
          case 'names':
            ret = res.data.map((el) => {
              return el.name;
            });
            break;
          case 'forSelect':
            ret = res.data.map((el) => {
              return {
                key: el._id,
                value: el.name,
                text: el.name
              };
            });
            break;
          case 'all':
            ret = res.data;
            break;
          default:
            ret = res.data.map((el) => {
              return el.name;
            });
        };
      },
      (err) => {
        console.log('Error taki:', err.errmsg);
      }
    )
    return ret;
  }

  gl = async (type) => {
    let ret;
    try { 
      ret = await this.getLeagues(type); 
      switch(type) {
        case 'forSelect':
          this.league = ret;
          this.league.sort( (a, b) => { return (a.text.toLowerCase() < b.text.toLowerCase()) ? -1 : 1; } ); 
          this.setState( 
            () => { return { 
              league: this.league[0].text,
              leagueId:  this.league[0].key
            }}
          );
          break;
        case 'all':
          this.leagueAll = ret;
          this.leagueAll.sort( (a, b) => { return (a.name.toLowerCase() < b.name.toLowerCase()) ? -1 : 1; } ); 
          console.log('Co tu jest:', this.leagueAll[0]);
          this.setState( 
            () => { return { 
              team: this.leagueAll[0].teams.team.name,
              statistics: {
                points: this.leagueAll[0].teams.statistics.matches.won * 3,
                matches: {
                  played: this.leagueAll[0].teams.statistics.matches.won + this.leagueAll[0].teams.statistics.matches.lost,
                  won: this.leagueAll[0].teams.statistics.matches.won,
                  lost: this.leagueAll[0].teams.statistics.matches.lost
                },
                goals: {
                  for: this.leagueAll[0].teams.statistics.goals.for,
                  against: this.leagueAll[0].teams.statistics.goals.against
                },
              }
            }}
          );
          break;
        default:
          break;
      }
    }
    catch (e) { console.log('gl: Błąd', e.errmsg); };
  }

}

export default Scores;
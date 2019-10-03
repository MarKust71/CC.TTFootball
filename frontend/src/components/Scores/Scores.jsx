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
        'x-auth-token': localStorage.token,
      },
    }).then(
      res => {
        switch (resType) {
          case 'names':
            ret = res.data.map(el => el.name);
            break;
          case 'forSelect':
            ret = res.data.map(el => {
              return {
                key: el._id,
                value: el.name,
                text: el.name,
              };
            });
            break;
          case 'all':
            ret = res.data;
            break;
          default:
            ret = res.data.map(el => el.name);
        }
      },
      err => {
        console.log('Error taki:', err.errmsg);
      },
    );
    return ret;
  }

  gl = async type => {
    try {
      let ret = await this.getLeagues(type);
      switch (type) {
        case 'forSelect':
          this.league = ret.sort((a, b) => a.text.toLowerCase() < b.text.toLowerCase() ? -1 : 1);
          this.setState(() => {
            return {
              league: this.league[0].text,
              leagueId: this.league[0].key,
            };
          });
          break;
        case 'all':
          this.leagueAll = ret.sort((a, b) => a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1);
          if (this.leagueAll[0].teams.length > 0) {
            for (let i = 0; i < this.leagueAll.teams.length; i++) {
              this.setState(() => {
                return {
                  data: [
                    ...this.state.data,
                    {
                      team: this.leagueAll[0].teams[i].team.name,
                      points: this.leagueAll[0].teams[i].statistics.matches.won * 3,
                      matchesPlayed:
                        this.leagueAll[0].teams[i].statistics.matches.won +
                        this.leagueAll[0].teams[i].statistics.matches.lost,
                      matchesWon: this.leagueAll[0].teams[i].statistics.matches.won,
                      matchesLost: this.leagueAll[0].teams[i].statistics.matches.lost,
                      goalsFor: this.leagueAll[0].teams[i].statistics.goals.for,
                      goalsAgainst: this.leagueAll[0].teams[i].statistics.goals.against,
                    },
                  ],
                };
              });
            }
          }
          break;
        default:
          break;
      }
    } catch (e) {
      console.log('gl: Błąd', e);
    }
  };
}

export default Scores;

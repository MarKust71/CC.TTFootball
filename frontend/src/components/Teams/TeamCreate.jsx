import React from 'react';
import axios from 'axios';
// import { Redirect } from 'react-router-dom';
import Teams from './Teams';
import { Form, Segment, Label, Input, Message } from 'semantic-ui-react';
import Store from '../../Store';

// class TeamCreate extends React.Component {
class TeamCreate extends Teams {

  constructor(props) {
    super(props);

    this.state = {
      term: '',
      newTeam: '',
      player1: '',
      player2: '',
      errHeader: '',
      errMessage: '',
      warnHeader: '',
      warnMessage: '',
      postSuccess: false,
    };


    this.teams = [];
    this._gt('forSelect');

    this.users = [];
    // this._gu();
    // this.getUsers(this.context.me.division);

    // this.users = this._getUsers();

  }

  static contextType = Store;

  componentDidMount() {
    // console.log('TeamCreate->', this.context);
    // this.getUsers(this.context.me.division);
    this.getUsers();
    // console.log('TeamCreate->', localStorage.token);
  }

  onInputChange = e => {
    const value = e.target.value;
    this.setState(() => {
      return {
        // player1: '',
        // player2: '',
        errHeader: '',
        errMessage: '',
        newTeam: value,
      };
    });
  };

  onSelectChange = (e, { value, name }) => {
    switch (name) {
      case 'player1':
        this.setState(() => {
          return {
            player1: value,
            errHeader: '',
            errMessage: '',
          };
        });
        break;
      case 'player2':
        this.setState(() => {
          return {
            player2: value,
            errHeader: '',
            errMessage: '',
          };
        });
        break;
      default:
        break;
    }
  };

  onFormSubmit = (e, d) => {
    e.preventDefault();
    if (d.name !== 'btnCancel') {
      if (this._validateForm()) {
        this._postTeam();
      }
    }
  };

  onClickCancel = (e, d) => {
    // console.log(e, d);
    this.setState(() => {
      return { postSuccess: true };
    });
  };

  _validateForm = () => {
    let teamOK = true;
    let playersOK = true;
    const team = this.state.newTeam;
    if (team) {
      console.log('_validateForm', this.teams.value);
      if (
        this.teams.filter(el => {
          return el === team;
        }).length
      ) {
        this.setState(() => {
          return {
            errHeader: 'BŁĄD!',
            errMessage: 'Drużyna o tej nazwie już istnieje',
          };
        });
        // return false;
        teamOK = false;
      } else {
        this.setState(() => {
          return {
            errHeader: '',
            errMessage: '',
          };
        });
      }
    } else {
      this.setState(() => {
        return {
          errHeader: 'BŁĄD!',
          errMessage: 'Drużyna musi mieć nazwę',
        };
      });
      // return false;
      teamOK = false;
    }

    if (!teamOK) {
      return false;
    }

    if (!this.state.player1 || !this.state.player2) {
      this.setState(() => {
        return {
          errHeader: 'BŁĄD!',
          errMessage: 'Wskaż graczy',
        };
      });
      // return false;
      playersOK = false;
    }
    if (this.state.player1 && this.state.player2 && this.state.player1 === this.state.player2) {
      this.setState(() => {
        return {
          warnHeader: 'UWAGA!',
          warnMessage: 'Właśnie utworzyłeś drużynę jednoosobową',
        };
      });
      // return false;
      playersOK = true;
    }
    return playersOK;
  };

  async _postTeam() {
    // eslint-disable-next-line
    const teams = await axios({
      url: '/api/teams/',
      method: 'post',
      data: {
        name: this.state.newTeam,
        players: {
          first: this.users.filter(el => {
            return el.value === this.state.player1;
          })[0].key,
          second: this.users.filter(el => {
            return el.value === this.state.player2;
          })[0].key,
        },
        status: 'active',
      },
      headers: {
        // 'x-auth-token': localStorage.getItem('token')
        'x-auth-token': localStorage.token,
      },
    }).then(
      res => {
        this.setState(() => {
          return { postSuccess: true };
        });
      },
      err => {
        console.log('_postTeam', err.errmsg);
      },
    );
  }

  render() {
    // if (this.state.postSuccess) return <Redirect to="/" />;
    return (
      <>
        <Segment.Group horizontal>
          <Segment>
            {/* <Form onSubmit={this, this.onFormSubmit}> */}
            <Form onSubmit={this.onFormSubmit}>
              <Form.Group>
                <Form.Field>
                  <Label>Nazwa drużyny</Label>
                  <Input
                    type="text"
                    placeholder="wprowadź nazwę drużyny..."
                    value={this.state.newTeam}
                    onChange={e => {
                      this.onInputChange(e);
                    }}
                  />
                </Form.Field>
              </Form.Group>
              <Form.Group>
                <Form.Field>
                  <Label>Wybierz graczy</Label>
                  <Form.Group inline>
                    <Form.Dropdown
                      key="player1"
                      name="player1"
                      placeholder="wskaż gracza 1..."
                      selection
                      value={this.state.player1}
                      options={this.users}
                      onChange={(e, v) => this.onSelectChange(e, v)}
                    />
                    <Form.Dropdown
                      key="player2"
                      name="player2"
                      placeholder="wskaż gracza 2..."
                      selection
                      value={this.state.player2}
                      options={this.users}
                      onChange={(e, v) => this.onSelectChange(e, v)}
                    />
                  </Form.Group>
                </Form.Field>
              </Form.Group>
            </Form>
            {this.state.errHeader + this.state.errMessage !== '' && (
              <Form error>
                <Message error header={this.state.errHeader} content={this.state.errMessage} />
              </Form>
            )}
            {this.state.warnHeader + this.state.warnMessage !== '' && (
              <Form warning>
                <Message
                  warning
                  header={this.state.warnHeader}
                  content={this.state.warnMessage}
                />
              </Form>
            )}
          </Segment>
        </Segment.Group>
        {this.state.warnHeader + this.state.warnMessage === '' && (
          <Form>
            <Form.Group>
              <Form.Button name="btnSave" onClick={this.onFormSubmit}>Zapisz</Form.Button>
              <Form.Button name="btnCancel" onClick={this.onClickCancel}>Anuluj</Form.Button>
            </Form.Group>
          </Form>
        )}
      </>
    );
  }
}

export default TeamCreate;

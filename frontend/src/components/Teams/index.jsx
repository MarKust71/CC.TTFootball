import React from 'react';
import axios from 'axios';
// import { Redirect } from 'react-router-dom';
import { Form, Segment, Label, Input, Message, FormGroup } from 'semantic-ui-react';

class componentTeams extends React.Component {
  constructor (props) {
    
    super(props);
    
    this.state = {
      newTeam: '',
      player1: '',
      player2: '',
      errHeader: '',
      errMessage: ''
      // divisionSelected: false
    }
  
    // this.teamsOfDivision = this._getDivisions();
    this.teams = this._getTeams();
    this.users = this._getUsers();

  }

  // async getTeamsOfDivision(division) {
  //   const teams = await axios(
  //     {
  //       url: '/api/teams/',
  //       method: 'get',
  //       data: {},
  //       headers:
  //       {
  //         'x-auth-token': localStorage.getItem('token')
  //       }
  //     }
  //   ).then(
  //     (res) => { 
  //       var list = res.data;
  //       console.log('1->', list);
  //       list = list.filter( (element) => { return (element.division === division && element.status === 'active'); } );
  //       console.log('2->', list, division);
  //       list = list.map( (element) => { return element.name; } );
  //       console.log('3->', list);
  //       // this.teamsOfDivision = res.data
  //       //   .filter( (element) => { return element.name === this.state.divisionName; } )
  //       //   .map( (element) => { return element.name; } )
  //       //   ;
  //       // console.log(this.teamsOfDivision); 
  //     },
  //     (err) => { console.log(err.errmsg); }
  //   )
  // }

  async _getTeams() {
    const teams = await axios(
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
        this.teams = res.data.map( (element) => { return element.name; } );
        // console.log(this.teams); 
      },
      (err) => { console.log(err.errmsg); }
    )
  }

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
      {key: 'John', value: 'Front, John', text: 'Front, John'},
      {key: 'kris', value: 'stoiczkow, kristof', text: 'stoiczkow, kristof'},
      {key: 'Marcin', value: 'Woś, Marcin', text: 'Woś, Marcin'},
      {key: 'MareK', value: 'K, Marek', text: 'K, Marek'}
    ];
  }

  _getDivisions() {
    return [
    // powinno się ciągnąć z bazy, ale nie znalazłem endpointa na razie...
      {key: 'WRO', value: 'WRO', text: 'Wrocław'},
      {key: 'KRK', value: 'KRK', text: 'Kraków'},
      {key: 'WAW', value: 'WAW', text: 'Warszawa'},
      {key: 'League_Division_0', value: 'League_Division_0', text: 'League_Division_0'}
    ];
  }

  onSelectChange = (e, { value, name }) => {
    switch(name) {
      case 'player1':
        this.setState( () => { return { 
          player1: value,
          errHeader: '',
          errMessage: ''
        }})
        break;
      case 'player2':
        this.setState( () => { return { 
          player2: value,
          errHeader: '',
          errMessage: ''
          }})
        break;
      default:
        break;
    }
  
  }

  onInputChange = (e) => {
    const value = e.target.value;
    this.setState( () => { return { 
      // player1: '',
      // player2: '',
      errHeader: '', 
      errMessage: '' ,
      newTeam: value
    }} );
  }

  onFormSubmit = (e) => {
    e.preventDefault();
    if (this._validateForm()) {
      this._postTeam();
    };
  }

  _validateForm = () => {
    let teamOK = true;
    let playersOK = true;
    const team = this.state.newTeam;
    if (team) {
      if (this.teams.filter( (el) => { return el === team; } ).length) {
        this.setState( () => { return { 
          errHeader: 'BŁĄD!',
          errMessage: 'Drużyna o takiej nazwie już istnieje.'
        }} );
        // return false;
        teamOK = false;
      } else {
        this.setState( () => { return { 
          errHeader: '', 
          errMessage: '' 
        }} );
      };
    } else {
      this.setState( () => { return { 
        errHeader: 'BŁĄD!',
        errMessage: 'Drużyna bez nazwy nie wchodzi w grę'
      }} );
      // return false;
      teamOK = false;
    };

    if (!teamOK) { return false };

    if (!this.state.player1 || !this.state.player2) {
      this.setState( () => { return { 
        errHeader: 'BŁĄD!',
        errMessage: 'Nie wybrano zawodników'
      }} );
      // return false;
      playersOK = false;
    }
    if (this.state.player1 && this.state.player2 && (this.state.player1 === this.state.player2)) {
      this.setState( () => { return { 
        errHeader: 'BŁĄD!',
        errMessage: 'Drużyna to dwie różne osoby'
      }} );
      // return false;
      playersOK = false;
    }
    return playersOK;
  }

  async _postTeam() {
    const teams = await axios(
      {
        url: '/api/teams/',
        method: 'post',
        data: {
          name: this.state.newTeam,
          players: {
            first: this.users.filter( (el) => { return el.value === this.state.player1; } )[0].key,
            second: this.users.filter( (el) => { return el.value === this.state.player2; } )[0].key
          },
          status: 'active'
        },
        headers:
        {
          // 'Content-Type': 'application/json',
          // 'x-auth-token': localStorage.getItem('token')
          'x-auth-token': localStorage.token
        }
      }
    ).then(
      (res) => { 
        console.log('poszło', res);
      },
      (err) => { console.log(err.errmsg); }
    )
  }

  render() {
    return (
      <div className="container" style={{textAlign: "left"}}>
        <Segment.Group horizontal>
          <Segment>          
            {/* <Form onSubmit={this, this.onFormSubmit}> */}
            <Form onSubmit={this.onFormSubmit}>
              <Form.Group>
                <Form.Field>
                  <Label>Nazwij jakoś drużynę</Label>
                  <Input 
                    type="text" 
                    placeholder="wprowadź nazwę..." 
                    value={this.state.newTeam} 
                    onChange={ (e) => { this.onInputChange(e); } } 
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
                      placeholder="puknij gracza nr 1..." 
                      selection value={this.state.player1} 
                      options={ this.users } 
                      onChange={ (e, v) => this.onSelectChange(e, v) } 
                    />
                    <Form.Dropdown 
                      key="player2"
                      name="player2"
                      placeholder="puknij gracza nr 2..." 
                      selection value={this.state.player2} 
                      options={this.users} 
                      onChange={ (e, v) => this.onSelectChange(e, v) } 
                    />
                  </Form.Group>
                </Form.Field>
              </Form.Group>
              <FormGroup>
                <Form.Button>Zapisz</Form.Button>
              </FormGroup>
            </Form>
            { (this.state.errHeader + this.state.errMessage !== '') && (
              <Form error>
                <Message
                  error
                  header={ this.state.errHeader }
                  content={ this.state.errMessage }
                />
              </Form>
            )}
          </Segment>
          <Segment>

          </Segment>
        </Segment.Group>
      </div>
    )
  }

}

export default componentTeams;

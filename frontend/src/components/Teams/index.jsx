import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Button, Form, Segment, Label, Select, Input, Dropdown } from 'semantic-ui-react';

class componentTeams extends React.Component {
  constructor (props) {
    
    super(props);
    
    this.state = {
      newTeam: '',
      divisionName: '',
      newTeamErrMsg: '',
      haveNewTeam: false,
      player1: '',
      player2: '',
      playersErrMsg: ''
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
          'x-auth-token': localStorage.getItem('token')
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
      {key: 'John', value: 'Front, John', text: 'John: Front, John'},
      {key: 'kris', value: 'stoiczkow, kristof', text: 'kris: stoiczkow, kristof'},
      {key: 'Marcin', value: 'Woś, Marcin', text: 'Marcin: Woś, Marcin'},
      {key: 'MareK', value: 'K, Marek', text: 'MareK: K, Marek'}
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

  // onSelectChange = (e) => {
  //   const value = e.target.value;
  //   this.setState({ 
  //     divisionName: value,
  //     divisionSelected: true 
  //   })
  //   this.getTeamsOfDivision(value);
  //   this.getTeamsOfDivision('League_Division_0');
  //   // console.log(this.teamsOfDivision);
  // }

  onSelectChange = (e, id) => {
// let {value} = e.currentTarget;
// console.log(value);
// console.log(this);
// console.log(e.target);
// console.log(e.target.props);
// console.log(e.target.value, id, this.state.player1, this.state.player2);
console.log(e.currentTarget);
    const { value } = e.currentTarget;
    switch(id) {
      case 1:
        if (value !== this.state.player2) {
          this.setState( () => { return { 
            player1: value,
            playersErrMsg: ''
          }})
        } else {
          this.setState( () => { return {
            playersErrMsg: 'No chyba żartujesz...'
          }})
        }
        break;
      case 2:
          if (value !== this.state.player1) {
            this.setState( () => { return { 
              player2: value,
              playersErrMsg: ''
            }})
          } else {
            this.setState( () => { return {
              playersErrMsg: 'No chyba żartujesz...'
            }})
          }
          break;
        default:
        break;
    }
  }

  onInputChange = (e) => {
    const value = e.target.value;
    this.setState( () => { return { newTeam: value }} );
  }

  onFormSubmit = (e) => {
    e.preventDefault();
    const team = this.state.newTeam;
    if (team) {
      if (this.teams.filter( (el) => { return el === team; } ).length) {
        this.setState( () => { return { newTeamErrMsg: 'Taka drużyna już istnieje' }} );
      } else {
        this.setState( () => { return { newTeamErrMsg: '' }} );
        this.setState( () => { return { haveNewTeam: true }} );
      };
    } else {
      this.setState( () => { return { newTeamErrMsg: 'Drużyna bez nazwy nie wchodzi w grę' }} );
    };
    if (this.state.newTeamErrMsg) console.log(this.state.newTeamErrMsg);
  }

  render() {
    return (
      <div className="container" style={{textAlign: "left"}}>
        <Form onSubmit={this,this.onFormSubmit}>
          {/* <Form.Group>
            <Label>Na początek może dywizja...</Label>
            <Select 
              placeholder="Puknij dywizję..." 
              value={this.state.divisionName} 
              options={this.optionsDivisions} onChange={ (e) => { this.onSelectChange(e); } } 
            />
          </Form.Group> */}
          {/* { this.state.divisionSelected && 
            ( */}
            <Form.Group>
              <Form.Field>
                <Label>Nazwij jakoś drużynę</Label>
                <Input 
                  type="text" 
                  placeholder="wprowadź nazwę..." 
                  value={this.state.newTeam} 
                  onChange={ (e) => { this.onInputChange(e); } } 
                />
                <Button>Sprawdź</Button>
                {this.state.newTeamErrMsg && <Label style={{color: "red"}}>{this.state.newTeamErrMsg}</Label>}                
              </Form.Field>
            </Form.Group>
            {/* )
          } */}
          { this.state.haveNewTeam && (
            <Form.Group>
              <Label>Wybierz graczy</Label>
              <Dropdown 
                key="player1"
                placeholder="Puknij gracza nr 1..." 
                selection value={this.state.player1} 
                options={this.users} 
                onChange={ (e) => { this.onSelectChange(e, 1); } } 
              />
              <Dropdown 
                key="player2"
                placeholder="Puknij gracza nr 2..." 
                selection value={this.state.player2} 
                options={this.users} 
                onChange={ (e) => { this.onSelectChange(e, 2); } } 
              />
              {this.state.playersErrMsg && <Label style={{color: "red"}}>{this.state.playersErrMsg}</Label>}
            </Form.Group>
          ) }
          { (this.state.player1 !== '') && (this.state.player2 !== '') && (
            <Button>Zapisz</Button>
          )}
        </Form>
      </div>
    )
  }

}

export default componentTeams;

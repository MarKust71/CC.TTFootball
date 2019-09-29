import React from 'react';
import { Grid, Menu } from 'semantic-ui-react';
import TeamCreate from './TeamCreate';

class componentTeams extends React.Component {
  constructor (props) {
    
    super(props);
    
    this.state = {
      term: '',
      activeItem: 'dodaj',
      // divisionSelected: false
    }
  
    // this.teamsOfDivision = this._getDivisions();

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

  _getDivisions() {
    return [
    // powinno się ciągnąć z bazy, ale nie znalazłem endpointa na razie...
      {key: 'WRO', value: 'WRO', text: 'Wrocław'},
      {key: 'KRK', value: 'KRK', text: 'Kraków'},
      {key: 'WAW', value: 'WAW', text: 'Warszawa'},
      {key: 'League_Division_0', value: 'League_Division_0', text: 'League_Division_0'}
    ];
  }

  // onInputChange = (e) => {
  //   const value = e.target.value;
  //   this.setState( () => { return { 
  //     // player1: '',
  //     // player2: '',
  //     errHeader: '', 
  //     errMessage: '' ,
  //     newTeam: value
  //   }} );
  // }

  onInputChange = (e) => {
    this.props.onChange(this.state.term);
  };

  onSelectChange = (e, { value, name } ) => {
    this.props.onChange(this.state.term);
  };

  onFormSubmit = () => {
    this.props.onSubmit(this.state.term);
  };

  onClickCancel = () => {
    this.props.onSubmit(this.state.term);
  };

  handleItemClick = (e, { name }) => this.setState( () => { return { activeItem: name }; });

  render() {
    const { activeItem } = this.state;
    return (
      <div className="container" style={{textAlign: "left"}}>
        <Grid>

          <Grid.Column stretched width={2}>
            <Menu fluid vertical tabular>
              <Menu.Item
                name='przejrzyj'
                active={activeItem === 'przejrzyj'}
                onClick={this.handleItemClick}
              />
              <Menu.Item
                name='dodaj'
                active={activeItem === 'dodaj'}
                onClick={this.handleItemClick}
              />
            </Menu>
          </Grid.Column>

          <Grid.Column stretched width={14}>
            { (this.state.activeItem === 'dodaj') && <TeamCreate /> }
          </Grid.Column>

        </Grid>
      </div>
    )
  }

}

export default componentTeams;

import React from 'react';
import axios from 'axios';
import { Grid, Menu, Header, Icon, Segment } from 'semantic-ui-react';
import Teams from './Teams';
import TeamCreate from './TeamCreate';
import TeamView from './TeamView';

// === pobiera obiekt zalogowanego użytkownika      ===
// === i zapisuje go w localStorage w zmiennej 'me' ===
async function getMe() {
  const me = await axios({
    url: '/api/login/me',
    method: 'get',
    data: {},
    headers: {
      'x-auth-token': localStorage.token,
    },
  }).then(res => {
    return res.data;
  });
  localStorage.setItem('me', JSON.stringify(me));
}
getMe();
// ====================================================

// class componentTeams extends React.Component {
class ComponentTeams extends Teams {
  constructor(props) {
    super(props);

    this.state = {
      term: '',
      activeItem: 'view',
      // divisionSelected: false
    };

    // this.teamsOfDivision = this._getDivisions();
    // console.log(localStorage);

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

  onInputChange = e => {
    this.props.onChange(this.state.term);
  };

  onSelectChange = (e, { value, name }) => {
    this.props.onChange(this.state.term);
  };

  onFormSubmit = () => {
    this.props.onSubmit(this.state.term);
  };

  onClickCancel = () => {
    this.props.onSubmit(this.state.term);
  };

  handleItemClick = (e, { name }) =>
    this.setState(() => {
      return { activeItem: name };
    });

  render() {
    const { activeItem } = this.state;
    return (
      <div className="container" style={{ textAlign: 'left' }}>
        <Header as="h2" textAlign="center" style={{ paddingLeft: '40px' }}>
          <Icon name="group" />
          <Header.Content>Teams Management</Header.Content>
        </Header>

        <Segment>
          <Grid>
            <Grid.Column stretched width={2}>
              <Menu fluid vertical tabular>
                <Menu.Item name="view" active={activeItem === 'view'} onClick={this.handleItemClick} />
                <Menu.Item name="create" active={activeItem === 'create'} onClick={this.handleItemClick} />
              </Menu>
            </Grid.Column>

            <Grid.Column stretched width={14}>
              { (this.state.activeItem === 'create') && <TeamCreate /> }
              { (this.state.activeItem === 'view') && <TeamView /> }
            </Grid.Column>
          </Grid>
        </Segment>
      </div>
    );
  }
}

export { Teams, ComponentTeams };

import React from 'react';
// import axios from 'axios';
// import { Redirect } from 'react-router-dom';
import Teams from './Teams';
// import { Form, Segment, Label, Input, Message, } from 'semantic-ui-react';
import { Form, Segment, Label } from 'semantic-ui-react';

// class TeamCreate extends React.Component {
class TeamView extends Teams {

  constructor (props) {
    super(props);

    this.state = { 
      term: '',
      team: ''
    };

    this.teams = this._getTeams();
    this.users = this._getUsers();

  }

  componentDidMount() {
    this.setState( () => { return { team: this.users[0].text }; } );
    console.log(this.teams);
  }

  onSelectChange = (e, { value, name }) => {
    // switch(name) {
    //   case 'player1':
    //     this.setState( () => { return { 
    //       player1: value,
    //       errHeader: '',
    //       errMessage: ''
    //     }})
    //     break;
    //   case 'player2':
    //     this.setState( () => { return { 
    //       player2: value,
    //       errHeader: '',
    //       errMessage: ''
    //       }})
    //     break;
    //   default:
    //     break;
    // }  
  }

  onFormSubmit = (e, d) => {
    e.preventDefault();
  }

  render() {
    return (
      <Segment.Group horizontal>
        <Segment>
          <Form onSubmit={this.onFormSubmit}></Form>
            <Form.Group>
              <Form.Field>
                <Label>Zgłoszone drużyny</Label>
                <Form.Group>
                  <Form.Dropdown 
                    key="teamsSelect"
                    name="teamsSelect"
                    // placeholder="puknij gracza nr 1..." 
                    selection value={this.state.team} 
                    options={ this.users } 
                    onChange={ (e, v) => this.onSelectChange(e, v) } 
                  />
                </Form.Group>
              </Form.Field>
            </Form.Group>
        </Segment>
      </Segment.Group>
    )
  };
}

export default TeamView;
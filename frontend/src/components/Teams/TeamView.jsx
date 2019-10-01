import React from 'react';
// import axios from 'axios';
// import { Redirect } from 'react-router-dom';
import Teams from './Teams';
// import { Form, Segment, Label, Input, Message, } from 'semantic-ui-react';
import { Form, Segment, Label, Input, Table, Tab } from 'semantic-ui-react';
import Store from '../../Store';

// class TeamCreate extends React.Component {
class TeamView extends Teams {

  constructor (props) {
    super(props);

    this.state = { 
      term: '',
      team: '',
      teamId: 0,
      players: {
        first: { 
          _id: '', 
          name: '' },
        second: { 
          _id: '',
          name: 'asasas' 
        }
      }
    };

    this.teams = [];
    this.teamsAll = [];

    this.gt('forSelect');
    this.gt('all');

    this.matchesWon = 0;
    this.matchesLost = 0;
    this.goalsFor = 0;
    this.goalsAgainst = 0;
  }

  static contextType = Store;

  componentDidMount() {
    // console.log(this.context);
  }

  gt = async (type) => {
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
                  name: `${this.teamsAll[0].players.first.surname || '(brak)'}, ${this.teamsAll[0].players.first.name || '(brak)'}}`
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

  onSelectChange = (e, { value, name }) => {
  // console.log( this.teams[ this.teams.map( (el) => { return el.value; } ).indexOf(value) ].key );
    const index = this.teams.map( (el) => { return el.value; } ).indexOf(value);
    const players = this.teamsAll[index].players;
    const stats = this.teamsAll[index].statistics;
    this.setState( () => { return { 
      team: value,
      errHeader: '',
      errMessage: '',
      teamId: this.teams[ index ].key,
      players: {
        first: {
          _id: players.first._id,
          name: `${players.first.surname || '(brak)'}, ${players.first.name || '(brak)'}`
        },
        second: {
          _id: players.second._id,
          name: `${players.second.surname || '(brak)'}, ${players.second.name || '(brak)'}`
        }
      }
    }})
    this.matchesWon = stats.matches.won || 0;
    this.matchesLost = stats.matches.lost || 0;
    this.goalsFor = stats.goals.for || 0;
    this.goalsAgainst = stats.goals.against || 0;
  }

  onFormSubmit = (e, d) => {
    e.preventDefault();
  }

  render() {
    return (
      <Segment.Group horizontal width={12}>
        <Segment>
          <Form onSubmit={this.onFormSubmit}></Form>
            <Form.Group>
              <Form.Field>
                <Label>Zgłoszone drużyny</Label>
                {/* <Form.Group> */}
                  <Form.Dropdown 
                    key="teamsSelect"
                    name="teamsSelect"
                    // placeholder="puknij gracza nr 1..."    // potrzebne, kiedy nie ma domyślnej wartości
                    selection value={this.state.team} 
                    options={ this.teams } 
                    onChange={ (e, v) => this.onSelectChange(e, v) } 
                  />
                {/* </Form.Group> */}
              </Form.Field>
            </Form.Group>
        </Segment>
        <Segment>
          <Input 
            label="_id:"
            value={ this.state.teamId } 
            disabled={ true }
          />
          <br />
          <br />
          <Label disabled={ true }>Players:</Label>
          <br />
          <Input 
            label="Player 1:"
            value={ this.state.players.first.name }
            disabled={ true }
          />
          <Input 
            label="Player 2:"
            value={ this.state.players.second.name }
            disabled={ true }
          />
          <br />
          <br />
          <Label disabled={ true }>Leagues:</Label>
          <br />
          <br />
          <Label disabled={ true }>Statistics:</Label>
          <Table celled textAlign={"center"}>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell colSpan={2} >Matches</Table.HeaderCell>
                <Table.HeaderCell colSpan={2}>Goals</Table.HeaderCell>
              </Table.Row>
              <Table.Row>
                <Table.HeaderCell>Won</Table.HeaderCell>
                <Table.HeaderCell>Lost</Table.HeaderCell>
                <Table.HeaderCell>For</Table.HeaderCell>
                <Table.HeaderCell>Against</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell>{this.matchesWon}</Table.Cell>
                <Table.Cell>{this.matchesLost}</Table.Cell>
                <Table.Cell>{this.goalsFor}</Table.Cell>
                <Table.Cell>{this.goalsAgainst}</Table.Cell>
              </Table.Row>
            </Table.Body>
            {/* <Table.Footer>
              <Table.Row>
                <Table.HeaderCell>sum</Table.HeaderCell>
                <Table.HeaderCell>sum</Table.HeaderCell>
                <Table.HeaderCell>sum</Table.HeaderCell>
                <Table.HeaderCell>sum</Table.HeaderCell>
              </Table.Row>
            </Table.Footer> */}
          </Table>

        </Segment>
      </Segment.Group>
    )
  };
}

export default TeamView;
import React from 'react';
import Teams from './Teams';
import { Form, Segment, Label, Input, Table, Divider, Header, Icon } from 'semantic-ui-react';
import Store from '../../Store';

class TeamView extends Teams {

  constructor (props) {
    super(props);

    this.state = { 
      editable: false,
      term: '',
      team: '',
      teamId: 0,
      players: {
        first: { 
          _id: '', 
          name: ''
        },
        second: { 
          _id: '',
          name: '' 
        }
      },
      statistics: {
        matches: { 
          won: 0, 
          lost: 0
        },
        goals: { 
          for: 0,
          against: 0 
        }
      }
    };

    this.teams = [];
    this.teamsAll = [];

    this._gt('forSelect');
    this._gt('all');

  }

  static contextType = Store;

  componentDidMount() {

  }

  onSelectChange = (e, { value, name }) => {
    const index = this.teams.map( (el) => { return el.value; } ).indexOf(value);
    const id = this.teams[ index ].key
    const teamsAllIndex = this.teamsAll.map( (el) => { return el._id; } ).indexOf(id); 
    const players = this.teamsAll[teamsAllIndex].players;
    const stats = this.teamsAll[teamsAllIndex].statistics;
    this.setState( () => { return { 
      team: value,
      errHeader: '',
      errMessage: '',
      teamId: id,
      players: {
        first: {
          _id: players.first._id,
          name: `${players.first.surname || '(brak)'}, ${players.first.name || '(brak)'}`
        },
        second: {
          _id: players.second._id,
          name: `${players.second.surname || '(brak)'}, ${players.second.name || '(brak)'}`
        }
      },
      statistics: {
        matches: { 
          won: stats.matches.won || 0, 
          lost: stats.matches.lost || 0
        },
        goals: { 
          for: stats.goals.for || 0,
          against: stats.goals.against || 0 
        }
      }
    }})
  }

  onClickEdit = (e, d) => {
    this.setState( () => { return { editable: !this.state.editable }; } )
  }

  onClickCancel = (e, d) => {
    if (this.state.editable) {
      this.setState( () => { return { editable: false }; } )
    }
  }

  onFormSubmit = (e, d) => {
    e.preventDefault();
  }

  render() {
    return (
      <>
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
            readOnly={ true }
          />
          <br />
          <br />
          <Form.Group>
            <Divider horizontal>
              <Header as='h4'>
                <Icon name='group' />
                Gracze
              </Header>
            </Divider>
            <Input 
              label="Gracz 1:"
              value={ this.state.players.first.name }
              readOnly={ true }
            />
            <Input 
              label="Gracz 2:"
              value={ this.state.players.second.name }
              readOnly={ true }
            />
          </Form.Group>
          <br />
          <br />
          <Divider horizontal>
            <Header as='h4'>
              <Icon name='columns' />
              Ligi
            </Header>
          </Divider>
          <br />
          <br />
          <Divider horizontal>
            <Header as='h4'>
              <Icon name='bar chart' />
              Statystyka
            </Header>
          </Divider>
          <Table celled textAlign={"center"}>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell colSpan={2}>Mecze</Table.HeaderCell>
                <Table.HeaderCell colSpan={2}>Bramki</Table.HeaderCell>
              </Table.Row>
              <Table.Row>
                <Table.HeaderCell>Wygrane</Table.HeaderCell>
                <Table.HeaderCell>Przegrane</Table.HeaderCell>
                <Table.HeaderCell>Zdobyte</Table.HeaderCell>
                <Table.HeaderCell>Stracone</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell>{this.state.statistics.matches.won}</Table.Cell>
                <Table.Cell>{this.state.statistics.matches.lost}</Table.Cell>
                <Table.Cell>{this.state.statistics.goals.for}</Table.Cell>
                <Table.Cell>{this.state.statistics.goals.against}</Table.Cell>
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
      <Form>
        <Form.Group>
          { !this.state.editable && <Form.Button name="btnEdit" onClick={this.onClickEdit}>Edytuj</Form.Button> }
          { this.state.editable && <Form.Button name="btnSave" onClick={this.onFormSubmit}>Zapisz</Form.Button> }
          <Form.Button name="btnCancel" onClick={this.onClickCancel}>Anuluj</Form.Button>
        </Form.Group>
      </Form>
    </>
  )
  };
}

export default TeamView;
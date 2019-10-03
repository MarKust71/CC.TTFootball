import React from 'react';
import Scores from './Scores';
import Store from '../../Store';
import _ from 'lodash';
import { Form, Segment, Label, Header, Icon, Table } from 'semantic-ui-react';

// const tableData = [
//     { team: 'Drużyna1', matchesWon: 2, matchesLost: 1, goalsFor: 24, goalsAgainst: 9 },
//     { team: 'Drużyna2', matchesWon: 1, matchesLost: 2, goalsFor: 17, goalsAgainst: 22 },
//     { team: 'Drużyna3', matchesWon: 0, matchesLost: 3, goalsFor: 20, goalsAgainst: 30 },
//     { team: 'Drużyna4', matchesWon: 3, matchesLost: 0, goalsFor: 30, goalsAgainst: 11 },
//   ]

class ScoresView extends Scores {
    constructor(props) {
        super(props);

        this.state = {
            column: null,
            direction: null,
            editable: false,
            term: '',
            league: '',
            leagueId: 0,
            data: {
                team: '',
                statistics: {
                    points: 0,
                    matches: {
                        played: 0,
                        won: 0,
                        lost: 0
                    },
                    goals: {
                        for: 0,
                        against: 0
                    }
                }
            },
        };

        this.league = [];
        this.leagueAll = [];

        this.gl('forSelect');
        this.gl('all');

    }

    static contextType = Store;

    handleSort = (clickedColumn) => () => {
        const { column, data, direction } = this.state

        if (column !== clickedColumn) {
            this.setState({
                column: clickedColumn,
                data: _.sortBy(data, [clickedColumn]),
                direction: 'ascending',
            })
            return
        }

        this.setState({
            data: data.reverse(),
            direction: direction === 'ascending' ? 'descending' : 'ascending',
        })
    }

    onSelectChange = (e, { value, name }) => {
        const index = this.league.map( (el) => { return el.value; } ).indexOf(value);
        const id = this.league[ index ].key
        const leagueAllIndex = this.leagueAll.map( (el) => { return el._id; } ).indexOf(id); 
        const teams = this.leagueAll[leagueAllIndex].team;
        const stats = this.leagueAll[leagueAllIndex].statistics;
        this.setState( () => { return { 
          team: value,
          errHeader: '',
          errMessage: '',
          leagueId: id,
          data: {
            team: teams.team.name,
            statistics: {
                points: stats.points,
                matches: { 
                  played: stats.matches.played || 0,
                  won: stats.matches.won || 0, 
                  lost: stats.matches.lost || 0
                },
                goals: { 
                  for: stats.goals.for || 0,
                  against: stats.goals.against || 0 
                }
              }
          },
        }})
      }

    onFormSubmit = (e, d) => {
        e.preventDefault();
      }
    
      render() {
        const { column, data, direction } = this.state
    
        return (
            <div className="container" style={{ textAlign: 'left' }}>
        <Header as="h2" textAlign="center" style={{ paddingLeft: '40px' }}>
          <Icon name="ordered list" />
          <Header.Content>Przejrzyj wyniki</Header.Content>
        </Header>

        <Segment>
          <Form onSubmit={this.onFormSubmit}></Form>
            <Form.Group>
              <Form.Field>
                <Label>Lista lig</Label>
                <Form.Dropdown 
                  key="leagueSelect"
                  name="leagueSelect"
                  selection value={this.state.league} 
                  options={ this.league } 
                  onChange={ (e, v) => this.onSelectChange(e, v) } 
                />
              </Form.Field>
            </Form.Group>
        </Segment>

          <Table sortable celled fixed>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell
                  sorted={column === 'team' ? direction : null}
                  onClick={this.handleSort('team')}
                >
                  Nazwa Drużyny
                </Table.HeaderCell>
                <Table.HeaderCell
                  sorted={column === 'matchesWon' ? direction : null}
                  onClick={this.handleSort('matchesWon')}
                >
                  Wygrane mecze
                </Table.HeaderCell>
                <Table.HeaderCell
                  sorted={column === 'matchesLost' ? direction : null}
                  onClick={this.handleSort('matchesLost')}
                >
                  Przegrane mecze
                </Table.HeaderCell>
                <Table.HeaderCell
                  sorted={column === 'goalsFor' ? direction : null}
                  onClick={this.handleSort('goalsFor')}
                >
                  Strzelone bramki
                </Table.HeaderCell>
                <Table.HeaderCell
                  sorted={column === 'goalsAgainst' ? direction : null}
                  onClick={this.handleSort('goalsAgainst')}
                >
                  Stracone bramki
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {_.map(data, ({ team, matchesWon, matchesLost, goalsFor, goalsAgainst }) => (
                <Table.Row key={team}>
                  <Table.Cell>{team}</Table.Cell>
                  <Table.Cell>{matchesWon}</Table.Cell>
                  <Table.Cell>{matchesLost}</Table.Cell>
                  <Table.Cell>{goalsFor}</Table.Cell>
                  <Table.Cell>{goalsAgainst}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
          </div>
        )
      }
}

export default ScoresView;
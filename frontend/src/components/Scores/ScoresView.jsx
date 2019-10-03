import React from 'react';
import Scores from './Scores';
import _ from 'lodash';
import { Form, Segment, Label, Header, Icon, Table } from 'semantic-ui-react';

class ScoresView extends Scores {
  constructor(props) {
    super(props);

    this.state = {
      column: null,
      direction: null,
      league: '',
      data: [
        {
          team: 'Brak drużyn w lidze',
          points: 0,
          matchesPlayed: 0,
          matchesWon: 0,
          matchesLost: 0,
          goalsFor: 0,
          goalsAgainst: 0,
        },
      ],
    };

    this.league = [];
    this.leagueAll = [];
    this.gl('forSelect');
    this.gl('all');
  }

  handleSort = clickedColumn => () => {
    const { column, data, direction } = this.state;

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        data: _.sortBy(data, [clickedColumn]),
        direction: 'ascending',
      });
      return;
    }

    this.setState({
      data: data.reverse(),
      direction: direction === 'ascending' ? 'descending' : 'ascending',
    });
  };

  onSelectChange = (e, { value }) => {
    const index = this.league
      .map(el => el.value)
      .indexOf(value);
    const id = this.league[index].key;
    const leagueAllIndex = this.leagueAll
      .map(el => el._id)
      .indexOf(id);

    const teams = this.leagueAll[leagueAllIndex].teams;
    this.prepareState(teams);

    if (teams.length > 0) {
        this.setState(() => {
          return {
            league: value,
            data: this.state.data,
          };
        });
    } else {
      this.setState(() => {
        return {
          league: value,
          data: [
            {
              team: 'Brak drużyn w lidze',
              points: 0,
              matchesPlayed: 0,
              matchesWon: 0,
              matchesLost:  0,
              goalsFor: 0,
              goalsAgainst: 0,
            },
          ],
        };
      });
    }
  };

  prepareState = teams => {
    for (let i = 0; i < teams.length; i++) {
      const stats = teams[i].statistics;
      if (i === 0) {
        this.state.data = [this.newStateData(teams, stats)]
      } else {
        this.state.data = [...this.state.data, this.newStateData(teams, stats)]
      }
    }
  };

  newStateData = (teams, stats) => {
    return {
      // team: teams[i].team.name,
      points: stats.matches.won * 3,
      matchesPlayed: stats.matches.won + stats.matches.lost,
      matchesWon: stats.matches.won,
      matchesLost: stats.matches.lost,
      goalsFor: stats.goals.for,
      goalsAgainst: stats.goals.against,
    };
  }

  onFormSubmit = e => {
    e.preventDefault();
  };

  render() {
    const { column, data, direction } = this.state;

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
                selection
                value={this.state.league}
                options={this.league}
                onChange={(e, v) => this.onSelectChange(e, v)}
              />
            </Form.Field>
          </Form.Group>
        </Segment>

        <Table sortable celled fixed>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell sorted={column === 'team' ? direction : null} onClick={this.handleSort('team')}>
                Nazwa Drużyny
              </Table.HeaderCell>
              <Table.HeaderCell sorted={column === 'points' ? direction : null} onClick={this.handleSort('points')}>
                Punkty
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === 'matchesPlayed' ? direction : null}
                onClick={this.handleSort('matchesPlayed')}
              >
                Rozegrane mecze
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
              <Table.HeaderCell sorted={column === 'goalsFor' ? direction : null} onClick={this.handleSort('goalsFor')}>
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
            {_.map(data, ({ team, points, matchesPlayed, matchesWon, matchesLost, goalsFor, goalsAgainst }) => (
              <Table.Row key={points}>
                <Table.Cell>{team}</Table.Cell>
                <Table.Cell>{points}</Table.Cell>
                <Table.Cell>{matchesPlayed}</Table.Cell>
                <Table.Cell>{matchesWon}</Table.Cell>
                <Table.Cell>{matchesLost}</Table.Cell>
                <Table.Cell>{goalsFor}</Table.Cell>
                <Table.Cell>{goalsAgainst}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    );
  }
}

export default ScoresView;

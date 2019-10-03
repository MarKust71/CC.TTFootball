import React from 'react';
import { Table } from 'semantic-ui-react';

class ScheduleTable extends React.Component {
  state = {
    matches: [],
  };

//   fetchLeagues = () => {
//     return this.props.query().then(resp => resp.json());
//   };

//   componentDidMount = () => {
//     this.fetchLeagues().then(leagues => this.setState({ leagues }));
//   };

  render() {
    return (
      <Table celled textAlign="center">
        <Table.Header>
          <Table.Row>
              <Table.HeaderCell key='player1' width={4}>
                player1
              </Table.HeaderCell>
              <Table.HeaderCell key='result1' width={1}>
                Bramki1
              </Table.HeaderCell>
              <Table.HeaderCell key='result2' width={1}>
                Bramki2
              </Table.HeaderCell>
              <Table.HeaderCell key='player2' width={4}>
                player2
              </Table.HeaderCell>
              <Table.HeaderCell key='data' width={3}>
                Data
              </Table.HeaderCell>
              <Table.HeaderCell key='edycja' width={2}>
                Edytuj
              </Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
            <Table.Row>
            <Table.Cell>Champions</Table.Cell>
            <Table.Cell>1</Table.Cell>
            <Table.Cell>2</Table.Cell>
            <Table.Cell>Loosers</Table.Cell>
            <Table.Cell>20.09.2019</Table.Cell>
            <Table.Cell>Edytuj</Table.Cell>
            </Table.Row>
        </Table.Body>
      </Table>
    );
  }
}

export default ScheduleTable;
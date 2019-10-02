import React from 'react';
import { Table } from 'semantic-ui-react';

class LeaguesTable extends React.Component {
  state = {
    leagues: [],
  };

  componentDidMount = () => {
    this.props
      .query()
      .then(resp => resp.data)
      .then(leagues => this.setState({ leagues }));
  };

  render() {
    return (
      <Table celled textAlign="center">
        <Table.Header>
          <Table.Row>
            {this.props.headers.map(x => (
              <Table.HeaderCell key={x.name} width={x.width}>
                {x.name}
              </Table.HeaderCell>
            ))}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {this.state.leagues.map(x => (
            <this.props.row key={x._id} data={x} />
          ))}
        </Table.Body>
      </Table>
    );
  }
}

export default LeaguesTable;

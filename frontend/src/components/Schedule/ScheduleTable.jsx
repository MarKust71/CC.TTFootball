import React from 'react';
import axios from 'axios';
import { Table } from 'semantic-ui-react';
import TableRow from './TableRow'

class ScheduleTable extends React.Component {
  state = {
    matches: [],
    league: ''
  }

   componentDidUpdate() {
    if (this.props.league !== '' & this.props.league !== this.state.league) {
        // this.setState({ league: this.props.league})
        axios({
          url: `/api/matches/${this.props.league}/league`,
          method: 'get',
          headers: {'x-auth-token': localStorage.getItem('token'),},
        }).then( async result => {
          await this.setState({ matches: result.data, league: this.props.league });
          console.log(result.data)
        }).catch()
       
    }
    
   
    
  }
    

  render() {
    return (
      <Table celled textAlign="center">
        <Table.Header>
          <Table.Row>
              <Table.HeaderCell key='player1' width={4}>
                Gracz1
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
        {this.state.matches.map(x => (
            <TableRow key={x._id} data={x} />
          ))}
        </Table.Body>
      
        
      </Table>
    );
  }
}

export default ScheduleTable;
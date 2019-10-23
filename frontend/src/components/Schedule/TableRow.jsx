import React from 'react';
import { Table } from 'semantic-ui-react';

class TableRow extends React.Component {


render() {
    return (
            <Table.Row>
            <Table.Cell>{this.props.data.teams.first}</Table.Cell>
            <Table.Cell>{this.props.data.goals? this.props.data.goals.first: '-'}</Table.Cell>
            <Table.Cell>{this.props.data.goals? this.props.data.goals.second: '-'}</Table.Cell>
            <Table.Cell>{this.props.data.teams.second}</Table.Cell>
            <Table.Cell>{this.props.data.date.scheduled}</Table.Cell>
            <Table.Cell>Edytuj</Table.Cell>
            </Table.Row>
    )
}

}

export default TableRow;
import React from 'react';
import { Table, Label, Icon } from 'semantic-ui-react';

class TableRow extends React.Component {

isEditable() {
    return (this.props.role === 'mygames' || (this.props.data.myGame && !this.props.data.goals));
}

render() {
    return (
            <Table.Row>
            <Table.Cell>
                <b>{this.props.data.teams.first.name}</b> <br></br> 
                {this.props.data.teams.first.players.first} / {this.props.data.teams.first.players.second}
            </Table.Cell>
            <Table.Cell>{this.props.data.goals? this.props.data.goals.first: '-'}</Table.Cell>
            <Table.Cell>{this.props.data.goals? this.props.data.goals.second: '-'}</Table.Cell>
            <Table.Cell>
                <b>{this.props.data.teams.second.name}</b> <br></br> 
                {this.props.data.teams.second.players.first} / {this.props.data.teams.second.players.second}
            </Table.Cell>
            <Table.Cell>{this.props.data.date.scheduled.substring(0,10)}</Table.Cell>
            <Table.Cell textAlign="left" collapsing>
            { this.isEditable() &&  (
                <Label as="a" color="blue" ribbon='right'>
                    <Icon name="hand pointer" size="large" />
                    Edytuj
                </Label>
            )}
            </Table.Cell>
            </Table.Row>
    )
}

}

export default TableRow;
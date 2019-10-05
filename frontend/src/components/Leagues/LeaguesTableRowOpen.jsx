import React from 'react';
import { Table, Icon, Label, Modal, Button } from 'semantic-ui-react';
import { formatDate } from '../../utils/date';

class TeamModalView extends React.Component {
  close = () => {
    this.props.onClose();
  };

  render() {
    return (
      <Modal open={this.props.open} onClose={this.close} closeOnDimmerClick={false} closeIcon>
        <Modal.Header>Wybierz drużynę</Modal.Header>
        <Modal.Content>
          <p>Are you sure you want to delete your account</p>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={this.close} positive labelPosition="right" icon="checkmark" content="Yes" />
        </Modal.Actions>
      </Modal>
    );
  }
}

class LeaguesTableRowOpen extends React.Component {
  state = {
    isModalOpen: false,
  };

  openModal = () => {
    this.setState({ isModalOpen: true });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  render() {
    const { data } = this.props;
    const dateCreated = formatDate(data.date.created);
    return (
      <Table.Row>
        <Table.Cell>{data.name}</Table.Cell>
        <Table.Cell>{data.description}</Table.Cell>
        <Table.Cell>{data.owner}</Table.Cell>
        <Table.Cell>{dateCreated}</Table.Cell>
        <Table.Cell>{data.teams.length}</Table.Cell>
        <Table.Cell textAlign="left">
          <Label as="a" color="blue" ribbon="right" onClick={this.openModal}>
            <Icon name="hand pointer" size="large" />
            Dołącz
          </Label>
        </Table.Cell>
        <TeamModalView open={this.state.isModalOpen} onClose={this.closeModal} />
      </Table.Row>
    );
  }
}

export default LeaguesTableRowOpen;

import React from 'react';
import { Table, Icon, Label, Modal } from 'semantic-ui-react';
import { formatDate } from '../../utils/date';
import AskModal from '../Modals/AskModal';
import setHeaders from '../../utils/setHeaders';
import TeamViewGridWithSearch from '../Teams/TeamViewGridWithSearch';
import axios from 'axios';

const unpackPlayers = teams => {
  const name = localStorage.getItem('id');
  const unpackPlayer = team => {
    return team.players.first === name ? team.players.second : team.players.first;
  };
  for (let team of teams) {
    team.player = unpackPlayer(team);
  }
  return teams;
};

class TeamViewModal extends React.Component {
  state = {
    askModalProps: {
      open: false,
    },
  };

  openModalFactory = team => () => {
    this.setState({
      askModalProps: {
        header: `Czy chcesz się zapisać zespołem ${team.name} do ligi ${this.props.league.name}?`,
        positive: 'Tak',
        negative: 'Nie',
        open: true,
        onClose: this.closeModal,
        onPositive: () => {
          this.props.onClose();
          console.log('Positive');
        },
      },
    });
  };

  closeModal = () => {
    this.setState({ askModalProps: { open: false } });
  };

  render() {
    return (
      <Modal open={this.props.open} onClose={this.props.onClose} closeOnDimmerClick={false} closeIcon>
        <Modal.Header>Wybierz drużynę</Modal.Header>
        <Modal.Content scrolling>
          <TeamViewGridWithSearch columns={3} teams={this.props.teams} onClickFactory={this.openModalFactory} />
        </Modal.Content>
        <AskModal {...this.state.askModalProps} />;
      </Modal>
    );
  }
}

class LeaguesTableRowOpen extends React.Component {
  state = {
    isModalOpen: false,
    teams: [],
  };

  openModal = () => {
    axios
      .get(`/api/users/${localStorage.getItem('id')}/teams`, setHeaders())
      .then(resp => resp.data)
      .then(teams => this.setState({ teams: unpackPlayers(teams), isModalOpen: true }));
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
        <TeamViewModal open={this.state.isModalOpen} onClose={this.closeModal} league={data} teams={this.state.teams} />
      </Table.Row>
    );
  }
}

export default LeaguesTableRowOpen;

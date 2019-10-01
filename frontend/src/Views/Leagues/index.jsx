import React from 'react';
import SubPage from '../../components/SubPage';
import { Table, Icon, Label, Modal, Button, Segment } from 'semantic-ui-react';
import * as moment from 'moment';

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

class LeaguesTableOpenRow extends React.Component {
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
    const date = moment(data.date.created).format('DD.MM.YYYY');
    return (
      <Table.Row>
        <Table.Cell>{data.name}</Table.Cell>
        <Table.Cell>{data.description}</Table.Cell>
        <Table.Cell>{data.owner}</Table.Cell>
        <Table.Cell>{date}</Table.Cell>
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

class LeaguesTable extends React.Component {
  state = {
    leagues: [],
  };

  fetchLeagues = () => {
    return this.props.query().then(resp => resp.json());
  };

  componentDidMount = () => {
    this.fetchLeagues().then(leagues => this.setState({ leagues }));
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

const LeaguesTableOpen = () => {
  const config = {
    headers: [
      { width: 3, name: 'Nazwa' },
      { width: 4, name: 'Opis' },
      { width: 3, name: 'Twórca' },
      { width: 3, name: 'Data utworzenia' },
      { width: 1, name: 'Zapisanych drużyn' },
      { width: 2, name: 'Zapisy' },
    ],
    query: () => fetch('/api/leagues/'),
    row: LeaguesTableOpenRow,
  };
  return <LeaguesTable {...config} />;
};

const LeaguesTablePending = () => {
  const config = {
    headers: [
      { width: 3, name: 'Nazwa' },
      { width: 4, name: 'Opis' },
      { width: 3, name: 'Twórca' },
      { width: 3, name: 'Data utworzenia' },
      { width: 1, name: 'Zapisanych drużyn' },
      { width: 2, name: 'Zapisy' },
    ],
    query: () => fetch('/api/leagues/'),
    row: LeaguesTableOpenRow,
  };
  return <LeaguesTable {...config} />;
};

const LeaguesTableClosed = () => {
  const config = {
    headers: [
      { width: 3, name: 'Nazwa' },
      { width: 4, name: 'Opis' },
      { width: 3, name: 'Twórca' },
      { width: 3, name: 'Data utworzenia' },
      { width: 1, name: 'Zapisanych drużyn' },
      { width: 2, name: 'Zapisy' },
    ],
    query: () => fetch('/api/leagues/'),
    row: LeaguesTableOpenRow,
  };
  return <LeaguesTable {...config} />;
};

const LeaguesTableOwner = () => {
  const config = {
    headers: [
      { width: 3, name: 'Nazwa' },
      { width: 4, name: 'Opis' },
      { width: 3, name: 'Twórca' },
      { width: 3, name: 'Data utworzenia' },
      { width: 1, name: 'Zapisanych drużyn' },
      { width: 2, name: 'Zapisy' },
    ],
    query: () => fetch('/api/leagues/'),
    row: LeaguesTableOpenRow,
  };
  return <LeaguesTable {...config} />;
};

const Leagues = props => {
  const path = props.match.path;
  const routing = [
    { name: 'Otwarte', path: `${path}/Open`, component: LeaguesTableOpen },
    { name: 'Trwające', path: `${path}/Pending`, component: LeaguesTablePending },
    { name: 'Zakończone', path: `${path}/Closed`, component: LeaguesTableClosed },
    { name: 'Twoje', path: `${path}/Owner`, component: LeaguesTableOwner },
  ];

  return (
    <Segment>
      {' '}
      <SubPage routing={routing} />{' '}
    </Segment>
  );
};

export default Leagues;

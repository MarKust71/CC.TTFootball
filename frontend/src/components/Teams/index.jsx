import React from 'react';
import { Grid, Menu, Header, Icon, Segment } from 'semantic-ui-react';
import Teams from './Teams';
import TeamCreate from './TeamCreate';
import TeamView from './TeamView';

class ComponentTeams extends Teams {
  constructor(props) {
    super(props);

    this.state = {
      term: '',
      activeItem: 'przejrzyj',
      isMe: false,
    };

    // this.teamsOfDivision = this._getDivisions();
    // console.log(localStorage);
  }

  componentDidMount() {
    this.setState(() => {
      return { isMe: !!this.context.me };
    });
  }

  onInputChange = e => {
    this.props.onChange(this.state.term);
  };

  onSelectChange = (e, { value, name }) => {
    this.props.onChange(this.state.term);
  };

  onFormSubmit = () => {
    this.props.onSubmit(this.state.term);
  };

  onClickCancel = () => {
    this.props.onSubmit(this.state.term);
  };

  handleItemClick = (e, { name }) =>
    this.setState(() => {
      return { activeItem: name };
    });

  render() {
    const { activeItem } = this.state;
    return (
      <div className="container" style={{ textAlign: 'left' }}>
        <Header as="h2" textAlign="center" style={{ paddingLeft: '40px' }}>
          <Icon name="group" />
          <Header.Content>Zarządzanie drużynami</Header.Content>
        </Header>

        {!this.state.isMe && (
          <Segment>
            Przeloguj się, bo nie widać "<i>context.me</i>"
          </Segment>
        )}

        <Segment>
          <Grid>
            <Grid.Column stretched width={2}>
              <Menu fluid vertical tabular>
                <Menu.Item name="przejrzyj" active={activeItem === 'przejrzyj'} onClick={this.handleItemClick} />
                <Menu.Item name="dodaj" active={activeItem === 'dodaj'} onClick={this.handleItemClick} />
              </Menu>
            </Grid.Column>

            <Grid.Column stretched width={14}>
              {this.state.activeItem === 'dodaj' && <TeamCreate />}
              {this.state.activeItem === 'przejrzyj' && <TeamView />}
            </Grid.Column>
          </Grid>
        </Segment>
      </div>
    );
  }
}

export { Teams, ComponentTeams };

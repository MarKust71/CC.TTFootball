import React, { Component } from 'react'
import { Menu, Icon } from 'semantic-ui-react'

const me = JSON.parse(localStorage.me);

class TopMenu extends Component {
  state = { activeItem: 'news' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <div>
        <Menu attached='top' tabular widths={2}>
          <Menu.Item
            name="news"
            active={activeItem === 'news'}
            onClick={this.handleItemClick}
          >
            <Icon name="user" />
            Aktualności
          </Menu.Item>
          <Menu.Item
            name="profile"
            active={activeItem === 'profile'}
            onClick={this.handleItemClick}
          >
            <Icon name="user" />
            {me.name + " " + me.surname}
          </Menu.Item>
        </Menu>
      </div>
    )
  }
}

export default TopMenu;

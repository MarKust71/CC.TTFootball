import React, { Component } from 'react';
import { Segment, Message } from 'semantic-ui-react';
import Store from '../../Store';

class Profile extends Component {
  static contextType = Store;

  render() {
    return (
      <div>
        <Segment>
          Twój profil
      </Segment>
      <Message>
            <p>
              Jeseś zalogowany jako: <strong>{this.context.me._id}</strong>, 
              Twoja rola: <strong>{this.context.me.role}</strong>, 
              Grasz w dywizji: <strong>{this.context.me.division}</strong>
            </p> 
          </Message>
      </div>
    )
  }
}

export default Profile;
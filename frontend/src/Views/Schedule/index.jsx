import React from 'react';
import axios from 'axios';
import {Grid, Segment, Divider} from 'semantic-ui-react';
import {
  ScheduleTable, DropdownLeague, DropdownRole, DropdownStatus
} from '../../components/Schedule';


// import { DocumentProvider, PromiseProvider } from 'mongoose';
// const Schedule = () => {
//   return <div>Schedule</div>;
// };


class ScheduleView extends React.Component {
  state = {
    status: '',
    role: '',
    leagues: [],
    leaguesChoice: [],
    matches: [],
    me: '',
    division: ''
  }
  
  onStatusChange = async (e, {value}) => {
    await this.setState( {status: value});
    this.onChangeFilter();
  }   
  onRoleChange = (e, {value}) =>  this.setState( {role: value});
  onLeagueChange = (e, {value}) =>  {
    this.setState({ matches: this.state.leagues.find( obj => obj._id === value).matches});  
  }

  onChangeFilter = () => {
    this.setState({ leaguesChoice: this.state.leagues.filter( obj => {
      return obj.status === this.state.status;
    }).map(obj => { return {key: obj._id, value: obj._id, text: obj.name}})});
    // console.log(tempArray)
  }


  componentDidMount() {
    axios({
      url: '/api/leagues',
      method: 'get',
      headers: {
          'x-auth-token': localStorage.getItem('token'),
    },
    }).then( result => {
      this.setState( { leagues: result.data } );
      // leaguesChoice: result.data.map(obj => { return {key: obj._id, value: obj._id, text: obj.name} }),
      console.log(result)
    })
    
  }

  

  render() {
    return (
      <Segment>
        <Grid>
          <Grid.Column width={3}>
            <DropdownRole triggerChange={this.onRoleChange} />
            <Divider horizontal/>
            <DropdownStatus triggerChange={this.onStatusChange} />
            <Divider horizontal/>
            { this.state.role && this.state.status && (
              <DropdownLeague options={this.state.leaguesChoice} triggerChange={this.onLeagueChange} />
            )}
            
          </Grid.Column>
          <Grid.Column stretched width={13}>
            <ScheduleTable/>
          </Grid.Column>
        </Grid>
      </Segment>
  );}
};

export default ScheduleView;
import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Form, Input, TextArea, Button } from 'semantic-ui-react';
// import DatePicker from './DatePicker';


class NewLeague extends React.Component {
    state = {
        name: '',
        description: '',
        startDate: '',
        postSuccessful: false
    };

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
    };

    onFormSubmit = async e => {
        e.preventDefault();
        
        const postLeague = await axios({
            url: '/api/leagues', 
            method: 'post',
            data: {  
              name: this.state.name,
              description: this.state.description,
              date: {started: this.state.startDate}
            },
            headers: {
                'x-auth-token': localStorage.getItem('token')
            }
        }).then (postLeague => {
            alert(`Założone!!
            ${postLeague.data.owner.name} - jesteś sędzią głównym w lidze: ${postLeague.data.name}`);
            this.setState({ postSuccessful: true});
          }).catch (postLeague => {
            alert(postLeague.response.data[0].message)
          })        
    };

    render() {        
        if (this.state.postSuccessful)  return <Redirect to="/" />;
        return (
            <Form onSubmit={this.onFormSubmit}>
                <Form.Group widths='equal'>
                    <Form.Input
                        name='name'
                        control={Input}
                        label='Nazwa'
                        placeholder='Jak nazwiesz ligę?'
                        onChange={this.handleInputChange}
                    />
                    <Form.Input
                        name="startDate"
                        control = {Input}
                        label='Data startu'
                        placeholder='rrrr-mm-dd'
                        onChange = {this.handleInputChange}
                    />
                </Form.Group>
                <Form.Input
                    name='description'
                    control={TextArea}
                    label='Opis (opcjonalny)'
                    placeholder='Dodaj kilka słów, jeśli chcesz'
                    onChange = {this.handleInputChange}
                    // value={this.state.description}
                />
                <Button type='submit'
                    id='submit'
                    content='Załóż'
                />
            </Form>
        );
    };
}

export default NewLeague;

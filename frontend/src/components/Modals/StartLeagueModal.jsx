import React from 'react';
import { Modal, Button, Input, Form } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import setHeaders from '../../utils/setHeaders';

class StartLeagueModal extends React.Component {

    state= {
        rounds: 1,
        endDate: ''
    }
    
    handleRoundsChange = event => {
        const value = event.target.value;
        if (value.length <= 1) {
            this.setState({
                rounds: value.replace(/\D/,'' ).replace(/[0]/, 1 ),
              });
        }    
    };

    handleDateChange = date => {
        this.setState({
          endDate: date,
        });
    };

    onPositive = () => {
        if (!this.state.rounds || !this.state.endDate) {
            console.log("brak daty zak. lub ilości rund")
            return
        }
        axios({
            url: `/api/leagues/${this.props.league}/start`,
            method: 'PUT',
            ...setHeaders(),
            data: {
              end: this.state.endDate,
              rounds: this.state.rounds,
            },
          }).then(() => {
            alert("Do boju!");
          }).catch( error => {
              alert(error.message)
          });
        // (this.props.onPositive || (() => {}))();
        this.props.onClose();
    };

    onNegative = () => {
        (this.props.onNegative || (() => {}))();
        this.props.onClose();
    };

    render() {
        return (
            <Modal open={this.props.open} onClose={this.props.onClose} closeOnDimmerClick={false} size="small">
                <Modal.Header>{this.props.header}</Modal.Header>
                {this.props.children ? <Modal.Content>{this.props.children}</Modal.Content> : ''}
                <Modal.Actions>
                    <Form position = 'right'>
                        <Form.Group >
                            <Form.Input  label = 'Ile rund zagracie?' name = 'rounds' value = {this.state.rounds} onChange={this.handleRoundsChange}/>
                            <Form.Input name="endDate" label="Kiedy zakończenie ligi?">
                            {
                                <DatePicker
                                selected={this.state.endDate}
                                onChange={this.handleDateChange}
                                minDate={Date.now()}
                                // placeholderText="Kiedy zaczynacie?"
                                />
                            }
                            </Form.Input>
                        </Form.Group>
                    </Form>
                </Modal.Actions>
                <Modal.Actions>
                    <Button onClick={this.onPositive} positive labelPosition="right" icon="checkmark" content={this.props.positive} />
                    <Button onClick={this.onNegative} negative labelPosition="right" icon="close" content={this.props.negative} />
                </Modal.Actions>
            </Modal>
      );
  }
  
};

export default StartLeagueModal;
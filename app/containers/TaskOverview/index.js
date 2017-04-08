/*
 *
 * TaskOverview
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { fromJS } from 'immutable';
import { createStructuredSelector } from 'reselect';
import { Grid, Row, Col, ListGroup, ListGroupItem, FormGroup, FormControl, ControlLabel, HelpBlock, Checkbox, Button, ButtonToolbar, Form, Modal, } from 'react-bootstrap';
import makeSelectTaskOverview from './selectors';
import { getTasks } from './actions';
import messages from './messages';

export class TaskOverview extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      selectedTask: {},
    };
  }

  componentWillMount() {
    this.props.getTasks();
  }

  updateTask(key, val) {
    const newTask = this.state.selectedTask;
    newTask[key] = val;
    this.setState({ selectedTask: newTask });
  }

  render() {
    const { tasks, error } = this.props.TaskOverview;
    const selectedTask = this.state.selectedTask;
    return (
      <div>
        <Helmet
          title="Tasks"
          meta={[
            { name: 'description', content: 'Description of TaskOverview' },
          ]}
        />
        {/*<FormattedMessage {...messages.header} />*/}

        <Grid>
          <Row>
            <Col xs={12} md={4}>
              <h1>Tasks</h1>
              <ListGroup>
                { tasks.length === 0 && <ListGroupItem disabled>No tasks found</ListGroupItem>}
                {
                  tasks.map((task, idx) =>
                    <ListGroupItem
                      key={idx}
                      onClick={() => { this.setState({ selectedTask: fromJS(task).toJS() }); console.log('ya') }}
                      active={this.state.selectedTask._id && this.state.selectedTask._id['$oid'] === task._id['$oid']}
                      bsStyle={task.active ? undefined : 'danger'}
                    >
                      {task.name}
                      <Button className="pull-right" bsSize="small" bsStyle="danger">x</Button>
                    </ListGroupItem>
                  )
                }
              </ListGroup>

              <ButtonToolbar>
                <Button bsStyle="success">Add task</Button>
                <Button bsStyle="info">Refresh</Button>
              </ButtonToolbar>

            </Col>

            <Col xs={12} md={8}>
              <h1>Properties</h1>
              { selectedTask._id &&
              <form>
                <FormGroup controlId="name" validationState={(selectedTask.name.length < 1) ? 'error' : 'success'} >
                  <ControlLabel>Name</ControlLabel>
                  <FormControl
                    type="text"
                    value={selectedTask.name}
                    onChange={(x) => this.updateTask('name', x.target.value)}
                    placeholder="Enter name"
                  />
                  <FormControl.Feedback />
                </FormGroup>

                <FormGroup controlId="active">
                  <ControlLabel>Active</ControlLabel>
                  <br />
                  <Button
                    bsStyle={selectedTask.active ? 'primary' : 'danger'}
                    onClick={() => this.updateTask('active', !selectedTask.active)}
                  >
                    {selectedTask.active ? 'Active' : 'Inactive'}
                  </Button>
                </FormGroup>

                <FormGroup controlId="dataCollection">
                  <ControlLabel>Data collection</ControlLabel>
                  <FormControl
                    type="text"
                    value={selectedTask.data_collection_id['$oid']}
                    onChange={(x) => this.updateTask('data_collection_id', x.target.value)}
                  />
                  <FormControl.Feedback />
                </FormGroup>

                <FormGroup controlId="reward" validationState={(selectedTask.reward <= 0) ? 'error' : 'success'} >
                  <ControlLabel>Reward</ControlLabel>
                  <FormControl
                    type="number"
                    value={selectedTask.reward}
                    onChange={(x) => this.updateTask('reward', x.target.value)}
                    placeholder="Enter reward"
                  />
                  <FormControl.Feedback />
                </FormGroup>

                <FormGroup controlId="reward" validationState={(selectedTask.time_indication <= 0) ? 'error' : 'success'} >
                  <ControlLabel>Time indication (min.)</ControlLabel>
                  <FormControl
                    type="number"
                    value={selectedTask.time_indication}
                    onChange={(x) => this.updateTask('time_indication', x.target.value)}
                    placeholder="Enter time indication"
                  />
                  <FormControl.Feedback />
                </FormGroup>

                <div>
                  <h2>Questions</h2>
                  {
                    selectedTask.questions.map((q, idx) =>
                      <div key={idx}>
                        <h3>Question {idx+1}</h3>
                        <Form inline>
                          <FormGroup controlId="message">
                            <ControlLabel>Message</ControlLabel>
                            {' '}
                            <FormControl type="text" placeholder="Message" value={selectedTask.questions[idx].message} onChange={(x) => this.updateTask(`questions[${idx}].message`, x.target.value)} />
                          </FormGroup>
                          {' '}
                          <FormGroup controlId="expectedType">
                            <ControlLabel>Expected type</ControlLabel>
                            {' '}
                            <FormControl type="text" placeholder="Expected type" value={selectedTask.questions[idx].expected_type} onChange={(x) => this.updateTask(`questions[${idx}].expected_type`, x.target.value)} />
                          </FormGroup>
                        </Form>
                      </div>
                    )
                  }
                </div>
              </form>
              }
            </Col>
          </Row>
        </Grid>
        <p> {error} </p>
      </div>
    );
  }
}

TaskOverview.propTypes = {
  getTasks: PropTypes.func.isRequired,
  TaskOverview: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  TaskOverview: makeSelectTaskOverview(),
});

function mapDispatchToProps(dispatch) {
  return {
    getTasks: () => {
      dispatch(getTasks());
    },
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskOverview);

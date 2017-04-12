/*
 *
 * TaskOverview
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { fromJS } from 'immutable';
import { createStructuredSelector } from 'reselect';
import { Grid, Row, Col, ListGroup, ListGroupItem, FormGroup, FormControl, ControlLabel, HelpBlock, Checkbox, Button, ButtonToolbar, Form, Modal, Table, } from 'react-bootstrap';
import{ makeSelectTaskOverview, makeSelectData } from './selectors';
import { getTasks, createTask } from './actions';
import { getData } from '../Data/actions';

export class TaskOverview extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      selectedTask: undefined,
    };

    this.newTask = this.newTask.bind(this);
    this.addQuestion = this.addQuestion.bind(this);
  }

  componentWillMount() {
    this.props.getTasks();
    if (this.props.Data.data.length === 0) {
      this.props.getData();
    }
  }

  updateTask(key, val) {
    const newTask = this.state.selectedTask;
    newTask[key] = val;
    this.setState({ selectedTask: newTask });
  }
  updateQuestion(idx, key, val) {
    const newTask = this.state.selectedTask;
    newTask.questions[idx][key] = val;
    this.setState({ selectedTask: newTask });
  }
  addQuestion() {
    const newTask = this.state.selectedTask;
    newTask.questions.push({
      message: '',
      expected_type: 'TEXT',
      suggestions: [],
      question_data_idx: undefined,
    });
    this.setState({ selectedTask: newTask });
  }

  newTask() {
    this.setState({
      selectedTask: {
        _id: {
          $oid: 'new',
        },
        name: '',
        data_collection_id: '',
        reward: 10,
        time_indication: 1,
        coordinates: undefined,
        questions: [
          {
            message: '',
            expected_type: 'TEXT',
            suggestions: [],
            question_data_idx: undefined,
          },
        ],
      },
    });
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
                      onClick={() => { this.setState({ selectedTask: fromJS(task).toJS() }); }}
                      active={selectedTask && selectedTask._id['$oid'] === task._id['$oid']}
                      bsStyle={task.active ? undefined : 'danger'}
                    >
                      {task.name}
                    </ListGroupItem>
                  )
                }
                {/*{ selectedTask && selectedTask._id.$oid === 'new' && <ListGroupItem active>New task</ListGroupItem>}*/}
              </ListGroup>

              <ButtonToolbar>
                <Button bsStyle="success" onClick={this.newTask}>Add task</Button>
                <Button bsStyle="info">Refresh</Button>
              </ButtonToolbar>

            </Col>

            <Col xs={12} md={8}>
              <h1>Properties</h1>
              { selectedTask &&
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

                {/*Todo: Select list of data collection names*/}
                <FormGroup controlId="dataCollection">
                  <ControlLabel>Data collection</ControlLabel>
                  <FormControl
                    type="text"
                    value={selectedTask.data_collection_id['$oid'] || selectedTask.data_collection_id }
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

                <FormGroup controlId="time indication" validationState={(selectedTask.time_indication <= 0) ? 'error' : 'success'} >
                  <ControlLabel>Time indication (min.)</ControlLabel>
                  <FormControl
                    type="number"
                    value={selectedTask.time_indication}
                    onChange={(x) => this.updateTask('time_indication', x.target.value)}
                    placeholder="Enter time indication"
                  />
                  <FormControl.Feedback />
                </FormGroup>

                <FormGroup controlId="coordinates" validationState={(selectedTask.coordinates && (selectedTask.coordinates.coordinates || selectedTask.coordinates).length !== 2) ? 'error' : 'success'} >
                  <ControlLabel>Location (latitude, longitude)</ControlLabel>
                  <FormControl
                    type="string"
                    value={selectedTask.coordinates ? (selectedTask.coordinates.coordinates || selectedTask.coordinates).join(', ') : ''}
                    onChange={(x) => { this.updateTask('coordinates', x.target.value === '' ? undefined : x.target.value.split(',').map((n) => Number(n))); }}
                    placeholder="latitude, longitude"
                  />
                  <FormControl.Feedback />
                </FormGroup>

                <div>
                  <h2>Questions</h2>
                  <Button onClick={this.addQuestion}>Add question</Button>
                  <Table>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Question properties</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                      selectedTask.questions.map((q, idx) =>
                        <tr key={idx}>
                          <td>{idx + 1}</td>
                          <td>
                            <FormGroup controlId="message">
                              <ControlLabel>Message</ControlLabel>
                              <FormControl type="text" placeholder="Message" value={selectedTask.questions[idx].message} onChange={(x) => this.updateQuestion(idx, 'message', x.target.value)} />
                            </FormGroup>
                            <FormGroup controlId="expectedType">
                              <ControlLabel>Expected type</ControlLabel>
                              <FormControl componentClass="select" value={selectedTask.questions[idx].expected_type} onChange={(x) => this.updateQuestion(idx, 'expected_type', x.target.value)}>
                                <option value="TEXT">TEXT</option>
                                <option value="IMAGE">IMAGE</option>
                              </FormControl>
                            </FormGroup>
                            <FormGroup controlId="data_id">
                              <ControlLabel>Question data (optional)</ControlLabel>
                              <FormControl type="number" placeholder="Index" value={selectedTask.questions[idx].question_data_idx} onChange={(x) => this.updateQuestion(idx, 'question_data_idx', x.target.value === '' ? undefined : Number(x.target.value))} />
                              <HelpBlock>This number corresponds to the index in question data items of the specified data collection</HelpBlock>
                            </FormGroup>
                            <FormGroup controlId="data_id">
                              <ControlLabel>Suggestions (optional)</ControlLabel>
                              <FormControl type="text" placeholder="suggestion 1, suggestion 2, ..." value={selectedTask.questions[idx].suggestions.join(', ')} onChange={(x) => this.updateQuestion(idx, 'suggestions', x.target.value.split(', '))} />
                              <HelpBlock>Suggestions will appear as buttons in chat services if available (Separate suggestions with commas)</HelpBlock>
                            </FormGroup>
                          </td>
                        </tr>
                      )
                      }
                    </tbody>
                  </Table>
                </div>
                <br />
                <ButtonToolbar>
                  <Button onClick={() => this.props.createTask(fromJS(selectedTask).toJS())} bsStyle="success">{selectedTask._id.$oid === 'new' ? 'Submit task' : 'Save task'}</Button>
                  <Button onClick={this.deleteTask} bsStyle="danger" disabled={selectedTask._id.$oid === 'new'}>Remove task</Button>
                </ButtonToolbar>
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
  createTask: PropTypes.func.isRequired,
  getData: PropTypes.func.isRequired,
  TaskOverview: PropTypes.object.isRequired,
  Data: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  TaskOverview: makeSelectTaskOverview(),
  Data: makeSelectData(),
});

function mapDispatchToProps(dispatch) {
  return {
    getTasks: () => {
      dispatch(getTasks());
    },
    createTask: (task) => {
      dispatch(createTask(task));
    },
    getData: () => {
      dispatch(getData());
    },
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskOverview);

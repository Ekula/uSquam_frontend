/*
 *
 * Results
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import Select from 'react-select';
import 'react-select/dist/react-select.css';

import { Grid, Row, Col, Button, ButtonGroup, DropdownButton, Nav, NavItem, Table, MenuItem, Alert, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

import { TimeSeries, Index } from 'pondjs';
import { Charts, ChartContainer, ChartRow, YAxis, BarChart, Resizable } from 'react-timeseries-charts';

import { createStructuredSelector } from 'reselect';
import { makeSelectResults, makeSelectTaskOverview } from './selectors';
import { getSessions } from './actions';
import { getTasks } from '../TaskOverview/actions';

import RefreshIcon from './refresh-icon.png';


export class Results extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.state = {
      selectedTaskId: undefined,
      selectedTab: 0,
    };
    this.selectTask = this.selectTask.bind(this);
  }

  componentWillMount() {
    if (this.props.taskOverview.tasks.length === 0) {
      this.props.getTasks();
    }
  }

  selectTask(id) {
    this.setState({ selectedTaskId: id.value });
    this.props.getSessions(id.value);
  }

  render() {

    const tasks = this.props.taskOverview.tasks || [];
    const taskOptions = tasks.map((x) => ({ value: x._id['$oid'], label: x.name }));

    let tabContent;
    if (this.state.selectedTaskId === undefined) {
      tabContent = (
        <Col md={6} mdOffset={3}>
          <br />
          <Alert bsStyle="warning"> <strong>No task selected!</strong> Please select a task to show the results from. </Alert>
          <br /><br /><br /><br /><br />
        </Col>);
    } else if (this.state.selectedTab === 0) {
      tabContent = (
        <Table responsive>
          <thead>
            <tr>
              <th>#</th>
              { this.props.Results.sessions.length > 0 && this.props.Results.sessions[0].answers.map((s, i) =>
                <th>Answer {i + 1}</th>) }
            </tr>
          </thead>
          <tbody>
            { this.props.Results.sessions.map((s, i) =>
              <tr>
                <td>{i}</td>
                { this.props.Results.sessions[i].answers.map((ans) => <td>{ans.message}</td>) }
              </tr>
            )}
          </tbody>
        </Table>);
    } else if (this.state.selectedTab === 1) {
      const totalTasks = this.props.Results.sessions.length;
      let finishedTasks = 0;
      this.props.Results.sessions.forEach((s) => { if (s.status === 'DONE') { finishedTasks += 1; } });
      const binTime = 3600000 * 24;
      const timestamps = this.props.Results.sessions.map((s) => s.answers[0].timestamp['$date']).sort((x, y) => x - y);
      const totalTime = timestamps[timestamps.length - 1] - timestamps[0];
      const binCount = Math.ceil(totalTime / binTime);
      const binWidth = totalTime / binCount;
      const bins = Array(...Array(binCount)).map(Number.prototype.valueOf, 0);

      timestamps.forEach((x) => {
        bins[Math.round(((x - timestamps[0]) / totalTime) * binCount)] += 1;
      });
      const points = bins.map((b, i) => [
        Index.getIndexString('1d', new Date(Math.round(timestamps[0] + (i * binWidth)))),
        b,
      ]);
      const sessionStartData = new TimeSeries({
        name: 'Session start',
        columns: ['index', 'value'],
        points,
      });
      tabContent = <div>
        <Col lg={4}>
          <Table responsive hover>
            <tbody>
              <tr>
                <td>Total sessions started:</td>
                <td>{totalTasks}</td>
              </tr>
              <tr>
                <td>Total sessions completed:</td>
                <td>{finishedTasks}</td>
              </tr>
              <tr>
                <td>Total sessions incompleted:</td>
                <td>{totalTasks - finishedTasks}</td>
              </tr>
            </tbody>
          </Table>
        </Col>
        <Col xs={12} md={12}>
          <Resizable>
            <ChartContainer timeRange={sessionStartData.timerange()} width={800}>
              <ChartRow height="200">
                <YAxis id="axis1" label="Tasks started" min={0} max={sessionStartData.max()} width="60" type="linear" />
                <Charts>
                  <BarChart axis="axis1" series={sessionStartData} spacing={1} columns={['value']} />
                </Charts>
              </ChartRow>
            </ChartContainer>
          </Resizable>
        </Col>
      </div>;
    } else if (this.state.selectedTab === 2) {
      tabContent = <Col md={8} mdOffset={2}><h2><i>Coming soon!</i></h2> <br /><br /><br /><br /><br /> </Col>;
    } else if (this.state.selectedTab === 3) {
      tabContent = (
        <Col md={8} mdOffset={2}>
          <br />
          <ButtonGroup>
            <DropdownButton title="File type" id="bg-nested-dropdown">
              <MenuItem eventKey="1">.json</MenuItem>
              <MenuItem eventKey="2" disabled>.csv</MenuItem>
              <MenuItem eventKey="3" disabled>.xml</MenuItem>
            </DropdownButton>
            <Button><a href={`/api/tasks/${this.state.selectedTaskId}/sessions`} download="results.json">Download</a></Button>
          </ButtonGroup>
          <br />
          <FormGroup controlId="preview">
            <ControlLabel>Preview</ControlLabel>
            <FormControl style={ {'min-height': '256px'} } componentClass="textarea" placeholder="textarea" readonly value={JSON.stringify(this.props.Results.sessions, null, 2)} />
          </FormGroup>
        </Col>
      );
    }

    return (
      <div>
        <Helmet
          title="Results"
          meta={[
            { name: 'description', content: 'Description of Results' },
          ]}
        />

        <Grid>
          <Row>
            <Col lg={1} lgOffset={2} md={1} mdOffset={1} xs={2}>
              <h4>Task: </h4>
            </Col>
            <Col lg={6} md={8} xs={8} >
              <Select
                name="select-task"
                options={taskOptions}
                value={this.state.selectedTaskId}
                onChange={this.selectTask}
                noResultsText="No tasks found"
                placeholder="Type or click here to select a task"
              />
            </Col>
            <Col lg={1} md={1} xs={2}>
              <Button
                bsStyle="info"
                onClick={() => this.props.getSessions(this.state.selectedTaskId)}
                disabled={this.state.selectedTaskId === undefined}
              >
                <img width={22} src={RefreshIcon} alt="refresh" />
              </Button>
            </Col>
          </Row>

          <Row xs={12} md={12}>
            <Nav bsStyle="tabs" activeKey={this.state.selectedTab} onSelect={(x) => this.setState({ selectedTab: x })}>
              <NavItem eventKey={0} title="Answers" >Answers</NavItem>
              <NavItem eventKey={1} title="Statistics">Statistics</NavItem>
              <NavItem eventKey={2} title="Feedback">Feedback</NavItem>
              <NavItem eventKey={3} title="Download">Download</NavItem>
            </Nav>
          </Row>
          <Row xs={12} md={12}>
            { tabContent }
          </Row>
        </Grid>
      </div>
    );
  }
}

Results.propTypes = {
  Results: React.PropTypes.object.isRequired,
  taskOverview: React.PropTypes.object.isRequired,
  getSessions: React.PropTypes.func.isRequired,
  getTasks: React.PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  Results: makeSelectResults(),
  taskOverview: makeSelectTaskOverview(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getSessions: (taskId) => {
      dispatch(getSessions(taskId));
    },
    getTasks: () => {
      dispatch(getTasks());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Results);

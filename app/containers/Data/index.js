/*
 *
 * Data
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { fromJS } from 'immutable';
import { Grid, Row, Col, ListGroup, ListGroupItem, FormGroup, FormControl, ControlLabel, Button, ButtonToolbar, Checkbox, Form, Modal, Table, Tabs, Tab, } from 'react-bootstrap';
import makeSelectData from './selectors';
import { getData, getPipelineData, } from './actions';

export class Data extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      selectedDataCollection: undefined,
      previewImages: false,
      showCreationModal: false,
      pipelineFields: {
        crawlTwitter: {
          hashtag: '',
          number: 100,
          ignored_hashtag: '',
          results: '',
        },
        crawlFlickr: {
          tag: '',
          number: 100,
        },
        crawlImgur: {
          album: '',
        },
      },
    };
    this.showCreationModal = this.showCreationModal.bind(this);
    this.hideCreationModal = this.hideCreationModal.bind(this);
    this.updatePipelineFields = this.updatePipelineFields.bind(this);
  }

  componentWillMount() {
    this.props.getData();
  }
  componentWillReceiveProps(nextProps) {
    const nextTwitter = nextProps.Data.pipeline.crawlTwitter || {};
    const curTwitter = this.props.Data.pipeline.crawlTwitter || {};

    if (nextTwitter.url !== curTwitter.url) this.updatePipelineFields('crawlTwitter', 'results', nextTwitter.results.map((x) => x.tweet_text).join('\n'));
  }

  showCreationModal() {
    this.setState({ showCreationModal: true });
  }
  hideCreationModal() {
    this.setState({ showCreationModal: false });
  }
  updatePipelineFields(service, field, val) {
    const state = this.state;
    state.pipelineFields[service][field] = val;
    this.setState(state);
  }

  render() {
    const { data, pipeline, error } = this.props.Data;
    const selected = this.state.selectedDataCollection;
    const showImgs = this.state.previewImages;

    return (
      <div>
        <Helmet
          title="Data"
          meta={[
            { name: 'description', content: 'Description of Data' },
          ]}
        />
        <Grid>
          <Row>
            <Col xs={12} md={4}>
              <h1>Data Collections</h1>
              <ListGroup>
                { data.length === 0 && <ListGroupItem disabled>No data collections found</ListGroupItem>}
                {
                  data.map((d, idx) =>
                    <ListGroupItem
                      key={idx}
                      onClick={() => { this.setState({ selectedDataCollection: fromJS(d).toJS() }); }}
                      active={selected && selected._id['$oid'] === d._id['$oid']}
                    >
                      {d.name}
                      <Button className="pull-right" bsSize="small" bsStyle="danger">x</Button>
                    </ListGroupItem>
                  )
                }
              </ListGroup>

              <ButtonToolbar>
                <Button bsStyle="success" onClick={this.showCreationModal}>Add data collection</Button>
                <Button bsStyle={showImgs ? 'danger' : 'primary'} onClick={() => this.setState({ previewImages: !showImgs })}>{ showImgs ? 'Hide' : 'Show'} images</Button>
              </ButtonToolbar>

            </Col>

            <Col xs={12} md={8}>
              <h1>Task items</h1>
              { selected && (
                <Table responsive>
                  <thead>
                    <tr>
                      <th>#</th>
                      { data.length > 0 && selected['task_data'][0]['question_data'].map((s, i) =>
                        <th key={i}>Question item {i + 1}</th>) }
                    </tr>
                  </thead>
                  <tbody>
                  { selected['task_data'].map((s, tid) =>
                    <tr key={tid}>
                      <td>{tid + 1}</td>
                      { /* Check if content is image/url */ }
                      { s['question_data'].map((item, qid) => <td key={qid}> {
                        ((item.content.match(/\.(jpeg|jpg|gif|png)$/) !== null && this.state.previewImages)) ? <img alt={item.content} src={item.content} height={250} />
                        : ((item.content.indexOf('http') !== -1) ? <a href={item.content}>{item.content}</a> : item.content)
                      }</td>) }
                    </tr>
                  )}
                  </tbody>
                </Table>
              ) }
            </Col>
          </Row>
          { error && <p>{error.toString()}</p>}
        </Grid>

        <Modal show={this.state.showCreationModal} onHide={this.hideCreationModal}>
          <Modal.Header>
            <Modal.Title>Create Data Collection</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>You can either make use of our One-Click-Data-Collection, or customize one yourself</p>

            <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
              <Tab eventKey={1} title="Custom">
                <p>Note that we do <i>not</i> host your images, we recommend uploading them to services such as Flickr, Imgur or Google Photos.</p>
                <p>The JSON schema can be found here: ...</p>
                <FormGroup controlId="createData">
                  <ControlLabel>Data Collection JSON data</ControlLabel>
                  <FormControl componentClass="textarea" placeholder="json" />
                </FormGroup>
              </Tab>
              <Tab eventKey={2} title="Twitter">
                <h2>Step 1: Get tweets</h2>
                <form>
                  <FormGroup controlId="hashtag">
                    <ControlLabel>Hashtag</ControlLabel>
                    <FormControl
                      type="text"
                      value={this.state.pipelineFields.crawlTwitter.hashtag}
                      onChange={(x) => this.updatePipelineFields('crawlTwitter', 'hashtag', x.target.value)}
                      placeholder="Enter hashtag"
                    />
                  </FormGroup>
                  <FormGroup controlId="ignored_hashtag">
                    <ControlLabel>Ignored Hashtag</ControlLabel>
                    <FormControl
                      type="text"
                      value={this.state.pipelineFields.crawlTwitter.ignored_hashtag}
                      onChange={(x) => this.updatePipelineFields('crawlTwitter', 'ignored_hashtag', x.target.value)}
                      placeholder="Enter ignored hashtag (optional)"
                    />
                  </FormGroup>
                  <FormGroup controlId="number">
                    <ControlLabel>Number</ControlLabel>
                    <FormControl
                      type="number"
                      value={this.state.pipelineFields.crawlTwitter.number}
                      onChange={(x) => this.updatePipelineFields('crawlTwitter', 'number', x.target.value)}
                      placeholder="Number of tweets"
                    />
                  </FormGroup>
                </form>


                <Button onClick={() => this.props.getPipelineData('crawlTwitter', this.state.pipelineFields.crawlTwitter)}>Get tweets</Button>


                <h2>Step 2: Inspect result</h2>
                <FormControl
                  componentClass="textarea"
                  value={this.state.pipelineFields.crawlTwitter.results}
                  onChange={(x) => this.updatePipelineFields('crawlTwitter', 'results', x.target.value)}
                  placeholder="Results"
                />

                <h2>Step 3: Data collection properties</h2>
                <FormGroup controlId="name">
                  <ControlLabel>Data collection name</ControlLabel>
                  <FormControl
                    type="text"
                    placeholder="Enter data collection name"
                  />
                </FormGroup>
                <FormGroup controlId="number">
                  <ControlLabel>Number of tweets per task</ControlLabel>
                  <FormControl
                    type="number"
                    placeholder="Number of tweets"
                  />
                </FormGroup>
                <Checkbox>Randomize order</Checkbox>
              </Tab>
              <Tab eventKey={3} title="Flickr">
                Tab 3 content
              </Tab>
              <Tab eventKey={4} title="Imgur">
                Tab 3 content
              </Tab>
            </Tabs>

          </Modal.Body>

          <Modal.Footer>
            <Button bsStyle="danger" onClick={this.hideCreationModal}>Cancel</Button>
            <Button bsStyle="primary">Save</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

Data.propTypes = {
  getData: PropTypes.func.isRequired,
  getPipelineData: PropTypes.func.isRequired,
  Data: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  Data: makeSelectData(),
});

function mapDispatchToProps(dispatch) {
  return {
    getData: () => {
      dispatch(getData());
    },
    getPipelineData: (service, params) => {
      dispatch(getPipelineData(service, params));
    },
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Data);

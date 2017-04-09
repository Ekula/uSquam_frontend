/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Grid, Row, Col, Image, Carousel } from 'react-bootstrap';
import { Link } from 'react-router';

import { makeSelectRepos, makeSelectLoading, makeSelectError } from 'containers/App/selectors';
import H2 from 'components/H2';
import ReposList from 'components/ReposList';
import AtPrefix from './AtPrefix';
import CenteredSection, { CenteredDiv } from './CenteredSection';
import MessagingLogo from './MessagingLogo';
import Input from './Input';
import Section from './Section';
import messages from './messages';
import { loadRepos } from '../App/actions';
import { changeUsername } from './actions';
import { makeSelectUsername } from './selectors';

import mob from './mobile_selfie.png';
import web from './usquam_web.jpg';
import lecture from './class.jpg';
import train from './train.jpg';

import telegram from './telegram.png';
import slack from './slack.png';
import fb from './fb.png';
import hangouts from './hangouts.png';
import allo from './allo.png';
import discord from './discord.png';


export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  /**
   * when initial state username is not null, submit the form to load repos
   */
  componentDidMount() {
    if (this.props.username && this.props.username.trim().length > 0) {
      this.props.onSubmitForm();
    }
  }

  render() {


    return (
      <article>
        <Helmet
          title="Home"
          meta={[
            { name: 'description', content: 'The home of uSquam' },
          ]}
        />
        <div>
          <CenteredSection>
            <H2>
              <FormattedMessage {...messages.startProjectHeader} />
            </H2>
            <p>
              <FormattedMessage {...messages.startProjectMessage} />
            </p>
          </CenteredSection>
          <CenteredSection>
            <H2>
              <FormattedMessage {...messages.trymeHeader} />
            </H2>
            Send a message to <b>@uSquamBot</b> on your favourite messaging platform

            {/*Todo:*/}
            {/*- Update homepage to make it clear for both workers & requesters*/}
            {/*- Login -> store requester id, get only tasks/data/results for that id*/}
            {/*Creation of datasource*/}
            {/*(optional) modify task/data source*/}
            
            <Row>
              <Col xs={12}>
                <Link href="https://web.telegram.org/#/im?p=@usquam_bot">
                  <MessagingLogo src={telegram} title="Telegram" alt="Telegram" />
                </Link>
                <Link href="https://slack.com">
                  <MessagingLogo src={slack} title="Slack" alt="Slack" />
                </Link>
                <Link href="https://www.facebook.com">
                  <MessagingLogo src={fb} title="Facebook" alt="Facebook" />
                </Link>
                <Link href="https://hangouts.google.com">
                  <MessagingLogo src={hangouts} title="Hangouts" alt="Hangouts" />
                </Link>
                <Link href="https://allo.google.com/">
                  <MessagingLogo src={allo} title="Allo" alt="Allo" />
                </Link>
                <Link href="https://www.discord.com">
                  <MessagingLogo src={discord} title="Discord" alt="Discord" />
                </Link>
              </Col>
            </Row>
          </CenteredSection>

          <Carousel>
            <Carousel.Item>
              <CenteredDiv>
                <img height={500} alt="Mobile usage" src={mob} />
              </CenteredDiv>
            </Carousel.Item>
            <Carousel.Item>
              <CenteredDiv>
                <img height={500} alt="Web usage" src={web} />
              </CenteredDiv>
            </Carousel.Item>
            <Carousel.Item>
              <CenteredDiv>
                <img height={500} alt="In class" src={lecture} />
              </CenteredDiv>
            </Carousel.Item>
            <Carousel.Item>
              <CenteredDiv>
                <img height={500} alt="While waiting" src={train} />
              </CenteredDiv>
            </Carousel.Item>
          </Carousel>
        </div>
      </article>
    );
  }
}

HomePage.propTypes = {
  loading: React.PropTypes.bool,
  error: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.bool,
  ]),
  repos: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.bool,
  ]),
  onSubmitForm: React.PropTypes.func,
  username: React.PropTypes.string,
  onChangeUsername: React.PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    onChangeUsername: (evt) => dispatch(changeUsername(evt.target.value)),
    onSubmitForm: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadRepos());
    },
  };
}

const mapStateToProps = createStructuredSelector({
  repos: makeSelectRepos(),
  username: makeSelectUsername(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

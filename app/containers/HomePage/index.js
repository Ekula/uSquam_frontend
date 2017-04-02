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
import { Grid, Row, Column, Image } from 'react-bootstrap';
import { Link } from 'react-router';

import { makeSelectRepos, makeSelectLoading, makeSelectError } from 'containers/App/selectors';
import H2 from 'components/H2';
import ReposList from 'components/ReposList';
import AtPrefix from './AtPrefix';
import CenteredSection from './CenteredSection';
import MessagingLogo from './MessagingLogo';
import Input from './Input';
import Section from './Section';
import messages from './messages';
import { loadRepos } from '../App/actions';
import { changeUsername } from './actions';
import { makeSelectUsername } from './selectors';

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
    const { loading, error, repos } = this.props;
    const reposListProps = {
      loading,
      error,
      repos,
    };

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

            <Section>
              <Link href="https://web.telegram.org/#/im?p=@usquam_bot">
                <MessagingLogo src="https://telegram.org/img/t_logo.png" alt="Telegram" />
              </Link>
              <Link href="https://slack.com">
                <MessagingLogo src="http://diylogodesigns.com/blog/wp-content/uploads/2016/02/Slack-App-app-logo-png.png" alt="Slack" />
              </Link>
              <Link href="https://www.facebook.com">
                <MessagingLogo src="http://seeklogo.com/images/F/facebook-messenger-logo-1B1179FB01-seeklogo.com.png" alt="Facebook" />
              </Link>
              <Link href="https://www.google.com">
                <MessagingLogo src="https://upload.wikimedia.org/wikipedia/commons/f/fe/Hangouts_Icon.png" alt="Hangouts" />
              </Link>
              <Link href="https://www.google.com">
                <MessagingLogo src="https://lh3.googleusercontent.com/S8DKhY39f1jpVy1-JV3qpI_ftuJwJnKjNbRhrVRGi-MQjr6i73JQI3-dmkQ93E0Jb4hT=w300" alt="Allo" />
              </Link>
              <Link href="https://www.discord.com">
                <MessagingLogo src="https://discordapp.com/assets/2c21aeda16de354ba5334551a883b481.png" alt="Discord" />
              </Link>
            </Section>
          </CenteredSection>
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

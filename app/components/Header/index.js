import React from 'react';
import { FormattedMessage } from 'react-intl';

import A from './A';
import Img from './Img';
import NavBar from './NavBar';
import HeaderLink from './HeaderLink';
import Banner from './uSquam.png';
import messages from './messages';

class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <A href="https://twitter.com/mxstbr">
          <Img src={Banner} alt="react-boilerplate - Logo" />
        </A>
        <NavBar>
          <HeaderLink to="/">
            <FormattedMessage {...messages.home} />
          </HeaderLink>
          <HeaderLink to="/tasks">
            <FormattedMessage {...messages.tasks} />
          </HeaderLink>
          <HeaderLink to="/data">
            <FormattedMessage {...messages.data} />
          </HeaderLink>
          <HeaderLink to="/results">
            <FormattedMessage {...messages.results} />
          </HeaderLink>
          <HeaderLink to="/profile">
            <FormattedMessage {...messages.profile} />
          </HeaderLink>
        </NavBar>
      </div>
    );
  }
}

export default Header;

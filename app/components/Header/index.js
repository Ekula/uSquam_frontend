import React from 'react';
import { FormattedMessage } from 'react-intl';
// import { NavBar } from 'react-bootstrap';
import {Bg, Gradient, changepos} from './ScrollingBG';

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
        <Bg>
          <Gradient>
            <A to="/">
              <Img src={Banner} alt="uSquam - Logo" />
            </A>
          </Gradient>
        </Bg>
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

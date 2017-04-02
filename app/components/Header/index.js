import React from 'react';
import { FormattedMessage } from 'react-intl';
// import { NavBar } from 'react-bootstrap';

import styled, { keyframes } from 'styled-components';
import A from './A';
import Img from './Img';
import NavBar from './NavBar';
import HeaderLink from './HeaderLink';
import Banner from './uSquam.png';
import Background from './uSquam bg.png';
import messages from './messages';


class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const changepos = keyframes`
      from {
        background-position: 0px top;
      }
    
      to {
        background-position: 100px top;
      }
    `;
    const Bg = styled.div`
      background-image: url('${Background}');
      background-repeat: repeat;
      background-size: 100px;
      animation: ${changepos} 6s linear infinite;
    `;
    const Gradient = styled.div`
      background: linear-gradient(to right, rgba(255,0,0,0), white, white, rgba(255,0,0,0));
    `;

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

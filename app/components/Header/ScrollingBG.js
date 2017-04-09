import styled, { keyframes } from 'styled-components';
import Background from './uSquam bg.png';

export const changepos = keyframes`
      from {
        background-position: 0px top;
      }
    
      to {
        background-position: 100px top;
      }
    `;
export const Bg = styled.div`
      background-image: url('${Background}');
      background-repeat: repeat;
      background-size: 100px;
      animation: ${changepos} 6s linear infinite;
    `;
export const Gradient = styled.div`
      background: linear-gradient(to right, rgba(255,0,0,0), white, white, rgba(255,0,0,0));
    `;

import styled from 'styled-components';

import NormalImg from 'components/Img';

const Img = styled(NormalImg)`
  width: 100px;
  margin: 2em auto 2em auto;
  transition: width 0.5s;
  
  &:hover {
    width: 110px;
  }
`;

export default Img;

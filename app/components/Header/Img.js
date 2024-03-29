import styled from 'styled-components';

import NormalImg from 'components/Img';

const Img = styled(NormalImg)`
  max-height: 100%;
  max-width: 100%;
  margin: 0 auto;
  display: block;
  filter: drop-shadow(3px 3px 3px rgb(100, 100, 100));
`;

export default Img;

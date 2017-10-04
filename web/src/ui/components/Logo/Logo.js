import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { rem } from 'polished';

import Link from 'ui/components/Link';

import logo from './logo.svg';
import logoWhite from './logoWhite.svg';

const StyledLink = styled(Link)`
  display: block;
`;

const Img = styled.img.attrs({
  alt: 'AmlToken',
})`
  display: block;
  height: ${rem(24)};
  max-width: 100%;
`;

const Logo = props => (
  <StyledLink
    to={!props.external ? '/' : ''}
    href={props.external ? 'https://AmlToken.net/' : ''}
  >
    <Img {...props} src={props.white ? logoWhite : logo} />
  </StyledLink>
);

Logo.propTypes = {
  white: PropTypes.bool,
  external: PropTypes.bool,
};

Logo.defaultProps = {
  white: false,
  external: false,
};

export default Logo;

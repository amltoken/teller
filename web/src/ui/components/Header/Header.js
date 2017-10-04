import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Flex, Box } from 'grid-styled';
import { IntlProvider, injectIntl } from 'react-intl';
import { rem } from 'polished';
import flatten from 'flat';

import { SPACE } from 'ui/config';
import Container from 'ui/components/Container';
import Logo from 'ui/components/Logo';

import Navigation from './components/Navigation';
import * as locales from './locales';

const Wrapper = styled.div`
  padding: ${rem(SPACE[6])} 0;
  width: 100%;
`;

const Header = ({ white, external, intl }) => (
  <IntlProvider messages={flatten(locales[intl.locale])}>
    <Wrapper>
      <Container>
        <Flex align="center" wrap>
          <Box width={[1 / 1, 1 / 4]}>
            <Logo white={white} external={external} />
          </Box>

          <Box width={[1 / 1, 3 / 4]}>
            <Navigation white={white} external={external} />
          </Box>
        </Flex>
      </Container>
    </Wrapper>
  </IntlProvider>
);

Header.propTypes = {
  white: PropTypes.bool,
  external: PropTypes.bool,
  intl: PropTypes.shape({
    locale: PropTypes.string,
  }).isRequired,
};

Header.defaultProps = {
  white: false,
  external: false,
};

export default injectIntl(Header);

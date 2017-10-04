import React from 'react';
import PropTypes from 'prop-types';
import { IntlProvider, injectIntl } from 'react-intl';
import { Flex, Box } from 'grid-styled';
import flatten from 'flat';

import Container from 'ui/components/Container';
import Text from 'ui/components/Text';
import Logo from 'ui/components/Logo';

import * as locales from './locales';
import Languages from './components/Languages';
import List from './components/List';
import Email from './components/Email';
import content from './content';

const Footer = ({ intl, external }) => (
  <IntlProvider messages={flatten(locales[intl.locale])}>
    <Container>
      <Flex wrap my={[4, 8]} mx={-4}>
        <Box width={[1 / 2, 1 / 4]} my={2} px={4}>
          <Logo />

          <Text fontSize={[1, 2, 3]} color="gray.8" heavy mt={2}>
            <Email />
          </Text>

          <Text as="div" fontSize={[0, 0, 1]} color="gray.8" heavy>
            <Languages />
          </Text>
        </Box>

        {content.map(({ heading, links }, sectionIndex) => (
          <Box width={[1 / 2, 1 / 4]} my={2} px={4} key={sectionIndex}>
            <List heading={heading} links={links} external={external} />
          </Box>
        ))}
      </Flex>
    </Container>
  </IntlProvider>
);

Footer.propTypes = {
  external: PropTypes.bool,
  intl: PropTypes.shape({
    locale: PropTypes.string,
  }).isRequired,
};

Footer.defaultProps = {
  external: false,
};

export default injectIntl(Footer);

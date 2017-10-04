import React from 'react';
import PropTypes from 'prop-types';
import { IntlProvider, injectIntl, FormattedMessage } from 'react-intl';
import { Box } from 'grid-styled';
import flatten from 'flat';

import Button from 'ui/components/Button';

import * as locales from './locales';

const EXCHANGES = [{
  label: 'c2cx',
  url: 'https://www.c2cx.com/in/trade_sky',
  color: 'red.7',
}, {
  label: 'cryptopia',
  url: 'https://www.cryptopia.co.nz/Exchange/?market=SKY_BTC',
  color: 'gray.7',
}];

const BuyButtons = props => (
  <IntlProvider messages={flatten(locales[props.intl.locale])}>
    <Box mx={-1}>
      {EXCHANGES.map(({ label, color, url }, i) => (
        <Button
          big
          key={i}
          href={url}
          m={1}
          color="white"
          bg={color}
          fontSize={[1, 3]}
          target="_blank"
          width={[1 / 1, 'auto']}
        >
          <FormattedMessage id={label} />
        </Button>
      ))}
    </Box>
  </IntlProvider>
);

BuyButtons.propTypes = {
  intl: PropTypes.shape({
    locale: PropTypes.string,
  }).isRequired,
};

export default injectIntl(BuyButtons);

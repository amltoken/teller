import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { IntlProvider, injectIntl, FormattedMessage } from 'react-intl';
import flatten from 'flat';

import Button from 'ui/components/Button';
import BuyButtons from 'ui/components/BuyButtons';
import Modal, { styles } from 'ui/components/Modal';
import Text from 'ui/components/Text';
import { eventInProgress } from 'ui/utils';
import { DISTRIBUTION_URL } from 'ui/config';

import * as locales from './locales';

const Wrapper = styled.div`
  display: inline;
`;

class Buy extends React.Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  render() {
    const { asAnchor, intl, ...rest } = this.props;
    const Component = asAnchor ? 'a' : Button;

    const props = eventInProgress ? {
      href: DISTRIBUTION_URL,
    } : {
      onClick: this.openModal,
    };

    return (
      <IntlProvider messages={{
        ...intl.messages,
        ...flatten(locales[intl.locale]),
      }}
      >
        <Wrapper>
          <Component {...props} {...rest} />
          <Modal
            contentLabel="Buy AmlToken"
            style={styles}
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.closeModal}
          >
            <Text fontSize={[2, 3, 4]} color="black" heavy>
              <FormattedMessage id="heading" />
            </Text>

            <BuyButtons />
          </Modal>
        </Wrapper>
      </IntlProvider>
    );
  }
}

Buy.propTypes = {
  asAnchor: PropTypes.bool,
  intl: PropTypes.shape({
    messages: PropTypes.object,
    locale: PropTypes.string,
  }).isRequired,
};

Buy.defaultProps = {
  asAnchor: false,
};

export default injectIntl(Buy);

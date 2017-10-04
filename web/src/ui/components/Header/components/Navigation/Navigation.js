import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { rem } from 'polished';
import Hide from 'hidden-styled';

import { SPACE, FONT_SIZES, FONT_FAMILIES, COLORS } from 'ui/config';
import Link from 'ui/components/Link';
import Buy from 'ui/components/Buy';
import { media, eventInProgress } from 'ui/utils';

const Wrapper = styled.div`
  font-size: ${rem(FONT_SIZES[1])};
  padding-top: ${rem(SPACE[4])};
  text-align: left;

  ${media.sm.css`
    font-size: ${rem(FONT_SIZES[3])};
    padding-top: 0;
    text-align: right;
  `}
`;

const StyledLink = styled(Link)`
  margin-right: ${rem(SPACE[5])};
  font-family: ${FONT_FAMILIES.mono};
  color: ${props => (props.white ? 'white' : COLORS.black)};
  text-decoration: none;
  font-weight: 700;

  &:hover {
    text-decoration: underline;
  }

  ${media.sm.css`
    margin-right: 0;
    margin-left: ${rem(SPACE[7])};
  `}

  ${media.md.css`
    margin-left: 0;
    margin-right: ${rem(SPACE[7])};
  `}
`;

const InlineHide = Hide.extend`
  display: inline;
`;

const Navigation = ({ white, external }) => (
  <Wrapper>
    {!eventInProgress && <StyledLink
      white={white}
      to={!external ? 'distribution' : ''}
      href={external ? 'https://AmlToken.net/distribution' : ''}
    >
      <FormattedMessage id="navigation.distribution" />
    </StyledLink>}

    <StyledLink
      white={white}
      to={!external ? 'downloads' : ''}
      href={external ? 'https://AmlToken.net/downloads' : ''}
    >
      <FormattedMessage id="navigation.downloads" />
    </StyledLink>

    <StyledLink white={white} href="http://explorer.AmlToken.net" target="_blank">
      <FormattedMessage id="navigation.explorer" />
    </StyledLink>

    <StyledLink white={white} href="http://blog.AmlToken.net" target="_blank">
      <FormattedMessage id="navigation.blog" />
    </StyledLink>

    <InlineHide xs sm>
      <Buy color={white ? 'white' : 'base'} pill outlined>
        {eventInProgress ? (
          <span>
            <FormattedMessage id="navigation.distributionEvent" /> &rarr;
          </span>
        ) : (
          <FormattedMessage id="navigation.buy" />
        )}
      </Buy>
    </InlineHide>
  </Wrapper>
);

Navigation.propTypes = {
  white: PropTypes.bool,
  external: PropTypes.bool,
};

Navigation.defaultProps = {
  white: false,
  external: false,
};

export default Navigation;

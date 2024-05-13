/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import styled from 'styled-components';
import { compiler } from 'markdown-to-jsx';
import { Wrapper, Column, Row, Box, Copy } from '@honda-canada/design-system-react';
import RoutableSitecoreLink from '../RoutableSitecoreLink';
import { stripMarkdownHeading } from '../../utils/markdown';

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.black};
  padding-top: 27px;
  padding-bottom: 27px;
`;

const Link = styled(Copy)`
  text-decoration: none;
  font-size: 12px;
  border-bottom: 1px solid transparent;

  &:hover {
    border-bottom-color: #676767;
  }
`;

const SocialLink = styled.a`
  display: inline-block;
  margin-right: 4px;

  > img {
    width: 19px;
    height: 19px;
  }
`;

const MobileFooter = ({ socials, legalText, legalLinks, infoLinks, provinceSelector }) => (
  <Container>
    <Wrapper>
      <Box as="ul" px="xs" mb="m" display="flex">
        {socials &&
          socials?.items?.map((item, i) => (
            <li key={i.toString()}>
              <SocialLink {...item.fields.url.value.href}>
                <img {...item.fields.logo.value} />
              </SocialLink>
            </li>
          ))}
      </Box>
      <Row mb="m">
        <Column as="ul" width={1 / 2}>
          {infoLinks.items?.map((link, i) => (
            <Box as="li" mb="xs" key={i.toString()}>
              <Link
                as={RoutableSitecoreLink}
                color="white"
                field={{
                  ...link.fields.url,
                  value: {
                    ...link.fields.url.value,
                    text: compiler(stripMarkdownHeading(link.fields.url.value.text)),
                  },
                }}
              />
            </Box>
          ))}
        </Column>
        <Column as="ul" width={1 / 2}>
          {legalLinks &&
            legalLinks?.map((link, i) => (
              <Box as="li" key={i.toString()} mb="xs" textAlign="right">
                <Link
                  as={RoutableSitecoreLink}
                  color="white"
                  field={{
                    ...link.fields.url,
                    value: {
                      ...link.fields.url.value,
                      text: compiler(stripMarkdownHeading(link.fields.url.value.text)),
                    },
                  }}
                />
              </Box>
            ))}
          {provinceSelector}
        </Column>
      </Row>
      <Row>
        <Column width={1}>
          <Copy color="white" fontSize="9px" lineHeight="12px">
            {compiler(stripMarkdownHeading(legalText))}
          </Copy>
        </Column>
      </Row>
    </Wrapper>
  </Container>
);

export default MobileFooter;

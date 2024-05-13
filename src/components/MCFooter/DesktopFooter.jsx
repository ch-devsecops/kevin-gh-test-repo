/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { compiler } from 'markdown-to-jsx';
import { Column, Wrapper, Row, Copy, Box } from '@honda-canada/design-system-react';
import styled from 'styled-components';
import { stripMarkdownHeading } from '../../utils/markdown';
import RoutableSitecoreLink from '../RoutableSitecoreLink';

const Container = styled.div`
  background-color: #000000;
  max-width: 1440px;
  margin: 0 auto;
`;

const Category = styled(Copy)`
  text-transform: uppercase;
  text-decoration: none;
  font-size: 13px;
  display: inline-block;
  border-bottom: 1px solid transparent;
  font-style: normal;
  font-family: ${({ theme }) => theme.fonts.heading};

  &:hover {
    border-bottom-color: #676767;
  }
`;

const ColumnHeading = styled(Copy)`
  margin-top: 2px;
  text-transform: uppercase;
  font-size: 13px;
  font-family: ${({ theme }) => theme.fonts.heading};
`;

const ListItem = styled.li`
  &:first-child {
    margin-top: 0;
  }
  margin-top: 4px;
`;

const Link = styled(Copy)`
  text-decoration: none;
  font-size: 12px;
  border-bottom: 1px solid transparent;

  &:hover {
    border-bottom-color: #676767;
  }
  a {
    color: ${({ theme }) => theme.colors.white};
    text-decoration: none;
  }
`;

const SmallLink = styled(Copy)`
  text-decoration: none;
  display: inline;
  color: #999999;
  font-size: 10px;
  text-transform: uppercase;
  border-bottom: 1px solid transparent;
  letter-spacing: normal;
  font-family: ${({ theme }) => theme.fonts.heading};

  &:hover {
    border-bottom-color: #676767;
    color: ${({ theme }) => theme.colors.white};
  }
`;

const LastColumn = styled(Column)`
  border-left-color: ${({ theme }) => theme.colors.headerFooterGrey && theme.colors.headerFooterGrey[2]};
`;

const Location = styled(Box)`
  border-top-color: ${({ theme }) => theme.colors.headerFooterGrey && theme.colors.headerFooterGrey[2]};
`;

const Bottom = styled(Box)`
  border-top: 1px solid ${({ theme }) => theme.colors.headerFooterGrey && theme.colors.headerFooterGrey[2]};
`;

const SocialLink = styled.a`
  display: inline-block;
  margin-right: 4px;

  > img {
    width: 19px;
    height: 19px;
  }
`;

const BrandContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.headerFooterGrey && theme.colors.headerFooterGrey[2]};
`;

const BrandLinkColumn = styled(Column)`
  position: relative;

  &:after {
    content: '';
    height: 100%;
    width: 1px;
    background: #444444;
    z-index: 10;
    position: absolute;
    top: 0;
    left: 0;
  }
  &:first-child {
    &:after {
      content: none;
    }
  }
`;

const BrandLink = styled.a`
  opacity: 0.5;

  &:hover {
    opacity: 1;
  }
`;

const Legal = styled(Copy)`
  color: #999999;
  text-align: center;
  font-size: 12px;
`;

const LegalLink = styled(Copy)`
  color: #999999;
  text-decoration: none;
  border-bottom: 1px solid transparent;
  font-size: 12px;

  &:hover {
    border-bottom-color: #676767;
    color: ${({ theme }) => theme.colors.white};
  }
  a {
    color: ${({ theme }) => theme.colors.white};
    text-decoration: none;
  }
`;

const DesktopFooter = ({
  socials,
  provinceSelector,
  locationTitle,
  categories,
  brandLogos,
  findYourRide,
  infoLinks,
  legalText,
  legalLinks,
}) => (
  <footer>
    <Container>
      <Wrapper as="nav" pt="xl" pb="l" style={{ maxWidth: '998px' }}>
        <Row as="ul" mb="l">
          {categories &&
            categories.items?.map((category, i) => (
              <Column key={i.toString()} as="li" pl="5px" pr="5px" width={[0, 1 / 8.7]}>
                <Category as="a" href={category.fields?.url.value.href} color="white" mb="m">
                  {compiler(stripMarkdownHeading(category.fields?.url.value.text))}
                </Category>
                <ul>
                  {category.fields?.items?.map((item, j) => (
                    <ListItem key={j.toString()}>
                      <SmallLink as="a" href={item.fields.url.value.href} mb="xs">
                        {compiler(stripMarkdownHeading(item.fields.url.value.text))}
                      </SmallLink>
                    </ListItem>
                  ))}
                </ul>
              </Column>
            ))}
          <LastColumn as="li" width={[0, 2 / 12]} borderLeft="1" pl="5" pr="0">
            <ColumnHeading color="white" mb="m">
              {compiler(stripMarkdownHeading(findYourRide.fields?.title?.value))}
            </ColumnHeading>
            <ul>
              {findYourRide.fields?.items?.map((link, i) => (
                <Box as="li" mb="s" key={i.toString()}>
                  <Link
                    as={RoutableSitecoreLink}
                    color="white"
                    mb="s"
                    display="inline"
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
            </ul>
            <Location pt="default" mt="default" borderTop="1">
              <ColumnHeading color="white" mb="2">
                {compiler(stripMarkdownHeading(locationTitle))}
              </ColumnHeading>
              {provinceSelector}
            </Location>
          </LastColumn>
        </Row>
        <Bottom as="ul" display="flex">
          <Column as="li" mt="20px" pl="5px" pr="5px">
            {socials &&
              socials.items?.map((item, i) => (
                <SocialLink key={i.toString()} {...item.fields.url.value}>
                  <img {...item.fields.logo.value} />
                </SocialLink>
              ))}
          </Column>
          <Column as="li" mt="20px" pl="5px" pr="5px">
            {infoLinks &&
              infoLinks.items?.map((link, i) => (
                <Link
                  key={i.toString()}
                  as={RoutableSitecoreLink}
                  mx="xs"
                  color="white"
                  field={{
                    ...link.fields.url,
                    value: {
                      ...link.fields.url.value,
                      text: compiler(stripMarkdownHeading(link.fields.url.value.text)),
                    },
                  }}
                />
              ))}
          </Column>
        </Bottom>
      </Wrapper>
    </Container>
    <BrandContainer>
      <Wrapper as="nav" pt="xl" pb="xxl" style={{ maxWidth: '998px' }}>
        <Row as="ul" mb="l" justifyContent="center">
          {brandLogos &&
            brandLogos.items?.map((brand, i) => (
              <BrandLinkColumn width={[0, 1 / 7]} textAlign="center" as="li" key={i.toString()}>
                <BrandLink {...brand.fields.url.value}>
                  <img {...brand.fields.logo.value} />
                </BrandLink>
              </BrandLinkColumn>
            ))}
        </Row>

        <Legal color="white" mb="l">
          {compiler(stripMarkdownHeading(legalText))}
        </Legal>

        <Box as="ul" textAlign="center" display="flex" justifyContent="center">
          {legalLinks &&
            legalLinks?.map((link, i) => (
              <Box as="li" key={i.toString()} mx="xs">
                <LegalLink
                  as={RoutableSitecoreLink}
                  field={{
                    ...link.fields.url,
                    value: {
                      ...link.fields.url.value,
                      text: <strong>{compiler(stripMarkdownHeading(link.fields.url.value.text))}</strong>,
                    },
                  }}
                />
              </Box>
            ))}
        </Box>
      </Wrapper>
    </BrandContainer>
  </footer>
);

export default DesktopFooter;

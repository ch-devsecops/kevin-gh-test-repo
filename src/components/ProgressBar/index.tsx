import React from 'react';
import { Box, Copy, Media } from '@honda-canada/design-system-react';
import Sticky from 'react-stickynode';
import NotImplemented from '../NotImplemented';
import themeStyles from './styles/ProgressBar.styles';
import useDetectSticky from './useDetectSticky';
import { useAppName } from '../../utils/sitecoreContext';
import { ACURA_SITE_NAME, HONDA_SITE_NAME } from '../../utils/constants';

const Container = themeStyles.apply(Box, 'Container');
const ProgressContainer = themeStyles.apply(Box, 'ProgressContainer');
const Title = themeStyles.apply(Copy, 'Title');
const Item = themeStyles.apply(Copy, 'Item');

type ProgressItem = {
  name: string;
  displayName: string;
  fields: {
    isActive: {
      value: boolean;
    };
    progressUrl: {
      value: {
        text: string;
      };
    };
  };
};

type ProgressBarProps = {
  fields: {
    title: {
      value: string;
    };
    items: ProgressItem[];
  };
};

const ProgressBar = ({ fields }: ProgressBarProps) => {
  const appName = useAppName();

  const { stickyPosition } = useDetectSticky();

  const title = fields?.title?.value;
  const items = fields?.items?.map(item => ({
    key: item?.name,
    isActive: item?.fields?.isActive?.value,
    text: item?.fields?.progressUrl?.value?.text,
  }));

  if (!Array.isArray(items) || !items.length) return null;

  switch (appName) {
    case HONDA_SITE_NAME:
      break;
    case ACURA_SITE_NAME:
      break;
    default:
      return <NotImplemented name="Progress Bar" />;
  }

  const progressItems = items.map(item => (
    <Item key={item?.key} isActive={item?.isActive} data-testid="cy-progress-bar-item">
      {item?.text}
    </Item>
  ));

  return (
    <>
      <Media lessThan="desktop">
        <Container data-testid="cy-progress-bar">
          <Title data-testid="cy-progress-bar-title">{title}</Title>
          <Sticky top={stickyPosition.mobile} innerZ={1020}>
            <ProgressContainer>{progressItems}</ProgressContainer>
          </Sticky>
        </Container>
      </Media>
      <Media greaterThan="smallDesktop">
        <Sticky top={stickyPosition.desktop} innerZ={1020}>
          <Container data-testid="cy-progress-bar">
            <Title data-testid="cy-progress-bar-title">{title}</Title>
            <ProgressContainer>{progressItems}</ProgressContainer>
          </Container>
        </Sticky>
      </Media>
    </>
  );
};

export default ProgressBar;

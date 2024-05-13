/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Image, Link, Icon } from '@honda-canada/design-system-react';
import MobileHoverCard from '../MobileHoverCard';
import DesktopHoverCard from '../DesktopHoverCard';

export const base = {
  anchorId: 'anchor id',
  title: 'Schedule A Service',
  bodyText: 'Lorem ipsum dolor sit amet, conse ctetur adipiscing elit, **sed**',
  desktopImage: <Image src="https://source.unsplash.com/daily" alt="card1 image" />,
  mobileImage: (
    <Image src="https://i.pinimg.com/originals/ca/b4/a9/cab4a9e46e99cac9709903af19c4447b.jpg" alt="card1 image" />
  ),
  ctas: [
    <span key="0">
      <Link styling="primary" data-gtm-title="hover-card-title">
        Explore
      </Link>
      <Icon ml="xxs" height="10px" iconColor="primary" name="arrowRight" />
    </span>,
  ],
  gtmTags: {
    type: 'HoverCard',
    category: 'Others',
  },
};

export const DesktopHoverMock = () => (
  <DesktopHoverCard image={<Image src="https://source.unsplash.com/daily" alt="card1 image" />} />
);

export const MobileHoverMock = () => (
  <MobileHoverCard
    image={
      <Image src="https://i.pinimg.com/originals/ca/b4/a9/cab4a9e46e99cac9709903af19c4447b.jpg" alt="card1 image" />
    }
  />
);

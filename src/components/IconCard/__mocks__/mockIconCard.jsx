/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-key */
import React from 'react';
import { Link, Image, Icon } from '@honda-canada/design-system-react';

export const ImageMock = () => <Image src="/images/cms-icons/PDF.png" alt="pdf-icon" />;

export const CTAMock = ({ text }) => (
  <Link styling="primary" data-gtm-title="iconcard-title">
    {text}

    <Icon ml="xs" name="save" iconColor="primary" />
  </Link>
);

export const CTAMocks = [<CTAMock text="Download English" />, <CTAMock text="Download French" />];

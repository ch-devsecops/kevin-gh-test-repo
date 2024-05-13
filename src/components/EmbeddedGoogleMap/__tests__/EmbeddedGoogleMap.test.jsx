import React from 'react';
import { axe, cleanup, jssRender } from 'test-utils';
import { initialize } from '@googlemaps/jest-mocks';
import EmbeddedGoogleMap from '../index';

beforeEach(() => {
  initialize();
});

afterEach(cleanup);

describe('<EmbeddedGoogleMap>', () => {
  test('it should render with no errors', () => {
    const { container } = jssRender(<EmbeddedGoogleMap latitude="43.6532" longitude="79.3832" />);
    expect(container).toMatchSnapshot();
    expect(container.children[0]).toBeTruthy();
  });

  test('it should have no accessibility violations', async () => {
    const { container } = jssRender(<EmbeddedGoogleMap latitude="43.6532" longitude="79.3832" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});

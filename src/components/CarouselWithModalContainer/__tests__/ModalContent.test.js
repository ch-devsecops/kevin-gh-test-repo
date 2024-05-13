import React from 'react';
import { jssRender, cleanup, axe } from 'test-utils';
import ModalContent from '../ModalContent';

afterEach(cleanup);

const mockData = require('../../../../sample-mock-data/routes/carousel-with-modal-container/en.json');

describe('<ModalContent>', () => {
  it('should render correctly', () => {
    const { container } = jssRender(<ModalContent items={mockData?.fields?.items} index={3} onClose={() => {}} />);

    expect(container).toMatchSnapshot();
  });

  it('should return null if there is no fields', () => {
    const { container } = jssRender(<ModalContent items={null} />);

    expect(container).toMatchSnapshot();
    expect(container.firstChild).toBeNull();
  });

  it('should have no accessibility violations', async () => {
    const { container } = jssRender(<ModalContent items={mockData?.fields} />);

    expect(container).toMatchSnapshot();
    expect(await axe(container)).toHaveNoViolations();
  });
});

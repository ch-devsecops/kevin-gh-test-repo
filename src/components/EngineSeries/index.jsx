import React from 'react';
import PropTypes from 'prop-types';
import { Box, H5, Wrapper } from '@honda-canada/design-system-react';
import GridSection from '../ProductCardsGrid/GridSection';
import getValueByKey from '../../utils/getValueByKey';
import { EngineSeriesCard } from '../../utils/constants';
import Container, { themeStyles } from './EngineSeries.styles';
import getContentMargins from '../../utils/getContentMargins';

const StyledH5 = themeStyles.apply(H5, 'StyledH5');
const GridSectionContainer = themeStyles.apply(Box, 'GridSectionContainer');

const EngineSeries = ({ fields, params = {}, rendering }) => {
  if (!fields) return null;

  const margins = getContentMargins(params);

  const crankshafts = getValueByKey(fields, 'crankshafts');
  const seriesName = fields?.data?.value?.engineSeries?.fields?.name;
  const header = name => (
    <StyledH5 mb={['xs', 'zero', 'zero']} aria-label={name}>
      {name}
    </StyledH5>
  );

  return (
    <Wrapper data-gtm-component-type={rendering?.componentName}>
      <Container margins={margins}>
        {crankshafts?.map((crankshaft, i) => {
          const {
            crankshaftName: { value: name },
            id,
            models,
          } = crankshaft;

          const gtmTags = {
            seriesName,
            crankshaftName: crankshaft?.name,
            componentName: rendering?.componentName,
            title: EngineSeriesCard?.Clicks?.DATA_GTM_TITLE,
            compareTitle: EngineSeriesCard?.Compare?.DATA_GTM_TITLE,
            interactionType: EngineSeriesCard?.Clicks?.DATA_GTM_INTERACTION_TYPE,
            compareInteractionType: EngineSeriesCard?.Compare?.DATA_GTM_INTERACTION_TYPE,
          };

          return (
            <GridSectionContainer key={i.toString()}>
              <GridSection key={id} models={models} header={header(name)} gtmTags={gtmTags} fetchFinancial={false} />
            </GridSectionContainer>
          );
        })}
      </Container>
    </Wrapper>
  );
};

EngineSeries.propTypes = {
  fields: PropTypes.shape({
    data: PropTypes.shape({
      value: PropTypes.shape({
        engineSeries: PropTypes.shape({
          fields: PropTypes.shape({
            name: PropTypes.string,
          }),
        }),
      }),
    }),
  }),
  params: PropTypes.shape({}),
  rendering: PropTypes.shape({
    componentName: PropTypes.string,
  }),
  crankshaft: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    models: PropTypes.arrayOf(PropTypes.shape({})),
    crankshaftName: PropTypes.shape({
      value: PropTypes.string,
    }),
  }),
};
export default EngineSeries;

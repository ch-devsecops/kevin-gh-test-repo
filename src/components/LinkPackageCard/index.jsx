import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { H5, Markdown, Fade, useThemeContext } from '@honda-canada/design-system-react';
import { InView } from 'react-intersection-observer';
import { mapGTMCategory } from '../../utils/sitecoreFields';
import { stripMarkdownHeading, styledCompiler } from '../../utils/markdown';
import Content from './Content';
import { CollapsibleContext } from '../CollapsibleContainer';
import { LayoutContext } from '../LayoutContext';
import PackageCard from '../PackageCard/PackageCard';
import { MC_THEME_NAME } from '../../utils/constants';
import safelyParseJSON from '../../utils/safelyParseJSON';

const LinkPackageCard = ({ fields, rendering = {} }) => {
  const { isCollapsed } = useContext(CollapsibleContext) || {};
  const { layoutName } = useContext(LayoutContext) || {};
  const theme = useThemeContext();
  const { packageDetails, gtmTitle, gtmCategory, expandLabel, collapseLabel } = fields || {};
  const parsedDetails = safelyParseJSON(packageDetails?.value);

  const {
    featuredText,
    name,
    priceInformation,
    features,
    cta = {},
    footnote,
    savings = {},
    bannerText: bannerTextProp,
  } = parsedDetails || {};

  const [bannerText, setBannerText] = useState(bannerTextProp || '');

  useEffect(() => {
    const searchParams = new URLSearchParams(decodeURIComponent(window.location.search));
    const model = searchParams.get('model');

    if (model) {
      const parsedBannerText = bannerText.replace(/{{\s?modelName\s?}}/gi, model);
      setBannerText(parsedBannerText);
    }
  }, [bannerText]);

  if (!fields) return null;
  if (Object.keys(parsedDetails).length === 0) return null;

  const { subtitleOne, price, subtitleTwo, specialOfferLabel, specialOfferPrice, tooltip = {} } = priceInformation;

  const { title, columnOneTitle, columnTwoTitle, columnThreeTitle, tableData } = savings;

  const table = tableData?.length && {
    caption: <H5>{styledCompiler(stripMarkdownHeading(title))}</H5>,
    columns: [
      <Markdown key="1">{stripMarkdownHeading(columnOneTitle)}</Markdown>,
      <Markdown key="2">{stripMarkdownHeading(columnTwoTitle)}</Markdown>,
      <Markdown key="3">{stripMarkdownHeading(columnThreeTitle)}</Markdown>,
    ],
    rows: tableData.map(data => [
      <Markdown key="1" fontFamily="bold">
        {stripMarkdownHeading(data.columnOne)}
      </Markdown>,
      <Markdown key="2" fontFamily="bold">
        {stripMarkdownHeading(data.columnTwo)}
      </Markdown>,
      <Markdown key="3" fontFamily="bold" color={theme.name === MC_THEME_NAME ? 'red' : 'blue'}>
        {stripMarkdownHeading(data.columnThree)}
      </Markdown>,
    ]),
  };

  const gtmTags = {
    type: rendering?.componentName,
    category: mapGTMCategory(gtmCategory),
  };

  const TitleContent = <H5>{styledCompiler(stripMarkdownHeading(name))}</H5>;

  return (
    <InView triggerOnce>
      {({ inView, ref }) => (
        <Fade ref={ref} shouldAnimate={inView} height="100%" initialOpacity={0}>
          <PackageCard
            gtmTags={gtmTags}
            featuredText={featuredText}
            title={TitleContent}
            bannerText={bannerText}
            linked
            subtitle1={subtitleOne}
            subtitle2={subtitleTwo}
            amount={price}
            specialOfferLabel={specialOfferLabel}
            specialOfferPrice={specialOfferPrice}
            tooltip={tooltip}
            layoutContainer={layoutName}
          >
            <Content
              lists={features}
              table={table}
              cta={cta}
              gtmTitle={gtmTitle?.value}
              footnote={footnote}
              expandLabel={expandLabel?.value}
              collapseLabel={collapseLabel?.value}
              isCollapsed={isCollapsed}
            />
          </PackageCard>
        </Fade>
      )}
    </InView>
  );
};

LinkPackageCard.propTypes = {
  fields: PropTypes.shape({
    packageDetails: PropTypes.shape({ value: PropTypes.string }),
    gtmTitle: PropTypes.shape({ value: PropTypes.string }),
    gtmCategory: PropTypes.shape({ value: PropTypes.string }),
    expandLabel: PropTypes.shape({ value: PropTypes.string }),
    collapseLabel: PropTypes.shape({ value: PropTypes.string }),
  }),
  rendering: PropTypes.shape({}),
};

export default LinkPackageCard;

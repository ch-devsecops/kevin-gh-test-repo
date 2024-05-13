import React, { useContext, useEffect, useState } from 'react';
import {
  Box,
  Button,
  Column,
  Copy,
  H1,
  Icon,
  Image,
  MarkdownHeading,
  Optional,
  Row,
  UnorderedList,
  UnorderedListItem,
  HangTag,
} from '@honda-canada/design-system-react';
import formatPrice from '@honda-canada/js-utilities/lib/formatPrice';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import EmbeddedCarousel from './EmbeddedCarousel';
import themeStyles from './ProductDetailsCard.styles';
import LocalStorageContext from '../LocalStorageContext/LocalStorageContext';
import { compareProducts } from '../../utils/constants';
import { styledCompiler } from '../../utils/markdown';
import { getAddToCompareProductLineGtmTags, getProductLineGtmTags } from './utils';
import useAppName from '../../utils/sitecoreContext/useAppName';
import { useLanguage } from '../../utils/sitecoreContext';

const PrimaryButton = themeStyles.apply(Button, 'PrimaryButton');
const SecondaryToggleButton = themeStyles.apply(Button, 'SecondaryToggleButton');
const List = themeStyles.apply(UnorderedList, 'List');
const ListItem = themeStyles.apply(UnorderedListItem, 'ListItem');
const ButtonsGroup = themeStyles.apply(Box, 'ButtonsGroup');
const Title = themeStyles.apply(H1, 'Title');
const Subtitle = themeStyles.apply(MarkdownHeading, 'Subtitle');
const BodyText = themeStyles.apply(Copy, 'BodyText');
const Heading = themeStyles.apply(MarkdownHeading, 'Heading');
const LeftColumn = themeStyles.apply(Column, 'LeftColumn');
const RightColumn = themeStyles.apply(Column, 'RightColumn');
const RightColumnWrapper = themeStyles.apply(Box, 'RightColumnWrapper');
const ImageContainer = themeStyles.apply(Box, 'ImageContainer');
const HangTagWrapper = themeStyles.apply(Box, 'HangTagWrapper');

const ProductDetailsCard = ({
  detId,
  title,
  subtitle,
  tagline,
  list,
  images,
  gtmTags,
  headingTitle,
  actionButtonText,
  compareIconName,
  PriceComponent,
  prices,
}) => {
  const { t } = useTranslation();
  const language = useLanguage();
  const { toCompareProducts, setToCompareProducts, removeFromCompareProducts } = useContext(LocalStorageContext);
  const [checkCompare, setCheckCompare] = useState(false);
  const [isCompareDisabled, setIsCompareDisabled] = useState(false);

  const appName = useAppName();
  const iconName = checkCompare ? 'close' : compareIconName;

  const discountValue = prices?.discount?.priceDiscountAmount;

  useEffect(() => {
    setIsCompareDisabled(toCompareProducts.length >= compareProducts.limit && !toCompareProducts.includes(detId));
    setCheckCompare(toCompareProducts.includes(detId));
  }, [detId, toCompareProducts]);

  const imagesList = images?.map((image, i) => (
    <ImageContainer data-testid="product-image-container" key={i.toString()}>
      <Image
        width="auto"
        data-testid="product-image"
        src={image.url}
        alt={image.alt?.value}
        coverContainer
        loading="eager"
        fetchpriority="high"
      />
    </ImageContainer>
  ));

  const onCompareEngine = () => {
    setCheckCompare(!checkCompare);
    if (checkCompare) {
      removeFromCompareProducts(detId);
    } else {
      setToCompareProducts(detId);
    }
  };

  return (
    <Row>
      <LeftColumn width={[1, 1, 1 / 2]}>
        <Optional when={!!discountValue}>
          <HangTagWrapper>
            <HangTag
              label={t('Shared.Common.saveLabel')}
              amount={formatPrice(discountValue, language)}
              language={language}
            />
          </HangTagWrapper>
        </Optional>
        <Optional when={imagesList}>
          <EmbeddedCarousel mt={['s', 'l']} items={imagesList} />
        </Optional>
      </LeftColumn>
      <RightColumn width={[1, 1, 1 / 2]}>
        <RightColumnWrapper>
          <Title data-testid="product-title">{title}</Title>
          <Subtitle headingOverride="h5" data-testid="product-subtitle">
            {subtitle}
          </Subtitle>
          <BodyText data-testid="tagline">{styledCompiler(tagline)}</BodyText>
          <Optional when={Boolean(list?.length)}>
            <Heading headingOverride="h6" data-testid="heading-title">
              {headingTitle}
            </Heading>
          </Optional>
          <List bulletStyle="bullet" data-testid="product-features">
            {list?.map((item, i) => (
              <ListItem data-testid="product-feature" key={i.toString()}>
                {item}
              </ListItem>
            ))}
          </List>
          <Optional when={Boolean(PriceComponent)}>
            <PriceComponent />
          </Optional>
          <ButtonsGroup>
            <PrimaryButton
              as="a"
              data-testid="primary-button"
              styling="primary"
              href={t('Shared.Common.dealersPageUrl')}
              {...getProductLineGtmTags(appName, gtmTags)}
            >
              {actionButtonText}
            </PrimaryButton>
            <SecondaryToggleButton
              as="button"
              styling="secondary"
              onClick={onCompareEngine}
              data-testid="secondary-button"
              disabled={isCompareDisabled}
              {...getAddToCompareProductLineGtmTags(appName, gtmTags, checkCompare)}
            >
              <Icon name={iconName} iconColor={isCompareDisabled ? 'grey.2' : 'secondary'} className={iconName} />
              {t(checkCompare ? 'Shared.Common.removeFromCompareButton' : 'Shared.Common.addToCompareButton')}
            </SecondaryToggleButton>
          </ButtonsGroup>
        </RightColumnWrapper>
      </RightColumn>
    </Row>
  );
};

ProductDetailsCard.propTypes = {
  actionButtonText: PropTypes.string,
  compareIconName: PropTypes.string,
  PriceComponent: PropTypes.func,
  headingTitle: PropTypes.string,
  detId: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  tagline: PropTypes.string,
  list: PropTypes.arrayOf(PropTypes.string),
  images: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      url: PropTypes.string,
      alt: PropTypes.shape({
        value: PropTypes.string,
      }),
      title: PropTypes.shape({
        value: PropTypes.string,
      }),
    }),
  ),
  gtmTags: PropTypes.shape({
    title: PropTypes.string,
    addTitle: PropTypes.string,
    removeTitle: PropTypes.string,
    gtmTrimName: PropTypes.string,
    gtmSeriesName: PropTypes.string,
    gtmCrankshaftName: PropTypes.string,
    componentName: PropTypes.string,
    interactionType: PropTypes.string,
    removeInteractionType: PropTypes.string,
  }),
};

export default ProductDetailsCard;

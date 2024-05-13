import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import styled from 'styled-components';
import { compiler } from 'markdown-to-jsx';
import { Box, Row, Column, H3, Copy } from '@honda-canada/design-system-react';
import { useTranslation } from 'react-i18next';
import { stripMarkdownHeading } from '../../utils/markdown';
import ChevronSvg from './ChevronSvg';

const ProvinceSelectorContainer = styled(Box)`
  position: relative;
  display: flex;
  justify-content: flex-end;

  @media screen and (min-width: 990px) {
    margin-left: 0;
    display: inline-block;
  }

  &:before {
    content: '▾';
    position: absolute;
    right: 0;
    top: 3px;
    font-size: 18px;
    color: #878787;
    pointer-events: none;
    -webkit-font-smoothing: antialiased;
  }
`;

const Select = styled.select`
  padding: 5px 15px 5px 0;
  outline: medium none;
  background: transparent;
  border: 1px solid transparent;
  -webkit-appearance: none;
  -moz-appearance: none;
  -ms-appearance: none;
  appearance: none;
  font-size: 12px;
  color: #878787;
  text-transform: uppercase;

  /* IE11 */
  &::-ms-expand {
    display: none;
  }
`;

const Banner = styled.div`
  max-width: 1440px;
  position: fixed;
  bottom: ${({ isVisible }) => (isVisible ? 0 : '-400px')};
  background-color: #a30024;
  width: 100%;
  padding: 20px 25px 25px;
  z-index: 9999;
  left: 50%;
  transform: translateX(-50%);
  transition: bottom 0.3s linear;
`;

const BannerSelectContainer = styled.div`
  position: relative;
  overflow: hidden;
  margin-bottom: 15px;
  display: flex;
  max-width: 293px;

  @media screen and (min-width: 768px) {
    display: inline-block;
    margin-right: 10px;
    margin-bottom: 0;
    max-width: none;
  }

  &:before {
    content: '';
    position: absolute;
    right: 30px;
    top: 50%;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
    height: calc(100% - 4px);
    width: 2px;
    background: #f5f5f5;
  }
`;

const ChevronContainer = styled.div`
  position: absolute;
  right: 12px;
  top: 27%;
  pointer-events: none;
`;

const BannerSelect = styled.select`
  padding: 5px 10px 5px 10px;
  font-size: 16px;
  min-height: 31px;
  color: #878787;
  outline: none;
  cursor: pointer;
  padding-right: 35px;
  -webkit-appearance: none;
  -moz-appearance: none;
  -ms-appearance: none;
  appearance: none;
  border-radius: 5px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.white};

  /* IE11 */
  &::-ms-expand {
    display: none;
  }
}`;

const Button = styled.button`
  border: 1px solid #e60033;
  font-size: 12px;
  font-family: ${({ theme }) => theme.fonts.heading};
  background: linear-gradient(to bottom, #e50032 0%, #a30024 100%);
  padding: 5px 9px;
  color: ${({ theme }) => theme.colors.white};
  display: inline-block;
  text-shadow: 0 1px 1px rgb(0 0 0 / 50%);
  box-shadow: 1px 2px 1px 0 rgb(0 0 0 / 75%);

  &:hover {
    background: linear-gradient(to bottom, #a30024 0%, #e50032 100%);
  }
  @media screen and (min-width: 768px) {
    font-size: 17px;
  }
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.fonts.heading};
  opacity: 0.2;
  position: absolute;
  transform: translateY(-50%);
  font-size: 22px;
  right: 17px;
  top: 27px;
  padding: 0;
  margin: 0;

  @media screen and (min-width: 768px) {
    font-size: 34px;
    right: 15px;
    top: 50%;
  }
`;

const ProvinceSelector = ({ provinces, description, placeholder, bannerTitle, buttonLabel, bannerPlaceholder }) => {
  const [selectedProvince, setSelectedProvince] = useState(Cookies.get('_province'));
  const [isBannerVisible, setIsBannerVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    setIsBannerVisible(!selectedProvince);
    setShouldRender(true);
  }, []);

  const handleProvinceSelect = e => {
    if (e.target.value) {
      Cookies.set('_province', e.target.value, { expires: 365 });
      document.location.reload();
    }
  };

  const handleBannerSubmit = () => {
    if (selectedProvince) {
      Cookies.set('_province', selectedProvince, { expires: 365 });
      document.location.reload();
    }
  };

  if (!shouldRender) return null;

  return (
    <>
      <ProvinceSelectorContainer as="li">
        <Select value={selectedProvince || ''} onChange={handleProvinceSelect}>
          {provinces?.map(province => (
            <option key={province.key.value} value={province.key.value}>
              {province.key.value}
            </option>
          ))}
          {!selectedProvince && <option value="">{placeholder}</option>}
        </Select>
      </ProvinceSelectorContainer>
      <Banner isVisible={isBannerVisible}>
        <Row maxWidth="996px" mx="auto">
          <Column width={[1, 4 / 10, 1 / 2]} mb={['20px', 0]}>
            <H3
              fontSize={['16px !important', '20px !important']}
              lineHeight={['16px !important', '20px !important']}
              fontFamily="heading"
              mb="2"
              textTransform="uppercase"
              color="white"
            >
              {compiler(stripMarkdownHeading(bannerTitle))}
            </H3>
            <Copy color="white" fontSize="12px" lineHeight="20px">
              {compiler(stripMarkdownHeading(description))}
            </Copy>
          </Column>
          <Column width={[1, 6 / 10, 1 / 2]} pl={['12px', '40px']} display={['block', 'flex']} alignItems="center">
            <BannerSelectContainer>
              <BannerSelect value={selectedProvince || ''} onChange={e => setSelectedProvince(e.target.value)}>
                {provinces?.map(province => (
                  <option key={province.key.value} value={province.key.value}>
                    {province.provinceFullName.value}
                  </option>
                ))}
                <option value="">{bannerPlaceholder}</option>
              </BannerSelect>
              <ChevronContainer>
                <ChevronSvg />
              </ChevronContainer>
            </BannerSelectContainer>
            <Button onClick={handleBannerSubmit}>{compiler(stripMarkdownHeading(buttonLabel))}</Button>
            <CloseButton aria-label={t('Shared.Common.closeAria')} onClick={() => setIsBannerVisible(false)}>
              X
            </CloseButton>
          </Column>
        </Row>
      </Banner>
    </>
  );
};

export default ProvinceSelector;

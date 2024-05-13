import React, { useContext } from 'react';
import { Copy, Optional } from '@honda-canada/design-system-react';

import type { SubTitleProps } from '../types';
import Context from '../service/Context';

import themeStyles from '../styles/Card.styles';

const SubTitleCopy = themeStyles.apply(Copy, 'SubTitleCopy');

const CardSubTitle = (subTitleProps: SubTitleProps) => {
  const { subTitle: subTitleContext } = useContext(Context) || {};

  const { alignment = 'center', subTitle } = { ...subTitleContext, ...subTitleProps };

  return (
    <Optional when={subTitle}>
      <SubTitleCopy alignment={alignment} data-testid="cy-uni-card-sub-title">
        {subTitle}
      </SubTitleCopy>
    </Optional>
  );
};

export default CardSubTitle;

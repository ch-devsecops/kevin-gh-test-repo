import { createContext } from 'react';

import type { FieldsProps } from '../types';

// eslint-disable-next-line prettier/prettier
const Context = createContext<FieldsProps>({} as FieldsProps);

export default Context;

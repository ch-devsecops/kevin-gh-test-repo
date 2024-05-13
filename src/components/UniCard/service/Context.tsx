import { createContext } from 'react';

import type { AppNameConfig } from '../types';

// eslint-disable-next-line prettier/prettier
const Context = createContext<AppNameConfig>({} as AppNameConfig);

export default Context;

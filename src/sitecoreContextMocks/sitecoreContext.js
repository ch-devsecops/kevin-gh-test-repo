const commonSitecoreContext = {
  pageEditing: false,
  pageState: 'normal',
  language: 'en',
  sitecoreApiHost: 'https://app-honda-pod01-cd-plan-dmm-ccentral-dit.azurewebsites.net',
  localhostSitecoreApiHost: 'https://app-honda-pod02-cd-plan-dmm-ccentral-dit.azurewebsites.net',
  sitecoreApiKey: '453A4BB7-B80C-4351-9173-CF0748C3793F',
  hondaRestApiHost: 'uat-api.honda.ca',
  settings: { defaultProvince: 'ON' },
  sotHondaExperienceApiConfig: {
    consumerName: 'HCICONSUMERWEB',
    consumerId: '1000001',
    env: 'sit',
  },
};

const sitecoreContext = {
  engine: {
    site: {
      name: 'Engine',
    },
    ...commonSitecoreContext,
  },
  marine: {
    site: {
      name: 'Marine',
    },
    ...commonSitecoreContext,
  },
  honda: {
    site: {
      name: 'Honda',
    },
    ...commonSitecoreContext,
  },
  acura: {
    site: {
      name: 'Acura',
    },
    ...commonSitecoreContext,
  },
  mc: {
    site: {
      name: 'MC',
    },
    ...commonSitecoreContext,
  },
  psp: {
    site: {
      name: 'PSP',
    },
    partStreamConfig: {
      host: '//services.arinet.com/PartStream/',
      appKey: 'Vvsd42YoyPLGcuiWQlqj',
      id: 'aripartstream',
    },
    ...commonSitecoreContext,
  },
};

export default sitecoreContext;

const data = {
  name: 'Forfait de base',
  bannerText: 'Aucune inscription requise',
  featuredText: '',
  priceInformation: {
    subtitleOne: 'Tarif annuel',
    price: 'GRATUIT',
    subtitleTwo: '',
    specialOfferLabel: '',
    specialOfferPrice: '',
    tooltip: {
      content: '',
      ariaLabel: '',
      closeAriaLabel: '',
    },
  },
  features: [
    {
      header: '',
      data: ['Guides du véhicule', 'Rendez-vous d’entretien', 'Avis de rappel', 'Assistance routière'],
    },
    {
      header: '',
      data: ['Guides du véhicule', 'Rendez-vous d’entretien', 'Avis de rappel', 'Assistance routière'],
    },
  ],
  cta: {
    label: 'DÉCOUVREZ COMMENT VOUS INSCRIRE',
    href: 'https://youtu.be/A9R9vXbSvxQ',
    ariaLabel: 'go to Learn How to Enrol page',
    newTab: true,
  },
  footnote: '',
};

export const jsonMock = JSON.stringify(data);

export const malformedJsonMock =
  '{"name":"Security Package",:...."bannerText":"4 years complimentary period when you buy a new {{ modelName }}","priceInformation":{"subtitleOne":"Yearly price starts @","price":"$110","subtitleTwo":"Exclusive of taxes","tooltip":{ "content": "Legal discalaimer dolor sit amet, consectetur adipiscing elit.", "ariaLabel": "Show Security Package popup", "closeAriaLabel": "Close pop-up" }},"features":[{"header":"All Features of Remote Package","data":["Remote Engine Set","Remote Lock & Unlock","Find My Car","Geofence Alert","Speed Alert","Last Mile (nav-equipped models)","Stolen Vehicle Locator","Security Alarm Notification"]}],"cta":{"label":"Learn How to Enrol","href":"www.acura.ca/learn-to-enroll","ariaLabel":"go to Learn How to Enrol page"},"ariaLabel":"random text","footnote":"Legal discalaimer dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. "}';

const jsonData = {
  dropdown: {
    label: 'Select your trim',
    paymentGatewayFieldName: 'leadData.trim',
    options: [
      {
        value: 'a-spec-trim-key1',
        text: 'A-SPEC',
        additionalDropdowns: [
          {
            label: 'Rim size',
            paymentGatewayFieldName: 'leadData.rimSize',
            options: [
              {
                value: 'a-spec-16',
                text: '16 "',
              },
              {
                value: 'a-spec-30',
                text: '30 "',
              },
            ],
          },
          {
            label: 'Colour',
            paymentGatewayFieldName: 'leadData.colour',
            options: [
              {
                value: 'a-spec-red',
                text: 'Red',
              },
              {
                value: 'a-spec-blue',
                text: 'Blue',
              },
            ],
          },
        ],
      },
      {
        value: 'tech-trim-key1',
        text: 'TECH',
        additionalDropdowns: [
          {
            label: 'Rim size',
            paymentGatewayFieldName: 'leadData.rimSize',
            options: [
              {
                value: 'tech-50',
                text: '50 "',
              },
              {
                value: 'tech-100',
                text: '100 "',
              },
            ],
          },
          {
            label: 'Colour',
            paymentGatewayFieldName: 'leadData.colour',
            options: [
              {
                value: 'tech-white',
                text: 'White',
              },
              {
                value: 'tech-black',
                text: 'Black',
              },
            ],
          },
        ],
      },
    ],
  },
  paymentGatewayCommonFields: {
    productLine: 'C',
  },
};

export default jsonData;

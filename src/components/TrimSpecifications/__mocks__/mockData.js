// eslint-disable-next-line import/prefer-default-export
export const jssFields = {
  data: {
    value: {
      modelYear: {
        fields: {
          year: {
            value: '2021',
          },
          model: {
            detKey: {
              value: 'tlx',
            },
          },
          trims: [
            {
              detKey: {
                value: 'tlx_10252',
              },
              detIdentifier: {
                value: '10252',
              },
              trimName: {
                value: 'TLX',
              },
              specialVehicleType: {
                item: {
                  fields: {
                    specialVehicleTypeName: {
                      value: 'So Special',
                    },
                  },
                },
              },
              defaultTransmission: {
                item: {
                  fields: {
                    isBuildable: {
                      value: true,
                    },
                  },
                },
              },
            },
            {
              detIdentifier: {
                value: '10253',
              },
              detKey: {
                value: 'tech_10253',
              },
              trimName: {
                value: 'TECH',
              },
              defaultTransmission: {
                item: {
                  fields: {
                    isBuildable: {
                      value: false,
                    },
                  },
                },
              },
            },
          ],
        },
      },
    },
  },
};

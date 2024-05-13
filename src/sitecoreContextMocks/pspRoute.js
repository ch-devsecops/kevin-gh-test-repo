const pspRoute = {
  name: 'On-Road',
  displayName: 'on-road',
  fields: {
    nameBadge: {
      value: {},
    },
    h1Tag: {
      value: '',
    },
    sectionNavLabel: {
      value: '',
    },
    gtmPageType: {
      id: 'e1f25612-2c79-42b7-815e-be851186774f',
      url: '/sitecore/System/Foundation/common/GTM-Page-Types/Others',
      name: 'Others',
      displayName: 'Others',
      fields: {
        value: {
          value: 'others',
        },
      },
    },
    requestLocation: {
      value: false,
    },
    isDarkMode: {
      value: false,
    },
    pageTitle: {
      value: 'On-Road',
    },
    'Change Frequency': {
      value: '',
    },
    'Exclude From Sitemap': {
      value: false,
    },
    Priority: {
      value: '0.5',
    },
  },
  databaseName: 'web',
  deviceId: 'fe5d7fdf-89c0-4d99-9aa3-b5fbd009c9f3',
  itemId: 'f9750af7-f214-4e54-a0e8-908d6a5b9348',
  itemLanguage: 'en',
  itemVersion: 1,
  layoutId: '2ed6a616-d181-4528-9f10-47a349e8dc4d',
  templateId: 'c9b5c9b7-c232-400c-ac3e-a312aabe94c8',
  templateName: 'Page',
  placeholders: {
    main: [
      {
        uid: 'a594d797-8d5c-4dd3-9228-65e71876d45f',
        componentName: 'SideNavLayout',
        dataSource: '{0F133276-86B8-45E8-AAAC-73C225AA5655}',
        params: {},
        fields: {},
        placeholders: {
          'side-nav-column-left': [
            {
              uid: '6665d188-a57c-4d6c-9194-734073d2c7a6',
              componentName: 'ModelListFilters',
              dataSource: '{8483E288-CE0C-42DC-A13A-089A41B33575}',
              params: {},
              fields: {
                data: {
                  value: {
                    anchorId: {
                      value: '',
                    },
                    gtmTitle: {
                      value: '',
                    },
                    gtmCategory: {
                      fields: null,
                    },
                    filterLabel: {
                      value: 'Filter Label',
                    },
                    trimAvailableSingular: {
                      value: 'Trim Available Singular',
                    },
                    trimAvailablePlural: {
                      value: 'Trim Available Plural',
                    },
                    resetFilters: {
                      value: 'Reset Filters',
                    },
                    hideYearFilter: {
                      item: {
                        value: false,
                      },
                    },
                    hideModelFilter: {
                      item: {
                        value: false,
                      },
                    },
                    hidePriceFilter: {
                      item: {
                        value: false,
                      },
                    },
                    vehicleTypeLink1: {
                      item: {
                        value: {
                          href: '',
                        },
                      },
                    },
                    vehicleTypeLink2: {
                      item: {
                        value: {
                          href: '',
                        },
                      },
                    },
                    vehicleTypeLink3: {
                      item: {
                        value: {
                          href: '',
                        },
                      },
                    },
                    vehicleTypeLink4: {
                      item: {
                        value: {
                          href: '',
                        },
                      },
                    },
                    filterType: [],
                  },
                },
              },
            },
          ],
          'side-nav-column-right': [
            {
              uid: '202856d5-5d22-44a1-97c4-d2c92432596a',
              componentName: 'ModelCardWithTrims',
              dataSource: '{6C88A9F7-71A7-4B26-AD5F-20EE5D3EAE83}',
              params: {},
              fields: {
                data: {
                  value: {
                    anchorId: {
                      value: 'anchor-id',
                    },
                    gtmTitle: {
                      value: 'GTM Title',
                    },
                    gtmCategory: {
                      fields: {
                        value: {
                          value: 'model interactions',
                        },
                      },
                    },
                    gtmModelName: {
                      value: 'GTM Model Name',
                    },
                    gtmTrimName: {
                      value: 'GTM Trim Name',
                    },
                    gtmBodyStyle: {
                      value: 'GTM Body Style',
                    },
                    gtmInteractionType: {
                      value: 'GTM Interaction Type',
                    },
                    ctaLink: {
                      item: {
                        value: {
                          href: '',
                          text: 'Explore Touring',
                          anchor: '',
                          linktype: 'internal',
                          class: '',
                          title: '',
                          querystring: '',
                          id: '{48E7D649-1987-4FF0-A0B4-AD785D6518D5}',
                        },
                      },
                    },
                    ctaType: {
                      value: 'Secondary',
                    },
                    heroImage: {
                      item: {
                        value: {
                          src: ['url()', 'url()'],
                        },
                      },
                    },
                    category: {
                      fields: {
                        name: 'Cruiser',
                        categoryName: {
                          value: 'Cruiser',
                        },
                        vehicleType: {
                          name: 'ON-ROAD',
                          vehicleTypeName: {
                            value: 'On-Road',
                          },
                        },
                        defaultYear: {
                          fields: {
                            year: {
                              value: '',
                            },
                          },
                        },
                        modelYears: [
                          {
                            detKey: {
                              value: '',
                            },
                            detIdentifier: {
                              value: '',
                            },
                            sotId: {
                              value: '',
                            },
                            year: {
                              value: '2023',
                            },
                            tagline: {
                              value: 'Cruiser',
                            },
                            modelYearPage: {
                              fields: {
                                name: '2023',
                                url: '/en/Cruiser',
                                subPages: [
                                  {
                                    name: 'Accessories',
                                    url: '/en/Cruiser/Accessories',
                                  },
                                  {
                                    name: 'Specifications',
                                    url: '/en/Cruiser/Specifications',
                                  },
                                  {
                                    name: 'Trims',
                                    url: '/en/Cruiser/Trims',
                                  },
                                ],
                              },
                            },
                            models: [
                              {
                                detKey: {
                                  value: 'rebel_1100',
                                },
                                detIdentifier: {
                                  value: '1100',
                                },
                                sotId: {
                                  value: '',
                                },
                                name: 'Rebel 1100',
                                modelName: {
                                  value: 'Rebel 1100',
                                },
                                trims: [
                                  {
                                    detKey: {
                                      value: 'rebel_1100_13321',
                                    },
                                    detIdentifier: {
                                      value: '13321',
                                    },
                                    sotId: {
                                      value: '',
                                    },
                                    name: 'Rebel 1100',
                                    trimName: {
                                      value: 'Rebel 1100',
                                    },
                                    primaryThumbnail: {
                                      item: {
                                        value: {},
                                      },
                                    },
                                    defaultTransmission: {
                                      fields: {
                                        name: 'DCT',
                                        detKey: {
                                          value: '11752-Default',
                                        },
                                        detIdentifier: {
                                          value: '11752',
                                        },
                                        sotId: {
                                          value: '',
                                        },
                                        modelCode: {
                                          value: 'CMX1100DP',
                                        },
                                        defaultExteriorColor: {
                                          fields: {
                                            name: 'Gunmetal Black Metallic',
                                            color: {
                                              fields: {
                                                detKey: {
                                                  value: 'gbgunmetal_black_metallic',
                                                },
                                                detIdentifier: {
                                                  value: '',
                                                },
                                                sotId: {
                                                  value: '',
                                                },
                                              },
                                            },
                                          },
                                        },
                                      },
                                    },
                                    transmissions: [
                                      {
                                        items: [
                                          {
                                            detKey: {
                                              value: '11751-Default',
                                            },
                                            detIdentifier: {
                                              value: '11751',
                                            },
                                            sotId: {
                                              value: '',
                                            },
                                            name: 'ABS',
                                            transmissionName: {
                                              value: 'ABS',
                                            },
                                            modelCode: {
                                              value: 'CMX1100AP',
                                            },
                                            hidePriceAndFinance: {
                                              value: '',
                                            },
                                            defaultExteriorColor: {
                                              item: {
                                                id: 'a2c7a988-2e3b-470b-a9db-d14c8045d52c',
                                                url: '/sitecore/Content/Web-Catalog/MC/ON-ROAD/Cruiser/2023/Rebel-1100/Rebel-1100/Transmissions/ABS/ExteriorColors/Gunmetal-Black-Metallic',
                                                name: 'Gunmetal Black Metallic',
                                                displayName: 'Gunmetal Black Metallic',
                                                fields: {
                                                  studioAssets: {
                                                    id: '37b2644f-5338-49e8-859b-66972f3aaa3a',
                                                    url: '/sitecore/Media-Library/Brands/PSP/MC/Gunmetalblackmetallic-cruiser',
                                                    name: 'Gunmetalblackmetallic-cruiser',
                                                    displayName: 'Gunmetalblackmetallic-cruiser',
                                                    fields: {},
                                                  },
                                                  color: {
                                                    id: '3c0dfa75-e78c-490c-8365-3028c529f6fb',
                                                    url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Gunmetal-Black-Metallic',
                                                    name: 'Gunmetal Black Metallic',
                                                    displayName: 'Gunmetal Black Metallic',
                                                    fields: {
                                                      colorName: {
                                                        value: 'Gunmetal Black Metallic',
                                                      },
                                                      detKey: {
                                                        value: 'gbgunmetal_black_metallic',
                                                      },
                                                      hexValue: {
                                                        value: '#1f262a',
                                                      },
                                                    },
                                                  },
                                                },
                                              },
                                            },
                                            exteriorColors: [
                                              {
                                                colors: [
                                                  {
                                                    name: 'Gunmetal Black Metallic',
                                                    color: {
                                                      item: {
                                                        id: '3c0dfa75-e78c-490c-8365-3028c529f6fb',
                                                        url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Gunmetal-Black-Metallic',
                                                        name: 'Gunmetal Black Metallic',
                                                        displayName: 'Gunmetal Black Metallic',
                                                        fields: {
                                                          colorName: {
                                                            value: 'Gunmetal Black Metallic',
                                                          },
                                                          detKey: {
                                                            value: 'gbgunmetal_black_metallic',
                                                          },
                                                          hexValue: {
                                                            value: '#1f262a',
                                                          },
                                                        },
                                                      },
                                                    },
                                                  },
                                                  {
                                                    name: 'Iridium Grey Metallic',
                                                    color: {
                                                      item: {
                                                        id: 'dc3fe36d-ecef-4c73-a777-1848771a3780',
                                                        url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Iridium-Grey-Metallic',
                                                        name: 'Iridium Grey Metallic',
                                                        displayName: 'Iridium Grey Metallic',
                                                        fields: {
                                                          colorName: {
                                                            value: 'Iridium Grey Metallic',
                                                          },
                                                          detKey: {
                                                            value: 'igmiridium_grey_metallic',
                                                          },
                                                          hexValue: {
                                                            value: '#3D3C3A',
                                                          },
                                                        },
                                                      },
                                                    },
                                                  },
                                                ],
                                              },
                                            ],
                                          },
                                          {
                                            detKey: {
                                              value: '11752-Default',
                                            },
                                            detIdentifier: {
                                              value: '11752',
                                            },
                                            sotId: {
                                              value: '',
                                            },
                                            name: 'DCT',
                                            transmissionName: {
                                              value: 'DCT',
                                            },
                                            modelCode: {
                                              value: 'CMX1100DP',
                                            },
                                            hidePriceAndFinance: {
                                              value: '',
                                            },
                                            defaultExteriorColor: {
                                              item: {
                                                id: 'fef3a558-982d-49a3-8b94-06e6511fe089',
                                                url: '/sitecore/Content/Web-Catalog/MC/ON-ROAD/Cruiser/2023/Rebel-1100/Rebel-1100/Transmissions/DCT/ExteriorColors/Gunmetal-Black-Metallic',
                                                name: 'Gunmetal Black Metallic',
                                                displayName: 'Gunmetal Black Metallic',
                                                fields: {
                                                  studioAssets: {
                                                    id: '37b2644f-5338-49e8-859b-66972f3aaa3a',
                                                    url: '/sitecore/Media-Library/Brands/PSP/MC/Gunmetalblackmetallic-cruiser',
                                                    name: 'Gunmetalblackmetallic-cruiser',
                                                    displayName: 'Gunmetalblackmetallic-cruiser',
                                                    fields: {},
                                                  },
                                                  color: {
                                                    id: '3c0dfa75-e78c-490c-8365-3028c529f6fb',
                                                    url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Gunmetal-Black-Metallic',
                                                    name: 'Gunmetal Black Metallic',
                                                    displayName: 'Gunmetal Black Metallic',
                                                    fields: {
                                                      colorName: {
                                                        value: 'Gunmetal Black Metallic',
                                                      },
                                                      detKey: {
                                                        value: 'gbgunmetal_black_metallic',
                                                      },
                                                      hexValue: {
                                                        value: '#1f262a',
                                                      },
                                                    },
                                                  },
                                                },
                                              },
                                            },
                                            exteriorColors: [
                                              {
                                                colors: [
                                                  {
                                                    name: 'Gunmetal Black Metallic',
                                                    color: {
                                                      item: {
                                                        id: '3c0dfa75-e78c-490c-8365-3028c529f6fb',
                                                        url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Gunmetal-Black-Metallic',
                                                        name: 'Gunmetal Black Metallic',
                                                        displayName: 'Gunmetal Black Metallic',
                                                        fields: {
                                                          colorName: {
                                                            value: 'Gunmetal Black Metallic',
                                                          },
                                                          detKey: {
                                                            value: 'gbgunmetal_black_metallic',
                                                          },
                                                          hexValue: {
                                                            value: '#1f262a',
                                                          },
                                                        },
                                                      },
                                                    },
                                                  },
                                                  {
                                                    name: 'Iridium Grey Metallic',
                                                    color: {
                                                      item: {
                                                        id: 'dc3fe36d-ecef-4c73-a777-1848771a3780',
                                                        url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Iridium-Grey-Metallic',
                                                        name: 'Iridium Grey Metallic',
                                                        displayName: 'Iridium Grey Metallic',
                                                        fields: {
                                                          colorName: {
                                                            value: 'Iridium Grey Metallic',
                                                          },
                                                          detKey: {
                                                            value: 'igmiridium_grey_metallic',
                                                          },
                                                          hexValue: {
                                                            value: '#3D3C3A',
                                                          },
                                                        },
                                                      },
                                                    },
                                                  },
                                                ],
                                              },
                                            ],
                                          },
                                        ],
                                      },
                                    ],
                                  },
                                ],
                                trimName: {
                                  value: 'Rebel 1100',
                                },
                                primaryThumbnail: {
                                  item: {
                                    value: {},
                                  },
                                },
                                secondaryThumbnail: {
                                  item: {
                                    value: {},
                                  },
                                },
                                specialVehicleType: {
                                  item: null,
                                },
                                nameBadge: {
                                  item: {
                                    value: {},
                                  },
                                },
                                defaultTransmission: {
                                  item: {},
                                },
                                bodyType: {
                                  item: [],
                                },
                                drivetrain: {
                                  item: [],
                                },
                                safety: {
                                  item: [],
                                },
                                interiorMaterial: {
                                  item: [],
                                },
                                designFeatures: {
                                  item: [],
                                },
                                wheels: {
                                  item: [],
                                },
                                entertainment: {
                                  item: [],
                                },
                                comfortConvenience: {
                                  item: [],
                                },
                                emissionRating: {
                                  value: '',
                                },
                                transmissions: [],
                              },
                            ],
                            trims: [
                              {
                                detKey: {
                                  value: 'rebel_1100',
                                },
                                detIdentifier: {
                                  value: '13321',
                                },
                                sotId: {
                                  value: '',
                                },
                                name: 'Rebel 1100',
                                trimName: {
                                  value: 'Rebel 1100',
                                },
                                primaryThumbnail: {
                                  item: {
                                    value: {},
                                  },
                                },
                                defaultTransmission: {
                                  fields: {
                                    name: 'DCT',
                                    detKey: {
                                      value: '11752-Default',
                                    },
                                    detIdentifier: {
                                      value: '11752',
                                    },
                                    sotId: {
                                      value: '',
                                    },
                                    modelCode: {
                                      value: 'CMX1100DP',
                                    },
                                    defaultExteriorColor: {
                                      fields: {
                                        name: 'Gunmetal Black Metallic',
                                        color: {
                                          fields: {
                                            detKey: {
                                              value: 'gbgunmetal_black_metallic',
                                            },
                                            detIdentifier: {
                                              value: '',
                                            },
                                            sotId: {
                                              value: '',
                                            },
                                          },
                                        },
                                      },
                                    },
                                  },
                                },
                                transmissions: [
                                  {
                                    items: [
                                      {
                                        detKey: {
                                          value: '11751-Default',
                                        },
                                        detIdentifier: {
                                          value: '11751',
                                        },
                                        sotId: {
                                          value: '',
                                        },
                                        name: 'ABS',
                                        transmissionName: {
                                          value: 'ABS',
                                        },
                                        modelCode: {
                                          value: 'CMX1100AP',
                                        },
                                        hidePriceAndFinance: {
                                          value: '',
                                        },
                                        defaultExteriorColor: {
                                          item: {
                                            id: 'a2c7a988-2e3b-470b-a9db-d14c8045d52c',
                                            url: '/sitecore/Content/Web-Catalog/MC/ON-ROAD/Cruiser/2023/Rebel-1100/Rebel-1100/Transmissions/ABS/ExteriorColors/Gunmetal-Black-Metallic',
                                            name: 'Gunmetal Black Metallic',
                                            displayName: 'Gunmetal Black Metallic',
                                            fields: {
                                              studioAssets: {
                                                id: '37b2644f-5338-49e8-859b-66972f3aaa3a',
                                                url: '/sitecore/Media-Library/Brands/PSP/MC/Gunmetalblackmetallic-cruiser',
                                                name: 'Gunmetalblackmetallic-cruiser',
                                                displayName: 'Gunmetalblackmetallic-cruiser',
                                                fields: {},
                                              },
                                              color: {
                                                id: '3c0dfa75-e78c-490c-8365-3028c529f6fb',
                                                url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Gunmetal-Black-Metallic',
                                                name: 'Gunmetal Black Metallic',
                                                displayName: 'Gunmetal Black Metallic',
                                                fields: {
                                                  colorName: {
                                                    value: 'Gunmetal Black Metallic',
                                                  },
                                                  detKey: {
                                                    value: 'gbgunmetal_black_metallic',
                                                  },
                                                  hexValue: {
                                                    value: '#1f262a',
                                                  },
                                                },
                                              },
                                            },
                                          },
                                        },
                                        exteriorColors: [
                                          {
                                            colors: [
                                              {
                                                name: 'Gunmetal Black Metallic',
                                                color: {
                                                  item: {
                                                    id: '3c0dfa75-e78c-490c-8365-3028c529f6fb',
                                                    url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Gunmetal-Black-Metallic',
                                                    name: 'Gunmetal Black Metallic',
                                                    displayName: 'Gunmetal Black Metallic',
                                                    fields: {
                                                      colorName: {
                                                        value: 'Gunmetal Black Metallic',
                                                      },
                                                      detKey: {
                                                        value: 'gbgunmetal_black_metallic',
                                                      },
                                                      hexValue: {
                                                        value: '#1f262a',
                                                      },
                                                    },
                                                  },
                                                },
                                              },
                                              {
                                                name: 'Iridium Grey Metallic',
                                                color: {
                                                  item: {
                                                    id: 'dc3fe36d-ecef-4c73-a777-1848771a3780',
                                                    url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Iridium-Grey-Metallic',
                                                    name: 'Iridium Grey Metallic',
                                                    displayName: 'Iridium Grey Metallic',
                                                    fields: {
                                                      colorName: {
                                                        value: 'Iridium Grey Metallic',
                                                      },
                                                      detKey: {
                                                        value: 'igmiridium_grey_metallic',
                                                      },
                                                      hexValue: {
                                                        value: '#3D3C3A',
                                                      },
                                                    },
                                                  },
                                                },
                                              },
                                            ],
                                          },
                                        ],
                                      },
                                      {
                                        detKey: {
                                          value: '11752-Default',
                                        },
                                        detIdentifier: {
                                          value: '11752',
                                        },
                                        sotId: {
                                          value: '',
                                        },
                                        name: 'DCT',
                                        transmissionName: {
                                          value: 'DCT',
                                        },
                                        modelCode: {
                                          value: 'CMX1100DP',
                                        },
                                        hidePriceAndFinance: {
                                          value: '',
                                        },
                                        defaultExteriorColor: {
                                          item: {
                                            id: 'fef3a558-982d-49a3-8b94-06e6511fe089',
                                            url: '/sitecore/Content/Web-Catalog/MC/ON-ROAD/Cruiser/2023/Rebel-1100/Rebel-1100/Transmissions/DCT/ExteriorColors/Gunmetal-Black-Metallic',
                                            name: 'Gunmetal Black Metallic',
                                            displayName: 'Gunmetal Black Metallic',
                                            fields: {
                                              studioAssets: {
                                                id: '37b2644f-5338-49e8-859b-66972f3aaa3a',
                                                url: '/sitecore/Media-Library/Brands/PSP/MC/Gunmetalblackmetallic-cruiser',
                                                name: 'Gunmetalblackmetallic-cruiser',
                                                displayName: 'Gunmetalblackmetallic-cruiser',
                                                fields: {},
                                              },
                                              color: {
                                                id: '3c0dfa75-e78c-490c-8365-3028c529f6fb',
                                                url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Gunmetal-Black-Metallic',
                                                name: 'Gunmetal Black Metallic',
                                                displayName: 'Gunmetal Black Metallic',
                                                fields: {
                                                  colorName: {
                                                    value: 'Gunmetal Black Metallic',
                                                  },
                                                  detKey: {
                                                    value: 'gbgunmetal_black_metallic',
                                                  },
                                                  hexValue: {
                                                    value: '#1f262a',
                                                  },
                                                },
                                              },
                                            },
                                          },
                                        },
                                        exteriorColors: [
                                          {
                                            colors: [
                                              {
                                                name: 'Gunmetal Black Metallic',
                                                color: {
                                                  item: {
                                                    id: '3c0dfa75-e78c-490c-8365-3028c529f6fb',
                                                    url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Gunmetal-Black-Metallic',
                                                    name: 'Gunmetal Black Metallic',
                                                    displayName: 'Gunmetal Black Metallic',
                                                    fields: {
                                                      colorName: {
                                                        value: 'Gunmetal Black Metallic',
                                                      },
                                                      detKey: {
                                                        value: 'gbgunmetal_black_metallic',
                                                      },
                                                      hexValue: {
                                                        value: '#1f262a',
                                                      },
                                                    },
                                                  },
                                                },
                                              },
                                              {
                                                name: 'Iridium Grey Metallic',
                                                color: {
                                                  item: {
                                                    id: 'dc3fe36d-ecef-4c73-a777-1848771a3780',
                                                    url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Iridium-Grey-Metallic',
                                                    name: 'Iridium Grey Metallic',
                                                    displayName: 'Iridium Grey Metallic',
                                                    fields: {
                                                      colorName: {
                                                        value: 'Iridium Grey Metallic',
                                                      },
                                                      detKey: {
                                                        value: 'igmiridium_grey_metallic',
                                                      },
                                                      hexValue: {
                                                        value: '#3D3C3A',
                                                      },
                                                    },
                                                  },
                                                },
                                              },
                                            ],
                                          },
                                        ],
                                      },
                                    ],
                                  },
                                ],
                              },
                            ],
                            modelKey: {
                              value: 'Cruiser',
                            },
                          },
                          {
                            detKey: {
                              value: '',
                            },
                            detIdentifier: {
                              value: '',
                            },
                            sotId: {
                              value: '',
                            },
                            year: {
                              value: '2022',
                            },
                            tagline: {
                              value: 'Cruiser',
                            },
                            modelYearPage: {
                              fields: null,
                            },
                            models: [
                              {
                                detKey: {
                                  value: 'rebel_1100',
                                },
                                detIdentifier: {
                                  value: '1100',
                                },
                                sotId: {
                                  value: '',
                                },
                                name: 'Rebel 1100',
                                modelName: {
                                  value: 'Rebel 1100',
                                },
                                trims: [
                                  {
                                    detKey: {
                                      value: 'rebel_1100_13279',
                                    },
                                    detIdentifier: {
                                      value: '13279',
                                    },
                                    sotId: {
                                      value: '',
                                    },
                                    name: 'Rebel 1100',
                                    trimName: {
                                      value: 'Rebel 1100',
                                    },
                                    primaryThumbnail: {
                                      item: {
                                        value: {},
                                      },
                                    },
                                    defaultTransmission: {
                                      fields: {
                                        name: 'Manual',
                                        detKey: {
                                          value: '11702-Default',
                                        },
                                        detIdentifier: {
                                          value: '11702',
                                        },
                                        sotId: {
                                          value: '',
                                        },
                                        modelCode: {
                                          value: 'CMX1100AN',
                                        },
                                        defaultExteriorColor: {
                                          fields: {
                                            name: 'Gunmetal Black Metallic',
                                            color: {
                                              fields: {
                                                detKey: {
                                                  value: 'gbgunmetal_black_metallic',
                                                },
                                                detIdentifier: {
                                                  value: '',
                                                },
                                                sotId: {
                                                  value: '',
                                                },
                                              },
                                            },
                                          },
                                        },
                                      },
                                    },
                                    transmissions: [
                                      {
                                        items: [
                                          {
                                            detKey: {
                                              value: '11703-Default',
                                            },
                                            detIdentifier: {
                                              value: '11703',
                                            },
                                            sotId: {
                                              value: '',
                                            },
                                            name: 'DCT',
                                            transmissionName: {
                                              value: 'DCT',
                                            },
                                            modelCode: {
                                              value: 'CMX1100AN',
                                            },
                                            hidePriceAndFinance: {
                                              value: '',
                                            },
                                            defaultExteriorColor: {
                                              item: {
                                                id: '5c73cd87-aef5-4a35-9606-643cc3342620',
                                                url: '/sitecore/Content/Web-Catalog/MC/ON-ROAD/Cruiser/2022/Rebel-1100/Rebel-1100/Transmissions/DCT/ExteriorColors/Gunmetal-Black-Metallic',
                                                name: 'Gunmetal Black Metallic',
                                                displayName: 'Gunmetal Black Metallic',
                                                fields: {
                                                  color: {
                                                    id: '3c0dfa75-e78c-490c-8365-3028c529f6fb',
                                                    url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Gunmetal-Black-Metallic',
                                                    name: 'Gunmetal Black Metallic',
                                                    displayName: 'Gunmetal Black Metallic',
                                                    fields: {
                                                      colorName: {
                                                        value: 'Gunmetal Black Metallic',
                                                      },
                                                      detKey: {
                                                        value: 'gbgunmetal_black_metallic',
                                                      },
                                                      hexValue: {
                                                        value: '#1f262a',
                                                      },
                                                    },
                                                  },
                                                },
                                              },
                                            },
                                            exteriorColors: [
                                              {
                                                colors: [
                                                  {
                                                    name: 'Gunmetal Black Metallic',
                                                    color: {
                                                      item: {
                                                        id: '3c0dfa75-e78c-490c-8365-3028c529f6fb',
                                                        url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Gunmetal-Black-Metallic',
                                                        name: 'Gunmetal Black Metallic',
                                                        displayName: 'Gunmetal Black Metallic',
                                                        fields: {
                                                          colorName: {
                                                            value: 'Gunmetal Black Metallic',
                                                          },
                                                          detKey: {
                                                            value: 'gbgunmetal_black_metallic',
                                                          },
                                                          hexValue: {
                                                            value: '#1f262a',
                                                          },
                                                        },
                                                      },
                                                    },
                                                  },
                                                  {
                                                    name: 'Pearl Stallion Brown',
                                                    color: {
                                                      item: {
                                                        id: '12f55898-25e8-4c97-b68b-dc039f1cdbd4',
                                                        url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Pearl-Stallion-Brown',
                                                        name: 'Pearl Stallion Brown',
                                                        displayName: 'Pearl Stallion Brown',
                                                        fields: {
                                                          colorName: {
                                                            value: 'Pearl Stallion Brown',
                                                          },
                                                          detKey: {
                                                            value: 'yr_347ppearl_stallion_brown',
                                                          },
                                                        },
                                                      },
                                                    },
                                                  },
                                                ],
                                              },
                                            ],
                                          },
                                          {
                                            detKey: {
                                              value: '11702-Default',
                                            },
                                            detIdentifier: {
                                              value: '11702',
                                            },
                                            sotId: {
                                              value: '',
                                            },
                                            name: 'Manual',
                                            transmissionName: {
                                              value: 'Manual',
                                            },
                                            modelCode: {
                                              value: 'CMX1100AN',
                                            },
                                            hidePriceAndFinance: {
                                              value: '',
                                            },
                                            defaultExteriorColor: {
                                              item: {
                                                id: '9434aecc-852f-4f1f-a29e-546728487f87',
                                                url: '/sitecore/Content/Web-Catalog/MC/ON-ROAD/Cruiser/2022/Rebel-1100/Rebel-1100/Transmissions/Manual/ExteriorColors/Gunmetal-Black-Metallic',
                                                name: 'Gunmetal Black Metallic',
                                                displayName: 'Gunmetal Black Metallic',
                                                fields: {
                                                  color: {
                                                    id: '3c0dfa75-e78c-490c-8365-3028c529f6fb',
                                                    url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Gunmetal-Black-Metallic',
                                                    name: 'Gunmetal Black Metallic',
                                                    displayName: 'Gunmetal Black Metallic',
                                                    fields: {
                                                      colorName: {
                                                        value: 'Gunmetal Black Metallic',
                                                      },
                                                      detKey: {
                                                        value: 'gbgunmetal_black_metallic',
                                                      },
                                                      hexValue: {
                                                        value: '#1f262a',
                                                      },
                                                    },
                                                  },
                                                },
                                              },
                                            },
                                            exteriorColors: [
                                              {
                                                colors: [
                                                  {
                                                    name: 'Gunmetal Black Metallic',
                                                    color: {
                                                      item: {
                                                        id: '3c0dfa75-e78c-490c-8365-3028c529f6fb',
                                                        url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Gunmetal-Black-Metallic',
                                                        name: 'Gunmetal Black Metallic',
                                                        displayName: 'Gunmetal Black Metallic',
                                                        fields: {
                                                          colorName: {
                                                            value: 'Gunmetal Black Metallic',
                                                          },
                                                          detKey: {
                                                            value: 'gbgunmetal_black_metallic',
                                                          },
                                                          hexValue: {
                                                            value: '#1f262a',
                                                          },
                                                        },
                                                      },
                                                    },
                                                  },
                                                  {
                                                    name: 'Pearl Stallion Brown',
                                                    color: {
                                                      item: {
                                                        id: '12f55898-25e8-4c97-b68b-dc039f1cdbd4',
                                                        url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Pearl-Stallion-Brown',
                                                        name: 'Pearl Stallion Brown',
                                                        displayName: 'Pearl Stallion Brown',
                                                        fields: {
                                                          colorName: {
                                                            value: 'Pearl Stallion Brown',
                                                          },
                                                          detKey: {
                                                            value: 'yr_347ppearl_stallion_brown',
                                                          },
                                                        },
                                                      },
                                                    },
                                                  },
                                                ],
                                              },
                                            ],
                                          },
                                        ],
                                      },
                                    ],
                                  },
                                ],
                                trimName: {
                                  value: 'Rebel 1100',
                                },
                                primaryThumbnail: {
                                  item: {
                                    value: {},
                                  },
                                },
                                secondaryThumbnail: {
                                  item: {
                                    value: {},
                                  },
                                },
                                specialVehicleType: {
                                  item: null,
                                },
                                nameBadge: {
                                  item: {
                                    value: {},
                                  },
                                },
                                defaultTransmission: {
                                  item: {},
                                },
                                bodyType: {
                                  item: [],
                                },
                                drivetrain: {
                                  item: [],
                                },
                                safety: {
                                  item: [],
                                },
                                interiorMaterial: {
                                  item: [],
                                },
                                designFeatures: {
                                  item: [],
                                },
                                wheels: {
                                  item: [],
                                },
                                entertainment: {
                                  item: [],
                                },
                                comfortConvenience: {
                                  item: [],
                                },
                                emissionRating: {
                                  value: '',
                                },
                                transmissions: [],
                              },
                              {
                                detKey: {
                                  value: 'rebel_300',
                                },
                                detIdentifier: {
                                  value: '300',
                                },
                                sotId: {
                                  value: '',
                                },
                                name: 'Rebel 300',
                                modelName: {
                                  value: 'Rebel 300',
                                },
                                trims: [
                                  {
                                    detKey: {
                                      value: 'rebel_300_13284',
                                    },
                                    detIdentifier: {
                                      value: '13284',
                                    },
                                    sotId: {
                                      value: '',
                                    },
                                    name: 'Rebel 300',
                                    trimName: {
                                      value: 'Rebel 300',
                                    },
                                    primaryThumbnail: {
                                      item: {
                                        value: {},
                                      },
                                    },
                                    defaultTransmission: {
                                      fields: {
                                        name: 'ABS',
                                        detKey: {
                                          value: '11708-Default',
                                        },
                                        detIdentifier: {
                                          value: '11708',
                                        },
                                        sotId: {
                                          value: '',
                                        },
                                        modelCode: {
                                          value: 'CMX300AN',
                                        },
                                        defaultExteriorColor: {
                                          fields: {
                                            name: 'Matte Axis Gray Metallic',
                                            color: {
                                              fields: {
                                                detKey: {
                                                  value: 'magmmatte_axis_gray_metallic',
                                                },
                                                detIdentifier: {
                                                  value: '',
                                                },
                                                sotId: {
                                                  value: '',
                                                },
                                              },
                                            },
                                          },
                                        },
                                      },
                                    },
                                    transmissions: [
                                      {
                                        items: [
                                          {
                                            detKey: {
                                              value: '11708-Default',
                                            },
                                            detIdentifier: {
                                              value: '11708',
                                            },
                                            sotId: {
                                              value: '',
                                            },
                                            name: 'ABS',
                                            transmissionName: {
                                              value: 'ABS',
                                            },
                                            modelCode: {
                                              value: 'CMX300AN',
                                            },
                                            hidePriceAndFinance: {
                                              value: '',
                                            },
                                            defaultExteriorColor: {
                                              item: {
                                                id: '81fb0e59-095a-4280-9a0f-e0b4052f26ab',
                                                url: '/sitecore/Content/Web-Catalog/MC/ON-ROAD/Cruiser/2022/Rebel-300/Rebel-300/Transmissions/ABS/ExteriorColors/Matte-Axis-Gray-Metallic',
                                                name: 'Matte Axis Gray Metallic',
                                                displayName: 'Matte Axis Gray Metallic',
                                                fields: {
                                                  color: {
                                                    id: '4df231ad-48ce-4872-a410-349cee04b572',
                                                    url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Matte-Axis-Gray-Metallic',
                                                    name: 'Matte Axis Gray Metallic',
                                                    displayName: 'Matte Axis Gray Metallic',
                                                    fields: {
                                                      colorName: {
                                                        value: 'Matte Axis Gray Metallic',
                                                      },
                                                      detKey: {
                                                        value: 'magmmatte_axis_gray_metallic',
                                                      },
                                                    },
                                                  },
                                                },
                                              },
                                            },
                                            exteriorColors: [
                                              {
                                                colors: [
                                                  {
                                                    name: 'Matte Axis Gray Metallic',
                                                    color: {
                                                      item: {
                                                        id: '4df231ad-48ce-4872-a410-349cee04b572',
                                                        url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Matte-Axis-Gray-Metallic',
                                                        name: 'Matte Axis Gray Metallic',
                                                        displayName: 'Matte Axis Gray Metallic',
                                                        fields: {
                                                          colorName: {
                                                            value: 'Matte Axis Gray Metallic',
                                                          },
                                                          detKey: {
                                                            value: 'magmmatte_axis_gray_metallic',
                                                          },
                                                        },
                                                      },
                                                    },
                                                  },
                                                ],
                                              },
                                            ],
                                          },
                                        ],
                                      },
                                    ],
                                  },
                                ],
                                trimName: {
                                  value: 'Rebel 300',
                                },
                                primaryThumbnail: {
                                  item: {
                                    value: {},
                                  },
                                },
                                secondaryThumbnail: {
                                  item: {
                                    value: {},
                                  },
                                },
                                specialVehicleType: {
                                  item: null,
                                },
                                nameBadge: {
                                  item: {
                                    value: {},
                                  },
                                },
                                defaultTransmission: {
                                  item: {},
                                },
                                bodyType: {
                                  item: [],
                                },
                                drivetrain: {
                                  item: [],
                                },
                                safety: {
                                  item: [],
                                },
                                interiorMaterial: {
                                  item: [],
                                },
                                designFeatures: {
                                  item: [],
                                },
                                wheels: {
                                  item: [],
                                },
                                entertainment: {
                                  item: [],
                                },
                                comfortConvenience: {
                                  item: [],
                                },
                                emissionRating: {
                                  value: '',
                                },
                                transmissions: [],
                              },
                              {
                                detKey: {
                                  value: 'rebel_500',
                                },
                                detIdentifier: {
                                  value: '500',
                                },
                                sotId: {
                                  value: '',
                                },
                                name: 'Rebel 500',
                                modelName: {
                                  value: 'Rebel 500',
                                },
                                trims: [
                                  {
                                    detKey: {
                                      value: 'rebel_500_13283',
                                    },
                                    detIdentifier: {
                                      value: '13283',
                                    },
                                    sotId: {
                                      value: '',
                                    },
                                    name: 'Rebel 500',
                                    trimName: {
                                      value: 'Rebel 500',
                                    },
                                    primaryThumbnail: {
                                      item: {
                                        value: {},
                                      },
                                    },
                                    defaultTransmission: {
                                      fields: {
                                        name: 'ABS',
                                        detKey: {
                                          value: '11709-Default',
                                        },
                                        detIdentifier: {
                                          value: '11709',
                                        },
                                        sotId: {
                                          value: '',
                                        },
                                        modelCode: {
                                          value: 'CMX500AN',
                                        },
                                        defaultExteriorColor: {
                                          fields: {
                                            name: 'Mat Axis Gray Metallic',
                                            color: {
                                              fields: {
                                                detKey: {
                                                  value: 'nh303______mat_axis_grey_metallic',
                                                },
                                                detIdentifier: {
                                                  value: '',
                                                },
                                                sotId: {
                                                  value: '',
                                                },
                                              },
                                            },
                                          },
                                        },
                                      },
                                    },
                                    transmissions: [
                                      {
                                        items: [
                                          {
                                            detKey: {
                                              value: '11709-Default',
                                            },
                                            detIdentifier: {
                                              value: '11709',
                                            },
                                            sotId: {
                                              value: '',
                                            },
                                            name: 'ABS',
                                            transmissionName: {
                                              value: 'ABS',
                                            },
                                            modelCode: {
                                              value: 'CMX500AN',
                                            },
                                            hidePriceAndFinance: {
                                              value: '',
                                            },
                                            defaultExteriorColor: {
                                              item: {
                                                id: '3a361f5e-f016-48b0-946f-ff6086785b78',
                                                url: '/sitecore/Content/Web-Catalog/MC/ON-ROAD/Cruiser/2022/Rebel-500/Rebel-500/Transmissions/ABS/ExteriorColors/Mat-Axis-Gray-Metallic',
                                                name: 'Mat Axis Gray Metallic',
                                                displayName: 'Mat Axis Gray Metallic',
                                                fields: {
                                                  color: {
                                                    id: '6afc534e-ed4f-4814-8652-a8d2cdbdbf6b',
                                                    url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Mat-Axis-Grey-Metallic',
                                                    name: 'Mat Axis Grey Metallic',
                                                    displayName: 'Mat Axis Grey Metallic',
                                                    fields: {
                                                      colorName: {
                                                        value: 'Mat Axis Grey Metallic',
                                                      },
                                                      detKey: {
                                                        value: 'nh303______mat_axis_grey_metallic',
                                                      },
                                                    },
                                                  },
                                                },
                                              },
                                            },
                                            exteriorColors: [
                                              {
                                                colors: [
                                                  {
                                                    name: 'Mat Axis Gray Metallic',
                                                    color: {
                                                      item: {
                                                        id: '6afc534e-ed4f-4814-8652-a8d2cdbdbf6b',
                                                        url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Mat-Axis-Grey-Metallic',
                                                        name: 'Mat Axis Grey Metallic',
                                                        displayName: 'Mat Axis Grey Metallic',
                                                        fields: {
                                                          colorName: {
                                                            value: 'Mat Axis Grey Metallic',
                                                          },
                                                          detKey: {
                                                            value: 'nh303______mat_axis_grey_metallic',
                                                          },
                                                        },
                                                      },
                                                    },
                                                  },
                                                  {
                                                    name: 'Pearl Organic Green',
                                                    color: {
                                                      item: {
                                                        id: '8e898a67-7e66-4ef8-80ba-6e76aaafb31b',
                                                        url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Pearl-Organic-Green',
                                                        name: 'Pearl Organic Green',
                                                        displayName: 'Pearl Organic Green',
                                                        fields: {
                                                          colorName: {
                                                            value: 'Pearl Organic Green',
                                                          },
                                                          detKey: {
                                                            value: 'pogpearl_organic_green',
                                                          },
                                                        },
                                                      },
                                                    },
                                                  },
                                                ],
                                              },
                                            ],
                                          },
                                        ],
                                      },
                                    ],
                                  },
                                ],
                                trimName: {
                                  value: 'Rebel 500',
                                },
                                primaryThumbnail: {
                                  item: {
                                    value: {},
                                  },
                                },
                                secondaryThumbnail: {
                                  item: {
                                    value: {},
                                  },
                                },
                                specialVehicleType: {
                                  item: null,
                                },
                                nameBadge: {
                                  item: {
                                    value: {},
                                  },
                                },
                                defaultTransmission: {
                                  item: {},
                                },
                                bodyType: {
                                  item: [],
                                },
                                drivetrain: {
                                  item: [],
                                },
                                safety: {
                                  item: [],
                                },
                                interiorMaterial: {
                                  item: [],
                                },
                                designFeatures: {
                                  item: [],
                                },
                                wheels: {
                                  item: [],
                                },
                                entertainment: {
                                  item: [],
                                },
                                comfortConvenience: {
                                  item: [],
                                },
                                emissionRating: {
                                  value: '',
                                },
                                transmissions: [],
                              },
                            ],
                            trims: [
                              {
                                detKey: {
                                  value: 'rebel_1100',
                                },
                                detIdentifier: {
                                  value: '13279',
                                },
                                sotId: {
                                  value: '',
                                },
                                name: 'Rebel 1100',
                                trimName: {
                                  value: 'Rebel 1100',
                                },
                                primaryThumbnail: {
                                  item: {
                                    value: {},
                                  },
                                },
                                defaultTransmission: {
                                  fields: {
                                    name: 'Manual',
                                    detKey: {
                                      value: '11702-Default',
                                    },
                                    detIdentifier: {
                                      value: '11702',
                                    },
                                    sotId: {
                                      value: '',
                                    },
                                    modelCode: {
                                      value: 'CMX1100AN',
                                    },
                                    defaultExteriorColor: {
                                      fields: {
                                        name: 'Gunmetal Black Metallic',
                                        color: {
                                          fields: {
                                            detKey: {
                                              value: 'gbgunmetal_black_metallic',
                                            },
                                            detIdentifier: {
                                              value: '',
                                            },
                                            sotId: {
                                              value: '',
                                            },
                                          },
                                        },
                                      },
                                    },
                                  },
                                },
                                transmissions: [
                                  {
                                    items: [
                                      {
                                        detKey: {
                                          value: '11703-Default',
                                        },
                                        detIdentifier: {
                                          value: '11703',
                                        },
                                        sotId: {
                                          value: '',
                                        },
                                        name: 'DCT',
                                        transmissionName: {
                                          value: 'DCT',
                                        },
                                        modelCode: {
                                          value: 'CMX1100AN',
                                        },
                                        hidePriceAndFinance: {
                                          value: '',
                                        },
                                        defaultExteriorColor: {
                                          item: {
                                            id: '5c73cd87-aef5-4a35-9606-643cc3342620',
                                            url: '/sitecore/Content/Web-Catalog/MC/ON-ROAD/Cruiser/2022/Rebel-1100/Rebel-1100/Transmissions/DCT/ExteriorColors/Gunmetal-Black-Metallic',
                                            name: 'Gunmetal Black Metallic',
                                            displayName: 'Gunmetal Black Metallic',
                                            fields: {
                                              color: {
                                                id: '3c0dfa75-e78c-490c-8365-3028c529f6fb',
                                                url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Gunmetal-Black-Metallic',
                                                name: 'Gunmetal Black Metallic',
                                                displayName: 'Gunmetal Black Metallic',
                                                fields: {
                                                  colorName: {
                                                    value: 'Gunmetal Black Metallic',
                                                  },
                                                  detKey: {
                                                    value: 'gbgunmetal_black_metallic',
                                                  },
                                                  hexValue: {
                                                    value: '#1f262a',
                                                  },
                                                },
                                              },
                                            },
                                          },
                                        },
                                        exteriorColors: [
                                          {
                                            colors: [
                                              {
                                                name: 'Gunmetal Black Metallic',
                                                color: {
                                                  item: {
                                                    id: '3c0dfa75-e78c-490c-8365-3028c529f6fb',
                                                    url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Gunmetal-Black-Metallic',
                                                    name: 'Gunmetal Black Metallic',
                                                    displayName: 'Gunmetal Black Metallic',
                                                    fields: {
                                                      colorName: {
                                                        value: 'Gunmetal Black Metallic',
                                                      },
                                                      detKey: {
                                                        value: 'gbgunmetal_black_metallic',
                                                      },
                                                      hexValue: {
                                                        value: '#1f262a',
                                                      },
                                                    },
                                                  },
                                                },
                                              },
                                              {
                                                name: 'Pearl Stallion Brown',
                                                color: {
                                                  item: {
                                                    id: '12f55898-25e8-4c97-b68b-dc039f1cdbd4',
                                                    url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Pearl-Stallion-Brown',
                                                    name: 'Pearl Stallion Brown',
                                                    displayName: 'Pearl Stallion Brown',
                                                    fields: {
                                                      colorName: {
                                                        value: 'Pearl Stallion Brown',
                                                      },
                                                      detKey: {
                                                        value: 'yr_347ppearl_stallion_brown',
                                                      },
                                                    },
                                                  },
                                                },
                                              },
                                            ],
                                          },
                                        ],
                                      },
                                      {
                                        detKey: {
                                          value: '11702-Default',
                                        },
                                        detIdentifier: {
                                          value: '11702',
                                        },
                                        sotId: {
                                          value: '',
                                        },
                                        name: 'Manual',
                                        transmissionName: {
                                          value: 'Manual',
                                        },
                                        modelCode: {
                                          value: 'CMX1100AN',
                                        },
                                        hidePriceAndFinance: {
                                          value: '',
                                        },
                                        defaultExteriorColor: {
                                          item: {
                                            id: '9434aecc-852f-4f1f-a29e-546728487f87',
                                            url: '/sitecore/Content/Web-Catalog/MC/ON-ROAD/Cruiser/2022/Rebel-1100/Rebel-1100/Transmissions/Manual/ExteriorColors/Gunmetal-Black-Metallic',
                                            name: 'Gunmetal Black Metallic',
                                            displayName: 'Gunmetal Black Metallic',
                                            fields: {
                                              color: {
                                                id: '3c0dfa75-e78c-490c-8365-3028c529f6fb',
                                                url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Gunmetal-Black-Metallic',
                                                name: 'Gunmetal Black Metallic',
                                                displayName: 'Gunmetal Black Metallic',
                                                fields: {
                                                  colorName: {
                                                    value: 'Gunmetal Black Metallic',
                                                  },
                                                  detKey: {
                                                    value: 'gbgunmetal_black_metallic',
                                                  },
                                                  hexValue: {
                                                    value: '#1f262a',
                                                  },
                                                },
                                              },
                                            },
                                          },
                                        },
                                        exteriorColors: [
                                          {
                                            colors: [
                                              {
                                                name: 'Gunmetal Black Metallic',
                                                color: {
                                                  item: {
                                                    id: '3c0dfa75-e78c-490c-8365-3028c529f6fb',
                                                    url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Gunmetal-Black-Metallic',
                                                    name: 'Gunmetal Black Metallic',
                                                    displayName: 'Gunmetal Black Metallic',
                                                    fields: {
                                                      colorName: {
                                                        value: 'Gunmetal Black Metallic',
                                                      },
                                                      detKey: {
                                                        value: 'gbgunmetal_black_metallic',
                                                      },
                                                      hexValue: {
                                                        value: '#1f262a',
                                                      },
                                                    },
                                                  },
                                                },
                                              },
                                              {
                                                name: 'Pearl Stallion Brown',
                                                color: {
                                                  item: {
                                                    id: '12f55898-25e8-4c97-b68b-dc039f1cdbd4',
                                                    url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Pearl-Stallion-Brown',
                                                    name: 'Pearl Stallion Brown',
                                                    displayName: 'Pearl Stallion Brown',
                                                    fields: {
                                                      colorName: {
                                                        value: 'Pearl Stallion Brown',
                                                      },
                                                      detKey: {
                                                        value: 'yr_347ppearl_stallion_brown',
                                                      },
                                                    },
                                                  },
                                                },
                                              },
                                            ],
                                          },
                                        ],
                                      },
                                    ],
                                  },
                                ],
                              },
                            ],
                            modelKey: {
                              value: 'Cruiser',
                            },
                          },
                        ],
                        modelName: {
                          value: 'Cruiser',
                        },
                        detKey: {
                          value: 'Cruiser',
                        },
                        detIdentifier: {
                          value: '',
                        },
                        sotId: {
                          value: '',
                        },
                        nameBadge: {
                          item: {
                            value: {},
                          },
                        },
                      },
                    },
                    model: {
                      fields: {
                        name: 'Cruiser',
                        categoryName: {
                          value: 'Cruiser',
                        },
                        vehicleType: {
                          name: 'ON-ROAD',
                          vehicleTypeName: {
                            value: 'On-Road',
                          },
                        },
                        defaultYear: {
                          fields: {
                            year: {
                              value: '',
                            },
                          },
                        },
                        modelYears: [
                          {
                            detKey: {
                              value: '',
                            },
                            detIdentifier: {
                              value: '',
                            },
                            sotId: {
                              value: '',
                            },
                            year: {
                              value: '2023',
                            },
                            tagline: {
                              value: 'Cruiser',
                            },
                            modelYearPage: {
                              fields: {
                                name: '2023',
                                url: '/en/Cruiser',
                                subPages: [
                                  {
                                    name: 'Accessories',
                                    url: '/en/Cruiser/Accessories',
                                  },
                                  {
                                    name: 'Specifications',
                                    url: '/en/Cruiser/Specifications',
                                  },
                                  {
                                    name: 'Trims',
                                    url: '/en/Cruiser/Trims',
                                  },
                                ],
                              },
                            },
                            models: [
                              {
                                detKey: {
                                  value: 'rebel_1100',
                                },
                                detIdentifier: {
                                  value: '1100',
                                },
                                sotId: {
                                  value: '',
                                },
                                name: 'Rebel 1100',
                                modelName: {
                                  value: 'Rebel 1100',
                                },
                                trims: [
                                  {
                                    detKey: {
                                      value: 'rebel_1100_13321',
                                    },
                                    detIdentifier: {
                                      value: '13321',
                                    },
                                    sotId: {
                                      value: '',
                                    },
                                    name: 'Rebel 1100',
                                    trimName: {
                                      value: 'Rebel 1100',
                                    },
                                    primaryThumbnail: {
                                      item: {
                                        value: {},
                                      },
                                    },
                                    defaultTransmission: {
                                      fields: {
                                        name: 'DCT',
                                        detKey: {
                                          value: '11752-Default',
                                        },
                                        detIdentifier: {
                                          value: '11752',
                                        },
                                        sotId: {
                                          value: '',
                                        },
                                        modelCode: {
                                          value: 'CMX1100DP',
                                        },
                                        defaultExteriorColor: {
                                          fields: {
                                            name: 'Gunmetal Black Metallic',
                                            color: {
                                              fields: {
                                                detKey: {
                                                  value: 'gbgunmetal_black_metallic',
                                                },
                                                detIdentifier: {
                                                  value: '',
                                                },
                                                sotId: {
                                                  value: '',
                                                },
                                              },
                                            },
                                          },
                                        },
                                      },
                                    },
                                    transmissions: [
                                      {
                                        items: [
                                          {
                                            detKey: {
                                              value: '11751-Default',
                                            },
                                            detIdentifier: {
                                              value: '11751',
                                            },
                                            sotId: {
                                              value: '',
                                            },
                                            name: 'ABS',
                                            transmissionName: {
                                              value: 'ABS',
                                            },
                                            modelCode: {
                                              value: 'CMX1100AP',
                                            },
                                            hidePriceAndFinance: {
                                              value: '',
                                            },
                                            defaultExteriorColor: {
                                              item: {
                                                id: 'a2c7a988-2e3b-470b-a9db-d14c8045d52c',
                                                url: '/sitecore/Content/Web-Catalog/MC/ON-ROAD/Cruiser/2023/Rebel-1100/Rebel-1100/Transmissions/ABS/ExteriorColors/Gunmetal-Black-Metallic',
                                                name: 'Gunmetal Black Metallic',
                                                displayName: 'Gunmetal Black Metallic',
                                                fields: {
                                                  studioAssets: {
                                                    id: '37b2644f-5338-49e8-859b-66972f3aaa3a',
                                                    url: '/sitecore/Media-Library/Brands/PSP/MC/Gunmetalblackmetallic-cruiser',
                                                    name: 'Gunmetalblackmetallic-cruiser',
                                                    displayName: 'Gunmetalblackmetallic-cruiser',
                                                    fields: {},
                                                  },
                                                  color: {
                                                    id: '3c0dfa75-e78c-490c-8365-3028c529f6fb',
                                                    url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Gunmetal-Black-Metallic',
                                                    name: 'Gunmetal Black Metallic',
                                                    displayName: 'Gunmetal Black Metallic',
                                                    fields: {
                                                      colorName: {
                                                        value: 'Gunmetal Black Metallic',
                                                      },
                                                      detKey: {
                                                        value: 'gbgunmetal_black_metallic',
                                                      },
                                                      hexValue: {
                                                        value: '#1f262a',
                                                      },
                                                    },
                                                  },
                                                },
                                              },
                                            },
                                            exteriorColors: [
                                              {
                                                colors: [
                                                  {
                                                    name: 'Gunmetal Black Metallic',
                                                    color: {
                                                      item: {
                                                        id: '3c0dfa75-e78c-490c-8365-3028c529f6fb',
                                                        url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Gunmetal-Black-Metallic',
                                                        name: 'Gunmetal Black Metallic',
                                                        displayName: 'Gunmetal Black Metallic',
                                                        fields: {
                                                          colorName: {
                                                            value: 'Gunmetal Black Metallic',
                                                          },
                                                          detKey: {
                                                            value: 'gbgunmetal_black_metallic',
                                                          },
                                                          hexValue: {
                                                            value: '#1f262a',
                                                          },
                                                        },
                                                      },
                                                    },
                                                  },
                                                  {
                                                    name: 'Iridium Grey Metallic',
                                                    color: {
                                                      item: {
                                                        id: 'dc3fe36d-ecef-4c73-a777-1848771a3780',
                                                        url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Iridium-Grey-Metallic',
                                                        name: 'Iridium Grey Metallic',
                                                        displayName: 'Iridium Grey Metallic',
                                                        fields: {
                                                          colorName: {
                                                            value: 'Iridium Grey Metallic',
                                                          },
                                                          detKey: {
                                                            value: 'igmiridium_grey_metallic',
                                                          },
                                                          hexValue: {
                                                            value: '#3D3C3A',
                                                          },
                                                        },
                                                      },
                                                    },
                                                  },
                                                ],
                                              },
                                            ],
                                          },
                                          {
                                            detKey: {
                                              value: '11752-Default',
                                            },
                                            detIdentifier: {
                                              value: '11752',
                                            },
                                            sotId: {
                                              value: '',
                                            },
                                            name: 'DCT',
                                            transmissionName: {
                                              value: 'DCT',
                                            },
                                            modelCode: {
                                              value: 'CMX1100DP',
                                            },
                                            hidePriceAndFinance: {
                                              value: '',
                                            },
                                            defaultExteriorColor: {
                                              item: {
                                                id: 'fef3a558-982d-49a3-8b94-06e6511fe089',
                                                url: '/sitecore/Content/Web-Catalog/MC/ON-ROAD/Cruiser/2023/Rebel-1100/Rebel-1100/Transmissions/DCT/ExteriorColors/Gunmetal-Black-Metallic',
                                                name: 'Gunmetal Black Metallic',
                                                displayName: 'Gunmetal Black Metallic',
                                                fields: {
                                                  studioAssets: {
                                                    id: '37b2644f-5338-49e8-859b-66972f3aaa3a',
                                                    url: '/sitecore/Media-Library/Brands/PSP/MC/Gunmetalblackmetallic-cruiser',
                                                    name: 'Gunmetalblackmetallic-cruiser',
                                                    displayName: 'Gunmetalblackmetallic-cruiser',
                                                    fields: {},
                                                  },
                                                  color: {
                                                    id: '3c0dfa75-e78c-490c-8365-3028c529f6fb',
                                                    url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Gunmetal-Black-Metallic',
                                                    name: 'Gunmetal Black Metallic',
                                                    displayName: 'Gunmetal Black Metallic',
                                                    fields: {
                                                      colorName: {
                                                        value: 'Gunmetal Black Metallic',
                                                      },
                                                      detKey: {
                                                        value: 'gbgunmetal_black_metallic',
                                                      },
                                                      hexValue: {
                                                        value: '#1f262a',
                                                      },
                                                    },
                                                  },
                                                },
                                              },
                                            },
                                            exteriorColors: [
                                              {
                                                colors: [
                                                  {
                                                    name: 'Gunmetal Black Metallic',
                                                    color: {
                                                      item: {
                                                        id: '3c0dfa75-e78c-490c-8365-3028c529f6fb',
                                                        url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Gunmetal-Black-Metallic',
                                                        name: 'Gunmetal Black Metallic',
                                                        displayName: 'Gunmetal Black Metallic',
                                                        fields: {
                                                          colorName: {
                                                            value: 'Gunmetal Black Metallic',
                                                          },
                                                          detKey: {
                                                            value: 'gbgunmetal_black_metallic',
                                                          },
                                                          hexValue: {
                                                            value: '#1f262a',
                                                          },
                                                        },
                                                      },
                                                    },
                                                  },
                                                  {
                                                    name: 'Iridium Grey Metallic',
                                                    color: {
                                                      item: {
                                                        id: 'dc3fe36d-ecef-4c73-a777-1848771a3780',
                                                        url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Iridium-Grey-Metallic',
                                                        name: 'Iridium Grey Metallic',
                                                        displayName: 'Iridium Grey Metallic',
                                                        fields: {
                                                          colorName: {
                                                            value: 'Iridium Grey Metallic',
                                                          },
                                                          detKey: {
                                                            value: 'igmiridium_grey_metallic',
                                                          },
                                                          hexValue: {
                                                            value: '#3D3C3A',
                                                          },
                                                        },
                                                      },
                                                    },
                                                  },
                                                ],
                                              },
                                            ],
                                          },
                                        ],
                                      },
                                    ],
                                  },
                                ],
                                trimName: {
                                  value: 'Rebel 1100',
                                },
                                primaryThumbnail: {
                                  item: {
                                    value: {},
                                  },
                                },
                                secondaryThumbnail: {
                                  item: {
                                    value: {},
                                  },
                                },
                                specialVehicleType: {
                                  item: null,
                                },
                                nameBadge: {
                                  item: {
                                    value: {},
                                  },
                                },
                                defaultTransmission: {
                                  item: {},
                                },
                                bodyType: {
                                  item: [],
                                },
                                drivetrain: {
                                  item: [],
                                },
                                safety: {
                                  item: [],
                                },
                                interiorMaterial: {
                                  item: [],
                                },
                                designFeatures: {
                                  item: [],
                                },
                                wheels: {
                                  item: [],
                                },
                                entertainment: {
                                  item: [],
                                },
                                comfortConvenience: {
                                  item: [],
                                },
                                emissionRating: {
                                  value: '',
                                },
                                transmissions: [],
                              },
                            ],
                            trims: [
                              {
                                detKey: {
                                  value: 'rebel_1100',
                                },
                                detIdentifier: {
                                  value: '13321',
                                },
                                sotId: {
                                  value: '',
                                },
                                name: 'Rebel 1100',
                                trimName: {
                                  value: 'Rebel 1100',
                                },
                                primaryThumbnail: {
                                  item: {
                                    value: {},
                                  },
                                },
                                defaultTransmission: {
                                  fields: {
                                    name: 'DCT',
                                    detKey: {
                                      value: '11752-Default',
                                    },
                                    detIdentifier: {
                                      value: '11752',
                                    },
                                    sotId: {
                                      value: '',
                                    },
                                    modelCode: {
                                      value: 'CMX1100DP',
                                    },
                                    defaultExteriorColor: {
                                      fields: {
                                        name: 'Gunmetal Black Metallic',
                                        color: {
                                          fields: {
                                            detKey: {
                                              value: 'gbgunmetal_black_metallic',
                                            },
                                            detIdentifier: {
                                              value: '',
                                            },
                                            sotId: {
                                              value: '',
                                            },
                                          },
                                        },
                                      },
                                    },
                                  },
                                },
                                transmissions: [
                                  {
                                    items: [
                                      {
                                        detKey: {
                                          value: '11751-Default',
                                        },
                                        detIdentifier: {
                                          value: '11751',
                                        },
                                        sotId: {
                                          value: '',
                                        },
                                        name: 'ABS',
                                        transmissionName: {
                                          value: 'ABS',
                                        },
                                        modelCode: {
                                          value: 'CMX1100AP',
                                        },
                                        hidePriceAndFinance: {
                                          value: '',
                                        },
                                        defaultExteriorColor: {
                                          item: {
                                            id: 'a2c7a988-2e3b-470b-a9db-d14c8045d52c',
                                            url: '/sitecore/Content/Web-Catalog/MC/ON-ROAD/Cruiser/2023/Rebel-1100/Rebel-1100/Transmissions/ABS/ExteriorColors/Gunmetal-Black-Metallic',
                                            name: 'Gunmetal Black Metallic',
                                            displayName: 'Gunmetal Black Metallic',
                                            fields: {
                                              studioAssets: {
                                                id: '37b2644f-5338-49e8-859b-66972f3aaa3a',
                                                url: '/sitecore/Media-Library/Brands/PSP/MC/Gunmetalblackmetallic-cruiser',
                                                name: 'Gunmetalblackmetallic-cruiser',
                                                displayName: 'Gunmetalblackmetallic-cruiser',
                                                fields: {},
                                              },
                                              color: {
                                                id: '3c0dfa75-e78c-490c-8365-3028c529f6fb',
                                                url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Gunmetal-Black-Metallic',
                                                name: 'Gunmetal Black Metallic',
                                                displayName: 'Gunmetal Black Metallic',
                                                fields: {
                                                  colorName: {
                                                    value: 'Gunmetal Black Metallic',
                                                  },
                                                  detKey: {
                                                    value: 'gbgunmetal_black_metallic',
                                                  },
                                                  hexValue: {
                                                    value: '#1f262a',
                                                  },
                                                },
                                              },
                                            },
                                          },
                                        },
                                        exteriorColors: [
                                          {
                                            colors: [
                                              {
                                                name: 'Gunmetal Black Metallic',
                                                color: {
                                                  item: {
                                                    id: '3c0dfa75-e78c-490c-8365-3028c529f6fb',
                                                    url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Gunmetal-Black-Metallic',
                                                    name: 'Gunmetal Black Metallic',
                                                    displayName: 'Gunmetal Black Metallic',
                                                    fields: {
                                                      colorName: {
                                                        value: 'Gunmetal Black Metallic',
                                                      },
                                                      detKey: {
                                                        value: 'gbgunmetal_black_metallic',
                                                      },
                                                      hexValue: {
                                                        value: '#1f262a',
                                                      },
                                                    },
                                                  },
                                                },
                                              },
                                              {
                                                name: 'Iridium Grey Metallic',
                                                color: {
                                                  item: {
                                                    id: 'dc3fe36d-ecef-4c73-a777-1848771a3780',
                                                    url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Iridium-Grey-Metallic',
                                                    name: 'Iridium Grey Metallic',
                                                    displayName: 'Iridium Grey Metallic',
                                                    fields: {
                                                      colorName: {
                                                        value: 'Iridium Grey Metallic',
                                                      },
                                                      detKey: {
                                                        value: 'igmiridium_grey_metallic',
                                                      },
                                                      hexValue: {
                                                        value: '#3D3C3A',
                                                      },
                                                    },
                                                  },
                                                },
                                              },
                                            ],
                                          },
                                        ],
                                      },
                                      {
                                        detKey: {
                                          value: '11752-Default',
                                        },
                                        detIdentifier: {
                                          value: '11752',
                                        },
                                        sotId: {
                                          value: '',
                                        },
                                        name: 'DCT',
                                        transmissionName: {
                                          value: 'DCT',
                                        },
                                        modelCode: {
                                          value: 'CMX1100DP',
                                        },
                                        hidePriceAndFinance: {
                                          value: '',
                                        },
                                        defaultExteriorColor: {
                                          item: {
                                            id: 'fef3a558-982d-49a3-8b94-06e6511fe089',
                                            url: '/sitecore/Content/Web-Catalog/MC/ON-ROAD/Cruiser/2023/Rebel-1100/Rebel-1100/Transmissions/DCT/ExteriorColors/Gunmetal-Black-Metallic',
                                            name: 'Gunmetal Black Metallic',
                                            displayName: 'Gunmetal Black Metallic',
                                            fields: {
                                              studioAssets: {
                                                id: '37b2644f-5338-49e8-859b-66972f3aaa3a',
                                                url: '/sitecore/Media-Library/Brands/PSP/MC/Gunmetalblackmetallic-cruiser',
                                                name: 'Gunmetalblackmetallic-cruiser',
                                                displayName: 'Gunmetalblackmetallic-cruiser',
                                                fields: {},
                                              },
                                              color: {
                                                id: '3c0dfa75-e78c-490c-8365-3028c529f6fb',
                                                url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Gunmetal-Black-Metallic',
                                                name: 'Gunmetal Black Metallic',
                                                displayName: 'Gunmetal Black Metallic',
                                                fields: {
                                                  colorName: {
                                                    value: 'Gunmetal Black Metallic',
                                                  },
                                                  detKey: {
                                                    value: 'gbgunmetal_black_metallic',
                                                  },
                                                  hexValue: {
                                                    value: '#1f262a',
                                                  },
                                                },
                                              },
                                            },
                                          },
                                        },
                                        exteriorColors: [
                                          {
                                            colors: [
                                              {
                                                name: 'Gunmetal Black Metallic',
                                                color: {
                                                  item: {
                                                    id: '3c0dfa75-e78c-490c-8365-3028c529f6fb',
                                                    url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Gunmetal-Black-Metallic',
                                                    name: 'Gunmetal Black Metallic',
                                                    displayName: 'Gunmetal Black Metallic',
                                                    fields: {
                                                      colorName: {
                                                        value: 'Gunmetal Black Metallic',
                                                      },
                                                      detKey: {
                                                        value: 'gbgunmetal_black_metallic',
                                                      },
                                                      hexValue: {
                                                        value: '#1f262a',
                                                      },
                                                    },
                                                  },
                                                },
                                              },
                                              {
                                                name: 'Iridium Grey Metallic',
                                                color: {
                                                  item: {
                                                    id: 'dc3fe36d-ecef-4c73-a777-1848771a3780',
                                                    url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Iridium-Grey-Metallic',
                                                    name: 'Iridium Grey Metallic',
                                                    displayName: 'Iridium Grey Metallic',
                                                    fields: {
                                                      colorName: {
                                                        value: 'Iridium Grey Metallic',
                                                      },
                                                      detKey: {
                                                        value: 'igmiridium_grey_metallic',
                                                      },
                                                      hexValue: {
                                                        value: '#3D3C3A',
                                                      },
                                                    },
                                                  },
                                                },
                                              },
                                            ],
                                          },
                                        ],
                                      },
                                    ],
                                  },
                                ],
                              },
                            ],
                            modelKey: {
                              value: 'Cruiser',
                            },
                          },
                          {
                            detKey: {
                              value: '',
                            },
                            detIdentifier: {
                              value: '',
                            },
                            sotId: {
                              value: '',
                            },
                            year: {
                              value: '2022',
                            },
                            tagline: {
                              value: 'Cruiser',
                            },
                            modelYearPage: {
                              fields: null,
                            },
                            models: [
                              {
                                detKey: {
                                  value: 'rebel_1100',
                                },
                                detIdentifier: {
                                  value: '1100',
                                },
                                sotId: {
                                  value: '',
                                },
                                name: 'Rebel 1100',
                                modelName: {
                                  value: 'Rebel 1100',
                                },
                                trims: [
                                  {
                                    detKey: {
                                      value: 'rebel_1100_13279',
                                    },
                                    detIdentifier: {
                                      value: '13279',
                                    },
                                    sotId: {
                                      value: '',
                                    },
                                    name: 'Rebel 1100',
                                    trimName: {
                                      value: 'Rebel 1100',
                                    },
                                    primaryThumbnail: {
                                      item: {
                                        value: {},
                                      },
                                    },
                                    defaultTransmission: {
                                      fields: {
                                        name: 'Manual',
                                        detKey: {
                                          value: '11702-Default',
                                        },
                                        detIdentifier: {
                                          value: '11702',
                                        },
                                        sotId: {
                                          value: '',
                                        },
                                        modelCode: {
                                          value: 'CMX1100AN',
                                        },
                                        defaultExteriorColor: {
                                          fields: {
                                            name: 'Gunmetal Black Metallic',
                                            color: {
                                              fields: {
                                                detKey: {
                                                  value: 'gbgunmetal_black_metallic',
                                                },
                                                detIdentifier: {
                                                  value: '',
                                                },
                                                sotId: {
                                                  value: '',
                                                },
                                              },
                                            },
                                          },
                                        },
                                      },
                                    },
                                    transmissions: [
                                      {
                                        items: [
                                          {
                                            detKey: {
                                              value: '11703-Default',
                                            },
                                            detIdentifier: {
                                              value: '11703',
                                            },
                                            sotId: {
                                              value: '',
                                            },
                                            name: 'DCT',
                                            transmissionName: {
                                              value: 'DCT',
                                            },
                                            modelCode: {
                                              value: 'CMX1100AN',
                                            },
                                            hidePriceAndFinance: {
                                              value: '',
                                            },
                                            defaultExteriorColor: {
                                              item: {
                                                id: '5c73cd87-aef5-4a35-9606-643cc3342620',
                                                url: '/sitecore/Content/Web-Catalog/MC/ON-ROAD/Cruiser/2022/Rebel-1100/Rebel-1100/Transmissions/DCT/ExteriorColors/Gunmetal-Black-Metallic',
                                                name: 'Gunmetal Black Metallic',
                                                displayName: 'Gunmetal Black Metallic',
                                                fields: {
                                                  color: {
                                                    id: '3c0dfa75-e78c-490c-8365-3028c529f6fb',
                                                    url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Gunmetal-Black-Metallic',
                                                    name: 'Gunmetal Black Metallic',
                                                    displayName: 'Gunmetal Black Metallic',
                                                    fields: {
                                                      colorName: {
                                                        value: 'Gunmetal Black Metallic',
                                                      },
                                                      detKey: {
                                                        value: 'gbgunmetal_black_metallic',
                                                      },
                                                      hexValue: {
                                                        value: '#1f262a',
                                                      },
                                                    },
                                                  },
                                                },
                                              },
                                            },
                                            exteriorColors: [
                                              {
                                                colors: [
                                                  {
                                                    name: 'Gunmetal Black Metallic',
                                                    color: {
                                                      item: {
                                                        id: '3c0dfa75-e78c-490c-8365-3028c529f6fb',
                                                        url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Gunmetal-Black-Metallic',
                                                        name: 'Gunmetal Black Metallic',
                                                        displayName: 'Gunmetal Black Metallic',
                                                        fields: {
                                                          colorName: {
                                                            value: 'Gunmetal Black Metallic',
                                                          },
                                                          detKey: {
                                                            value: 'gbgunmetal_black_metallic',
                                                          },
                                                          hexValue: {
                                                            value: '#1f262a',
                                                          },
                                                        },
                                                      },
                                                    },
                                                  },
                                                  {
                                                    name: 'Pearl Stallion Brown',
                                                    color: {
                                                      item: {
                                                        id: '12f55898-25e8-4c97-b68b-dc039f1cdbd4',
                                                        url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Pearl-Stallion-Brown',
                                                        name: 'Pearl Stallion Brown',
                                                        displayName: 'Pearl Stallion Brown',
                                                        fields: {
                                                          colorName: {
                                                            value: 'Pearl Stallion Brown',
                                                          },
                                                          detKey: {
                                                            value: 'yr_347ppearl_stallion_brown',
                                                          },
                                                        },
                                                      },
                                                    },
                                                  },
                                                ],
                                              },
                                            ],
                                          },
                                          {
                                            detKey: {
                                              value: '11702-Default',
                                            },
                                            detIdentifier: {
                                              value: '11702',
                                            },
                                            sotId: {
                                              value: '',
                                            },
                                            name: 'Manual',
                                            transmissionName: {
                                              value: 'Manual',
                                            },
                                            modelCode: {
                                              value: 'CMX1100AN',
                                            },
                                            hidePriceAndFinance: {
                                              value: '',
                                            },
                                            defaultExteriorColor: {
                                              item: {
                                                id: '9434aecc-852f-4f1f-a29e-546728487f87',
                                                url: '/sitecore/Content/Web-Catalog/MC/ON-ROAD/Cruiser/2022/Rebel-1100/Rebel-1100/Transmissions/Manual/ExteriorColors/Gunmetal-Black-Metallic',
                                                name: 'Gunmetal Black Metallic',
                                                displayName: 'Gunmetal Black Metallic',
                                                fields: {
                                                  color: {
                                                    id: '3c0dfa75-e78c-490c-8365-3028c529f6fb',
                                                    url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Gunmetal-Black-Metallic',
                                                    name: 'Gunmetal Black Metallic',
                                                    displayName: 'Gunmetal Black Metallic',
                                                    fields: {
                                                      colorName: {
                                                        value: 'Gunmetal Black Metallic',
                                                      },
                                                      detKey: {
                                                        value: 'gbgunmetal_black_metallic',
                                                      },
                                                      hexValue: {
                                                        value: '#1f262a',
                                                      },
                                                    },
                                                  },
                                                },
                                              },
                                            },
                                            exteriorColors: [
                                              {
                                                colors: [
                                                  {
                                                    name: 'Gunmetal Black Metallic',
                                                    color: {
                                                      item: {
                                                        id: '3c0dfa75-e78c-490c-8365-3028c529f6fb',
                                                        url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Gunmetal-Black-Metallic',
                                                        name: 'Gunmetal Black Metallic',
                                                        displayName: 'Gunmetal Black Metallic',
                                                        fields: {
                                                          colorName: {
                                                            value: 'Gunmetal Black Metallic',
                                                          },
                                                          detKey: {
                                                            value: 'gbgunmetal_black_metallic',
                                                          },
                                                          hexValue: {
                                                            value: '#1f262a',
                                                          },
                                                        },
                                                      },
                                                    },
                                                  },
                                                  {
                                                    name: 'Pearl Stallion Brown',
                                                    color: {
                                                      item: {
                                                        id: '12f55898-25e8-4c97-b68b-dc039f1cdbd4',
                                                        url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Pearl-Stallion-Brown',
                                                        name: 'Pearl Stallion Brown',
                                                        displayName: 'Pearl Stallion Brown',
                                                        fields: {
                                                          colorName: {
                                                            value: 'Pearl Stallion Brown',
                                                          },
                                                          detKey: {
                                                            value: 'yr_347ppearl_stallion_brown',
                                                          },
                                                        },
                                                      },
                                                    },
                                                  },
                                                ],
                                              },
                                            ],
                                          },
                                        ],
                                      },
                                    ],
                                  },
                                ],
                                trimName: {
                                  value: 'Rebel 1100',
                                },
                                primaryThumbnail: {
                                  item: {
                                    value: {},
                                  },
                                },
                                secondaryThumbnail: {
                                  item: {
                                    value: {},
                                  },
                                },
                                specialVehicleType: {
                                  item: null,
                                },
                                nameBadge: {
                                  item: {
                                    value: {},
                                  },
                                },
                                defaultTransmission: {
                                  item: {},
                                },
                                bodyType: {
                                  item: [],
                                },
                                drivetrain: {
                                  item: [],
                                },
                                safety: {
                                  item: [],
                                },
                                interiorMaterial: {
                                  item: [],
                                },
                                designFeatures: {
                                  item: [],
                                },
                                wheels: {
                                  item: [],
                                },
                                entertainment: {
                                  item: [],
                                },
                                comfortConvenience: {
                                  item: [],
                                },
                                emissionRating: {
                                  value: '',
                                },
                                transmissions: [],
                              },
                              {
                                detKey: {
                                  value: 'rebel_300',
                                },
                                detIdentifier: {
                                  value: '300',
                                },
                                sotId: {
                                  value: '',
                                },
                                name: 'Rebel 300',
                                modelName: {
                                  value: 'Rebel 300',
                                },
                                trims: [
                                  {
                                    detKey: {
                                      value: 'rebel_300_13284',
                                    },
                                    detIdentifier: {
                                      value: '13284',
                                    },
                                    sotId: {
                                      value: '',
                                    },
                                    name: 'Rebel 300',
                                    trimName: {
                                      value: 'Rebel 300',
                                    },
                                    primaryThumbnail: {
                                      item: {
                                        value: {},
                                      },
                                    },
                                    defaultTransmission: {
                                      fields: {
                                        name: 'ABS',
                                        detKey: {
                                          value: '11708-Default',
                                        },
                                        detIdentifier: {
                                          value: '11708',
                                        },
                                        sotId: {
                                          value: '',
                                        },
                                        modelCode: {
                                          value: 'CMX300AN',
                                        },
                                        defaultExteriorColor: {
                                          fields: {
                                            name: 'Matte Axis Gray Metallic',
                                            color: {
                                              fields: {
                                                detKey: {
                                                  value: 'magmmatte_axis_gray_metallic',
                                                },
                                                detIdentifier: {
                                                  value: '',
                                                },
                                                sotId: {
                                                  value: '',
                                                },
                                              },
                                            },
                                          },
                                        },
                                      },
                                    },
                                    transmissions: [
                                      {
                                        items: [
                                          {
                                            detKey: {
                                              value: '11708-Default',
                                            },
                                            detIdentifier: {
                                              value: '11708',
                                            },
                                            sotId: {
                                              value: '',
                                            },
                                            name: 'ABS',
                                            transmissionName: {
                                              value: 'ABS',
                                            },
                                            modelCode: {
                                              value: 'CMX300AN',
                                            },
                                            hidePriceAndFinance: {
                                              value: '',
                                            },
                                            defaultExteriorColor: {
                                              item: {
                                                id: '81fb0e59-095a-4280-9a0f-e0b4052f26ab',
                                                url: '/sitecore/Content/Web-Catalog/MC/ON-ROAD/Cruiser/2022/Rebel-300/Rebel-300/Transmissions/ABS/ExteriorColors/Matte-Axis-Gray-Metallic',
                                                name: 'Matte Axis Gray Metallic',
                                                displayName: 'Matte Axis Gray Metallic',
                                                fields: {
                                                  color: {
                                                    id: '4df231ad-48ce-4872-a410-349cee04b572',
                                                    url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Matte-Axis-Gray-Metallic',
                                                    name: 'Matte Axis Gray Metallic',
                                                    displayName: 'Matte Axis Gray Metallic',
                                                    fields: {
                                                      colorName: {
                                                        value: 'Matte Axis Gray Metallic',
                                                      },
                                                      detKey: {
                                                        value: 'magmmatte_axis_gray_metallic',
                                                      },
                                                    },
                                                  },
                                                },
                                              },
                                            },
                                            exteriorColors: [
                                              {
                                                colors: [
                                                  {
                                                    name: 'Matte Axis Gray Metallic',
                                                    color: {
                                                      item: {
                                                        id: '4df231ad-48ce-4872-a410-349cee04b572',
                                                        url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Matte-Axis-Gray-Metallic',
                                                        name: 'Matte Axis Gray Metallic',
                                                        displayName: 'Matte Axis Gray Metallic',
                                                        fields: {
                                                          colorName: {
                                                            value: 'Matte Axis Gray Metallic',
                                                          },
                                                          detKey: {
                                                            value: 'magmmatte_axis_gray_metallic',
                                                          },
                                                        },
                                                      },
                                                    },
                                                  },
                                                ],
                                              },
                                            ],
                                          },
                                        ],
                                      },
                                    ],
                                  },
                                ],
                                trimName: {
                                  value: 'Rebel 300',
                                },
                                primaryThumbnail: {
                                  item: {
                                    value: {},
                                  },
                                },
                                secondaryThumbnail: {
                                  item: {
                                    value: {},
                                  },
                                },
                                specialVehicleType: {
                                  item: null,
                                },
                                nameBadge: {
                                  item: {
                                    value: {},
                                  },
                                },
                                defaultTransmission: {
                                  item: {},
                                },
                                bodyType: {
                                  item: [],
                                },
                                drivetrain: {
                                  item: [],
                                },
                                safety: {
                                  item: [],
                                },
                                interiorMaterial: {
                                  item: [],
                                },
                                designFeatures: {
                                  item: [],
                                },
                                wheels: {
                                  item: [],
                                },
                                entertainment: {
                                  item: [],
                                },
                                comfortConvenience: {
                                  item: [],
                                },
                                emissionRating: {
                                  value: '',
                                },
                                transmissions: [],
                              },
                              {
                                detKey: {
                                  value: 'rebel_500',
                                },
                                detIdentifier: {
                                  value: '500',
                                },
                                sotId: {
                                  value: '',
                                },
                                name: 'Rebel 500',
                                modelName: {
                                  value: 'Rebel 500',
                                },
                                trims: [
                                  {
                                    detKey: {
                                      value: 'rebel_500_13283',
                                    },
                                    detIdentifier: {
                                      value: '13283',
                                    },
                                    sotId: {
                                      value: '',
                                    },
                                    name: 'Rebel 500',
                                    trimName: {
                                      value: 'Rebel 500',
                                    },
                                    primaryThumbnail: {
                                      item: {
                                        value: {},
                                      },
                                    },
                                    defaultTransmission: {
                                      fields: {
                                        name: 'ABS',
                                        detKey: {
                                          value: '11709-Default',
                                        },
                                        detIdentifier: {
                                          value: '11709',
                                        },
                                        sotId: {
                                          value: '',
                                        },
                                        modelCode: {
                                          value: 'CMX500AN',
                                        },
                                        defaultExteriorColor: {
                                          fields: {
                                            name: 'Mat Axis Gray Metallic',
                                            color: {
                                              fields: {
                                                detKey: {
                                                  value: 'nh303______mat_axis_grey_metallic',
                                                },
                                                detIdentifier: {
                                                  value: '',
                                                },
                                                sotId: {
                                                  value: '',
                                                },
                                              },
                                            },
                                          },
                                        },
                                      },
                                    },
                                    transmissions: [
                                      {
                                        items: [
                                          {
                                            detKey: {
                                              value: '11709-Default',
                                            },
                                            detIdentifier: {
                                              value: '11709',
                                            },
                                            sotId: {
                                              value: '',
                                            },
                                            name: 'ABS',
                                            transmissionName: {
                                              value: 'ABS',
                                            },
                                            modelCode: {
                                              value: 'CMX500AN',
                                            },
                                            hidePriceAndFinance: {
                                              value: '',
                                            },
                                            defaultExteriorColor: {
                                              item: {
                                                id: '3a361f5e-f016-48b0-946f-ff6086785b78',
                                                url: '/sitecore/Content/Web-Catalog/MC/ON-ROAD/Cruiser/2022/Rebel-500/Rebel-500/Transmissions/ABS/ExteriorColors/Mat-Axis-Gray-Metallic',
                                                name: 'Mat Axis Gray Metallic',
                                                displayName: 'Mat Axis Gray Metallic',
                                                fields: {
                                                  color: {
                                                    id: '6afc534e-ed4f-4814-8652-a8d2cdbdbf6b',
                                                    url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Mat-Axis-Grey-Metallic',
                                                    name: 'Mat Axis Grey Metallic',
                                                    displayName: 'Mat Axis Grey Metallic',
                                                    fields: {
                                                      colorName: {
                                                        value: 'Mat Axis Grey Metallic',
                                                      },
                                                      detKey: {
                                                        value: 'nh303______mat_axis_grey_metallic',
                                                      },
                                                    },
                                                  },
                                                },
                                              },
                                            },
                                            exteriorColors: [
                                              {
                                                colors: [
                                                  {
                                                    name: 'Mat Axis Gray Metallic',
                                                    color: {
                                                      item: {
                                                        id: '6afc534e-ed4f-4814-8652-a8d2cdbdbf6b',
                                                        url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Mat-Axis-Grey-Metallic',
                                                        name: 'Mat Axis Grey Metallic',
                                                        displayName: 'Mat Axis Grey Metallic',
                                                        fields: {
                                                          colorName: {
                                                            value: 'Mat Axis Grey Metallic',
                                                          },
                                                          detKey: {
                                                            value: 'nh303______mat_axis_grey_metallic',
                                                          },
                                                        },
                                                      },
                                                    },
                                                  },
                                                  {
                                                    name: 'Pearl Organic Green',
                                                    color: {
                                                      item: {
                                                        id: '8e898a67-7e66-4ef8-80ba-6e76aaafb31b',
                                                        url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Pearl-Organic-Green',
                                                        name: 'Pearl Organic Green',
                                                        displayName: 'Pearl Organic Green',
                                                        fields: {
                                                          colorName: {
                                                            value: 'Pearl Organic Green',
                                                          },
                                                          detKey: {
                                                            value: 'pogpearl_organic_green',
                                                          },
                                                        },
                                                      },
                                                    },
                                                  },
                                                ],
                                              },
                                            ],
                                          },
                                        ],
                                      },
                                    ],
                                  },
                                ],
                                trimName: {
                                  value: 'Rebel 500',
                                },
                                primaryThumbnail: {
                                  item: {
                                    value: {},
                                  },
                                },
                                secondaryThumbnail: {
                                  item: {
                                    value: {},
                                  },
                                },
                                specialVehicleType: {
                                  item: null,
                                },
                                nameBadge: {
                                  item: {
                                    value: {},
                                  },
                                },
                                defaultTransmission: {
                                  item: {},
                                },
                                bodyType: {
                                  item: [],
                                },
                                drivetrain: {
                                  item: [],
                                },
                                safety: {
                                  item: [],
                                },
                                interiorMaterial: {
                                  item: [],
                                },
                                designFeatures: {
                                  item: [],
                                },
                                wheels: {
                                  item: [],
                                },
                                entertainment: {
                                  item: [],
                                },
                                comfortConvenience: {
                                  item: [],
                                },
                                emissionRating: {
                                  value: '',
                                },
                                transmissions: [],
                              },
                            ],
                            trims: [
                              {
                                detKey: {
                                  value: 'rebel_1100',
                                },
                                detIdentifier: {
                                  value: '13279',
                                },
                                sotId: {
                                  value: '',
                                },
                                name: 'Rebel 1100',
                                trimName: {
                                  value: 'Rebel 1100',
                                },
                                primaryThumbnail: {
                                  item: {
                                    value: {},
                                  },
                                },
                                defaultTransmission: {
                                  fields: {
                                    name: 'Manual',
                                    detKey: {
                                      value: '11702-Default',
                                    },
                                    detIdentifier: {
                                      value: '11702',
                                    },
                                    sotId: {
                                      value: '',
                                    },
                                    modelCode: {
                                      value: 'CMX1100AN',
                                    },
                                    defaultExteriorColor: {
                                      fields: {
                                        name: 'Gunmetal Black Metallic',
                                        color: {
                                          fields: {
                                            detKey: {
                                              value: 'gbgunmetal_black_metallic',
                                            },
                                            detIdentifier: {
                                              value: '',
                                            },
                                            sotId: {
                                              value: '',
                                            },
                                          },
                                        },
                                      },
                                    },
                                  },
                                },
                                transmissions: [
                                  {
                                    items: [
                                      {
                                        detKey: {
                                          value: '11703-Default',
                                        },
                                        detIdentifier: {
                                          value: '11703',
                                        },
                                        sotId: {
                                          value: '',
                                        },
                                        name: 'DCT',
                                        transmissionName: {
                                          value: 'DCT',
                                        },
                                        modelCode: {
                                          value: 'CMX1100AN',
                                        },
                                        hidePriceAndFinance: {
                                          value: '',
                                        },
                                        defaultExteriorColor: {
                                          item: {
                                            id: '5c73cd87-aef5-4a35-9606-643cc3342620',
                                            url: '/sitecore/Content/Web-Catalog/MC/ON-ROAD/Cruiser/2022/Rebel-1100/Rebel-1100/Transmissions/DCT/ExteriorColors/Gunmetal-Black-Metallic',
                                            name: 'Gunmetal Black Metallic',
                                            displayName: 'Gunmetal Black Metallic',
                                            fields: {
                                              color: {
                                                id: '3c0dfa75-e78c-490c-8365-3028c529f6fb',
                                                url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Gunmetal-Black-Metallic',
                                                name: 'Gunmetal Black Metallic',
                                                displayName: 'Gunmetal Black Metallic',
                                                fields: {
                                                  colorName: {
                                                    value: 'Gunmetal Black Metallic',
                                                  },
                                                  detKey: {
                                                    value: 'gbgunmetal_black_metallic',
                                                  },
                                                  hexValue: {
                                                    value: '#1f262a',
                                                  },
                                                },
                                              },
                                            },
                                          },
                                        },
                                        exteriorColors: [
                                          {
                                            colors: [
                                              {
                                                name: 'Gunmetal Black Metallic',
                                                color: {
                                                  item: {
                                                    id: '3c0dfa75-e78c-490c-8365-3028c529f6fb',
                                                    url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Gunmetal-Black-Metallic',
                                                    name: 'Gunmetal Black Metallic',
                                                    displayName: 'Gunmetal Black Metallic',
                                                    fields: {
                                                      colorName: {
                                                        value: 'Gunmetal Black Metallic',
                                                      },
                                                      detKey: {
                                                        value: 'gbgunmetal_black_metallic',
                                                      },
                                                      hexValue: {
                                                        value: '#1f262a',
                                                      },
                                                    },
                                                  },
                                                },
                                              },
                                              {
                                                name: 'Pearl Stallion Brown',
                                                color: {
                                                  item: {
                                                    id: '12f55898-25e8-4c97-b68b-dc039f1cdbd4',
                                                    url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Pearl-Stallion-Brown',
                                                    name: 'Pearl Stallion Brown',
                                                    displayName: 'Pearl Stallion Brown',
                                                    fields: {
                                                      colorName: {
                                                        value: 'Pearl Stallion Brown',
                                                      },
                                                      detKey: {
                                                        value: 'yr_347ppearl_stallion_brown',
                                                      },
                                                    },
                                                  },
                                                },
                                              },
                                            ],
                                          },
                                        ],
                                      },
                                      {
                                        detKey: {
                                          value: '11702-Default',
                                        },
                                        detIdentifier: {
                                          value: '11702',
                                        },
                                        sotId: {
                                          value: '',
                                        },
                                        name: 'Manual',
                                        transmissionName: {
                                          value: 'Manual',
                                        },
                                        modelCode: {
                                          value: 'CMX1100AN',
                                        },
                                        hidePriceAndFinance: {
                                          value: '',
                                        },
                                        defaultExteriorColor: {
                                          item: {
                                            id: '9434aecc-852f-4f1f-a29e-546728487f87',
                                            url: '/sitecore/Content/Web-Catalog/MC/ON-ROAD/Cruiser/2022/Rebel-1100/Rebel-1100/Transmissions/Manual/ExteriorColors/Gunmetal-Black-Metallic',
                                            name: 'Gunmetal Black Metallic',
                                            displayName: 'Gunmetal Black Metallic',
                                            fields: {
                                              color: {
                                                id: '3c0dfa75-e78c-490c-8365-3028c529f6fb',
                                                url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Gunmetal-Black-Metallic',
                                                name: 'Gunmetal Black Metallic',
                                                displayName: 'Gunmetal Black Metallic',
                                                fields: {
                                                  colorName: {
                                                    value: 'Gunmetal Black Metallic',
                                                  },
                                                  detKey: {
                                                    value: 'gbgunmetal_black_metallic',
                                                  },
                                                  hexValue: {
                                                    value: '#1f262a',
                                                  },
                                                },
                                              },
                                            },
                                          },
                                        },
                                        exteriorColors: [
                                          {
                                            colors: [
                                              {
                                                name: 'Gunmetal Black Metallic',
                                                color: {
                                                  item: {
                                                    id: '3c0dfa75-e78c-490c-8365-3028c529f6fb',
                                                    url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Gunmetal-Black-Metallic',
                                                    name: 'Gunmetal Black Metallic',
                                                    displayName: 'Gunmetal Black Metallic',
                                                    fields: {
                                                      colorName: {
                                                        value: 'Gunmetal Black Metallic',
                                                      },
                                                      detKey: {
                                                        value: 'gbgunmetal_black_metallic',
                                                      },
                                                      hexValue: {
                                                        value: '#1f262a',
                                                      },
                                                    },
                                                  },
                                                },
                                              },
                                              {
                                                name: 'Pearl Stallion Brown',
                                                color: {
                                                  item: {
                                                    id: '12f55898-25e8-4c97-b68b-dc039f1cdbd4',
                                                    url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Pearl-Stallion-Brown',
                                                    name: 'Pearl Stallion Brown',
                                                    displayName: 'Pearl Stallion Brown',
                                                    fields: {
                                                      colorName: {
                                                        value: 'Pearl Stallion Brown',
                                                      },
                                                      detKey: {
                                                        value: 'yr_347ppearl_stallion_brown',
                                                      },
                                                    },
                                                  },
                                                },
                                              },
                                            ],
                                          },
                                        ],
                                      },
                                    ],
                                  },
                                ],
                              },
                            ],
                            modelKey: {
                              value: 'Cruiser',
                            },
                          },
                        ],
                        modelName: {
                          value: 'Cruiser',
                        },
                        detKey: {
                          value: 'Cruiser',
                        },
                        detIdentifier: {
                          value: '',
                        },
                        sotId: {
                          value: '',
                        },
                        nameBadge: {
                          item: {
                            value: {},
                          },
                        },
                      },
                    },
                    useDefaultModelYear: {
                      value: '',
                    },
                    paymentMethod: {
                      value: '',
                    },
                    paymentFrequency: {
                      value: '',
                    },
                    showInformationalApr: {
                      value: '',
                    },
                  },
                },
              },
              leftColumnHeight: 228,
            },
            {
              uid: '8ac32a7c-a20e-4b53-8982-f0a247a1cb89',
              componentName: 'ModelCardWithTrims',
              dataSource: '{962E8F79-6799-4544-9602-8EEAB36796C9}',
              params: {},
              fields: {
                data: {
                  value: {
                    anchorId: {
                      value: 'anchor-id',
                    },
                    gtmTitle: {
                      value: 'GTM Title',
                    },
                    gtmCategory: {
                      fields: {
                        value: {
                          value: 'model interactions',
                        },
                      },
                    },
                    gtmModelName: {
                      value: 'GTM Model Name',
                    },
                    gtmTrimName: {
                      value: 'GTM Trim Name',
                    },
                    gtmBodyStyle: {
                      value: 'GTM Body Style',
                    },
                    gtmInteractionType: {
                      value: 'GTM Interaction Type',
                    },
                    ctaLink: {
                      item: {
                        value: {
                          href: '',
                          text: 'Explore Touring',
                          anchor: '',
                          linktype: 'internal',
                          class: '',
                          title: '',
                          querystring: '',
                          id: '{48E7D649-1987-4FF0-A0B4-AD785D6518D5}',
                        },
                      },
                    },
                    ctaType: {
                      value: 'Secondary',
                    },
                    heroImage: {
                      item: {
                        value: {
                          src: ['url()', 'url()'],
                        },
                      },
                    },
                    category: {
                      fields: {
                        name: 'Touring',
                        categoryName: {
                          value: 'Touring',
                        },
                        vehicleType: {
                          name: 'ON-ROAD',
                          vehicleTypeName: {
                            value: 'On-Road',
                          },
                        },
                        defaultYear: {
                          fields: {
                            year: {
                              value: '',
                            },
                          },
                        },
                        modelYears: [
                          {
                            detKey: {
                              value: '',
                            },
                            detIdentifier: {
                              value: '',
                            },
                            sotId: {
                              value: '',
                            },
                            year: {
                              value: '2023',
                            },
                            tagline: {
                              value: 'Touring',
                            },
                            modelYearPage: {
                              fields: {
                                name: '2023',
                                url: '/en/Touring',
                                subPages: [
                                  {
                                    name: 'Accessories',
                                    url: '/en/Touring/Accessories',
                                  },
                                  {
                                    name: 'Specifications',
                                    url: '/en/Touring/Specifications',
                                  },
                                  {
                                    name: 'Trims',
                                    url: '/en/Touring/Trims',
                                  },
                                ],
                              },
                            },
                            models: [
                              {
                                detKey: {
                                  value: 'gl1800al',
                                },
                                detIdentifier: {
                                  value: '',
                                },
                                sotId: {
                                  value: '',
                                },
                                name: 'Gold Wing',
                                modelName: {
                                  value: 'Gold Wing',
                                },
                                trims: [
                                  {
                                    detKey: {
                                      value: 'gold_wing_dct_13313',
                                    },
                                    detIdentifier: {
                                      value: '13313',
                                    },
                                    sotId: {
                                      value: '',
                                    },
                                    name: 'Gold Wing DCT',
                                    trimName: {
                                      value: 'Gold Wing DCT',
                                    },
                                    primaryThumbnail: {
                                      item: {
                                        value: {
                                          src: 'https://psp-sit-01-dmm.psp.honda.ca/-/media/Brands/PSP/MC/H24_MC_Ruckus_Black_RGB_Model-Card_274x177.jpg?h=177&iar=0&w=274&rev=13da303bf3e349dca66e58f97d47b927&hash=A1937B6189A867767778AEFE172CC2F6',
                                          alt: '',
                                          width: '274',
                                          height: '177',
                                        },
                                      },
                                    },
                                    defaultTransmission: {
                                      fields: {
                                        name: 'ABS',
                                        detKey: {
                                          value: '11742-Default',
                                        },
                                        detIdentifier: {
                                          value: '11742',
                                        },
                                        sotId: {
                                          value: '',
                                        },
                                        modelCode: {
                                          value: 'GL1800BDP',
                                        },
                                        defaultExteriorColor: {
                                          fields: {
                                            name: 'Mat iridium grey metallic',
                                            color: {
                                              fields: {
                                                detKey: {
                                                  value: 'gr23mat_iridium_grey_met__mat_morion_black__2_tone_',
                                                },
                                                detIdentifier: {
                                                  value: '',
                                                },
                                                sotId: {
                                                  value: '',
                                                },
                                              },
                                            },
                                          },
                                        },
                                      },
                                    },
                                    transmissions: [
                                      {
                                        items: [
                                          {
                                            detKey: {
                                              value: '11742-Default',
                                            },
                                            detIdentifier: {
                                              value: '11742',
                                            },
                                            sotId: {
                                              value: '',
                                            },
                                            name: 'ABS',
                                            transmissionName: {
                                              value: 'ABS',
                                            },
                                            modelCode: {
                                              value: 'GL1800BDP',
                                            },
                                            hidePriceAndFinance: {
                                              value: '',
                                            },
                                            defaultExteriorColor: {
                                              item: {
                                                id: 'af65d53f-4c13-4435-9ed1-45600f01f30b',
                                                url: '/sitecore/Content/Web-Catalog/MC/ON-ROAD/Touring/2023/Gold-Wing/Gold-Wing-DCT/Transmissions/ABS/ExteriorColors/Mat-iridium-grey-metallic',
                                                name: 'Mat iridium grey metallic',
                                                displayName: 'Mat iridium grey metallic',
                                                fields: {
                                                  studioAssets: {
                                                    id: '625e7745-eff1-4360-89bb-e4324a7fc27c',
                                                    url: '/sitecore/Media-Library/Brands/PSP/MC/Irridium-grey-metallic',
                                                    name: 'Irridium-grey-metallic',
                                                    displayName: 'Irridium-grey-metallic',
                                                    fields: {},
                                                  },
                                                  color: {
                                                    id: '2837eae0-b631-4793-af88-1002a0986381',
                                                    url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Mat-iridium-grey-metallic',
                                                    name: 'Mat iridium grey metallic',
                                                    displayName: 'Mat iridium grey metallic',
                                                    fields: {
                                                      colorName: {
                                                        value: 'Mat iridium grey metallic',
                                                      },
                                                      detKey: {
                                                        value: 'gr23mat_iridium_grey_met__mat_morion_black__2_tone_',
                                                      },
                                                      hexValue: {
                                                        value: '#393339',
                                                      },
                                                    },
                                                  },
                                                },
                                              },
                                            },
                                            exteriorColors: [
                                              {
                                                colors: [
                                                  {
                                                    name: 'Mat iridium grey metallic',
                                                    color: {
                                                      item: {
                                                        id: '2837eae0-b631-4793-af88-1002a0986381',
                                                        url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Mat-iridium-grey-metallic',
                                                        name: 'Mat iridium grey metallic',
                                                        displayName: 'Mat iridium grey metallic',
                                                        fields: {
                                                          colorName: {
                                                            value: 'Mat iridium grey metallic',
                                                          },
                                                          detKey: {
                                                            value:
                                                              'gr23mat_iridium_grey_met__mat_morion_black__2_tone_',
                                                          },
                                                          hexValue: {
                                                            value: '#393339',
                                                          },
                                                        },
                                                      },
                                                    },
                                                  },
                                                ],
                                              },
                                            ],
                                          },
                                          {
                                            detKey: {
                                              value: '11742-Default',
                                            },
                                            detIdentifier: {
                                              value: '11742',
                                            },
                                            sotId: {
                                              value: '',
                                            },
                                            name: 'DCT',
                                            transmissionName: {
                                              value: 'Standard',
                                            },
                                            modelCode: {
                                              value: 'GL1800BDP',
                                            },
                                            hidePriceAndFinance: {
                                              value: '',
                                            },
                                            defaultExteriorColor: {
                                              item: {
                                                id: '0019e8a2-688b-4c17-aa3c-4bd5441929a7',
                                                url: '/sitecore/Content/Web-Catalog/MC/ON-ROAD/Touring/2023/Gold-Wing/Gold-Wing-DCT/Transmissions/DCT/ExteriorColors/Mat-iridium-grey-metallic',
                                                name: 'Mat iridium grey metallic',
                                                displayName: 'Mat iridium grey metallic',
                                                fields: {
                                                  color: {
                                                    id: '2837eae0-b631-4793-af88-1002a0986381',
                                                    url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Mat-iridium-grey-metallic',
                                                    name: 'Mat iridium grey metallic',
                                                    displayName: 'Mat iridium grey metallic',
                                                    fields: {
                                                      colorName: {
                                                        value: 'Mat iridium grey metallic',
                                                      },
                                                      detKey: {
                                                        value: 'gr23mat_iridium_grey_met__mat_morion_black__2_tone_',
                                                      },
                                                      hexValue: {
                                                        value: '#393339',
                                                      },
                                                    },
                                                  },
                                                },
                                              },
                                            },
                                            exteriorColors: [
                                              {
                                                colors: [
                                                  {
                                                    name: 'Mat iridium grey metallic',
                                                    color: {
                                                      item: {
                                                        id: '2837eae0-b631-4793-af88-1002a0986381',
                                                        url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Mat-iridium-grey-metallic',
                                                        name: 'Mat iridium grey metallic',
                                                        displayName: 'Mat iridium grey metallic',
                                                        fields: {
                                                          colorName: {
                                                            value: 'Mat iridium grey metallic',
                                                          },
                                                          detKey: {
                                                            value:
                                                              'gr23mat_iridium_grey_met__mat_morion_black__2_tone_',
                                                          },
                                                          hexValue: {
                                                            value: '#393339',
                                                          },
                                                        },
                                                      },
                                                    },
                                                  },
                                                ],
                                              },
                                            ],
                                          },
                                          {
                                            detKey: {
                                              value: '11742-Default',
                                            },
                                            detIdentifier: {
                                              value: '11742',
                                            },
                                            sotId: {
                                              value: '',
                                            },
                                            name: 'duplicate',
                                            transmissionName: {
                                              value: 'Manual',
                                            },
                                            modelCode: {
                                              value: 'GL1800BDP',
                                            },
                                            hidePriceAndFinance: {
                                              value: '',
                                            },
                                            defaultExteriorColor: {
                                              item: {
                                                id: 'f560e837-c1f9-40ab-a38d-f9b74e9f3304',
                                                url: '/sitecore/Content/Web-Catalog/MC/ON-ROAD/Touring/2023/Gold-Wing/Gold-Wing-DCT/Transmissions/Standard/ExteriorColors/Mat-iridium-grey-metallic',
                                                name: 'Mat iridium grey metallic',
                                                displayName: 'Mat iridium grey metallic',
                                                fields: {
                                                  color: {
                                                    id: '2837eae0-b631-4793-af88-1002a0986381',
                                                    url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Mat-iridium-grey-metallic',
                                                    name: 'Mat iridium grey metallic',
                                                    displayName: 'Mat iridium grey metallic',
                                                    fields: {
                                                      colorName: {
                                                        value: 'Mat iridium grey metallic',
                                                      },
                                                      detKey: {
                                                        value: 'gr23mat_iridium_grey_met__mat_morion_black__2_tone_',
                                                      },
                                                      hexValue: {
                                                        value: '#393339',
                                                      },
                                                    },
                                                  },
                                                },
                                              },
                                            },
                                            exteriorColors: [
                                              {
                                                colors: [],
                                              },
                                            ],
                                          },
                                          {
                                            detKey: {
                                              value: '11742-Default',
                                            },
                                            detIdentifier: {
                                              value: '11742',
                                            },
                                            sotId: {
                                              value: '',
                                            },
                                            name: 'Standard',
                                            transmissionName: {
                                              value: 'Type 4',
                                            },
                                            modelCode: {
                                              value: 'GL1800BDP',
                                            },
                                            hidePriceAndFinance: {
                                              value: '',
                                            },
                                            defaultExteriorColor: {
                                              item: {
                                                id: 'f560e837-c1f9-40ab-a38d-f9b74e9f3304',
                                                url: '/sitecore/Content/Web-Catalog/MC/ON-ROAD/Touring/2023/Gold-Wing/Gold-Wing-DCT/Transmissions/Standard/ExteriorColors/Mat-iridium-grey-metallic',
                                                name: 'Mat iridium grey metallic',
                                                displayName: 'Mat iridium grey metallic',
                                                fields: {
                                                  color: {
                                                    id: '2837eae0-b631-4793-af88-1002a0986381',
                                                    url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Mat-iridium-grey-metallic',
                                                    name: 'Mat iridium grey metallic',
                                                    displayName: 'Mat iridium grey metallic',
                                                    fields: {
                                                      colorName: {
                                                        value: 'Mat iridium grey metallic',
                                                      },
                                                      detKey: {
                                                        value: 'gr23mat_iridium_grey_met__mat_morion_black__2_tone_',
                                                      },
                                                      hexValue: {
                                                        value: '#393339',
                                                      },
                                                    },
                                                  },
                                                },
                                              },
                                            },
                                            exteriorColors: [
                                              {
                                                colors: [
                                                  {
                                                    name: 'Mat iridium grey metallic',
                                                    color: {
                                                      item: {
                                                        id: '2837eae0-b631-4793-af88-1002a0986381',
                                                        url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Mat-iridium-grey-metallic',
                                                        name: 'Mat iridium grey metallic',
                                                        displayName: 'Mat iridium grey metallic',
                                                        fields: {
                                                          colorName: {
                                                            value: 'Mat iridium grey metallic',
                                                          },
                                                          detKey: {
                                                            value:
                                                              'gr23mat_iridium_grey_met__mat_morion_black__2_tone_',
                                                          },
                                                          hexValue: {
                                                            value: '#393339',
                                                          },
                                                        },
                                                      },
                                                    },
                                                  },
                                                ],
                                              },
                                            ],
                                          },
                                          {
                                            detKey: {
                                              value: '11742-Default',
                                            },
                                            detIdentifier: {
                                              value: '11742',
                                            },
                                            sotId: {
                                              value: '',
                                            },
                                            name: 'type 5',
                                            transmissionName: {
                                              value: 'Type 5',
                                            },
                                            modelCode: {
                                              value: 'GL1800BDP',
                                            },
                                            hidePriceAndFinance: {
                                              value: '',
                                            },
                                            defaultExteriorColor: {
                                              item: {
                                                id: 'f560e837-c1f9-40ab-a38d-f9b74e9f3304',
                                                url: '/sitecore/Content/Web-Catalog/MC/ON-ROAD/Touring/2023/Gold-Wing/Gold-Wing-DCT/Transmissions/Standard/ExteriorColors/Mat-iridium-grey-metallic',
                                                name: 'Mat iridium grey metallic',
                                                displayName: 'Mat iridium grey metallic',
                                                fields: {
                                                  color: {
                                                    id: '2837eae0-b631-4793-af88-1002a0986381',
                                                    url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Mat-iridium-grey-metallic',
                                                    name: 'Mat iridium grey metallic',
                                                    displayName: 'Mat iridium grey metallic',
                                                    fields: {
                                                      colorName: {
                                                        value: 'Mat iridium grey metallic',
                                                      },
                                                      detKey: {
                                                        value: 'gr23mat_iridium_grey_met__mat_morion_black__2_tone_',
                                                      },
                                                      hexValue: {
                                                        value: '#393339',
                                                      },
                                                    },
                                                  },
                                                },
                                              },
                                            },
                                            exteriorColors: [
                                              {
                                                colors: [],
                                              },
                                            ],
                                          },
                                          {
                                            detKey: {
                                              value: '11742-Default',
                                            },
                                            detIdentifier: {
                                              value: '11742',
                                            },
                                            sotId: {
                                              value: '',
                                            },
                                            name: 'type 6',
                                            transmissionName: {
                                              value: 'Type 6',
                                            },
                                            modelCode: {
                                              value: 'GL1800BDP',
                                            },
                                            hidePriceAndFinance: {
                                              value: '',
                                            },
                                            defaultExteriorColor: {
                                              item: {
                                                id: 'f560e837-c1f9-40ab-a38d-f9b74e9f3304',
                                                url: '/sitecore/Content/Web-Catalog/MC/ON-ROAD/Touring/2023/Gold-Wing/Gold-Wing-DCT/Transmissions/Standard/ExteriorColors/Mat-iridium-grey-metallic',
                                                name: 'Mat iridium grey metallic',
                                                displayName: 'Mat iridium grey metallic',
                                                fields: {
                                                  color: {
                                                    id: '2837eae0-b631-4793-af88-1002a0986381',
                                                    url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Mat-iridium-grey-metallic',
                                                    name: 'Mat iridium grey metallic',
                                                    displayName: 'Mat iridium grey metallic',
                                                    fields: {
                                                      colorName: {
                                                        value: 'Mat iridium grey metallic',
                                                      },
                                                      detKey: {
                                                        value: 'gr23mat_iridium_grey_met__mat_morion_black__2_tone_',
                                                      },
                                                      hexValue: {
                                                        value: '#393339',
                                                      },
                                                    },
                                                  },
                                                },
                                              },
                                            },
                                            exteriorColors: [
                                              {
                                                colors: [],
                                              },
                                            ],
                                          },
                                        ],
                                      },
                                    ],
                                  },
                                  {
                                    detKey: {
                                      value: 'gold_wing_13312',
                                    },
                                    detIdentifier: {
                                      value: '13312',
                                    },
                                    sotId: {
                                      value: '',
                                    },
                                    name: 'Gold Wing E',
                                    trimName: {
                                      value: 'Gold Wing E',
                                    },
                                    primaryThumbnail: {
                                      item: {
                                        value: {
                                          src: 'https://psp-sit-01-dmm.psp.honda.ca/-/media/Brands/PSP/MC/H24_MC_Giorno_ATMOSPHERE-BLUE-METALLIC_RGB_Model-Card_274x177.jpg?h=177&iar=0&w=274&rev=472d0a04f9c541a3bf4162a2fbbe1132&hash=E6A0012713582747E2D9AA039C01B6D4',
                                          alt: '',
                                          width: '274',
                                          height: '177',
                                        },
                                      },
                                    },
                                    defaultTransmission: {
                                      fields: {
                                        name: 'ABS',
                                        detKey: {
                                          value: '11745-Default',
                                        },
                                        detIdentifier: {
                                          value: '11745',
                                        },
                                        sotId: {
                                          value: '',
                                        },
                                        modelCode: {
                                          value: 'GL1800BP',
                                        },
                                        defaultExteriorColor: {
                                          fields: {
                                            name: 'Mat iridium grey metallic',
                                            color: {
                                              fields: {
                                                detKey: {
                                                  value: 'gr23mat_iridium_grey_met__mat_morion_black__2_tone_',
                                                },
                                                detIdentifier: {
                                                  value: '',
                                                },
                                                sotId: {
                                                  value: '',
                                                },
                                              },
                                            },
                                          },
                                        },
                                      },
                                    },
                                    transmissions: [
                                      {
                                        items: [
                                          {
                                            detKey: {
                                              value: '11745-Default',
                                            },
                                            detIdentifier: {
                                              value: '11745',
                                            },
                                            sotId: {
                                              value: '',
                                            },
                                            name: 'ABS',
                                            transmissionName: {
                                              value: 'ABS',
                                            },
                                            modelCode: {
                                              value: 'GL1800BP',
                                            },
                                            hidePriceAndFinance: {
                                              value: '',
                                            },
                                            defaultExteriorColor: {
                                              item: {
                                                id: '62db5ade-688f-46a3-be56-4e2518005685',
                                                url: '/sitecore/Content/Web-Catalog/MC/ON-ROAD/Touring/2023/Gold-Wing/Gold-Wing-E/Transmissions/ABS/ExteriorColors/Mat-iridium-grey-metallic',
                                                name: 'Mat iridium grey metallic',
                                                displayName: 'Mat iridium grey metallic',
                                                fields: {
                                                  studioAssets: {
                                                    id: 'e6d46683-3b1e-4d72-ba64-f4d43eded5d6',
                                                    url: '/sitecore/Media-Library/Brands/PSP/MC/Studio',
                                                    name: 'Studio',
                                                    displayName: 'Studio',
                                                    fields: {},
                                                  },
                                                  landscapeAssets: null,
                                                  color: {
                                                    id: '2837eae0-b631-4793-af88-1002a0986381',
                                                    url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Mat-iridium-grey-metallic',
                                                    name: 'Mat iridium grey metallic',
                                                    displayName: 'Mat iridium grey metallic',
                                                    fields: {
                                                      colorName: {
                                                        value: 'Mat iridium grey metallic',
                                                      },
                                                      detKey: {
                                                        value: 'gr23mat_iridium_grey_met__mat_morion_black__2_tone_',
                                                      },
                                                      hexValue: {
                                                        value: '#393339',
                                                      },
                                                    },
                                                  },
                                                },
                                              },
                                            },
                                            exteriorColors: [
                                              {
                                                colors: [
                                                  {
                                                    name: 'Mat iridium grey metallic',
                                                    color: {
                                                      item: {
                                                        id: '2837eae0-b631-4793-af88-1002a0986381',
                                                        url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Mat-iridium-grey-metallic',
                                                        name: 'Mat iridium grey metallic',
                                                        displayName: 'Mat iridium grey metallic',
                                                        fields: {
                                                          colorName: {
                                                            value: 'Mat iridium grey metallic',
                                                          },
                                                          detKey: {
                                                            value:
                                                              'gr23mat_iridium_grey_met__mat_morion_black__2_tone_',
                                                          },
                                                          hexValue: {
                                                            value: '#393339',
                                                          },
                                                        },
                                                      },
                                                    },
                                                  },
                                                ],
                                              },
                                            ],
                                          },
                                        ],
                                      },
                                    ],
                                  },
                                  {
                                    detKey: {
                                      value: 'gold_wing_tour_13314',
                                    },
                                    detIdentifier: {
                                      value: '13314',
                                    },
                                    sotId: {
                                      value: '',
                                    },
                                    name: 'Gold Wing Tour',
                                    trimName: {
                                      value: 'Gold Wing Tour',
                                    },
                                    primaryThumbnail: {
                                      item: {
                                        value: {
                                          src: 'https://psp-sit-01-dmm.psp.honda.ca/-/media/Brands/PSP/MC/H23_MC_GoldWing-Tour-AC-DCT-Airbag_Red_RGB_Model-Card_274x177.png?h=177&iar=0&w=274&rev=9e120b5f9a774034bff5c229b939d57a&hash=E862B7AC0FFCA668114D637237C8B2A5',
                                          alt: 'aaa',
                                          width: '274',
                                          height: '177',
                                        },
                                      },
                                    },
                                    defaultTransmission: {
                                      fields: {
                                        name: 'ABS',
                                        detKey: {
                                          value: '11743-Default',
                                        },
                                        detIdentifier: {
                                          value: '11743',
                                        },
                                        sotId: {
                                          value: '',
                                        },
                                        modelCode: {
                                          value: 'GL1800P',
                                        },
                                        defaultExteriorColor: {
                                          fields: {
                                            name: 'Candy ardent red',
                                            color: {
                                              fields: {
                                                detKey: {
                                                  value: 'cd23candy_ardent_red__bordeaux_red_met__2_tone_',
                                                },
                                                detIdentifier: {
                                                  value: '',
                                                },
                                                sotId: {
                                                  value: '',
                                                },
                                              },
                                            },
                                          },
                                        },
                                      },
                                    },
                                    transmissions: [
                                      {
                                        items: [
                                          {
                                            detKey: {
                                              value: '11743-Default',
                                            },
                                            detIdentifier: {
                                              value: '11743',
                                            },
                                            sotId: {
                                              value: '',
                                            },
                                            name: 'ABS',
                                            transmissionName: {
                                              value: 'ABS',
                                            },
                                            modelCode: {
                                              value: 'GL1800P',
                                            },
                                            hidePriceAndFinance: {
                                              value: '',
                                            },
                                            defaultExteriorColor: {
                                              item: {
                                                id: 'b224c126-890d-4298-8f98-8903b5d71e6e',
                                                url: '/sitecore/Content/Web-Catalog/MC/ON-ROAD/Touring/2023/Gold-Wing/Gold-Wing-Tour/Transmissions/ABS/ExteriorColors/Candy-ardent-red',
                                                name: 'Candy ardent red',
                                                displayName: 'Candy ardent red',
                                                fields: {
                                                  studioAssets: {
                                                    id: '66d64235-d6d6-4aec-90f7-73ca46914046',
                                                    url: '/sitecore/Media-Library/Brands/PSP/MC/Candyred',
                                                    name: 'Candyred',
                                                    displayName: 'Candyred',
                                                    fields: {},
                                                  },
                                                  landscapeAssets: null,
                                                  color: {
                                                    id: '2540b2c3-5cb3-4885-a19b-b4cc987985bd',
                                                    url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Candy-ardent-red',
                                                    name: 'Candy ardent red',
                                                    displayName: 'Candy ardent red',
                                                    fields: {
                                                      colorName: {
                                                        value: 'Candy ardent red',
                                                      },
                                                      detKey: {
                                                        value: 'cd23candy_ardent_red__bordeaux_red_met__2_tone_',
                                                      },
                                                      hexValue: {
                                                        value: '#C61F2B',
                                                      },
                                                    },
                                                  },
                                                },
                                              },
                                            },
                                            exteriorColors: [
                                              {
                                                colors: [
                                                  {
                                                    name: 'Candy ardent red',
                                                    color: {
                                                      item: {
                                                        id: '2540b2c3-5cb3-4885-a19b-b4cc987985bd',
                                                        url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Candy-ardent-red',
                                                        name: 'Candy ardent red',
                                                        displayName: 'Candy ardent red',
                                                        fields: {
                                                          colorName: {
                                                            value: 'Candy ardent red',
                                                          },
                                                          detKey: {
                                                            value: 'cd23candy_ardent_red__bordeaux_red_met__2_tone_',
                                                          },
                                                          hexValue: {
                                                            value: '#C61F2B',
                                                          },
                                                        },
                                                      },
                                                    },
                                                  },
                                                  {
                                                    name: 'Graphite Black',
                                                    color: {
                                                      item: {
                                                        id: '8492faa3-fb74-46bc-8afd-91709f219736',
                                                        url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Graphite-Black',
                                                        name: 'Graphite Black',
                                                        displayName: 'Graphite Black',
                                                        fields: {
                                                          colorName: {
                                                            value: 'Graphite Black',
                                                          },
                                                          detKey: {
                                                            value: 'nh_b01_____graphite_black',
                                                          },
                                                          hexValue: {
                                                            value: '#27292B',
                                                          },
                                                        },
                                                      },
                                                    },
                                                  },
                                                  {
                                                    name: 'Pearl Glare White',
                                                    color: {
                                                      item: {
                                                        id: '3ec284bf-386b-4a3b-8dc8-f1d1047408ac',
                                                        url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Pearl-Glare-White',
                                                        name: 'Pearl Glare White',
                                                        displayName: 'Pearl Glare White',
                                                        fields: {
                                                          colorName: {
                                                            value: 'Pearl Glare White',
                                                          },
                                                          detKey: {
                                                            value: '1061pearl_glare_white',
                                                          },
                                                          hexValue: {
                                                            value: '#EFF3F8',
                                                          },
                                                        },
                                                      },
                                                    },
                                                  },
                                                  {
                                                    name: 'Blue Dark Blue w Blue stripe',
                                                    color: {
                                                      item: {
                                                        id: 'd2b6556c-5299-4a89-88dd-5da09781462e',
                                                        url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Blue-Dark-Blue-w-Blue-stripe',
                                                        name: 'Blue Dark Blue w Blue stripe',
                                                        displayName: 'Blue Dark Blue w Blue stripe',
                                                        fields: {
                                                          colorName: {
                                                            value: 'Blue / Dark Blue w/ Blue stripe',
                                                          },
                                                          detKey: {
                                                            value: 'b_197___pb_blue___dark_blue_w__blue_stripe',
                                                          },
                                                        },
                                                      },
                                                    },
                                                  },
                                                ],
                                              },
                                            ],
                                          },
                                        ],
                                      },
                                    ],
                                  },
                                  {
                                    detKey: {
                                      value: 'gold_wing_tour_dct_13315',
                                    },
                                    detIdentifier: {
                                      value: '13315',
                                    },
                                    sotId: {
                                      value: '',
                                    },
                                    name: 'Gold Wing Tour DCT',
                                    trimName: {
                                      value: 'Gold Wing Tour DCT',
                                    },
                                    primaryThumbnail: {
                                      item: {
                                        value: {
                                          src: 'https://psp-sit-01-dmm.psp.honda.ca/-/media/Brands/PSP/MC/NC750X_274x177-(1).png?h=177&iar=0&w=274&rev=bca9cec7206c4b64859c733a74cb4c49&hash=E688912A3EB31A31F7569E7EEAA06E80',
                                          alt: '',
                                          width: '274',
                                          height: '177',
                                        },
                                      },
                                    },
                                    defaultTransmission: {
                                      fields: {
                                        name: 'ABS',
                                        detKey: {
                                          value: '11744-Default',
                                        },
                                        detIdentifier: {
                                          value: '11744',
                                        },
                                        sotId: {
                                          value: '',
                                        },
                                        modelCode: {
                                          value: 'GL1800DP',
                                        },
                                        defaultExteriorColor: {
                                          fields: {
                                            name: 'Candy ardent red',
                                            color: {
                                              fields: {
                                                detKey: {
                                                  value: 'cd23candy_ardent_red__bordeaux_red_met__2_tone_',
                                                },
                                                detIdentifier: {
                                                  value: '',
                                                },
                                                sotId: {
                                                  value: '',
                                                },
                                              },
                                            },
                                          },
                                        },
                                      },
                                    },
                                    transmissions: [
                                      {
                                        items: [
                                          {
                                            detKey: {
                                              value: '11744-Default',
                                            },
                                            detIdentifier: {
                                              value: '11744',
                                            },
                                            sotId: {
                                              value: '',
                                            },
                                            name: 'ABS',
                                            transmissionName: {
                                              value: 'ABS',
                                            },
                                            modelCode: {
                                              value: 'GL1800DP',
                                            },
                                            hidePriceAndFinance: {
                                              value: '',
                                            },
                                            defaultExteriorColor: {
                                              item: {
                                                id: '316f12d9-64d8-456b-b4e0-2b7c5f2c9a00',
                                                url: '/sitecore/Content/Web-Catalog/MC/ON-ROAD/Touring/2023/Gold-Wing/Gold-Wing-Tour-DCT/Transmissions/ABS/ExteriorColors/Candy-ardent-red',
                                                name: 'Candy ardent red',
                                                displayName: 'Candy ardent red',
                                                fields: {
                                                  studioAssets: {
                                                    id: '66d64235-d6d6-4aec-90f7-73ca46914046',
                                                    url: '/sitecore/Media-Library/Brands/PSP/MC/Candyred',
                                                    name: 'Candyred',
                                                    displayName: 'Candyred',
                                                    fields: {},
                                                  },
                                                  color: {
                                                    id: '2540b2c3-5cb3-4885-a19b-b4cc987985bd',
                                                    url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Candy-ardent-red',
                                                    name: 'Candy ardent red',
                                                    displayName: 'Candy ardent red',
                                                    fields: {
                                                      colorName: {
                                                        value: 'Candy ardent red',
                                                      },
                                                      detKey: {
                                                        value: 'cd23candy_ardent_red__bordeaux_red_met__2_tone_',
                                                      },
                                                      hexValue: {
                                                        value: '#C61F2B',
                                                      },
                                                    },
                                                  },
                                                },
                                              },
                                            },
                                            exteriorColors: [
                                              {
                                                colors: [
                                                  {
                                                    name: 'Candy ardent red',
                                                    color: {
                                                      item: {
                                                        id: '2540b2c3-5cb3-4885-a19b-b4cc987985bd',
                                                        url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Candy-ardent-red',
                                                        name: 'Candy ardent red',
                                                        displayName: 'Candy ardent red',
                                                        fields: {
                                                          colorName: {
                                                            value: 'Candy ardent red',
                                                          },
                                                          detKey: {
                                                            value: 'cd23candy_ardent_red__bordeaux_red_met__2_tone_',
                                                          },
                                                          hexValue: {
                                                            value: '#C61F2B',
                                                          },
                                                        },
                                                      },
                                                    },
                                                  },
                                                ],
                                              },
                                            ],
                                          },
                                        ],
                                      },
                                    ],
                                  },
                                  {
                                    detKey: {
                                      value: 'gold_wing_tour_dct_airbag_13316',
                                    },
                                    detIdentifier: {
                                      value: '13316',
                                    },
                                    sotId: {
                                      value: '',
                                    },
                                    name: 'Gold Wing Tour DCT Airbag',
                                    trimName: {
                                      value: 'Gold Wing Tour DCT Airbag',
                                    },
                                    primaryThumbnail: {
                                      item: {
                                        value: {
                                          src: 'https://psp-sit-01-dmm.psp.honda.ca/-/media/Brands/PSP/MC/NC750X_274x177-(1).png?h=177&iar=0&w=274&rev=bca9cec7206c4b64859c733a74cb4c49&hash=E688912A3EB31A31F7569E7EEAA06E80',
                                          alt: '',
                                          width: '274',
                                          height: '177',
                                        },
                                      },
                                    },
                                    defaultTransmission: {
                                      fields: {
                                        name: 'ABS',
                                        detKey: {
                                          value: '11741-Default',
                                        },
                                        detIdentifier: {
                                          value: '11741',
                                        },
                                        sotId: {
                                          value: '',
                                        },
                                        modelCode: {
                                          value: 'GL1800DAP',
                                        },
                                        defaultExteriorColor: {
                                          fields: {
                                            name: 'Candy ardent red',
                                            color: {
                                              fields: {
                                                detKey: {
                                                  value: 'cd23candy_ardent_red__bordeaux_red_met__2_tone_',
                                                },
                                                detIdentifier: {
                                                  value: '',
                                                },
                                                sotId: {
                                                  value: '',
                                                },
                                              },
                                            },
                                          },
                                        },
                                      },
                                    },
                                    transmissions: [
                                      {
                                        items: [
                                          {
                                            detKey: {
                                              value: '11741-Default',
                                            },
                                            detIdentifier: {
                                              value: '11741',
                                            },
                                            sotId: {
                                              value: '',
                                            },
                                            name: 'ABS',
                                            transmissionName: {
                                              value: 'ABS',
                                            },
                                            modelCode: {
                                              value: 'GL1800DAP',
                                            },
                                            hidePriceAndFinance: {
                                              value: '',
                                            },
                                            defaultExteriorColor: {
                                              item: {
                                                id: '11423ac5-cd14-4ef4-9ce2-954310a38cc3',
                                                url: '/sitecore/Content/Web-Catalog/MC/ON-ROAD/Touring/2023/Gold-Wing/Gold-Wing-Tour-DCT-Airbag/Transmissions/ABS/ExteriorColors/Candy-ardent-red',
                                                name: 'Candy ardent red',
                                                displayName: 'Candy ardent red',
                                                fields: {
                                                  studioAssets: {
                                                    id: '66d64235-d6d6-4aec-90f7-73ca46914046',
                                                    url: '/sitecore/Media-Library/Brands/PSP/MC/Candyred',
                                                    name: 'Candyred',
                                                    displayName: 'Candyred',
                                                    fields: {},
                                                  },
                                                  color: {
                                                    id: '2540b2c3-5cb3-4885-a19b-b4cc987985bd',
                                                    url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Candy-ardent-red',
                                                    name: 'Candy ardent red',
                                                    displayName: 'Candy ardent red',
                                                    fields: {
                                                      colorName: {
                                                        value: 'Candy ardent red',
                                                      },
                                                      detKey: {
                                                        value: 'cd23candy_ardent_red__bordeaux_red_met__2_tone_',
                                                      },
                                                      hexValue: {
                                                        value: '#C61F2B',
                                                      },
                                                    },
                                                  },
                                                },
                                              },
                                            },
                                            exteriorColors: [
                                              {
                                                colors: [
                                                  {
                                                    name: 'Candy ardent red',
                                                    color: {
                                                      item: {
                                                        id: '2540b2c3-5cb3-4885-a19b-b4cc987985bd',
                                                        url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Candy-ardent-red',
                                                        name: 'Candy ardent red',
                                                        displayName: 'Candy ardent red',
                                                        fields: {
                                                          colorName: {
                                                            value: 'Candy ardent red',
                                                          },
                                                          detKey: {
                                                            value: 'cd23candy_ardent_red__bordeaux_red_met__2_tone_',
                                                          },
                                                          hexValue: {
                                                            value: '#C61F2B',
                                                          },
                                                        },
                                                      },
                                                    },
                                                  },
                                                ],
                                              },
                                            ],
                                          },
                                        ],
                                      },
                                    ],
                                  },
                                ],
                                trimName: {
                                  value: 'Gold Wing',
                                },
                                primaryThumbnail: {
                                  item: {
                                    value: {},
                                  },
                                },
                                secondaryThumbnail: {
                                  item: {
                                    value: {},
                                  },
                                },
                                specialVehicleType: {
                                  item: null,
                                },
                                nameBadge: {
                                  item: {
                                    value: {},
                                  },
                                },
                                defaultTransmission: {
                                  item: {},
                                },
                                bodyType: {
                                  item: [],
                                },
                                drivetrain: {
                                  item: [],
                                },
                                safety: {
                                  item: [],
                                },
                                interiorMaterial: {
                                  item: [],
                                },
                                designFeatures: {
                                  item: [],
                                },
                                wheels: {
                                  item: [],
                                },
                                entertainment: {
                                  item: [],
                                },
                                comfortConvenience: {
                                  item: [],
                                },
                                emissionRating: {
                                  value: '',
                                },
                                transmissions: [],
                              },
                            ],
                            trims: [
                              {
                                detKey: {
                                  value: 'gl1800al',
                                },
                                detIdentifier: {
                                  value: '13313',
                                },
                                sotId: {
                                  value: '',
                                },
                                name: 'Gold Wing DCT',
                                trimName: {
                                  value: 'Gold Wing DCT',
                                },
                                primaryThumbnail: {
                                  item: {
                                    value: {
                                      src: 'https://psp-sit-01-dmm.psp.honda.ca/-/media/Brands/PSP/MC/H24_MC_Ruckus_Black_RGB_Model-Card_274x177.jpg?h=177&iar=0&w=274&rev=13da303bf3e349dca66e58f97d47b927&hash=A1937B6189A867767778AEFE172CC2F6',
                                      alt: '',
                                      width: '274',
                                      height: '177',
                                    },
                                  },
                                },
                                defaultTransmission: {
                                  fields: {
                                    name: 'ABS',
                                    detKey: {
                                      value: '11742-Default',
                                    },
                                    detIdentifier: {
                                      value: '11742',
                                    },
                                    sotId: {
                                      value: '',
                                    },
                                    modelCode: {
                                      value: 'GL1800BDP',
                                    },
                                    defaultExteriorColor: {
                                      fields: {
                                        name: 'Mat iridium grey metallic',
                                        color: {
                                          fields: {
                                            detKey: {
                                              value: 'gr23mat_iridium_grey_met__mat_morion_black__2_tone_',
                                            },
                                            detIdentifier: {
                                              value: '',
                                            },
                                            sotId: {
                                              value: '',
                                            },
                                          },
                                        },
                                      },
                                    },
                                  },
                                },
                                transmissions: [
                                  {
                                    items: [
                                      {
                                        detKey: {
                                          value: '11742-Default',
                                        },
                                        detIdentifier: {
                                          value: '11742',
                                        },
                                        sotId: {
                                          value: '',
                                        },
                                        name: 'ABS',
                                        transmissionName: {
                                          value: 'ABS',
                                        },
                                        modelCode: {
                                          value: 'GL1800BDP',
                                        },
                                        hidePriceAndFinance: {
                                          value: '',
                                        },
                                        defaultExteriorColor: {
                                          item: {
                                            id: 'af65d53f-4c13-4435-9ed1-45600f01f30b',
                                            url: '/sitecore/Content/Web-Catalog/MC/ON-ROAD/Touring/2023/Gold-Wing/Gold-Wing-DCT/Transmissions/ABS/ExteriorColors/Mat-iridium-grey-metallic',
                                            name: 'Mat iridium grey metallic',
                                            displayName: 'Mat iridium grey metallic',
                                            fields: {
                                              studioAssets: {
                                                id: '625e7745-eff1-4360-89bb-e4324a7fc27c',
                                                url: '/sitecore/Media-Library/Brands/PSP/MC/Irridium-grey-metallic',
                                                name: 'Irridium-grey-metallic',
                                                displayName: 'Irridium-grey-metallic',
                                                fields: {},
                                              },
                                              color: {
                                                id: '2837eae0-b631-4793-af88-1002a0986381',
                                                url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Mat-iridium-grey-metallic',
                                                name: 'Mat iridium grey metallic',
                                                displayName: 'Mat iridium grey metallic',
                                                fields: {
                                                  colorName: {
                                                    value: 'Mat iridium grey metallic',
                                                  },
                                                  detKey: {
                                                    value: 'gr23mat_iridium_grey_met__mat_morion_black__2_tone_',
                                                  },
                                                  hexValue: {
                                                    value: '#393339',
                                                  },
                                                },
                                              },
                                            },
                                          },
                                        },
                                        exteriorColors: [
                                          {
                                            colors: [
                                              {
                                                name: 'Mat iridium grey metallic',
                                                color: {
                                                  item: {
                                                    id: '2837eae0-b631-4793-af88-1002a0986381',
                                                    url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Mat-iridium-grey-metallic',
                                                    name: 'Mat iridium grey metallic',
                                                    displayName: 'Mat iridium grey metallic',
                                                    fields: {
                                                      colorName: {
                                                        value: 'Mat iridium grey metallic',
                                                      },
                                                      detKey: {
                                                        value: 'gr23mat_iridium_grey_met__mat_morion_black__2_tone_',
                                                      },
                                                      hexValue: {
                                                        value: '#393339',
                                                      },
                                                    },
                                                  },
                                                },
                                              },
                                            ],
                                          },
                                        ],
                                      },
                                      {
                                        detKey: {
                                          value: '11742-Default',
                                        },
                                        detIdentifier: {
                                          value: '11742',
                                        },
                                        sotId: {
                                          value: '',
                                        },
                                        name: 'DCT',
                                        transmissionName: {
                                          value: 'Standard',
                                        },
                                        modelCode: {
                                          value: 'GL1800BDP',
                                        },
                                        hidePriceAndFinance: {
                                          value: '',
                                        },
                                        defaultExteriorColor: {
                                          item: {
                                            id: '0019e8a2-688b-4c17-aa3c-4bd5441929a7',
                                            url: '/sitecore/Content/Web-Catalog/MC/ON-ROAD/Touring/2023/Gold-Wing/Gold-Wing-DCT/Transmissions/DCT/ExteriorColors/Mat-iridium-grey-metallic',
                                            name: 'Mat iridium grey metallic',
                                            displayName: 'Mat iridium grey metallic',
                                            fields: {
                                              color: {
                                                id: '2837eae0-b631-4793-af88-1002a0986381',
                                                url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Mat-iridium-grey-metallic',
                                                name: 'Mat iridium grey metallic',
                                                displayName: 'Mat iridium grey metallic',
                                                fields: {
                                                  colorName: {
                                                    value: 'Mat iridium grey metallic',
                                                  },
                                                  detKey: {
                                                    value: 'gr23mat_iridium_grey_met__mat_morion_black__2_tone_',
                                                  },
                                                  hexValue: {
                                                    value: '#393339',
                                                  },
                                                },
                                              },
                                            },
                                          },
                                        },
                                        exteriorColors: [
                                          {
                                            colors: [
                                              {
                                                name: 'Mat iridium grey metallic',
                                                color: {
                                                  item: {
                                                    id: '2837eae0-b631-4793-af88-1002a0986381',
                                                    url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Mat-iridium-grey-metallic',
                                                    name: 'Mat iridium grey metallic',
                                                    displayName: 'Mat iridium grey metallic',
                                                    fields: {
                                                      colorName: {
                                                        value: 'Mat iridium grey metallic',
                                                      },
                                                      detKey: {
                                                        value: 'gr23mat_iridium_grey_met__mat_morion_black__2_tone_',
                                                      },
                                                      hexValue: {
                                                        value: '#393339',
                                                      },
                                                    },
                                                  },
                                                },
                                              },
                                            ],
                                          },
                                        ],
                                      },
                                      {
                                        detKey: {
                                          value: '11742-Default',
                                        },
                                        detIdentifier: {
                                          value: '11742',
                                        },
                                        sotId: {
                                          value: '',
                                        },
                                        name: 'duplicate',
                                        transmissionName: {
                                          value: 'Manual',
                                        },
                                        modelCode: {
                                          value: 'GL1800BDP',
                                        },
                                        hidePriceAndFinance: {
                                          value: '',
                                        },
                                        defaultExteriorColor: {
                                          item: {
                                            id: 'f560e837-c1f9-40ab-a38d-f9b74e9f3304',
                                            url: '/sitecore/Content/Web-Catalog/MC/ON-ROAD/Touring/2023/Gold-Wing/Gold-Wing-DCT/Transmissions/Standard/ExteriorColors/Mat-iridium-grey-metallic',
                                            name: 'Mat iridium grey metallic',
                                            displayName: 'Mat iridium grey metallic',
                                            fields: {
                                              color: {
                                                id: '2837eae0-b631-4793-af88-1002a0986381',
                                                url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Mat-iridium-grey-metallic',
                                                name: 'Mat iridium grey metallic',
                                                displayName: 'Mat iridium grey metallic',
                                                fields: {
                                                  colorName: {
                                                    value: 'Mat iridium grey metallic',
                                                  },
                                                  detKey: {
                                                    value: 'gr23mat_iridium_grey_met__mat_morion_black__2_tone_',
                                                  },
                                                  hexValue: {
                                                    value: '#393339',
                                                  },
                                                },
                                              },
                                            },
                                          },
                                        },
                                        exteriorColors: [
                                          {
                                            colors: [],
                                          },
                                        ],
                                      },
                                      {
                                        detKey: {
                                          value: '11742-Default',
                                        },
                                        detIdentifier: {
                                          value: '11742',
                                        },
                                        sotId: {
                                          value: '',
                                        },
                                        name: 'Standard',
                                        transmissionName: {
                                          value: 'Type 4',
                                        },
                                        modelCode: {
                                          value: 'GL1800BDP',
                                        },
                                        hidePriceAndFinance: {
                                          value: '',
                                        },
                                        defaultExteriorColor: {
                                          item: {
                                            id: 'f560e837-c1f9-40ab-a38d-f9b74e9f3304',
                                            url: '/sitecore/Content/Web-Catalog/MC/ON-ROAD/Touring/2023/Gold-Wing/Gold-Wing-DCT/Transmissions/Standard/ExteriorColors/Mat-iridium-grey-metallic',
                                            name: 'Mat iridium grey metallic',
                                            displayName: 'Mat iridium grey metallic',
                                            fields: {
                                              color: {
                                                id: '2837eae0-b631-4793-af88-1002a0986381',
                                                url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Mat-iridium-grey-metallic',
                                                name: 'Mat iridium grey metallic',
                                                displayName: 'Mat iridium grey metallic',
                                                fields: {
                                                  colorName: {
                                                    value: 'Mat iridium grey metallic',
                                                  },
                                                  detKey: {
                                                    value: 'gr23mat_iridium_grey_met__mat_morion_black__2_tone_',
                                                  },
                                                  hexValue: {
                                                    value: '#393339',
                                                  },
                                                },
                                              },
                                            },
                                          },
                                        },
                                        exteriorColors: [
                                          {
                                            colors: [
                                              {
                                                name: 'Mat iridium grey metallic',
                                                color: {
                                                  item: {
                                                    id: '2837eae0-b631-4793-af88-1002a0986381',
                                                    url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Mat-iridium-grey-metallic',
                                                    name: 'Mat iridium grey metallic',
                                                    displayName: 'Mat iridium grey metallic',
                                                    fields: {
                                                      colorName: {
                                                        value: 'Mat iridium grey metallic',
                                                      },
                                                      detKey: {
                                                        value: 'gr23mat_iridium_grey_met__mat_morion_black__2_tone_',
                                                      },
                                                      hexValue: {
                                                        value: '#393339',
                                                      },
                                                    },
                                                  },
                                                },
                                              },
                                            ],
                                          },
                                        ],
                                      },
                                      {
                                        detKey: {
                                          value: '11742-Default',
                                        },
                                        detIdentifier: {
                                          value: '11742',
                                        },
                                        sotId: {
                                          value: '',
                                        },
                                        name: 'type 5',
                                        transmissionName: {
                                          value: 'Type 5',
                                        },
                                        modelCode: {
                                          value: 'GL1800BDP',
                                        },
                                        hidePriceAndFinance: {
                                          value: '',
                                        },
                                        defaultExteriorColor: {
                                          item: {
                                            id: 'f560e837-c1f9-40ab-a38d-f9b74e9f3304',
                                            url: '/sitecore/Content/Web-Catalog/MC/ON-ROAD/Touring/2023/Gold-Wing/Gold-Wing-DCT/Transmissions/Standard/ExteriorColors/Mat-iridium-grey-metallic',
                                            name: 'Mat iridium grey metallic',
                                            displayName: 'Mat iridium grey metallic',
                                            fields: {
                                              color: {
                                                id: '2837eae0-b631-4793-af88-1002a0986381',
                                                url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Mat-iridium-grey-metallic',
                                                name: 'Mat iridium grey metallic',
                                                displayName: 'Mat iridium grey metallic',
                                                fields: {
                                                  colorName: {
                                                    value: 'Mat iridium grey metallic',
                                                  },
                                                  detKey: {
                                                    value: 'gr23mat_iridium_grey_met__mat_morion_black__2_tone_',
                                                  },
                                                  hexValue: {
                                                    value: '#393339',
                                                  },
                                                },
                                              },
                                            },
                                          },
                                        },
                                        exteriorColors: [
                                          {
                                            colors: [],
                                          },
                                        ],
                                      },
                                      {
                                        detKey: {
                                          value: '11742-Default',
                                        },
                                        detIdentifier: {
                                          value: '11742',
                                        },
                                        sotId: {
                                          value: '',
                                        },
                                        name: 'type 6',
                                        transmissionName: {
                                          value: 'Type 6',
                                        },
                                        modelCode: {
                                          value: 'GL1800BDP',
                                        },
                                        hidePriceAndFinance: {
                                          value: '',
                                        },
                                        defaultExteriorColor: {
                                          item: {
                                            id: 'f560e837-c1f9-40ab-a38d-f9b74e9f3304',
                                            url: '/sitecore/Content/Web-Catalog/MC/ON-ROAD/Touring/2023/Gold-Wing/Gold-Wing-DCT/Transmissions/Standard/ExteriorColors/Mat-iridium-grey-metallic',
                                            name: 'Mat iridium grey metallic',
                                            displayName: 'Mat iridium grey metallic',
                                            fields: {
                                              color: {
                                                id: '2837eae0-b631-4793-af88-1002a0986381',
                                                url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Mat-iridium-grey-metallic',
                                                name: 'Mat iridium grey metallic',
                                                displayName: 'Mat iridium grey metallic',
                                                fields: {
                                                  colorName: {
                                                    value: 'Mat iridium grey metallic',
                                                  },
                                                  detKey: {
                                                    value: 'gr23mat_iridium_grey_met__mat_morion_black__2_tone_',
                                                  },
                                                  hexValue: {
                                                    value: '#393339',
                                                  },
                                                },
                                              },
                                            },
                                          },
                                        },
                                        exteriorColors: [
                                          {
                                            colors: [],
                                          },
                                        ],
                                      },
                                    ],
                                  },
                                ],
                              },
                              {
                                detKey: {
                                  value: 'gl1800al',
                                },
                                detIdentifier: {
                                  value: '13312',
                                },
                                sotId: {
                                  value: '',
                                },
                                name: 'Gold Wing E',
                                trimName: {
                                  value: 'Gold Wing E',
                                },
                                primaryThumbnail: {
                                  item: {
                                    value: {
                                      src: 'https://psp-sit-01-dmm.psp.honda.ca/-/media/Brands/PSP/MC/H24_MC_Giorno_ATMOSPHERE-BLUE-METALLIC_RGB_Model-Card_274x177.jpg?h=177&iar=0&w=274&rev=472d0a04f9c541a3bf4162a2fbbe1132&hash=E6A0012713582747E2D9AA039C01B6D4',
                                      alt: '',
                                      width: '274',
                                      height: '177',
                                    },
                                  },
                                },
                                defaultTransmission: {
                                  fields: {
                                    name: 'ABS',
                                    detKey: {
                                      value: '11745-Default',
                                    },
                                    detIdentifier: {
                                      value: '11745',
                                    },
                                    sotId: {
                                      value: '',
                                    },
                                    modelCode: {
                                      value: 'GL1800BP',
                                    },
                                    defaultExteriorColor: {
                                      fields: {
                                        name: 'Mat iridium grey metallic',
                                        color: {
                                          fields: {
                                            detKey: {
                                              value: 'gr23mat_iridium_grey_met__mat_morion_black__2_tone_',
                                            },
                                            detIdentifier: {
                                              value: '',
                                            },
                                            sotId: {
                                              value: '',
                                            },
                                          },
                                        },
                                      },
                                    },
                                  },
                                },
                                transmissions: [
                                  {
                                    items: [
                                      {
                                        detKey: {
                                          value: '11745-Default',
                                        },
                                        detIdentifier: {
                                          value: '11745',
                                        },
                                        sotId: {
                                          value: '',
                                        },
                                        name: 'ABS',
                                        transmissionName: {
                                          value: 'ABS',
                                        },
                                        modelCode: {
                                          value: 'GL1800BP',
                                        },
                                        hidePriceAndFinance: {
                                          value: '',
                                        },
                                        defaultExteriorColor: {
                                          item: {
                                            id: '62db5ade-688f-46a3-be56-4e2518005685',
                                            url: '/sitecore/Content/Web-Catalog/MC/ON-ROAD/Touring/2023/Gold-Wing/Gold-Wing-E/Transmissions/ABS/ExteriorColors/Mat-iridium-grey-metallic',
                                            name: 'Mat iridium grey metallic',
                                            displayName: 'Mat iridium grey metallic',
                                            fields: {
                                              studioAssets: {
                                                id: 'e6d46683-3b1e-4d72-ba64-f4d43eded5d6',
                                                url: '/sitecore/Media-Library/Brands/PSP/MC/Studio',
                                                name: 'Studio',
                                                displayName: 'Studio',
                                                fields: {},
                                              },
                                              landscapeAssets: null,
                                              color: {
                                                id: '2837eae0-b631-4793-af88-1002a0986381',
                                                url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Mat-iridium-grey-metallic',
                                                name: 'Mat iridium grey metallic',
                                                displayName: 'Mat iridium grey metallic',
                                                fields: {
                                                  colorName: {
                                                    value: 'Mat iridium grey metallic',
                                                  },
                                                  detKey: {
                                                    value: 'gr23mat_iridium_grey_met__mat_morion_black__2_tone_',
                                                  },
                                                  hexValue: {
                                                    value: '#393339',
                                                  },
                                                },
                                              },
                                            },
                                          },
                                        },
                                        exteriorColors: [
                                          {
                                            colors: [
                                              {
                                                name: 'Mat iridium grey metallic',
                                                color: {
                                                  item: {
                                                    id: '2837eae0-b631-4793-af88-1002a0986381',
                                                    url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Mat-iridium-grey-metallic',
                                                    name: 'Mat iridium grey metallic',
                                                    displayName: 'Mat iridium grey metallic',
                                                    fields: {
                                                      colorName: {
                                                        value: 'Mat iridium grey metallic',
                                                      },
                                                      detKey: {
                                                        value: 'gr23mat_iridium_grey_met__mat_morion_black__2_tone_',
                                                      },
                                                      hexValue: {
                                                        value: '#393339',
                                                      },
                                                    },
                                                  },
                                                },
                                              },
                                            ],
                                          },
                                        ],
                                      },
                                    ],
                                  },
                                ],
                              },
                              {
                                detKey: {
                                  value: 'gl1800al',
                                },
                                detIdentifier: {
                                  value: '13314',
                                },
                                sotId: {
                                  value: '',
                                },
                                name: 'Gold Wing Tour',
                                trimName: {
                                  value: 'Gold Wing Tour',
                                },
                                primaryThumbnail: {
                                  item: {
                                    value: {
                                      src: 'https://psp-sit-01-dmm.psp.honda.ca/-/media/Brands/PSP/MC/H23_MC_GoldWing-Tour-AC-DCT-Airbag_Red_RGB_Model-Card_274x177.png?h=177&iar=0&w=274&rev=9e120b5f9a774034bff5c229b939d57a&hash=E862B7AC0FFCA668114D637237C8B2A5',
                                      alt: 'aaa',
                                      width: '274',
                                      height: '177',
                                    },
                                  },
                                },
                                defaultTransmission: {
                                  fields: {
                                    name: 'ABS',
                                    detKey: {
                                      value: '11743-Default',
                                    },
                                    detIdentifier: {
                                      value: '11743',
                                    },
                                    sotId: {
                                      value: '',
                                    },
                                    modelCode: {
                                      value: 'GL1800P',
                                    },
                                    defaultExteriorColor: {
                                      fields: {
                                        name: 'Candy ardent red',
                                        color: {
                                          fields: {
                                            detKey: {
                                              value: 'cd23candy_ardent_red__bordeaux_red_met__2_tone_',
                                            },
                                            detIdentifier: {
                                              value: '',
                                            },
                                            sotId: {
                                              value: '',
                                            },
                                          },
                                        },
                                      },
                                    },
                                  },
                                },
                                transmissions: [
                                  {
                                    items: [
                                      {
                                        detKey: {
                                          value: '11743-Default',
                                        },
                                        detIdentifier: {
                                          value: '11743',
                                        },
                                        sotId: {
                                          value: '',
                                        },
                                        name: 'ABS',
                                        transmissionName: {
                                          value: 'ABS',
                                        },
                                        modelCode: {
                                          value: 'GL1800P',
                                        },
                                        hidePriceAndFinance: {
                                          value: '',
                                        },
                                        defaultExteriorColor: {
                                          item: {
                                            id: 'b224c126-890d-4298-8f98-8903b5d71e6e',
                                            url: '/sitecore/Content/Web-Catalog/MC/ON-ROAD/Touring/2023/Gold-Wing/Gold-Wing-Tour/Transmissions/ABS/ExteriorColors/Candy-ardent-red',
                                            name: 'Candy ardent red',
                                            displayName: 'Candy ardent red',
                                            fields: {
                                              studioAssets: {
                                                id: '66d64235-d6d6-4aec-90f7-73ca46914046',
                                                url: '/sitecore/Media-Library/Brands/PSP/MC/Candyred',
                                                name: 'Candyred',
                                                displayName: 'Candyred',
                                                fields: {},
                                              },
                                              landscapeAssets: null,
                                              color: {
                                                id: '2540b2c3-5cb3-4885-a19b-b4cc987985bd',
                                                url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Candy-ardent-red',
                                                name: 'Candy ardent red',
                                                displayName: 'Candy ardent red',
                                                fields: {
                                                  colorName: {
                                                    value: 'Candy ardent red',
                                                  },
                                                  detKey: {
                                                    value: 'cd23candy_ardent_red__bordeaux_red_met__2_tone_',
                                                  },
                                                  hexValue: {
                                                    value: '#C61F2B',
                                                  },
                                                },
                                              },
                                            },
                                          },
                                        },
                                        exteriorColors: [
                                          {
                                            colors: [
                                              {
                                                name: 'Candy ardent red',
                                                color: {
                                                  item: {
                                                    id: '2540b2c3-5cb3-4885-a19b-b4cc987985bd',
                                                    url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Candy-ardent-red',
                                                    name: 'Candy ardent red',
                                                    displayName: 'Candy ardent red',
                                                    fields: {
                                                      colorName: {
                                                        value: 'Candy ardent red',
                                                      },
                                                      detKey: {
                                                        value: 'cd23candy_ardent_red__bordeaux_red_met__2_tone_',
                                                      },
                                                      hexValue: {
                                                        value: '#C61F2B',
                                                      },
                                                    },
                                                  },
                                                },
                                              },
                                              {
                                                name: 'Graphite Black',
                                                color: {
                                                  item: {
                                                    id: '8492faa3-fb74-46bc-8afd-91709f219736',
                                                    url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Graphite-Black',
                                                    name: 'Graphite Black',
                                                    displayName: 'Graphite Black',
                                                    fields: {
                                                      colorName: {
                                                        value: 'Graphite Black',
                                                      },
                                                      detKey: {
                                                        value: 'nh_b01_____graphite_black',
                                                      },
                                                      hexValue: {
                                                        value: '#27292B',
                                                      },
                                                    },
                                                  },
                                                },
                                              },
                                              {
                                                name: 'Pearl Glare White',
                                                color: {
                                                  item: {
                                                    id: '3ec284bf-386b-4a3b-8dc8-f1d1047408ac',
                                                    url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Pearl-Glare-White',
                                                    name: 'Pearl Glare White',
                                                    displayName: 'Pearl Glare White',
                                                    fields: {
                                                      colorName: {
                                                        value: 'Pearl Glare White',
                                                      },
                                                      detKey: {
                                                        value: '1061pearl_glare_white',
                                                      },
                                                      hexValue: {
                                                        value: '#EFF3F8',
                                                      },
                                                    },
                                                  },
                                                },
                                              },
                                              {
                                                name: 'Blue Dark Blue w Blue stripe',
                                                color: {
                                                  item: {
                                                    id: 'd2b6556c-5299-4a89-88dd-5da09781462e',
                                                    url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Blue-Dark-Blue-w-Blue-stripe',
                                                    name: 'Blue Dark Blue w Blue stripe',
                                                    displayName: 'Blue Dark Blue w Blue stripe',
                                                    fields: {
                                                      colorName: {
                                                        value: 'Blue / Dark Blue w/ Blue stripe',
                                                      },
                                                      detKey: {
                                                        value: 'b_197___pb_blue___dark_blue_w__blue_stripe',
                                                      },
                                                    },
                                                  },
                                                },
                                              },
                                            ],
                                          },
                                        ],
                                      },
                                    ],
                                  },
                                ],
                              },
                              {
                                detKey: {
                                  value: 'gl1800al',
                                },
                                detIdentifier: {
                                  value: '13315',
                                },
                                sotId: {
                                  value: '',
                                },
                                name: 'Gold Wing Tour DCT',
                                trimName: {
                                  value: 'Gold Wing Tour DCT',
                                },
                                primaryThumbnail: {
                                  item: {
                                    value: {
                                      src: 'https://psp-sit-01-dmm.psp.honda.ca/-/media/Brands/PSP/MC/NC750X_274x177-(1).png?h=177&iar=0&w=274&rev=bca9cec7206c4b64859c733a74cb4c49&hash=E688912A3EB31A31F7569E7EEAA06E80',
                                      alt: '',
                                      width: '274',
                                      height: '177',
                                    },
                                  },
                                },
                                defaultTransmission: {
                                  fields: {
                                    name: 'ABS',
                                    detKey: {
                                      value: '11744-Default',
                                    },
                                    detIdentifier: {
                                      value: '11744',
                                    },
                                    sotId: {
                                      value: '',
                                    },
                                    modelCode: {
                                      value: 'GL1800DP',
                                    },
                                    defaultExteriorColor: {
                                      fields: {
                                        name: 'Candy ardent red',
                                        color: {
                                          fields: {
                                            detKey: {
                                              value: 'cd23candy_ardent_red__bordeaux_red_met__2_tone_',
                                            },
                                            detIdentifier: {
                                              value: '',
                                            },
                                            sotId: {
                                              value: '',
                                            },
                                          },
                                        },
                                      },
                                    },
                                  },
                                },
                                transmissions: [
                                  {
                                    items: [
                                      {
                                        detKey: {
                                          value: '11744-Default',
                                        },
                                        detIdentifier: {
                                          value: '11744',
                                        },
                                        sotId: {
                                          value: '',
                                        },
                                        name: 'ABS',
                                        transmissionName: {
                                          value: 'ABS',
                                        },
                                        modelCode: {
                                          value: 'GL1800DP',
                                        },
                                        hidePriceAndFinance: {
                                          value: '',
                                        },
                                        defaultExteriorColor: {
                                          item: {
                                            id: '316f12d9-64d8-456b-b4e0-2b7c5f2c9a00',
                                            url: '/sitecore/Content/Web-Catalog/MC/ON-ROAD/Touring/2023/Gold-Wing/Gold-Wing-Tour-DCT/Transmissions/ABS/ExteriorColors/Candy-ardent-red',
                                            name: 'Candy ardent red',
                                            displayName: 'Candy ardent red',
                                            fields: {
                                              studioAssets: {
                                                id: '66d64235-d6d6-4aec-90f7-73ca46914046',
                                                url: '/sitecore/Media-Library/Brands/PSP/MC/Candyred',
                                                name: 'Candyred',
                                                displayName: 'Candyred',
                                                fields: {},
                                              },
                                              color: {
                                                id: '2540b2c3-5cb3-4885-a19b-b4cc987985bd',
                                                url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Candy-ardent-red',
                                                name: 'Candy ardent red',
                                                displayName: 'Candy ardent red',
                                                fields: {
                                                  colorName: {
                                                    value: 'Candy ardent red',
                                                  },
                                                  detKey: {
                                                    value: 'cd23candy_ardent_red__bordeaux_red_met__2_tone_',
                                                  },
                                                  hexValue: {
                                                    value: '#C61F2B',
                                                  },
                                                },
                                              },
                                            },
                                          },
                                        },
                                        exteriorColors: [
                                          {
                                            colors: [
                                              {
                                                name: 'Candy ardent red',
                                                color: {
                                                  item: {
                                                    id: '2540b2c3-5cb3-4885-a19b-b4cc987985bd',
                                                    url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Candy-ardent-red',
                                                    name: 'Candy ardent red',
                                                    displayName: 'Candy ardent red',
                                                    fields: {
                                                      colorName: {
                                                        value: 'Candy ardent red',
                                                      },
                                                      detKey: {
                                                        value: 'cd23candy_ardent_red__bordeaux_red_met__2_tone_',
                                                      },
                                                      hexValue: {
                                                        value: '#C61F2B',
                                                      },
                                                    },
                                                  },
                                                },
                                              },
                                            ],
                                          },
                                        ],
                                      },
                                    ],
                                  },
                                ],
                              },
                              {
                                detKey: {
                                  value: 'gl1800al',
                                },
                                detIdentifier: {
                                  value: '13316',
                                },
                                sotId: {
                                  value: '',
                                },
                                name: 'Gold Wing Tour DCT Airbag',
                                trimName: {
                                  value: 'Gold Wing Tour DCT Airbag',
                                },
                                primaryThumbnail: {
                                  item: {
                                    value: {
                                      src: 'https://psp-sit-01-dmm.psp.honda.ca/-/media/Brands/PSP/MC/NC750X_274x177-(1).png?h=177&iar=0&w=274&rev=bca9cec7206c4b64859c733a74cb4c49&hash=E688912A3EB31A31F7569E7EEAA06E80',
                                      alt: '',
                                      width: '274',
                                      height: '177',
                                    },
                                  },
                                },
                                defaultTransmission: {
                                  fields: {
                                    name: 'ABS',
                                    detKey: {
                                      value: '11741-Default',
                                    },
                                    detIdentifier: {
                                      value: '11741',
                                    },
                                    sotId: {
                                      value: '',
                                    },
                                    modelCode: {
                                      value: 'GL1800DAP',
                                    },
                                    defaultExteriorColor: {
                                      fields: {
                                        name: 'Candy ardent red',
                                        color: {
                                          fields: {
                                            detKey: {
                                              value: 'cd23candy_ardent_red__bordeaux_red_met__2_tone_',
                                            },
                                            detIdentifier: {
                                              value: '',
                                            },
                                            sotId: {
                                              value: '',
                                            },
                                          },
                                        },
                                      },
                                    },
                                  },
                                },
                                transmissions: [
                                  {
                                    items: [
                                      {
                                        detKey: {
                                          value: '11741-Default',
                                        },
                                        detIdentifier: {
                                          value: '11741',
                                        },
                                        sotId: {
                                          value: '',
                                        },
                                        name: 'ABS',
                                        transmissionName: {
                                          value: 'ABS',
                                        },
                                        modelCode: {
                                          value: 'GL1800DAP',
                                        },
                                        hidePriceAndFinance: {
                                          value: '',
                                        },
                                        defaultExteriorColor: {
                                          item: {
                                            id: '11423ac5-cd14-4ef4-9ce2-954310a38cc3',
                                            url: '/sitecore/Content/Web-Catalog/MC/ON-ROAD/Touring/2023/Gold-Wing/Gold-Wing-Tour-DCT-Airbag/Transmissions/ABS/ExteriorColors/Candy-ardent-red',
                                            name: 'Candy ardent red',
                                            displayName: 'Candy ardent red',
                                            fields: {
                                              studioAssets: {
                                                id: '66d64235-d6d6-4aec-90f7-73ca46914046',
                                                url: '/sitecore/Media-Library/Brands/PSP/MC/Candyred',
                                                name: 'Candyred',
                                                displayName: 'Candyred',
                                                fields: {},
                                              },
                                              color: {
                                                id: '2540b2c3-5cb3-4885-a19b-b4cc987985bd',
                                                url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Candy-ardent-red',
                                                name: 'Candy ardent red',
                                                displayName: 'Candy ardent red',
                                                fields: {
                                                  colorName: {
                                                    value: 'Candy ardent red',
                                                  },
                                                  detKey: {
                                                    value: 'cd23candy_ardent_red__bordeaux_red_met__2_tone_',
                                                  },
                                                  hexValue: {
                                                    value: '#C61F2B',
                                                  },
                                                },
                                              },
                                            },
                                          },
                                        },
                                        exteriorColors: [
                                          {
                                            colors: [
                                              {
                                                name: 'Candy ardent red',
                                                color: {
                                                  item: {
                                                    id: '2540b2c3-5cb3-4885-a19b-b4cc987985bd',
                                                    url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Candy-ardent-red',
                                                    name: 'Candy ardent red',
                                                    displayName: 'Candy ardent red',
                                                    fields: {
                                                      colorName: {
                                                        value: 'Candy ardent red',
                                                      },
                                                      detKey: {
                                                        value: 'cd23candy_ardent_red__bordeaux_red_met__2_tone_',
                                                      },
                                                      hexValue: {
                                                        value: '#C61F2B',
                                                      },
                                                    },
                                                  },
                                                },
                                              },
                                            ],
                                          },
                                        ],
                                      },
                                    ],
                                  },
                                ],
                              },
                            ],
                            modelKey: {
                              value: 'Touring',
                            },
                          },
                          {
                            detKey: {
                              value: '',
                            },
                            detIdentifier: {
                              value: '',
                            },
                            sotId: {
                              value: '',
                            },
                            year: {
                              value: '2022',
                            },
                            tagline: {
                              value: 'Touring',
                            },
                            modelYearPage: {
                              fields: null,
                            },
                            models: [
                              {
                                detKey: {
                                  value: 'gl1800al',
                                },
                                detIdentifier: {
                                  value: '',
                                },
                                sotId: {
                                  value: '',
                                },
                                name: 'Gold Wing',
                                modelName: {
                                  value: 'Gold Wing',
                                },
                                trims: [
                                  {
                                    detKey: {
                                      value: 'gold_wing_13274',
                                    },
                                    detIdentifier: {
                                      value: '13274',
                                    },
                                    sotId: {
                                      value: '',
                                    },
                                    name: 'Gold Wing',
                                    trimName: {
                                      value: 'Gold Wing',
                                    },
                                    primaryThumbnail: {
                                      item: {
                                        value: {},
                                      },
                                    },
                                    defaultTransmission: {
                                      fields: {
                                        name: 'ABS',
                                        detKey: {
                                          value: '11697-Default',
                                        },
                                        detIdentifier: {
                                          value: '11697',
                                        },
                                        sotId: {
                                          value: '',
                                        },
                                        modelCode: {
                                          value: 'GL1800BN',
                                        },
                                        defaultExteriorColor: {
                                          fields: {
                                            name: 'Mat Jeans Blue Pearl Morion Black w red highlights',
                                            color: {
                                              fields: {
                                                detKey: {
                                                  value: 'nh_a86mmat_ballistic_black_metallic',
                                                },
                                                detIdentifier: {
                                                  value: '',
                                                },
                                                sotId: {
                                                  value: '',
                                                },
                                              },
                                            },
                                          },
                                        },
                                      },
                                    },
                                    transmissions: [
                                      {
                                        items: [
                                          {
                                            detKey: {
                                              value: '11697-Default',
                                            },
                                            detIdentifier: {
                                              value: '11697',
                                            },
                                            sotId: {
                                              value: '',
                                            },
                                            name: 'ABS',
                                            transmissionName: {
                                              value: 'ABS',
                                            },
                                            modelCode: {
                                              value: 'GL1800BN',
                                            },
                                            hidePriceAndFinance: {
                                              value: '',
                                            },
                                            defaultExteriorColor: {
                                              item: {
                                                id: '0b28b6d7-cdee-47b9-9803-b97a5cda6c24',
                                                url: '/sitecore/Content/Web-Catalog/MC/ON-ROAD/Touring/2022/Gold-Wing/Gold-Wing/Transmissions/ABS/ExteriorColors/Mat-Jeans-Blue-Pearl-Morion-Black-w-red-highlights',
                                                name: 'Mat Jeans Blue Pearl Morion Black w red highlights',
                                                displayName: 'Mat Jeans Blue Pearl Morion Black w red highlights',
                                                fields: {
                                                  color: {
                                                    id: '72f2bf85-f085-49b8-bbfa-aaac61f32d22',
                                                    url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Mat-Ballistic-Black-Metallic',
                                                    name: 'Mat Ballistic Black Metallic',
                                                    displayName: 'Mat Ballistic Black Metallic',
                                                    fields: {
                                                      colorName: {
                                                        value: 'Mat Ballistic Black Metallic',
                                                      },
                                                      detKey: {
                                                        value: 'nh_a86mmat_ballistic_black_metallic',
                                                      },
                                                    },
                                                  },
                                                },
                                              },
                                            },
                                            exteriorColors: [
                                              {
                                                colors: [
                                                  {
                                                    name: 'Mat Jeans Blue Pearl Morion Black w red highlights',
                                                    color: {
                                                      item: {
                                                        id: '72f2bf85-f085-49b8-bbfa-aaac61f32d22',
                                                        url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Mat-Ballistic-Black-Metallic',
                                                        name: 'Mat Ballistic Black Metallic',
                                                        displayName: 'Mat Ballistic Black Metallic',
                                                        fields: {
                                                          colorName: {
                                                            value: 'Mat Ballistic Black Metallic',
                                                          },
                                                          detKey: {
                                                            value: 'nh_a86mmat_ballistic_black_metallic',
                                                          },
                                                        },
                                                      },
                                                    },
                                                  },
                                                ],
                                              },
                                            ],
                                          },
                                        ],
                                      },
                                    ],
                                  },
                                ],
                                trimName: {
                                  value: 'Gold Wing',
                                },
                                primaryThumbnail: {
                                  item: {
                                    value: {},
                                  },
                                },
                                secondaryThumbnail: {
                                  item: {
                                    value: {},
                                  },
                                },
                                specialVehicleType: {
                                  item: null,
                                },
                                nameBadge: {
                                  item: {
                                    value: {},
                                  },
                                },
                                defaultTransmission: {
                                  item: {},
                                },
                                bodyType: {
                                  item: [],
                                },
                                drivetrain: {
                                  item: [],
                                },
                                safety: {
                                  item: [],
                                },
                                interiorMaterial: {
                                  item: [],
                                },
                                designFeatures: {
                                  item: [],
                                },
                                wheels: {
                                  item: [],
                                },
                                entertainment: {
                                  item: [],
                                },
                                comfortConvenience: {
                                  item: [],
                                },
                                emissionRating: {
                                  value: '',
                                },
                                transmissions: [],
                              },
                              {
                                detKey: {
                                  value: 'gl1800al',
                                },
                                detIdentifier: {
                                  value: '',
                                },
                                sotId: {
                                  value: '',
                                },
                                name: 'Gold Wing DCT',
                                modelName: {
                                  value: 'Gold Wing DCT',
                                },
                                trims: [
                                  {
                                    detKey: {
                                      value: 'gold_wing_dct_13275',
                                    },
                                    detIdentifier: {
                                      value: '13275',
                                    },
                                    sotId: {
                                      value: '',
                                    },
                                    name: 'Gold Wing DCT',
                                    trimName: {
                                      value: 'Gold Wing DCT',
                                    },
                                    primaryThumbnail: {
                                      item: {
                                        value: {},
                                      },
                                    },
                                    defaultTransmission: {
                                      fields: {
                                        name: 'ABS',
                                        detKey: {
                                          value: '11698-Default',
                                        },
                                        detIdentifier: {
                                          value: '11698',
                                        },
                                        sotId: {
                                          value: '',
                                        },
                                        modelCode: {
                                          value: 'GL1800BDN',
                                        },
                                        defaultExteriorColor: {
                                          fields: {
                                            name: 'Mat Jeans Blue Pearl Morion Black w red highlights',
                                            color: {
                                              fields: {
                                                detKey: {
                                                  value:
                                                    'pb_417m___nmat_jeans_blue___pearl_morion_black_w_red_highlights',
                                                },
                                                detIdentifier: {
                                                  value: '',
                                                },
                                                sotId: {
                                                  value: '',
                                                },
                                              },
                                            },
                                          },
                                        },
                                      },
                                    },
                                    transmissions: [
                                      {
                                        items: [
                                          {
                                            detKey: {
                                              value: '11698-Default',
                                            },
                                            detIdentifier: {
                                              value: '11698',
                                            },
                                            sotId: {
                                              value: '',
                                            },
                                            name: 'ABS',
                                            transmissionName: {
                                              value: 'ABS',
                                            },
                                            modelCode: {
                                              value: 'GL1800BDN',
                                            },
                                            hidePriceAndFinance: {
                                              value: '',
                                            },
                                            defaultExteriorColor: {
                                              item: {
                                                id: '574d81ed-769e-4e55-ae8a-d48a56819d28',
                                                url: '/sitecore/Content/Web-Catalog/MC/ON-ROAD/Touring/2022/Gold-Wing-DCT/Gold-Wing-DCT/Transmissions/ABS/ExteriorColors/Mat-Jeans-Blue-Pearl-Morion-Black-w-red-highlights',
                                                name: 'Mat Jeans Blue Pearl Morion Black w red highlights',
                                                displayName: 'Mat Jeans Blue Pearl Morion Black w red highlights',
                                                fields: {
                                                  color: {
                                                    id: '8ab15857-da93-445d-8870-88c4d8de661c',
                                                    url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Mat-Jeans-Blue-Pearl-Morion-Black-w-red-highlights',
                                                    name: 'Mat Jeans Blue Pearl Morion Black w red highlights',
                                                    displayName: 'Mat Jeans Blue Pearl Morion Black w red highlights',
                                                    fields: {
                                                      colorName: {
                                                        value: 'Mat Jeans Blue / Pearl Morion Black w/red highlights',
                                                      },
                                                      detKey: {
                                                        value:
                                                          'pb_417m___nmat_jeans_blue___pearl_morion_black_w_red_highlights',
                                                      },
                                                    },
                                                  },
                                                },
                                              },
                                            },
                                            exteriorColors: [
                                              {
                                                colors: [
                                                  {
                                                    name: 'Mat Jeans Blue Pearl Morion Black w red highlights',
                                                    color: {
                                                      item: {
                                                        id: '8ab15857-da93-445d-8870-88c4d8de661c',
                                                        url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Mat-Jeans-Blue-Pearl-Morion-Black-w-red-highlights',
                                                        name: 'Mat Jeans Blue Pearl Morion Black w red highlights',
                                                        displayName:
                                                          'Mat Jeans Blue Pearl Morion Black w red highlights',
                                                        fields: {
                                                          colorName: {
                                                            value:
                                                              'Mat Jeans Blue / Pearl Morion Black w/red highlights',
                                                          },
                                                          detKey: {
                                                            value:
                                                              'pb_417m___nmat_jeans_blue___pearl_morion_black_w_red_highlights',
                                                          },
                                                        },
                                                      },
                                                    },
                                                  },
                                                ],
                                              },
                                            ],
                                          },
                                        ],
                                      },
                                    ],
                                  },
                                ],
                                trimName: {
                                  value: 'Gold Wing DCT',
                                },
                                primaryThumbnail: {
                                  item: {
                                    value: {},
                                  },
                                },
                                secondaryThumbnail: {
                                  item: {
                                    value: {},
                                  },
                                },
                                specialVehicleType: {
                                  item: null,
                                },
                                nameBadge: {
                                  item: {
                                    value: {},
                                  },
                                },
                                defaultTransmission: {
                                  item: {},
                                },
                                bodyType: {
                                  item: [],
                                },
                                drivetrain: {
                                  item: [],
                                },
                                safety: {
                                  item: [],
                                },
                                interiorMaterial: {
                                  item: [],
                                },
                                designFeatures: {
                                  item: [],
                                },
                                wheels: {
                                  item: [],
                                },
                                entertainment: {
                                  item: [],
                                },
                                comfortConvenience: {
                                  item: [],
                                },
                                emissionRating: {
                                  value: '',
                                },
                                transmissions: [],
                              },
                              {
                                detKey: {
                                  value: 'gl1800al',
                                },
                                detIdentifier: {
                                  value: '',
                                },
                                sotId: {
                                  value: '',
                                },
                                name: 'Gold Wing Tour',
                                modelName: {
                                  value: 'Gold Wing Tour',
                                },
                                trims: [
                                  {
                                    detKey: {
                                      value: 'gold_wing_tour_13276',
                                    },
                                    detIdentifier: {
                                      value: '13276',
                                    },
                                    sotId: {
                                      value: '',
                                    },
                                    name: 'Gold Wing Tour',
                                    trimName: {
                                      value: 'Gold Wing Tour',
                                    },
                                    primaryThumbnail: {
                                      item: {
                                        value: {},
                                      },
                                    },
                                    defaultTransmission: {
                                      fields: {
                                        name: 'ABS',
                                        detKey: {
                                          value: '11699-Default',
                                        },
                                        detIdentifier: {
                                          value: '11699',
                                        },
                                        sotId: {
                                          value: '',
                                        },
                                        modelCode: {
                                          value: 'GL1800N',
                                        },
                                        defaultExteriorColor: {
                                          fields: {
                                            name: 'Gunmetal Black Metallic',
                                            color: {
                                              fields: {
                                                detKey: {
                                                  value: 'gbgunmetal_black_metallic',
                                                },
                                                detIdentifier: {
                                                  value: '',
                                                },
                                                sotId: {
                                                  value: '',
                                                },
                                              },
                                            },
                                          },
                                        },
                                      },
                                    },
                                    transmissions: [
                                      {
                                        items: [
                                          {
                                            detKey: {
                                              value: '11699-Default',
                                            },
                                            detIdentifier: {
                                              value: '11699',
                                            },
                                            sotId: {
                                              value: '',
                                            },
                                            name: 'ABS',
                                            transmissionName: {
                                              value: 'ABS',
                                            },
                                            modelCode: {
                                              value: 'GL1800N',
                                            },
                                            hidePriceAndFinance: {
                                              value: '',
                                            },
                                            defaultExteriorColor: {
                                              item: {
                                                id: '145bd80a-9d5b-4688-b3fc-05c38a6578ab',
                                                url: '/sitecore/Content/Web-Catalog/MC/ON-ROAD/Touring/2022/Gold-Wing-Tour/Gold-Wing-Tour/Transmissions/ABS/ExteriorColors/Gunmetal-Black-Metallic',
                                                name: 'Gunmetal Black Metallic',
                                                displayName: 'Gunmetal Black Metallic',
                                                fields: {
                                                  color: {
                                                    id: '3c0dfa75-e78c-490c-8365-3028c529f6fb',
                                                    url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Gunmetal-Black-Metallic',
                                                    name: 'Gunmetal Black Metallic',
                                                    displayName: 'Gunmetal Black Metallic',
                                                    fields: {
                                                      colorName: {
                                                        value: 'Gunmetal Black Metallic',
                                                      },
                                                      detKey: {
                                                        value: 'gbgunmetal_black_metallic',
                                                      },
                                                      hexValue: {
                                                        value: '#1f262a',
                                                      },
                                                    },
                                                  },
                                                },
                                              },
                                            },
                                            exteriorColors: [
                                              {
                                                colors: [
                                                  {
                                                    name: 'Gunmetal Black Metallic',
                                                    color: {
                                                      item: {
                                                        id: '3c0dfa75-e78c-490c-8365-3028c529f6fb',
                                                        url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Gunmetal-Black-Metallic',
                                                        name: 'Gunmetal Black Metallic',
                                                        displayName: 'Gunmetal Black Metallic',
                                                        fields: {
                                                          colorName: {
                                                            value: 'Gunmetal Black Metallic',
                                                          },
                                                          detKey: {
                                                            value: 'gbgunmetal_black_metallic',
                                                          },
                                                          hexValue: {
                                                            value: '#1f262a',
                                                          },
                                                        },
                                                      },
                                                    },
                                                  },
                                                ],
                                              },
                                            ],
                                          },
                                        ],
                                      },
                                    ],
                                  },
                                ],
                                trimName: {
                                  value: 'Gold Wing Tour',
                                },
                                primaryThumbnail: {
                                  item: {
                                    value: {},
                                  },
                                },
                                secondaryThumbnail: {
                                  item: {
                                    value: {},
                                  },
                                },
                                specialVehicleType: {
                                  item: null,
                                },
                                nameBadge: {
                                  item: {
                                    value: {},
                                  },
                                },
                                defaultTransmission: {
                                  item: {},
                                },
                                bodyType: {
                                  item: [],
                                },
                                drivetrain: {
                                  item: [],
                                },
                                safety: {
                                  item: [],
                                },
                                interiorMaterial: {
                                  item: [],
                                },
                                designFeatures: {
                                  item: [],
                                },
                                wheels: {
                                  item: [],
                                },
                                entertainment: {
                                  item: [],
                                },
                                comfortConvenience: {
                                  item: [],
                                },
                                emissionRating: {
                                  value: '',
                                },
                                transmissions: [],
                              },
                              {
                                detKey: {
                                  value: 'gl1800al',
                                },
                                detIdentifier: {
                                  value: '',
                                },
                                sotId: {
                                  value: '',
                                },
                                name: 'Gold Wing Tour DCT',
                                modelName: {
                                  value: 'Gold Wing Tour DCT',
                                },
                                trims: [
                                  {
                                    detKey: {
                                      value: 'gold_wing_tour_dct_13277',
                                    },
                                    detIdentifier: {
                                      value: '13277',
                                    },
                                    sotId: {
                                      value: '',
                                    },
                                    name: 'Gold Wing Tour DCT',
                                    trimName: {
                                      value: 'Gold Wing Tour DCT',
                                    },
                                    primaryThumbnail: {
                                      item: {
                                        value: {},
                                      },
                                    },
                                    defaultTransmission: {
                                      fields: {
                                        name: 'ABS',
                                        detKey: {
                                          value: '11700-Default',
                                        },
                                        detIdentifier: {
                                          value: '11700',
                                        },
                                        sotId: {
                                          value: '',
                                        },
                                        modelCode: {
                                          value: 'GL1800DN',
                                        },
                                        defaultExteriorColor: {
                                          fields: {
                                            name: 'Gunmetal Black Metallic',
                                            color: {
                                              fields: {
                                                detKey: {
                                                  value: 'gbgunmetal_black_metallic',
                                                },
                                                detIdentifier: {
                                                  value: '',
                                                },
                                                sotId: {
                                                  value: '',
                                                },
                                              },
                                            },
                                          },
                                        },
                                      },
                                    },
                                    transmissions: [
                                      {
                                        items: [
                                          {
                                            detKey: {
                                              value: '11700-Default',
                                            },
                                            detIdentifier: {
                                              value: '11700',
                                            },
                                            sotId: {
                                              value: '',
                                            },
                                            name: 'ABS',
                                            transmissionName: {
                                              value: 'ABS',
                                            },
                                            modelCode: {
                                              value: 'GL1800DN',
                                            },
                                            hidePriceAndFinance: {
                                              value: '',
                                            },
                                            defaultExteriorColor: {
                                              item: {
                                                id: '0890aa57-d1d9-453a-8231-3b159a874038',
                                                url: '/sitecore/Content/Web-Catalog/MC/ON-ROAD/Touring/2022/Gold-Wing-Tour-DCT/Gold-Wing-Tour-DCT/Transmissions/ABS/ExteriorColors/Gunmetal-Black-Metallic',
                                                name: 'Gunmetal Black Metallic',
                                                displayName: 'Gunmetal Black Metallic',
                                                fields: {
                                                  color: {
                                                    id: '3c0dfa75-e78c-490c-8365-3028c529f6fb',
                                                    url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Gunmetal-Black-Metallic',
                                                    name: 'Gunmetal Black Metallic',
                                                    displayName: 'Gunmetal Black Metallic',
                                                    fields: {
                                                      colorName: {
                                                        value: 'Gunmetal Black Metallic',
                                                      },
                                                      detKey: {
                                                        value: 'gbgunmetal_black_metallic',
                                                      },
                                                      hexValue: {
                                                        value: '#1f262a',
                                                      },
                                                    },
                                                  },
                                                },
                                              },
                                            },
                                            exteriorColors: [
                                              {
                                                colors: [
                                                  {
                                                    name: 'Gunmetal Black Metallic',
                                                    color: {
                                                      item: {
                                                        id: '3c0dfa75-e78c-490c-8365-3028c529f6fb',
                                                        url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Gunmetal-Black-Metallic',
                                                        name: 'Gunmetal Black Metallic',
                                                        displayName: 'Gunmetal Black Metallic',
                                                        fields: {
                                                          colorName: {
                                                            value: 'Gunmetal Black Metallic',
                                                          },
                                                          detKey: {
                                                            value: 'gbgunmetal_black_metallic',
                                                          },
                                                          hexValue: {
                                                            value: '#1f262a',
                                                          },
                                                        },
                                                      },
                                                    },
                                                  },
                                                  {
                                                    name: 'Pearl Glare White',
                                                    color: {
                                                      item: {
                                                        id: '3ec284bf-386b-4a3b-8dc8-f1d1047408ac',
                                                        url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Pearl-Glare-White',
                                                        name: 'Pearl Glare White',
                                                        displayName: 'Pearl Glare White',
                                                        fields: {
                                                          colorName: {
                                                            value: 'Pearl Glare White',
                                                          },
                                                          detKey: {
                                                            value: '1061pearl_glare_white',
                                                          },
                                                          hexValue: {
                                                            value: '#EFF3F8',
                                                          },
                                                        },
                                                      },
                                                    },
                                                  },
                                                ],
                                              },
                                            ],
                                          },
                                        ],
                                      },
                                    ],
                                  },
                                ],
                                trimName: {
                                  value: 'Gold Wing Tour DCT',
                                },
                                primaryThumbnail: {
                                  item: {
                                    value: {},
                                  },
                                },
                                secondaryThumbnail: {
                                  item: {
                                    value: {},
                                  },
                                },
                                specialVehicleType: {
                                  item: null,
                                },
                                nameBadge: {
                                  item: {
                                    value: {},
                                  },
                                },
                                defaultTransmission: {
                                  item: {},
                                },
                                bodyType: {
                                  item: [],
                                },
                                drivetrain: {
                                  item: [],
                                },
                                safety: {
                                  item: [],
                                },
                                interiorMaterial: {
                                  item: [],
                                },
                                designFeatures: {
                                  item: [],
                                },
                                wheels: {
                                  item: [],
                                },
                                entertainment: {
                                  item: [],
                                },
                                comfortConvenience: {
                                  item: [],
                                },
                                emissionRating: {
                                  value: '',
                                },
                                transmissions: [],
                              },
                              {
                                detKey: {
                                  value: 'gl1800al',
                                },
                                detIdentifier: {
                                  value: '',
                                },
                                sotId: {
                                  value: '',
                                },
                                name: 'Gold Wing Tour DCT Airbag',
                                modelName: {
                                  value: 'Gold Wing Tour DCT Airbag',
                                },
                                trims: [
                                  {
                                    detKey: {
                                      value: 'gold_wing_tour_dct_airbag_13278',
                                    },
                                    detIdentifier: {
                                      value: '13278',
                                    },
                                    sotId: {
                                      value: '',
                                    },
                                    name: 'Gold Wing Tour DCT Airbag',
                                    trimName: {
                                      value: 'Gold Wing Tour DCT Airbag',
                                    },
                                    primaryThumbnail: {
                                      item: {
                                        value: {},
                                      },
                                    },
                                    defaultTransmission: {
                                      fields: {
                                        name: 'ABS',
                                        detKey: {
                                          value: '11701-Default',
                                        },
                                        detIdentifier: {
                                          value: '11701',
                                        },
                                        sotId: {
                                          value: '',
                                        },
                                        modelCode: {
                                          value: 'GL1800DAN',
                                        },
                                        defaultExteriorColor: {
                                          fields: {
                                            name: 'Blue Dark Blue w Blue stripe',
                                            color: {
                                              fields: {
                                                detKey: {
                                                  value: 'b_197___pb_blue___dark_blue_w__blue_stripe',
                                                },
                                                detIdentifier: {
                                                  value: '',
                                                },
                                                sotId: {
                                                  value: '',
                                                },
                                              },
                                            },
                                          },
                                        },
                                      },
                                    },
                                    transmissions: [
                                      {
                                        items: [
                                          {
                                            detKey: {
                                              value: '11701-Default',
                                            },
                                            detIdentifier: {
                                              value: '11701',
                                            },
                                            sotId: {
                                              value: '',
                                            },
                                            name: 'ABS',
                                            transmissionName: {
                                              value: 'ABS',
                                            },
                                            modelCode: {
                                              value: 'GL1800DAN',
                                            },
                                            hidePriceAndFinance: {
                                              value: '',
                                            },
                                            defaultExteriorColor: {
                                              item: {
                                                id: 'c78802c3-d275-47e8-906f-06f67c7190d7',
                                                url: '/sitecore/Content/Web-Catalog/MC/ON-ROAD/Touring/2022/Gold-Wing-Tour-DCT-Airbag/Gold-Wing-Tour-DCT-Airbag/Transmissions/ABS/ExteriorColors/Blue-Dark-Blue-w-Blue-stripe',
                                                name: 'Blue Dark Blue w Blue stripe',
                                                displayName: 'Blue Dark Blue w Blue stripe',
                                                fields: {
                                                  color: {
                                                    id: 'd2b6556c-5299-4a89-88dd-5da09781462e',
                                                    url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Blue-Dark-Blue-w-Blue-stripe',
                                                    name: 'Blue Dark Blue w Blue stripe',
                                                    displayName: 'Blue Dark Blue w Blue stripe',
                                                    fields: {
                                                      colorName: {
                                                        value: 'Blue / Dark Blue w/ Blue stripe',
                                                      },
                                                      detKey: {
                                                        value: 'b_197___pb_blue___dark_blue_w__blue_stripe',
                                                      },
                                                    },
                                                  },
                                                },
                                              },
                                            },
                                            exteriorColors: [
                                              {
                                                colors: [
                                                  {
                                                    name: 'Blue Dark Blue w Blue stripe',
                                                    color: {
                                                      item: {
                                                        id: 'd2b6556c-5299-4a89-88dd-5da09781462e',
                                                        url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Blue-Dark-Blue-w-Blue-stripe',
                                                        name: 'Blue Dark Blue w Blue stripe',
                                                        displayName: 'Blue Dark Blue w Blue stripe',
                                                        fields: {
                                                          colorName: {
                                                            value: 'Blue / Dark Blue w/ Blue stripe',
                                                          },
                                                          detKey: {
                                                            value: 'b_197___pb_blue___dark_blue_w__blue_stripe',
                                                          },
                                                        },
                                                      },
                                                    },
                                                  },
                                                ],
                                              },
                                            ],
                                          },
                                        ],
                                      },
                                    ],
                                  },
                                ],
                                trimName: {
                                  value: 'Gold Wing Tour DCT Airbag',
                                },
                                primaryThumbnail: {
                                  item: {
                                    value: {},
                                  },
                                },
                                secondaryThumbnail: {
                                  item: {
                                    value: {},
                                  },
                                },
                                specialVehicleType: {
                                  item: null,
                                },
                                nameBadge: {
                                  item: {
                                    value: {},
                                  },
                                },
                                defaultTransmission: {
                                  item: {},
                                },
                                bodyType: {
                                  item: [],
                                },
                                drivetrain: {
                                  item: [],
                                },
                                safety: {
                                  item: [],
                                },
                                interiorMaterial: {
                                  item: [],
                                },
                                designFeatures: {
                                  item: [],
                                },
                                wheels: {
                                  item: [],
                                },
                                entertainment: {
                                  item: [],
                                },
                                comfortConvenience: {
                                  item: [],
                                },
                                emissionRating: {
                                  value: '',
                                },
                                transmissions: [],
                              },
                            ],
                            trims: [
                              {
                                detKey: {
                                  value: 'gl1800al',
                                },
                                detIdentifier: {
                                  value: '13274',
                                },
                                sotId: {
                                  value: '',
                                },
                                name: 'Gold Wing',
                                trimName: {
                                  value: 'Gold Wing',
                                },
                                primaryThumbnail: {
                                  item: {
                                    value: {},
                                  },
                                },
                                defaultTransmission: {
                                  fields: {
                                    name: 'ABS',
                                    detKey: {
                                      value: '11697-Default',
                                    },
                                    detIdentifier: {
                                      value: '11697',
                                    },
                                    sotId: {
                                      value: '',
                                    },
                                    modelCode: {
                                      value: 'GL1800BN',
                                    },
                                    defaultExteriorColor: {
                                      fields: {
                                        name: 'Mat Jeans Blue Pearl Morion Black w red highlights',
                                        color: {
                                          fields: {
                                            detKey: {
                                              value: 'nh_a86mmat_ballistic_black_metallic',
                                            },
                                            detIdentifier: {
                                              value: '',
                                            },
                                            sotId: {
                                              value: '',
                                            },
                                          },
                                        },
                                      },
                                    },
                                  },
                                },
                                transmissions: [
                                  {
                                    items: [
                                      {
                                        detKey: {
                                          value: '11697-Default',
                                        },
                                        detIdentifier: {
                                          value: '11697',
                                        },
                                        sotId: {
                                          value: '',
                                        },
                                        name: 'ABS',
                                        transmissionName: {
                                          value: 'ABS',
                                        },
                                        modelCode: {
                                          value: 'GL1800BN',
                                        },
                                        hidePriceAndFinance: {
                                          value: '',
                                        },
                                        defaultExteriorColor: {
                                          item: {
                                            id: '0b28b6d7-cdee-47b9-9803-b97a5cda6c24',
                                            url: '/sitecore/Content/Web-Catalog/MC/ON-ROAD/Touring/2022/Gold-Wing/Gold-Wing/Transmissions/ABS/ExteriorColors/Mat-Jeans-Blue-Pearl-Morion-Black-w-red-highlights',
                                            name: 'Mat Jeans Blue Pearl Morion Black w red highlights',
                                            displayName: 'Mat Jeans Blue Pearl Morion Black w red highlights',
                                            fields: {
                                              color: {
                                                id: '72f2bf85-f085-49b8-bbfa-aaac61f32d22',
                                                url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Mat-Ballistic-Black-Metallic',
                                                name: 'Mat Ballistic Black Metallic',
                                                displayName: 'Mat Ballistic Black Metallic',
                                                fields: {
                                                  colorName: {
                                                    value: 'Mat Ballistic Black Metallic',
                                                  },
                                                  detKey: {
                                                    value: 'nh_a86mmat_ballistic_black_metallic',
                                                  },
                                                },
                                              },
                                            },
                                          },
                                        },
                                        exteriorColors: [
                                          {
                                            colors: [
                                              {
                                                name: 'Mat Jeans Blue Pearl Morion Black w red highlights',
                                                color: {
                                                  item: {
                                                    id: '72f2bf85-f085-49b8-bbfa-aaac61f32d22',
                                                    url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Mat-Ballistic-Black-Metallic',
                                                    name: 'Mat Ballistic Black Metallic',
                                                    displayName: 'Mat Ballistic Black Metallic',
                                                    fields: {
                                                      colorName: {
                                                        value: 'Mat Ballistic Black Metallic',
                                                      },
                                                      detKey: {
                                                        value: 'nh_a86mmat_ballistic_black_metallic',
                                                      },
                                                    },
                                                  },
                                                },
                                              },
                                            ],
                                          },
                                        ],
                                      },
                                    ],
                                  },
                                ],
                              },
                            ],
                            modelKey: {
                              value: 'Touring',
                            },
                          },
                        ],
                        modelName: {
                          value: 'Touring',
                        },
                        detKey: {
                          value: 'Touring',
                        },
                        detIdentifier: {
                          value: '',
                        },
                        sotId: {
                          value: '',
                        },
                        nameBadge: {
                          item: {
                            value: {},
                          },
                        },
                      },
                    },
                    model: {
                      fields: {
                        name: 'Touring',
                        categoryName: {
                          value: 'Touring',
                        },
                        vehicleType: {
                          name: 'ON-ROAD',
                          vehicleTypeName: {
                            value: 'On-Road',
                          },
                        },
                        defaultYear: {
                          fields: {
                            year: {
                              value: '',
                            },
                          },
                        },
                        modelYears: [
                          {
                            detKey: {
                              value: '',
                            },
                            detIdentifier: {
                              value: '',
                            },
                            sotId: {
                              value: '',
                            },
                            year: {
                              value: '2023',
                            },
                            tagline: {
                              value: 'Touring',
                            },
                            modelYearPage: {
                              fields: {
                                name: '2023',
                                url: '/en/Touring',
                                subPages: [
                                  {
                                    name: 'Accessories',
                                    url: '/en/Touring/Accessories',
                                  },
                                  {
                                    name: 'Specifications',
                                    url: '/en/Touring/Specifications',
                                  },
                                  {
                                    name: 'Trims',
                                    url: '/en/Touring/Trims',
                                  },
                                ],
                              },
                            },
                            models: [
                              {
                                detKey: {
                                  value: 'gl1800al',
                                },
                                detIdentifier: {
                                  value: '',
                                },
                                sotId: {
                                  value: '',
                                },
                                name: 'Gold Wing',
                                modelName: {
                                  value: 'Gold Wing',
                                },
                                trims: [
                                  {
                                    detKey: {
                                      value: 'gold_wing_dct_13313',
                                    },
                                    detIdentifier: {
                                      value: '13313',
                                    },
                                    sotId: {
                                      value: '',
                                    },
                                    name: 'Gold Wing DCT',
                                    trimName: {
                                      value: 'Gold Wing DCT',
                                    },
                                    primaryThumbnail: {
                                      item: {
                                        value: {
                                          src: 'https://psp-sit-01-dmm.psp.honda.ca/-/media/Brands/PSP/MC/H24_MC_Ruckus_Black_RGB_Model-Card_274x177.jpg?h=177&iar=0&w=274&rev=13da303bf3e349dca66e58f97d47b927&hash=A1937B6189A867767778AEFE172CC2F6',
                                          alt: '',
                                          width: '274',
                                          height: '177',
                                        },
                                      },
                                    },
                                    defaultTransmission: {
                                      fields: {
                                        name: 'ABS',
                                        detKey: {
                                          value: '11742-Default',
                                        },
                                        detIdentifier: {
                                          value: '11742',
                                        },
                                        sotId: {
                                          value: '',
                                        },
                                        modelCode: {
                                          value: 'GL1800BDP',
                                        },
                                        defaultExteriorColor: {
                                          fields: {
                                            name: 'Mat iridium grey metallic',
                                            color: {
                                              fields: {
                                                detKey: {
                                                  value: 'gr23mat_iridium_grey_met__mat_morion_black__2_tone_',
                                                },
                                                detIdentifier: {
                                                  value: '',
                                                },
                                                sotId: {
                                                  value: '',
                                                },
                                              },
                                            },
                                          },
                                        },
                                      },
                                    },
                                    transmissions: [
                                      {
                                        items: [
                                          {
                                            detKey: {
                                              value: '11742-Default',
                                            },
                                            detIdentifier: {
                                              value: '11742',
                                            },
                                            sotId: {
                                              value: '',
                                            },
                                            name: 'ABS',
                                            transmissionName: {
                                              value: 'ABS',
                                            },
                                            modelCode: {
                                              value: 'GL1800BDP',
                                            },
                                            hidePriceAndFinance: {
                                              value: '',
                                            },
                                            defaultExteriorColor: {
                                              item: {
                                                id: 'af65d53f-4c13-4435-9ed1-45600f01f30b',
                                                url: '/sitecore/Content/Web-Catalog/MC/ON-ROAD/Touring/2023/Gold-Wing/Gold-Wing-DCT/Transmissions/ABS/ExteriorColors/Mat-iridium-grey-metallic',
                                                name: 'Mat iridium grey metallic',
                                                displayName: 'Mat iridium grey metallic',
                                                fields: {
                                                  studioAssets: {
                                                    id: '625e7745-eff1-4360-89bb-e4324a7fc27c',
                                                    url: '/sitecore/Media-Library/Brands/PSP/MC/Irridium-grey-metallic',
                                                    name: 'Irridium-grey-metallic',
                                                    displayName: 'Irridium-grey-metallic',
                                                    fields: {},
                                                  },
                                                  color: {
                                                    id: '2837eae0-b631-4793-af88-1002a0986381',
                                                    url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Mat-iridium-grey-metallic',
                                                    name: 'Mat iridium grey metallic',
                                                    displayName: 'Mat iridium grey metallic',
                                                    fields: {
                                                      colorName: {
                                                        value: 'Mat iridium grey metallic',
                                                      },
                                                      detKey: {
                                                        value: 'gr23mat_iridium_grey_met__mat_morion_black__2_tone_',
                                                      },
                                                      hexValue: {
                                                        value: '#393339',
                                                      },
                                                    },
                                                  },
                                                },
                                              },
                                            },
                                            exteriorColors: [
                                              {
                                                colors: [
                                                  {
                                                    name: 'Mat iridium grey metallic',
                                                    color: {
                                                      item: {
                                                        id: '2837eae0-b631-4793-af88-1002a0986381',
                                                        url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Mat-iridium-grey-metallic',
                                                        name: 'Mat iridium grey metallic',
                                                        displayName: 'Mat iridium grey metallic',
                                                        fields: {
                                                          colorName: {
                                                            value: 'Mat iridium grey metallic',
                                                          },
                                                          detKey: {
                                                            value:
                                                              'gr23mat_iridium_grey_met__mat_morion_black__2_tone_',
                                                          },
                                                          hexValue: {
                                                            value: '#393339',
                                                          },
                                                        },
                                                      },
                                                    },
                                                  },
                                                ],
                                              },
                                            ],
                                          },
                                          {
                                            detKey: {
                                              value: '11742-Default',
                                            },
                                            detIdentifier: {
                                              value: '11742',
                                            },
                                            sotId: {
                                              value: '',
                                            },
                                            name: 'DCT',
                                            transmissionName: {
                                              value: 'Standard',
                                            },
                                            modelCode: {
                                              value: 'GL1800BDP',
                                            },
                                            hidePriceAndFinance: {
                                              value: '',
                                            },
                                            defaultExteriorColor: {
                                              item: {
                                                id: '0019e8a2-688b-4c17-aa3c-4bd5441929a7',
                                                url: '/sitecore/Content/Web-Catalog/MC/ON-ROAD/Touring/2023/Gold-Wing/Gold-Wing-DCT/Transmissions/DCT/ExteriorColors/Mat-iridium-grey-metallic',
                                                name: 'Mat iridium grey metallic',
                                                displayName: 'Mat iridium grey metallic',
                                                fields: {
                                                  color: {
                                                    id: '2837eae0-b631-4793-af88-1002a0986381',
                                                    url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Mat-iridium-grey-metallic',
                                                    name: 'Mat iridium grey metallic',
                                                    displayName: 'Mat iridium grey metallic',
                                                    fields: {
                                                      colorName: {
                                                        value: 'Mat iridium grey metallic',
                                                      },
                                                      detKey: {
                                                        value: 'gr23mat_iridium_grey_met__mat_morion_black__2_tone_',
                                                      },
                                                      hexValue: {
                                                        value: '#393339',
                                                      },
                                                    },
                                                  },
                                                },
                                              },
                                            },
                                            exteriorColors: [
                                              {
                                                colors: [
                                                  {
                                                    name: 'Mat iridium grey metallic',
                                                    color: {
                                                      item: {
                                                        id: '2837eae0-b631-4793-af88-1002a0986381',
                                                        url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Mat-iridium-grey-metallic',
                                                        name: 'Mat iridium grey metallic',
                                                        displayName: 'Mat iridium grey metallic',
                                                        fields: {
                                                          colorName: {
                                                            value: 'Mat iridium grey metallic',
                                                          },
                                                          detKey: {
                                                            value:
                                                              'gr23mat_iridium_grey_met__mat_morion_black__2_tone_',
                                                          },
                                                          hexValue: {
                                                            value: '#393339',
                                                          },
                                                        },
                                                      },
                                                    },
                                                  },
                                                ],
                                              },
                                            ],
                                          },
                                          {
                                            detKey: {
                                              value: '11742-Default',
                                            },
                                            detIdentifier: {
                                              value: '11742',
                                            },
                                            sotId: {
                                              value: '',
                                            },
                                            name: 'duplicate',
                                            transmissionName: {
                                              value: 'Manual',
                                            },
                                            modelCode: {
                                              value: 'GL1800BDP',
                                            },
                                            hidePriceAndFinance: {
                                              value: '',
                                            },
                                            defaultExteriorColor: {
                                              item: {
                                                id: 'f560e837-c1f9-40ab-a38d-f9b74e9f3304',
                                                url: '/sitecore/Content/Web-Catalog/MC/ON-ROAD/Touring/2023/Gold-Wing/Gold-Wing-DCT/Transmissions/Standard/ExteriorColors/Mat-iridium-grey-metallic',
                                                name: 'Mat iridium grey metallic',
                                                displayName: 'Mat iridium grey metallic',
                                                fields: {
                                                  color: {
                                                    id: '2837eae0-b631-4793-af88-1002a0986381',
                                                    url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Mat-iridium-grey-metallic',
                                                    name: 'Mat iridium grey metallic',
                                                    displayName: 'Mat iridium grey metallic',
                                                    fields: {
                                                      colorName: {
                                                        value: 'Mat iridium grey metallic',
                                                      },
                                                      detKey: {
                                                        value: 'gr23mat_iridium_grey_met__mat_morion_black__2_tone_',
                                                      },
                                                      hexValue: {
                                                        value: '#393339',
                                                      },
                                                    },
                                                  },
                                                },
                                              },
                                            },
                                            exteriorColors: [
                                              {
                                                colors: [],
                                              },
                                            ],
                                          },
                                          {
                                            detKey: {
                                              value: '11742-Default',
                                            },
                                            detIdentifier: {
                                              value: '11742',
                                            },
                                            sotId: {
                                              value: '',
                                            },
                                            name: 'Standard',
                                            transmissionName: {
                                              value: 'Type 4',
                                            },
                                            modelCode: {
                                              value: 'GL1800BDP',
                                            },
                                            hidePriceAndFinance: {
                                              value: '',
                                            },
                                            defaultExteriorColor: {
                                              item: {
                                                id: 'f560e837-c1f9-40ab-a38d-f9b74e9f3304',
                                                url: '/sitecore/Content/Web-Catalog/MC/ON-ROAD/Touring/2023/Gold-Wing/Gold-Wing-DCT/Transmissions/Standard/ExteriorColors/Mat-iridium-grey-metallic',
                                                name: 'Mat iridium grey metallic',
                                                displayName: 'Mat iridium grey metallic',
                                                fields: {
                                                  color: {
                                                    id: '2837eae0-b631-4793-af88-1002a0986381',
                                                    url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Mat-iridium-grey-metallic',
                                                    name: 'Mat iridium grey metallic',
                                                    displayName: 'Mat iridium grey metallic',
                                                    fields: {
                                                      colorName: {
                                                        value: 'Mat iridium grey metallic',
                                                      },
                                                      detKey: {
                                                        value: 'gr23mat_iridium_grey_met__mat_morion_black__2_tone_',
                                                      },
                                                      hexValue: {
                                                        value: '#393339',
                                                      },
                                                    },
                                                  },
                                                },
                                              },
                                            },
                                            exteriorColors: [
                                              {
                                                colors: [
                                                  {
                                                    name: 'Mat iridium grey metallic',
                                                    color: {
                                                      item: {
                                                        id: '2837eae0-b631-4793-af88-1002a0986381',
                                                        url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Mat-iridium-grey-metallic',
                                                        name: 'Mat iridium grey metallic',
                                                        displayName: 'Mat iridium grey metallic',
                                                        fields: {
                                                          colorName: {
                                                            value: 'Mat iridium grey metallic',
                                                          },
                                                          detKey: {
                                                            value:
                                                              'gr23mat_iridium_grey_met__mat_morion_black__2_tone_',
                                                          },
                                                          hexValue: {
                                                            value: '#393339',
                                                          },
                                                        },
                                                      },
                                                    },
                                                  },
                                                ],
                                              },
                                            ],
                                          },
                                          {
                                            detKey: {
                                              value: '11742-Default',
                                            },
                                            detIdentifier: {
                                              value: '11742',
                                            },
                                            sotId: {
                                              value: '',
                                            },
                                            name: 'type 5',
                                            transmissionName: {
                                              value: 'Type 5',
                                            },
                                            modelCode: {
                                              value: 'GL1800BDP',
                                            },
                                            hidePriceAndFinance: {
                                              value: '',
                                            },
                                            defaultExteriorColor: {
                                              item: {
                                                id: 'f560e837-c1f9-40ab-a38d-f9b74e9f3304',
                                                url: '/sitecore/Content/Web-Catalog/MC/ON-ROAD/Touring/2023/Gold-Wing/Gold-Wing-DCT/Transmissions/Standard/ExteriorColors/Mat-iridium-grey-metallic',
                                                name: 'Mat iridium grey metallic',
                                                displayName: 'Mat iridium grey metallic',
                                                fields: {
                                                  color: {
                                                    id: '2837eae0-b631-4793-af88-1002a0986381',
                                                    url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Mat-iridium-grey-metallic',
                                                    name: 'Mat iridium grey metallic',
                                                    displayName: 'Mat iridium grey metallic',
                                                    fields: {
                                                      colorName: {
                                                        value: 'Mat iridium grey metallic',
                                                      },
                                                      detKey: {
                                                        value: 'gr23mat_iridium_grey_met__mat_morion_black__2_tone_',
                                                      },
                                                      hexValue: {
                                                        value: '#393339',
                                                      },
                                                    },
                                                  },
                                                },
                                              },
                                            },
                                            exteriorColors: [
                                              {
                                                colors: [],
                                              },
                                            ],
                                          },
                                          {
                                            detKey: {
                                              value: '11742-Default',
                                            },
                                            detIdentifier: {
                                              value: '11742',
                                            },
                                            sotId: {
                                              value: '',
                                            },
                                            name: 'type 6',
                                            transmissionName: {
                                              value: 'Type 6',
                                            },
                                            modelCode: {
                                              value: 'GL1800BDP',
                                            },
                                            hidePriceAndFinance: {
                                              value: '',
                                            },
                                            defaultExteriorColor: {
                                              item: {
                                                id: 'f560e837-c1f9-40ab-a38d-f9b74e9f3304',
                                                url: '/sitecore/Content/Web-Catalog/MC/ON-ROAD/Touring/2023/Gold-Wing/Gold-Wing-DCT/Transmissions/Standard/ExteriorColors/Mat-iridium-grey-metallic',
                                                name: 'Mat iridium grey metallic',
                                                displayName: 'Mat iridium grey metallic',
                                                fields: {
                                                  color: {
                                                    id: '2837eae0-b631-4793-af88-1002a0986381',
                                                    url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Mat-iridium-grey-metallic',
                                                    name: 'Mat iridium grey metallic',
                                                    displayName: 'Mat iridium grey metallic',
                                                    fields: {
                                                      colorName: {
                                                        value: 'Mat iridium grey metallic',
                                                      },
                                                      detKey: {
                                                        value: 'gr23mat_iridium_grey_met__mat_morion_black__2_tone_',
                                                      },
                                                      hexValue: {
                                                        value: '#393339',
                                                      },
                                                    },
                                                  },
                                                },
                                              },
                                            },
                                            exteriorColors: [
                                              {
                                                colors: [],
                                              },
                                            ],
                                          },
                                        ],
                                      },
                                    ],
                                  },
                                  {
                                    detKey: {
                                      value: 'gold_wing_13312',
                                    },
                                    detIdentifier: {
                                      value: '13312',
                                    },
                                    sotId: {
                                      value: '',
                                    },
                                    name: 'Gold Wing E',
                                    trimName: {
                                      value: 'Gold Wing E',
                                    },
                                    primaryThumbnail: {
                                      item: {
                                        value: {
                                          src: 'https://psp-sit-01-dmm.psp.honda.ca/-/media/Brands/PSP/MC/H24_MC_Giorno_ATMOSPHERE-BLUE-METALLIC_RGB_Model-Card_274x177.jpg?h=177&iar=0&w=274&rev=472d0a04f9c541a3bf4162a2fbbe1132&hash=E6A0012713582747E2D9AA039C01B6D4',
                                          alt: '',
                                          width: '274',
                                          height: '177',
                                        },
                                      },
                                    },
                                    defaultTransmission: {
                                      fields: {
                                        name: 'ABS',
                                        detKey: {
                                          value: '11745-Default',
                                        },
                                        detIdentifier: {
                                          value: '11745',
                                        },
                                        sotId: {
                                          value: '',
                                        },
                                        modelCode: {
                                          value: 'GL1800BP',
                                        },
                                        defaultExteriorColor: {
                                          fields: {
                                            name: 'Mat iridium grey metallic',
                                            color: {
                                              fields: {
                                                detKey: {
                                                  value: 'gr23mat_iridium_grey_met__mat_morion_black__2_tone_',
                                                },
                                                detIdentifier: {
                                                  value: '',
                                                },
                                                sotId: {
                                                  value: '',
                                                },
                                              },
                                            },
                                          },
                                        },
                                      },
                                    },
                                    transmissions: [
                                      {
                                        items: [
                                          {
                                            detKey: {
                                              value: '11745-Default',
                                            },
                                            detIdentifier: {
                                              value: '11745',
                                            },
                                            sotId: {
                                              value: '',
                                            },
                                            name: 'ABS',
                                            transmissionName: {
                                              value: 'ABS',
                                            },
                                            modelCode: {
                                              value: 'GL1800BP',
                                            },
                                            hidePriceAndFinance: {
                                              value: '',
                                            },
                                            defaultExteriorColor: {
                                              item: {
                                                id: '62db5ade-688f-46a3-be56-4e2518005685',
                                                url: '/sitecore/Content/Web-Catalog/MC/ON-ROAD/Touring/2023/Gold-Wing/Gold-Wing-E/Transmissions/ABS/ExteriorColors/Mat-iridium-grey-metallic',
                                                name: 'Mat iridium grey metallic',
                                                displayName: 'Mat iridium grey metallic',
                                                fields: {
                                                  studioAssets: {
                                                    id: 'e6d46683-3b1e-4d72-ba64-f4d43eded5d6',
                                                    url: '/sitecore/Media-Library/Brands/PSP/MC/Studio',
                                                    name: 'Studio',
                                                    displayName: 'Studio',
                                                    fields: {},
                                                  },
                                                  landscapeAssets: null,
                                                  color: {
                                                    id: '2837eae0-b631-4793-af88-1002a0986381',
                                                    url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Mat-iridium-grey-metallic',
                                                    name: 'Mat iridium grey metallic',
                                                    displayName: 'Mat iridium grey metallic',
                                                    fields: {
                                                      colorName: {
                                                        value: 'Mat iridium grey metallic',
                                                      },
                                                      detKey: {
                                                        value: 'gr23mat_iridium_grey_met__mat_morion_black__2_tone_',
                                                      },
                                                      hexValue: {
                                                        value: '#393339',
                                                      },
                                                    },
                                                  },
                                                },
                                              },
                                            },
                                            exteriorColors: [
                                              {
                                                colors: [
                                                  {
                                                    name: 'Mat iridium grey metallic',
                                                    color: {
                                                      item: {
                                                        id: '2837eae0-b631-4793-af88-1002a0986381',
                                                        url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Mat-iridium-grey-metallic',
                                                        name: 'Mat iridium grey metallic',
                                                        displayName: 'Mat iridium grey metallic',
                                                        fields: {
                                                          colorName: {
                                                            value: 'Mat iridium grey metallic',
                                                          },
                                                          detKey: {
                                                            value:
                                                              'gr23mat_iridium_grey_met__mat_morion_black__2_tone_',
                                                          },
                                                          hexValue: {
                                                            value: '#393339',
                                                          },
                                                        },
                                                      },
                                                    },
                                                  },
                                                ],
                                              },
                                            ],
                                          },
                                        ],
                                      },
                                    ],
                                  },
                                  {
                                    detKey: {
                                      value: 'gold_wing_tour_13314',
                                    },
                                    detIdentifier: {
                                      value: '13314',
                                    },
                                    sotId: {
                                      value: '',
                                    },
                                    name: 'Gold Wing Tour',
                                    trimName: {
                                      value: 'Gold Wing Tour',
                                    },
                                    primaryThumbnail: {
                                      item: {
                                        value: {
                                          src: 'https://psp-sit-01-dmm.psp.honda.ca/-/media/Brands/PSP/MC/H23_MC_GoldWing-Tour-AC-DCT-Airbag_Red_RGB_Model-Card_274x177.png?h=177&iar=0&w=274&rev=9e120b5f9a774034bff5c229b939d57a&hash=E862B7AC0FFCA668114D637237C8B2A5',
                                          alt: 'aaa',
                                          width: '274',
                                          height: '177',
                                        },
                                      },
                                    },
                                    defaultTransmission: {
                                      fields: {
                                        name: 'ABS',
                                        detKey: {
                                          value: '11743-Default',
                                        },
                                        detIdentifier: {
                                          value: '11743',
                                        },
                                        sotId: {
                                          value: '',
                                        },
                                        modelCode: {
                                          value: 'GL1800P',
                                        },
                                        defaultExteriorColor: {
                                          fields: {
                                            name: 'Candy ardent red',
                                            color: {
                                              fields: {
                                                detKey: {
                                                  value: 'cd23candy_ardent_red__bordeaux_red_met__2_tone_',
                                                },
                                                detIdentifier: {
                                                  value: '',
                                                },
                                                sotId: {
                                                  value: '',
                                                },
                                              },
                                            },
                                          },
                                        },
                                      },
                                    },
                                    transmissions: [
                                      {
                                        items: [
                                          {
                                            detKey: {
                                              value: '11743-Default',
                                            },
                                            detIdentifier: {
                                              value: '11743',
                                            },
                                            sotId: {
                                              value: '',
                                            },
                                            name: 'ABS',
                                            transmissionName: {
                                              value: 'ABS',
                                            },
                                            modelCode: {
                                              value: 'GL1800P',
                                            },
                                            hidePriceAndFinance: {
                                              value: '',
                                            },
                                            defaultExteriorColor: {
                                              item: {
                                                id: 'b224c126-890d-4298-8f98-8903b5d71e6e',
                                                url: '/sitecore/Content/Web-Catalog/MC/ON-ROAD/Touring/2023/Gold-Wing/Gold-Wing-Tour/Transmissions/ABS/ExteriorColors/Candy-ardent-red',
                                                name: 'Candy ardent red',
                                                displayName: 'Candy ardent red',
                                                fields: {
                                                  studioAssets: {
                                                    id: '66d64235-d6d6-4aec-90f7-73ca46914046',
                                                    url: '/sitecore/Media-Library/Brands/PSP/MC/Candyred',
                                                    name: 'Candyred',
                                                    displayName: 'Candyred',
                                                    fields: {},
                                                  },
                                                  landscapeAssets: null,
                                                  color: {
                                                    id: '2540b2c3-5cb3-4885-a19b-b4cc987985bd',
                                                    url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Candy-ardent-red',
                                                    name: 'Candy ardent red',
                                                    displayName: 'Candy ardent red',
                                                    fields: {
                                                      colorName: {
                                                        value: 'Candy ardent red',
                                                      },
                                                      detKey: {
                                                        value: 'cd23candy_ardent_red__bordeaux_red_met__2_tone_',
                                                      },
                                                      hexValue: {
                                                        value: '#C61F2B',
                                                      },
                                                    },
                                                  },
                                                },
                                              },
                                            },
                                            exteriorColors: [
                                              {
                                                colors: [
                                                  {
                                                    name: 'Candy ardent red',
                                                    color: {
                                                      item: {
                                                        id: '2540b2c3-5cb3-4885-a19b-b4cc987985bd',
                                                        url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Candy-ardent-red',
                                                        name: 'Candy ardent red',
                                                        displayName: 'Candy ardent red',
                                                        fields: {
                                                          colorName: {
                                                            value: 'Candy ardent red',
                                                          },
                                                          detKey: {
                                                            value: 'cd23candy_ardent_red__bordeaux_red_met__2_tone_',
                                                          },
                                                          hexValue: {
                                                            value: '#C61F2B',
                                                          },
                                                        },
                                                      },
                                                    },
                                                  },
                                                  {
                                                    name: 'Graphite Black',
                                                    color: {
                                                      item: {
                                                        id: '8492faa3-fb74-46bc-8afd-91709f219736',
                                                        url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Graphite-Black',
                                                        name: 'Graphite Black',
                                                        displayName: 'Graphite Black',
                                                        fields: {
                                                          colorName: {
                                                            value: 'Graphite Black',
                                                          },
                                                          detKey: {
                                                            value: 'nh_b01_____graphite_black',
                                                          },
                                                          hexValue: {
                                                            value: '#27292B',
                                                          },
                                                        },
                                                      },
                                                    },
                                                  },
                                                  {
                                                    name: 'Pearl Glare White',
                                                    color: {
                                                      item: {
                                                        id: '3ec284bf-386b-4a3b-8dc8-f1d1047408ac',
                                                        url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Pearl-Glare-White',
                                                        name: 'Pearl Glare White',
                                                        displayName: 'Pearl Glare White',
                                                        fields: {
                                                          colorName: {
                                                            value: 'Pearl Glare White',
                                                          },
                                                          detKey: {
                                                            value: '1061pearl_glare_white',
                                                          },
                                                          hexValue: {
                                                            value: '#EFF3F8',
                                                          },
                                                        },
                                                      },
                                                    },
                                                  },
                                                  {
                                                    name: 'Blue Dark Blue w Blue stripe',
                                                    color: {
                                                      item: {
                                                        id: 'd2b6556c-5299-4a89-88dd-5da09781462e',
                                                        url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Blue-Dark-Blue-w-Blue-stripe',
                                                        name: 'Blue Dark Blue w Blue stripe',
                                                        displayName: 'Blue Dark Blue w Blue stripe',
                                                        fields: {
                                                          colorName: {
                                                            value: 'Blue / Dark Blue w/ Blue stripe',
                                                          },
                                                          detKey: {
                                                            value: 'b_197___pb_blue___dark_blue_w__blue_stripe',
                                                          },
                                                        },
                                                      },
                                                    },
                                                  },
                                                ],
                                              },
                                            ],
                                          },
                                        ],
                                      },
                                    ],
                                  },
                                  {
                                    detKey: {
                                      value: 'gold_wing_tour_dct_13315',
                                    },
                                    detIdentifier: {
                                      value: '13315',
                                    },
                                    sotId: {
                                      value: '',
                                    },
                                    name: 'Gold Wing Tour DCT',
                                    trimName: {
                                      value: 'Gold Wing Tour DCT',
                                    },
                                    primaryThumbnail: {
                                      item: {
                                        value: {
                                          src: 'https://psp-sit-01-dmm.psp.honda.ca/-/media/Brands/PSP/MC/NC750X_274x177-(1).png?h=177&iar=0&w=274&rev=bca9cec7206c4b64859c733a74cb4c49&hash=E688912A3EB31A31F7569E7EEAA06E80',
                                          alt: '',
                                          width: '274',
                                          height: '177',
                                        },
                                      },
                                    },
                                    defaultTransmission: {
                                      fields: {
                                        name: 'ABS',
                                        detKey: {
                                          value: '11744-Default',
                                        },
                                        detIdentifier: {
                                          value: '11744',
                                        },
                                        sotId: {
                                          value: '',
                                        },
                                        modelCode: {
                                          value: 'GL1800DP',
                                        },
                                        defaultExteriorColor: {
                                          fields: {
                                            name: 'Candy ardent red',
                                            color: {
                                              fields: {
                                                detKey: {
                                                  value: 'cd23candy_ardent_red__bordeaux_red_met__2_tone_',
                                                },
                                                detIdentifier: {
                                                  value: '',
                                                },
                                                sotId: {
                                                  value: '',
                                                },
                                              },
                                            },
                                          },
                                        },
                                      },
                                    },
                                    transmissions: [
                                      {
                                        items: [
                                          {
                                            detKey: {
                                              value: '11744-Default',
                                            },
                                            detIdentifier: {
                                              value: '11744',
                                            },
                                            sotId: {
                                              value: '',
                                            },
                                            name: 'ABS',
                                            transmissionName: {
                                              value: 'ABS',
                                            },
                                            modelCode: {
                                              value: 'GL1800DP',
                                            },
                                            hidePriceAndFinance: {
                                              value: '',
                                            },
                                            defaultExteriorColor: {
                                              item: {
                                                id: '316f12d9-64d8-456b-b4e0-2b7c5f2c9a00',
                                                url: '/sitecore/Content/Web-Catalog/MC/ON-ROAD/Touring/2023/Gold-Wing/Gold-Wing-Tour-DCT/Transmissions/ABS/ExteriorColors/Candy-ardent-red',
                                                name: 'Candy ardent red',
                                                displayName: 'Candy ardent red',
                                                fields: {
                                                  studioAssets: {
                                                    id: '66d64235-d6d6-4aec-90f7-73ca46914046',
                                                    url: '/sitecore/Media-Library/Brands/PSP/MC/Candyred',
                                                    name: 'Candyred',
                                                    displayName: 'Candyred',
                                                    fields: {},
                                                  },
                                                  color: {
                                                    id: '2540b2c3-5cb3-4885-a19b-b4cc987985bd',
                                                    url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Candy-ardent-red',
                                                    name: 'Candy ardent red',
                                                    displayName: 'Candy ardent red',
                                                    fields: {
                                                      colorName: {
                                                        value: 'Candy ardent red',
                                                      },
                                                      detKey: {
                                                        value: 'cd23candy_ardent_red__bordeaux_red_met__2_tone_',
                                                      },
                                                      hexValue: {
                                                        value: '#C61F2B',
                                                      },
                                                    },
                                                  },
                                                },
                                              },
                                            },
                                            exteriorColors: [
                                              {
                                                colors: [
                                                  {
                                                    name: 'Candy ardent red',
                                                    color: {
                                                      item: {
                                                        id: '2540b2c3-5cb3-4885-a19b-b4cc987985bd',
                                                        url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Candy-ardent-red',
                                                        name: 'Candy ardent red',
                                                        displayName: 'Candy ardent red',
                                                        fields: {
                                                          colorName: {
                                                            value: 'Candy ardent red',
                                                          },
                                                          detKey: {
                                                            value: 'cd23candy_ardent_red__bordeaux_red_met__2_tone_',
                                                          },
                                                          hexValue: {
                                                            value: '#C61F2B',
                                                          },
                                                        },
                                                      },
                                                    },
                                                  },
                                                ],
                                              },
                                            ],
                                          },
                                        ],
                                      },
                                    ],
                                  },
                                  {
                                    detKey: {
                                      value: 'gold_wing_tour_dct_airbag_13316',
                                    },
                                    detIdentifier: {
                                      value: '13316',
                                    },
                                    sotId: {
                                      value: '',
                                    },
                                    name: 'Gold Wing Tour DCT Airbag',
                                    trimName: {
                                      value: 'Gold Wing Tour DCT Airbag',
                                    },
                                    primaryThumbnail: {
                                      item: {
                                        value: {
                                          src: 'https://psp-sit-01-dmm.psp.honda.ca/-/media/Brands/PSP/MC/NC750X_274x177-(1).png?h=177&iar=0&w=274&rev=bca9cec7206c4b64859c733a74cb4c49&hash=E688912A3EB31A31F7569E7EEAA06E80',
                                          alt: '',
                                          width: '274',
                                          height: '177',
                                        },
                                      },
                                    },
                                    defaultTransmission: {
                                      fields: {
                                        name: 'ABS',
                                        detKey: {
                                          value: '11741-Default',
                                        },
                                        detIdentifier: {
                                          value: '11741',
                                        },
                                        sotId: {
                                          value: '',
                                        },
                                        modelCode: {
                                          value: 'GL1800DAP',
                                        },
                                        defaultExteriorColor: {
                                          fields: {
                                            name: 'Candy ardent red',
                                            color: {
                                              fields: {
                                                detKey: {
                                                  value: 'cd23candy_ardent_red__bordeaux_red_met__2_tone_',
                                                },
                                                detIdentifier: {
                                                  value: '',
                                                },
                                                sotId: {
                                                  value: '',
                                                },
                                              },
                                            },
                                          },
                                        },
                                      },
                                    },
                                    transmissions: [
                                      {
                                        items: [
                                          {
                                            detKey: {
                                              value: '11741-Default',
                                            },
                                            detIdentifier: {
                                              value: '11741',
                                            },
                                            sotId: {
                                              value: '',
                                            },
                                            name: 'ABS',
                                            transmissionName: {
                                              value: 'ABS',
                                            },
                                            modelCode: {
                                              value: 'GL1800DAP',
                                            },
                                            hidePriceAndFinance: {
                                              value: '',
                                            },
                                            defaultExteriorColor: {
                                              item: {
                                                id: '11423ac5-cd14-4ef4-9ce2-954310a38cc3',
                                                url: '/sitecore/Content/Web-Catalog/MC/ON-ROAD/Touring/2023/Gold-Wing/Gold-Wing-Tour-DCT-Airbag/Transmissions/ABS/ExteriorColors/Candy-ardent-red',
                                                name: 'Candy ardent red',
                                                displayName: 'Candy ardent red',
                                                fields: {
                                                  studioAssets: {
                                                    id: '66d64235-d6d6-4aec-90f7-73ca46914046',
                                                    url: '/sitecore/Media-Library/Brands/PSP/MC/Candyred',
                                                    name: 'Candyred',
                                                    displayName: 'Candyred',
                                                    fields: {},
                                                  },
                                                  color: {
                                                    id: '2540b2c3-5cb3-4885-a19b-b4cc987985bd',
                                                    url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Candy-ardent-red',
                                                    name: 'Candy ardent red',
                                                    displayName: 'Candy ardent red',
                                                    fields: {
                                                      colorName: {
                                                        value: 'Candy ardent red',
                                                      },
                                                      detKey: {
                                                        value: 'cd23candy_ardent_red__bordeaux_red_met__2_tone_',
                                                      },
                                                      hexValue: {
                                                        value: '#C61F2B',
                                                      },
                                                    },
                                                  },
                                                },
                                              },
                                            },
                                            exteriorColors: [
                                              {
                                                colors: [
                                                  {
                                                    name: 'Candy ardent red',
                                                    color: {
                                                      item: {
                                                        id: '2540b2c3-5cb3-4885-a19b-b4cc987985bd',
                                                        url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Candy-ardent-red',
                                                        name: 'Candy ardent red',
                                                        displayName: 'Candy ardent red',
                                                        fields: {
                                                          colorName: {
                                                            value: 'Candy ardent red',
                                                          },
                                                          detKey: {
                                                            value: 'cd23candy_ardent_red__bordeaux_red_met__2_tone_',
                                                          },
                                                          hexValue: {
                                                            value: '#C61F2B',
                                                          },
                                                        },
                                                      },
                                                    },
                                                  },
                                                ],
                                              },
                                            ],
                                          },
                                        ],
                                      },
                                    ],
                                  },
                                ],
                                trimName: {
                                  value: 'Gold Wing',
                                },
                                primaryThumbnail: {
                                  item: {
                                    value: {},
                                  },
                                },
                                secondaryThumbnail: {
                                  item: {
                                    value: {},
                                  },
                                },
                                specialVehicleType: {
                                  item: null,
                                },
                                nameBadge: {
                                  item: {
                                    value: {},
                                  },
                                },
                                defaultTransmission: {
                                  item: {},
                                },
                                bodyType: {
                                  item: [],
                                },
                                drivetrain: {
                                  item: [],
                                },
                                safety: {
                                  item: [],
                                },
                                interiorMaterial: {
                                  item: [],
                                },
                                designFeatures: {
                                  item: [],
                                },
                                wheels: {
                                  item: [],
                                },
                                entertainment: {
                                  item: [],
                                },
                                comfortConvenience: {
                                  item: [],
                                },
                                emissionRating: {
                                  value: '',
                                },
                                transmissions: [],
                              },
                            ],
                            trims: [
                              {
                                detKey: {
                                  value: 'gl1800al',
                                },
                                detIdentifier: {
                                  value: '13313',
                                },
                                sotId: {
                                  value: '',
                                },
                                name: 'Gold Wing DCT',
                                trimName: {
                                  value: 'Gold Wing DCT',
                                },
                                primaryThumbnail: {
                                  item: {
                                    value: {
                                      src: 'https://psp-sit-01-dmm.psp.honda.ca/-/media/Brands/PSP/MC/H24_MC_Ruckus_Black_RGB_Model-Card_274x177.jpg?h=177&iar=0&w=274&rev=13da303bf3e349dca66e58f97d47b927&hash=A1937B6189A867767778AEFE172CC2F6',
                                      alt: '',
                                      width: '274',
                                      height: '177',
                                    },
                                  },
                                },
                                defaultTransmission: {
                                  fields: {
                                    name: 'ABS',
                                    detKey: {
                                      value: '11742-Default',
                                    },
                                    detIdentifier: {
                                      value: '11742',
                                    },
                                    sotId: {
                                      value: '',
                                    },
                                    modelCode: {
                                      value: 'GL1800BDP',
                                    },
                                    defaultExteriorColor: {
                                      fields: {
                                        name: 'Mat iridium grey metallic',
                                        color: {
                                          fields: {
                                            detKey: {
                                              value: 'gr23mat_iridium_grey_met__mat_morion_black__2_tone_',
                                            },
                                            detIdentifier: {
                                              value: '',
                                            },
                                            sotId: {
                                              value: '',
                                            },
                                          },
                                        },
                                      },
                                    },
                                  },
                                },
                                transmissions: [
                                  {
                                    items: [
                                      {
                                        detKey: {
                                          value: '11742-Default',
                                        },
                                        detIdentifier: {
                                          value: '11742',
                                        },
                                        sotId: {
                                          value: '',
                                        },
                                        name: 'ABS',
                                        transmissionName: {
                                          value: 'ABS',
                                        },
                                        modelCode: {
                                          value: 'GL1800BDP',
                                        },
                                        hidePriceAndFinance: {
                                          value: '',
                                        },
                                        defaultExteriorColor: {
                                          item: {
                                            id: 'af65d53f-4c13-4435-9ed1-45600f01f30b',
                                            url: '/sitecore/Content/Web-Catalog/MC/ON-ROAD/Touring/2023/Gold-Wing/Gold-Wing-DCT/Transmissions/ABS/ExteriorColors/Mat-iridium-grey-metallic',
                                            name: 'Mat iridium grey metallic',
                                            displayName: 'Mat iridium grey metallic',
                                            fields: {
                                              studioAssets: {
                                                id: '625e7745-eff1-4360-89bb-e4324a7fc27c',
                                                url: '/sitecore/Media-Library/Brands/PSP/MC/Irridium-grey-metallic',
                                                name: 'Irridium-grey-metallic',
                                                displayName: 'Irridium-grey-metallic',
                                                fields: {},
                                              },
                                              color: {
                                                id: '2837eae0-b631-4793-af88-1002a0986381',
                                                url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Mat-iridium-grey-metallic',
                                                name: 'Mat iridium grey metallic',
                                                displayName: 'Mat iridium grey metallic',
                                                fields: {
                                                  colorName: {
                                                    value: 'Mat iridium grey metallic',
                                                  },
                                                  detKey: {
                                                    value: 'gr23mat_iridium_grey_met__mat_morion_black__2_tone_',
                                                  },
                                                  hexValue: {
                                                    value: '#393339',
                                                  },
                                                },
                                              },
                                            },
                                          },
                                        },
                                        exteriorColors: [
                                          {
                                            colors: [
                                              {
                                                name: 'Mat iridium grey metallic',
                                                color: {
                                                  item: {
                                                    id: '2837eae0-b631-4793-af88-1002a0986381',
                                                    url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Mat-iridium-grey-metallic',
                                                    name: 'Mat iridium grey metallic',
                                                    displayName: 'Mat iridium grey metallic',
                                                    fields: {
                                                      colorName: {
                                                        value: 'Mat iridium grey metallic',
                                                      },
                                                      detKey: {
                                                        value: 'gr23mat_iridium_grey_met__mat_morion_black__2_tone_',
                                                      },
                                                      hexValue: {
                                                        value: '#393339',
                                                      },
                                                    },
                                                  },
                                                },
                                              },
                                            ],
                                          },
                                        ],
                                      },
                                      {
                                        detKey: {
                                          value: '11742-Default',
                                        },
                                        detIdentifier: {
                                          value: '11742',
                                        },
                                        sotId: {
                                          value: '',
                                        },
                                        name: 'DCT',
                                        transmissionName: {
                                          value: 'Standard',
                                        },
                                        modelCode: {
                                          value: 'GL1800BDP',
                                        },
                                        hidePriceAndFinance: {
                                          value: '',
                                        },
                                        defaultExteriorColor: {
                                          item: {
                                            id: '0019e8a2-688b-4c17-aa3c-4bd5441929a7',
                                            url: '/sitecore/Content/Web-Catalog/MC/ON-ROAD/Touring/2023/Gold-Wing/Gold-Wing-DCT/Transmissions/DCT/ExteriorColors/Mat-iridium-grey-metallic',
                                            name: 'Mat iridium grey metallic',
                                            displayName: 'Mat iridium grey metallic',
                                            fields: {
                                              color: {
                                                id: '2837eae0-b631-4793-af88-1002a0986381',
                                                url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Mat-iridium-grey-metallic',
                                                name: 'Mat iridium grey metallic',
                                                displayName: 'Mat iridium grey metallic',
                                                fields: {
                                                  colorName: {
                                                    value: 'Mat iridium grey metallic',
                                                  },
                                                  detKey: {
                                                    value: 'gr23mat_iridium_grey_met__mat_morion_black__2_tone_',
                                                  },
                                                  hexValue: {
                                                    value: '#393339',
                                                  },
                                                },
                                              },
                                            },
                                          },
                                        },
                                        exteriorColors: [
                                          {
                                            colors: [
                                              {
                                                name: 'Mat iridium grey metallic',
                                                color: {
                                                  item: {
                                                    id: '2837eae0-b631-4793-af88-1002a0986381',
                                                    url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Mat-iridium-grey-metallic',
                                                    name: 'Mat iridium grey metallic',
                                                    displayName: 'Mat iridium grey metallic',
                                                    fields: {
                                                      colorName: {
                                                        value: 'Mat iridium grey metallic',
                                                      },
                                                      detKey: {
                                                        value: 'gr23mat_iridium_grey_met__mat_morion_black__2_tone_',
                                                      },
                                                      hexValue: {
                                                        value: '#393339',
                                                      },
                                                    },
                                                  },
                                                },
                                              },
                                            ],
                                          },
                                        ],
                                      },
                                      {
                                        detKey: {
                                          value: '11742-Default',
                                        },
                                        detIdentifier: {
                                          value: '11742',
                                        },
                                        sotId: {
                                          value: '',
                                        },
                                        name: 'duplicate',
                                        transmissionName: {
                                          value: 'Manual',
                                        },
                                        modelCode: {
                                          value: 'GL1800BDP',
                                        },
                                        hidePriceAndFinance: {
                                          value: '',
                                        },
                                        defaultExteriorColor: {
                                          item: {
                                            id: 'f560e837-c1f9-40ab-a38d-f9b74e9f3304',
                                            url: '/sitecore/Content/Web-Catalog/MC/ON-ROAD/Touring/2023/Gold-Wing/Gold-Wing-DCT/Transmissions/Standard/ExteriorColors/Mat-iridium-grey-metallic',
                                            name: 'Mat iridium grey metallic',
                                            displayName: 'Mat iridium grey metallic',
                                            fields: {
                                              color: {
                                                id: '2837eae0-b631-4793-af88-1002a0986381',
                                                url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Mat-iridium-grey-metallic',
                                                name: 'Mat iridium grey metallic',
                                                displayName: 'Mat iridium grey metallic',
                                                fields: {
                                                  colorName: {
                                                    value: 'Mat iridium grey metallic',
                                                  },
                                                  detKey: {
                                                    value: 'gr23mat_iridium_grey_met__mat_morion_black__2_tone_',
                                                  },
                                                  hexValue: {
                                                    value: '#393339',
                                                  },
                                                },
                                              },
                                            },
                                          },
                                        },
                                        exteriorColors: [
                                          {
                                            colors: [],
                                          },
                                        ],
                                      },
                                      {
                                        detKey: {
                                          value: '11742-Default',
                                        },
                                        detIdentifier: {
                                          value: '11742',
                                        },
                                        sotId: {
                                          value: '',
                                        },
                                        name: 'Standard',
                                        transmissionName: {
                                          value: 'Type 4',
                                        },
                                        modelCode: {
                                          value: 'GL1800BDP',
                                        },
                                        hidePriceAndFinance: {
                                          value: '',
                                        },
                                        defaultExteriorColor: {
                                          item: {
                                            id: 'f560e837-c1f9-40ab-a38d-f9b74e9f3304',
                                            url: '/sitecore/Content/Web-Catalog/MC/ON-ROAD/Touring/2023/Gold-Wing/Gold-Wing-DCT/Transmissions/Standard/ExteriorColors/Mat-iridium-grey-metallic',
                                            name: 'Mat iridium grey metallic',
                                            displayName: 'Mat iridium grey metallic',
                                            fields: {
                                              color: {
                                                id: '2837eae0-b631-4793-af88-1002a0986381',
                                                url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Mat-iridium-grey-metallic',
                                                name: 'Mat iridium grey metallic',
                                                displayName: 'Mat iridium grey metallic',
                                                fields: {
                                                  colorName: {
                                                    value: 'Mat iridium grey metallic',
                                                  },
                                                  detKey: {
                                                    value: 'gr23mat_iridium_grey_met__mat_morion_black__2_tone_',
                                                  },
                                                  hexValue: {
                                                    value: '#393339',
                                                  },
                                                },
                                              },
                                            },
                                          },
                                        },
                                        exteriorColors: [
                                          {
                                            colors: [
                                              {
                                                name: 'Mat iridium grey metallic',
                                                color: {
                                                  item: {
                                                    id: '2837eae0-b631-4793-af88-1002a0986381',
                                                    url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Mat-iridium-grey-metallic',
                                                    name: 'Mat iridium grey metallic',
                                                    displayName: 'Mat iridium grey metallic',
                                                    fields: {
                                                      colorName: {
                                                        value: 'Mat iridium grey metallic',
                                                      },
                                                      detKey: {
                                                        value: 'gr23mat_iridium_grey_met__mat_morion_black__2_tone_',
                                                      },
                                                      hexValue: {
                                                        value: '#393339',
                                                      },
                                                    },
                                                  },
                                                },
                                              },
                                            ],
                                          },
                                        ],
                                      },
                                      {
                                        detKey: {
                                          value: '11742-Default',
                                        },
                                        detIdentifier: {
                                          value: '11742',
                                        },
                                        sotId: {
                                          value: '',
                                        },
                                        name: 'type 5',
                                        transmissionName: {
                                          value: 'Type 5',
                                        },
                                        modelCode: {
                                          value: 'GL1800BDP',
                                        },
                                        hidePriceAndFinance: {
                                          value: '',
                                        },
                                        defaultExteriorColor: {
                                          item: {
                                            id: 'f560e837-c1f9-40ab-a38d-f9b74e9f3304',
                                            url: '/sitecore/Content/Web-Catalog/MC/ON-ROAD/Touring/2023/Gold-Wing/Gold-Wing-DCT/Transmissions/Standard/ExteriorColors/Mat-iridium-grey-metallic',
                                            name: 'Mat iridium grey metallic',
                                            displayName: 'Mat iridium grey metallic',
                                            fields: {
                                              color: {
                                                id: '2837eae0-b631-4793-af88-1002a0986381',
                                                url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Mat-iridium-grey-metallic',
                                                name: 'Mat iridium grey metallic',
                                                displayName: 'Mat iridium grey metallic',
                                                fields: {
                                                  colorName: {
                                                    value: 'Mat iridium grey metallic',
                                                  },
                                                  detKey: {
                                                    value: 'gr23mat_iridium_grey_met__mat_morion_black__2_tone_',
                                                  },
                                                  hexValue: {
                                                    value: '#393339',
                                                  },
                                                },
                                              },
                                            },
                                          },
                                        },
                                        exteriorColors: [
                                          {
                                            colors: [],
                                          },
                                        ],
                                      },
                                      {
                                        detKey: {
                                          value: '11742-Default',
                                        },
                                        detIdentifier: {
                                          value: '11742',
                                        },
                                        sotId: {
                                          value: '',
                                        },
                                        name: 'type 6',
                                        transmissionName: {
                                          value: 'Type 6',
                                        },
                                        modelCode: {
                                          value: 'GL1800BDP',
                                        },
                                        hidePriceAndFinance: {
                                          value: '',
                                        },
                                        defaultExteriorColor: {
                                          item: {
                                            id: 'f560e837-c1f9-40ab-a38d-f9b74e9f3304',
                                            url: '/sitecore/Content/Web-Catalog/MC/ON-ROAD/Touring/2023/Gold-Wing/Gold-Wing-DCT/Transmissions/Standard/ExteriorColors/Mat-iridium-grey-metallic',
                                            name: 'Mat iridium grey metallic',
                                            displayName: 'Mat iridium grey metallic',
                                            fields: {
                                              color: {
                                                id: '2837eae0-b631-4793-af88-1002a0986381',
                                                url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Mat-iridium-grey-metallic',
                                                name: 'Mat iridium grey metallic',
                                                displayName: 'Mat iridium grey metallic',
                                                fields: {
                                                  colorName: {
                                                    value: 'Mat iridium grey metallic',
                                                  },
                                                  detKey: {
                                                    value: 'gr23mat_iridium_grey_met__mat_morion_black__2_tone_',
                                                  },
                                                  hexValue: {
                                                    value: '#393339',
                                                  },
                                                },
                                              },
                                            },
                                          },
                                        },
                                        exteriorColors: [
                                          {
                                            colors: [],
                                          },
                                        ],
                                      },
                                    ],
                                  },
                                ],
                              },
                              {
                                detKey: {
                                  value: 'gl1800al',
                                },
                                detIdentifier: {
                                  value: '13312',
                                },
                                sotId: {
                                  value: '',
                                },
                                name: 'Gold Wing E',
                                trimName: {
                                  value: 'Gold Wing E',
                                },
                                primaryThumbnail: {
                                  item: {
                                    value: {
                                      src: 'https://psp-sit-01-dmm.psp.honda.ca/-/media/Brands/PSP/MC/H24_MC_Giorno_ATMOSPHERE-BLUE-METALLIC_RGB_Model-Card_274x177.jpg?h=177&iar=0&w=274&rev=472d0a04f9c541a3bf4162a2fbbe1132&hash=E6A0012713582747E2D9AA039C01B6D4',
                                      alt: '',
                                      width: '274',
                                      height: '177',
                                    },
                                  },
                                },
                                defaultTransmission: {
                                  fields: {
                                    name: 'ABS',
                                    detKey: {
                                      value: '11745-Default',
                                    },
                                    detIdentifier: {
                                      value: '11745',
                                    },
                                    sotId: {
                                      value: '',
                                    },
                                    modelCode: {
                                      value: 'GL1800BP',
                                    },
                                    defaultExteriorColor: {
                                      fields: {
                                        name: 'Mat iridium grey metallic',
                                        color: {
                                          fields: {
                                            detKey: {
                                              value: 'gr23mat_iridium_grey_met__mat_morion_black__2_tone_',
                                            },
                                            detIdentifier: {
                                              value: '',
                                            },
                                            sotId: {
                                              value: '',
                                            },
                                          },
                                        },
                                      },
                                    },
                                  },
                                },
                                transmissions: [
                                  {
                                    items: [
                                      {
                                        detKey: {
                                          value: '11745-Default',
                                        },
                                        detIdentifier: {
                                          value: '11745',
                                        },
                                        sotId: {
                                          value: '',
                                        },
                                        name: 'ABS',
                                        transmissionName: {
                                          value: 'ABS',
                                        },
                                        modelCode: {
                                          value: 'GL1800BP',
                                        },
                                        hidePriceAndFinance: {
                                          value: '',
                                        },
                                        defaultExteriorColor: {
                                          item: {
                                            id: '62db5ade-688f-46a3-be56-4e2518005685',
                                            url: '/sitecore/Content/Web-Catalog/MC/ON-ROAD/Touring/2023/Gold-Wing/Gold-Wing-E/Transmissions/ABS/ExteriorColors/Mat-iridium-grey-metallic',
                                            name: 'Mat iridium grey metallic',
                                            displayName: 'Mat iridium grey metallic',
                                            fields: {
                                              studioAssets: {
                                                id: 'e6d46683-3b1e-4d72-ba64-f4d43eded5d6',
                                                url: '/sitecore/Media-Library/Brands/PSP/MC/Studio',
                                                name: 'Studio',
                                                displayName: 'Studio',
                                                fields: {},
                                              },
                                              landscapeAssets: null,
                                              color: {
                                                id: '2837eae0-b631-4793-af88-1002a0986381',
                                                url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Mat-iridium-grey-metallic',
                                                name: 'Mat iridium grey metallic',
                                                displayName: 'Mat iridium grey metallic',
                                                fields: {
                                                  colorName: {
                                                    value: 'Mat iridium grey metallic',
                                                  },
                                                  detKey: {
                                                    value: 'gr23mat_iridium_grey_met__mat_morion_black__2_tone_',
                                                  },
                                                  hexValue: {
                                                    value: '#393339',
                                                  },
                                                },
                                              },
                                            },
                                          },
                                        },
                                        exteriorColors: [
                                          {
                                            colors: [
                                              {
                                                name: 'Mat iridium grey metallic',
                                                color: {
                                                  item: {
                                                    id: '2837eae0-b631-4793-af88-1002a0986381',
                                                    url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Mat-iridium-grey-metallic',
                                                    name: 'Mat iridium grey metallic',
                                                    displayName: 'Mat iridium grey metallic',
                                                    fields: {
                                                      colorName: {
                                                        value: 'Mat iridium grey metallic',
                                                      },
                                                      detKey: {
                                                        value: 'gr23mat_iridium_grey_met__mat_morion_black__2_tone_',
                                                      },
                                                      hexValue: {
                                                        value: '#393339',
                                                      },
                                                    },
                                                  },
                                                },
                                              },
                                            ],
                                          },
                                        ],
                                      },
                                    ],
                                  },
                                ],
                              },
                              {
                                detKey: {
                                  value: 'gl1800al',
                                },
                                detIdentifier: {
                                  value: '13314',
                                },
                                sotId: {
                                  value: '',
                                },
                                name: 'Gold Wing Tour',
                                trimName: {
                                  value: 'Gold Wing Tour',
                                },
                                primaryThumbnail: {
                                  item: {
                                    value: {
                                      src: 'https://psp-sit-01-dmm.psp.honda.ca/-/media/Brands/PSP/MC/H23_MC_GoldWing-Tour-AC-DCT-Airbag_Red_RGB_Model-Card_274x177.png?h=177&iar=0&w=274&rev=9e120b5f9a774034bff5c229b939d57a&hash=E862B7AC0FFCA668114D637237C8B2A5',
                                      alt: 'aaa',
                                      width: '274',
                                      height: '177',
                                    },
                                  },
                                },
                                defaultTransmission: {
                                  fields: {
                                    name: 'ABS',
                                    detKey: {
                                      value: '11743-Default',
                                    },
                                    detIdentifier: {
                                      value: '11743',
                                    },
                                    sotId: {
                                      value: '',
                                    },
                                    modelCode: {
                                      value: 'GL1800P',
                                    },
                                    defaultExteriorColor: {
                                      fields: {
                                        name: 'Candy ardent red',
                                        color: {
                                          fields: {
                                            detKey: {
                                              value: 'cd23candy_ardent_red__bordeaux_red_met__2_tone_',
                                            },
                                            detIdentifier: {
                                              value: '',
                                            },
                                            sotId: {
                                              value: '',
                                            },
                                          },
                                        },
                                      },
                                    },
                                  },
                                },
                                transmissions: [
                                  {
                                    items: [
                                      {
                                        detKey: {
                                          value: '11743-Default',
                                        },
                                        detIdentifier: {
                                          value: '11743',
                                        },
                                        sotId: {
                                          value: '',
                                        },
                                        name: 'ABS',
                                        transmissionName: {
                                          value: 'ABS',
                                        },
                                        modelCode: {
                                          value: 'GL1800P',
                                        },
                                        hidePriceAndFinance: {
                                          value: '',
                                        },
                                        defaultExteriorColor: {
                                          item: {
                                            id: 'b224c126-890d-4298-8f98-8903b5d71e6e',
                                            url: '/sitecore/Content/Web-Catalog/MC/ON-ROAD/Touring/2023/Gold-Wing/Gold-Wing-Tour/Transmissions/ABS/ExteriorColors/Candy-ardent-red',
                                            name: 'Candy ardent red',
                                            displayName: 'Candy ardent red',
                                            fields: {
                                              studioAssets: {
                                                id: '66d64235-d6d6-4aec-90f7-73ca46914046',
                                                url: '/sitecore/Media-Library/Brands/PSP/MC/Candyred',
                                                name: 'Candyred',
                                                displayName: 'Candyred',
                                                fields: {},
                                              },
                                              landscapeAssets: null,
                                              color: {
                                                id: '2540b2c3-5cb3-4885-a19b-b4cc987985bd',
                                                url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Candy-ardent-red',
                                                name: 'Candy ardent red',
                                                displayName: 'Candy ardent red',
                                                fields: {
                                                  colorName: {
                                                    value: 'Candy ardent red',
                                                  },
                                                  detKey: {
                                                    value: 'cd23candy_ardent_red__bordeaux_red_met__2_tone_',
                                                  },
                                                  hexValue: {
                                                    value: '#C61F2B',
                                                  },
                                                },
                                              },
                                            },
                                          },
                                        },
                                        exteriorColors: [
                                          {
                                            colors: [
                                              {
                                                name: 'Candy ardent red',
                                                color: {
                                                  item: {
                                                    id: '2540b2c3-5cb3-4885-a19b-b4cc987985bd',
                                                    url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Candy-ardent-red',
                                                    name: 'Candy ardent red',
                                                    displayName: 'Candy ardent red',
                                                    fields: {
                                                      colorName: {
                                                        value: 'Candy ardent red',
                                                      },
                                                      detKey: {
                                                        value: 'cd23candy_ardent_red__bordeaux_red_met__2_tone_',
                                                      },
                                                      hexValue: {
                                                        value: '#C61F2B',
                                                      },
                                                    },
                                                  },
                                                },
                                              },
                                              {
                                                name: 'Graphite Black',
                                                color: {
                                                  item: {
                                                    id: '8492faa3-fb74-46bc-8afd-91709f219736',
                                                    url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Graphite-Black',
                                                    name: 'Graphite Black',
                                                    displayName: 'Graphite Black',
                                                    fields: {
                                                      colorName: {
                                                        value: 'Graphite Black',
                                                      },
                                                      detKey: {
                                                        value: 'nh_b01_____graphite_black',
                                                      },
                                                      hexValue: {
                                                        value: '#27292B',
                                                      },
                                                    },
                                                  },
                                                },
                                              },
                                              {
                                                name: 'Pearl Glare White',
                                                color: {
                                                  item: {
                                                    id: '3ec284bf-386b-4a3b-8dc8-f1d1047408ac',
                                                    url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Pearl-Glare-White',
                                                    name: 'Pearl Glare White',
                                                    displayName: 'Pearl Glare White',
                                                    fields: {
                                                      colorName: {
                                                        value: 'Pearl Glare White',
                                                      },
                                                      detKey: {
                                                        value: '1061pearl_glare_white',
                                                      },
                                                      hexValue: {
                                                        value: '#EFF3F8',
                                                      },
                                                    },
                                                  },
                                                },
                                              },
                                              {
                                                name: 'Blue Dark Blue w Blue stripe',
                                                color: {
                                                  item: {
                                                    id: 'd2b6556c-5299-4a89-88dd-5da09781462e',
                                                    url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Blue-Dark-Blue-w-Blue-stripe',
                                                    name: 'Blue Dark Blue w Blue stripe',
                                                    displayName: 'Blue Dark Blue w Blue stripe',
                                                    fields: {
                                                      colorName: {
                                                        value: 'Blue / Dark Blue w/ Blue stripe',
                                                      },
                                                      detKey: {
                                                        value: 'b_197___pb_blue___dark_blue_w__blue_stripe',
                                                      },
                                                    },
                                                  },
                                                },
                                              },
                                            ],
                                          },
                                        ],
                                      },
                                    ],
                                  },
                                ],
                              },
                              {
                                detKey: {
                                  value: 'gl1800al',
                                },
                                detIdentifier: {
                                  value: '13315',
                                },
                                sotId: {
                                  value: '',
                                },
                                name: 'Gold Wing Tour DCT',
                                trimName: {
                                  value: 'Gold Wing Tour DCT',
                                },
                                primaryThumbnail: {
                                  item: {
                                    value: {
                                      src: 'https://psp-sit-01-dmm.psp.honda.ca/-/media/Brands/PSP/MC/NC750X_274x177-(1).png?h=177&iar=0&w=274&rev=bca9cec7206c4b64859c733a74cb4c49&hash=E688912A3EB31A31F7569E7EEAA06E80',
                                      alt: '',
                                      width: '274',
                                      height: '177',
                                    },
                                  },
                                },
                                defaultTransmission: {
                                  fields: {
                                    name: 'ABS',
                                    detKey: {
                                      value: '11744-Default',
                                    },
                                    detIdentifier: {
                                      value: '11744',
                                    },
                                    sotId: {
                                      value: '',
                                    },
                                    modelCode: {
                                      value: 'GL1800DP',
                                    },
                                    defaultExteriorColor: {
                                      fields: {
                                        name: 'Candy ardent red',
                                        color: {
                                          fields: {
                                            detKey: {
                                              value: 'cd23candy_ardent_red__bordeaux_red_met__2_tone_',
                                            },
                                            detIdentifier: {
                                              value: '',
                                            },
                                            sotId: {
                                              value: '',
                                            },
                                          },
                                        },
                                      },
                                    },
                                  },
                                },
                                transmissions: [
                                  {
                                    items: [
                                      {
                                        detKey: {
                                          value: '11744-Default',
                                        },
                                        detIdentifier: {
                                          value: '11744',
                                        },
                                        sotId: {
                                          value: '',
                                        },
                                        name: 'ABS',
                                        transmissionName: {
                                          value: 'ABS',
                                        },
                                        modelCode: {
                                          value: 'GL1800DP',
                                        },
                                        hidePriceAndFinance: {
                                          value: '',
                                        },
                                        defaultExteriorColor: {
                                          item: {
                                            id: '316f12d9-64d8-456b-b4e0-2b7c5f2c9a00',
                                            url: '/sitecore/Content/Web-Catalog/MC/ON-ROAD/Touring/2023/Gold-Wing/Gold-Wing-Tour-DCT/Transmissions/ABS/ExteriorColors/Candy-ardent-red',
                                            name: 'Candy ardent red',
                                            displayName: 'Candy ardent red',
                                            fields: {
                                              studioAssets: {
                                                id: '66d64235-d6d6-4aec-90f7-73ca46914046',
                                                url: '/sitecore/Media-Library/Brands/PSP/MC/Candyred',
                                                name: 'Candyred',
                                                displayName: 'Candyred',
                                                fields: {},
                                              },
                                              color: {
                                                id: '2540b2c3-5cb3-4885-a19b-b4cc987985bd',
                                                url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Candy-ardent-red',
                                                name: 'Candy ardent red',
                                                displayName: 'Candy ardent red',
                                                fields: {
                                                  colorName: {
                                                    value: 'Candy ardent red',
                                                  },
                                                  detKey: {
                                                    value: 'cd23candy_ardent_red__bordeaux_red_met__2_tone_',
                                                  },
                                                  hexValue: {
                                                    value: '#C61F2B',
                                                  },
                                                },
                                              },
                                            },
                                          },
                                        },
                                        exteriorColors: [
                                          {
                                            colors: [
                                              {
                                                name: 'Candy ardent red',
                                                color: {
                                                  item: {
                                                    id: '2540b2c3-5cb3-4885-a19b-b4cc987985bd',
                                                    url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Candy-ardent-red',
                                                    name: 'Candy ardent red',
                                                    displayName: 'Candy ardent red',
                                                    fields: {
                                                      colorName: {
                                                        value: 'Candy ardent red',
                                                      },
                                                      detKey: {
                                                        value: 'cd23candy_ardent_red__bordeaux_red_met__2_tone_',
                                                      },
                                                      hexValue: {
                                                        value: '#C61F2B',
                                                      },
                                                    },
                                                  },
                                                },
                                              },
                                            ],
                                          },
                                        ],
                                      },
                                    ],
                                  },
                                ],
                              },
                              {
                                detKey: {
                                  value: 'gl1800al',
                                },
                                detIdentifier: {
                                  value: '13316',
                                },
                                sotId: {
                                  value: '',
                                },
                                name: 'Gold Wing Tour DCT Airbag',
                                trimName: {
                                  value: 'Gold Wing Tour DCT Airbag',
                                },
                                primaryThumbnail: {
                                  item: {
                                    value: {
                                      src: 'https://psp-sit-01-dmm.psp.honda.ca/-/media/Brands/PSP/MC/NC750X_274x177-(1).png?h=177&iar=0&w=274&rev=bca9cec7206c4b64859c733a74cb4c49&hash=E688912A3EB31A31F7569E7EEAA06E80',
                                      alt: '',
                                      width: '274',
                                      height: '177',
                                    },
                                  },
                                },
                                defaultTransmission: {
                                  fields: {
                                    name: 'ABS',
                                    detKey: {
                                      value: '11741-Default',
                                    },
                                    detIdentifier: {
                                      value: '11741',
                                    },
                                    sotId: {
                                      value: '',
                                    },
                                    modelCode: {
                                      value: 'GL1800DAP',
                                    },
                                    defaultExteriorColor: {
                                      fields: {
                                        name: 'Candy ardent red',
                                        color: {
                                          fields: {
                                            detKey: {
                                              value: 'cd23candy_ardent_red__bordeaux_red_met__2_tone_',
                                            },
                                            detIdentifier: {
                                              value: '',
                                            },
                                            sotId: {
                                              value: '',
                                            },
                                          },
                                        },
                                      },
                                    },
                                  },
                                },
                                transmissions: [
                                  {
                                    items: [
                                      {
                                        detKey: {
                                          value: '11741-Default',
                                        },
                                        detIdentifier: {
                                          value: '11741',
                                        },
                                        sotId: {
                                          value: '',
                                        },
                                        name: 'ABS',
                                        transmissionName: {
                                          value: 'ABS',
                                        },
                                        modelCode: {
                                          value: 'GL1800DAP',
                                        },
                                        hidePriceAndFinance: {
                                          value: '',
                                        },
                                        defaultExteriorColor: {
                                          item: {
                                            id: '11423ac5-cd14-4ef4-9ce2-954310a38cc3',
                                            url: '/sitecore/Content/Web-Catalog/MC/ON-ROAD/Touring/2023/Gold-Wing/Gold-Wing-Tour-DCT-Airbag/Transmissions/ABS/ExteriorColors/Candy-ardent-red',
                                            name: 'Candy ardent red',
                                            displayName: 'Candy ardent red',
                                            fields: {
                                              studioAssets: {
                                                id: '66d64235-d6d6-4aec-90f7-73ca46914046',
                                                url: '/sitecore/Media-Library/Brands/PSP/MC/Candyred',
                                                name: 'Candyred',
                                                displayName: 'Candyred',
                                                fields: {},
                                              },
                                              color: {
                                                id: '2540b2c3-5cb3-4885-a19b-b4cc987985bd',
                                                url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Candy-ardent-red',
                                                name: 'Candy ardent red',
                                                displayName: 'Candy ardent red',
                                                fields: {
                                                  colorName: {
                                                    value: 'Candy ardent red',
                                                  },
                                                  detKey: {
                                                    value: 'cd23candy_ardent_red__bordeaux_red_met__2_tone_',
                                                  },
                                                  hexValue: {
                                                    value: '#C61F2B',
                                                  },
                                                },
                                              },
                                            },
                                          },
                                        },
                                        exteriorColors: [
                                          {
                                            colors: [
                                              {
                                                name: 'Candy ardent red',
                                                color: {
                                                  item: {
                                                    id: '2540b2c3-5cb3-4885-a19b-b4cc987985bd',
                                                    url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Candy-ardent-red',
                                                    name: 'Candy ardent red',
                                                    displayName: 'Candy ardent red',
                                                    fields: {
                                                      colorName: {
                                                        value: 'Candy ardent red',
                                                      },
                                                      detKey: {
                                                        value: 'cd23candy_ardent_red__bordeaux_red_met__2_tone_',
                                                      },
                                                      hexValue: {
                                                        value: '#C61F2B',
                                                      },
                                                    },
                                                  },
                                                },
                                              },
                                            ],
                                          },
                                        ],
                                      },
                                    ],
                                  },
                                ],
                              },
                            ],
                            modelKey: {
                              value: 'Touring',
                            },
                          },
                          {
                            detKey: {
                              value: '',
                            },
                            detIdentifier: {
                              value: '',
                            },
                            sotId: {
                              value: '',
                            },
                            year: {
                              value: '2022',
                            },
                            tagline: {
                              value: 'Touring',
                            },
                            modelYearPage: {
                              fields: null,
                            },
                            models: [
                              {
                                detKey: {
                                  value: 'gl1800al',
                                },
                                detIdentifier: {
                                  value: '',
                                },
                                sotId: {
                                  value: '',
                                },
                                name: 'Gold Wing',
                                modelName: {
                                  value: 'Gold Wing',
                                },
                                trims: [
                                  {
                                    detKey: {
                                      value: 'gold_wing_13274',
                                    },
                                    detIdentifier: {
                                      value: '13274',
                                    },
                                    sotId: {
                                      value: '',
                                    },
                                    name: 'Gold Wing',
                                    trimName: {
                                      value: 'Gold Wing',
                                    },
                                    primaryThumbnail: {
                                      item: {
                                        value: {},
                                      },
                                    },
                                    defaultTransmission: {
                                      fields: {
                                        name: 'ABS',
                                        detKey: {
                                          value: '11697-Default',
                                        },
                                        detIdentifier: {
                                          value: '11697',
                                        },
                                        sotId: {
                                          value: '',
                                        },
                                        modelCode: {
                                          value: 'GL1800BN',
                                        },
                                        defaultExteriorColor: {
                                          fields: {
                                            name: 'Mat Jeans Blue Pearl Morion Black w red highlights',
                                            color: {
                                              fields: {
                                                detKey: {
                                                  value: 'nh_a86mmat_ballistic_black_metallic',
                                                },
                                                detIdentifier: {
                                                  value: '',
                                                },
                                                sotId: {
                                                  value: '',
                                                },
                                              },
                                            },
                                          },
                                        },
                                      },
                                    },
                                    transmissions: [
                                      {
                                        items: [
                                          {
                                            detKey: {
                                              value: '11697-Default',
                                            },
                                            detIdentifier: {
                                              value: '11697',
                                            },
                                            sotId: {
                                              value: '',
                                            },
                                            name: 'ABS',
                                            transmissionName: {
                                              value: 'ABS',
                                            },
                                            modelCode: {
                                              value: 'GL1800BN',
                                            },
                                            hidePriceAndFinance: {
                                              value: '',
                                            },
                                            defaultExteriorColor: {
                                              item: {
                                                id: '0b28b6d7-cdee-47b9-9803-b97a5cda6c24',
                                                url: '/sitecore/Content/Web-Catalog/MC/ON-ROAD/Touring/2022/Gold-Wing/Gold-Wing/Transmissions/ABS/ExteriorColors/Mat-Jeans-Blue-Pearl-Morion-Black-w-red-highlights',
                                                name: 'Mat Jeans Blue Pearl Morion Black w red highlights',
                                                displayName: 'Mat Jeans Blue Pearl Morion Black w red highlights',
                                                fields: {
                                                  color: {
                                                    id: '72f2bf85-f085-49b8-bbfa-aaac61f32d22',
                                                    url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Mat-Ballistic-Black-Metallic',
                                                    name: 'Mat Ballistic Black Metallic',
                                                    displayName: 'Mat Ballistic Black Metallic',
                                                    fields: {
                                                      colorName: {
                                                        value: 'Mat Ballistic Black Metallic',
                                                      },
                                                      detKey: {
                                                        value: 'nh_a86mmat_ballistic_black_metallic',
                                                      },
                                                    },
                                                  },
                                                },
                                              },
                                            },
                                            exteriorColors: [
                                              {
                                                colors: [
                                                  {
                                                    name: 'Mat Jeans Blue Pearl Morion Black w red highlights',
                                                    color: {
                                                      item: {
                                                        id: '72f2bf85-f085-49b8-bbfa-aaac61f32d22',
                                                        url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Mat-Ballistic-Black-Metallic',
                                                        name: 'Mat Ballistic Black Metallic',
                                                        displayName: 'Mat Ballistic Black Metallic',
                                                        fields: {
                                                          colorName: {
                                                            value: 'Mat Ballistic Black Metallic',
                                                          },
                                                          detKey: {
                                                            value: 'nh_a86mmat_ballistic_black_metallic',
                                                          },
                                                        },
                                                      },
                                                    },
                                                  },
                                                ],
                                              },
                                            ],
                                          },
                                        ],
                                      },
                                    ],
                                  },
                                ],
                                trimName: {
                                  value: 'Gold Wing',
                                },
                                primaryThumbnail: {
                                  item: {
                                    value: {},
                                  },
                                },
                                secondaryThumbnail: {
                                  item: {
                                    value: {},
                                  },
                                },
                                specialVehicleType: {
                                  item: null,
                                },
                                nameBadge: {
                                  item: {
                                    value: {},
                                  },
                                },
                                defaultTransmission: {
                                  item: {},
                                },
                                bodyType: {
                                  item: [],
                                },
                                drivetrain: {
                                  item: [],
                                },
                                safety: {
                                  item: [],
                                },
                                interiorMaterial: {
                                  item: [],
                                },
                                designFeatures: {
                                  item: [],
                                },
                                wheels: {
                                  item: [],
                                },
                                entertainment: {
                                  item: [],
                                },
                                comfortConvenience: {
                                  item: [],
                                },
                                emissionRating: {
                                  value: '',
                                },
                                transmissions: [],
                              },
                              {
                                detKey: {
                                  value: 'gl1800al',
                                },
                                detIdentifier: {
                                  value: '',
                                },
                                sotId: {
                                  value: '',
                                },
                                name: 'Gold Wing DCT',
                                modelName: {
                                  value: 'Gold Wing DCT',
                                },
                                trims: [
                                  {
                                    detKey: {
                                      value: 'gold_wing_dct_13275',
                                    },
                                    detIdentifier: {
                                      value: '13275',
                                    },
                                    sotId: {
                                      value: '',
                                    },
                                    name: 'Gold Wing DCT',
                                    trimName: {
                                      value: 'Gold Wing DCT',
                                    },
                                    primaryThumbnail: {
                                      item: {
                                        value: {},
                                      },
                                    },
                                    defaultTransmission: {
                                      fields: {
                                        name: 'ABS',
                                        detKey: {
                                          value: '11698-Default',
                                        },
                                        detIdentifier: {
                                          value: '11698',
                                        },
                                        sotId: {
                                          value: '',
                                        },
                                        modelCode: {
                                          value: 'GL1800BDN',
                                        },
                                        defaultExteriorColor: {
                                          fields: {
                                            name: 'Mat Jeans Blue Pearl Morion Black w red highlights',
                                            color: {
                                              fields: {
                                                detKey: {
                                                  value:
                                                    'pb_417m___nmat_jeans_blue___pearl_morion_black_w_red_highlights',
                                                },
                                                detIdentifier: {
                                                  value: '',
                                                },
                                                sotId: {
                                                  value: '',
                                                },
                                              },
                                            },
                                          },
                                        },
                                      },
                                    },
                                    transmissions: [
                                      {
                                        items: [
                                          {
                                            detKey: {
                                              value: '11698-Default',
                                            },
                                            detIdentifier: {
                                              value: '11698',
                                            },
                                            sotId: {
                                              value: '',
                                            },
                                            name: 'ABS',
                                            transmissionName: {
                                              value: 'ABS',
                                            },
                                            modelCode: {
                                              value: 'GL1800BDN',
                                            },
                                            hidePriceAndFinance: {
                                              value: '',
                                            },
                                            defaultExteriorColor: {
                                              item: {
                                                id: '574d81ed-769e-4e55-ae8a-d48a56819d28',
                                                url: '/sitecore/Content/Web-Catalog/MC/ON-ROAD/Touring/2022/Gold-Wing-DCT/Gold-Wing-DCT/Transmissions/ABS/ExteriorColors/Mat-Jeans-Blue-Pearl-Morion-Black-w-red-highlights',
                                                name: 'Mat Jeans Blue Pearl Morion Black w red highlights',
                                                displayName: 'Mat Jeans Blue Pearl Morion Black w red highlights',
                                                fields: {
                                                  color: {
                                                    id: '8ab15857-da93-445d-8870-88c4d8de661c',
                                                    url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Mat-Jeans-Blue-Pearl-Morion-Black-w-red-highlights',
                                                    name: 'Mat Jeans Blue Pearl Morion Black w red highlights',
                                                    displayName: 'Mat Jeans Blue Pearl Morion Black w red highlights',
                                                    fields: {
                                                      colorName: {
                                                        value: 'Mat Jeans Blue / Pearl Morion Black w/red highlights',
                                                      },
                                                      detKey: {
                                                        value:
                                                          'pb_417m___nmat_jeans_blue___pearl_morion_black_w_red_highlights',
                                                      },
                                                    },
                                                  },
                                                },
                                              },
                                            },
                                            exteriorColors: [
                                              {
                                                colors: [
                                                  {
                                                    name: 'Mat Jeans Blue Pearl Morion Black w red highlights',
                                                    color: {
                                                      item: {
                                                        id: '8ab15857-da93-445d-8870-88c4d8de661c',
                                                        url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Mat-Jeans-Blue-Pearl-Morion-Black-w-red-highlights',
                                                        name: 'Mat Jeans Blue Pearl Morion Black w red highlights',
                                                        displayName:
                                                          'Mat Jeans Blue Pearl Morion Black w red highlights',
                                                        fields: {
                                                          colorName: {
                                                            value:
                                                              'Mat Jeans Blue / Pearl Morion Black w/red highlights',
                                                          },
                                                          detKey: {
                                                            value:
                                                              'pb_417m___nmat_jeans_blue___pearl_morion_black_w_red_highlights',
                                                          },
                                                        },
                                                      },
                                                    },
                                                  },
                                                ],
                                              },
                                            ],
                                          },
                                        ],
                                      },
                                    ],
                                  },
                                ],
                                trimName: {
                                  value: 'Gold Wing DCT',
                                },
                                primaryThumbnail: {
                                  item: {
                                    value: {},
                                  },
                                },
                                secondaryThumbnail: {
                                  item: {
                                    value: {},
                                  },
                                },
                                specialVehicleType: {
                                  item: null,
                                },
                                nameBadge: {
                                  item: {
                                    value: {},
                                  },
                                },
                                defaultTransmission: {
                                  item: {},
                                },
                                bodyType: {
                                  item: [],
                                },
                                drivetrain: {
                                  item: [],
                                },
                                safety: {
                                  item: [],
                                },
                                interiorMaterial: {
                                  item: [],
                                },
                                designFeatures: {
                                  item: [],
                                },
                                wheels: {
                                  item: [],
                                },
                                entertainment: {
                                  item: [],
                                },
                                comfortConvenience: {
                                  item: [],
                                },
                                emissionRating: {
                                  value: '',
                                },
                                transmissions: [],
                              },
                              {
                                detKey: {
                                  value: 'gl1800al',
                                },
                                detIdentifier: {
                                  value: '',
                                },
                                sotId: {
                                  value: '',
                                },
                                name: 'Gold Wing Tour',
                                modelName: {
                                  value: 'Gold Wing Tour',
                                },
                                trims: [
                                  {
                                    detKey: {
                                      value: 'gold_wing_tour_13276',
                                    },
                                    detIdentifier: {
                                      value: '13276',
                                    },
                                    sotId: {
                                      value: '',
                                    },
                                    name: 'Gold Wing Tour',
                                    trimName: {
                                      value: 'Gold Wing Tour',
                                    },
                                    primaryThumbnail: {
                                      item: {
                                        value: {},
                                      },
                                    },
                                    defaultTransmission: {
                                      fields: {
                                        name: 'ABS',
                                        detKey: {
                                          value: '11699-Default',
                                        },
                                        detIdentifier: {
                                          value: '11699',
                                        },
                                        sotId: {
                                          value: '',
                                        },
                                        modelCode: {
                                          value: 'GL1800N',
                                        },
                                        defaultExteriorColor: {
                                          fields: {
                                            name: 'Gunmetal Black Metallic',
                                            color: {
                                              fields: {
                                                detKey: {
                                                  value: 'gbgunmetal_black_metallic',
                                                },
                                                detIdentifier: {
                                                  value: '',
                                                },
                                                sotId: {
                                                  value: '',
                                                },
                                              },
                                            },
                                          },
                                        },
                                      },
                                    },
                                    transmissions: [
                                      {
                                        items: [
                                          {
                                            detKey: {
                                              value: '11699-Default',
                                            },
                                            detIdentifier: {
                                              value: '11699',
                                            },
                                            sotId: {
                                              value: '',
                                            },
                                            name: 'ABS',
                                            transmissionName: {
                                              value: 'ABS',
                                            },
                                            modelCode: {
                                              value: 'GL1800N',
                                            },
                                            hidePriceAndFinance: {
                                              value: '',
                                            },
                                            defaultExteriorColor: {
                                              item: {
                                                id: '145bd80a-9d5b-4688-b3fc-05c38a6578ab',
                                                url: '/sitecore/Content/Web-Catalog/MC/ON-ROAD/Touring/2022/Gold-Wing-Tour/Gold-Wing-Tour/Transmissions/ABS/ExteriorColors/Gunmetal-Black-Metallic',
                                                name: 'Gunmetal Black Metallic',
                                                displayName: 'Gunmetal Black Metallic',
                                                fields: {
                                                  color: {
                                                    id: '3c0dfa75-e78c-490c-8365-3028c529f6fb',
                                                    url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Gunmetal-Black-Metallic',
                                                    name: 'Gunmetal Black Metallic',
                                                    displayName: 'Gunmetal Black Metallic',
                                                    fields: {
                                                      colorName: {
                                                        value: 'Gunmetal Black Metallic',
                                                      },
                                                      detKey: {
                                                        value: 'gbgunmetal_black_metallic',
                                                      },
                                                      hexValue: {
                                                        value: '#1f262a',
                                                      },
                                                    },
                                                  },
                                                },
                                              },
                                            },
                                            exteriorColors: [
                                              {
                                                colors: [
                                                  {
                                                    name: 'Gunmetal Black Metallic',
                                                    color: {
                                                      item: {
                                                        id: '3c0dfa75-e78c-490c-8365-3028c529f6fb',
                                                        url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Gunmetal-Black-Metallic',
                                                        name: 'Gunmetal Black Metallic',
                                                        displayName: 'Gunmetal Black Metallic',
                                                        fields: {
                                                          colorName: {
                                                            value: 'Gunmetal Black Metallic',
                                                          },
                                                          detKey: {
                                                            value: 'gbgunmetal_black_metallic',
                                                          },
                                                          hexValue: {
                                                            value: '#1f262a',
                                                          },
                                                        },
                                                      },
                                                    },
                                                  },
                                                ],
                                              },
                                            ],
                                          },
                                        ],
                                      },
                                    ],
                                  },
                                ],
                                trimName: {
                                  value: 'Gold Wing Tour',
                                },
                                primaryThumbnail: {
                                  item: {
                                    value: {},
                                  },
                                },
                                secondaryThumbnail: {
                                  item: {
                                    value: {},
                                  },
                                },
                                specialVehicleType: {
                                  item: null,
                                },
                                nameBadge: {
                                  item: {
                                    value: {},
                                  },
                                },
                                defaultTransmission: {
                                  item: {},
                                },
                                bodyType: {
                                  item: [],
                                },
                                drivetrain: {
                                  item: [],
                                },
                                safety: {
                                  item: [],
                                },
                                interiorMaterial: {
                                  item: [],
                                },
                                designFeatures: {
                                  item: [],
                                },
                                wheels: {
                                  item: [],
                                },
                                entertainment: {
                                  item: [],
                                },
                                comfortConvenience: {
                                  item: [],
                                },
                                emissionRating: {
                                  value: '',
                                },
                                transmissions: [],
                              },
                              {
                                detKey: {
                                  value: 'gl1800al',
                                },
                                detIdentifier: {
                                  value: '',
                                },
                                sotId: {
                                  value: '',
                                },
                                name: 'Gold Wing Tour DCT',
                                modelName: {
                                  value: 'Gold Wing Tour DCT',
                                },
                                trims: [
                                  {
                                    detKey: {
                                      value: 'gold_wing_tour_dct_13277',
                                    },
                                    detIdentifier: {
                                      value: '13277',
                                    },
                                    sotId: {
                                      value: '',
                                    },
                                    name: 'Gold Wing Tour DCT',
                                    trimName: {
                                      value: 'Gold Wing Tour DCT',
                                    },
                                    primaryThumbnail: {
                                      item: {
                                        value: {},
                                      },
                                    },
                                    defaultTransmission: {
                                      fields: {
                                        name: 'ABS',
                                        detKey: {
                                          value: '11700-Default',
                                        },
                                        detIdentifier: {
                                          value: '11700',
                                        },
                                        sotId: {
                                          value: '',
                                        },
                                        modelCode: {
                                          value: 'GL1800DN',
                                        },
                                        defaultExteriorColor: {
                                          fields: {
                                            name: 'Gunmetal Black Metallic',
                                            color: {
                                              fields: {
                                                detKey: {
                                                  value: 'gbgunmetal_black_metallic',
                                                },
                                                detIdentifier: {
                                                  value: '',
                                                },
                                                sotId: {
                                                  value: '',
                                                },
                                              },
                                            },
                                          },
                                        },
                                      },
                                    },
                                    transmissions: [
                                      {
                                        items: [
                                          {
                                            detKey: {
                                              value: '11700-Default',
                                            },
                                            detIdentifier: {
                                              value: '11700',
                                            },
                                            sotId: {
                                              value: '',
                                            },
                                            name: 'ABS',
                                            transmissionName: {
                                              value: 'ABS',
                                            },
                                            modelCode: {
                                              value: 'GL1800DN',
                                            },
                                            hidePriceAndFinance: {
                                              value: '',
                                            },
                                            defaultExteriorColor: {
                                              item: {
                                                id: '0890aa57-d1d9-453a-8231-3b159a874038',
                                                url: '/sitecore/Content/Web-Catalog/MC/ON-ROAD/Touring/2022/Gold-Wing-Tour-DCT/Gold-Wing-Tour-DCT/Transmissions/ABS/ExteriorColors/Gunmetal-Black-Metallic',
                                                name: 'Gunmetal Black Metallic',
                                                displayName: 'Gunmetal Black Metallic',
                                                fields: {
                                                  color: {
                                                    id: '3c0dfa75-e78c-490c-8365-3028c529f6fb',
                                                    url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Gunmetal-Black-Metallic',
                                                    name: 'Gunmetal Black Metallic',
                                                    displayName: 'Gunmetal Black Metallic',
                                                    fields: {
                                                      colorName: {
                                                        value: 'Gunmetal Black Metallic',
                                                      },
                                                      detKey: {
                                                        value: 'gbgunmetal_black_metallic',
                                                      },
                                                      hexValue: {
                                                        value: '#1f262a',
                                                      },
                                                    },
                                                  },
                                                },
                                              },
                                            },
                                            exteriorColors: [
                                              {
                                                colors: [
                                                  {
                                                    name: 'Gunmetal Black Metallic',
                                                    color: {
                                                      item: {
                                                        id: '3c0dfa75-e78c-490c-8365-3028c529f6fb',
                                                        url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Gunmetal-Black-Metallic',
                                                        name: 'Gunmetal Black Metallic',
                                                        displayName: 'Gunmetal Black Metallic',
                                                        fields: {
                                                          colorName: {
                                                            value: 'Gunmetal Black Metallic',
                                                          },
                                                          detKey: {
                                                            value: 'gbgunmetal_black_metallic',
                                                          },
                                                          hexValue: {
                                                            value: '#1f262a',
                                                          },
                                                        },
                                                      },
                                                    },
                                                  },
                                                  {
                                                    name: 'Pearl Glare White',
                                                    color: {
                                                      item: {
                                                        id: '3ec284bf-386b-4a3b-8dc8-f1d1047408ac',
                                                        url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Pearl-Glare-White',
                                                        name: 'Pearl Glare White',
                                                        displayName: 'Pearl Glare White',
                                                        fields: {
                                                          colorName: {
                                                            value: 'Pearl Glare White',
                                                          },
                                                          detKey: {
                                                            value: '1061pearl_glare_white',
                                                          },
                                                          hexValue: {
                                                            value: '#EFF3F8',
                                                          },
                                                        },
                                                      },
                                                    },
                                                  },
                                                ],
                                              },
                                            ],
                                          },
                                        ],
                                      },
                                    ],
                                  },
                                ],
                                trimName: {
                                  value: 'Gold Wing Tour DCT',
                                },
                                primaryThumbnail: {
                                  item: {
                                    value: {},
                                  },
                                },
                                secondaryThumbnail: {
                                  item: {
                                    value: {},
                                  },
                                },
                                specialVehicleType: {
                                  item: null,
                                },
                                nameBadge: {
                                  item: {
                                    value: {},
                                  },
                                },
                                defaultTransmission: {
                                  item: {},
                                },
                                bodyType: {
                                  item: [],
                                },
                                drivetrain: {
                                  item: [],
                                },
                                safety: {
                                  item: [],
                                },
                                interiorMaterial: {
                                  item: [],
                                },
                                designFeatures: {
                                  item: [],
                                },
                                wheels: {
                                  item: [],
                                },
                                entertainment: {
                                  item: [],
                                },
                                comfortConvenience: {
                                  item: [],
                                },
                                emissionRating: {
                                  value: '',
                                },
                                transmissions: [],
                              },
                              {
                                detKey: {
                                  value: 'gl1800al',
                                },
                                detIdentifier: {
                                  value: '',
                                },
                                sotId: {
                                  value: '',
                                },
                                name: 'Gold Wing Tour DCT Airbag',
                                modelName: {
                                  value: 'Gold Wing Tour DCT Airbag',
                                },
                                trims: [
                                  {
                                    detKey: {
                                      value: 'gold_wing_tour_dct_airbag_13278',
                                    },
                                    detIdentifier: {
                                      value: '13278',
                                    },
                                    sotId: {
                                      value: '',
                                    },
                                    name: 'Gold Wing Tour DCT Airbag',
                                    trimName: {
                                      value: 'Gold Wing Tour DCT Airbag',
                                    },
                                    primaryThumbnail: {
                                      item: {
                                        value: {},
                                      },
                                    },
                                    defaultTransmission: {
                                      fields: {
                                        name: 'ABS',
                                        detKey: {
                                          value: '11701-Default',
                                        },
                                        detIdentifier: {
                                          value: '11701',
                                        },
                                        sotId: {
                                          value: '',
                                        },
                                        modelCode: {
                                          value: 'GL1800DAN',
                                        },
                                        defaultExteriorColor: {
                                          fields: {
                                            name: 'Blue Dark Blue w Blue stripe',
                                            color: {
                                              fields: {
                                                detKey: {
                                                  value: 'b_197___pb_blue___dark_blue_w__blue_stripe',
                                                },
                                                detIdentifier: {
                                                  value: '',
                                                },
                                                sotId: {
                                                  value: '',
                                                },
                                              },
                                            },
                                          },
                                        },
                                      },
                                    },
                                    transmissions: [
                                      {
                                        items: [
                                          {
                                            detKey: {
                                              value: '11701-Default',
                                            },
                                            detIdentifier: {
                                              value: '11701',
                                            },
                                            sotId: {
                                              value: '',
                                            },
                                            name: 'ABS',
                                            transmissionName: {
                                              value: 'ABS',
                                            },
                                            modelCode: {
                                              value: 'GL1800DAN',
                                            },
                                            hidePriceAndFinance: {
                                              value: '',
                                            },
                                            defaultExteriorColor: {
                                              item: {
                                                id: 'c78802c3-d275-47e8-906f-06f67c7190d7',
                                                url: '/sitecore/Content/Web-Catalog/MC/ON-ROAD/Touring/2022/Gold-Wing-Tour-DCT-Airbag/Gold-Wing-Tour-DCT-Airbag/Transmissions/ABS/ExteriorColors/Blue-Dark-Blue-w-Blue-stripe',
                                                name: 'Blue Dark Blue w Blue stripe',
                                                displayName: 'Blue Dark Blue w Blue stripe',
                                                fields: {
                                                  color: {
                                                    id: 'd2b6556c-5299-4a89-88dd-5da09781462e',
                                                    url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Blue-Dark-Blue-w-Blue-stripe',
                                                    name: 'Blue Dark Blue w Blue stripe',
                                                    displayName: 'Blue Dark Blue w Blue stripe',
                                                    fields: {
                                                      colorName: {
                                                        value: 'Blue / Dark Blue w/ Blue stripe',
                                                      },
                                                      detKey: {
                                                        value: 'b_197___pb_blue___dark_blue_w__blue_stripe',
                                                      },
                                                    },
                                                  },
                                                },
                                              },
                                            },
                                            exteriorColors: [
                                              {
                                                colors: [
                                                  {
                                                    name: 'Blue Dark Blue w Blue stripe',
                                                    color: {
                                                      item: {
                                                        id: 'd2b6556c-5299-4a89-88dd-5da09781462e',
                                                        url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Blue-Dark-Blue-w-Blue-stripe',
                                                        name: 'Blue Dark Blue w Blue stripe',
                                                        displayName: 'Blue Dark Blue w Blue stripe',
                                                        fields: {
                                                          colorName: {
                                                            value: 'Blue / Dark Blue w/ Blue stripe',
                                                          },
                                                          detKey: {
                                                            value: 'b_197___pb_blue___dark_blue_w__blue_stripe',
                                                          },
                                                        },
                                                      },
                                                    },
                                                  },
                                                ],
                                              },
                                            ],
                                          },
                                        ],
                                      },
                                    ],
                                  },
                                ],
                                trimName: {
                                  value: 'Gold Wing Tour DCT Airbag',
                                },
                                primaryThumbnail: {
                                  item: {
                                    value: {},
                                  },
                                },
                                secondaryThumbnail: {
                                  item: {
                                    value: {},
                                  },
                                },
                                specialVehicleType: {
                                  item: null,
                                },
                                nameBadge: {
                                  item: {
                                    value: {},
                                  },
                                },
                                defaultTransmission: {
                                  item: {},
                                },
                                bodyType: {
                                  item: [],
                                },
                                drivetrain: {
                                  item: [],
                                },
                                safety: {
                                  item: [],
                                },
                                interiorMaterial: {
                                  item: [],
                                },
                                designFeatures: {
                                  item: [],
                                },
                                wheels: {
                                  item: [],
                                },
                                entertainment: {
                                  item: [],
                                },
                                comfortConvenience: {
                                  item: [],
                                },
                                emissionRating: {
                                  value: '',
                                },
                                transmissions: [],
                              },
                            ],
                            trims: [
                              {
                                detKey: {
                                  value: 'gl1800al',
                                },
                                detIdentifier: {
                                  value: '13274',
                                },
                                sotId: {
                                  value: '',
                                },
                                name: 'Gold Wing',
                                trimName: {
                                  value: 'Gold Wing',
                                },
                                primaryThumbnail: {
                                  item: {
                                    value: {},
                                  },
                                },
                                defaultTransmission: {
                                  fields: {
                                    name: 'ABS',
                                    detKey: {
                                      value: '11697-Default',
                                    },
                                    detIdentifier: {
                                      value: '11697',
                                    },
                                    sotId: {
                                      value: '',
                                    },
                                    modelCode: {
                                      value: 'GL1800BN',
                                    },
                                    defaultExteriorColor: {
                                      fields: {
                                        name: 'Mat Jeans Blue Pearl Morion Black w red highlights',
                                        color: {
                                          fields: {
                                            detKey: {
                                              value: 'nh_a86mmat_ballistic_black_metallic',
                                            },
                                            detIdentifier: {
                                              value: '',
                                            },
                                            sotId: {
                                              value: '',
                                            },
                                          },
                                        },
                                      },
                                    },
                                  },
                                },
                                transmissions: [
                                  {
                                    items: [
                                      {
                                        detKey: {
                                          value: '11697-Default',
                                        },
                                        detIdentifier: {
                                          value: '11697',
                                        },
                                        sotId: {
                                          value: '',
                                        },
                                        name: 'ABS',
                                        transmissionName: {
                                          value: 'ABS',
                                        },
                                        modelCode: {
                                          value: 'GL1800BN',
                                        },
                                        hidePriceAndFinance: {
                                          value: '',
                                        },
                                        defaultExteriorColor: {
                                          item: {
                                            id: '0b28b6d7-cdee-47b9-9803-b97a5cda6c24',
                                            url: '/sitecore/Content/Web-Catalog/MC/ON-ROAD/Touring/2022/Gold-Wing/Gold-Wing/Transmissions/ABS/ExteriorColors/Mat-Jeans-Blue-Pearl-Morion-Black-w-red-highlights',
                                            name: 'Mat Jeans Blue Pearl Morion Black w red highlights',
                                            displayName: 'Mat Jeans Blue Pearl Morion Black w red highlights',
                                            fields: {
                                              color: {
                                                id: '72f2bf85-f085-49b8-bbfa-aaac61f32d22',
                                                url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Mat-Ballistic-Black-Metallic',
                                                name: 'Mat Ballistic Black Metallic',
                                                displayName: 'Mat Ballistic Black Metallic',
                                                fields: {
                                                  colorName: {
                                                    value: 'Mat Ballistic Black Metallic',
                                                  },
                                                  detKey: {
                                                    value: 'nh_a86mmat_ballistic_black_metallic',
                                                  },
                                                },
                                              },
                                            },
                                          },
                                        },
                                        exteriorColors: [
                                          {
                                            colors: [
                                              {
                                                name: 'Mat Jeans Blue Pearl Morion Black w red highlights',
                                                color: {
                                                  item: {
                                                    id: '72f2bf85-f085-49b8-bbfa-aaac61f32d22',
                                                    url: '/sitecore/Content/Web-Catalog/MC/Lookup-Tables/Colors/Exterior/Mat-Ballistic-Black-Metallic',
                                                    name: 'Mat Ballistic Black Metallic',
                                                    displayName: 'Mat Ballistic Black Metallic',
                                                    fields: {
                                                      colorName: {
                                                        value: 'Mat Ballistic Black Metallic',
                                                      },
                                                      detKey: {
                                                        value: 'nh_a86mmat_ballistic_black_metallic',
                                                      },
                                                    },
                                                  },
                                                },
                                              },
                                            ],
                                          },
                                        ],
                                      },
                                    ],
                                  },
                                ],
                              },
                            ],
                            modelKey: {
                              value: 'Touring',
                            },
                          },
                        ],
                        modelName: {
                          value: 'Touring',
                        },
                        detKey: {
                          value: 'Touring',
                        },
                        detIdentifier: {
                          value: '',
                        },
                        sotId: {
                          value: '',
                        },
                        nameBadge: {
                          item: {
                            value: {},
                          },
                        },
                      },
                    },
                    useDefaultModelYear: {
                      value: '',
                    },
                    paymentMethod: {
                      value: '',
                    },
                    paymentFrequency: {
                      value: '',
                    },
                    showInformationalApr: {
                      value: '',
                    },
                  },
                },
              },
              leftColumnHeight: 228,
            },
          ],
        },
      },
    ],
  },
};

export default pspRoute;

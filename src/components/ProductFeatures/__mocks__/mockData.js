/* eslint-disable quotes */
export const inputString =
  '<Four-Stroke Engine Design> \r\nWorld-renowned Honda quality combines proven reliability with no oil-gasoline mixing.\r\n<Centrifugal Clutch> \r\nHonda\'s centrifugal clutch facilitates the running of the engine at idle, with no propeller rotation, for tight navigation or just idling at the dock.\r\n<Lightweight, Compact Design> \r\nEasily transportable, this little outboard is ideal for small boats, dinghies and canoes. Lightweight 4-stroke design and is the only 4-stroke in the 2.3-hp class.\r\n<Transistorized Ignition> \r\nMaintenance-free, high-energy output for quick and easy starting.\r\n<Forced-Air Cooled Engine>\r\nNo water pump to worry about being plugged with weeds or damaged by sand, and less weight to carry.\r\n<Emergency Stop Switch and Lanyard>\r\nStandard safety feature allows the operator to clip the safety switch lanyard or tether to his or her wrist, which will automatically activate the engine stop switch if the operator leaves the helm.\r\n<Shallow-Water Drive> \r\nReduces the risk of engine damage while navigating in shallow water.\r\n<Sacrificial Anode> \r\nA sacrificial anode mounted on the lower unit protects other metal components from corrosion.\r\n<Three-Year Warranty> \r\nThe best outboards in the industry are backed by the best warranty in the business, 3 years parts and labour.\r\n<Two Models to Choose From>\r\nThe BF2.3DK2SCHC and BF2.3DK2LCHC models have a centrifugal drive clutch, which offers a neutral-gear position at idle. Both models have a tiller-mounted twist grip throttle/360° swivel steering.\r\n<360º Degree Swivel Steering> \r\nProvides excellent manoeuvrability in tight areas.\r\n<Integral Fuel Tank>\r\nFacilitates easy removal and portability as one unit. Vent may be closed for transport or extended storage periods.\r\n<Carburetor Drain Screw> \r\nAllows quick and easy draining of the carburetor\'s float bowl for transport or extended storage periods.\r\n<Twist Grip Throttle with Friction Adjuster>\r\nAllows for superior throttle control, and the throttle tensioner minimizes driver fatigue. \r\n<Large Front-Mounted Carrying Handle>\r\nProvides superior portability and ease of installation.\r\n<Fold-Down Tiller Handle> \r\nA more compact design allows for easy transportation and storage.\r\n<Available In Two Shaft Lengths> \r\nStandard 15" or 20" shaft lengths allow for a wider range of boat applications';

export const inputStringWithAccordion =
  '<<Performance and Efficiency>>\r\n<Four-Stroke Engine Design> \r\nWorld-renowned Honda quality combines proven reliability with no oil-gasoline mixing.\r\n<Centrifugal Clutch> \r\nHonda\'s centrifugal clutch facilitates the running of the engine at idle, with no propeller rotation, for tight navigation or just idling at the dock.\r\n<Lightweight, Compact Design> \r\nEasily transportable, this little outboard is ideal for small boats, dinghies and canoes. Lightweight 4-stroke design and is the only 4-stroke in the 2.3-hp class.\r\n<Transistorized Ignition> \r\nMaintenance-free, high-energy output for quick and easy starting.\r\n<<Reliability and Durability>>\r\n<Forced-Air Cooled Engine>\r\nNo water pump to worry about being plugged with weeds or damaged by sand, and less weight to carry.\r\n<Emergency Stop Switch and Lanyard>\r\nStandard safety feature allows the operator to clip the safety switch lanyard or tether to his or her wrist, which will automatically activate the engine stop switch if the operator leaves the helm.\r\n<Shallow-Water Drive> \r\nReduces the risk of engine damage while navigating in shallow water.\r\n<Sacrificial Anode> \r\nA sacrificial anode mounted on the lower unit protects other metal components from corrosion.\r\n<Three-Year Warranty> \r\nThe best outboards in the industry are backed by the best warranty in the business, 3 years parts and labour.\r\n<<Convenience and Ease of Use>>\r\n<Two Models to Choose From>\r\nThe BF2.3DK2SCHC and BF2.3DK2LCHC models have a centrifugal drive clutch, which offers a neutral-gear position at idle. Both models have a tiller-mounted twist grip throttle/360° swivel steering.\r\n<360º Degree Swivel Steering> \r\nProvides excellent manoeuvrability in tight areas.\r\n<Integral Fuel Tank>\r\nFacilitates easy removal and portability as one unit. Vent may be closed for transport or extended storage periods.\r\n<Carburetor Drain Screw> \r\nAllows quick and easy draining of the carburetor\'s float bowl for transport or extended storage periods.\r\n<Twist Grip Throttle with Friction Adjuster>\r\nAllows for superior throttle control, and the throttle tensioner minimizes driver fatigue. \r\n<Large Front-Mounted Carrying Handle>\r\nProvides superior portability and ease of installation.\r\n<Fold-Down Tiller Handle> \r\nA more compact design allows for easy transportation and storage.\r\n<Available In Two Shaft Lengths> \r\nStandard 15" or 20" shaft lengths allow for a wider range of boat applications';

export const inputRequest = hasAccordion => ({
  Url: 'BF2_3',
  AutoDataCode: '',
  Description:
    "The world's lightest 4-stroke outboard, it’s ideal for tenders, small fishing boats or as auxiliary power.",
  Disclaimer: '',
  SubTitle: '',
  TextHighlights: [],
  TextFeatures: hasAccordion ? inputStringWithAccordion : inputString,
  IconAssetUrl: null,
  Id: 12034,
  Key: 'bf2',
  Name: 'BF2.3',
  GtmName: 'BF2.3',
  SeatsCount: 0,
  Features: [],
  Highlights: [],
  IsFutureVehicle: false,
  Co2Badge: {
    IsModelBadge: false,
    BadgeTargetUrl: '',
    BadgeAssetPath: null,
    Co2Emission: 0,
    Co2SegmentAverage: 0,
    TrimName: 'BF2.3',
    TrimGtmName: 'BF2.3',
  },
  DisplayOrder: 1,
  FreightPdiCost: 158.0,
  DisplayName: null,
});

export const outputObjectWithAccordion = [
  {
    accordionTitle: 'Performance and Efficiency',
    title: 'Performance and Efficiency',
    key: 'Performance and Efficiency',
    content: [
      {
        list: [{ text: 'World-renowned Honda quality combines proven reliability with no oil-gasoline mixing.' }],
        title: 'Four-Stroke Engine Design',
      },
      {
        list: [
          {
            text: "Honda's centrifugal clutch facilitates the running of the engine at idle, with no propeller rotation, for tight navigation or just idling at the dock.",
          },
        ],
        title: 'Centrifugal Clutch',
      },
      {
        list: [
          {
            text: 'Easily transportable, this little outboard is ideal for small boats, dinghies and canoes. Lightweight 4-stroke design and is the only 4-stroke in the 2.3-hp class.',
          },
        ],
        title: 'Lightweight, Compact Design',
      },
      {
        list: [{ text: 'Maintenance-free, high-energy output for quick and easy starting.' }],
        title: 'Transistorized Ignition',
      },
    ],
  },
  {
    accordionTitle: 'Reliability and Durability',
    title: 'Reliability and Durability',
    key: 'Reliability and Durability',
    content: [
      {
        list: [
          {
            text: 'No water pump to worry about being plugged with weeds or damaged by sand, and less weight to carry.',
          },
        ],
        title: 'Forced-Air Cooled Engine',
      },
      {
        list: [
          {
            text: 'Standard safety feature allows the operator to clip the safety switch lanyard or tether to his or her wrist, which will automatically activate the engine stop switch if the operator leaves the helm.',
          },
        ],
        title: 'Emergency Stop Switch and Lanyard',
      },
      {
        list: [{ text: 'Reduces the risk of engine damage while navigating in shallow water.' }],
        title: 'Shallow-Water Drive',
      },
      {
        list: [
          { text: 'A sacrificial anode mounted on the lower unit protects other metal components from corrosion.' },
        ],
        title: 'Sacrificial Anode',
      },
      {
        list: [
          {
            text: 'The best outboards in the industry are backed by the best warranty in the business, 3 years parts and labour.',
          },
        ],
        title: 'Three-Year Warranty',
      },
    ],
  },
  {
    accordionTitle: 'Convenience and Ease of Use',
    title: 'Convenience and Ease of Use',
    key: 'Convenience and Ease of Use',
    content: [
      {
        list: [
          {
            text: 'The BF2.3DK2SCHC and BF2.3DK2LCHC models have a centrifugal drive clutch, which offers a neutral-gear position at idle. Both models have a tiller-mounted twist grip throttle/360° swivel steering.',
          },
        ],
        title: 'Two Models to Choose From',
      },
      { list: [{ text: 'Provides excellent manoeuvrability in tight areas.' }], title: '360º Degree Swivel Steering' },
      {
        list: [
          {
            text: 'Facilitates easy removal and portability as one unit. Vent may be closed for transport or extended storage periods.',
          },
        ],
        title: 'Integral Fuel Tank',
      },
      {
        list: [
          {
            text: "Allows quick and easy draining of the carburetor's float bowl for transport or extended storage periods.",
          },
        ],
        title: 'Carburetor Drain Screw',
      },
      {
        list: [{ text: 'Allows for superior throttle control, and the throttle tensioner minimizes driver fatigue. ' }],
        title: 'Twist Grip Throttle with Friction Adjuster',
      },
      {
        list: [{ text: 'Provides superior portability and ease of installation.' }],
        title: 'Large Front-Mounted Carrying Handle',
      },
      {
        list: [{ text: 'A more compact design allows for easy transportation and storage.' }],
        title: 'Fold-Down Tiller Handle',
      },
      {
        list: [{ text: 'Standard 15" or 20" shaft lengths allow for a wider range of boat applications' }],
        title: 'Available In Two Shaft Lengths',
      },
    ],
  },
];

export const outputObject = [
  {
    list: [{ text: 'World-renowned Honda quality combines proven reliability with no oil-gasoline mixing.' }],
    title: 'Four-Stroke Engine Design',
  },
  {
    list: [
      {
        text: "Honda's centrifugal clutch facilitates the running of the engine at idle, with no propeller rotation, for tight navigation or just idling at the dock.",
      },
    ],
    title: 'Centrifugal Clutch',
  },
  {
    list: [
      {
        text: 'Easily transportable, this little outboard is ideal for small boats, dinghies and canoes. Lightweight 4-stroke design and is the only 4-stroke in the 2.3-hp class.',
      },
    ],
    title: 'Lightweight, Compact Design',
  },
  {
    list: [{ text: 'Maintenance-free, high-energy output for quick and easy starting.' }],
    title: 'Transistorized Ignition',
  },
  {
    list: [
      {
        text: 'No water pump to worry about being plugged with weeds or damaged by sand, and less weight to carry.',
      },
    ],
    title: 'Forced-Air Cooled Engine',
  },
  {
    list: [
      {
        text: 'Standard safety feature allows the operator to clip the safety switch lanyard or tether to his or her wrist, which will automatically activate the engine stop switch if the operator leaves the helm.',
      },
    ],
    title: 'Emergency Stop Switch and Lanyard',
  },
  {
    list: [{ text: 'Reduces the risk of engine damage while navigating in shallow water.' }],
    title: 'Shallow-Water Drive',
  },
  {
    list: [{ text: 'A sacrificial anode mounted on the lower unit protects other metal components from corrosion.' }],
    title: 'Sacrificial Anode',
  },
  {
    list: [
      {
        text: 'The best outboards in the industry are backed by the best warranty in the business, 3 years parts and labour.',
      },
    ],
    title: 'Three-Year Warranty',
  },
  {
    list: [
      {
        text: 'The BF2.3DK2SCHC and BF2.3DK2LCHC models have a centrifugal drive clutch, which offers a neutral-gear position at idle. Both models have a tiller-mounted twist grip throttle/360° swivel steering.',
      },
    ],
    title: 'Two Models to Choose From',
  },
  { list: [{ text: 'Provides excellent manoeuvrability in tight areas.' }], title: '360º Degree Swivel Steering' },
  {
    list: [
      {
        text: 'Facilitates easy removal and portability as one unit. Vent may be closed for transport or extended storage periods.',
      },
    ],
    title: 'Integral Fuel Tank',
  },
  {
    list: [
      {
        text: "Allows quick and easy draining of the carburetor's float bowl for transport or extended storage periods.",
      },
    ],
    title: 'Carburetor Drain Screw',
  },
  {
    list: [{ text: 'Allows for superior throttle control, and the throttle tensioner minimizes driver fatigue. ' }],
    title: 'Twist Grip Throttle with Friction Adjuster',
  },
  {
    list: [{ text: 'Provides superior portability and ease of installation.' }],
    title: 'Large Front-Mounted Carrying Handle',
  },
  {
    list: [{ text: 'A more compact design allows for easy transportation and storage.' }],
    title: 'Fold-Down Tiller Handle',
  },
  {
    list: [{ text: 'Standard 15" or 20" shaft lengths allow for a wider range of boat applications' }],
    title: 'Available In Two Shaft Lengths',
  },
];

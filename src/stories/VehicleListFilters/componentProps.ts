// import mockData from '../../../sample-mock-data/routes/filter-options/empty.json';
const mockData: Array<{
  title: string,
  options: Array<{
    primaryThumbnail: { src: string, alt: string },
    vehicleType: string,
  }>,
}> = [
  {
    title: 'Vehicle Type',
    options: [
      { primaryThumbnail: { src: '/sample-mock-data/media/img/parallax-model.png', alt: 'Cars' }, vehicleType: 'Cars' },
      {
        primaryThumbnail: { src: '/sample-mock-data/media/img/parallax-model.png', alt: 'SUV & Crossover' },
        vehicleType: 'SUV & Crossover',
      },
      {
        primaryThumbnail: { src: '/sample-mock-data/media/img/parallax-model.png', alt: 'Trucks & Minivans' },
        vehicleType: 'Trucks & Minivans',
      },
      { primaryThumbnail: { src: '/sample-mock-data/media/img/parallax-model.png', alt: 'EV' }, vehicleType: 'EV' },
    ],
  },
  {
    title: 'Seats',
    options: [
      { primaryThumbnail: { src: '', alt: '' }, vehicleType: '4' },
      { primaryThumbnail: { src: '', alt: '' }, vehicleType: '5' },
      { primaryThumbnail: { src: '', alt: '' }, vehicleType: '6+' },
    ],
  },
  {
    title: 'Models',
    options: [
      { primaryThumbnail: { src: '', alt: '' }, vehicleType: 'Civic Hatchback' },
      { primaryThumbnail: { src: '', alt: '' }, vehicleType: 'Civic Sedan' },
      { primaryThumbnail: { src: '', alt: '' }, vehicleType: 'CR-V' },
      { primaryThumbnail: { src: '', alt: '' }, vehicleType: 'HR-V' },
      { primaryThumbnail: { src: '', alt: '' }, vehicleType: 'Accord' },
      { primaryThumbnail: { src: '', alt: '' }, vehicleType: 'Passport' },
      { primaryThumbnail: { src: '', alt: '' }, vehicleType: 'Pilot' },
      { primaryThumbnail: { src: '', alt: '' }, vehicleType: 'Odyssey' },
      { primaryThumbnail: { src: '', alt: '' }, vehicleType: 'Ridgeline' },
    ],
  },
  {
    title: 'Drivetrain',
    options: [
      { primaryThumbnail: { src: '', alt: '' }, vehicleType: 'AWD' },
      { primaryThumbnail: { src: '', alt: '' }, vehicleType: 'FWD' },
      { primaryThumbnail: { src: '', alt: '' }, vehicleType: 'Manual' },
      { primaryThumbnail: { src: '', alt: '' }, vehicleType: 'CTV' },
      { primaryThumbnail: { src: '', alt: '' }, vehicleType: 'e-CVT' },
      { primaryThumbnail: { src: '', alt: '' }, vehicleType: 'Automatic' },
      { primaryThumbnail: { src: '', alt: '' }, vehicleType: 'SH-AWD' },
    ],
  },
];
export default mockData;

const bg = {
  1: 'C7C7C7',
  2: 'EAEAEA',
};

const generatePrimaryImage = (name, num = 1) => ({
  src: `http://via.placeholder.com/1248x702/${bg[num]}?text=${name} (1248x702)`,
  alt: name,
});

const generateSecImage = name => ({
  src: `http://via.placeholder.com/506x285/707070?text=${name} (506x285)`,
  alt: name,
});

export default [
  {
    title: 'Interior Colour',
    tabTitle: 'Interior',
    primaryImages: [
      {
        src: '/data/media/img/1248x702-1.png',
        alt: 'alt',
      },
      {
        src: '/data/media/img/1248x702-2.png',
        alt: 'alt',
      },
      generatePrimaryImage('Grey Hound Interior'),
      generatePrimaryImage('Red Leather Interior', 2),
      generatePrimaryImage('Blue Pearl Interior'),
      generatePrimaryImage('Performance Red Interior', 2),
      generatePrimaryImage('Red Leather Interior'),
      generatePrimaryImage('Grey Hound Interior 2', 2),
      generatePrimaryImage('Blue Pearl Interior 2'),
    ],
    secondaryImages: [
      {
        src: '/data/media/img/1248x702-1.png',
        alt: 'alt',
      },
      {
        src: '/data/media/img/1248x702-2.png',
        alt: 'alt',
      },
      generateSecImage('Grey Hound Interior'),
      generateSecImage('Red Leather Interior'),
      generateSecImage('Blue Pearl Interior'),
      generateSecImage('Performance Red Interior'),
      generateSecImage('Red Leather Interior'),
      generateSecImage('Grey Hound Interior 2'),
      generateSecImage('Blue Pearl Interior 2'),
    ],
    swatches: [
      {
        name: 'Black Beard',
        color: '#000000',
      },
      {
        name: 'Brown Bear',
        color: '#8B4513',
      },
      {
        name: 'Grey Hound',
        color: '#D3D3D3',
      },
      {
        name: 'Red Leather',
        image: {
          src: 'https://di-uploads-pod5.dealerinspire.com/chicagolandacuradealers/uploads/2017/10/2018-Acura-TLX-Leather-Seats.jpg',
          alt: 'red leather',
        },
      },
      {
        name: 'Blue Pearl',
        color: '#4370B8',
      },
      {
        name: 'Performance Red',
        color: '#D04044',
      },
      {
        name: 'Red Leather 2',
        image: {
          src: 'https://di-uploads-pod5.dealerinspire.com/chicagolandacuradealers/uploads/2017/10/2018-Acura-TLX-Leather-Seats.jpg',
          alt: 'red leather',
        },
      },
      {
        name: 'Grey Hound 2',
        color: '#D3D3D3',
      },
      {
        name: 'Blue Pearl',
        color: '#4370B8',
      },
    ],
  },
  {
    title: 'Exterior Colour',
    tabTitle: 'Exterior',
    primaryImages: [
      {
        src: '/data/media/img/1248x702-1.png',
        alt: 'alt',
      },
      {
        src: '/data/media/img/1248x702-2.png',
        alt: 'alt',
      },
      generatePrimaryImage('Grey Hound'),
      generatePrimaryImage('Blue Pearl', 2),
      generateSecImage('Black Beard'),
    ],
    secondaryImages: [
      {
        src: '/data/media/img/1248x702-1.png',
        alt: 'alt',
      },
      {
        src: '/data/media/img/1248x702-2.png',
        alt: 'alt',
      },
      generateSecImage('Grey Hound'),
      generateSecImage('Blue Pearl'),
      generateSecImage('Black Beard'),
    ],
    swatches: [
      {
        name: 'Black Beard',
        color: '#000000',
      },
      {
        name: 'Brown Bear',
        color: '#8B4513',
      },
      {
        name: 'Grey Hound',
        color: '#D3D3D3',
      },
      {
        name: 'Blue Pearl',
        color: '#4370B8',
      },
      {
        name: 'Black Beard 2',
        color: '#000000',
      },
    ],
  },
];

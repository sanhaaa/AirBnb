import { Property } from '../types';

const properties: Property[] = [
  {
    id: '1',
    title: 'Luxury Villa with Pool in Goa',
    description: 'Experience the beauty of Goa in this stunning villa with a private pool, just 5 minutes walk from Vagator Beach. The house is surrounded by lush greenery and offers complete privacy while being close to popular beaches and nightlife.',
    type: 'Entire home',
    images: [
      {
        id: '1-1',
        url: 'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg',
        alt: 'Villa exterior with pool',
        isPrimary: true
      },
      {
        id: '1-2',
        url: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
        alt: 'Living room with beach view'
      },
      {
        id: '1-3',
        url: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg',
        alt: 'Master bedroom'
      },
      {
        id: '1-4',
        url: 'https://images.pexels.com/photos/2724748/pexels-photo-2724748.jpeg',
        alt: 'Kitchen area'
      },
      {
        id: '1-5',
        url: 'https://images.pexels.com/photos/261327/pexels-photo-261327.jpeg',
        alt: 'Private pool'
      }
    ],
    vrTour: {
      enabled: true,
      panoramas: [
        'https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg',
        'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg',
        'https://images.pexels.com/photos/261327/pexels-photo-261327.jpeg'
      ]
    },
    price: 12000,
    currency: 'INR',
    location: {
      city: 'Vagator',
      state: 'Goa',
      country: 'India',
      lat: 15.5937,
      lng: 73.7542
    },
    host: {
      id: 'h1',
      name: 'Priya Sharma',
      avatar: 'https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg',
      isSuperHost: true,
      responseRate: 98,
      responseTime: 'within an hour',
      joinDate: 'January 2019',
      totalListings: 3
    },
    amenities: [
      { id: 'a1', name: 'Wifi', icon: 'wifi', category: 'basic' },
      { id: 'a2', name: 'Air conditioning', icon: 'wind', category: 'basic' },
      { id: 'a3', name: 'Kitchen', icon: 'utensils', category: 'basic' },
      { id: 'a4', name: 'Pool', icon: 'pool', category: 'features' },
      { id: 'a5', name: 'Free parking', icon: 'parking', category: 'features' }
    ],
    maxGuests: 6,
    bedrooms: 3,
    beds: 4,
    baths: 2,
    rating: 4.8,
    reviewCount: 47,
    reviews: [
      {
        id: 'r1',
        userId: 'u1',
        userName: 'Rohit M',
        userAvatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
        rating: 5,
        comment: 'Absolutely stunning villa! We loved the pool and proximity to the beach. Priya was an excellent host.',
        date: '2023-10-15'
      },
      {
        id: 'r2',
        userId: 'u2',
        userName: 'Aisha K',
        userAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
        rating: 4,
        comment: 'Beautiful place and great location. Kitchen was well stocked. Only issue was the weak wifi signal.',
        date: '2023-09-22'
      }
    ],
    hasWifi: true,
    hasAC: true,
    hasKitchen: true,
    hasWasher: true,
    hasParking: true,
    hasPool: true,
    instantBook: true,
    cancelPolicy: 'moderate',
    minStay: 2,
    availableDates: [
      '2025-01-01', '2025-01-02', '2025-01-03', '2025-01-04', '2025-01-05',
      '2025-01-10', '2025-01-11', '2025-01-12', '2025-01-13', '2025-01-14'
    ]
  },
  {
    id: '2',
    title: 'Heritage Haveli in Jaipur Pink City',
    description: 'Stay in this 150-year-old restored haveli in the heart of Jaipur\'s Pink City. Experience royal Rajasthani hospitality with modern amenities. Walking distance to Hawa Mahal and City Palace.',
    type: 'Entire home',
    images: [
      {
        id: '2-1',
        url: 'https://images.pexels.com/photos/1797393/pexels-photo-1797393.jpeg',
        alt: 'Heritage haveli exterior',
        isPrimary: true
      },
      {
        id: '2-2',
        url: 'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg',
        alt: 'Traditional courtyard'
      },
      {
        id: '2-3',
        url: 'https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg',
        alt: 'Bedroom with traditional decor'
      },
      {
        id: '2-4',
        url: 'https://images.pexels.com/photos/2079249/pexels-photo-2079249.jpeg',
        alt: 'Rooftop terrace'
      }
    ],
    vrTour: {
      enabled: true,
      panoramas: [
        'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg',
        'https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg',
        'https://images.pexels.com/photos/2079249/pexels-photo-2079249.jpeg'
      ]
    },
    price: 8500,
    currency: 'INR',
    location: {
      city: 'Jaipur',
      state: 'Rajasthan',
      country: 'India',
      lat: 26.9124,
      lng: 75.7873
    },
    host: {
      id: 'h2',
      name: 'Vikram Singh',
      avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg',
      isSuperHost: true,
      responseRate: 100,
      responseTime: 'within an hour',
      joinDate: 'March 2018',
      totalListings: 2
    },
    amenities: [
      { id: 'a1', name: 'Wifi', icon: 'wifi', category: 'basic' },
      { id: 'a2', name: 'Air conditioning', icon: 'wind', category: 'basic' },
      { id: 'a3', name: 'Breakfast', icon: 'coffee', category: 'features' },
      { id: 'a6', name: 'Rooftop terrace', icon: 'sun', category: 'features' }
    ],
    maxGuests: 4,
    bedrooms: 2,
    beds: 2,
    baths: 2,
    rating: 4.9,
    reviewCount: 63,
    reviews: [
      {
        id: 'r3',
        userId: 'u3',
        userName: 'Sarah J',
        userAvatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
        rating: 5,
        comment: 'This place is magical! The architecture is stunning and Vikram arranged a local guide for us.',
        date: '2023-11-03'
      }
    ],
    hasWifi: true,
    hasAC: true,
    hasKitchen: false,
    hasWasher: false,
    hasParking: false,
    hasPool: false,
    instantBook: false,
    cancelPolicy: 'strict',
    minStay: 1,
    availableDates: [
      '2025-01-05', '2025-01-06', '2025-01-07', '2025-01-08',
      '2025-01-15', '2025-01-16', '2025-01-17'
    ]
  },
  {
    id: '3',
    title: 'Houseboat on Kerala Backwaters',
    description: 'Cruise through the serene backwaters of Kerala on this traditional houseboat (kettuvallam). Enjoy home-cooked Kerala cuisine prepared by our onboard chef and witness breathtaking views of rural Kerala.',
    type: 'Entire home',
    images: [
      {
        id: '3-1',
        url: 'https://images.pexels.com/photos/3601425/pexels-photo-3601425.jpeg',
        alt: 'Kerala houseboat',
        isPrimary: true
      },
      {
        id: '3-2',
        url: 'https://images.pexels.com/photos/1268871/pexels-photo-1268871.jpeg',
        alt: 'Interior of houseboat'
      },
      {
        id: '3-3',
        url: 'https://images.pexels.com/photos/3155666/pexels-photo-3155666.jpeg',
        alt: 'Backwater view'
      },
      {
        id: '3-4',
        url: 'https://images.pexels.com/photos/3225531/pexels-photo-3225531.jpeg',
        alt: 'Dining area'
      }
    ],
    vrTour: {
      enabled: true,
      panoramas: [
        'https://images.pexels.com/photos/1268871/pexels-photo-1268871.jpeg',
        'https://images.pexels.com/photos/3155666/pexels-photo-3155666.jpeg',
        'https://images.pexels.com/photos/3225531/pexels-photo-3225531.jpeg'
      ]
    },
    price: 15000,
    currency: 'INR',
    location: {
      city: 'Alleppey',
      state: 'Kerala',
      country: 'India',
      lat: 9.4981,
      lng: 76.3388
    },
    host: {
      id: 'h3',
      name: 'Thomas Kurien',
      avatar: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg',
      isSuperHost: false,
      responseRate: 95,
      responseTime: 'within a day',
      joinDate: 'June 2020',
      totalListings: 1
    },
    amenities: [
      { id: 'a7', name: 'All meals included', icon: 'utensils', category: 'features' },
      { id: 'a8', name: 'Air conditioning', icon: 'wind', category: 'basic' },
      { id: 'a9', name: 'Private deck', icon: 'sun-deck', category: 'features' }
    ],
    maxGuests: 4,
    bedrooms: 2,
    beds: 2,
    baths: 2,
    rating: 4.7,
    reviewCount: 28,
    reviews: [
      {
        id: 'r4',
        userId: 'u4',
        userName: 'Michael T',
        userAvatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',
        rating: 5,
        comment: 'One of the most unique experiences of our trip. The food was amazing and the views were incredible.',
        date: '2023-08-12'
      }
    ],
    hasWifi: false,
    hasAC: true,
    hasKitchen: false,
    hasWasher: false,
    hasParking: false,
    hasPool: false,
    instantBook: true,
    cancelPolicy: 'strict',
    minStay: 1,
    availableDates: [
      '2025-01-01', '2025-01-02', '2025-01-03',
      '2025-01-10', '2025-01-11', '2025-01-12'
    ]
  },
  {
    id: '4',
    title: 'Modern Apartment with Taj Mahal View',
    description: 'Wake up to stunning views of the Taj Mahal from this modern apartment. Located just 500 meters from the east gate, this is the perfect base for exploring Agra\'s heritage sites.',
    type: 'Entire home',
    images: [
      {
        id: '4-1',
        url: 'https://images.pexels.com/photos/1701539/pexels-photo-1701539.jpeg',
        alt: 'View of Taj Mahal from balcony',
        isPrimary: true
      },
      {
        id: '4-2',
        url: 'https://images.pexels.com/photos/1571458/pexels-photo-1571458.jpeg',
        alt: 'Modern living room'
      },
      {
        id: '4-3',
        url: 'https://images.pexels.com/photos/1648771/pexels-photo-1648771.jpeg',
        alt: 'Kitchen area'
      },
      {
        id: '4-4',
        url: 'https://images.pexels.com/photos/279607/pexels-photo-279607.jpeg',
        alt: 'Bedroom with view'
      }
    ],
    vrTour: {
      enabled: true,
      panoramas: [
        'https://images.pexels.com/photos/1571458/pexels-photo-1571458.jpeg',
        'https://images.pexels.com/photos/1648771/pexels-photo-1648771.jpeg',
        'https://images.pexels.com/photos/279607/pexels-photo-279607.jpeg'
      ]
    },
    price: 6000,
    currency: 'INR',
    location: {
      city: 'Agra',
      state: 'Uttar Pradesh',
      country: 'India',
      lat: 27.1751,
      lng: 78.0421
    },
    host: {
      id: 'h4',
      name: 'Aditya Patel',
      avatar: 'https://images.pexels.com/photos/1270076/pexels-photo-1270076.jpeg',
      isSuperHost: true,
      responseRate: 99,
      responseTime: 'within an hour',
      joinDate: 'April 2019',
      totalListings: 4
    },
    amenities: [
      { id: 'a1', name: 'Wifi', icon: 'wifi', category: 'basic' },
      { id: 'a2', name: 'Air conditioning', icon: 'wind', category: 'basic' },
      { id: 'a3', name: 'Kitchen', icon: 'utensils', category: 'basic' },
      { id: 'a10', name: 'Balcony', icon: 'home', category: 'features' }
    ],
    maxGuests: 3,
    bedrooms: 1,
    beds: 1,
    baths: 1,
    rating: 4.9,
    reviewCount: 51,
    reviews: [
      {
        id: 'r5',
        userId: 'u5',
        userName: 'Elena G',
        userAvatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg',
        rating: 5,
        comment: 'The view is absolutely incredible! Watching the sunset over the Taj Mahal from the balcony was the highlight of our trip.',
        date: '2023-12-05'
      }
    ],
    hasWifi: true,
    hasAC: true,
    hasKitchen: true,
    hasWasher: true,
    hasParking: false,
    hasPool: false,
    instantBook: true,
    cancelPolicy: 'flexible',
    minStay: 2,
    availableDates: [
      '2025-01-01', '2025-01-02', '2025-01-03', '2025-01-04',
      '2025-01-15', '2025-01-16', '2025-01-17', '2025-01-18'
    ]
  },
  {
    id: '5',
    title: 'Mountain Cottage in Himachal',
    description: 'Escape to this cozy cottage nestled in the pine forests of Himachal Pradesh. Enjoy panoramic views of the Himalayan peaks, fresh mountain air, and peaceful surroundings.',
    type: 'Entire home',
    images: [
      {
        id: '5-1',
        url: 'https://images.pexels.com/photos/803975/pexels-photo-803975.jpeg',
        alt: 'Mountain cottage exterior',
        isPrimary: true
      },
      {
        id: '5-2',
        url: 'https://images.pexels.com/photos/259962/pexels-photo-259962.jpeg',
        alt: 'Cozy living room with fireplace'
      },
      {
        id: '5-3',
        url: 'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg',
        alt: 'Bedroom with mountain view'
      },
      {
        id: '5-4',
        url: 'https://images.pexels.com/photos/2079465/pexels-photo-2079465.jpeg',
        alt: 'Outdoor deck'
      }
    ],
    vrTour: {
      enabled: true,
      panoramas: [
        'https://images.pexels.com/photos/259962/pexels-photo-259962.jpeg',
        'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg',
        'https://images.pexels.com/photos/2079465/pexels-photo-2079465.jpeg'
      ]
    },
    price: 7500,
    currency: 'INR',
    location: {
      city: 'Manali',
      state: 'Himachal Pradesh',
      country: 'India',
      lat: 32.2432,
      lng: 77.1892
    },
    host: {
      id: 'h5',
      name: 'Sunita Thakur',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
      isSuperHost: true,
      responseRate: 97,
      responseTime: 'within hours',
      joinDate: 'May 2017',
      totalListings: 2
    },
    amenities: [
      { id: 'a1', name: 'Wifi', icon: 'wifi', category: 'basic' },
      { id: 'a11', name: 'Fireplace', icon: 'flame', category: 'features' },
      { id: 'a3', name: 'Kitchen', icon: 'utensils', category: 'basic' },
      { id: 'a12', name: 'Mountain view', icon: 'mountain', category: 'features' },
      { id: 'a5', name: 'Free parking', icon: 'parking', category: 'features' }
    ],
    maxGuests: 4,
    bedrooms: 2,
    beds: 2,
    baths: 1,
    rating: 4.8,
    reviewCount: 37,
    reviews: [
      {
        id: 'r6',
        userId: 'u6',
        userName: 'David L',
        userAvatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg',
        rating: 5,
        comment: 'Perfect mountain getaway! We loved waking up to the incredible views and the cottage had everything we needed.',
        date: '2023-10-18'
      }
    ],
    hasWifi: true,
    hasAC: false,
    hasKitchen: true,
    hasWasher: false,
    hasParking: true,
    hasPool: false,
    instantBook: false,
    cancelPolicy: 'moderate',
    minStay: 2,
    availableDates: [
      '2025-01-05', '2025-01-06', '2025-01-07', '2025-01-08',
      '2025-01-20', '2025-01-21', '2025-01-22'
    ]
  },
  {
    id: '6',
    title: 'Designer Penthouse in Mumbai',
    description: 'Luxury penthouse apartment with panoramic views of the Arabian Sea. Located in the heart of Bandra, close to restaurants, shopping and nightlife. Featuring contemporary design and high-end amenities.',
    type: 'Entire home',
    images: [
      {
        id: '6-1',
        url: 'https://images.pexels.com/photos/1571459/pexels-photo-1571459.jpeg',
        alt: 'Living room with sea view',
        isPrimary: true
      },
      {
        id: '6-2',
        url: 'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg',
        alt: 'Modern kitchen'
      },
      {
        id: '6-3',
        url: 'https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg',
        alt: 'Master bedroom'
      },
      {
        id: '6-4',
        url: 'https://images.pexels.com/photos/1571472/pexels-photo-1571472.jpeg',
        alt: 'Balcony with sea view'
      }
    ],
    vrTour: {
      enabled: true,
      panoramas: [
        'https://images.pexels.com/photos/1571459/pexels-photo-1571459.jpeg',
        'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg',
        'https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg'
      ]
    },
    price: 18000,
    currency: 'INR',
    location: {
      city: 'Mumbai',
      state: 'Maharashtra',
      country: 'India',
      lat: 19.0596,
      lng: 72.8295
    },
    host: {
      id: 'h6',
      name: 'Arjun Mehta',
      avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
      isSuperHost: true,
      responseRate: 100,
      responseTime: 'within an hour',
      joinDate: 'January 2018',
      totalListings: 5
    },
    amenities: [
      { id: 'a1', name: 'Wifi', icon: 'wifi', category: 'basic' },
      { id: 'a2', name: 'Air conditioning', icon: 'wind', category: 'basic' },
      { id: 'a3', name: 'Kitchen', icon: 'utensils', category: 'basic' },
      { id: 'a4', name: 'Gym', icon: 'dumbbell', category: 'features' },
      { id: 'a13', name: 'Doorman', icon: 'shield', category: 'features' }
    ],
    maxGuests: 4,
    bedrooms: 2,
    beds: 2,
    baths: 2.5,
    rating: 4.9,
    reviewCount: 43,
    reviews: [
      {
        id: 'r7',
        userId: 'u7',
        userName: 'Jessica M',
        userAvatar: 'https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg',
        rating: 5,
        comment: 'This penthouse is absolutely stunning! The views are incredible and the location is perfect for exploring Mumbai.',
        date: '2023-11-25'
      }
    ],
    hasWifi: true,
    hasAC: true,
    hasKitchen: true,
    hasWasher: true,
    hasParking: true,
    hasPool: true,
    instantBook: true,
    cancelPolicy: 'strict',
    minStay: 3,
    availableDates: [
      '2025-01-01', '2025-01-02', '2025-01-03', '2025-01-04',
      '2025-01-10', '2025-01-11', '2025-01-12'
    ]
  }
];

export default properties;
import { 
  Wifi, Wind, UtensilsCrossed, Droplet, Car, 
  Umbrella, Tv, Briefcase, Thermometer, Coffee,
  Dumbbell, ShieldCheck, ArrowUpCircle, Baby,
  MonitorPlay, Heart, Mountain, Trees, 
  Home, WashingMachine
} from 'lucide-react';
import { AmenityIconType } from '../types';

export const amenityIconMap = {
  'wifi': Wifi,
  'air-conditioning': Wind,
  'kitchen': UtensilsCrossed,
  'pool': Droplet,
  'parking': Car,
  'beach': Umbrella,
  'tv': Tv,
  'workspace': Briefcase,
  'heating': Thermometer,
  'breakfast': Coffee,
  'gym': Dumbbell,
  'security': ShieldCheck,
  'elevator': ArrowUpCircle,
  'baby-items': Baby,
  'entertainment': MonitorPlay,
  'firstaid': Heart,
  'mountain-view': Mountain,
  'garden': Trees,
  'balcony': Home,
  'washer': WashingMachine
};

export const getAmenityIcon = (iconType: AmenityIconType) => {
  const IconComponent = amenityIconMap[iconType];
  return IconComponent ? (
    <IconComponent className="w-6 h-6 text-airbnb-dark" />
  ) : (
    <UtensilsCrossed className="w-6 h-6 text-airbnb-dark" />
  );
};

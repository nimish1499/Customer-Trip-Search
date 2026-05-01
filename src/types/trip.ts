export interface SlotBucket {
  available: number;
  price: number;
}

export interface Trip {
  id: number;
  origin: string;
  originCity: string;
  originZip: string;
  destination: string;
  destinationCity: string;
  destinationZip: string;
  operator: string;
  tripStart: string;
  tripEnd: string;
  co2Emission: number;
  originLat: number;
  originLng: number;
  destLat: number;
  destLng: number;
  slotsByType: Record<string, SlotBucket>;
}

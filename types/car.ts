export interface Car {
  id: string;
  year: number;
  brand: string;
  model: string;
  type: string;
  img: string;
  description: string;
  fuelConsumption: number;
  engine: string;
  rentalPrice: string;
  rentalCompany: string;
  rentalConditions: string[];
  mileage: number;
  stockNumber: number;
  features: string[];
  location: {
    country: string;
    city: string;
    address: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface CarsFilters {
  brands: string[];
  price: {
    min: number;
    max: number;
  };
}

export interface BookingRequest {
  name: string;
  email: string;
  comment: string;
}

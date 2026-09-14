import { BookingRequest, Car, CarsFilters } from '@/types/car';
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://car-rental-api.goit.study',
});

interface FetchCarsRequest {
  brand?: string;
  price?: number;
  minMileage?: number;
  maxMileage?: number;
  page: number;
  perPage: number;
}

interface FetchCarsResponse {
  cars: Car[];
  page: number;
  totalPages: number;
}

interface BookingResponse {
  message: string;
}

export const fetchCars = async ({
  brand = '',
  price = 0,
  minMileage = 0,
  maxMileage = 0,
  page = 1,
  perPage = 12,
}: FetchCarsRequest): Promise<FetchCarsResponse> => {
  const response = await api.get<FetchCarsResponse>('/cars', {
    params: {
      brand: brand || undefined,
      price: price || undefined,
      minMileage: minMileage || undefined,
      maxMileage: maxMileage || undefined,
      page,
      perPage,
    },
  });
  return response.data;
};

export const getFilters = async (): Promise<CarsFilters> => {
  const response = await api.get<CarsFilters>('/cars/filters');
  return response.data;
};

export const fetchCarById = async (id: string): Promise<Car> => {
  const response = await api.get<Car>(`/cars/${id}`);
  return response.data;
};

export const createBookingRequest = async (
  id: string,
  request: BookingRequest
): Promise<BookingResponse> => {
  const response = await api.post<BookingResponse>(
    `cars/${id}/booking-requests`,
    request
  );
  return response.data;
};

import { Metadata } from 'next';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import CatalogClient from './Catalog.client';
import { fetchCars, getFilters } from '@/lib/api';

export const metadata: Metadata = {
  title: 'RentalCar | Catalog - Browse Our Car Collection',
  description:
    'Explore our extensive catalog of rental cars. Find the perfect vehicle for your journey, with options to filter by brand, price, and mileage.',
  openGraph: {
    title: 'RentalCar | Catalog - Browse Our Car Collection',
    description:
      'Explore our extensive catalog of rental cars. Find the perfect vehicle for your journey, with options to filter by brand, price, and mileage.',
    url: 'https://rental-car-xi-blue.vercel.app/catalog',
    siteName: 'RentalCar',
    locale: 'en-US',
    type: 'website',
  },
};

const CatalogPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ['cars', {}],
    queryFn: () => fetchCars({ page: 1, perPage: 12 }),
    initialPageParam: 1,
  });

  await queryClient.prefetchQuery({
    queryKey: ['carsFilters'],
    queryFn: getFilters,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CatalogClient />
    </HydrationBoundary>
  );
};
export default CatalogPage;

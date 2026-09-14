import { Metadata } from 'next';
import { fetchCarById } from '@/lib/api';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import CarDetailsClient from './CarDetails.client';

interface CarDetailsProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: CarDetailsProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const car = await fetchCarById(id);
    return {
      title: `RentalCar | ${car.brand} ${car.model}`,
      description: car.description.slice(0, 30),
      openGraph: {
        title: `RentalCar | ${car.brand} ${car.model}`,
        description: car.description.slice(0, 100),
        url: `https://rental-car-xi-blue.vercel.app/catalog/${id}`,
        siteName: 'RentalCar',
        images: [
          {
            url: car.img,
            width: 1200,
            height: 630,
            alt: `${car.brand} ${car.model}`,
          },
        ],
        type: 'article',
      },
    };
  } catch {
    return {
      title: 'RentalCar | Car Details',
      description: 'Details of the selected car.',
    };
  }
}

const CarDetails = async ({ params }: CarDetailsProps) => {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['car', id],
    queryFn: () => fetchCarById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CarDetailsClient />
    </HydrationBoundary>
  );
};
export default CarDetails;

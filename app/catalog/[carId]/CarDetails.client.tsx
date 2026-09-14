'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { fetchCarById } from '@/lib/api';
import Image from 'next/image';
import CarInfo from '@/components/CarInfo/CarInfo';
import BookingForm from '@/components/BookingForm/BookingForm';
import Loader from '@/components/Loader/Loader';
import { Toaster } from 'react-hot-toast';
import css from './CarDetails.module.css';

const CarDetailsClient = () => {
  const { carId: id } = useParams() as { carId: string };

  const {
    data: car,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['car', id],
    queryFn: () => fetchCarById(id),
    refetchOnMount: false,
  });

  if (isLoading)
    return (
      <Loader>
        <h2 className={css.loaderTitle}>Loading car...</h2>
        <p className={css.loaderDescription}>
          Please wait while we fetch the car details for you
        </p>
      </Loader>
    );

  if (error || !car) return <p>Something went wrong.</p>;

  return (
    <section className={css.section}>
      <div className={css.container}>
        <div className={css.imageContainer}>
          <div className={css.imageWrapper}>
            <Image
              src={car.img}
              alt={car.brand}
              width={640}
              height={512}
              loading="eager"
            />
          </div>
          <BookingForm carId={car.id} />
        </div>
        <CarInfo car={car} />
        <Toaster position="top-center" />
      </div>
    </section>
  );
};
export default CarDetailsClient;

import { Metadata } from 'next';
import css from './Home.module.css';

export const metadata: Metadata = {
  title: 'RentalCar | 404 - Page not found',
  description: 'Sorry, the page you are looking for does not exist.',
  openGraph: {
    title: 'RentalCar | 404 - Page not found',
    description: 'Sorry, the page you are looking for does not exist.',
    url: 'https://rental-car-xi-blue.vercel.app/not-found',
    siteName: 'RentalCar',
    locale: 'en-US',
    type: 'website',
  },
};

const NotFound = () => {
  return (
    <section className={css.section}>
      <div className={css.container}>
        <h1 className={css.title}>404 - Page not found</h1>
        <p className={css.description}>
          Sorry, the page you are looking for does not exist.
        </p>
      </div>
    </section>
  );
};
export default NotFound;

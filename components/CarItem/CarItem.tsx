import Link from 'next/link';
import Image from 'next/image';
import { Car } from '@/types/car';
import css from './CarItem.module.css';

interface CarItemProps {
  car: Car;
}

const CarItem = ({ car }: CarItemProps) => {
  const {
    id,
    year,
    brand,
    model,
    type,
    img,
    rentalPrice,
    rentalCompany,
    mileage,
    location,
  } = car;

  return (
    <li className={css.item}>
      <div className={css.imageWrapper}>
        <Image
          src={img}
          alt={`${brand} ${model}`}
          width={401}
          height={268}
          loading="eager"
        />
      </div>
      <div className={css.modelWrapper}>
        <p className={css.modelDescription}>
          {brand} <span className={css.modelAccent}>{model}</span>, {year}
        </p>
        <p className={css.modelDescription}>{`$${rentalPrice}`}</p>
      </div>
      <div className={css.modelDetailsWrapper}>
        <ul className={css.modelDetailsList}>
          <li className={css.modelDetailsItem}>
            <p className={css.detailsDescription}>{location.city}</p>
          </li>
          <li className={css.modelDetailsItem}>
            <p className={css.detailsDescription}>{location.country}</p>
          </li>
          <li className={css.modelDetailsItem}>
            <p className={css.detailsDescription}>{rentalCompany}</p>
          </li>
        </ul>
        <ul className={css.modelDetailsList}>
          <li className={css.modelDetailsItem}>
            <p className={css.detailsDescription}>{type}</p>
          </li>
          <li className={`${css.modelDetailsItem} ${css.modelDetailsItemLast}`}>
            <p className={css.detailsDescription}>{`${mileage} km`}</p>
          </li>
        </ul>
      </div>
      <Link className={css.readMoreBtn} href={`/catalog/${id}`} target="_blank">
        Read more
      </Link>
    </li>
  );
};
export default CarItem;

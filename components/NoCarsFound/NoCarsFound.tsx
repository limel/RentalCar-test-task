import Image from 'next/image';
import css from './NoCarsFound.module.css';

export interface NoCarsFoundProps {
  resetFilters: () => void;
}

const NoCarsFound = ({ resetFilters }: NoCarsFoundProps) => {
  return (
    <div className={css.wrapper}>
      <Image
        className={css.image}
        src="/no-cars-found.webp"
        alt="No cars found"
        width={414}
        height={388}
      />
      <h2 className={css.title}>No cars found</h2>
      <p className={css.description}>
        We couldn`t find any cars that match your current filters. Try changing
        your search criteria or reset the filters.
      </p>
      <button className={css.button} onClick={resetFilters}>
        Reset Filters
      </button>
    </div>
  );
};
export default NoCarsFound;

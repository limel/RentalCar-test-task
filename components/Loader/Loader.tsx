import { ReactNode } from 'react';
import css from './Loader.module.css';

interface LoaderProps {
  children: ReactNode;
}

const Loader = ({ children }: LoaderProps) => {
  return (
    <div className={css.loaderWrapper}>
      <div className={css.spinner}>
        <span className={css.loader} aria-label="Loading" />
        {children}
      </div>
    </div>
  );
};
export default Loader;

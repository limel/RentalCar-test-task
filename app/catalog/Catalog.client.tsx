'use client';

import CarList from '@/components/CarList/CarList';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { fetchCars, getFilters } from '@/lib/api';
import { useState } from 'react';
import Filters from '@/components/Filters/Filters';
import Loader from '@/components/Loader/Loader';
import NoCarsFound from '@/components/NoCarsFound/NoCarsFound';
import css from './CatalogPage.module.css';

const CatalogClient = () => {
  const [filters, setFilters] = useState({});

  const { data: filtersData } = useQuery({
    queryKey: ['carFilters'],
    queryFn: getFilters,
  });

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    isLoading,
    isFetched,
    error,
  } = useInfiniteQuery({
    queryKey: ['cars', filters],
    queryFn: ({ pageParam }) => {
      return fetchCars({ page: pageParam, perPage: 12, ...filters });
    },
    initialPageParam: 1,
    getNextPageParam: lastResponse => {
      const nextPage = lastResponse.page + 1;
      return nextPage <= lastResponse.totalPages ? nextPage : undefined;
    },
    select: data => {
      return {
        ...data,
        cars: data.pages.flatMap(page => page.cars),
      };
    },
  });

  const cars = data?.cars ?? [];
  const hasCars = cars.length > 0;
  const showNoResults = isFetched && !isError && !hasCars;

  return (
    <section className={css.section}>
      <div className={css.container}>
        <Filters filters={filtersData} setFilters={setFilters} />
        <div className={css.carListContainer}>
          {(isLoading || isFetchingNextPage) && (
            <Loader>
              <h2 className={css.loaderTitle}>Loading cars...</h2>
              <p className={css.loaderDescription}>
                Please wait while we fetch the best cars for you
              </p>
            </Loader>
          )}
          {isError && (
            <p className={css.message}>
              Could not load cars. {error instanceof Error ? error.message : ''}
            </p>
          )}
          {showNoResults && <NoCarsFound resetFilters={() => setFilters({})} />}
          {hasCars && <CarList cars={cars} />}
        </div>
        {hasNextPage && (
          <button
            className={css.button}
            type="button"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}>
            {isFetchingNextPage ? 'Loading...' : 'Load more'}
          </button>
        )}
      </div>
    </section>
  );
};
export default CatalogClient;

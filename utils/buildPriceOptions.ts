import { CarsFilters } from '@/types/car';

export const buildPriceOptions = (price?: CarsFilters['price']): number[] => {
  if (!price) return [];

  const options: number[] = [];

  for (let i = price.min; i <= price.max; i += 10) {
    options.push(i);
  }

  return options;
};

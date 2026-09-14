# RentalCar

A frontend web application for **RentalCar** — a car rental company. Users can browse a catalog of available cars, filter them by brand, price and mileage, and submit a booking request for the car they like.

Built as a test task with **Next.js (App Router)** and **TypeScript**.

## Features

- **Home page (`/`)** — a hero section with a call-to-action button that leads to the catalog.
- **Catalog page (`/catalog`)** — a grid of cars fetched from the backend, with:
  - filtering by brand (single choice), price (single choice) and mileage (from/to), applied on the backend;
  - "Load more" pagination powered by `useInfiniteQuery` from TanStack Query;
  - a "Read more" button on every card that opens the car's details page in a new tab.
- **Car details page (`/catalog/[carId]`)** — full information about the selected car (specifications, rental conditions, features), a large photo, and a booking form. On successful submission the user sees a success notification.

## Tech stack

- [Next.js](https://nextjs.org/) 16 (App Router)
- [TypeScript](https://www.typescriptlang.org/)
- [TanStack Query](https://tanstack.com/query/latest) (`useInfiniteQuery` for catalog pagination)
- CSS Modules for styling
- [Formik](https://formik.org/) + [Yup](https://github.com/jquense/yup) for the booking form
- [Axios](https://axios-http.com/) for API requests
- [react-hot-toast](https://react-hot-toast.com/) for notifications
- API: [Rental Car API](https://car-rental-api.goit.study/api-docs/)

## Getting started

### Prerequisites

- Node.js 18.18+ (Node 20+ recommended)
- npm

### Installation

```bash
npm install
```

### Running in development mode

```bash
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

### Production build

```bash
npm run build
npm run start
```

### Linting

```bash
npm run lint
```

## Project structure

```
app/
  page.tsx                    # Home page
  layout.tsx                  # Root layout (font, metadata, header, providers)
  globals.css
  not-found.tsx
  catalog/
    page.tsx                  # Catalog page (server component)
    Catalog.client.tsx         # Data-fetching + filters + pagination (client)
    error.tsx
    [carId]/
      page.tsx                 # Car details page (server component)
      CarDetails.client.tsx     # Car details + booking form (client)
      error.tsx
components/
  Header/                      # Site header with active-link navigation
  Filters/                     # Brand / price / mileage filters
  CarList/                     # Grid of car cards
  CarItem/                     # Single car card used in the catalog grid
  CarInfo/                     # Car specs / conditions / features block
  BookingForm/                 # Booking request form (Formik + Yup)
  NoCarsFound/                 # Empty-state view for the catalog
  Loader/                      # Loading spinner
  TanStackProvider/            # TanStack Query provider + toast container
lib/
  api.ts                       # Typed axios wrappers for the Rental Car API
types/
  car.ts                       # Shared TypeScript types (Car, CarsFilters, BookingRequest)
utils/
  buildPriceOptions.ts          # Builds the price filter's select options
```

## API

This project consumes the public [Rental Car API](https://car-rental-api.goit.study/api-docs/):

- `GET /cars` — list of cars with `brand`, `price`, `minMileage`, `maxMileage`, `perPage`, `page` query parameters.
- `GET /cars/filters` — available brands and price range for the filters.
- `GET /cars/{id}` — details of a single car.
- `POST /cars/{carId}/booking-requests` — submit a booking request (`name`, `email`, `comment`).

## Author

Andrey Nazarenko

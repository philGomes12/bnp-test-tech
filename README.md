# SpaceX Explorer

SpaceX Explorer is an Angular application for browsing past SpaceX launches, viewing launch details, searching missions, and managing favorite launches.

This project was developed as part of a technical assessment focused on Angular, NgRx, RxJS, TypeScript, and production-ready application configuration.

## Requirements

Before running the project, make sure the following tools are installed:

- Node.js
- npm

The project uses npm `11.6.2`.

## Installation

Clone the repository:

```bash
git clone https://github.com/philGomes12/bnp-test-tech.git
```

Navigate to the project directory:

```bash
cd bnp-test-tech
```

Install the dependencies:

```bash
npm install
```

## Running Locally

Start the development server:

```bash
npm start
```

The application will be available at:

```text
http://localhost:4200
```

## Production Build

Generate an optimized production build:

```bash
npm run build:production
```

The generated files are available under:

```text
dist/spaceX_kata
```

A development build can also be generated with:

```bash
npm run build:development
```

## Running Unit Tests

Run the unit tests with:

```bash
npm test -- --watch=false
```

The current unit tests cover:

- Launch list component
- Launch details component
- NgRx action dispatching from components
- Launch search
- Favorite interactions
- SpaceX service
- API DTO mapping
- Launch lookup by ID

## Application Architecture

The application uses NgRx as the source of truth for global launch state.

The asynchronous data flow follows:

```text
Component
    |
    | dispatch
    v
Action
    |
    v
Effect
    |
    v
SpacexService
    |
    v
Effect
    |
    | dispatch success / failure
    v
Reducer
    |
    v
Store
    |
    v
Selector
    |
    v
Component
```

Components do not perform HTTP requests directly.

HTTP requests and other side effects are handled outside reducers through NgRx Effects.

Reducers remain synchronous and immutable.

## State Management

NgRx manages:

- Launch list
- Selected launch
- Loading state
- Error state
- Favorite launch IDs

Launch data is consumed through memoized selectors.

Favorites are stored as launch IDs instead of duplicating complete launch objects in the state.

Favorite state is synchronized with `localStorage`, allowing favorites to survive browser refreshes while NgRx remains the runtime source of truth.

## Launch Details

Launch details are available through:

```text
/launch/:id
```

The details page dispatches an NgRx action using the route ID.

The corresponding Effect retrieves the launch through the service and updates the selected launch in the Store.

This allows the details page to work when:

- Navigating from the launch list
- Accessing the URL directly
- Refreshing the browser while on the details page

## Available Scripts

### Development server

```bash
npm start
```

### Production build

```bash
npm run build:production
```

### Development build

```bash
npm run build
```

### Unit tests

```bash
npm test
```

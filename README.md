# Customer-Trip-Search

A React + TypeScript app to search and visualise trips - switch between a sortable table and an interactive map (using Leaflet).

## Live Deployment

You can access the deployed application here:  
[https://customer-trip-search.netlify.app/](https://customer-trip-search.netlify.app/)

## Setup & Run

```bash
# 1. Clone the repository
git clone <repo-url>

# 2. Enter the project folder
cd Customer-Trip-Search

# 3. Install dependencies
npm install

# 4. Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

> **Trip data** is served from `public/trips.json`. The app fetches it at runtime, so the dev server must be running (don't just open `index.html` directly).

## Other Commands

| Command | What it does |
|---|---|
| `npm run build` | Type-check + bundle to `dist/` |
| `npm run preview` | Serve the production build locally |

## Project Structure

```
src/
  App.tsx                  # Root component
  components/
    SearchBar.tsx          # From / To / date-range filters
    TripTable.tsx          # Sortable list view
    TripMap.tsx            # Leaflet map view
  lib/tripUtils.ts         # Filter logic
  types/trip.ts            # Trip type definition
  pages/TripsHomePage.tsx  # Trip Home page for Data fetching, view toggle
public/
  trips.json               # Source data
```

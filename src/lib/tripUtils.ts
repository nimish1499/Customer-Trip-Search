import type { Trip } from "../types/trip";

export function parseTripTime(s: string): number {
  return new Date(s.replace(" ", "T")).getTime();
}

export function totalSlots(t: Trip): number {
  return Object.values(t.slotsByType).reduce((a, b) => a + b.available, 0);
}

export function filterTrips(
  trips: Trip[],
  from: string,
  to: string,
  dateFrom: string,
  dateTo: string
): Trip[] {
  const f = from.trim().toLowerCase();
  const tq = to.trim().toLowerCase();
  const df = dateFrom ? new Date(dateFrom + "T00:00:00").getTime() : null;
  const dt = dateTo ? new Date(dateTo + "T23:59:59").getTime() : null;
  return trips.filter((x) => {
    if (f && !x.origin.toLowerCase().includes(f) && !x.originCity.toLowerCase().includes(f))
      return false;
    if (
      tq &&
      !x.destination.toLowerCase().includes(tq) &&
      !x.destinationCity.toLowerCase().includes(tq)
    )
      return false;
    const ts = parseTripTime(x.tripStart);
    if (df !== null && ts < df) return false;
    if (dt !== null && ts > dt) return false;
    return true;
  });
}

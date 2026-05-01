import { useMemo } from "react";
import type { Trip } from "../types/trip";
import { parseTripTime, totalSlots } from "../lib/tripUtils";

export type SortKey = "origin" | "destination" | "operator" | "tripStart" | "tripEnd" | "slots";

type Props = {
  trips: Trip[];
  sortKey: SortKey;
  sortDir: "asc" | "desc";
  onSort: (k: SortKey) => void;
  selectedId: number | null;
  onSelect: (id: number) => void;
};

export function TripTable({ trips, sortKey, sortDir, onSort, selectedId, onSelect }: Props) {
  const sorted = useMemo(() => {
    const arr = [...trips];
    const inv = sortDir === "asc" ? 1 : -1;
    arr.sort((a, b) => {
      let va: string | number = "";
      let vb: string | number = "";
      switch (sortKey) {
        case "origin":
          va = a.origin.toLowerCase();
          vb = b.origin.toLowerCase();
          break;
        case "destination":
          va = a.destination.toLowerCase();
          vb = b.destination.toLowerCase();
          break;
        case "operator":
          va = a.operator.toLowerCase();
          vb = b.operator.toLowerCase();
          break;
        case "tripStart":
          va = parseTripTime(a.tripStart);
          vb = parseTripTime(b.tripStart);
          break;
        case "tripEnd":
          va = parseTripTime(a.tripEnd);
          vb = parseTripTime(b.tripEnd);
          break;
        case "slots":
          va = totalSlots(a);
          vb = totalSlots(b);
          break;
      }
      let c = 0;
      if (va < vb) c = -1;
      else if (va > vb) c = 1;
      if (c !== 0) return c * inv;
      const tie = parseTripTime(a.tripStart) - parseTripTime(b.tripStart);
      if (tie !== 0) return tie;
      return a.id - b.id;
    });
    return arr;
  }, [trips, sortKey, sortDir]);

  const th = (k: SortKey, label: string) => {
    const active = sortKey === k;
    const aria = active ? (sortDir === "asc" ? "ascending" : "descending") : "none";
    return (
      <th className="whitespace-nowrap border-b border-slate-200 bg-slate-200/90 px-2 py-2 text-left backdrop-blur-sm" aria-sort={aria}>
        <button
          type="button"
          className={`flex w-full min-w-0 items-center gap-2 rounded px-1 py-1 text-left text-sm font-semibold outline-none ring-offset-2 focus-visible:ring-2 focus-visible:ring-slate-500 ${
            active ? "text-slate-900" : "text-slate-700 hover:bg-slate-300/50"
          }`}
          onClick={() => onSort(k)}
        >
          <span className="min-w-0 flex-1 truncate">{label}</span>
          <span className={`shrink-0 tabular-nums ${active ? "text-slate-900" : "text-slate-500"}`} aria-hidden>
            {active ? (sortDir === "asc" ? "↑" : "↓") : "↕"}
          </span>
        </button>
      </th>
    );
  };

  return (
    <div className="rounded-lg border border-slate-200 bg-white shadow-sm">
      <p className="border-b border-slate-100 px-3 py-2 text-xs text-slate-500">Sort: click a column heading. Click again to reverse.</p>
      <div className="max-h-[min(70vh,32rem)] overflow-auto">
        <table className="w-full min-w-[44rem] border-collapse text-left text-sm">
          <thead className="sticky top-0 z-10 shadow-sm">
            <tr>
              {th("origin", "Origin")}
              {th("destination", "Destination")}
              {th("operator", "Operator")}
              {th("tripStart", "Trip start")}
              {th("tripEnd", "Trip end")}
              {th("slots", "Available slots")}
            </tr>
          </thead>
          <tbody>
            {sorted.map((r) => (
              <tr
                key={r.id + r.tripStart}
                role="button"
                tabIndex={0}
                onClick={() => onSelect(r.id)}
                onKeyDown={(e) => e.key === "Enter" && onSelect(r.id)}
                className={`cursor-pointer border-b border-slate-100 transition ${
                  selectedId === r.id
                    ? "bg-sky-100 ring-1 ring-inset ring-sky-400"
                    : "bg-white hover:bg-slate-50"
                }`}
              >
                <td className="px-3 py-2 text-slate-900">{r.origin}</td>
                <td className="px-3 py-2 text-slate-900">{r.destination}</td>
                <td className="px-3 py-2 text-slate-800">{r.operator}</td>
                <td className="px-3 py-2 font-mono text-xs text-slate-700">{r.tripStart}</td>
                <td className="px-3 py-2 font-mono text-xs text-slate-700">{r.tripEnd}</td>
                <td className="px-3 py-2 text-slate-900">{totalSlots(r)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

import { useCallback, useEffect, useMemo, useState } from "react";
import type { Trip } from "../types/trip";
import { filterTrips } from "../lib/tripUtils";
import { SearchBar } from "../components/SearchBar";
import { TripTable, type SortKey } from "../components/TripTable";

type View = "list" | "map";

export default function TripsHomePage() {
  const [raw, setRaw] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadErr, setLoadErr] = useState<string | null>(null);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [view, setView] = useState<View>("list");
  const [sortKey, setSortKey] = useState<SortKey>("tripStart");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [selectedId, setSelectedId] = useState<number | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      setLoadErr(null);
      try {
        await new Promise((r) => setTimeout(r, 400));
        const res = await fetch("/trips.json");
        if (!res.ok) throw new Error(String(res.status));
        const data = (await res.json()) as Trip[];
        if (alive) setRaw(Array.isArray(data) ? data : []);
      } catch {
        if (alive) {
          setLoadErr("Could not load trips.");
          setRaw([]);
        }
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const filtered = useMemo(
    () => filterTrips(raw, from, to, dateFrom, dateTo),
    [raw, from, to, dateFrom, dateTo]
  );

  const onSort = useCallback(
    (k: SortKey) => {
      if (k === sortKey) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
      else {
        setSortKey(k);
        setSortDir("asc");
      }
    },
    [sortKey]
  );

  const emptyData = !loading && !loadErr && raw.length === 0;
  const noResults = !loading && !loadErr && raw.length > 0 && filtered.length === 0;

  return (
    <div className="min-h-screen p-4 md:p-6">
      <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start">
        <div className="flex-1">
          <h1 className="text-xl font-bold tracking-tight text-slate-900 md:text-2xl">Available trips</h1>
          <p className="mt-1 text-sm text-slate-600">Search intermodal routes by origin, destination, and dates.</p>
        </div>
        <div className="flex shrink-0 gap-1 rounded-lg border border-slate-300 bg-white p-1 shadow-sm sm:self-start">
          <button
            type="button"
            className={`rounded-md px-4 py-2 text-sm font-medium transition ${view === "list" ? "bg-slate-800 text-white shadow" : "text-slate-700 hover:bg-slate-100"}`}
            onClick={() => setView("list")}
          >
            List
          </button>
          <button
            type="button"
            className={`rounded-md px-4 py-2 text-sm font-medium transition ${view === "map" ? "bg-slate-800 text-white shadow" : "text-slate-700 hover:bg-slate-100"}`}
            onClick={() => setView("map")}
          >
            Map
          </button>
        </div>
      </header>

      <div className="mb-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <SearchBar
          from={from}
          to={to}
          dateFrom={dateFrom}
          dateTo={dateTo}
          setFrom={setFrom}
          setTo={setTo}
          setDateFrom={setDateFrom}
          setDateTo={setDateTo}
        />
      </div>

      {loading && (
        <div className="flex min-h-[12rem] items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white text-slate-600">
          Loading trips…
        </div>
      )}

      {loadErr && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center text-red-800">{loadErr}</div>
      )}

      {emptyData && (
        <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-slate-600 shadow-sm">No trip data available.</div>
      )}

      {noResults && (
        <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-slate-600 shadow-sm">No trips match your search.</div>
      )}

      {!loading && !loadErr && filtered.length > 0 && view === "list" && (
        <TripTable
          trips={filtered}
          sortKey={sortKey}
          sortDir={sortDir}
          onSort={onSort}
          selectedId={selectedId}
          onSelect={setSelectedId}
        />
      )}
    </div>
  );
}

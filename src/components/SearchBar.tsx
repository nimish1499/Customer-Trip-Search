type Props = {
  from: string;
  to: string;
  dateFrom: string;
  dateTo: string;
  setFrom: (v: string) => void;
  setTo: (v: string) => void;
  setDateFrom: (v: string) => void;
  setDateTo: (v: string) => void;
};

export function SearchBar({
  from,
  to,
  dateFrom,
  dateTo,
  setFrom,
  setTo,
  setDateFrom,
  setDateTo,
}: Props) {
  const field =
    "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 pr-8 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 placeholder:text-slate-400";

  const ClearButton = ({ value, onClear }: { value: string; onClear: () => void }) =>
    value ? (
      <button
        type="button"
        onClick={onClear}
        className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition"
        aria-label="Clear"
      >
        ✕
      </button>
    ) : null;

  return (
    <div className="flex flex-col gap-3 md:flex-row md:flex-wrap md:items-end">
      <label className="block min-w-[10rem] flex-1">
        <span className="mb-1 block text-xs font-medium text-slate-600">From</span>
        <div className="relative">
          <input className={field} value={from} onChange={(e) => setFrom(e.target.value)} placeholder="City or terminal" />
          <ClearButton value={from} onClear={() => setFrom("")} />
        </div>
      </label>

      <label className="block min-w-[10rem] flex-1">
        <span className="mb-1 block text-xs font-medium text-slate-600">To</span>
        <div className="relative">
          <input className={field} value={to} onChange={(e) => setTo(e.target.value)} placeholder="City or terminal" />
          <ClearButton value={to} onClear={() => setTo("")} />
        </div>
      </label>

      <label className="block min-w-[9rem]">
        <span className="mb-1 block text-xs font-medium text-slate-600">From date</span>
        <div className="relative">
          <input className={field} type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} />
          <ClearButton value={dateFrom} onClear={() => setDateFrom("")} />
        </div>
      </label>

      <label className="block min-w-[9rem]">
        <span className="mb-1 block text-xs font-medium text-slate-600">To date</span>
        <div className="relative">
          <input className={field} type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} />
          <ClearButton value={dateTo} onClear={() => setDateTo("")} />
        </div>
      </label>
    </div>
  );
}
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
    "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 placeholder:text-slate-400";
  return (
    <div className="flex flex-col gap-3 md:flex-row md:flex-wrap md:items-end">
      <label className="block min-w-[10rem] flex-1">
        <span className="mb-1 block text-xs font-medium text-slate-600">From</span>
        <input className={field} value={from} onChange={(e) => setFrom(e.target.value)} placeholder="City or terminal" />
      </label>
      <label className="block min-w-[10rem] flex-1">
        <span className="mb-1 block text-xs font-medium text-slate-600">To</span>
        <input className={field} value={to} onChange={(e) => setTo(e.target.value)} placeholder="City or terminal" />
      </label>
      <label className="block min-w-[9rem]">
        <span className="mb-1 block text-xs font-medium text-slate-600">From date</span>
        <input className={field} type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} />
      </label>
      <label className="block min-w-[9rem]">
        <span className="mb-1 block text-xs font-medium text-slate-600">To date</span>
        <input className={field} type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} />
      </label>
    </div>
  );
}

interface SearchBarProps {
    value: string
    onChange: (value: string) => void
    placeholder?: string
}

export function SearchBar({ value, onChange, placeholder = "Search posts..." }: SearchBarProps) {
    return <div className={"relative w-full max-w-xs"}>
        <svg
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
            />
        </svg>
        <input
        type="search"
        role="searchbox"
        aria-label="Search posts"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-full border border-slate-700 bg-slate-900 py-2 pl-9 pr-3 text-sm
                   text-slate-100 placeholder-slate-500
                   focus:border-amber-300/60 focus:outline-none focus:ring-2 focus:ring-amber-300/20"
        />
    </div>
}

"use client";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchInput({ value, onChange, placeholder = "Busca en nuestra tienda" }: SearchInputProps) {
  return (
    <div className="flex w-full max-w-[600px] items-center gap-2.5 rounded-lg border border-[#bbb] bg-white px-4 py-2">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#777" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
      </svg>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="flex-1 bg-transparent font-body text-base text-[#111] outline-none placeholder:text-[#777]"
      />
    </div>
  );
}

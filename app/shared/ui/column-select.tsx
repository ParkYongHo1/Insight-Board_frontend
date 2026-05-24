interface ColumnSelectProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  placeholder: string;
  columns: { value: string; label: string }[];
}

export const ColumnSelect = ({
  value,
  onChange,
  placeholder,
  columns,
}: ColumnSelectProps) => (
  <select
    value={value}
    onChange={onChange}
    className="w-full h-10 bg-white border border-zinc-200 rounded-none px-3 text-sm font-medium outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all cursor-pointer"
  >
    <option key="placeholder" value="" disabled>
      {placeholder}
    </option>
    {columns.map((col) => (
      <option key={col.value} value={col.value}>
        {col.label}
      </option>
    ))}
  </select>
);

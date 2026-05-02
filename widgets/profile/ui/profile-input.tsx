import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { AlertCircle } from "lucide-react";
import { useState } from "react";

const ProfileInput = ({
  id,
  label,
  value,
  onChange,
  type = "text",
  disabled = false,
  placeholder = "",
  error = "",
}: {
  id: string;
  label: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  disabled?: boolean;
  placeholder?: string;
  error?: string;
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative w-full">
      <Input
        id={id}
        type={type}
        value={value || ""}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        disabled={disabled}
        placeholder={isFocused ? placeholder : ""}
        className={cn(
          "h-14 px-5 py-4 transition-all duration-200 bg-white border-zinc-200 rounded-2xl",
          "focus-visible:ring-0 focus-visible:ring-offset-0 outline-none",
          isFocused ? "border-blue-500" : "border-zinc-200",
          error && "border-red-500",
          disabled &&
            "bg-[#f2f4f6] border-[#e5e8eb] cursor-not-allowed text-zinc-500",
        )}
      />
      <Label
        htmlFor={id}
        className={cn(
          "absolute left-5 px-1 transition-all duration-200 pointer-events-none bg-white font-normal",
          isFocused || value || disabled
            ? "top-0 -translate-y-1/2 text-xs font-medium"
            : "top-1/2 -translate-y-1/2 text-zinc-400 text-sm",
          error
            ? "text-red-500"
            : isFocused
              ? "text-blue-500"
              : "text-zinc-500",
        )}
      >
        {label}
      </Label>
      {error && (
        <p className="absolute -bottom-5 left-2 text-[10px] text-red-500 flex items-center gap-1">
          <AlertCircle className="w-3 h-3" /> {error}
        </p>
      )}
    </div>
  );
};
export default ProfileInput;

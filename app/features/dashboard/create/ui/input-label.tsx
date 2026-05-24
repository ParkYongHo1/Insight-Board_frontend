import { Label } from "@/components/ui/label";

const InputLabel = ({
  htmlFor,
  children,
  required,
}: {
  htmlFor: string;
  children: React.ReactNode;
  required?: boolean;
}) => (
  <Label
    htmlFor={htmlFor}
    className="text-sm font-bold text-zinc-600 mb-2 block"
  >
    {children}
    {required && <span className="text-red-500 ml-1">*</span>}
  </Label>
);

export default InputLabel;

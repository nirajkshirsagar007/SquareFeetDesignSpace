import { cn } from "@/lib/utils";
import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export default function Input({
  label,
  error,
  hint,
  className,
  id,
  ...props
}: InputProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-charcoal-light"
        >
          {label}
          {props.required && <span className="text-gold ml-1">*</span>}
        </label>
      )}
      <input
        id={inputId}
        {...props}
        className={cn(
          "w-full px-3 py-2 bg-white border rounded text-sm text-charcoal",
          "placeholder:text-charcoal/40 outline-none transition-colors",
          "focus:border-gold focus:ring-1 focus:ring-gold/30",
          error ? "border-red-400" : "border-charcoal/20",
          props.disabled && "opacity-50 cursor-not-allowed bg-ivory",
          className
        )}
      />
      {hint && !error && (
        <p className="text-xs text-charcoal-muted">{hint}</p>
      )}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

// Also export a Textarea with the same styling
interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export function Textarea({
  label,
  error,
  hint,
  className,
  id,
  ...props
}: TextareaProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-charcoal-light"
        >
          {label}
          {props.required && <span className="text-gold ml-1">*</span>}
        </label>
      )}
      <textarea
        id={inputId}
        {...props}
        className={cn(
          "w-full px-3 py-2 bg-white border rounded text-sm text-charcoal",
          "placeholder:text-charcoal/40 outline-none transition-colors resize-y min-h-[100px]",
          "focus:border-gold focus:ring-1 focus:ring-gold/30",
          error ? "border-red-400" : "border-charcoal/20",
          props.disabled && "opacity-50 cursor-not-allowed bg-ivory",
          className
        )}
      />
      {hint && !error && (
        <p className="text-xs text-charcoal-muted">{hint}</p>
      )}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

// Select dropdown with same styling
interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

export function Select({
  label,
  error,
  options,
  className,
  id,
  ...props
}: SelectProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-charcoal-light"
        >
          {label}
          {props.required && <span className="text-gold ml-1">*</span>}
        </label>
      )}
      <select
        id={inputId}
        {...props}
        className={cn(
          "w-full px-3 py-2 bg-white border rounded text-sm text-charcoal",
          "outline-none transition-colors cursor-pointer",
          "focus:border-gold focus:ring-1 focus:ring-gold/30",
          error ? "border-red-400" : "border-charcoal/20",
          className
        )}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

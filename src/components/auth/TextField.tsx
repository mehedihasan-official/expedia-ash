"use client";

import { Eye, EyeOff } from "lucide-react";
import { useId, useState, type InputHTMLAttributes } from "react";

interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "id"> {
  label: string;
  error?: string | null;
  hint?: string;
}

/**
 * Expedia-style input: bordered 8px box with the label sitting above the value
 * once the field has focus or content. Password fields get a show/hide toggle.
 */
export default function TextField({ label, error, hint, type = "text", value, className = "", ...rest }: TextFieldProps) {
  const id = useId();
  const [reveal, setReveal] = useState(false);
  const isPassword = type === "password";
  const filled = String(value ?? "").length > 0;
  const describedBy = error ? `${id}-err` : hint ? `${id}-hint` : undefined;

  return (
    <div className={className}>
      <div
        className={`group relative h-14 rounded-lg border bg-white transition focus-within:border-xp-blue focus-within:ring-1 focus-within:ring-xp-blue ${
          error ? "border-xp-heart focus-within:border-xp-heart focus-within:ring-xp-heart" : "border-[#8d8f9d] hover:border-xp-navy"
        }`}
      >
        <label
          htmlFor={id}
          className={`pointer-events-none absolute left-3 text-xp-muted transition-all ${
            filled ? "top-1.5 text-[11px] leading-[13px]" : "top-1/2 -translate-y-1/2 text-base group-focus-within:top-1.5 group-focus-within:translate-y-0 group-focus-within:text-[11px] group-focus-within:leading-[13px]"
          }`}
        >
          {label}
        </label>
        <input
          id={id}
          type={isPassword && reveal ? "text" : type}
          value={value}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={`h-full w-full rounded-lg bg-transparent px-3 pb-1 pt-5 text-base text-xp-navy outline-none ${isPassword ? "pr-12" : ""}`}
          {...rest}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setReveal((r) => !r)}
            aria-label={reveal ? "Hide password" : "Show password"}
            aria-pressed={reveal}
            className="absolute right-2 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full text-xp-navy transition hover:bg-xp-gray"
          >
            {reveal ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>
      {error ? (
        <p id={`${id}-err`} role="alert" className="mt-1.5 text-xs leading-4 text-xp-heart">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="mt-1.5 text-xs leading-4 text-xp-muted">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

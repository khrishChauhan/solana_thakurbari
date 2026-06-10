import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, id, error, className = '', ...props }, ref) => {
    const internalId = id || label.replace(/\s+/g, '-').toLowerCase();
    return (
      <div className="flex flex-col gap-1.5 w-full">
        <label htmlFor={internalId} className="text-[10px] uppercase text-stone-600 font-semibold tracking-wider">
          {label} {props.required && <span className="text-amber-500">*</span>}
        </label>
        <input
          id={internalId}
          ref={ref}
          className={`w-full bg-white border border-stone-200 rounded px-3 py-2 text-sm focus:border-amber-500 outline-none transition-all text-stone-900 placeholder:text-stone-400 shadow-[0_0_10px_rgba(245,158,11,0)] focus:shadow-[0_0_10px_rgba(245,158,11,0.1)] ${className}`}
          {...props}
        />
        {error && <p className="text-red-400 text-xs">{error}</p>}
      </div>
    );
  }
);
Input.displayName = 'Input';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { label: string; value: string }[];
  error?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, id, options, error, className = '', ...props }, ref) => {
    const internalId = id || label.replace(/\s+/g, '-').toLowerCase();
    return (
      <div className="flex flex-col gap-1.5 w-full">
        <label htmlFor={internalId} className="text-[10px] uppercase text-stone-600 font-semibold tracking-wider">
          {label} {props.required && <span className="text-amber-500">*</span>}
        </label>
        <select
          id={internalId}
          ref={ref}
          className={`w-full bg-white border border-stone-200 rounded px-3 py-2 text-sm focus:border-amber-500 outline-none transition-all text-stone-900 placeholder:text-stone-400 appearance-none shadow-[0_0_10px_rgba(245,158,11,0)] focus:shadow-[0_0_10px_rgba(245,158,11,0.1)] ${className}`}
          {...props}
        >
          <option value="" disabled hidden>
            Select an option
          </option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-white text-stone-900">
              {opt.label}
            </option>
          ))}
        </select>
        {error && <p className="text-red-400 text-xs">{error}</p>}
      </div>
    );
  }
);
Select.displayName = 'Select';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, id, error, className = '', ...props }, ref) => {
    const internalId = id || label.replace(/\s+/g, '-').toLowerCase();
    return (
      <div className="flex flex-col gap-1.5 w-full">
        <label htmlFor={internalId} className="text-[10px] uppercase text-stone-600 font-semibold tracking-wider">
          {label} {props.required && <span className="text-amber-500">*</span>}
        </label>
        <textarea
          id={internalId}
          ref={ref}
          className={`w-full bg-white border border-stone-200 rounded px-3 py-2 text-sm focus:border-amber-500 outline-none transition-all text-stone-900 placeholder:text-stone-400 min-h-[100px] resize-y shadow-[0_0_10px_rgba(245,158,11,0)] focus:shadow-[0_0_10px_rgba(245,158,11,0.1)] ${className}`}
          {...props}
        />
        {error && <p className="text-red-400 text-xs">{error}</p>}
      </div>
    );
  }
);
Textarea.displayName = 'Textarea';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, id, className = '', ...props }, ref) => {
    const internalId = id || label.replace(/\s+/g, '-').toLowerCase();
    return (
      <div className="flex flex-row items-start gap-3 w-full">
        <div className="flex h-5 items-center">
          <input
            id={internalId}
            ref={ref}
            type="checkbox"
            className={`w-4 h-4 accent-amber-500 bg-transparent border-stone-300 transition-all ${className}`}
            {...props}
          />
        </div>
        <label htmlFor={internalId} className="text-[11px] text-stone-700 leading-5 cursor-pointer">
          {label} {props.required && <span className="text-amber-500">*</span>}
        </label>
      </div>
    );
  }
);
Checkbox.displayName = 'Checkbox';

export const SectionHeader = ({ title, description, icon: Icon }: { title: string; description?: string, icon?: React.ElementType }) => (
  <div className="mb-6">
    <h2 className="text-xs uppercase tracking-widest text-amber-500 font-bold mb-2 flex items-center gap-2">
      {Icon && <Icon size={14} className="text-amber-500" />}
      <span className="w-4 h-px bg-amber-500"></span> {title}
    </h2>
    {description && <p className="text-[11px] text-stone-500 mt-1 italic">{description}</p>}
  </div>
);

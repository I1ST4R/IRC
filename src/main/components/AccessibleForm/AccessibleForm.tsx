import React, { forwardRef } from 'react';

interface AccessibleFormProps {
  children: React.ReactNode;
  onSubmit?: (e: React.FormEvent) => void;
  className?: string;
  'aria-label'?: string;
  'aria-describedby'?: string;
}

export const AccessibleForm = forwardRef<HTMLFormElement, AccessibleFormProps>(
  ({ children, onSubmit, className, ...ariaProps }, ref) => {
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSubmit?.(e);
    };

    return (
      <form
        ref={ref}
        onSubmit={handleSubmit}
        className={className}
        noValidate
        {...ariaProps}
      >
        {children}
      </form>
    );
  }
);

AccessibleForm.displayName = 'AccessibleForm';

interface AccessibleInputProps {
  id: string;
  label: string;
  type?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
  placeholder?: string;
  className?: string;
  'aria-describedby'?: string;
}

export const AccessibleInput: React.FC<AccessibleInputProps> = ({
  id,
  label,
  type = 'text',
  value,
  onChange,
  error,
  required = false,
  placeholder,
  className,
  ...ariaProps
}) => {
  const errorId = `${id}-error`;
  const descriptionId = `${id}-description`;

  return (
    <div className={`accessible-input ${className || ''}`}>
      <label htmlFor={id} className="accessible-input__label">
        {label}
        {required && <span aria-label="обязательное поле"> *</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        aria-invalid={!!error}
        aria-describedby={`${error ? errorId : ''} ${ariaProps['aria-describedby'] || ''}`.trim() || undefined}
        className={`accessible-input__field ${error ? 'accessible-input__field--error' : ''}`}
      />
      {error && (
        <div id={errorId} className="accessible-input__error" role="alert">
          {error}
        </div>
      )}
    </div>
  );
};

interface AccessibleButtonProps {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  'aria-label'?: string;
  'aria-describedby'?: string;
}

export const AccessibleButton: React.FC<AccessibleButtonProps> = ({
  children,
  type = 'button',
  onClick,
  disabled = false,
  loading = false,
  className,
  ...ariaProps
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`accessible-button ${className || ''}`}
      aria-label={loading ? `${ariaProps['aria-label'] || children} загрузка...` : ariaProps['aria-label']}
      {...ariaProps}
    >
      {loading && <span className="accessible-button__loader" aria-hidden="true" />}
      <span className={loading ? 'accessible-button__text--loading' : ''}>
        {children}
      </span>
    </button>
  );
};

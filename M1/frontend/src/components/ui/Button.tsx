import { Link } from 'react-router-dom';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  to?: string;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  id?: string;
  'aria-label'?: string;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-[#70405B] hover:bg-[#442B3B] text-white shadow-soft hover:shadow-card',
  secondary:
    'bg-[#EBC4CF] hover:bg-[#C9859D] text-[#442B3B] hover:text-white shadow-soft',
  ghost:
    'bg-transparent hover:bg-[#F7E7EC] text-[#70405B] border border-[#E9DFE3] hover:border-[#EBC4CF]',
  outline:
    'bg-transparent hover:bg-white text-white border border-white/40 hover:border-white hover:text-[#442B3B]',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm rounded-xl',
  md: 'px-6 py-3 text-sm rounded-xl',
  lg: 'px-8 py-4 text-base rounded-2xl',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  to,
  onClick,
  disabled = false,
  loading = false,
  type = 'button',
  className = '',
  id,
  'aria-label': ariaLabel,
}: ButtonProps) {
  const baseClasses = `inline-flex items-center justify-center gap-2 font-sans font-medium transition-all duration-200 focus-visible:outline-2 focus-visible:outline-[#70405B] focus-visible:outline-offset-2 ${
    disabled || loading ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'
  }`;

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes} id={id} aria-label={ariaLabel}>
        {loading ? <Spinner /> : children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} id={id} aria-label={ariaLabel} rel="noopener noreferrer">
        {loading ? <Spinner /> : children}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={classes}
      id={id}
      aria-label={ariaLabel}
    >
      {loading ? <Spinner /> : children}
    </button>
  );
}

function Spinner() {
  return (
    <svg
      className="animate-spin h-4 w-4"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );
}

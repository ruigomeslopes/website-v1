import React from 'react'

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'category'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = 'default', size = 'md', className = '', children, ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium rounded-full transition-colors duration-fast'

    const variants = {
      default:
        'bg-bg-tertiary text-text-primary border border-border-primary',
      success:
        'bg-success/10 text-success border border-success/20',
      warning:
        'bg-warning/10 text-warning border border-warning/20',
      error:
        'bg-error/10 text-error border border-error/20',
      info:
        'bg-info/10 text-info border border-info/20',
      category:
        'bg-accent-primary/10 text-accent-primary border border-accent-primary/20 hover:bg-accent-primary/20',
    }

    const sizes = {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-3 py-1 text-sm',
      lg: 'px-4 py-1.5 text-base',
    }

    return (
      <span
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {children}
      </span>
    )
  }
)

Badge.displayName = 'Badge'

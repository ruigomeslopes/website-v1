import React from 'react'

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'full'
  children: React.ReactNode
}

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ size = 'lg', className = '', children, ...props }, ref) => {
    const baseStyles = 'w-full mx-auto px-4 md:px-6 lg:px-8'

    const sizes = {
      sm: 'max-w-3xl',      // ~768px
      md: 'max-w-5xl',      // ~1024px
      lg: 'max-w-container', // 1280px (from CSS variables)
      full: 'max-w-full',
    }

    return (
      <div
        ref={ref}
        className={`${baseStyles} ${sizes[size]} ${className}`}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Container.displayName = 'Container'

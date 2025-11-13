/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  // Use class-based dark mode with [data-theme="dark"] selector
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      // Map CSS variables to Tailwind theme
      colors: {
        // Background colors
        'bg-primary': 'var(--bg-primary)',
        'bg-secondary': 'var(--bg-secondary)',
        'bg-tertiary': 'var(--bg-tertiary)',

        // Text colors
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-tertiary': 'var(--text-tertiary)',

        // Accent colors
        'accent-primary': 'var(--accent-primary)',
        'accent-secondary': 'var(--accent-secondary)',
        'accent-hover': 'var(--accent-hover)',

        // Border colors
        'border-primary': 'var(--border-primary)',
        'border-secondary': 'var(--border-secondary)',

        // Semantic colors
        success: 'var(--success)',
        warning: 'var(--warning)',
        error: 'var(--error)',
        info: 'var(--info)',

        // Aliases for common usage patterns
        surface: {
          primary: 'var(--bg-primary)',
          secondary: 'var(--bg-secondary)',
          tertiary: 'var(--bg-tertiary)',
        },
        accent: {
          primary: 'var(--accent-primary)',
          secondary: 'var(--accent-secondary)',
          hover: 'var(--accent-hover)',
        },
        border: {
          primary: 'var(--border-primary)',
          secondary: 'var(--border-secondary)',
        },
      },
      // Font families from Next.js font loader
      fontFamily: {
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-heading)', 'Georgia', 'serif'],
      },
      // Font sizes using CSS variables (responsive with clamp)
      fontSize: {
        xs: 'var(--text-xs)',
        sm: 'var(--text-sm)',
        base: 'var(--text-base)',
        lg: 'var(--text-lg)',
        xl: 'var(--text-xl)',
        '2xl': 'var(--text-2xl)',
        '3xl': 'var(--text-3xl)',
        '4xl': 'var(--text-4xl)',
      },
      // Box shadows
      boxShadow: {
        sm: 'var(--shadow-sm)',
        DEFAULT: 'var(--shadow-md)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
      },
      // Transitions
      transitionDuration: {
        fast: '150ms',
        base: '250ms',
        slow: '350ms',
      },
      // Container
      maxWidth: {
        container: 'var(--container-max-width)',
      },
      // Spacing for header
      spacing: {
        header: 'var(--header-height)',
      },
      // Custom animations
      keyframes: {
        fadeIn: {
          from: {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        slideInLeft: {
          from: {
            opacity: '0',
            transform: 'translateX(-30px)',
          },
          to: {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        slideInRight: {
          from: {
            opacity: '0',
            transform: 'translateX(30px)',
          },
          to: {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.5s ease-out forwards',
        'slide-in-right': 'slideInRight 0.5s ease-out forwards',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

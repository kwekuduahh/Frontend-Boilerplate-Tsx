/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ['class'],
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px',
			},
		},
		extend: {
			colors: {
				border: 'var(--color-border)' /* subtle border */,
				input: 'var(--color-input)' /* white */,
				ring: 'var(--color-ring)' /* dark orange */,
				background: 'var(--color-background)' /* warm off-white */,
				foreground: 'var(--color-foreground)' /* dark charcoal */,
				primary: {
					DEFAULT: 'var(--color-primary)' /* dark orange */,
					foreground: 'var(--color-primary-foreground)' /* white */,
				},
				secondary: {
					DEFAULT: 'var(--color-secondary)' /* gold */,
					foreground: 'var(--color-secondary-foreground)' /* dark charcoal */,
				},
				destructive: {
					DEFAULT: 'var(--color-destructive)' /* red */,
					foreground: 'var(--color-destructive-foreground)' /* white */,
				},
				muted: {
					DEFAULT: 'var(--color-muted)' /* gray-50 */,
					foreground: 'var(--color-muted-foreground)' /* medium gray */,
				},
				accent: {
					DEFAULT: 'var(--color-accent)' /* vibrant orange-red */,
					foreground: 'var(--color-accent-foreground)' /* white */,
				},
				popover: {
					DEFAULT: 'var(--color-popover)' /* white */,
					foreground: 'var(--color-popover-foreground)' /* dark charcoal */,
				},
				card: {
					DEFAULT: 'var(--color-card)' /* white */,
					foreground: 'var(--color-card-foreground)' /* dark charcoal */,
				},
				success: {
					DEFAULT: 'var(--color-success)' /* green */,
					foreground: 'var(--color-success-foreground)' /* white */,
				},
				warning: {
					DEFAULT: 'var(--color-warning)' /* amber */,
					foreground: 'var(--color-warning-foreground)' /* white */,
				},
				error: {
					DEFAULT: 'var(--color-error)' /* red */,
					foreground: 'var(--color-error-foreground)' /* white */,
				},
				surface: 'var(--color-surface)' /* white */,
				'text-primary': 'var(--color-text-primary)' /* dark charcoal */,
				'text-secondary': 'var(--color-text-secondary)' /* medium gray */,
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
			fontFamily: {
				sans: ['Inter', 'system-ui', 'sans-serif'],
				mono: ['JetBrains Mono', 'monospace'],
			},
			fontSize: {
				xs: ['0.75rem', { lineHeight: '1rem' }],
				sm: ['0.875rem', { lineHeight: '1.25rem' }],
				base: ['1rem', { lineHeight: '1.5rem' }],
				lg: ['1.125rem', { lineHeight: '1.75rem' }],
				xl: ['1.25rem', { lineHeight: '1.75rem' }],
				'2xl': ['1.5rem', { lineHeight: '2rem' }],
				'3xl': ['1.875rem', { lineHeight: '2.25rem' }],
				'4xl': ['2.25rem', { lineHeight: '2.5rem' }],
			},
			spacing: {
				18: '4.5rem',
				88: '22rem',
				240: '60rem',
			},
			zIndex: {
				900: '900',
				1000: '1000',
				1100: '1100',
				1200: '1200',
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				shimmer: 'shimmer 2s linear infinite',
				'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
				'fade-in': 'fadeIn 150ms cubic-bezier(0.4, 0, 0.2, 1)',
				'slide-in': 'slideIn 200ms cubic-bezier(0.4, 0, 0.2, 1)',
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' },
				},
				shimmer: {
					'0%': { backgroundPosition: '-200px 0' },
					'100%': { backgroundPosition: 'calc(200px + 100%) 0' },
				},
				fadeIn: {
					from: { opacity: '0' },
					to: { opacity: '1' },
				},
				slideIn: {
					from: { transform: 'translateY(-4px)', opacity: '0' },
					to: { transform: 'translateY(0)', opacity: '1' },
				},
			},
			backgroundImage: {
				shimmer:
					'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)',
			},
			boxShadow: {
				card: '0 1px 3px rgba(0, 0, 0, 0.1)',
				modal: '0 4px 6px rgba(0, 0, 0, 0.1)',
				dropdown: '0 10px 15px rgba(0, 0, 0, 0.1)',
				elevation: '0 2px 8px rgba(0, 0, 0, 0.08)',
			},
		},
	},
	plugins: [require('tailwindcss-animate')],
};

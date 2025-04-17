import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      colors: {
        // New color palette
        'nile-green': {
          DEFAULT: '#39A96B',
          50: '#B8E4CA',
          100: '#A3DDB8',
          200: '#8AD1A6',
          300: '#70C594',
          400: '#57B982',
          500: '#39A96B',
          600: '#2E8C57',
          700: '#236F44',
          800: '#185230',
          900: '#0D351C'
        },
        'permanent-red': {
          DEFAULT: '#B22222',
          50: '#EAA4A4',
          100: '#E58F8F',
          200: '#E07A7A',
          300: '#DC6666',
          400: '#D85151',
          500: '#B22222',
          600: '#8F1B1B',
          700: '#6C1414',
          800: '#490D0D',
          900: '#260606'
        },
        'golden-yellow': {
          DEFAULT: '#FFD700',
          50: '#FFF3AD',
          100: '#FFEE99',
          200: '#FFEA85',
          300: '#FFE572',
          400: '#FFE05E',
          500: '#FFD700',
          600: '#CCAC00',
          700: '#998100',
          800: '#665600',
          900: '#332B00'
        },
        'thalo-blue': {
          DEFAULT: '#1E456E',
          50: '#6B8DB3',
          100: '#5A7EA2',
          200: '#4A6F90',
          300: '#3A607E',
          400: '#2A516C',
          500: '#1E456E',
          600: '#173759',
          700: '#102843',
          800: '#0A1A2D',
          900: '#030B12'
        },
        // Modify existing color definitions to use the new palette
        primary: {
          DEFAULT: 'hsl(var(--thalo-blue-500))',
          foreground: 'hsl(var(--nile-green-50))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--nile-green-500))',
          foreground: 'hsl(var(--thalo-blue-900))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--permanent-red-500))',
          foreground: 'hsl(var(--golden-yellow-50))'
        },
        muted: {
          DEFAULT: 'hsl(var(--thalo-blue-100))',
          foreground: 'hsl(var(--thalo-blue-700))'
        },
        accent: {
          DEFAULT: 'hsl(var(--golden-yellow-500))',
          foreground: 'hsl(var(--thalo-blue-900))'
        },
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
      },
      fontFamily: {
				inter: ['Inter', 'sans-serif'],
			},
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0'
          },
          to: {
            height: 'var(--radix-accordion-content-height)'
          }
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)'
          },
          to: {
            height: '0'
          }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

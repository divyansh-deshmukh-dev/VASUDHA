/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        saffron: {
          DEFAULT: '#ff9933',
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          500: '#ff9933',
          600: '#ea580c',
          700: '#c2410c',
        },
        indiaGreen: {
          DEFAULT: '#138808',
          50: '#f0fdf4',
          100: '#dcfce7',
          500: '#138808',
          600: '#0f6f06',
          700: '#0b5605',
        },
        civicNavy: {
          DEFAULT: '#0f2744',
          800: '#1e3a8a',
          900: '#0f172a',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Plus Jakarta Sans', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'Menlo', 'Monaco', 'Courier New', 'monospace'],
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.03)',
        'enterprise': '0 4px 20px -2px rgba(15, 23, 42, 0.08), 0 2px 6px -1px rgba(15, 23, 42, 0.04)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'badge-ping': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
      }
    },
  },
  plugins: [
    // Plugins loaded conditionally or safely
  ],
}

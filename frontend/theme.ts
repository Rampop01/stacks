import { createTheme } from '@reown/appkit';

export const theme = createTheme({
  colors: {
    // Match your app's color scheme
    primary: 'hsl(24, 95%, 53%)', // Example orange color
    secondary: 'hsl(24, 95%, 43%)',
    accent: 'hsl(24, 95%, 63%)',
    background: 'hsl(0, 0%, 10%)',
    foreground: 'hsl(0, 0%, 98%)',
    muted: 'hsl(0, 0%, 20%)',
    'muted-foreground': 'hsl(0, 0%, 60%)',
  },
  radii: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '1rem',
    full: '9999px',
  },
  fonts: {
    sans: 'var(--font-geist-sans, sans-serif)',
    mono: 'var(--font-geist-mono, monospace)',
  },
});

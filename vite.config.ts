import { defineConfig } from 'vite';

// Relative base so the same build works at a domain root, under GitHub Pages (/mochi-home/) and inside Capacitor.
export default defineConfig({ base: './' });

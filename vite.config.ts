import path from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';

  return {
    base: isProduction ? '/app-version-manager/' : '/',
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'), // Assuming your project root is where vite.config.ts is
      }
    },
    // define: { // Removed GEMINI_API_KEY related definitions
    //   // If you have other environment variables to expose, you can do it here
    //   // For example: 'process.env.MY_VARIABLE': JSON.stringify(process.env.MY_VARIABLE)
    // }
  };
});

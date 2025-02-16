
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
  
    /* config options here */
    eslint: {
      // Warning: This allows production builds to successfully complete even if
      // your project has ESLint errors.
      ignoreDuringBuilds: true,
    },
    images: {
      domains: ['i.ibb.co','telegra.ph'],
    },
    
  
}

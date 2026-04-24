import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['./app/assets/css/main.css'],
  vite: {
    plugins: [tailwindcss()]
  },
  runtimeConfig: {
    // SSR uniquement (appel pod → pod, interne au cluster)
    apiUrl: 'http://api:3333/',
    public: {
      // Client (navigateur → Ingress)
      apiUrl: '/api/'
    }
  }
})
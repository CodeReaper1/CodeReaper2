export default defineI18nConfig(() => ({
  fallbackLocale: 'en',
  // A missing key falls back to English instead of rendering its raw path.
  silentFallbackWarn: true,
}))

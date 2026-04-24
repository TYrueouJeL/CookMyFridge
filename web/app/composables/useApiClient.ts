import type { NitroFetchOptions } from 'nitropack'

export const useApiClient = () => {
  const config = useRuntimeConfig()
  const baseURL = import.meta.server ? config.apiUrl : config.public.apiUrl

  return (path: string, options?: NitroFetchOptions<string>) =>
    $fetch(`${baseURL}${path}`, {
      credentials: 'include',
      ...options,
    })
}
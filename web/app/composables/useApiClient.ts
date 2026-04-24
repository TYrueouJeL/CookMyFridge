import type { NitroFetchOptions } from 'nitropack'

export const useApiClient = () => {
  const config = useRuntimeConfig()
  const baseURL = import.meta.server ? config.apiUrl : config.public.apiUrl

  return <T = unknown>(path: string, options?: NitroFetchOptions<string>): Promise<T> =>
    $fetch<T>(`${baseURL}${path}`, {
      credentials: 'include',
      ...options,
    })
}
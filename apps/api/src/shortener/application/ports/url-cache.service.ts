import { Url } from '../../domain/url';

export abstract class UrlCacheService {
  /**
   * Caches the data from the specified URL for optimized reuse in future operations.
   *
   * @param {Url} url - The URL of the resource that needs to be cached.
   * @return {Promise<void>} A promise that resolves when the caching operation is complete.
   */
  abstract cache(url: Url): Promise<void>;

  /**
   * Retrieves a URL entity based on the provided unique code.
   *
   * @param {string} code - The unique identifier code used to retrieve the associated URL.
   * @return {Promise<Url | null>} A promise that resolves to the URL entity if found, or null if no match is found.
   */
  abstract getByCode(code: string): Promise<Url | null>;
}

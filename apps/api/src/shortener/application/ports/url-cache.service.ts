export abstract class UrlCacheService {
  /**
   * Caches a given resource identified by its code and original URL.
   *
   * @param {string} code - The code representing the resource to be cached.
   * @param {string} originalUrl - The original URL of the resource to be cached.
   * @return {Promise<void>} A promise that resolves when the caching process is completed.
   */
  abstract cache(code: string, originalUrl: string): Promise<void>;

  /**
   * Retrieves an entity or value based on the provided unique code.
   *
   * @param {string} code - The unique identifier used to retrieve the corresponding entity or value.
   * @return {Promise<string | null>} A promise that resolves to a string if the entity or value is found, or null if no match is found.
   */
  abstract getByCode(code: string): Promise<string | null>;
}

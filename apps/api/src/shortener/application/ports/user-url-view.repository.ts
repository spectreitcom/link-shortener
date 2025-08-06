import { UserUrlView } from '../../views/user-url.view';

export abstract class UserUrlViewRepository {
  /**
   * Retrieves a list of user-specific URLs based on the provided parameters.
   *
   * @param {string} userId - The unique identifier of the user whose URLs are to be retrieved.
   * @param {number} take - The maximum number of URLs to retrieve.
   * @param {number} skip - The number of URLs to skip before starting the retrieval.
   * @return {Promise<UserUrlView[]>} A promise that resolves to an array of UserUrlView objects.
   */
  abstract findAll(
    userId: string,
    take: number,
    skip: number,
  ): Promise<UserUrlView[]>;

  /**
   * Calculates the total value associated with the given user ID.
   *
   * @param {string} userId - The unique identifier of the user.
   * @return {Promise<number>} A promise that resolves to the calculated total as a number.
   */
  abstract total(userId: string): Promise<number>;
}

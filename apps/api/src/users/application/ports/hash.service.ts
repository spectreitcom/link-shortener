export abstract class HashService {
  /**
   * Generates a hashed representation of the provided string.
   *
   * @param {string} value - The input string to be hashed.
   * @return {Promise<string>} A promise that resolves to the hashed string value.
   */
  abstract hash(value: string): Promise<string>;

  /**
   * Verifies whether the provided value matches the hashed value.
   *
   * @param {string} value - The plain text value to verify.
   * @param {string} hashedValue - The hashed value to compare against.
   * @return {Promise<boolean>} A promise that resolves to true if the value matches the hashed value, otherwise false.
   */
  abstract verify(value: string, hashedValue: string): Promise<boolean>;
}

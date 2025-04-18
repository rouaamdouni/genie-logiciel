import * as bcrypt from "bcrypt";

export interface IHash {
  compare(plainText: string, hashed: string): Promise<boolean>;
  hash(plainText: string): Promise<string>;
}

export class Hash implements IHash {
  async compare(plainText: string, hashed: string): Promise<boolean> {
    try {
      return await bcrypt.compare(plainText, hashed);
    } catch (error) {
      console.error("Error comparing hashes:", error);
      return false;
    }
  }

  async hash(plainText: string): Promise<string> {
    try {
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      return await bcrypt.hash(plainText, salt);
    } catch (error) {
      console.error("Error hashing data:", error);
      throw new Error("Hashing failed");
    }
  }
}
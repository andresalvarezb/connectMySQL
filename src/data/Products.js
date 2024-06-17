import { connection } from "../modules/connection.js";

connection;

export class Products {
  async getProductsLineAndDescriptions() {
    return await connection.query(
      sql`
        SELECT productLine, textDescription 
        FROM productlines
        `
    );
  }

  async getProductsWithDescription() {
    return await connection.query(
      sql`
        SELECT P.productName, L.textDescription
        FROM products AS P 
        JOIN productlines AS L 
        ON P.productLine = L.productLine
          `
    );
  }
}

import { connection } from "../modules/connection.js";

connection;

export class Products {
    //  Recuperar todas las líneas de productos con sus descripciones
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

  // Calcular el total de productos en stock
  async getProductsInStock() {
    return await connection.query(
      sql`
        SELECT productCode, productName, COUNT(quantityInStock)
        FROM products
        GROUP BY productCode
          `
    );
  }
}

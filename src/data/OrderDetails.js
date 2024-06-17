import { connection } from "../modules/connection.js";

export class OrderDetails {
  async getOrdersDetailsByClient103() {
    return await connection.query(
      sql`
      SELECT orderNumber, productName, quantityOrdered, priceEach, customerNumber 
      FROM orders 
      INNER JOIN orderdetails USING (orderNumber)
      INNER JOIN products USING (productCode) 
      WHERE customerNumber=103
      `
    );
  }

  // Encontrar el precio medio de compra de todos los productos:
  async getOrdersDetailsByAvgPurchases() {
    return await connection.query(
      sql`
      SELECT P.productName, O.AVG(priceEach)
      FROM orderdetails AS O
      JOIN product AS P
      ON P.productCode = O.productCode
      `
    );
  }

}
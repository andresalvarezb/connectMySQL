import { connection } from "../modules/connection.js";

connection;

export class Orders {
  async getOrdersShipped() {
    return await connection.query(
      sql`
      SELECT * 
      FROM orders 
      WHERE status = 'Shipped'`
    );
  }

  async getOrdersFromFranceClients() {
    return await connection.query(sql`
        SELECT O.orderNumber, C.country
        FROM orders AS O
        INNER JOIN customers as C
        ON O.customerNumber = C.customerNumber
        WHERE C.country = 'France';
    `);
  }
}

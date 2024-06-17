import { connection } from "../modules/connection.js";

connection;

export class Customers {
  async getCustomersFromUSA() {
    return await connection.query(
      sql`
      SELECT * 
      FROM customers 
      WHERE creditLimit > 50000 AND country='USA'
        `
    );
  }

  //Obtener el promedio del límite de crédito de todos los clientes
  async getCustomersAndCreditLimit() {
    return await connection.query(
      sql`
        SELECT AVG(creditLimit)
        FROM customers 
        `
    );
  }
}

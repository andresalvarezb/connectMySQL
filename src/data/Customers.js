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

  
}

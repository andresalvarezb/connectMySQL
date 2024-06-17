import { connection } from "../modules/connection.js";

connection;

export class Payments {
  async getPaymentsAccordingToClient() {
    return await connection.query(
      sql`
        SELECT * 
        FROM payments 
        WHERE customerNumber = 103
        `
    );
  }

  async getPaymentsForClient() {
    return await connection.query(sql`
            SELECT customerNumber, SUM(amount) 
            FROM payments 
            GROUP BY customerNumber
        `);
  }
}

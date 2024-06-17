import { connection } from "../modules/connection.js";

connection;

export class Employees {
  async getEmployeesInSanFrancisco() {
    return await connection.query(sql`
        SELECT * 
        FROM employees 
        WHERE officeCode = (
            SELECT officeCode 
            FROM offices 
            WHERE city = 'San Francisco'
        )
    `);
  }

  async getInfoEmployeesWithBoss1143() {
    return await connection.query(sql`
        SELECT firstName, lastName, email
        FROM employees 
        WHERE reportsTo = 1143;
    `);
  }
}

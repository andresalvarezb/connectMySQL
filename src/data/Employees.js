import { connection } from "../modules/connection.js";

connection;

export class Employees {
  // 2. Encontrar todos los empleados que trabajan en la oficina de 'San Francisco'
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
  // COLSULTAS DE MULTIPLES TABLAS
  // 2. Obtener los nombres y direcciones de correo electrónico de los empleados que reportan al empleado con el número de empleado 1143:
  async getInfoEmployeesWithBoss1143() {
    return await connection.query(sql`
        SELECT firstName, lastName, email
        FROM employees 
        WHERE reportsTo = 1143;
    `);
  }
}

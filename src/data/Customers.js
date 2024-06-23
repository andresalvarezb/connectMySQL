import { connection } from "../modules/connection.js";

connection;

export class Customers {
    // CONSULTAS DE UNA SOLA TABLA

    // 5. Recuperar todos los clientes de 'USA' que tienen un límite de crédito superior a 50000
    async getCustomersFromUSA() {
        return await connection.query(
            sql`
      SELECT * 
      FROM customers 
      WHERE creditLimit > 50000 AND country='USA'
        `,
        );
    }

    //1. Obtener el promedio del límite de crédito de todos los clientes

    async getCustomersAndCreditLimit() {
        return await connection.query(
            sql`
        SELECT AVG(creditLimit)
        FROM customers 
        `,
        );
    }
    // COLSULTAS DE MULTIPLES TABLAS
}

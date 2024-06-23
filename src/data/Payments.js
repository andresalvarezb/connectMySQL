import { connection } from "../modules/connection.js";

connection;

export class Payments {
    // 4. Obtener los detalles de todos los pagos realizados por el cliente con el número de cliente 103
    async getPaymentsAccordingToClient() {
        return await connection.query(
            sql`
        SELECT * 
        FROM payments 
        WHERE customerNumber = 103
        `,
        );
    }

    // COLSULTAS DE MULTIPLES TABLAS
    async getPaymentsForClient() {
        return await connection.query(sql`
        SELECT customerNumber, SUM(amount) 
        FROM payments 
        GROUP BY customerNumber
    `);
    }

    // 4. Listar el monto total de los pagos recibidos de cada cliente
    async getPaymentsReceivedByCLient() {
        return await connection.query(sql`
      SELECT customerName, p.amount 
      FROM customers 
      INNER JOIN payments p USING (customerNumber);
    `);
    }

    // 5. Calcular el total de pagos recibidos
    async getPaymentsReceived() {
        return await connection.query(sql`
            SELECT  COUNT(*) 
            FROM payments;
    `);
    }

    // 7. Calcular el total de pagos recibidos por cada país:
    async getPaymentsReceived() {
        return await connection.query(sql`
            SELECT country, SUM(p.amount) 
            FROM customers 
            INNER JOIN payments AS p USING (customerNumber)
            GROUP BY country;
    `);
    }
}

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

    // 1. Calcular el total de pagos recibidos por cada cliente:
    async getCustomersPays() {
        return await connection.query(
            sql`
        SELECT customerName, COUNT(*) 
        FROM customers 
        INNER JOIN payments USING (customerNumber) 
        GROUP BY customerName;
        `,
        );
    }

    // 2. Obtener el promedio del límite de crédito de los clientes por país:
    async getCustomersAVGLimitCreditBYCountry() {
        return await connection.query(
            sql`
            SELECT country, AVG(creditLimit) 
            FROM customers 
            GROUP BY country;
        `,
        );
    }

    // 3. Calcular el total de órdenes realizadas por cada cliente:
    async getCustomersByOrders() {
        return await connection.query(
            sql`
            SELECT customerName, COUNT(*) 
            FROM customers  
            INNER JOIN orders AS o USING (customerNumber) 
            WHERE o.status = 'Shipped' 
            GROUP BY customerName;
        `,
        );
    }

    // 5. Calcular el total de ventas (cantidad ordenada por precio cada uno) por cada cliente:
    async getCustomersSailsByClient() {
        return await connection.query(
            sql`
            SELECT customerName, SUM(p.quantityOrdered*pr.buyPrice) AS sale 
            FROM customers 
            INNER JOIN orders AS o USING (customerNumber) 
            INNER JOIN orderdetails AS p USING (orderNumber) 
            INNER JOIN products AS pr USING (productCode) 
            WHERE o.status = 'Shipped' 
            GROUP BY customerName 
            ORDER BY sale DESC;
        `,
        );
    }
}

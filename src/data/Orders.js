import { connection } from "../modules/connection.js";

export class Orders {
    // 3. Listar todas las órdenes que tienen un estado de 'Enviado
    async getOrdersShipped() {
        return await connection.query(
            sql`
      SELECT * 
      FROM orders 
      WHERE status = 'Shipped'`,
        );
    }

    // COLSULTAS DE MULTIPLES TABLAS
    // 3. Encontrar todas las órdenes realizadas por clientes de 'Francia':
    async getOrdersFromFranceClients() {
        return await connection.query(sql`
        SELECT O.orderNumber, C.country
        FROM orders AS O
        INNER JOIN customers as C
        ON O.customerNumber = C.customerNumber
        WHERE C.country = 'France';
    `);
    }
    
    // 4. Encontrar la cantidad total de productos pedidos por cada cliente:
    async getOrdersFromFranceClients() {
        return await connection.query(sql`
            SELECT customerName, SUM(p.quantityOrdered) 
            FROM customers INNER JOIN orders AS o USING (customerNumber)
            INNER JOIN orderdetails AS p USING (orderNumber)
            WHERE o.status = 'Shipped'
            GROUP BY customerName;
    `);
    }
    
    // 8. Encontrar el promedio de ventas (cantidad ordenada por precio cada uno) por cada empleado:
    async getOrdersAVGByEmployee() {
        return await connection.query(sql`
            SELECT DISTINCT employeeNumber, CONCAT(firstName,' ', lastName) AS name, AVG(od.quantityOrdered*od.priceEach) AS sales  
            FROM employees AS e 
            INNER JOIN customers AS c 
            ON e.employeeNumber = c.salesRepEmployeeNumber 
            INNER JOIN orders AS o USING (customerNumber) 
            INNER JOIN orderdetails AS od USING (orderNumber)
            WHERE o.status='Shipped' 
            GROUP BY employeeNumber
            ORDER BY sales DESC;
    `);
    }
    
    // 9. Calcular el total de órdenes gestionadas por cada empleado
    async getOrdersManagementByEmployee() {
        return await connection.query(sql`
            SELECT employeeNumber, CONCAT(firstName,' ', lastName) AS name, COUNT(*) AS sales 
            FROM employees AS e
             INNER JOIN customers AS c 
             ON e.employeeNumber = c.salesRepEmployeeNumber 
             INNER JOIN orders AS o USING (customerNumber) 
             WHERE o.status = 'Shipped' 
             GROUP BY employeeNumber 
            ORDER BY sales DESC;
    `);
    }
}

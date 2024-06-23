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
}

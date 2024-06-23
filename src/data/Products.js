import { connection } from "../modules/connection.js";

connection;

export class Products {
    //  1. Recuperar todas las líneas de productos con sus descripciones
    async getProductsLineAndDescriptions() {
        return await connection.query(
            sql`
        SELECT productLine, textDescription 
        FROM productlines
        `,
        );
    }

    // COLSULTAS DE MULTIPLES TABLAS
    // 1. Listar todos los productos junto con las descripciones de sus líneas de productos:
    async getProductsWithDescription() {
        return await connection.query(
            sql`
        SELECT P.productName, L.textDescription
        FROM products AS P 
        JOIN productlines AS L 
        ON P.productLine = L.productLine
          `,
        );
    }

    // 2. Calcular el total de productos en stock
    async getProductsInStock() {
        return await connection.query(
            sql`
        SELECT productCode, productName, COUNT(quantityInStock)
        FROM products
        GROUP BY productCode
          `,
        );
    }

    // 3. Encontrar el precio medio de compra de todos los productos
    async getProductsAVGPrice() {
        return await connection.query(
            sql`
            SELECT AVG(buyprice)
            FROM products
          `,
        );
    }

    // 8. Encontrar el precio total de todos los productos:
    async getProductsAVGPrice() {
        return await connection.query(
            sql`
            SELECT SUM(buyPrice)
            FROM products
          `,
        );
    }

    // 9. Calcular el promedio del precio sugerido (MSRP) de los productos
    async getProductsAVGPriceBYMSRP() {
        return await connection.query(
            sql`
            SELECT SUM(MSRP)
            FROM products
          `,
        );
    }

    // 6. Obtener el promedio de la cantidad de productos en stock por línea de productos:
    async getProductsAVGInStock() {
        return await connection.query(
            sql`
            SELECT productLine, AVG(p.quantityInStock) 
            FROM productlines 
            INNER JOIN products AS p USING (productLine) 
            GROUP BY productLine;
          `,
        );
    }

    // 10. Obtener la cantidad total de productos vendidos por cada línea de productos:
    async getProductsAVGInStock() {
        return await connection.query(
            sql`
            SELECT productLine, AVG(p.quantityInStock) 
            FROM productlines 
            INNER JOIN products AS p USING (productLine) 
            GROUP BY productLine;
          `,
        );
    }
}

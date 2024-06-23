## Parte 1/2

### Consultas de una sola tabla

1. **Recuperar todas las líneas de productos con sus descripciones:**

    ```sql
    SELECT productName, productDescription FROM products;
    ```

2. **Encontrar todos los empleados que trabajan en la oficina de 'San Francisco':**

    ```sql
    SELECT employeeNumber, firstName, lastName,  o.city FROM employees INNER JOIN offices o USING(officeCode) WHERE city='San Francisco';
    ```

3. **Listar todas las órdenes que tienen un estado de 'Enviado':**

    ```sql
    SELECT orderNumber, status FROM orders WHERE status='Shipped';
    ```

4. **Obtener los detalles de todos los pagos realizados por el cliente con el número de cliente 103:**

    ```sql
    SELECT customerNumber, customerName, p.checkNumber
     FROM customers
     INNER JOIN payments p
     USING (customerNumber) WHERE customerNumber = '103';
    ```

5. **Recuperar todos los clientes de 'USA' que tienen un límite de crédito superior a 50000:**

    ```sql
    SELECT customerNumber, creditLimit, country FROM customers WHERE creditLimit
    > 50000 AND country = 'USA';
    ```

### Consultas de múltiples tablas

1. **Listar todos los productos junto con las descripciones de sus líneas de productos:**

    ```sql
    SELECT productCode, productName, p.textDescription FROM products INNER JOIN productlines p USING (productLine);
    ```

2. **Obtener los nombres y direcciones de correo electrónico de los empleados que reportan al empleado con el número de empleado 1143:**

    ```sql
    SELECT lastName, firstName, email FROM employees WHERE reportsTo = '1143';
    ```

3. **Encontrar todas las órdenes realizadas por clientes de 'Francia':**

    ```sql
    SELECT orderNumber, c.country FROM orders INNER JOIN customers c  USING (customerNumber) WHERE country = 'France';
    ```

4. **Listar el monto total de los pagos recibidos de cada cliente:**

    ```sql
    SELECT customerName, p.amount FROM customers INNER JOIN payments p USING (customerNumber);
    ```

5. **Recuperar los detalles de las órdenes, incluyendo los nombres de los productos, para todas las órdenes realizadas por el cliente con el número de cliente 101:**

    ```sql
    SELECT p.productName, o.orderNumber, customerNumber FROM customers INNER JOIN orders using (customerNumber) INNER JOIN orderdetails o USING (orderNumber) INNER JOIN products p USING (productCode) WHERE customerNumber = '101';
    ```

---

## Parte 2/2

### Consultas de una sola tabla

1. **Obtener el promedio del límite de crédito de todos los clientes:**

    ```sql
    SELECT AVG(creditLimit) FROM customers;
    ```

2. **Calcular el total de productos en stock:**

    ```sql
    SELECT COUNT(*) FROM products WHERE quantityInStock>0;
    ```

3. **Encontrar el precio medio de compra de todos los productos:**

    ```sql
    select AVG(buyprice) FROM products;
    ```

4. **Contar la cantidad de oficinas en cada país:**

    ```sql
    SELECT country, COUNT(*) FROM offices GROUP BY country;
    ```

5. **Calcular el total de pagos recibidos:**

    ```sql
    SELECT  COUNT(*) FROM payments;
    ```

6. **Obtener la cantidad total de empleados:**

    ```sql
    SELECT COUNT(*) FROM employees;
    ```

7. **Calcular la cantidad media de productos pedidos en las órdenes:**

    ```sql
    SELECT AVG(quantityOrdered) FROM orderdetails INNER JOIN orders USING (orderNumber);
    ```

8. **Encontrar el precio total de todos los productos:**

    ```sql
    SELECT SUM(buyPrice) FROM products;
    ```

9. **Calcular el promedio del precio sugerido (MSRP) de los productos:**

    ```sql
    SELECT AVG(MSRP) FROM products;
    ```

10. **Contar la cantidad de empleados por título de trabajo:**

```
SELECT jobTitle, COUNT(*) FROM employees GROUP BY jobTitle;
```

### Consultas de múltiples tablas

1. **Calcular el total de pagos recibidos por cada cliente:**

    ```sql
    SELECT customerName, COUNT(*) FROM customers INNER JOIN payments USING (customerNumber) GROUP BY customerName;
    ```

2. **Obtener el promedio del límite de crédito de los clientes por país:**

    ```sql
    SELECT country, AVG(creditLimit) FROM customers GROUP BY country;
    ```

3. **Calcular el total de órdenes realizadas por cada cliente:**

    ```sql
    SELECT customerName, COUNT(*) FROM customers  INNER JOIN orders AS o USING (customerNumber) WHERE o.status = 'Shipped' GROUP BY customerName;
    ```

4. **Encontrar la cantidad total de productos pedidos por cada cliente:**

    ```sql
    SELECT customerName, SUM(p.quantityOrdered) FROM customers INNER JOIN orders AS o USING (customerNumber) INNER JOIN orderdetails AS p USING (orderNumber) WHERE o.status = 'Shipped' GROUP BY customerName;
    ```

5. **Calcular el total de ventas (cantidad ordenada por precio cada uno) por cada cliente:**

    ```sql
    SELECT customerName, SUM(p.quantityOrdered*pr.buyPrice) AS sale FROM customers INNER JOIN orders AS o USING (customerNumber) INNER JOIN orderdetails AS p USING (orderNumber) INNER JOIN products AS pr USING (productCode) WHERE o.status = 'Shipped' GROUP BY customerName ORDER BY sale DESC;
    ```

6. **Obtener el promedio de la cantidad de productos en stock por línea de productos:**

    ```sql
    SELECT productLine, AVG(p.quantityInStock) FROM productlines INNER JOIN products AS p USING (productLine) GROUP BY productLine;
    ```

7. **Calcular el total de pagos recibidos por cada país:**

    ```sql
    SELECT country, SUM(p.amount) FROM customers INNER JOIN payments AS p USING (customerNumber) GROUP BY country;
    ```

8. **Encontrar el promedio de ventas (cantidad ordenada por precio cada uno) por cada empleado:**

    ```sql
    SELECT DISTINCT employeeNumber, CONCAT(firstName,' ', lastName) AS name, AVG(od.quantityOrdered*od.priceEach) AS sales  FROM employees AS e INNER JOIN customers AS c ON e.employeeNumber = c.salesRepEmployeeNumber INNER JOIN orders AS o USING (customerNumber) INNER JOIN orderdetails AS od USING (orderNumber) WHERE o.status='Shipped' GROUP BY employeeNumber ORDER BY sales DESC;
    ```

9. **Calcular el total de órdenes gestionadas por cada empleado:**

    ```sql
    SELECT employeeNumber, CONCAT(firstName,' ', lastName) AS name, COUNT(*) AS sales FROM employees AS e INNER JOIN customers AS c ON e.employeeNumber = c.salesRepEmployeeNumber INNER JOIN orders AS o USING (customerNumber) WHERE o.status = 'Shipped' GROUP BY employeeNumber ORDER BY sales DESC;
    ```

10. **Obtener la cantidad total de productos vendidos por cada línea de productos:**

    ```sql
    SELECT productLine, SUM(od.quantityOrdered) sales FROM products INNER JOIN orderdetails AS od USING (productCode) INNER JOIN orders AS o USING (orderNumber)  WHERE o.status = 'Shipped' GROUP BY productLine ORDER BY sales DESC;
    ```

11. **Encontrar el promedio de la cantidad de productos ordenados por cada cliente:**

    ```sql
    SELECT CONCAT(customerNumber," ", customerName) AS idCustomer, AVG(od.quantityOrdered) FROM customers INNER JOIN orders AS o USING (customerNumber) INNER JOIN orderdetails AS od USING (orderNumber) WHERE o.status = 'Shipped' GROUP BY idCustomer;
    ```

12. **Calcular el total de ventas realizadas en cada país:**

    ```sql
    SELECT country, COUNT(*) FROM customers INNER JOIN orders o USING (customerNumber) WHERE o.status = 'Shipped' GROUP BY country;
    ```

13. **Obtener el promedio del precio de compra de los productos por línea de productos:**

    ```sql
    SELECT productLine, AVG(buyPrice) as precioCompra FROM productlines INNER JOIN products USING (productLine) GROUP BY productLine ORDER BY precioCompra DESC;
    ```

14. **Encontrar la cantidad total de productos vendidos por cada vendedor:**

    ```sql
    SELECT employeeNumber, CONCAT(firstName," ",lastName), SUM(od.quantityOrdered) FROM employees AS e INNER JOIN customers AS c ON e.employeeNumber = c.salesRepEmployeeNumber INNER JOIN orders AS o USING (customerNumber) INNER JOIN orderdetails AS od USING(orderNumber) WHERE o.status='Shipped' AND e.jobTitle='Sales Rep' GROUP BY employeeNumber;
    ```

15. **Calcular el total de pagos recibidos por cada vendedor:**

    ```sql
    SELECT employeeNumber, CONCAT(firstName," ",lastName), SUM(od.quantityOrdered*od.priceEach) AS sales FROM employees AS e INNER JOIN customers AS c ON e.employeeNumber = c.salesRepEmployeeNumber INNER JOIN orders AS o USING (customerNumber) INNER JOIN orderdetails AS od USING(orderNumber) WHERE o.status='Shipped' AND e.jobTitle='Sales Rep' GROUP BY employeeNumber ORDER BY sales DESC;
    ```

16. **Obtener el promedio del límite de crédito de los clientes atendidos por cada vendedor:**

    ```sql
    SELECT DISTINCT employeeNumber, CONCAT(firstName,' ', lastName) AS name, AVG(c.creditLimit) AS creditLimit  FROM employees AS e INNER JOIN customers AS c ON e.employeeNumber = c.salesRepEmployeeNumber GROUP BY employeeNumber ORDER BY creditLimit DESC;
    ```

17. **Encontrar el total de ventas realizadas por cada oficina:**

    ```sql
    SELECT officeCode, off.city, COUNT(*) FROM offices AS off INNER JOIN employees AS e USING (officeCode) INNER JOIN customers AS c ON e.employeeNumber = c.salesRepEmployeeNumber INNER JOIN orders AS o USING (customerNumber) WHERE o.status = 'Shipped'  GROUP BY officeCode;
    ```

18. **Calcular la cantidad media de productos pedidos por cada cliente:**

    ```sql
    SELECT customerNumber, customerName, AVG(od.quantityOrdered) FROM customers INNER JOIN orders AS o USING (customerNumber) INNER JOIN orderdetails AS od USING (orderNumber) WHERE o.status = 'Shipped' GROUP BY customerNumber;
    ```

19. **Obtener el total de pagos realizados en cada año:**

    ```sql
    SELECT YEAR(paymentDate) AS sales_year, SUM(amount) FROM payments GROUP BY YEAR(paymentDate);
    ```

20. **Encontrar el promedio del precio de venta (priceEach) de los productos por línea de productos:**

    ```sql
    SELECT productline, AVG(od.priceEach) FROM productlines INNER JOIN products USING (productline) INNER JOIN orderdetails AS od USING (productCode) GROUP BY productline;
    ```

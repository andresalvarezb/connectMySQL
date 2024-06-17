import mysql from 'mysql2/promise';

// Create the connection to database
export const connection = await mysql.createConnection({
  host: 'roundhouse.proxy.rlwy.net',
  port: 22945,
  user: 'root',
  database: 'railway',
  password: 'eKNEiTQHsqGoxqHtOVtQKyWpQtbLRKjr'
});    

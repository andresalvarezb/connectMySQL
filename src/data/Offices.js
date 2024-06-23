import { connection } from "../modules/connection.js";

export class Offices {
    // CONSULTAS DE UNA SOLA TABLA

    // 4. Contar la cantidad de oficinas en cada país:
    async getOfficesByCountry() {
        return await connection.query(
            sql`
      SELECT country, COUNT(*) AS N_Offices
      FROM offices
      GROUP BY country
      `,
        );
    }
}

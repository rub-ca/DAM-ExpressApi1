import { Pool } from 'pg'

const pool = new Pool({
    connectionString: 'postgresql://ubuntu:cD26FA9z8MeipEzHDd0PwkmAtwBJ8qal@dpg-d08jr8be5dus73a3ej60-a.frankfurt-postgres.render.com/dam_expressapi1db?ssl=true'
})

export class RestauranteModel {
    static async getAll () {
        const result = await pool.query('SELECT * FROM restaurante')
        return result.rows
    }
}

import db from '../databaseTables/db'

class Query {
    static async register(info){
        try{
            const result = await db.query(`INSERT INTO candidates(
                office, 
                party,
                candidate
            )
            VALUES($1, $2, $3) returning *`,
                info,
            );
            return result;
        }catch (error) {
            return error;
        }
    }
}

export default Query;
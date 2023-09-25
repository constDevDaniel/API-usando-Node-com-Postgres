import { sql } from "./db.js";

sql `
    CREATE TABLE IF NOT EXISTS videos (
        id TEXT PRIMARY KEY,
        title TEXT,
        description TEXT,
        duration INTEGER
    );
`.then(()=>{
    console.log('tabela criada')
})

//node --env-file=.env create-table.js
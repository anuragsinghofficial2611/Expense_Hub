import 'dotenv/config';
import app from './app.js';
import pool from './config/database.js'

const port = process.env.PORT || 3000;

console.log(process.env.PORT);


app.get("/", async (req, res) => {
    try{

        const result = await pool.query("SELECT NOW()");
        
        res.json({
            message: "Connected",
            time: result.rows[0].now
        });
    } catch(error){
        console.log("db connection error: ",error);
    }
});



app.listen(port, () => {
    console.log(`Server is live at port ${port}`);
});
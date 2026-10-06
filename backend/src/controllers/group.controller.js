import pool from "../config/database.js";



const creategroup = async(req,res) => {
    try{
        const name = req.body;
        if(!name) return res.status(400).json({message: "group name required"});

        const newGroup = await pool.query(
            `INSERT INTO users (name)
             VALUES ($1, $2, $3)
             RETURNING id, name, created_at`,
            [id, name, created_at]
        );
        return res.status(201).json(
            {
                message: "group created successfully",
                group: newGroup,
            }
        )
        
    }catch(error){
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            error: error
        })
    }
}

export default {creategroup};
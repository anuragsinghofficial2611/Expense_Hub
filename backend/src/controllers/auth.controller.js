import pool from "../config/database.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "Every Credentials are required"
            });
        }
        const result = await pool.query(
            `SELECT * FROM users
             WHERE email = $1`,
            [email]
        );
        const user = result.rows[0];
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        //password comparisionve 
        const isPasswordvalid = bcrypt.compare(password,user.password);
        if(!isPasswordvalid){
            return res.status(40).json({
                message: "Password is Incorrect"
            });
        }
        const hashedPassword = bcrypt.hash(password,10);

        const token = jwt.sign(
            {
                userId: user.id,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "5d"
            }
        );
        return res.status(200).json({
            "access-token":token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json(
            {
                message: error
            }
        )
    }
}

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Every field is required",
            });
        }
        const result = await pool.query(
            `SELECT * FROM users
             WHERE email = $1`,
            [email]
        );

        const user = result.rows[0];

        if (user) {
            return res.status(409).json({
                message: "User already exists"
            });
        }
        const hashedPassword = await bcrypt.hash(password,10);

        const newUser = await pool.query(
            `INSERT INTO users (name, email, password)
             VALUES ($1, $2, $3)
             RETURNING id, name, email, created_at`,
            [name, email, hashedPassword]
        );

        return res.status(201).json({
            message: "User registered successfully",
            user: newUser.rows[0]
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Internal server error"
        });
    }
};

export { loginUser,registerUser }
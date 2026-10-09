import pool from "../config/database.js";

// i have to add midleware for this to add group_id and paid_by

const createExpense = async (req, res) => {
    try {
        const paid_by = req.user.user_id;
        const { group_id, description, amount } = req.body;

        if (!group_id || !description || !amount) {
            return res.status(400).json({
                message: "Every field is required"
            });
        }

        const result = await pool.query(
            `INSERT INTO expenses
                (group_id, paid_by, description, amount)
             VALUES ($1, $2, $3, $4)
             RETURNING id, group_id, paid_by, description, amount, created_at`,
            [group_id, paid_by, description, amount]
        );

        return res.status(201).json({
            message: "Expense created successfully",
            expense: result.rows[0]
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};


const getExpenses = async (req, res) => {
    try {
        const { group_id } = req.params;

        const result = await pool.query(
            `SELECT 
                id,
                group_id,
                paid_by,
                description,
                amount,
                created_at
             FROM expenses
             WHERE group_id = $1
             ORDER BY created_at DESC`,
            [group_id]
        );

        return res.status(200).json({
            message: "Expenses fetched successfully",
            expenses: result.rows
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

const getExpenseById = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query(
            `SELECT
                id,
                group_id,
                paid_by,
                description,
                amount,
                created_at
             FROM expenses
             WHERE id = $1`,
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Expense not found"
            });
        }

        return res.status(200).json({
            message: "Expense fetched successfully",
            expense: result.rows[0]
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

const updateExpense = async (req, res) => {
    try {
        const { id } = req.params;
        const { description, amount } = req.body;

        if (!description || !amount) {
            return res.status(400).json({
                message: "Description and amount are required"
            });
        }

        const result = await pool.query(
            `UPDATE expenses
             SET description = $1,
                 amount = $2
             WHERE id = $3
             RETURNING id, group_id, paid_by, description, amount, created_at`,
            [description, amount, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Expense not found"
            });
        }

        return res.status(200).json({
            message: "Expense updated successfully",
            expense: result.rows[0]
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};


const deleteExpense = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query(
            `DELETE FROM expenses
             WHERE id = $1
             RETURNING id`,
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Expense not found"
            });
        }

        return res.status(200).json({
            message: "Expense deleted successfully"
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};


export {
    createExpense,
    getExpenses,
    getExpenseById,
    updateExpense,
    deleteExpense
};
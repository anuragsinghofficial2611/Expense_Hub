
import pool from "../config/database.js";
//i have to add middleware for group_id

const createGroup = async (req, res) => {
    try {
        const { name, description, created_by } = req.body;

        if (!name || !created_by) {
            return res.status(400).json({
                message: "Group name and created_by are required"
            });
        }

        const result = await pool.query(
            `INSERT INTO groups
                (name, description, created_by)
             VALUES
                ($1, $2, $3)
             RETURNING id, name, description, created_by, created_at`,
            [name, description || null, created_by]
        );

        return res.status(201).json({
            message: "Group created successfully",
            group: result.rows[0]
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};


const getGroups = async (req, res) => {
    try {

        const result = await pool.query(
            `SELECT
                id,
                name,
                description,
                created_by,
                created_at
             FROM groups
             ORDER BY created_at DESC`
        );

        return res.status(200).json({
            message: "Groups fetched successfully",
            groups: result.rows
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};


const getGroupById = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query(
            `SELECT
                id,
                name,
                description,
                created_by,
                created_at
             FROM groups
             WHERE id = $1`,
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Group not found"
            });
        }

        return res.status(200).json({
            message: "Group fetched successfully",
            group: result.rows[0]
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};


const updateGroup = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;

        if (!name) {
            return res.status(400).json({
                message: "Group name is required"
            });
        }

        const result = await pool.query(
            `UPDATE groups
             SET
                name = $1,
                description = $2
             WHERE id = $3
             RETURNING
                id,
                name,
                description,
                created_by,
                created_at`,
            [name, description || null, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Group not found"
            });
        }

        return res.status(200).json({
            message: "Group updated successfully",
            group: result.rows[0]
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};


const deleteGroup = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query(
            `DELETE FROM groups
             WHERE id = $1
             RETURNING id`,
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Group not found"
            });
        }

        return res.status(200).json({
            message: "Group deleted successfully"
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};


export {
    createGroup,
    getGroups,
    getGroupById,
    updateGroup,
    deleteGroup
};
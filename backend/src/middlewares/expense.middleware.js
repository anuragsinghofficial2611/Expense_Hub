
import jwt from "jsonwebtoken";

const expenseMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Authorization token is required",
            });
        }

        const token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                message: "Please login first",
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = {
            user_id: decoded.userId,
        };

        next();
    } catch (error) {
        if (
            error.name === "JsonWebTokenError" ||
            error.name === "TokenExpiredError"
        ) {
            return res.status(401).json({
                message: "Invalid or expired token",
            });
        }

        return res.status(500).json({
            message: "Internal server error",
        });
    }
};

export {expenseMiddleware};

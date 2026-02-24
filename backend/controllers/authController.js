import db from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const register = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password)
        return res.status(400).json({ message: "All fields required" });

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        db.query(
            "INSERT INTO users (username, password) VALUES (?, ?)",
            [username, hashedPassword],
            (err, result) => {
                if (err) {
                    if (err.code === "ER_DUP_ENTRY")
                        return res.status(400).json({ message: "User already exists" });

                    return res.status(500).json({ error: err.message });
                }

                const token = jwt.sign(
                    { id: result.insertId },
                    process.env.JWT_SECRET,
                    { expiresIn: "1d" }
                );

                res.status(201).json({
                    message: "Registered successfully",
                    token
                });
            }
        );
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const login = (req, res) => {
    const { username, password } = req.body;

    db.query(
        "SELECT * FROM users WHERE username = ?",
        [username],
        async (err, results) => {
            if (err) return res.status(500).json({ error: err.message });

            if (results.length === 0)
                return res.status(400).json({ message: "User not found" });

            const user = results[0];

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch)
                return res.status(400).json({ message: "Invalid password" });

            const token = jwt.sign(
                { id: user.id },
                process.env.JWT_SECRET,
                { expiresIn: "1d" }
            );

            res.json({
                message: "Login successful",
                token
            });
        }
    );
};
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from '../models/User.js';

// Registration controller
export const register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        // Generate new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        let existingUser = null;
        existingUser = await User.findOne({ email });
        if (!existingUser) {
            existingUser = await User.findOne({ username });
        }
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    }
    catch (err) {
        res.status(500).json(err);
    }
}

// Login controller

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({
            email
        });
        if (!user) {
            return res.status(400).json({ message: "User does not exist" });
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ message: "Wrong password" });
        }
        // Create token
        const accessToken = jwt.sign(
            { id: user._id, username: user.username, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "5d" }
        );
        res.cookie("token", accessToken, {
            secure: false,
            maxAge: 3600000,
            path: "/",
        });
        res.json({
            message: "User logged in successfully",
            token: accessToken,
            user: {
                username: user.username,
                email: user.email,
                id: user._id,
            },
        });
    }catch (err) {
        res.status(500).json({ message: err});
    }
};


// logout controller

export const logout = async (req, res) => {
    try {
        res.clearCookie("token", { path: "/" });
        return res.json({ message: "Logged out" });
    } catch (err) {
        return res.status(500).json({ message: err });
    }
};

// verify token controller

export const verifyToken = async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.json(false);
        }
        jwt.verify(token, process.env.JWT_SECRET);
        return res.json(true);
    } catch (err) {
        return res.json(false);
    }
};
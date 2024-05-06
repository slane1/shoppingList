import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from '../models/userModel.js';

// Registration controller
export const register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 12);

        let existingUser = null;
        existingUser = await User.findOne({ email });
        if (!existingUser) {
            existingUser = await User.findOne({ username });
        }
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const newUser = new User({
            name: username,
            email,
            password: hashedPassword,
        });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    }
    catch (err) {
        res.status(500).json(err);
        console.log(err);
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
        const token = jwt.sign(
            { id: user._id, username: user.username, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "5d" }
        );
        const userId = user._id.toString();
        res.cookie("token", token, {
            secure: false,
            maxAge: 3600000,
            path: "/",
        });
        res.json({
            userId: userId,
            username: user.username,
            message: "User logged in successfully",
            token: token,
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

// authUser controller

export const authUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.json(user);
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
}
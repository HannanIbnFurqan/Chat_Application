import User from "../models/user.model.js"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'


const register = async (req, res) => {
    const { fullname, username, email, password, confirmPassword, profilephoto, gender } = req.body;

    try {
        if (!fullname || !username || !email || !password || !confirmPassword) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        const user = await User.findOne({ username });

        if (user) {
            return res.status(400).json({ message: "Username already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const maleProfilePhoto = "https://example.com/male.png";
        const femaleProfilePhoto = "https://example.com/female.png";

        await User.create({
            fullname,
            username,
            email,
            password: hashedPassword,
            profilephoto: gender === "male" ? maleProfilePhoto : femaleProfilePhoto,
            gender
        });

        return res.status(200).json({ message: "Account Created Successfully" });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
    
}


// login function

const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required" });
        }

        // Find user by username
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ message: "Incorrect username" });
        }

        // Compare password
        const passwordIsMatch = await bcrypt.compare(password, user.password);

        if (!passwordIsMatch) {
            return res.status(401).json({ message: "Incorrect password" });
        }

        // Generate JWT token
        const tokenData = { userId: user._id };
        const token = jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: "1d" });

        // Set token in cookie
        res
            .status(200)
            .cookie("token", token, {
                httpOnly: true,
                secure: process.env.JWT_SECRET === "production", // true in production
                sameSite: "strict",
                maxAge: 24 * 60 * 60 * 1000, // 1 day
            })
            .json({
                _id: user._id,
                username: user.username,
                fullname: user.fullname,
                message: "Login successful"
            });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message || "Internal Server Error" });
    }
};


const logout = (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict"
        });

        return res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        return res.status(500).json({ message: "Logout failed", error: error.message });
    }
};

export { register, login, logout }
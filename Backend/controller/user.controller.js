import User from "../models/user.model.js"
import bcrypt from "bcrypt"
const register = async (req, res) => {
    const { fullname, username, password, confirmPassword, profilephoto, gender } = req.body;
    try {
        if (!fullname || !username || !email || !password || !confirmPassword) {
            return res.status(400).json({ message: "All fields are required" })

        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Password do not match" })
        }

        const user = await User.findOne(username);

        if (user) {
            return res.status(400).json({ message: "Username alredy exist" })
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        // profile photo
        const maleProfilePhoto = ``;
        const femaleProfilePhoto = ``;
        await User.create({
            fullname,
            username,
            password: hashedPassword,
            profilephoto: gender == "male" ? maleProfilePhoto : femaleProfilePhoto,
            gender
        })

        return res.status(200).json({message: "Account Create Successfully"});


    } catch (error) {
        return res.status(404).json({message: error})
    }

}
const login = async () => {
    const {username, password} = req.body;
    try {
        if(!username || !password){
            return res.status(400).json({message: "Email and password are required"})
        }

        const user = await User.findOne(username)

        if(!username){
            return res.status(404).json({message: "Incorrect username"})
        }

        const passwordIsMatch = await bcrypt.compare(password, user.password)

        if(!passwordIsMatch){
             return res.status(404).json({message: "Incorrect password"})
        }
    } catch (error) {
        
    }
}
const logout = () => {

}

export { register, login, logout }

import jwt from "jsonwebtoken"
const isAuthenticated = async (req, res, next)=>{
    try {
        console.log("Enter in isAuthenticated")
         const token = req.cookies.token;
         if(!token){
            res.status(400).json({message: "User is not Authenticated"})
         }

         const decode = await jwt.verify(token, process.env.JWT_SECRET)
         console.log("decode = ", decode);

         if(!decode){
            res.status(400).json({message: "Invalid Token"})
         }

         req.id = decode.userId;
         console.log(req.id);
         next();

        
    } catch (error) {
        console.log(error)
    }
}

export default isAuthenticated;
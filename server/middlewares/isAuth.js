import jwt from "jsonwebtoken";

export const isAuth=async (req,res,next) => {
    try {
        
        const {token}=req.cookies;

        if(!token){
            return res.status(404).json({message:"token not found"});

        }

        const varifideToken=jwt.verify(token,process.env.JWT_SECRET);
        if(!varifideToken){
           return res.status(400).json({message:"User has invalid token"});
        }

        req.userId=varifideToken.id;
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:`Token Varifaction error ${error}`});
    }
    
}

import jwt from "jsonwebtoken";

const getToken=(id) => {
    try {
        const token=jwt.sign({id},process.env.JWT_SECRET,{expiresIn:"7d"});
        return token;
    } catch (error) {
        console.log(error)
    }
}

export default getToken;
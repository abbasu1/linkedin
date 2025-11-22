import jwt from 'jsonwebtoken';
const genToken=async(userId)=>{
    try{
        let token=await jwt.sign({id:userId},process.env.JWT_SECRET_KEY,{expiresIn:'7d'})
        return token;
    }
    catch(err){
        console.error("Error generating token:", err);
    }
} 
export default genToken;
import jwt from "jsonwebtoken"
const secret = process.env.SECRET;

function setUser(user){
    const payload = {
        _id:user.id,
        email:user.email
    }
    return jwt.sign(payload, secret, {expiresIn: "24h"});
}

function getUser(token){
    try{
        return jwt.verify(token, secret);
    }catch(error){
        return null;
    }
}

export {
    setUser,
    getUser
}
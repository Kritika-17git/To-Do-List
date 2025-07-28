import { getUser } from "../service/auth.js";
async function restrictToLoggedInUsersOnly(req,res,next){
    const userUid = req.cookies.token;
    if(!userUid){
        return res.redirect("/login");
    }
    const user = getUser(userUid);
    if(!user){
        return res.redirect("/login");
    }
    req.user = user;
    next();
}
export {
    restrictToLoggedInUsersOnly,
}
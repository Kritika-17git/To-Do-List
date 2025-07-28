import express from "express"
import { restrictToLoggedInUsersOnly } from "../middleware/auth.js";
import {handleHomePage,handleUserLogin,handleGetOnLogin,handleUserSignup,handleGetOnSignup,handlePost,handleGet,handleDelete,handleCheckUser,handleAjaxLogin,handleChekedTodo} from "../controller/user.js"
import user from "../model/user.js";
const router = express.Router();
router.get("/",handleHomePage);
router.post("/login",handleUserLogin);
router.get("/login",handleGetOnLogin);
router.get("/signup",handleGetOnSignup);
router.post("/signup",handleUserSignup);
router.get("/home",restrictToLoggedInUsersOnly,handleGet);
router.post("/home",restrictToLoggedInUsersOnly,handlePost);
router.delete('/delete/:id',handleDelete);
router.post("/check-user",express.json(),handleCheckUser);
router.post("/check-login",handleAjaxLogin);
router.put("/tasks/:id/toggle",handleChekedTodo);
export default router;
import user from "../model/user.js"
import Todos from "../model/todo.js";
import {setUser} from "../service/auth.js"
async function handleHomePage(req,res) {
    res.render("home");
}
async function handleUserLogin(req,res) {
    const {email, password} = req.body;
    const finduser = await user.findOne({email,password});
    if(!finduser){
        return res.redirect("/signup");
    }
    const token = setUser(finduser);
    res.cookie("token", token).redirect("/home");
}

async function handleUserSignup(req,res) {
    try{
        const {name, email, password} = req.body;
        if (!name || !email || !password) {
            return res.redirect("/");
        }
        const existingUser = await user.findOne({ email });
        if (existingUser) {
            return res.redirect("/signup");
        }
        const newUser = new user({name,email,password});
        await newUser.save();
        const token = setUser(newUser);
        res.cookie("token", token).redirect("/home");
    }catch(error){
        return res.status(501).json({error:"internal server error"});
    }
}
async function handleGetOnLogin(req,res) {
    res.render("home");
}
async function handleGetOnSignup(req,res) {
    res.render("home");
}
async function handlePost(req,res) {
    try{
        const bodyData = req.body.todo;
        if (!bodyData || bodyData.trim() === "") {
            req.session.toast = "please enter a task before submitting."
            return res.redirect("/home");
        }
        const bodyDataModel = new Todos({task:bodyData, createdBy:req.user._id});
        await bodyDataModel.save();
        res.redirect("/home");
    }catch(error){
        res.status(500).json({"error":error});
    }
}
async function handleGet(req,res){
    try{
        if(!req.user){
            return res.redirect("/login");
        }
        const allusers = await Todos.find({createdBy: req.user._id});
        const toast = req.session.toast;
        req.session.toast = null;
        res.render("todos",{tasks:allusers,toast});
    }
    catch(error){
        res.status(400).json({"error":"no users"});
    }
}
async function handleDelete(req,res) {
    await Todos.findByIdAndDelete(req.params.id);
    res.sendStatus(200);
}
async function handleCheckUser(req,res) {
    const { email } = req.body;
    const existingUser = await user.findOne({ email });
    res.json({ exists: !!existingUser });
}
async function handleAjaxLogin(req,res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const existingUser = await user.findOne({ email });

    if (!existingUser) {
        return res.status(404).json({ error: "User does not exist" });
    }

    if (existingUser.password !== password) {
        return res.status(401).json({ error: "Incorrect password" });
    }

    const token = setUser(existingUser);
    res.cookie("token", token); 
    return res.status(200).json({ success: true });
}
async function handleChekedTodo(req,res) {
    const taskId = req.params.id;

    if (!taskId || taskId === "null") {
        return res.status(400).json({ error: "Invalid ID" });
    }

    try {
        const task = await Todos.findById(taskId);
        if (!task) return res.status(404).json({ error: "Task not found" });
        const { checked } = req.body;
        task.checked = checked;
        await task.save();

        res.json({ success: true });
    } catch (error) {
        console.error("Error updating task:", error);
        res.status(500).json({ error: "Server error" });
    }
};



export {
    handleHomePage,
    handleUserLogin,
    handleGetOnLogin,
    handleUserSignup,
    handleGetOnSignup,
    handlePost,
    handleGet,
    handleDelete,
    handleCheckUser,
    handleAjaxLogin,
    handleChekedTodo
}
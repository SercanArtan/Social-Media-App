const router = require("express").Router();
const req = require("express/lib/request");
const User = require("../models/User");
const bcrypt = require("bcrypt");

router.post("/register", async (req, res)=>{
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });

        const user = await newUser.save();
        res.status(200).json(user);
    }
    catch(err){
        res.status(500).json(err);
    }
});

// Login

router.post("/login", async (req, res) => {
    try{
        const user = await User.findOne({email: req.body.email});
        !user && res.status(404).json("user not found");

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        !validPassword && res.status(404).json("wrong password");

        res.status(200).json(user);
    }catch(err){
        res.status(500).json(err);
    }
})
module.exports = router
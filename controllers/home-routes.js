const router = require('express').Router();
//Need to display existing posts and comments at the homepage
const { Post, User } = require("../models");
const withAuth = require('../utils/auth');

//GET ALL POSTS IN HOME PAGE
router.get("/", async (req, res) => {
    try {
        const dbPostData = await Post.findAll({
            include: [
                {
                    model: User, 
                    attributes: ["username"],
                },
            ],
        });

        //Map through the posts and serialize
        const posts = dbPostData.map((post) => post.get({ plain: true }));

        res.render("homepage", {
            posts,
            logged_in: req.session.logged_in
        });
        
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//GET POST BY ID (IF AUTHENTICATED, CAN ADD A COMMENT LATER)
router.get("/posts/:id", async (req, res) => {
    try {
        const dbPostData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ["username"],
                }
            ]
        });

        const post = dbPostData.get({ plain: true });

        res.render("post", {
            ...post,
            logged_in: req.session.logged_in
        });

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//GET USER POSTS FROM DASHBOARD
router.get("/dashboard", withAuth, async (req, res) => {
    try{
        //req.session.user_id is to find the logged in user based on the user_id
        const dbUserData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ["password"] },
        });

        const user = dbUserData.get({ plain: true });

        const dbPostData = await Post.findAll({
            where: {
                user_id: req.session.user_id
            },
            include: [
                {
                    model: User,
                    attributes: ["username"],
                }
            ]
        });

        const posts = dbPostData.map((post) => post.get({ plain: true }));

        // console.log(posts);

        res.render("dashboard", {
            ...user,
            //removed the spread and it works!
            posts,
            logged_in: true
        });

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//GET CREATE POST PAGE
router.get("/dashboard/create", withAuth, async (req, res) => {
    try {
      res.render("create", {
        logged_in: true
    });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

//GET EDIT POST BY ID PAGE (NEED TO ADD :ID)
router.get("/dashboard/edit/:id", withAuth, async (req, res) => {
    try {
        const dbPostData = await Post.findByPk(req.params.id, {
            include: [ 
                {
                    model: User,
                    attributes: ["username"]
                },
            ],
        });

        const post = dbPostData.get({ plain: true });

        res.render("edit", {
            ...post,
            logged_in: true
    });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

//SIGN UP
router.get("/signup", (req, res) => {
    if(!req.session.logged_in){
        res.render("signup");
    }
});

//LOGIN 
router.get("/login", (req, res) => {
    //if already logged in, redirect to dashboard
    if(req.session.logged_in) {
        res.redirect("/dashboard");
        return;
    }
    res.render("login");
});

//LOGOUT
router.get("/logout", (req, res) => {
    if(!req.session.logged_in) {
        res.redirect("/");
    }
    res.render("homepage");
});



module.exports = router;
const router = require('express').Router();
//Need to display existing posts and comments at the homepage
const { Post, Comment } = require("../models");


//GET ALL POSTS IN HOME PAGE
router.get("/", async (req, res) => {
    try {
        const dbPostData = await Post.findAll({
            include: [
                {
                    model: Comment, 
                    attributes: ["post_id", "comment_body"],
                },
            ],
        });

        //Map through the posts
        // const posts = dbPostData.map((post) => )

        res.render("homepage", {
            //posts,
            //something else
        });
        
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//GET USER POSTS FROM DASHBOARD
router.get("/dashboard", async (req, res) => {
    try{
        //need to prompt user to sign in or sign up
        // get data from user posts

        res.render("dashboard", {
            //variable that contains users posts from database
        })

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


//LOGIN 

router.get("/login", (req, res) => {
    if(req.session.loggedIn) {
        res.redirect("/");
        return;
    }

    res.render("login");
});


module.exports = router;
const router = require('express').Router();
//Need to display existing posts and comments at the homepage
const { Post, Comment } = require("../models");


//GET ALL POSTS
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

//GET ONE POST
router.get("/posts/:id", async (req, res) => {
    try {

    } catch (err) {
        console.log(err);
        res.send(500).json(err);
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
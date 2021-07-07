const router = require('express').Router();
const { Post } = require('../../models');

//  /api/posts

//CREATE NEW POST
router.post("/", async(req, res) => {
    try {
        const dbPostData = await Post.create({
            title: req.body.title,
            post: req.body.post_body,
        });

        if(!dbPostData.post || dbPostData.title) {
            res.status(400).json({message: "Please enter a title AND post body"});
            return;
        } else {
            res.status(200).json(dbPostData);
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
});
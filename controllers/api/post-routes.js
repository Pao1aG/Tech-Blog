const router = require("express").Router();
const { Post, User, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

//  /api/posts

//CREATE NEW POST
router.post("/", withAuth, async (req, res) => {
  console.log(req.body);
    try {
        const dbPostData = await Post.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        console.log(dbPostData);

        res.status(200).json(dbPostData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
});

//UPDATE POST
router.put("/:id", withAuth, async (req, res) => {
  console.log(req.body);
    try {
        const dbPostData = await Post.findByPk(req.params.id,{
            //optional arguments here
        });

        if(!dbPostData) {
            res.status(404).json({ message: 'No post found with this id!' });
            return;
        };

        const updatedPost = await Post.update(req.body, {
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        res.status(200).json(updatedPost);

    } catch (err) {
      res.status(500).json(err);
      console.log(err);
    }
});


//DELETE POST
router.delete("/:id", withAuth, async (req, res) => {
    try {
      const dbPostData = await Post.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });
  
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id!' });
        return;
      }
  
      res.status(200).json(dbPostData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  //MAKE COMMENT
  router.post("/comment/:id", withAuth, async (req, res) => {
    console.log(req.body);
    console.log(req.session.user_id);
    console.log(req.body.post_id);
    try {
      const dbCommentData = await Comment.create({
        comment_body: req.body.comment_body,
        post_id : req.body.post_id,
        user_id: req.session.user_id,
      });
      console.log(dbCommentData);

      res.status(200).json(dbCommentData);

    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  module.exports = router;
  
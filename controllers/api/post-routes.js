const router = require("express").Router();
const { Post, User } = require("../../models");
const withAuth = require("../../utils/auth");

//  /api/posts

//CREATE NEW POST
router.post("/", withAuth, async (req, res) => {
    try {
        const dbPostData = await Post.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        if(!dbPostData.post && dbPostData.title) {
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

//UPDATE POST
router.put("/:id", withAuth, async (req, res) => {
    try {
        const dbPostData = await Post.findByPk({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
            include: [{model: User}]
        });

        if(!dbPostData) {
            res.status(404).json({ message: 'No post found with this id!' });
            return;
        };

        if(dbPostData.id == req.params.id) {
            Post.update(req.body, {
                where: {
                    id: req.params.id,
                    user_id: req.session.user_id,
                },
            });
        };

        res.status(200).json(dbPostData);

    } catch (err) {
      res.status(500).json(err);
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
  
  module.exports = router;
  
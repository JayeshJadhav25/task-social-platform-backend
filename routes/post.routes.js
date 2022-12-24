const express = require('express');
const multer = require('multer');
const router = express.Router();
const postController = require('../controllers/post.controller');
const {checkAuth} = require('../middleware/auth');

const storage = multer.diskStorage({
    destination: (req,file,cb) => { 
        cb(null, 'uploads');
        console.log('req.body',req.body);
    //   console.log('req.body',file)
    },
    filename: (req,file,cb) => {

      if(!file.originalname.match(/\.(png|jpg|jpeg)$/)){
        return cb(new Error('Please upload an image'))
      }
      cb(null,Date.now() + file.originalname);
    }
  })
router.post('/create',checkAuth,multer({storage: storage}).single('files'),postController.create);

router.post('/like',checkAuth,postController.likePost);

router.get('/myposts',checkAuth,postController.getPostsOfLoginUser);

router.get('/allposts',checkAuth,postController.allPostWithAuthorDetails);

module.exports = router;
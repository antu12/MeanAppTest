var express = require('express');
var router = express.Router();
// const mongoose = require('mongoose');
const vid = require('../../models/video');

/* GET home page. */
router.get('/', function(req, res) {
  // res.render('index', { title: 'Express' });
  res.send('api works!');
});

router.get('/videos', function(req, res) {
  console.log('Get request for all videos');
  vid.find({})
    .exec(function (err, videos) {
      if(err){
        console.log('Error getting video '+err);
      }else{
        res.json(videos);
      }
    })
});

router.get('/videos/:id', function(req, res) {
  console.log('Get request for a video');
  vid.findById(req.params.id)
    .exec(function (err, video) {
      if(err){
        console.log('Error getting video '+err);
      }else{
        res.json(video);
      }
    })
});

router.post('/videos',function (req, res) {
  console.log('post a vid');
  var newVideo = new vid();
  newVideo.title=req.body.title;
  newVideo.url= req.body.url;
  newVideo.description=req.body.description;
  newVideo.save(function (err, insertedVideo) {
    if(err){
      console.log('error loading video');
    }else{
      res.json(insertedVideo);
    }
  })
});

router.put('/videos/:id',function (req, res) {
  console.log('Update video');
  vid.findByIdAndUpdate(req.params.id,
    {
      $set:
        {
          title: req.body.title,
          url: req.body.url,
          description: req.body.description
        }
    },
    {
      new:true
    },
    function (err, updatedVideo) {
      if(err){
        res.send('video update failed');
      }else{
        res.json(updatedVideo);
      }
    }
  );
});

router.delete('/videos/:id',function (req, res) {
  console.log("Deleting a video");
  vid.findByIdAndRemove(req.params.id, function (err, deletedVideo) {
    if(err){
      res.send("error deleting video");
    }else{
      res.json(deletedVideo);
    }
  });
});

module.exports = router;

"use strict";

const express = require("express");
const bodyParser = require("body-parser");

const restService = express();

restService.use(
  bodyParser.urlencoded({
    extended: true
  })
);

restService.use(bodyParser.json());

var history = [];

restService.post("/getSongByName", function(req, res) {

//  var speech = req.body.queryResult && req.body.queryResult.parameters && req.body.queryResult.parameters.song ?
//                "Shivam" : "Sadiq";

  // const speech = '<speak><audio src="https://actions.google.com/sounds/v1/cartoon/slide_whistle.ogg"><desc>a cat purring</desc></audio></speak>';
  // const speech = "test 1.0"
  var speech ="";


  switch(req.body.queryResult.parameters.song){ 
    
  
    
    case "music":
     speech = '<speak><audio src="https://actions.google.com/sounds/v1/cartoon/slide_whistle.ogg"><desc>a cat purring</desc></audio></speak>';
     history.push("cartoon");
     break;
    case "too long":
      speech = '<speak><audio src="https://cdns-preview-d.dzcdn.net/stream/c-ddf495316e2afbe4327d9a6e17840a69-7.mp3"><desc> Too Long</desc></audio></speech>';
      history.push("too_long");
      break;
    case "dz":     
     speech = '<speak><audio src="https://cdns-preview-b.dzcdn.net/stream/c-b2e0166bba75a78251d6dca9c9c3b41a-7.mp3"><desc>deezer stream</desc></audio></speak>';
     history.push("dz");
     break;


  }


  


  // '<speak><audio src="https://actions.google.com/sounds/v1/cartoon/slide_whistle.ogg"><desc>a cat purring</desc></audio></speak>';
               //  new Audio('file:///D://file_example_MP3_700KB.mp3') ;

  // const song = req.body.result.parameters.song.toLowerCase();
  // const speech1 = new Audio('https://file-examples.com/wp-content/uploads/2017/11/file_example_MP3_700KB.mp3');
  // var speech = "";

  // speech = 'shivam';

  var speechResponse = {  
    google: {
      expectUserResponse: true,
      richResponse: {
        items: [
          {
            simpleResponse: {
              textToSpeech: speech
            }
          }
        ]
      }
    }
  };

  return res.json({
    payload: speechResponse,
    //data: speechResponse,
   fulfillmentText: speech,
    speech: speech,
    displayText: speech,
    source: "webhook-echo-sample"
  });
});

restService.post("/discoverMusic", function(req, res){
  var speech ="";
  var musicToDiscover = "";
  var str = "Looking at your playing history you can discover ";
  switch(req.body.queryResult.parameters.discover){ 
    case "discover new song":
      if(history.indexOf("cartoon")==-1){
        musicToDiscover = "cartoon";
      }
      else if(history.indexOf("too_long")==-1){
        musicToDiscover = "too long";
      }
      else if(history.indexOf("dz")==-1){
        musicToDiscover = "dz";
      }
      speech =  str.concat(musicToDiscover);
  }


  var speechResponse = {  
    google: {
      expectUserResponse: true,
      richResponse: {
        items: [
          {
            simpleResponse: {
              textToSpeech: speech
            }
          }
        ]
      }
    }
  };

  return res.json({
    payload: speechResponse,
    //data: speechResponse,
   fulfillmentText: speech,
    speech: speech,
    displayText: speech,
    source: "webhook-echo-sample"
  });
  
});

restService.listen(process.env.PORT || 8000, function() {
    console.log("Server up and listening");
  });

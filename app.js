const express = require("express");
const https = require("https");
const bodyParser = require('body-parser');
const { response } = require("express");
const { dirname } = require("path");
const app = express();

app.use(bodyParser.urlencoded({extented:true}));
app.use(express.static("public"));


app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
  console.log("this is working...bro ");
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const emailId = req.body.emailId;
  console.log(firstName + lastName + emailId);

  const data = {
    members : [{
        email_address : emailId,
        status : "subscribed",
        merge_fields: {
          FNAME : firstName,
          LNAME : lastName
        }
    }
   ]
 };

const jsondata = JSON.stringify(data);
const url = "https://us5.api.mailchimp.com/3.0/lists/37947d404c";
const option = {method:'post',auth:"Roshan:beef3daa3135544045fbd46c1bf7f469-us5"};
const reqst = https.request(url,option,function(response){
    if(response.statusCode ===200){
        res.sendFile(__dirname + "/success.html");
    } else {
        res.sendFile(__dirname + "/failure.html");
    }

    response.on("data",function(data){
        console.log(JSON.parse(data));
    });
});

reqst.write(jsondata);
reqst.end();

});

app.post("/failure",function(req,res){
  res.redirect("/");
})



app.listen(process.env.PORT || 3000,function(){
  console.log("The server is running at port 3000");
});

//beef3daa3135544045fbd46c1bf7f469-us5
//37947d404c
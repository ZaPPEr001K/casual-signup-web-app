const bodyParser = require("body-parser");
const express = require("express");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
})

app.post("/",function (req,res) {
    var firstName = req.body.fname;
    var secondName = req.body.lname;
    var eMail = req.body.email;

    // console.log(firstName,secondName,eMail);

    const data = {

        members: [
            {
                email_address: eMail,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: secondName
                }
            }
        ]
    }
    const jsonData = JSON.stringify(data);
    const url = "https://us8.api.mailchimp.com/3.0/lists/b431916d08";

    const options = {
        method: "POST",
        auth: "sheraz:71db722e105e4a0b5743f5b94fd2b760-us8"
    }

    const request = https.request(url, options, function(response){    // <--- study https.request
        // response.on("data", function(data){   // <--- study response.on
        //     console.log(JSON.parse(data));
        // })
    })

    request.write(jsonData); // <--- study request.write
    request.end();
});

app.listen(process.env.PORT || 3000,function(){
    console.log("it is on the port 3000");
});


//  API key 
//  71db722e105e4a0b5743f5b94fd2b760-us8

// Audience ID 
// b431916d08

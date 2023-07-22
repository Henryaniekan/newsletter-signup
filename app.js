const express = require("express");
const bodyparser = require("body-parser");
const request = require("request");
const app = express();
const KEY = process.env.MAIL_CHIMP_KEY
app.use(express.static("public"));
app.use(bodyparser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const eml = req.body.email;
  console.log(firstName, lastName, eml);

  const data = {
    members: [
      {
        email_address: eml,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };

  const jsonData = JSON.stringify(data);
  const url = "https://us21.api.mailchimp.com/3.0/lists/028eeecb1e";
  const options = {
    method : "POST",
    auth: {
      user: "any",
      pass: `${KEY}`,
    },
    headers: {
      "Content-Type": "application/json",
    },
    body: jsonData,
  };

  request(url, options, function (error, response, body) {
    if (error) {
      console.log(error);
    } else {
      console.log(JSON.parse(body));
    }
  });
});

app.listen(3000, function (req, res) {
  console.log("server is running on port 3000");
});

// const express = require("express");
// const bodyparser = require("body-parser");
// const request = require("request");
// const app = express();

// app.use(express.static("public"));
// app.use(bodyparser.urlencoded({extended:true}));

// app.get("/", function(req,res){
//     res.sendFile(__dirname +"/signup.html");
// });

// app.post("/", function(req, res){
//     const firstName = req.body.fName;
//     const lastName = req.body.lName;
//     const email = req.body.email;
//     console.log(firstName, lastName, email);
// })

// const data = {
//     members: [
//         {
//             email_address: email,
//             status: subscribed,
//             merge_field: {
//                 fName: firstName,
//                 lName: lastName,
//             }
//         }
//     ]
// }

// const jsonData = JSON.stringify(data);
// const url = "https://us6.api.mailchimp.com/3.0/lists/028eeecb1e";
// const option = {
//     method : "POST",
//     auth : "darkcloud:aac7ea26feb7f24f67d5504bfad43fde-us21",
// }
// Http2ServerRequest.request(url, option, function(response){
//     response.on(data, function(data){
//         console.log(JSON.parse(data));
//     });
// });

// request.write(jsonData);
// request.end();

// app.listen(3000, function(req, res){
//     console.log("server is running on port 3000");
// });

// //api key
// // aac7ea26feb7f24f67d5504bfad43fde-us21

// // api id
// //028eeecb1e

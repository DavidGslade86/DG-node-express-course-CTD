const http = require("http");
var StringDecoder = require("string_decoder").StringDecoder;

const getBody = (req, callback) => {
  const decode = new StringDecoder("utf-8");
  let body = "";
  req.on("data", function (data) {
    body += decode.write(data);
  });
  req.on("end", function () {
    body += decode.end();
    const body1 = decodeURI(body);
    const bodyArray = body1.split("&");
    const resultHash = {};
    bodyArray.forEach((part) => {
      const partArray = part.split("=");
      resultHash[partArray[0]] = partArray[1];
    });
    callback(resultHash);
  });
};
//I've added a comment
// here, you could declare one or more variables to store what comes back from the form.
let text = "What basic color do you want to see?";
let color = "";
let placeholder = ""

// here, you can change the form below to modify the input fields and what is displayed.
// This is just ordinary html with string interpolation.
const form = () => {
  return `
  <body style = "
    background-color: ${color}; 
    font-size:2em;
    font: Garamond;
    color: ${color === "black" || color === "navy" ? "white": "black"};
    font-weight:800;
    height: 100vh; 
    width: 100vw; 
    text-align:center;
  ">
  <p>${text}${color}</p>
  <form method="POST">
  <input name="color" placeholder="${placeholder}"></input>
  <button type="submit">Submit</button>
  </form>
  </body>
  `;
};

const server = http.createServer((req, res) => {
  console.log("req.method is ", req.method);
  console.log("req.url is ", req.url);
  if (req.method === "POST") {
    getBody(req, (body) => {

      console.log("The body of the post is ", body);
      // here, you can add your own logic
      
      function isValidColor(color) {
        const namedColors = /^(aqua|black|blue|fuchsia|gray|green|lime|maroon|navy|olive|orange|purple|red|silver|teal|white|yellow)$/i;
        return namedColors.test(color);
      }

      if (body["color"]) {
        if(isValidColor(body["color"])){
          text = "Well here is a lot of "
          color = body["color"].toLowerCase();
          placeholder = "Another color?"
        } else {
          text = "I don't know that color, so you get "
          color = "gray";
          placeholder = "Another color?"
        }

      } else {
        text = "Nothing was entered.";
      }
      // Your code changes would end here
      res.writeHead(303, {
        Location: "/",
      });
      res.end();
    });
  } else {
    res.end(form());
  }
});

server.on("request", (req) => {
  console.log("event received: ", req.method, req.url);
});

server.listen(3000);
console.log("The server is listening on port 3000.");

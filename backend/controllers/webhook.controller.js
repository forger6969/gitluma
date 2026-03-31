const crypto = require("crypto");


const verifySignature = (req, secret) => {
  const signature = req.headers["x-hub-signature-256"];
  const hmac = crypto.createHmac("sha256", secret);
  const digest = "sha256=" + hmac.update(JSON.stringify(req.body)).digest("hex");
  return signature === digest;
};


const githubWebhook = async ()=>{

    try {
           const event = req.headers["x-github-event"];
           const payload = req.body

           console.log(payload);
           
    } catch (err) {
        next(err)
    }

}


module.exports ={
    githubWebhook
}
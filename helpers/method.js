function generateCode(){
  let value,val;
  value = Math.floor(1000 + Math.random() * 9000000);
  val = value.toString();
  return val
}
async function sendAccountResetCode(email,name,val){
  const mailjet = require ('node-mailjet')
    .connect(process.env.MAILJET_PUBLIC,process.env.MAILJET_PRIVATE,)
    const request = mailjet
    .post("send", {'version': 'v3.1'})
    .request({
      "Messages":[
        {
          "From": {
            "Email": "ask4ismailsadiq@gmail.com",
            "Name": "IDrip support"
          },
          "To": [
            {
              "Email": email,
              "Name": name
            }
          ],
          "Subject": " Password Reset Code ✔",
          "TextPart": val,
          // "HTMLPart": "<h3>Dear passenger 1, welcome to <a href='https://www.mailjet.com/'>Mailjet</a>!</h3><br />May the delivery force be with you!",
          "CustomID": "AppGettingStartedTest"
        }
      ]
    })
    request
      .then((result) => {
        console.log(result.body)
      })
      .catch((err) => {
        console.log(err.statusCode)
      })
}
async function sendAccountVerificationCode(email,name,val){
  const mailjet = require ('node-mailjet')
    .connect(process.env.MAILJET_PUBLIC,process.env.MAILJET_PRIVATE,)
    const request = mailjet
    .post("send", {'version': 'v3.1'})
    .request({
      "Messages":[
        {
          "From": {
            "Email": "ask4ismailsadiq@gmail.com",
            "Name": "IDrip support"
          },
          "To": [
            {
              "Email": email,
              "Name": name
            }
          ],
          "Subject": " Account Verification Code ✔",
          "TextPart": val,
          // "HTMLPart": "<h3>Dear passenger 1, welcome to <a href='https://www.mailjet.com/'>Mailjet</a>!</h3><br />May the delivery force be with you!",
          "CustomID": "AppGettingStartedTest"
        }
      ]
    })
    request
      .then((result) => {
        console.log(result.body)
      })
      .catch((err) => {
        console.log(err.statusCode)
      })
}
async function subscriptionEmail(){
  const mailjet = require ('node-mailjet')
    .connect(process.env.MAILJET_PUBLIC,process.env.MAILJET_PRIVATE,)
    const request = mailjet
    .post("send", {'version': 'v3.1'})
    .request({
      "Messages":[
        {
          "From": {
            "Email": "noreply@i-drip.com",
            "Name": "IDrip support"
          },
          "To": [
            {
              "Email": email,
              "Name": name
            }
          ],
          "Subject": " Account Verification Code ✔",
          "TextPart": val,
          // "HTMLPart": "<h3>Dear passenger 1, welcome to <a href='https://www.mailjet.com/'>Mailjet</a>!</h3><br />May the delivery force be with you!",
          "CustomID": "AppGettingStartedTest"
        }
      ]
    })
    request
      .then((result) => {
        console.log(result.body)
      })
      .catch((err) => {
        console.log(err.statusCode)
      })
}

module.exports ={
  generateCode,
  sendAccountResetCode,
  sendAccountVerificationCode,
  subscriptionEmail
}
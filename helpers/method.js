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
async function subscriptionEmail(user,posts){
  let email = user.email;
  let name = user.firstname + user.lastname
  let div = ''
  for(let i=0;i<posts.length;i++){
    div+=`<div><a href=${process.env.URL}/${posts[i].id} alt=${posts[i].title}>${posts[i].title}</a></div>`
  }
  const mailjet = require ('node-mailjet')
    .connect(process.env.MAILJET_PUBLIC,process.env.MAILJET_PRIVATE,)
    const request = mailjet
    .post("send", {'version': 'v3.1'})
    .request({
      "Messages":[
        {
          "From": {
            "Email": "ask4ismailsadiq@gmail.com",
            "Name": "IDrip"
          },
          "To": [
            {
              "Email": email,
              "Name": name
            }
          ],
          "Subject": `${user.firstname,user.lastname}'s Weekly Digest`,
          // "TextPart": ,
          "HTMLPart": `<div>Weeks featured posts</div><div>${div}</div>`,
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
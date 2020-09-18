import handler from './controllers/handler/handler-lib';
import axios from 'axios';
export const main = handler(async (event, context) => {
    let url = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";
    /*eslint new-cap: [2, {"newIsCapExceptions": ["Buffer.from"]}]*/
  let auth = new Buffer.from("aOgXdX4pVtDnQKVwzzdHQQJiFrkay2uH:sYzRpAUNopC2g80x").toString('base64');
  //get the token
 axios.get(url,{

      headers: {
        Authorization: "Basic " + auth,
      }
  }).then(response => {
     return (response.data.access_token);
  })
    .then(register)
    .then(register_response => {
        console.log(register_response);
        return register_response;
    });

});
//register end points
function register(data){

    let regurl = "https://sandbox.safaricom.co.ke/mpesa/c2b/v1/registerurl";
    let regauth = "Bearer " + data;
    return axios.post(regurl,{

      headers: {
          "Authorization": regauth
      },
      json: {
          "ShortCode": "600730",
          "ResponseType": "Complete",
          "ConfirmationURL": "http://192.168.1.50:3000/confirmation",
          "ValidationURL": "http://192.168.1.50:3000/validation"
      }
  }).then(function (response) {
      // handle success
      return response;

    })
    .catch(function (error) {
      // handle error
      return error;
    });

}
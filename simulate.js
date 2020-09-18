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
    .then(simulate)
    .then(register_response => {
console.log(register_response);
        return register_response;
    });

});
//register end points
function simulate(data){

    let simurl = "https://sandbox.safaricom.co.ke/mpesa/c2b/v1/simulate";
    let simauth = "Bearer " + data;
    console.log(simauth);
    return axios.post(simurl,{

      headers: {
          "Authorization": simauth
      },
      json: {
        "ShortCode": "600383",
        "CommandID": "CustomerPayBillOnline",
        "Amount": "100",
        "Msisdn": "254748905088",
        "BillRefNumber": "TestAPI"
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
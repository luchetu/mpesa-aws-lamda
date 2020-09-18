    import handler from './controllers/handler/handler-lib';
    import axios from 'axios';
    export const main = handler(async (event, context) => {
        let body;
        let url = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";
          /*eslint new-cap: [2, {"newIsCapExceptions": ["Buffer.from"]}]*/
          let auth = new Buffer.from(process.env.MPESA_CONSUMER_KEY).toString('base64');
       axios.get(url,{

            headers: {
              Authorization: "Basic " + auth,
            }
        })
          .then(function (response) {
            // handle success
            body=response.data.access_token;
       console.log(body);
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          });
   return body;
    });

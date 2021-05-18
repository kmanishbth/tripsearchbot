   
function tokenGeneration(){  
    console.log("Inside token generation")
    // let tokenValue;
    var axios = require('axios');
     var qs = require('qs');
     var data = qs.stringify({
     'client_id': '5fibqmu1t1gro8tbjtr5l1mr04',
     'client_secret': '1uflub7gu9rtuaf4llpi5o0lsd66prcvift8q3s1p1t4707hc3pm',
     'grant_type': 'client_credentials' 
     });
     var config = {
     method: 'post',
     url: 'https://auth.travel-data-api.bcdtravel.com/oauth2/token',
     headers: { 
         'Content-Type': 'application/x-www-form-urlencoded', 
         'Cookie': 'XSRF-TOKEN=a1b32ab2-b856-46a8-b84f-5b30275d591c'
     },
     data : data
     };
     console.log("config for token",config)
     return axios(config)
     .then((response) => {
        return response.data.access_token;
        })
}

 module.exports = { tokenGeneration };
const {tokenGeneration} = require('../request/tokengeneration')


// const ENV_FILE = path.join(__dirname, '.env');
// require('dotenv').config({ path: ENV_FILE });

// Search trip by emailID

async function tripSearchApiCall(){  
    var axios = require('axios');
    const token = await tokenGeneration()
    
    var data = JSON.stringify({
      "limit": 1,
      "offset": 0,
      "sort": [
        {
            "outboundDate": "desc"
        }
      ],
      "filter": {}
    });
    
    var config = {
      method: 'post',
      url: 'https://travel-data-api.bcdtravel.com/v1/trips',
      headers: { 
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${token}`
      },
      data : data
    };
    
    return axios(config)
    .then((res) => {
        console.log("inside search trip ")
        console.log(JSON.stringify(res.data))
        return res.data
    })
    }
    


    // async function tripSearchApiCall(){  
    //     var axios = require('axios');
    //     const token = await tokenGeneration()
        
    //     var data = JSON.stringify({
    //       "limit": 1,
    //       "offset": 0,
    //       "sort": [
    //         {
    //             "outboundDate": "desc"
    //         }
    //       ],
    //       "filter": {
    //         "travelerEmailAddress": process.env.TestEmailID
    //     }
    //     });
        
    //     var config = {
    //       method: 'post',
    //       url: 'https://travel-data-api.bcdtravel.com/v1/trips',
    //       headers: { 
    //         'Content-Type': 'application/json', 
    //         'Authorization': `Bearer ${token}`
    //       },
    //       data : data
    //     };
        
    //     return axios(config)
    //     .then((res) => {
    //         console.log("inside search trip ")
    //         console.log(JSON.stringify(res.data))
    //         return res.data
    //     })
    //     }
        


// Get trip by ID
// async function tripSearchResponse(){
//     console.log("Inside Trip search response function")

//     const axios = require('axios')
//     const token = await tokenGeneration()
//     console.log("Token Value",token)
//     return axios.get('https://travel-data-api.bcdtravel.com/v1/trips/dc3a33fe-6bf3-2a77-0154-09d091b3d443', {
//     headers: {
//         'Authorization': `Bearer ${token}`
//     }
//     })
//     .then((res) => {
//         // console.log(res.data)
//         return res.data
//     })
// }


module.exports = { tripSearchApiCall };

// export {tripSearchResponse};
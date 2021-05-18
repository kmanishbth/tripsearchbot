//Reading response from temp file

async function tripResponse(userIntent , apiResponse){
    if(userIntent == "SEARCH_Agent"){
        console.log("Inside SEARCH_Agent")
        return await tripAgentResponse(userIntent , apiResponse)
    }
    else if(userIntent == "SEARCH_Airport"){
        console.log("Inside SEARCH_Airport")
        return await tripAirportResponse(userIntent , apiResponse);
    }
    else if(userIntent == "SEARCH_TerminalDepart"){
        console.log("Inside SEARCH_TerminalDepart")
        return await tripDepartResponse(userIntent , apiResponse);
    }
    else if(userIntent == "SEARCH_TerminalArrival"){
        console.log("Inside SEARCH_TerminalArrival")
        return await tripArrivalResponse(userIntent , apiResponse);
    }
    else if(userIntent == "SEARCH_FlightNumber"){
        console.log("Inside SEARCH_FlightNumber")
        return await tripFlightNumberResponse(userIntent , apiResponse);
    }
    else if(userIntent == "SEARCH_Meal"){
        console.log("Inside SEARCH_Meal")
        return await tripMealResponse(userIntent , apiResponse);
    }
    else if(userIntent == "SEARCH_Seat"){
        console.log("Inside SEARCH_Seat")
        return await tripSeatResponse(userIntent , apiResponse);
    }
    else if(userIntent == "SEARCH_Equipment"){
        console.log("Inside SEARCH_Equipment")
        return await tripEquipResponse(userIntent , apiResponse);
    }
    else if(userIntent == "SEARCH_ClassType"){
        console.log("Inside SEARCH_ClassType")
        return await tripClassResponse(userIntent , apiResponse);
    }
    else if(userIntent == "SEARCH_FlightJourney"){
        console.log("Inside SEARCH_FlightJourney")
        return await tripFlightResponse(userIntent , apiResponse);
    }
    else if(userIntent == "SEARCH_Fare"){
        console.log("Inside SEARCH_Fare")
        return await tripFareResponse(userIntent , apiResponse);
    }
    else if(userIntent == "SEARCH_Ticketed"){
        console.log("Inside SEARCH_Ticketed")
        return await tripTicketedResponse(userIntent , apiResponse);
    }
    else if(userIntent == "SEARCH_TicketNumber"){
        console.log("Inside SEARCH_TicketNumber")
        return await tripTicketNumberResponse(userIntent , apiResponse);
    }
    else if(userIntent == "SEARCH_TicketType"){
        console.log("Inside SEARCH_TicketType")
        return await tripTicketTypeResponse(userIntent , apiResponse);
    }
    else{
        console.log("Inside last else")
        return "Please enter a proper utterence.."
    }

}

async function tripAgentResponse(userIntent , apiResponse ){
    console.log("Inside userIntent response",userIntent)
    let finalResp =  `To make this change I will need to pass you through to an agent.Please choose Yes or No`
    console.log("This is finalresp",finalResp)
    return finalResp
}

async function tripAirportResponse(userIntent , apiResponse ){
    console.log("Inside userIntent response",userIntent)
    const resObject = await apiResponse;
    let finalDepartureresponse = "";
    let finalArrivalResponse = "";
    let finalResponse =[]
    console.log("bf4 getting segs")

    let airSegmentArray = Object.values(resObject["result"][0]["segments"]);
    console.log("bf4 for loop")

    for (let airObject of airSegmentArray) {
        console.log("inside for loop")

        if(airObject.type == "Air"){
            // console.log(airObject.segmentNumber);
            let departAirportName = airObject.departureAirport.airport.name;
            let departAirportAddress = airObject.departureAirport.airport.address.city.name;
            let departAirportTerminal = airObject.departureAirport.terminal;
            let arriveAirportName = airObject.arrivalAirport.airport.name;
            let arriveAirportAddress = airObject.arrivalAirport.airport.address.city.name;
            let arrivrAirportTerminal = airObject.arrivalAirport.terminal;
            if(departAirportName){
                finalDepartureresponse =  `For segment ${airObject.segmentNumber} , Your flight is departing from ${departAirportName},${departAirportAddress}`
                if(departAirportTerminal){
                    finalDepartureresponse = `${finalDepartureresponse} at ${departAirportTerminal}`
                }
            }
            if(arriveAirportName){
                finalArrivalResponse =  `Your flight is arriving at ${arriveAirportName}, ${arriveAirportAddress}`
                if(arrivrAirportTerminal){
                    finalArrivalResponse = `${finalArrivalResponse} at ${arrivrAirportTerminal}`
                }
            }
            
            finalResponse.push( `${finalDepartureresponse}\n ${finalArrivalResponse} `)
            if(finalResponse.length<1){
                finalResponse = "No Airport Information found."
            }
        }
    }
            
            console.log("This is finalresp",finalResponse)
            return finalResponse
        
    
}

async function tripDepartResponse(userIntent , apiResponse ){
    console.log("Inside userIntent response",userIntent)
    const resObject = await apiResponse;
    let finalResp = [];
    let airSegmentArray = Object.values(resObject["result"][0]["segments"]);
    for (let airObject of airSegmentArray) {
        if(airObject.type == "Air"){
        let departAirportTerminal = airObject.departureAirport.terminal;
        if(departAirportTerminal){
            finalResp.push(`For segment ${airObject.segmentNumber}, You are departing from terminal ${departAirportTerminal}`)
        }
        else{
            finalResp.push(`For segment ${airObject.segmentNumber}, No terminal Info given`)
        }    
        }}
        console.log("This is finalResp",finalResp)
        return finalResp
}

async function tripArrivalResponse(userIntent , apiResponse ){
    console.log("Inside userIntent response",userIntent)
    const resObject = await apiResponse;
    let finalResp = [];
    let airSegmentArray = Object.values(resObject["result"][0]["segments"]);
    for (let airObject of airSegmentArray) {
        if(airObject.type == "Air"){
        let arrivalAirportTerminal = airObject.arrivalAirport.terminal;
        if(arrivalAirportTerminal){
            finalResp.push(`For segment ${airObject.segmentNumber}, You are arriving on terminal ${arrivalAirportTerminal}`)
        }
        else{
            finalResp.push(`For segment ${airObject.segmentNumber}, No terminal Info given`)
        }    
        }}
        console.log("This is finalResp",finalResp)
        return finalResp

}

async function tripFlightNumberResponse(userIntent , apiResponse ){
    console.log("Inside userIntent response",userIntent)
    const resObject = await apiResponse;
    let finalResp = [];
    let airSegmentArray = Object.values(resObject["result"][0]["segments"]);
    for (let airObject of airSegmentArray) {
        if(airObject.type == "Air"){
        let flightnumber = airObject.marketingFlight.flightNumber;
        if(flightnumber){
            finalResp.push(`For segment ${airObject.segmentNumber}, Your flight number is ${flightnumber}`)
        }
        else{
            finalResp.push(`For segment ${airObject.segmentNumber}, No flight number is given`)
        }    
        }}
        console.log("This is finalResp",finalResp)
        return finalResp
}

async function tripMealResponse(userIntent , apiResponse ){
    console.log("Inside userIntent response",userIntent)
    const resObject = await apiResponse;
    let finalResp = [];
    let airSegmentArray = Object.values(resObject["result"][0]["segments"]);
    for (let airObject of airSegmentArray) {
        if(airObject.type == "Air"){
        let mealPreferences = airObject.mealPreferences;
        if(Object.keys(mealPreferences).length == 0){
        mealPreferences = "None";
    }
    let hasSpecialMeal = airObject.meal.hasSpecialMeal;
    finalResp.push(`For segment ${airObject.segmentNumber}, Your meal selection is ${mealPreferences} and has ${hasSpecialMeal} special meal`)
}}
    console.log("This is finalResp",finalResp)
    return finalResp
}

async function tripSeatResponse(userIntent , apiResponse ){
    console.log("Inside userIntent response",userIntent)
    const resObject = await apiResponse;
    let finalResp = [];
    let airSegmentArray = Object.values(resObject["result"][0]["segments"]);
    for (let airObject of airSegmentArray) {
        if(airObject.type == "Air"){
            let seatPreferences = airObject.seatSelections.location;
            finalResp.push(`For segment ${airObject.segmentNumber}, Your seat selection is ${seatPreferences} `)
        }}
    console.log("This is finalResp",finalResp)
    return finalResp
}


async function tripEquipResponse(userIntent , apiResponse ){
    console.log("Inside userIntent response",userIntent)
    const resObject = await apiResponse;
    let finalResp = [];
    let airSegmentArray = Object.values(resObject["result"][0]["segments"]);
    for (let airObject of airSegmentArray) {
        if(airObject.type == "Air"){   
            let equipmentCode = airObject.equipment.code;
            finalResp.push(`For segment ${airObject.segmentNumber}, You currently have ${equipmentCode} added to your booking`)
        }}
    console.log("This is finalResp",finalResp)
    return finalResp
}


async function tripClassResponse(userIntent , apiResponse ){
    console.log("Inside userIntent response",userIntent)
    const resObject = await apiResponse;
    let finalResp = [];
    let airSegmentArray = Object.values(resObject["result"][0]["segments"]);
    for (let airObject of airSegmentArray) {
        if(airObject.type == "Air"){ 
            let classOfService = airObject.classOfService.description;
            let classOfServiceCode = airObject.classOfService.code;
            finalResp.push( `For segment ${airObject.segmentNumber}, You ar flying in class ${classOfServiceCode} i.e. ${classOfService}`)
        }}
    
    console.log("This is finalResp",finalResp)
    return finalResp
}

async function tripFlightResponse(userIntent , apiResponse ){
    console.log("Inside userIntent response",userIntent)
    const resObject = await apiResponse;
    let finalResp = [];
    let airSegmentArray = Object.values(resObject["result"][0]["segments"]);
    for (let airObject of airSegmentArray) {
        if(airObject.type == "Air"){
        let departAirport = airObject.departureAirport.airport.name;
        let arriveAirport = airObject.arrivalAirport.airport.name;
        let flightDistance = airObject.flightDistance;
        if(departAirport){
            if(arriveAirport){
                if(flightDistance){
                    finalResp.push(`For segment ${airObject.segmentNumber}, Your flight from ${departAirport} to ${arriveAirport} is ${flightDistance}`)
            }else{
                finalResp.push(`For segment ${airObject.segmentNumber}, Your flight details is not found.`)
            }
        }}        
}}
    console.log("This is finalResp",finalResp)
    return finalResp
}

async function tripFareResponse(userIntent , apiResponse ){
    console.log("Inside userIntent response",userIntent)
    const resObject = await apiResponse;
    let finalResp = [];
    let airSegment = [];
    let fareSegment = [];
    let airSegmentArray = Object.values(resObject["result"][0]["segments"]);
    for (let airObject of airSegmentArray) {
        airSegment.push(airObject.segmentNumber)
    }
    let fareSegmentArray = Object.values(resObject["result"][0]["fareInfos"]);
    for (let fareObject of fareSegmentArray) {
        fareSegment.push(fareObject.segmentNumbers)
    }
    if(airSegment.length == fareSegment.length){
        for(fareObject of fareSegmentArray){
        let totalFareCurrency = fareObject.estimatedTotalFare.currency;
        let totalFareAmount = fareObject.estimatedTotalFare.amount;
        finalResp.push(`For segment ${airObject.segmentNumber}, the cost of the flight reservation was ${totalFareCurrency}:${totalFareAmount}`)
}}
    console.log("This is finalResp",finalResp)
    return finalResp
}

async function tripTicketedResponse(userIntent , apiResponse ){
    console.log("Inside userIntent response",userIntent)
    const resObject = await apiResponse;
    let finalResp = [];
    let airSegmentArray = Object.values(resObject["result"][0]["segments"]);
    for (let airObject of airSegmentArray) {
        if(airObject.type == "Air"){
            let isTicketed = airObject.ticket.isTicketed;
            if(isTicketed == "true"){
                finalResp.push(`For segment ${airObject.segmentNumber}, the status of your flight is Ticketed`)}
            else{
                finalResp.push(`For segment ${airObject.segmentNumber}, the status of your flight is Not Ticketed`)
            }
        }}
    console.log("This is finalResp",finalResp)
    return finalResp
}

async function tripTicketNumberResponse(userIntent , apiResponse ){
    console.log("Inside userIntent response",userIntent)
    const resObject = await apiResponse;
    let finalResp = [];
    let airSegmentArray = Object.values(resObject["result"][0]["segments"]);
    for (let airObject of airSegmentArray) {
        if(airObject.type == "Air"){
            let ticket = airObject.ticket.ticketNumber;
            finalResp.push(`For segment ${airObject.segmentNumber}, Your ticket number is ${ticket}`)
        }}
    console.log("This is finalResp",finalResp)
    return finalResp
}

async function tripTicketTypeResponse(userIntent , apiResponse ){
    console.log("Inside userIntent response",userIntent)
    const resObject = await apiResponse;
    let finalResp = [];
    let airSegmentArray = Object.values(resObject["result"][0]["segments"]);
    for (let airObject of airSegmentArray) {
        if(airObject.type == "Air"){
            let isticketless = airObject.ticket.isTicketless;
            finalResp.push( `For segment ${airObject.segmentNumber}, Your ticket type is ${isticketless}`)
    }}
    console.log("This is finalResp",finalResp)
    return finalResp
}



module.exports = {tripResponse};
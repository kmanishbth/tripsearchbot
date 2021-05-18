// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const { LuisRecognizer } = require('botbuilder-ai');
const { ComponentDialog, DialogSet, DialogTurnStatus, TextPrompt, WaterfallDialog,ChoicePrompt } = require('botbuilder-dialogs');
const {tripSearchApiCall} = require('../request/tripSearchApi')
const {tripResponse} = require('../response/tripSearchResponse')
const apiResponse = require('../apiresponse.json')
const MAIN_WATERFALL_DIALOG = 'mainWaterfallDialog';

class TripSearchDialog extends ComponentDialog {
    constructor(luisRecognizer) {
        super('TripSearchDialog');

        if (!luisRecognizer) throw new Error('[TripSearchDialog]: Missing parameter \'luisRecognizer\' is required');
        this.luisRecognizer = luisRecognizer;
        
        // Define the main dialog and its related components.
        // This is a sample "book a flight" dialog.
        this.addDialog(new TextPrompt('TextPrompt'));
        this.addDialog(new ChoicePrompt('cardPrompt'));           
        this.addDialog(new WaterfallDialog(MAIN_WATERFALL_DIALOG, [
                this.LuisConnect.bind(this),
                this.callTripApi.bind(this),
                this.buildResponse.bind(this)
                // this.responseAction.bind(this)
            ]));

        this.initialDialogId = MAIN_WATERFALL_DIALOG;
    }

    /**
     * The run method handles the incoming activity (in the form of a TurnContext) and passes it through the dialog system.
     * If no dialog is active, it will start the default dialog.
     * @param {*} turnContext
     * @param {*} accessor
     */
    async run(turnContext, accessor) {
        const dialogSet = new DialogSet(accessor); 
        dialogSet.add(this);

        const dialogContext = await dialogSet.createContext(turnContext);
        const results = await dialogContext.continueDialog();
        if (results.status === DialogTurnStatus.empty) {
            await dialogContext.beginDialog(this.id);
        }
    }

    
    async LuisConnect(stepContext) {
        console.log("Inside LuisConnect Function")

        // Call LUIS and gather any potential booking details. (Note the TurnContext has the response to the prompt)
        const luisResult = await this.luisRecognizer.executeLuisQuery(stepContext.context);
        stepContext.values.userIntent = LuisRecognizer.topIntent(luisResult)
        console.log(LuisRecognizer.topIntent(luisResult))
        return await stepContext.next();
    }

    async callTripApi(stepContext){
        console.log("Inside call Trip API")
        return await stepContext.next();

    }

    async buildResponse(stepContext){
        var apiResp = await tripSearchApiCall();
        console.log("Tripsearchdialog inside buildresponse", apiResp)
        if(stepContext.values.userIntent == "SEARCH_Agent"){
            var response = await tripResponse(stepContext.values.userIntent,apiResp)
            console.log('Now on choice step');
            const options = {
            prompt: response,
            retryPrompt: 'That was not a valid choice, please select an option.',
            choices: this.getChoices()
            };
            return await stepContext.prompt('cardPrompt', options);
        }
        else {
        var response = await tripResponse(stepContext.values.userIntent,apiResp)
        console.log("In buildresponse ",response)
        return await stepContext.context.sendActivity(`${response}.`);
        }
        
    }

    getChoices() {
        const cardOptions = [
            {
                value: 'Yes',
                synonyms: ['yes']
            },
            {
                value: 'No',
                synonyms: ['no']
            }
        ];

        return cardOptions;
    }

}

module.exports.TripSearchDialog = TripSearchDialog;

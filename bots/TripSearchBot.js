// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const { TurnContext, BotStatePropertyAccessor, ActivityHandler, UserState } = require('botbuilder');
// The accessor names for the conversation data and user profile state property accessors.
const CONVERSATION_DATA_PROPERTY = 'conversationData';
const USER_PROFILE_PROPERTY = 'userProfile';

class TripSearchBot extends ActivityHandler {
    // private userProfile: BotStatePropertyAccessor;
    // private userState : UserState
    /**
     *
     * @param {ConversationState} conversationState
     * @param {UserState} userState
     * @param {Dialog} dialog
     */
    constructor(conversationState, userState, dialog) {
        super(conversationState, userState, dialog);
        // Create the state property accessors for the conversation data and user profile.
        this.conversationDataAccessor = conversationState.createProperty(CONVERSATION_DATA_PROPERTY);
        this.userProfileAccessor = userState.createProperty(USER_PROFILE_PROPERTY);

        if (!conversationState) throw new Error('[TripSearchBot]: Missing parameter. conversationState is required');
        if (!userState) throw new Error('[TripSearchBot]: Missing parameter. userState is required');
        if (!dialog) throw new Error('[TripSearchBot]: Missing parameter. dialog is required');

        this.conversationState = conversationState;
        this.userState = userState;
        this.dialog = dialog;
        this.dialogState = this.conversationState.createProperty('DialogState');

        

        this.onMessage(async (context, next) => {
            console.log('Running dialog with Message Activity.');
            const userProfile = await this.userProfileAccessor.get(context, {});
            // await this.userProfile.set(context, userProfile);
            const conversationData = await this.conversationDataAccessor.get(
                context, { promptedForUserName: false });

            if (!userProfile.name) {
                // First time around this is undefined, so we will prompt user for name.
                if (conversationData.promptedForUserName) {
                    // Set the name to what the user provided.
                    userProfile.name = context.activity.text;

                    // Acknowledge that we got their name.
                    await context.sendActivity(`Thanks ${ userProfile.name }. What do you want to search?`);

                    // Reset the flag to allow the bot to go though the cycle again.
                    conversationData.promptedForUserName = false;
                } else {
                    // Prompt the user for their name.
                    await context.sendActivity('What is your name?');

                    // Set the flag to true, so we don't prompt in the next turn.
                    conversationData.promptedForUserName = true;
                }
            } else {
                // Add message details to the conversation data.
                // conversationData.timestamp = context.activity.timestamp.toLocaleString();
                // conversationData.channelId = context.activity.channelId;

                // Display state data.
                await context.sendActivity(`${ userProfile.name } searched for: ${ context.activity.text }`);
                // await context.sendActivity(`Message received at: ${ conversationData.timestamp }`);
                // await context.sendActivity(`Message received from: ${ conversationData.channelId }`);
                await this.dialog.run(context, this.dialogState);
            }
            // Run the Dialog with the new message Activity.
            // await this.dialog.run(context, this.dialogState);

            // By calling next() you ensure that the next BotHandler is run.
            await next();
        });



        this.onMembersAdded(async (context, next) => {
            const membersAdded = context.activity.membersAdded;
            for (let cnt = 0; cnt < membersAdded.length; cnt++) {
                if (membersAdded[cnt].id !== context.activity.recipient.id) {
                    // const welcomeCard = CardFactory.adaptiveCard(WelcomeCard);
                    await context.sendActivity("Hello . This is Tripsearch Bot");
                }
            }

            // By calling next() you ensure that the next BotHandler is run.
            await next();
        });




    }

    /**
     * Override the ActivityHandler.run() method to save state changes after the bot logic completes.
     */
    async run(context) {
        await super.run(context);

        // Save any state changes. The load happened during the execution of the Dialog.
        await this.conversationState.saveChanges(context, false);
        await this.userState.saveChanges(context, false);
    }
}

module.exports.TripSearchBot = TripSearchBot;

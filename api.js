module.exports = [
    {
        description:		'Add custom bot',
        method: 		'PUT',
        path:			'/addbot/',
        fn: function( callback, args ){
            
           Homey.log('Adding bot...');
           
           var http = require('http.min');
           
           http('https://api.telegram.org/bot' + args.body.bot_token + '/setWebhook?url=https://webhooks.athom.com/webhook/' + Homey.env.CLIENT_ID).then(function (result) {
			  	Homey.log('Code: ' + result.response.statusCode)
			  	Homey.log('Response: ' + result.data)
			  	
			  	if (result.response.statusCode == 200) {
				  	callback ('Finished!', true);
			  	} else {
				  	callback ('Error ' + result.response.statusCode + ': ' + result.data, false);
			  	}
			});
           			
        }
    },
    {
        description:		'Delete custom bot settings',
        method: 		'PUT',
        path:			'/deletebot/',
        fn: function( callback, args ){
            
           Homey.log('Deleting custom bot settings...');
           
           var http = require('http.min');
           
           Homey.log('calling: https://api.telegram.org/bot' + Homey.manager('settings').get('bot_token') + '/setWebhook?url=');
           
           http('https://api.telegram.org/bot' + Homey.manager('settings').get('bot_token') + '/setWebhook?url=').then(function (result) {
	           
	           Homey.manager('settings').set('bot_token', '');
	           Homey.manager('settings').set('chat_id', '');
	           
	           Homey.log('Code: ' + result.response.statusCode)
			  	Homey.log('Response: ' + result.data)
	           
	           callback ('Finished', true);
                      			
        	});
        }
    }
]
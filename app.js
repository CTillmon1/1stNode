const https = require('https');
//Problem: We need a simple way to look at a user's badge count and Javascript points. 
//Solution: Use node js to connect to Treehouses API to get information to print out.

function printMessage(userName, badgeCount, points) {
	const message = `${userName} has ${badgeCount} total badges and ${points} total JavaScript points`; 
	console.log(message);
}
function getProfile(username){
	//connect to api url (https://www.teamtreehouse.com/username.json)
	const request = https.get(`https://teamtreehouse.com/${username}.json`, (response) => {
		let body = ""; 
		//read the data 
		//Parse data
		response.on('data', data => {
			body += data.toString(); 
		});
		//Print data
		response.on('end', () => {
			const profile = JSON.parse(body);
			printMessage(username, profile.badges.length, profile.points.JavaScript);
		});
	
	});
}

const users = process.argv.slice(2);
users.forEach(username => {
	getProfile(username);
});
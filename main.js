const SESSION_KEY = 'twitch_session_token';

const TwitchJS = window.TwitchJS;

var client = null;

var tjsOptions = {
  options: {
    // Debugging information will be outputted to the console.
    debug: false
  },
  connection: {
    reconnect: true,
    secure: true
  },
  // If you want to connect as a certain user, provide an identity here:
  // identity: {
  //   username: 'Schmoopiie',
  //   password: 'oauth:a29b68aede41e25179a66c5978b21437',
  // },
  channels: []
}
var Data = {
	Channel: null,
	Votes: [],
	Watching: false,
};

const Config = {
	ClientId: "4v9c64kznza6sje7bpb7xnizm628ww",
	RedirectUrl: "http://localhost/gbstest/oauth_redirect.html",
	Scope: "chat_login",
};

function setToken(token) {	
	window.sessionStorage.setItem(SESSION_KEY, token);
}

function getToken() {
	return window.sessionStorage.getItem(SESSION_KEY);
}

function setChannel(name) {
	Data.Channel = name;
}

function getChannel() {
	return Data.Channel;
}

$(document).ready(()=> {
	
	$("#seeVotes").hide();
	
	getChampionList().forEach((champion, i)=>{
		Data.Votes[i] = [champion, 0];
	});


	$("#submitButton").click((e) => {
		e.preventDefault();
		
		setChannel($("#cid").val());
		if(getChannel() != "") {
			$("#requestForm").hide();
			
			/*
			if(getToken() == null){
				window.open(`https://id.twitch.tv/oauth2/authorize?client_id=${Config.ClientId}&redirect_uri=${Config.RedirectUrl}&response_type=token&scope=${Config.Scope}`,
				"",
				"titlebar=no,statusbar=no,width=320,height=240");
				$("#content").append("<p id='wlabel'>Waiting authorization...</p>");
			}else{
				
			}
			*/
			
			main();
				
		};
	});	
	
	setInterval(render, 1000);
	
	client = new TwitchJS.client(tjsOptions);
	
	client.on('message', (channel, userstate, message, self)=>{
		var champ = getChampion(message);
		if(champ != null){
			console.log(champ);
			addVote(champ);
		}
	});
});

function addVote(champion) {
	Data.Votes.forEach((v, i)=> {
		if(v[0] == champion){
			Data.Votes[i][1]++;
		}
	});		

	Data.Votes.sort((a, b)=>{
		return a[1]-b[1];
	});			

}

function resetVotes() {
	Data.Votes.forEach((v, i)=> {
		Data.Votes[i][1] = 0;
	});	
}

function main() {		
	$("#seeVotes").show();
	$("#wlabel").remove();

	tjsOptions.channels.push(`#${getChannel()}`);	
	client.connect();	
/*	
	TAPIC.setup(getToken(), (username)=>{
		TAPIC.joinChannel(getChannel());
	});
	
	
	TAPIC.listen('message', (e) => {
		var champ = getChampion(e.text);
		if(champ != null){
			addVote(champ);
		}
	});
*/
	Data.Watching = true;
};

function render() {
	
	if(Data.Watching){
		let votesT = document.getElementById("votesTable");
		
		votesT.innerHTML = "";
		
		Data.Votes.forEach((v, i)=> {
			if(v[1] > 0){
				
				let row = votesT.insertRow(0);
				let cell2 = row.insertCell(0);
				let cell1 = row.insertCell(0);
				
				
				let imgUrl = getChampionImageURL(v[0]);
				
				let img = document.createElement('img');
				img.width = 32;
				img.height = 32;
				img.src = imgUrl;
				
				cell1.appendChild(img);
				
				cell2.innerHTML = v[1];
				
			}
		});		
	}
};

function changeStreamer() {
	$("#seeVotes").hide();
	$("#requestForm").show();
	
	Data.Watching = false;
	
	client.disconnect();
};

const TwitchJS = window.TwitchJS;

var client = null;

var tjsOptions = {
  options: {
	clientId: 'lfdbify51yccofif9tc8hxqtjqz6sv',
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
	Votes: [],
	Watching: false,
};

$(document).ready(()=> {
		
	getChampionList().forEach((champion, i)=>{
		Data.Votes[i] = [champion, 0];
	});


	$("#submitButton").click((e) => {
		e.preventDefault();
		
		let cid = $("#cid").val();
		if(cid != "") {
			tjsOptions.channels.push(cid);
			$("#requestForm").hide();
		
				$("#seeVotes").show();
				$("#wlabel").remove();
				client.connect();	
				client.on('connected', main);
				
		};
	});	
	
	setInterval(render, 1000);
	
	client = new TwitchJS.client(tjsOptions);
	
	client.on('message', (channel, userstate, message, self)=>{
		var champ = getChampion(message);
		if(champ != null){
			addVote(champ);
		}
	});
	
	let channel = findGetParameter("channel")
	if(channel != null){
		$("#cid").val(channel);
		$("#submitButton").click();
	};
});

function getChannel() {
	return tjsOptions.channels[0];
}

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
	render();
}

function main(address, port) {		
	

	let link = document.createElement("a");
	
	let name = getChannel();
	
	link.text = "twitch.tv/" + name;
	link.href = "//" + link.text;
	
	$("#twitchLink").empty();
	$("#twitchLink").append(link);

	$.get( `https://api.twitch.tv/kraken/channels/${name}?client_id=lfdbify51yccofif9tc8hxqtjqz6sv`, function( data ) {
		$("#twitchLogo").attr("src", data.logo);
	});
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
	tjsOptions.channels = [];
	resetVotes();
};

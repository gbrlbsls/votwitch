function findGetParameter(parameterName) {
    var result = null,
        tmp = [];
    location.search
        .substr(1)
        .split("&")
        .forEach(function (item) {
          tmp = item.split("=");
          if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        });
    return result;
}

function getChampion(message) {
	var c = null;
	var res = message.toLowerCase();
	
	res = res.replace(/ |-|'|"/g, '');
	
	getChampionList().forEach((item, index)=>{
		if(item.toLowerCase() == res){
			c = item;
		}
	});
	
	return c;
}

function getChampionImageURL(championName) {
	return "http://ddragon.leagueoflegends.com/cdn/8.12.1/img/champion/" + championName + ".png";
}


function getChampionList() {
	return ["Annie", "Olaf", "Galio", "TwistedFate", "XinZhao", "Urgot", "Leblanc", "Vladimir", "Fiddlesticks", "Kayle", "MasterYi", "Alistar", "Ryze", "Sion", "Sivir", "Soraka", "Teemo", "Tristana", "Warwick", "Nunu", "MissFortune", "Ashe", "Tryndamere", "Jax", "Morgana", "Zilean", "Singed", "Evelynn", "Twitch", "Karthus", "Chogath", "Amumu", "Rammus", "Anivia", "Shaco", "DrMundo", "Sona", "Kassadin", "Irelia", "Janna", "Gangplank", "Corki", "Karma", "Taric", "Veigar", "Trundle", "Swain", "Caitlyn", "Blitzcrank", "Malphite", "Katarina", "Nocturne", "Maokai", "Renekton", "JarvanIV", "Elise", "Orianna", "MonkeyKing", "Brand", "LeeSin", "Vayne", "Rumble", "Cassiopeia", "Skarner", "Heimerdinger", "Nasus", "Nidalee", "Udyr", "Poppy", "Gragas", "Pantheon", "Ezreal", "Mordekaiser", "Yorick", "Akali", "Kennen", "Garen", "Leona", "Malzahar", "Talon", "Riven", "KogMaw", "Shen", "Lux", "Xerath", "Shyvana", "Ahri", "Graves", "Fizz", "Volibear", "Rengar", "Varus", "Nautilus", "Viktor", "Sejuani", "Fiora", "Ziggs", "Lulu", "Draven", "Hecarim", "Khazix", "Darius", "Jayce", "Lissandra", "Diana", "Quinn", "Syndra", "AurelionSol", "Kayn", "Zoe", "Zyra", "Kaisa", "Gnar", "Zac", "Yasuo", "Velkoz", "Taliyah", "Camille", "Braum", "Jhin", "Kindred", "Jinx", "TahmKench", "Lucian", "Zed", "Kled", "Ekko", "Vi", "Aatrox", "Nami", "Azir", "Thresh", "Illaoi", "RekSai", "Ivern", "Kalista", "Bard", "Rakan", "Xayah", "Ornn", "Pyke"];
}

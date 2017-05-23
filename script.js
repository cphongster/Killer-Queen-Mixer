var playerList=["A","B","C","D","E","F","G","H","I","J"];
var playerPool=["A","B","C","D","E","F","G","H","I","J"];
var queenPool=["A","A","A","B","B","B","C","D"];
var queenList=["A","A","A","B","B","B","C","D"];
var setList=[];
var matches=false;
var formSheet=true;
var currentSetPlayers=[];

var pos1List=["Queen","Queen","Speed Warrior","Speed Warrior","Speed Warrior","Speed Warrior","Flex/Vanilla Warrior","Flex/Vanilla Warrior","Flex/Vanilla Warrior","Flex/Vanilla Warrior"];
var pos2List=["Speed Warrior","Flex/Vanilla Warrior","Queen","Objective Runner","Objective Runner","Flex/Vanilla Warrior","Speed Warrior","Objective Runner","Any","Any"];

function player(id,name,queenPref,pos1,pos2){
	this.id=id;
	this.name=name;
	this.queenPref=queenPref;
	this.pos1=pos1;
	this.pos2=pos2;
}

function addPlayer(){
	//GET FORM VAL;
	var name= $("#playerName").val();
	var queenPref=($("#queenPick").val()).toString();
	var pos1=($("#position1").val()).toString();
	var pos2=($("#position2").val()).toString();

	//ASSIGN ID AND ADD TO PLAYER LIST, POOL AND/OR QUEEN POOL
	//var id=Math.floor(Math.random()*(999-100))+100;
	//
	//console.log('id:',id);
	//playerList.push(new player(id,name,queenPref,pos1,pos2));

	//POPULATE DATA LISTS
	playerList.push(name);
	playerPool.push(name,name);
	pos1List.push(pos1);
	pos2List.push(pos2);
	
	//POPULATE QUEEN LISTS
	if (queenPref=="Most of the Time"){
		queenPool.push(name,name,name);
		queenList.push(name,name,name);
	}
	else if (queenPref =="Sometimes/Can Queen"){
		queenPool.push(name);
		queenList.push(name);
	}
	
	//ADD TO BEE LIST
	$('#beeList').append($('<div/>').addClass('playerTag').text(name));

	console.log('playerList:',playerList);
	console.log('playerPool:',playerPool);
	$("form")[0].reset();
}



function setup(){
	$("form").on("submit",function(event){
		event.preventDefault();
		addPlayer();
	});
	$("#formStartButton").click(function(){
		console.log('Starting games');
		pick10Players();
		runningState();
	})
	
}

function pick10Players(){
	if(playerPool.length<15 || playerPool<playerList.length){
		playerPool=playerPool.concat(playerList);
	}
	if(queenPool.length<4){
		queenPool=queenPool.concat(queenList);
	}
	pickedQueens=pick2Queens();
	console.log('pickedQueens:',pickedQueens);
	currentSetPlayers=pick8Players(pickedQueens);
	console.log('Final Ten:', currentSetPlayers);
}
function pick2Queens(){
	var queenPickBlueNum=Math.floor(Math.random()*(queenPool.length));
	var queenPickBlue=queenPool[queenPickBlueNum];
	console.log('Blue Queen:',queenPickBlueNum, queenPickBlue);
	
	var queenPickGoldNum=Math.floor(Math.random()*(queenPool.length));
	var queenPickGold=queenPool[queenPickGoldNum];
	console.log('Gold Queen:',queenPickGoldNum,queenPickGold);
	
	while(queenPickBlue == queenPickGold){
		var queenPickGoldNum=Math.floor(Math.random()*(queenPool.length));
		var queenPickGold=queenPool[queenPickGoldNum];
		console.log('New Gold Queen:',queenPickGoldNum,queenPickGold);
	};

	var q=[queenPickBlue,queenPickGold]
	queenPool.splice(queenPickBlueNum,1);
	queenPool.splice(queenPickGoldNum,1);
	// $("#currentBlueTeam").append($('<div/>').addClass("playerTag") .text(queenPickBlue));
	// $("#currentGoldTeam").append($('<div/>').addClass("playerTag") .text(queenPickGold));
	//$("#currentGoldTeam > .currentPickedQueen"
	return (q);
	
}

function pick8Players(queens){
	var pickedPlayers=queens;
	for(i=0;i<8;i++){
		//Pick an ID, if the ID is in the array, pick another one
		var randIDNum=Math.floor(Math.random()*(playerPool.length));
		var randID=playerPool[randIDNum];
		console.log('Picked ID:',randID);
		while (pickedPlayers.indexOf(randID) != -1){
			randIDNum=Math.floor(Math.random()*(playerPool.length));
			randID=playerPool[randIDNum];
			console.log('New ID:',randID);
		};
		pickedPlayers.push(randID);
		playerPool.splice(randIDNum,1);
		console.log('Picked Players:',pickedPlayers);
		// $('#currentPickedPlayers').append($('<div/>').addClass('playerTag').text(randID));
	}

	//index of picked players on global player list 
	var pickedPlayersIndex=[];
	for(i=2;i<10;i++){
		var x=playerList.indexOf(pickedPlayers[i]);
		pickedPlayersIndex.push(x);
	}
	var speed1=false;
	var speed2=false;
	var flex1=false;
	var flex2=false;
	var flex3=false;
	var flex4=false;
	
	$("#currentBlueTeam").append($('<div/>').addClass("playerTag") .text(pickedPlayers[0]));
	$("#currentGoldTeam").append($('<div/>').addClass("playerTag") .text(pickedPlayers[1]));

	var stage1Left=[];
	//get the pos1 for each of
	for (i=0;i<8;i++){
		// x = pos1 str pref based on index 
		var indexx=pickedPlayersIndex[i];
		var x=pos1List[indexx];
		if (speed1 == false){
			if (x=='Speed Warrior'){
				//remove from array, add to blue
				speed1=true
				$("#currentBlueTeam").append($('<div/>').addClass("playerTag") .text(playerList[indexx]));
				continue;
			}
		} 
		if(speed2 == false){
			if(x=='Speed Warrior'){
				speed2=true;
				$("#currentGoldTeam").append($('<div/>').addClass("playerTag") .text(playerList[indexx]));
				continue;
			}
		}
		if(flex1 == false){
			if (x=='Flex/Vanilla Warrior'){
				flex1=true;
				$("#currentBlueTeam").append($('<div/>').addClass("playerTag") .text(playerList[indexx]));
				continue;
			}
		}
		if(flex2 == false){
			if (x=='Flex/Vanilla Warrior'){
				flex2=true;
				$("#currentBlueTeam").append($('<div/>').addClass("playerTag") .text(playerList[indexx]));
				continue;
			}
		}
		if(flex3 == false){
				if (x=='Flex/Vanilla Warrior'){
				flex3=true;
				$("#currentGoldTeam").append($('<div/>').addClass("playerTag") .text(playerList[indexx]));
				continue;
			}
		}
		if(flex4 == false){
			if (x=='Flex/Vanilla Warrior'){
				flex4=true
				$("#currentGoldTeam").append($('<div/>').addClass("playerTag") .text(playerList[indexx]));
				continue;
			}
		}
		stage1Left.push(pickedPlayersIndex[i]);
	}

	//STAGE 2 if some are false, check for pos2 
	if(speed1==true&&speed2==true&&flex1==true&&flex2==true&&flex3==true&&flex4==true){
		$("#currentBlueTeam").append($('<div/>').addClass("playerTag") .text(playerList[stage1Left[0]]));
		$("#currentGoldTeam").append($('<div/>').addClass("playerTag") .text(playerList[stage1Left[1]]));
		return (pickedPlayers);
	}else{
		//check if pos are fillable by pos2
		var stage2Left=[];
		for (i=0;i<stage1Left.length;i++){
			var y=pos2List[stage1Left[i]];
			if (speed1 == false){
				if (y=='Speed Warrior'){
				//remove from array, add to blue
				speed1=true
				$("#currentBlueTeam").append($('<div/>').addClass("playerTag") .text(playerList[indexx]));
				continue;
				}
			} 
			if(speed2 == false){
				if(x=='Speed Warrior'){
				speed2=true;
				$("#currentGoldTeam").append($('<div/>').addClass("playerTag") .text(playerList[indexx]));
				continue;
				}
			}
			if(flex1 == false){
				if (x=='Flex/Vanilla Warrior'){
				flex1=true;
				$("#currentBlueTeam").append($('<div/>').addClass("playerTag") .text(playerList[indexx]));
				continue;
				}
			}
			if(flex2 == false){
				if (x=='Flex/Vanilla Warrior'){
				flex2=true;
				$("#currentBlueTeam").append($('<div/>').addClass("playerTag") .text(playerList[indexx]));
				continue;
				}
			}
			if(flex3 == false){
				if (x=='Flex/Vanilla Warrior'){
				flex3=true;
				$("#currentGoldTeam").append($('<div/>').addClass("playerTag") .text(playerList[indexx]));
				continue;
				}
			}
			if(flex4 == false){
				if (x=='Flex/Vanilla Warrior'){
				flex4=true
				$("#currentGoldTeam").append($('<div/>').addClass("playerTag") .text(playerList[indexx]));
				continue;
				}
			}
			stage2Left.push(stage1Left[i]);
		}
	}

	//STAGE 3 ---- if array is less than half the length of the player list, dont switch
	//otherwise rotate through the list to check if someone w/ pos1 wants position 
	if(speed1==true&&speed2==true&&flex1==true&&flex2==true&&flex3==true&&flex4==true){
		$("#currentBlueTeam").append($('<div/>').addClass("playerTag") .text(playerList[stage2Left[0]]));
		$("#currentGoldTeam").append($('<div/>').addClass("playerTag") .text(playerList[stage2Left[1]]));
		return(pickedPlayers);
	}
	else{
		// if (playerPool<(playerList.length/2)){
			for(i=0;i<stage2Left.length;i++){
				if(speed1==false){
					$("#currentBlueTeam").append($('<div/>').addClass("playerTag") .text(playerList[stage2Left[i]]));
					continue;
				}
				if(speed2==false){
					$("#currentGoldTeam").append($('<div/>').addClass("playerTag") .text(playerList[stage2Left[i]]));
					continue;
				}
				if(flex1==false){
					$("#currentBlueTeam").append($('<div/>').addClass("playerTag") .text(playerList[stage2Left[i]]));
					continue;
				}
				if(flex2==false){
					$("#currentBlueTeam").append($('<div/>').addClass("playerTag") .text(playerList[stage2Left[i]]));
					continue;
				}
				if(flex3==false){
					$("#currentGoldTeam").append($('<div/>').addClass("playerTag") .text(playerList[stage2Left[i]]));
					continue;
				}
				if(flex4==false){
					$("#currentGoldTeam").append($('<div/>').addClass("playerTag") .text(playerList[stage2Left[i]]));
					continue;
				}
			}
			$("#currentBlueTeam").append($('<div/>').addClass("playerTag") .text(playerList[stage2Left[0]]));
			$("#currentGoldTeam").append($('<div/>').addClass("playerTag") .text(playerList[stage2Left[1]]));
			return(pickedPlayers)
		// }
		// else{
		// 	var doNotPick=pickedPlayers;
		// 	//TAKING OUT THE ONES THAT DON'T FIT POSITIONS 
		// 	for (i=0;i<stage2Left.length;i++){
		// 		//z= the index of leftovers on the pickedPlayers list
		// 		var z=pickedPlayers.indexOf(playerList[stage2Left[i]])
		// 		pickedPlayers.splice(z,1);
		// 	}
		// 	var stage3=[]
		// 	for (i=0;i<playerPool;i++){
		// 		var t=playerList.indexOf(playerPool[i])
		// 		var s=pos1List[t];

		// 		if (speed1 == false){
		// 			if (s=='Speed Warrior'){
		// 			$("#currentBlueTeam").append($('<div/>').addClass("playerTag") .text(playerList[indexx]));
		// 			continue;
		// 			}
		// 		} 
		// 		if(speed2 == false){
		// 			if(s=='Speed Warrior'){
		// 			$("#currentGoldTeam").append($('<div/>').addClass("playerTag") .text(playerList[indexx]));
		// 			continue;
		// 			}
		// 		}
		// 		if(flex1 == false){
		// 			if (s=='Flex/Vanilla Warrior'){
		// 			$("#currentBlueTeam").append($('<div/>').addClass("playerTag") .text(playerList[indexx]));
		// 			continue;
		// 			}
		// 		}
		// 		if(flex2 == false){
		// 			if (s=='Flex/Vanilla Warrior'){
		// 			$("#currentBlueTeam").append($('<div/>').addClass("playerTag") .text(playerList[indexx]));
		// 			continue;
		// 			}
		// 		}
		// 		if(flex3 == false){
		// 			if (s=='Flex/Vanilla Warrior'){
		// 			$("#currentGoldTeam").append($('<div/>').addClass("playerTag") .text(playerList[indexx]));
		// 			continue;
		// 			}
		// 		}
		// 		if(flex4 == false){
		// 			if (s=='Flex/Vanilla Warrior'){
		// 			$("#currentGoldTeam").append($('<div/>').addClass("playerTag") .text(playerList[indexx]));
		// 			continue;
		// 			}
		// 		}
		// 	}
		// }
		
	};

	// for(i=0;i<4;i++){
	// 	$('#currentBlueTeam').append($('<div/>').addClass('playerTag').text(pickedPlayers[i]));
	// }
	// for(i=4;i<8;i++){
	// 	$('#currentGoldTeam').append($('<div/>').addClass('playerTag').text(pickedPlayers[i]));
	// }
	
}

function runningState(){
	$(".textButtons").show();
	formSheet=false;
	$('#newPlayerForm').hide();
	matches=true;
	$('#sets').show();
	$('#formStartButton').hide();
	//$('#beeList > .playerTag').draggable({
		//make only droppable in certain area;
	//});
	$('#matchesButton').click(function(){
		if (matches) {
			return
		}
		else {
			matches=true;
			formSheet=false;
			$('#newPlayerForm').hide();
			$('#sets').show();
		}
	})
	$('#addPlayerButton').click(function(){
		if (formSheet){
			return
		}
		else{
			formSheet=true;
			matches=false;
			$('#sets').hide();
			$('#newPlayerForm').show();
		}
	})
	$('#nextSetButton').click(function(){
		setList.push(currentSetPlayers);
		//$("#current > .playerTag").remove();
		$('#currentBlueTeam').empty();
		$('#currentGoldTeam').empty();
		pick10Players();
	})

}


$(document).ready(function(){
	$('#sets').hide();
	$(".textButtons").hide();
	setup();
})
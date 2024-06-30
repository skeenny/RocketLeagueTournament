let request = new XMLHttpRequest();
request.open('GET', 'playoff.json', false);
request.send(null);
let teamsPositions = JSON.parse(request.responseText).teamsPositions;

const addTeamPosition = (positions) => {
	const matchups = document.querySelectorAll(".matchup")
	matchups.forEach((elem, i) => {
		elem.style.gridArea = positions[i][`team${i + 1}`];
	})
}

addTeamPosition(teamsPositions)
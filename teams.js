let activeTour = 6;
document.getElementById(`tourN-${activeTour}`).className = 'tour-button tour-active';
function getRankImage(rank) {
  const rankImages = [
    { threshold: 1864, image: 'assets/ranks_logos/ssl.webp' },
    { threshold: 1701, image: 'assets/ranks_logos/gc3.png' },
    { threshold: 1560, image: 'assets/ranks_logos/gc2.webp' },
    { threshold: 1421, image: 'assets/ranks_logos/gc1.webp' },
    { threshold: 1301, image: 'assets/ranks_logos/c3.webp' },
    { threshold: 1181, image: 'assets/ranks_logos/c2.webp' },
    { threshold: 1064, image: 'assets/ranks_logos/c1.webp' },
    { threshold: 983, image: 'assets/ranks_logos/d3.webp' },
    { threshold: 901, image: 'assets/ranks_logos/d2.webp' },
    { threshold: 827, image: 'assets/ranks_logos/d1.webp' },
    { threshold: 766, image: 'assets/ranks_logos/p3.webp' },
    { threshold: 706, image: 'assets/ranks_logos/p2.webp' },
    { threshold: 646, image: 'assets/ranks_logos/p1.webp' },
    { threshold: 591, image: 'assets/ranks_logos/g3.webp' },
    { threshold: 532, image: 'assets/ranks_logos/g2.webp' },
    { threshold: 472, image: 'assets/ranks_logos/g1.webp' },
    { threshold: 410, image: 'assets/ranks_logos/s3.webp' },
    { threshold: 353, image: 'assets/ranks_logos/s2.webp' },
    { threshold: 295, image: 'assets/ranks_logos/s1.webp' },
    { threshold: 233, image: 'assets/ranks_logos/b3.webp' },
  ];

  for (const rankImage of rankImages) {
    if (rank > rankImage.threshold) {
      return rankImage.image;
    }
  }
  return 'assets/ranks_logos/default_rank_image.webp'; // Default image if no conditions are met
}
function getTeams(groups) {
  const teams = [];
  groups.forEach((group) => {
    group.teams.forEach((team) => {
      teams.push({ name: team.name, logo: team.logo });
    });
  });
  return teams;
}
let groupsRequest = new XMLHttpRequest();
groupsRequest.open('GET', 'teams.json', false);
groupsRequest.send(null);
let groups = JSON.parse(groupsRequest.responseText).groups;

const teamsArray = getTeams(groups);

let toursRequest = new XMLHttpRequest();
toursRequest.open('GET', 'tours.json', false);
toursRequest.send(null);
let tours = JSON.parse(toursRequest.responseText).tours;

function matchesParse(matches) {
  matches.forEach((match) => {
    const team1Name = match.team1.name;
    const team2Name = match.team2.name;
    teamsArray.forEach((team) => {
      if (team.name === team1Name) {
        match.team1.logo = team.logo;
      } else if (team.name === team2Name) {
        match.team2.logo = team.logo;
      }
    });
  });
  return matches;
}

function getActiveTourMatches(tourNumber) {
  let matches;
  tours.forEach((tour) => {
    if (tour.tour == tourNumber) {
      matches = tour.matches;
    }
  });
  matches = matchesParse(matches);
  return matches;
}

matches = getActiveTourMatches(activeTour);

function sortTeamsByPoints(groups) {
  return groups.map((group) => {
    group.teams.sort((a, b) => b.points - a.points);
    return group;
  });
}

groups = sortTeamsByPoints(groups);

function renderGroupsList(groups) {
  const container = document.getElementById('groups-container');

  groups.forEach((group, index) => {
    const groupDiv = document.createElement('div');
    groupDiv.className = 'group';

    const groupHeaderContent = document.createElement('div');
    groupHeaderContent.className = 'group-header-content';

    const groupHeader = document.createElement('div');
    groupHeader.className = 'group-header';

    const groupHeaderText = document.createElement('span');
    groupHeaderText.className = 'group-header-text';
    groupHeaderText.textContent = group.name;

    groupHeaderContent.appendChild(groupHeader);
    groupHeaderContent.appendChild(groupHeaderText);
    groupDiv.appendChild(groupHeaderContent);

    const teamsList = document.createElement('div');
    teamsList.className = 'teams-list';

    group.teams.forEach((team, index) => {
      const teamDiv = document.createElement('div');
      teamDiv.className = 'team';

      const teamLeft = document.createElement('div');
      teamLeft.className = 'team-left';

      const teamLogo = document.createElement('div');
      teamLogo.className = 'team-logo';
      const teamLogoImg = document.createElement('img');
      teamLogoImg.src = team.logo;
      teamLogoImg.width = 68;
      teamLogoImg.height = 68;
      teamLogo.appendChild(teamLogoImg);

      const teamInfo = document.createElement('div');
      teamInfo.className = 'team-info';

      const teamName = document.createElement('span');
      teamName.className = 'team-name';
      teamName.textContent = team.name;
      if (team.group_winner) {
        teamName.className += ' leader';
      }
      const teamPlayers = document.createElement('div');
      teamPlayers.className = 'team-players';

      team.players.forEach((player, index) => {
        const teamPlayer = document.createElement('span');
        if (player.isCap) {
          teamPlayer.className = 'team-player leader';
        } else {
          teamPlayer.className = 'team-player';
        }

        const rankImage = document.createElement('img');
        rankImage.className = 'rank-image-teams';
        rankImage.src = getRankImage(player.rank);

        const playerName = document.createElement('span');
        playerName.className = 'team-player-name';
        if (player.isCap) {
          playerName.classList.add('iscap');
        }
        playerName.textContent = player.name;

        teamPlayer.appendChild(rankImage);
        teamPlayer.appendChild(playerName);
        teamPlayers.appendChild(teamPlayer);
      });

      teamInfo.appendChild(teamName);
      teamInfo.appendChild(teamPlayers);

      teamLeft.appendChild(teamLogo);
      teamLeft.appendChild(teamInfo);

      const teamRight = document.createElement('div');
      teamRight.className = 'team-right-top';
      const teamPoints = document.createElement('div');
      teamPoints.className = 'team-points';
      teamPoints.textContent = team.points;
      const isTop2 = index < 2;
      const teamIconCup = document.createElement('div');
      teamIconCup.className = 'team-icon-cup';
      if (team.group_winner) {
        teamIconCup.className += ' group-winner';
      }
      const teamIconCupImg = document.createElement('img');
      if (team.group_winner) {
        teamIconCupImg.className = 'gw_cup';
        teamIconCupImg.src = 'assets/cup3.svg';
      } else {
        teamIconCupImg.src = 'assets/cup2.svg';
      }
      teamIconCup.appendChild(teamIconCupImg);

      if (isTop2) {
        teamRight.appendChild(teamIconCup);
      }
      const teamRightContainer = document.createElement('div');
      teamRightContainer.className = 'team-right';
      const wrString = document.createElement('div');
      wrString.className = 'wr-string';
      const matches = team.matches.split(' ');

      matches.forEach((match) => {
        const el = document.createElement('span');
        const matchResult = match.length === 1 ? match : match[0];
        el.innerText = match;
        el.className = `result result_${matchResult}`;
        wrString.appendChild(el);
      });

      teamRightContainer.appendChild(teamRight);
      teamRightContainer.appendChild(wrString);

      teamRight.appendChild(teamPoints);
      teamDiv.appendChild(teamLeft);
      teamDiv.appendChild(teamRightContainer);

      teamsList.appendChild(teamDiv);
    });

    groupDiv.appendChild(teamsList);
    container.appendChild(groupDiv);
  });
}

function generateMatchHTML(match) {
  const container = document.getElementById('matches-list');
  const matchInfo = document.createElement('div');
  matchInfo.className = 'match-info';

  const teamMatchLeft = document.createElement('div');
  if (match.demo) {
    teamMatchLeft.className = `team_match ${match.team1.isWinner ? 'wl' : 'll'}`;
  } else {
    teamMatchLeft.className = `team_match not-played-l`;
  }

  const teamInfoLeft = document.createElement('div');
  teamInfoLeft.className = 'team_info';

  const teamLogoLeft = document.createElement('div');
  teamLogoLeft.className = 'team-logo';
  const teamLogoImgLeft = document.createElement('img');
  teamLogoImgLeft.className = 'match-team-logo';
  teamLogoImgLeft.src = match.team1.logo;
  teamLogoLeft.appendChild(teamLogoImgLeft);

  const teamNameLeft = document.createElement('span');
  teamNameLeft.className = 'team_name';
  teamNameLeft.textContent = match.team1.name;

  teamInfoLeft.appendChild(teamLogoLeft);
  teamInfoLeft.appendChild(teamNameLeft);
  teamMatchLeft.appendChild(teamInfoLeft);

  const matchScoreLeft = document.createElement('span');
  matchScoreLeft.className = 'match_score';
  matchScoreLeft.textContent = match.team1.score;
  teamMatchLeft.appendChild(matchScoreLeft);

  // VS Block
  const vsBlock = document.createElement('div');
  vsBlock.className = 'vs_block';

  const vsText = document.createElement('div');
  vsText.className = 'vs';
  vsText.textContent = 'VS';

  const demoBlock = document.createElement('a');
  demoBlock.className = 'demo_block';
  demoBlock.href = match.demo;
  demoBlock.target = '_blank';
  const YTLogoImg = document.createElement('div');
  YTLogoImg.className = 'img-YT img-YT-demo';
  demoBlock.appendChild(YTLogoImg);
  vsBlock.appendChild(vsText);

  // Team 2
  const teamMatchRight = document.createElement('div');
  if (match.demo) {
    teamMatchRight.className = `team_match_right ${match.team2.isWinner ? 'wr' : 'lr'}`;
  } else {
    teamMatchRight.className = `team_match_right not-played-r`;
  }

  const teamInfoRight = document.createElement('div');
  teamInfoRight.className = 'team_info_right';

  const teamLogoRight = document.createElement('div');
  teamLogoRight.className = 'team-logo';
  const teamLogoImgRight = document.createElement('img');
  teamLogoImgRight.className = 'match-team-logo';
  teamLogoImgRight.src = match.team2.logo;
  teamLogoRight.appendChild(teamLogoImgRight);

  const teamNameRight = document.createElement('span');
  teamNameRight.className = 'team_name';
  teamNameRight.textContent = match.team2.name;

  teamInfoRight.appendChild(teamLogoRight);
  teamInfoRight.appendChild(teamNameRight);
  teamMatchRight.appendChild(teamInfoRight);

  const matchScoreRight = document.createElement('span');
  matchScoreRight.className = 'match_score';
  matchScoreRight.textContent = match.team2.score;
  teamMatchRight.appendChild(matchScoreRight);

  // Assemble match info
  matchInfo.appendChild(teamMatchLeft);
  matchInfo.appendChild(vsBlock);
  if (match.demo && match.demo !== 'DNF') {
    matchInfo.appendChild(demoBlock);
  }
  matchInfo.appendChild(teamMatchRight);
  container.appendChild(matchInfo);
}

document.addEventListener('DOMContentLoaded', () => {
  renderGroupsList(groups);
  matches.forEach((match) => {
    generateMatchHTML(match);
  });
});

document.getElementById('tour-tabs').addEventListener('click', (e) => {
  const isTourButton = e.target.id.split('-')[0] === 'tourN';
  if (isTourButton) {
    const tourNumber = e.target.id.split('-')[1];
    document.getElementById('matches-list').innerHTML = '';
    activeTour = tourNumber;
    document.getElementsByClassName('tour-active')[0].className = 'tour-button';
    e.target.className += ' tour-active';
    matches = getActiveTourMatches(activeTour);
    matches.forEach((match) => {
      generateMatchHTML(match);
    });
  }
});

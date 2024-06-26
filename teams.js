let groupsRequest = new XMLHttpRequest();
groupsRequest.open('GET', 'teams.json', false);
groupsRequest.send(null);
let groups = JSON.parse(groupsRequest.responseText).groups;

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
      teamRight.className = 'team-right';

      const teamPoints = document.createElement('div');
      teamPoints.className = 'team-points';
      teamPoints.textContent = team.points;
      const isTop2 = index < 2;
      const teamIconCup = document.createElement('div');
      teamIconCup.className = 'team-icon-cup';
      const teamIconCupImg = document.createElement('img');
      teamIconCupImg.src = 'assets/cup2.svg';
      teamIconCup.appendChild(teamIconCupImg);

      if (isTop2) {
        teamRight.appendChild(teamIconCup);
      }
      teamRight.appendChild(teamPoints);
      teamDiv.appendChild(teamLeft);
      teamDiv.appendChild(teamRight);

      teamsList.appendChild(teamDiv);
    });

    groupDiv.appendChild(teamsList);
    container.appendChild(groupDiv);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderGroupsList(groups);
});

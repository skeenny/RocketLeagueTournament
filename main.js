let request = new XMLHttpRequest();
request.open('GET', 'players.json', false);
request.send(null);
let players = JSON.parse(request.responseText).players;
players.sort((a, b) => b.rank - a.rank);
document.getElementById('players-count').textContent = players.length;
function getRankImage(rank) {
  if (rank > 1864) {
    return 'assets/ranks_logos/ssl.webp';
  } else if (rank > 1701) {
    return 'assets/ranks_logos/gc3.webp';
  } else if (rank > 1560) {
    return 'assets/ranks_logos/gc2.webp';
  } else if (rank > 1421) {
    return 'assets/ranks_logos/gc1.webp';
  } else if (rank > 1301) {
    return 'assets/ranks_logos/c3.webp';
  } else if (rank > 1181) {
    return 'assets/ranks_logos/c2.webp';
  } else if (rank > 1064) {
    return 'assets/ranks_logos/c1.webp';
  } else if (rank > 983) {
    return 'assets/ranks_logos/d3.webp';
  } else if (rank > 901) {
    return 'assets/ranks_logos/d2.webp';
  } else if (rank > 827) {
    return 'assets/ranks_logos/d1.webp';
  } else if (rank > 766) {
    return 'assets/ranks_logos/p3.webp';
  } else if (rank > 706) {
    return 'assets/ranks_logos/p2.webp';
  } else if (rank > 646) {
    return 'assets/ranks_logos/p1.webp';
  } else if (rank > 591) {
    return 'assets/ranks_logos/g3.webp';
  } else if (rank > 532) {
    return 'assets/ranks_logos/g2.webp';
  } else if (rank > 472) {
    return 'assets/ranks_logos/g1.webp';
  } else if (rank > 410) {
    return 'assets/ranks_logos/s3.webp';
  } else if (rank > 353) {
    return 'assets/ranks_logos/s2.webp';
  } else if (rank > 295) {
    return 'assets/ranks_logos/s1.webp';
  } else if (rank > 233) {
    return 'assets/ranks_logos/b3.webp';
  }
}

function generatePlayerHTML(player) {
  const playerDiv = document.createElement('div');
  playerDiv.className = 'player';
  const playerInfoImageBlock = document.createElement('div');
  playerInfoImageBlock.className = 'player-left';
  const rankImageWrapper = document.createElement('div');
  rankImageWrapper.className = 'rank-image-wrapper';
  const rankImage = document.createElement('img');
  rankImage.className = 'rank-image';
  rankImage.src = getRankImage(player.rank); // Replace with actual logic to determine the rank image
  rankImageWrapper.appendChild(rankImage);
  const playerInfoDiv = document.createElement('div');
  playerInfoDiv.className = 'player-info';

  const playerName = document.createElement('span');
  playerName.className = 'player-name';
  playerName.textContent = player.name;

  const playerRank = document.createElement('span');
  playerRank.className = 'player-rank';
  playerRank.innerHTML = `<span class="not-skewed">MMR: ${player.rank}</span>`;

  playerInfoDiv.appendChild(playerName);
  playerInfoDiv.appendChild(playerRank);

  const linksDiv = document.createElement('div');
  linksDiv.className = 'links';

  const linksListDiv = document.createElement('div');
  linksListDiv.className = 'links-list';

  if (player.twitch) {
    const twitchLink = document.createElement('a');
    twitchLink.target = '_blank';
    const twitchLogoImg = document.createElement('div');
    twitchLogoImg.className = 'img-twitch';
    twitchLink.href = player.twitch;
    twitchLink.appendChild(twitchLogoImg);
    linksListDiv.appendChild(twitchLink);
  }

  if (player.YT) {
    const profileLink = document.createElement('a');
    profileLink.target = '_blank';
    const YTLogoImg = document.createElement('div');
    YTLogoImg.className = 'img-YT';
    profileLink.href = player.YT;
    profileLink.appendChild(YTLogoImg);
    linksListDiv.appendChild(profileLink);
  }
  if (player.link) {
    const profileLink = document.createElement('a');
    profileLink.target = '_blank';
    const rlTrackerLogoImg = document.createElement('div');
    rlTrackerLogoImg.className = 'img-TRN';
    profileLink.href = player.link;
    profileLink.appendChild(rlTrackerLogoImg);
    linksListDiv.appendChild(profileLink);
  }
  linksDiv.appendChild(linksListDiv);

  playerInfoImageBlock.appendChild(rankImageWrapper);
  playerInfoImageBlock.appendChild(playerInfoDiv);
  playerDiv.appendChild(playerInfoImageBlock);
  playerDiv.appendChild(linksDiv);

  return playerDiv;
}

function renderPlayers(players) {
  const playersContainer = document.getElementById('players-list');
  players.forEach((player) => {
    const playerHTML = generatePlayerHTML(player);
    playersContainer.appendChild(playerHTML);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderPlayers(players);
});

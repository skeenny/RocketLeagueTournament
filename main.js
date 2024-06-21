let request = new XMLHttpRequest();
request.open('GET', 'players.json', false);
request.send(null);
let players = JSON.parse(request.responseText).players;
players.sort((a, b) => b.rank - a.rank);
document.getElementById('players-count').textContent = players.length;
function getRankImage(rank) {
  if (rank > 1864) {
    return '/assets/ranks_logos/ssl.webp';
  } else if (rank > 1707) {
    return '/assets/ranks_logos/gc3.webp';
  } else if (rank > 1575) {
    return '/assets/ranks_logos/gc2.webp';
  } else if (rank > 1435) {
    return '/assets/ranks_logos/gc1.webp';
  } else if (rank > 1315) {
    return '/assets/ranks_logos/c3.webp';
  } else if (rank > 1195) {
    return '/assets/ranks_logos/c2.webp';
  } else if (rank > 1075) {
    return '/assets/ranks_logos/c1.webp';
  } else if (rank > 995) {
    return '/assets/ranks_logos/d3.webp';
  } else if (rank > 915) {
    return '/assets/ranks_logos/d2.webp';
  } else if (rank > 835) {
    return '/assets/ranks_logos/d1.webp';
  } else if (rank > 775) {
    return '/assets/ranks_logos/p3.webp';
  } else if (rank > 715) {
    return '/assets/ranks_logos/p2.webp';
  } else if (rank > 655) {
    return '/assets/ranks_logos/p1.webp';
  } else if (rank > 595) {
    return '/assets/ranks_logos/g3.webp';
  } else if (rank > 535) {
    return '/assets/ranks_logos/g2.webp';
  } else if (rank > 475) {
    return '/assets/ranks_logos/g1.webp';
  } else if (rank > 415) {
    return '/assets/ranks_logos/s3.webp';
  } else if (rank > 355) {
    return '/assets/ranks_logos/s2.webp';
  } else if (rank > 286) {
    return '/assets/ranks_logos/s1.webp';
  } else if (rank > 233) {
    return '/assets/ranks_logos/b3.webp';
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

  const linksTitle = document.createElement('span');
  linksTitle.className = 'links-title';
  linksTitle.textContent = 'Посилання:';

  const linksListDiv = document.createElement('div');
  linksListDiv.className = 'links-list';

  if (player.twitch) {
    const twitchLink = document.createElement('a');
    twitchLink.target = '_blank';
    const twitchLogoImg = document.createElement('img');
    twitchLogoImg.className = 'twitch-link';
    twitchLogoImg.src = '/assets/twitch.svg';
    twitchLink.href = player.twitch;
    twitchLink.appendChild(twitchLogoImg);
    linksListDiv.appendChild(twitchLink);
  }

  if (player.link) {
    const profileLink = document.createElement('a');
    profileLink.target = '_blank';
    const rlTrackerLogoImg = document.createElement('img');
    rlTrackerLogoImg.className = 'rl-tracker';
    rlTrackerLogoImg.src = '/assets/tracker.svg';
    profileLink.href = player.link;
    profileLink.appendChild(rlTrackerLogoImg);
    linksListDiv.appendChild(profileLink);
  }

  linksDiv.appendChild(linksTitle);
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

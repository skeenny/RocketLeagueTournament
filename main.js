let request = new XMLHttpRequest();
request.open('GET', 'players.json', false);
request.send(null);
let players = JSON.parse(request.responseText).players;
players.sort((a, b) => b.rank - a.rank);
document.getElementById('players-count').textContent = players.length;
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
  playerRank.innerHTML = `<span class="not-skewed flex-center">MMR: ${player.rank} <div class="lock"></div></span>`;

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

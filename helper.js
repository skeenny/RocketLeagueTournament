// TODO: Add all pages
if (location.href.includes('teams')) {
  const menuItem1 = document.getElementById('img-teams');
  const menuItem2 = document.getElementById('img-teams-left');
  menuItem1.className = `${menuItem1.className} active`;
  menuItem2.className = `${menuItem2.className} active`;
} else if (location.href.includes('info')) {
  const menuItem1 = document.getElementById('img-info');
  const menuItem2 = document.getElementById('img-info-left');
  menuItem1.className = `${menuItem1.className} active`;
  menuItem2.className = `${menuItem2.className} active`;
} else if (location.href.includes('playoff')) {
  const menuItem1 = document.getElementById('img-cup');
  const menuItem2 = document.getElementById('img-cup-left');
  menuItem1.className = `${menuItem1.className} active`;
  menuItem2.className = `${menuItem2.className} active`;
} else {
  const menuItem1 = document.getElementById('img-squares');
  const menuItem2 = document.getElementById('img-squares-left');
  menuItem1.className = `${menuItem1.className} active`;
  menuItem2.className = `${menuItem2.className} active`;
}

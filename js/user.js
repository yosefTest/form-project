document.addEventListener('DOMContentLoaded', function () {
  const currentUser = localStorage.getItem('currentUser');
  if (!currentUser) {
    window.location.href = '../index.html';
  }

  const user = JSON.parse(localStorage.getItem(currentUser));

  document.getElementById('userEmail').textContent = user.email;
  document.getElementById(
    'userName'
  ).textContent = `${user.firstName} ${user.lastName}`;
  document.getElementById(
    'userDetails'
  ).textContent = `My favorite color is ${user.favoriteColor} and my favorite song is ${user.favoriteSong}`;

  document.getElementById('logoutBtn').addEventListener('click', function () {
    localStorage.removeItem('currentUser');
    window.location.href = '../index.html';
  });
});

if (window.location.pathname === "/") {
  document.getElementById("navbar-home").classList.add('active');
}
else {
  var titles = document.getElementsByClassName("navbar-left-title");

  for (var title of titles) {
    var titleName = title.id.split('-').slice(1).join('');
    if (window.location.pathname.slice(1).indexOf(titleName) === 0) title.classList.add('active');
  }
}
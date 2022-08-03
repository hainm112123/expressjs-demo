var url = window.location.pathname.slice(1);
var currentPage = document.querySelector('.navbar-page-name-' + url);
currentPage.classList.add('active');
currentPage.ariaCurrent="page";
const menuButton = document.getElementById('menu-button');
const menu = document.getElementById('dropdown-menu');
let isMenuOpen = false;

menuButton.addEventListener('click', () => {
    isMenuOpen = !isMenuOpen;
    menu.style.display = isMenuOpen ? 'block' : 'none';
    menuButton.setAttribute('aria-expanded', isMenuOpen);
});
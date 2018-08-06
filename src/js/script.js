import Navigation from './modules/navigation';
import Highlighter from './modules/highlighter';

const navigation = new Navigation();
const highlighter = new Highlighter();

// Navigation Toggle
let navToggle = document.getElementById('nav__toggle');
navToggle.onclick = navigation.toggleNavigation;

// Create navigation menu
navigation.createNavMenu();

// Highlight the words
highlighter.highlight();






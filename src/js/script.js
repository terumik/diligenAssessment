import Content from './modules/content';
import Navigation from './modules/navigation';
import Highlighter from './modules/highlighter';

const navigation = new Navigation();
const highlighter = new Highlighter();

// Create navigation menu
navigation.createNavMenu();

// 
highlighter.highlight();




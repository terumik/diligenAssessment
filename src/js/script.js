import Navigation from './modules/navigation';
import Highlighter from './modules/highlighter';
import LoginModal from './modules/login-modal';
import Login from './modules/login';
import User from './models/user';


const navigation = new Navigation();
const highlighter = new Highlighter();
const loginModal = new LoginModal();
const login = new Login();


// Modal Window
let loginClose = document.getElementById('login__close');
loginClose.onclick = loginModal.toggleModal;

// User Authentication
let loginButton = document.getElementById('login__button');
loginButton.onclick = ()=>{
    // wip: delete this
    let loginModal = new LoginModal();
    loginModal.toggleModal();

    // Get user inputs
    let email = document.getElementById('login__email');
    let password = document.getElementById('login__password');
    // wip: Validation
    let output = login.formValidation(email, password);
    
    if(output === true){
        // if validation success, make a post request
        let loginUser = new User(null, email.value, password.value);
        let isAuthorizedUser = login.userLogin(loginUser)
        .then((result)=>{
            console.log(result);
            
        }); 
        
        console.log(isAuthorizedUser);
        
        if(isAuthorizedUser){
            console.log('you are authorized');
            
        } else {
            console.log('you are NOT authorized');

        }

    } else{
        // wip
        console.log('invalid credential.');
    }

    return false;
}


// -- For Authorized Users

// Navigation Toggle
let navToggle = document.getElementById('nav__toggle');
navToggle.onclick = navigation.toggleNavigation;

// Create navigation menu
navigation.createNavMenu();

// Highlight the words
highlighter.highlight();

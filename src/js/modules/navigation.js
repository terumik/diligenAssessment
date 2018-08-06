import Content from './content'
import { log } from 'util';

class Navigation{

    createNavMenu(){
        getNumOfParagraphs()
        .then((numberOfPaages)=>{
            for (let i = 1;i <= numberOfPaages; i++) {
                createNavLink(i)
            }
        })
    }

    toggleNavigation(){
        let navigation = document.getElementById('nav__pages');
        let navigationStatus = navigation.getAttribute('class');

        let contents = document.getElementById('contents');
        let contentsStatus = contents.getAttribute('class');
        
        if(navigationStatus == 'nav__close'){
            navigation.classList.remove('nav__close');
            navigation.classList.add('nav__open');

            contents.classList.remove('contents--remove-margin');
            contents.classList.add('contents--add-margin');
        } else{
            navigation.classList.remove('nav__open');
            navigation.classList.add('nav__close');

            contents.classList.remove('contents--add-margin');
            contents.classList.add('contents--remove-margin');
        }
    }
}

export default Navigation;

// Private Methods

// 1. return Promise count
function getNumOfParagraphs(){
    return fetch('https://diligen-node.herokuapp.com/getNumOfParagraphs')
    .then(res=>res.json())
    .then(json=>json[0].count);
}

// 2. display navigation links
function createNavLink(index){
    let li = document.createElement('li');
    li.id = index;

    // set onclick event and pass the index of the paragraph
    li.onclick = activateLink;

    document.getElementById('nav__pages')
    .appendChild(li)
    .innerHTML =`Paragraph ${index}`;
}

// 3. activate the link and get a paragraph
function activateLink(e){
    // remove/add .active
    let activeLink = document.getElementsByClassName('active')[0] ? 
    document.getElementsByClassName('active')[0] : 
    null;

    if(activeLink){
        activeLink.removeAttribute('class');
    }
    e.target.setAttribute('class', 'active');

    // get the paragraph
    let content = new Content();
    content.getParagraphByIndex(e.target.id);

    // change the url in the address bar
    window.history.pushState("", "", e.target.id);
}
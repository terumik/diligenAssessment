import Content from './content'

class Navigation{

    createNavMenu(){
        getNumOfParagraphs()
        .then((numberOfPaages)=>{
            for (let i = 1;i <= numberOfPaages; i++) {
                createNavLink(i)
            }
        })
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
    let activeLink = document.getElementsByClassName('active')[0] ? 
    document.getElementsByClassName('active')[0] : 
    null;

    if(activeLink){
        activeLink.removeAttribute('class');
    }
    e.target.setAttribute('class', 'active');

    let content = new Content();
    content.getParagraphByIndex(e.target.id);
}
class Highlighter{

    highlight(){

        let paragraph = document.getElementById('body__paragraph--display');
    
        paragraph.addEventListener('click', function(){
            
            removeHighlight();
            let selectedText = getText();
            findWords(paragraph, selectedText);

        });
    }
}
export default Highlighter;

// Private Methods

// 1. Remove .highlight
function removeHighlight(){

    let highlighted = document.getElementsByClassName("highlight");
    if(highlighted.length !== 0){
        for (let i = highlighted.length-1; i >= 0; i--) {
            let textnode = document.createTextNode(highlighted[i].innerText);
            let oldspan = highlighted[i];
            highlighted[i].parentNode.replaceChild(textnode, oldspan);
        }
    }

}

// 2. find a highlighted text
function getText(){
    let wordSelected = window.getSelection().getRangeAt(0),
    span = document.createElement('span');

    span.className = 'highlight';                       
    span.appendChild(wordSelected.extractContents());

    wordSelected.insertNode(span);

    return wordSelected.commonAncestorContainer.lastElementChild.innerText;
}

// 3. find the same words and add .highlight
function findWords(paragraph, selectedText){
    let regex = new RegExp('('+ selectedText +')', 'ig');
    let sameWords = paragraph.textContent.replace(regex, '<span class="highlight">$1</span>');
    paragraph.innerHTML = sameWords;
}

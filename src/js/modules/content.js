class Content {
    

    createContent(){
        let getParagraph = this.getParagraphByIndex;
        
        fetch('https://diligen-node.herokuapp.com/getNumOfParagraphs')
        .then(res=>res.json())
        .then(json=>json[0].count)
        .then((count)=>{
            
            // 1. create navigation links based on the numbers of paragraphs
            for (let i = 1; i <= count; i++) {

                let li = document.createElement('li');
                document.getElementById('nav__pages')
                .appendChild(li)
                .innerHTML =`Paragraph ${i}`;

                // 2. set onclick event and pass the index of the paragraph
                li.onclick = ()=>{
                    let activeLink = document.getElementsByClassName('active')[0]?document.getElementsByClassName('active')[0]:null;
                    if(activeLink){
                        activeLink.removeAttribute('class')
                    }
                    
                    let displayParagraph = function(){
                        getParagraph(i);
                        li.setAttribute('class', 'active');
                    };
                    displayParagraph();
                };
            }
        });
    }

    getParagraphByIndex(index){

        fetch(`https://diligen-node.herokuapp.com/getParagraph/${index}`)
        .then(res=>{
            if (!res.ok) {
                document.getElementById('body__paragraph--display').innerHTML = 
                `
                <h2>404 Page Not Found</h2>
                <p>The link you followed probably broken, or the page has been removed.</p>
                `;
                throw Error(`${res.status}: ${res.statusText}`);
            }
            return res;
        })
        .then(res=>res.json())
        .then(json=>json[0].documents)
        .then((paragraph)=>{
            document.getElementById('body__paragraph--display').innerHTML = paragraph;
        })
        .then(()=>{

            let selectedText;
            let paragraph = document.getElementById('body__paragraph--display');

            paragraph.addEventListener('click', function() {

                let highlighted = document.getElementsByClassName("highlight");
                if(highlighted){
                    for (let i = 0; i < highlighted.length; i++) {
                        console.log(highlighted[i]);
                        highlighted[i].innerHTML = highlighted[i].innerText;
                    }
                }

                let wordSelected = window.getSelection().getRangeAt(0),
                    span = document.createElement('span');
                    span.className = 'highlight';       
                                
                span.appendChild(wordSelected.extractContents());

                
                wordSelected.insertNode(span);

                selectedText = wordSelected.commonAncestorContainer.lastElementChild.innerText;
                
                let regex = new RegExp('('+ selectedText +')', 'ig');
                
                let sameWords = paragraph.textContent.replace(regex, '<span class="highlight">$1</span>');
                paragraph.innerHTML = sameWords;

            });

        })
        .catch(err=>{
            console.log(err);
        });
    }


}

export default Content;
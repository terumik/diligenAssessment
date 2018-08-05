class Content {
    
    // get paragraph from server by index
    getParagraphByIndex(index){

        fetch(`https://diligen-node.herokuapp.com/getParagraph/${index}`)
        .then(res=>{
            // display 404 error
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
        // if the responce is ok
        .then(res=>res.json())
        .then(json=>json[0].documents)
        .then((paragraph)=>{
            document.getElementById('body__paragraph--display').innerHTML = paragraph;
        })
        .catch(err=>{
            console.log(err);
        });
    }


}

export default Content;
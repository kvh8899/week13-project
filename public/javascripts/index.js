
let currentId = 1;
placeholder = true;
document.addEventListener("DOMContentLoaded",() => {
    //content editable if clicked on
    document.querySelector("#pid" + currentId.toString()).addEventListener('click',(e) => {
        document.querySelector("#pid" + currentId.toString()).setAttribute('contenteditable','true');
        if(placeholder === true){
            e.target.innerText = "";
            e.target.focus();
            placeholder = false;
        }
        
    });
    
    document.addEventListener('keypress',(e) => {
        
        if(e.code === 'Enter'){
            
            //selects text to move over to next p if enter is pressed
            // and cursor is before any characters
            let newP = document.createElement("p");
            let el = document.getSelection();
            let start = '';
            let end = '';
            if(el.baseNode.data){
                start = el.baseNode.data.slice(0,el.focusOffset);
                end = el.baseNode.data.slice(el.focusOffset,el.baseNode.data.length);
            }

            //increment id
            currentId++;
            //create new p element every time user presses enter
            newP.id = "pid" + currentId.toString()
            newP.setAttribute('contenteditable','true');
            newP.innerText = end;
            e.preventDefault();

            //insert paragraph after current element being typed in
            document.querySelector('.edit').insertBefore(newP,document.activeElement.nextSibling);
            document.activeElement.innerText = start;
            newP.focus()
        }
    });
    //this function places the caret in an intuitive place
    function setCaret(string,num) {
        var el = document.getElementById(string)
        var range = document.createRange()
        var sel = window.getSelection()
        
        range.setStart(el.childNodes[0], el.innerText.length - num)
        range.collapse(true)
        
        sel.removeAllRanges()
        sel.addRange(range)
    }

    //if press backspace, then delete p elements when cursor is in the beginning
    //move characters to previous p element if there are any
    document.addEventListener('keydown',(e) => {
        let el = document.getSelection();
        if(e.code === 'Backspace' && 
        document.querySelector('.edit').children.length > 1 && 
        el.focusOffset === 0 && 
        document.activeElement.id !== 'pid1'){
            let remove = document.activeElement;
            let length = remove.innerText.length
            document.getElementById(remove.previousSibling.id).innerHTML += "1" + remove.innerText;
            setCaret(remove.previousSibling.id,length);
            document.getElementById(remove.previousSibling.id).focus();
            document.querySelector('.edit').removeChild(remove);
            currentId--;
        }
    });
})
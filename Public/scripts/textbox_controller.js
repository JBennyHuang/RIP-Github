var key = [];

//---------------- TEXT BOX ID NUMBERING ----------------------

function textBoxNumber(){
    var textareas = document.getElementsByClassName('form-control');
    for(var i =0 ; i < textareas.length ; ++i){
        textareas[i].removeAttribute("id");
        textareas[i].setAttribute("id","textbox: "+ i);
    }
}

//--------- CREATING TEXT BOX ELEMENT ------------

function getTextBox(){

    //Create Elements
    var textbox = document.createElement('div');
    var textarea = document.createElement("textarea");
    
    //Append all Child Nodes
    textbox.classList.add('form-group');
    textbox.classList.add('primary-border');
    textarea.classList.add('form-control'); 

    textbox.setAttribute("onkeydown","insertTextBox(event)") 
    //textbox.setAttribute("oninput","sendData(this)")


    textarea.classList.add("text-box");
    textarea.setAttribute("oninput","resize(this)");
   

    // append all nodes to parent node 
    textbox.appendChild(textarea);

    //Return Parent Node with all children appended
    return textbox;
}

//-------------- INSERTING TEXT BOX -------------------

function insertTextBox(event){

    //get dom element
    var currTextBox = this.document.getElementsByClassName('form-control')[0]

    //key array to collect keypresses
    key.push(event.keyCode);

    if((key.indexOf(17) != -1 && key.indexOf(38) != -1) && ( key.indexOf(38) - key.indexOf(17) == 1) ){

        currTextBox.parentNode.parentNode.insertBefore(getTextBox(), currTextBox);
        textBoxNumber();    // re calibriate the text box numbers (text box id)
        key = [];

    }

    if((key.indexOf(17) != -1 && key.indexOf(40) != -1) && ( key.indexOf(40) - key.indexOf(17) == 1) ){

        currTextBox.parentNode.parentNode.insertBefore(getTextBox(), currTextBox.nextSibiling)
        textBoxNumber();      // re calibriate the text box numbers (text box id)
        key = [];

    } 

    if(key.indexOf(40) != -1 || key.indexOf(38) != -1){
        key = [];           // reset key array 
    }
}

//textBoxNumber();
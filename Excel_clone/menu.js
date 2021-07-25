let bold = document.querySelector('.bold') ; 
let italic = document.querySelector('.italic') ; 
let underline = document.querySelector('.underline') ; 

bold.addEventListener('click', function(e){
    addStyle("bold") ; 
}) ; 

italic.addEventListener('click', function(e){
    addStyle("italic") ; 
}) ; 

underline.addEventListener('click', function(e){
    addStyle("underline") ; 
}) ; 

function addStyle( css ){
    let {rowid, colid} = getRowidColidFromElement(lastSelectedCell) ; 
    let cellObject = db[rowid][colid] ; 

    if( css == "bold"){
        if( cellObject.styling.bold ){
            lastSelectedCell.style.fontWeight = "" ;  
            bold.classList.remove("active-menu-icon") ; 
        }else{
            lastSelectedCell.style.fontWeight = "bold" ;  
            bold.classList.add("active-menu-icon") ; 
        }
    }else if( css == "italic"){
        if( cellObject.styling.italic ){
            lastSelectedCell.style.fontStyle = "" ;  
            italic.classList.remove("active-menu-icon") ; 
        }else{
            lastSelectedCell.style.fontStyle = "italic" ;  
            italic.classList.add("active-menu-icon") ; 
        }
    }else if( css == "underline"){
        if( cellObject.styling.underline ){
            lastSelectedCell.style.textDecoration = "" ;  
            underline.classList.remove("active-menu-icon") ; 
        }else{
            lastSelectedCell.style.textDecoration = "underline" ;  
            underline.classList.add("active-menu-icon") ; 
        }
    }

    cellObject.styling[css] = !cellObject.styling[css] ; 
}
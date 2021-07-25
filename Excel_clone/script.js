let lastSelectedCell;
let addressBar = document.querySelector('#address');
let formulaInput = document.querySelector('#formula');

cellContainerDiv.addEventListener('scroll', function (e) {
    colNameContainerDiv.style.top = e.target.scrollTop + "px";
    selectAllDiv.style.top = e.target.scrollTop + "px";
    selectAllDiv.style.left = e.target.scrollLeft + "px";
    rowNameContainerDiv.style.left = e.target.scrollLeft + "px";

});

let cell = document.querySelectorAll('.cell');
for (let i = 0; i < cell.length; i++) {

    cell[i].addEventListener('focus', function (e) {
        lastSelectedCell = e.target;
        let {rowid, colid} = getRowidColidFromElement(e.target) ; 
        let cellObject = db[rowid][colid] ; 
        // let address = String.fromCharCode(65+colid) + (rowid + 1) + "" ; 
        let address = cellObject.address;
        let formula = cellObject.formula;
        addressBar.value = address;
        formulaInput.value = formula;
        // console.log(db[rowid][colid]) ; 

        // bold
        if( cellObject.styling.bold ){
            document.querySelector('.bold').classList.add("active-menu-icon")
        }else{
            document.querySelector('.bold').classList.remove("active-menu-icon")
        }

        //italic
        if( cellObject.styling.italic ){
            document.querySelector('.italic').classList.add("active-menu-icon")
        }else{
            document.querySelector('.italic').classList.remove("active-menu-icon")
        }

        //underline
        if( cellObject.styling.underline ){
            document.querySelector('.underline').classList.add("active-menu-icon")
        }else{
            document.querySelector('.underline').classList.remove("active-menu-icon")
        }
    });

    cell[i].addEventListener('focusout', function (e) {
        let rowid = Number(e.target.getAttribute('rowid'));
        let colid = Number(e.target.getAttribute('colid'));
        let content = e.target.textContent;

        let cellObject = db[rowid][colid] ; 

        if( cellObject.value == content ){
            return ; 
        }
        else{
            cellObject.value = content;
            if( cellObject.formula  ){
                removeFormula( cellObject ) ; 
                formulaInput.value = '' ; 
            }
            updateValueOfChildren( cellObject.children ) ; 
        }
        // console.log( db ) ; 
        // console.log(a)

        if( cellObject.visited ){
            return ; 
        }

        cellObject.visited = true ;
        visitedCells.push( {rowId : rowid , colId : colid } ) ; 

        console.log(sheetsDB) ; 
    })

}

// when the formula bar is out of focus 
formulaInput.addEventListener('focusout', function (e) {
    let formula = e.target.value;
    let rowid = lastSelectedCell.getAttribute("rowid");
    let colid = lastSelectedCell.getAttribute("colid");
    let cellObject = db[rowid][colid] ; 
    if (formula && formula != cellObject.formula  ) {

        if( cellObject.formula ){
            removeFormula( cellObject ) ; 
        }


        let val = evaluateFormula(formula,  cellObject );

        // cell value update 
        lastSelectedCell.textContent = val;

        //db update 
        cellObject.value = val;

        // cell formula update 
        cellObject.formula = formula ; 


        // update all children 
        updateValueOfChildren( cellObject.children ) ; 

        if( cellObject.visited ){
            return ; 
        }
        cellObject.visited = true ; 
        visitedCells.push( {rowId : rowid , colId : colid}  ) ; 


        console.log(db) ; 
    }
})


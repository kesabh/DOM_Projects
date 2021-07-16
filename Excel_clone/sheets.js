let addSheetButton = document.querySelector('.add-sheet') ; 
let allSheetsDiv = document.querySelector('.sheets') ; 
let sheetId = 0 ; 
addSheetButton.addEventListener('click', function(e){

    document.querySelector('.selected-sheet').classList.remove('selected-sheet') ; 

    sheetId++ ; 
    let div = document.createElement('div') ; 
    div.classList.add('sheet') ; 
    div.classList.add('selected-sheet') ; 
    div.setAttribute("sheetid", sheetId) ; 
    div.innerHTML = `Sheet ${sheetId+1}` ; 

    allSheetsDiv.append(div) ; 

})
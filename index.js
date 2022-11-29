const rows = 3;
const cols = 3;

let thisTile;
let otherTile;
let turns = 0;

let defaultMatrix = [
'1', '2', '3', 
'4', '5', '6', 
'7', '8', '9'
];
let matrix = defaultMatrix.sort((a,b) => 0.5 - Math.random())

let randomNumber = Math.floor(Math.random()*3).toString() + "-" + Math.floor(Math.random()*3).toString();
//console.log(randomNumber)
            
window.onload = function() {
    for (let r=0; r < rows; r++) {
        for (let c=0; c < cols; c++) {
            
            let tile = document.createElement("img");
            tile.id = r.toString() + "-" + c.toString();
            
            if (tile.id == randomNumber) {
                tile.src = "./images/blank.png";
            } else {
            tile.src = "./images/" + matrix.shift() + '.png';
            }

            //console.log(tile.src)
            tile.addEventListener("dragstart", dragStart);
            tile.addEventListener("dragover", dragOver);
            tile.addEventListener("dragenter", dragOnto);
            tile.addEventListener("dragleave", dragFrom);
            tile.addEventListener("drop", dragDrop);
            tile.addEventListener("dragend", dragEnd);
             
            document.getElementById("screen").append(tile)
        }
    }
}

function dragStart() {
    thisTile = this;
    //console.log(thisTile)
}

function dragOver(e) {
    e.preventDefault();
}

function dragOnto(e) {
    e.preventDefault();
}

function dragFrom() {
}

function dragDrop() {
    otherTile = this;
}

function dragEnd() {
    if (!otherTile.src.includes("blank.png")) {
        return;
    }


    let thisPos = thisTile.id.split("-");
    let r = parseInt(thisPos[0]);
    let c = parseInt(thisPos[1]);

    let otherPos = otherTile.id.split("-");
    let r2 = parseInt(otherPos[0]);
    let c2 = parseInt(otherPos[1]);

    let moveleft = r == r2 && c2 == c-1;
    let moveright = r == r2 && c2 == c+1;
    let moveup = c == c2 && r2 == r-1;
    let movedown = c == c2 && r2 == r+1;

    let isAdjascent = moveleft || moveright ||  moveup ||  movedown
    
    if (isAdjascent) {
        let thisImg = thisTile.src;
        let otherImg = otherTile.src;

        thisTile.src = otherImg;
        otherTile.src = thisImg;

        turns += 1
        document.getElementById("turns").innerHTML = turns;
    }
}

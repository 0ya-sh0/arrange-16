const cellNeighbours = {
    box1: ['box2', 'box5'],
    box2: ['box1', 'box3', 'box6'],
    box3: ['box2', 'box4', 'box7'],
    box4: ['box3', 'box8'],

    box5: ['box1', 'box6', 'box9'],
    box6: ['box2', 'box5', 'box7', 'box10'],
    box7: ['box6', 'box8', 'box3', 'box11'],
    box8: ['box7', 'box4', 'box12'],

    box9: ['box10', 'box5', 'box13'],
    box10: ['box9', 'box11', 'box6', 'box14'],
    box11: ['box10', 'box12', 'box7', 'box15'],
    box12: ['box11', 'box8', 'box16'],

    box13: ['box14', 'box9'],
    box14: ['box13', 'box15', 'box10'],
    box15: ['box14', 'box16', 'box11'],
    box16: ['box15', 'box12', 'box17'],

    box17: ['box16'],
}

const getBox = id => document.getElementById(id);
const isBoxEmpty = box => box.children[0].classList.contains('board__cell--empty');

const swapBoxes = (box1, box2) => { 
    const temp = box1.innerHTML;
    box1.innerHTML = box2.innerHTML;
    box2.innerHTML = temp;
}

const handleClick = id =>  {
    const box = getBox(id);
    if (isBoxEmpty(box)) return;
    const emptyNeighbour = cellNeighbours[id].find(neighbourId => isBoxEmpty(getBox(neighbourId)));
    if(!emptyNeighbour) return;
    swapBoxes(box, getBox(emptyNeighbour));
}

const shuffle = () => {
    let empty = getBox(Object.keys(cellNeighbours).find(id => isBoxEmpty(getBox(id))));
    for (let index = 0; index < 1000; index++) {
        let neighbours = cellNeighbours[empty.id].map(getBox);
        let randomNeighbour = neighbours[Math.floor(Math.random() * neighbours.length)];
        swapBoxes(empty, randomNeighbour);       
        empty = randomNeighbour;
    }
}

window.onload = shuffle;
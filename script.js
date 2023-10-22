// Initialize a variable to hold the currently dragged item.
let draggedItem = null;

// Attach an event listener for the dragstart event to the whole document.
document.addEventListener("dragstart", function(event) {
    // Set the draggedItem variable to the element being dragged.
    draggedItem = event.target;

    // Use a setTimeout with a delay of 0ms to make the dragged item invisible. 
    // This is a trick to hide the source element during the drag.
    setTimeout(() => {
        draggedItem.style.display = "none";
    }, 0);

    // Set a dummy data transfer value; this is required for the drag-and-drop feature to work in Firefox.
    event.dataTransfer.setData('text/plain', null);
});

// Attach an event listener for the dragend event to the whole document.
document.addEventListener("dragend", function(event) {
    // Use a setTimeout with a delay of 0ms to perform actions after the drag has ended.
    setTimeout(() => {
        // Make the dragged item visible again. This is done in case the drag operation was not completed.
        draggedItem.style.display = "";

        // Reset the draggedItem variable to null, since the drag operation has ended.
        draggedItem = null;
    }, 0);
});

// Select all elements with the class ".tower" and loop through each one.
document.querySelectorAll(".tower").forEach(tower => {
    // Attach an event listener for the dragover event to the tower.
    // This is to allow the drop action to take place.
    tower.addEventListener("dragover", event => event.preventDefault());

    // Attach an event listener for the dragenter event to the tower.
    // This is also to allow the drop action to take place.
    tower.addEventListener("dragenter", event => event.preventDefault());

    // Attach an event listener for the drop event to the tower.
    tower.addEventListener("drop", event => {
        // Prevent the default browser behavior for drop events.
        event.preventDefault();

        // Check if it's a valid move using the isValidMove function.
        if (isValidMove(tower, draggedItem)) {
            // If it's a valid move, append the dragged item (disk) to the tower.
            tower.appendChild(draggedItem);
        }

        // Make the dragged item visible after it's been dropped.
        draggedItem.style.display = ""; 

        // Check if the disk is dropped on the third tower.
        if (tower.id === "tower3") {
            // Get the current number of disks in the game.
            const numberOfDisks = getCurrentDifficulty();

            // Check if the current configuration of the tower results in a win.
            if (checkTowerForWin(tower, numberOfDisks)) {
                // If it's a win, display the winning message.
                displayWinningMessage(numberOfDisks);
            }
        }
    });
});


function isValidMove(tower, disk) {
    // Select all disk elements within the given tower.
    const disks = tower.querySelectorAll(".disk");

    // If the tower has no disks, then any disk can be placed on it.
    if (!disks.length) return true;

    // Get the disk at the top of the tower (which would be the smallest disk currently on the tower).
    const topDisk = disks[0];

    // Compare the IDs of the top disk and the disk being moved to determine if the move is valid.
    // The logic is that a disk can only be placed on top of a larger disk.
    // We assume that the disks' IDs follow the pattern "diskN", where N is an integer.
    return parseInt(topDisk.id.replace("disk", "")) > parseInt(disk.id.replace("disk", ""));
}

// A configuration object mapping disk numbers to their respective width and background color.
const diskConfigs = {
    1: { width: "90px", backgroundColor: "red" },
    2: { width: "120px", backgroundColor: "green" },
    3: { width: "150px", backgroundColor: "blue" },
    4: { width: "180px", backgroundColor: "purple" },
    5: { width: "210px", backgroundColor: "yellow" }
}

function addDisk(diskNumber) {
    // Iterate over each disk number from 1 to the specified disk number.
    for (let i = 1; i <= diskNumber; i++) {
        // Check if a disk with the current disk number already exists in the DOM.
        if (!document.querySelector(`#disk${i}`)) {
            // If the disk doesn't exist, create and add it.
            createDisk(i);
        }
    }
}
function createDisk(diskNumber) {
    // Create a new 'div' element for the disk.
    const disk = document.createElement("div");
    
    // Add the 'disk' class to the element for styling purposes.
    disk.classList.add("disk");
    
    // Set the 'draggable' attribute to 'true' so the disk can be dragged.
    disk.setAttribute("draggable", "true");
    
    // Set the ID of the disk element to reflect its disk number.
    disk.id = `disk${diskNumber}`;

    // Use the diskConfigs object to retrieve the disk's configuration based on its number.
    const config = diskConfigs[diskNumber];
    if (config) {
        // Set the disk's width and background color based on the retrieved configuration.
        disk.style.width = config.width;
        disk.style.backgroundColor = config.backgroundColor;
    }

    // Get the first tower element.
    const tower1 = document.getElementById("tower1");
    
    // Add the newly created disk to the top of the first tower.
    tower1.insertBefore(disk, tower1.firstChild);
}

function resetGame() {
    const towers = document.querySelectorAll(".tower");
    towers.forEach(tower => {
        while (tower.firstChild) {
            tower.removeChild(tower.firstChild);
        }
        winBanner.style.display = 'none';
    });

    // Re-add the default disks to tower1
    const tower1 = document.getElementById("tower1");
    const disk3 = document.createElement("div");
    disk3.classList.add("disk");
    disk3.setAttribute("draggable", "true");
    disk3.id = "disk3";
    tower1.appendChild(disk3);

    const disk2 = document.createElement("div");
    disk2.classList.add("disk");
    disk2.setAttribute("draggable", "true");
    disk2.id = "disk2";
    tower1.appendChild(disk2);

    const disk1 = document.createElement("div");
    disk1.classList.add("disk");
    disk1.setAttribute("draggable", "true");
    disk1.id = "disk1";
    tower1.appendChild(disk1);
}

// CHECK FOR WINNER:

function checkTowerForWin(tower, numberOfDisks) {
    const disks = tower.querySelectorAll(".disk");
    if (disks.length !== numberOfDisks) return false;

    for (let i = 0; i < numberOfDisks; i++) {
        if (disks[i].id !== `disk${numberOfDisks - i}`) return false;
    }
    return true;
}

function getCurrentDifficulty() {
    return document.querySelectorAll(".disk").length;
}

const winBanner = document.getElementById('winBanner');

function displayWinningMessage(numberOfDisks) {
    winBanner.innerHTML = `Congratulations! You've solved the Towers of Hanoi with ${numberOfDisks} disks!`;
    winBanner.style.display = 'block';
}

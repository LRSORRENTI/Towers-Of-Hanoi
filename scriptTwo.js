let draggedItem = null;

document.addEventListener("dragstart", function(event) {
    draggedItem = event.target;
    setTimeout(() => {
        draggedItem.style.display = "none";
    }, 0);
    event.dataTransfer.setData('text/plain', null); // Set a dummy data transfer value, required for Firefox
});

document.addEventListener("dragend", function(event) {
    setTimeout(() => {
        draggedItem.style.display = "";
        draggedItem = null;
    }, 0);
});
document.querySelectorAll(".tower").forEach(tower => {
    // Using arrow functions for brevity
    tower.addEventListener("dragover", event => event.preventDefault());
    tower.addEventListener("dragenter", event => event.preventDefault());

    tower.addEventListener("drop", event => {
        event.preventDefault();
        if (isValidMove(tower, draggedItem)) {
            tower.appendChild(draggedItem);
        }
        draggedItem.style.display = ""; // This ensures the dragged disk is visible after dragging.

        // Only check for win if disk is dropped on the third tower
        if (tower.id === "tower3") {
            const numberOfDisks = getCurrentDifficulty();
            if (checkTowerForWin(tower, numberOfDisks)) {
                displayWinningMessage(numberOfDisks);
            }
        }
    });
});


function isValidMove(tower, disk) {
    const disks = tower.querySelectorAll(".disk");
    if (!disks.length) return true;
    const topDisk = disks[0];
    return parseInt(topDisk.id.replace("disk", "")) > parseInt(disk.id.replace("disk", ""));
}

const diskConfigs = {
    1: { width: "90px", backgroundColor: "red" },
    2: { width: "120px", backgroundColor: "green" },
    3: { width: "150px", backgroundColor: "blue" },
    4: { width: "180px", backgroundColor: "purple" },
    5: { width: "210px", backgroundColor: "yellow" }
}


function addDisk(diskNumber) {
    for (let i = 1; i <= diskNumber; i++) {
        if (!document.querySelector(`#disk${i}`)) {
            createDisk(i);
        }
    }
}

function createDisk(diskNumber) {
    const disk = document.createElement("div");
    disk.classList.add("disk");
    disk.setAttribute("draggable", "true");
    disk.id = `disk${diskNumber}`;

    const config = diskConfigs[diskNumber];
    if (config) {
        disk.style.width = config.width;
        disk.style.backgroundColor = config.backgroundColor;
    }

    const tower1 = document.getElementById("tower1");
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

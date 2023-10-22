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
    tower.addEventListener("dragover", function(event) {
        event.preventDefault();
    });

    tower.addEventListener("dragenter", function(event) {
        event.preventDefault();
    });

    tower.addEventListener("drop", function(event) {
        event.preventDefault();
        if (isValidMove(tower, draggedItem)) {
            tower.appendChild(draggedItem);
        }
        draggedItem.style.display = ""; // This ensures the dragged disk is visible after dragging.
    });
    
});
function isValidMove(tower, disk) {
    const disks = tower.querySelectorAll(".disk");
    if (!disks.length) return true;
    const topDisk = disks[0];
    console.log(`Trying to move disk: ${disk.id}`);
    console.log(`Top disk in target tower: ${topDisk.id}`);
    return parseInt(topDisk.id.replace("disk", "")) > parseInt(disk.id.replace("disk", ""));
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

    switch (diskNumber) {
        case 1:
            // Set properties for disk1 if any, e.g.
            disk.style.width = "90px";
            disk.style.backgroundColor = "red";
            break;
        case 2:
            // Set properties for disk2 if any
            disk.style.width = "120px";
            disk.style.backgroundColor = "green";
            break;
        case 3:
            // Set properties for disk3 if any
            disk.style.width = "150px";
            disk.style.backgroundColor = "blue";
            break;
        case 4:
            disk.style.width = "180px";
            disk.style.backgroundColor = "purple";
            break;
        case 5:
            disk.style.width = "210px";
            disk.style.backgroundColor = "yellow";
            break;
    }

    document.getElementById("tower1").insertBefore(disk, document.getElementById("tower1").firstChild);
}


function resetGame() {
    const towers = document.querySelectorAll(".tower");
    towers.forEach(tower => {
        while (tower.firstChild) {
            tower.removeChild(tower.firstChild);
        }
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

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
    if (document.querySelector(`#disk${diskNumber}`)) {
        // The disk already exists; don't add again
        return;
    }

    const disk = document.createElement("div");
    disk.classList.add("disk");
    disk.setAttribute("draggable", "true");
    disk.id = `disk${diskNumber}`;

    switch(diskNumber) {
        case 4:
            disk.style.width = "150px";
            disk.style.backgroundColor = "purple";
            break;
        case 5:
            disk.style.width = "180px";
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

    for(let i = 1; i <= 5; i++) {
        if (document.querySelector(`#disk${i}`)) {
            document.getElementById("tower1").appendChild(document.querySelector(`#disk${i}`));
        }
    }
}

let draggedItem = null;

document.addEventListener("dragstart", function(event) {
    draggedItem = event.target;
    setTimeout(() => {
        draggedItem.style.display = "none";
    }, 0);
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
        if (isValidMove(tower, draggedItem)) {
            tower.appendChild(draggedItem);
        }
    });
});

function isValidMove(tower, disk) {
  // The move is valid if the tower is empty or if the top disk of the tower is larger than the dragged disk
  const disks = tower.querySelectorAll(".disk");
  if (!disks.length) return true;
  const topDisk = disks[0]; // Changed from disks[disks.length - 1]
  return topDisk.clientWidth > disk.clientWidth;
}

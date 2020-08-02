// var introText = "I wish there was an application that allowed me to browse faster. I wish that it had news and weather right on the page so I wouldn't have to search every time. I wish it had a to do list and text editor so I could stop using those annoying external applications. I wish I could customize it. I wish that all of that could happen in the same new tab page."
// var counter = 0;
// var speed = 30;

// function typeWriter() {
//   if (counter < introText.length) {
//     document.getElementById("intro").innerHTML += introText.charAt(counter);
//     counter++;
//     setTimeout(typeWriter, speed);
//   }
// }
// typeWriter();

function getDragAfterElement(container, x) {
    const draggableElements = [
      ...container.querySelectorAll(".draggable:not(.dragging)"),
    ];
  
    return draggableElements.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = x - box.left - box.width / 2;
        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      { offset: Number.NEGATIVE_INFINITY }
    ).element;
  }

const draggables = document.querySelectorAll(".draggable");
const containers = document.querySelectorAll(".container");

draggables.forEach((draggable) => {
  draggable.addEventListener("dragstart", () => {
    draggable.classList.add("dragging");
  });

  draggable.addEventListener("dragend", () => {
    draggable.classList.remove("dragging");
  });
});

containers.forEach((container) => {
  container.addEventListener("dragover", (e) => {
    e.preventDefault();
    const afterElement = getDragAfterElement(container, e.clientX);
    const draggable = document.querySelector(".dragging");
    if (afterElement == null) {
      container.appendChild(draggable);
    } else {
      container.insertBefore(draggable, afterElement);
    }
  });
});

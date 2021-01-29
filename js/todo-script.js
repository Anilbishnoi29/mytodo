// if user adds a notes, ass it to local storage
// checkboxtodo

showtask();

// function save() {
//     var checkbox = document.getElementById("checkbox1");
//     localStorage.setItem("checkbox1", checkbox.checked);
// }

// //for loading
// var checked = JSON.parse(localStorage.getItem("checkbox1"));
// document.getElementById("checkbox1").checked = checked;

let addtaskinput = document.getElementById('addtaskinput');
let addtaskbtn = document.getElementById('addbtnTask');

// 
addtaskbtn.addEventListener("click", function() {
    addtaskinputval = addtaskinput.value;
    if (addtaskinputval.trim() != 0) {
        let webtask = localStorage.getItem("localtask");
        if (webtask == null) {
            taskObj = [];
        } else {
            taskObj = JSON.parse(webtask);
        }
        taskObj.push(addtaskinputval);
        localStorage.setItem("localtask", JSON.stringify(taskObj));
        addtaskinput.value = '';
    }
    // console.log(taskObj);
    showtask();
});

// for showing task
function showtask() {
    let webtask = localStorage.getItem("localtask");
    if (webtask == null) {
        taskObj = [];
    } else {
        taskObj = JSON.parse(webtask);
    }
    let html = '';
    let addtasklist = document.getElementById("notes");
    taskObj.forEach((item, index) => {
        html += `<div class="card-todos">
        <div class="card-body">
            <div class="todos-items">
            <span>${index+1}</span>
            <div class="card-top">
            <button id="edit-task" onclick="edittask(${index})"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button>
            <button id="delete-task"  onclick="deletetask(${index})"><i class="fa fa-trash-o" aria-hidden="true"></i></button>
            </div>
            </div>
            
            <p>${item}</p>
        </div>
    </div>`;
    });


    addtasklist.innerHTML = html;

}

// edittask
function edittask(index) {
    let savetaskinput = document.getElementById("savetaskinput");
    let addbtnTask = document.getElementById("addbtnTask");
    let savebtnTask = document.getElementById("savebtnTask");
    savetaskinput.value = index;
    let webtask = localStorage.getItem("localtask");
    let taskObj = JSON.parse(webtask);
    addtaskinput.value = taskObj[index];
    addbtnTask.style.display = "none";
    savebtnTask.style.display = "block";
}



// save 
let savebtnTask = document.getElementById("savebtnTask");
savebtnTask.addEventListener("click", function() {
    let webtask = localStorage.getItem("localtask");
    let taslObj = JSON.parse(webtask);
    let savetaskinput = document.getElementById("savetaskinput").value;
    taskObj[savetaskinput] = addtaskinput.value;
    savebtnTask.style.display = "none";
    addbtnTask.style.display = "block";
    localStorage.setItem("localtask", JSON.stringify(taskObj));
    addtaskinput.value = '';
    showtask();
})



// deletetask
function deletetask(index) {
    let webtask = localStorage.getItem("localtask");
    let taslObj = JSON.parse(webtask);
    taskObj.splice(index, 1);
    localStorage.setItem("localtask", JSON.stringify(taskObj));
    addtaskinput.value = '';

    savebtnTask.style.display = "none";
    addbtnTask.style.display = "block";
    showtask();
}
// deletetask
let deletebtnAllTask = document.getElementById("deletebtnAllTask");

deletebtnAllTask.addEventListener("click", function(index) {

    let webtask = localStorage.getItem("localtask");
    let taslObj = JSON.parse(webtask);
    taskObj.splice(index);
    localStorage.setItem("localtask", JSON.stringify(taskObj));

    savebtnTask.style.display = "none";
    addbtnTask.style.display = "block";
    addtaskinput.value = '';
    showtask();

});


// searchtextbox
let search = document.getElementById("searchTxt");
search.addEventListener("input", function() {
    let inputVal = search.value.toLowerCase();
    let noteCard = document.getElementsByClassName('card-todos');
    Array.from(noteCard).forEach(function(element) {
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        // console.log(cardTxt);
        if (cardTxt.includes(inputVal)) {
            element.style.display = "block";
        } else {
            element.style.display = "none";
        }
    })
})



setTimeout(function() {
    $('#splash-overlay').fadeOut('fast');
}, 3500); // <-- time in milliseconds
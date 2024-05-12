const  app = document.getElementById('todo');
const taskInput = document.getElementById('taskInput');
const taskDisplay = document.getElementById('taskList');
const taskAdd = document.getElementById('addTask');
let finishedTaskList =[];
var createLi = document.createElement('li');    

const saveBtn = document.getElementById("saveBtn");
const loadBtn = document.getElementById("loadBtn");

console.log('This app uses cookies to save your data on your local memory')

function setCookie(cname,cvalue,exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
  function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  saveBtn.addEventListener('click',function () {
    setCookie("tasklist",taskList,365);
  });

let taskList = [];
window.addEventListener("load", function() {
  let saveFile = []
  saveFile = getCookie("tasklist").split(',');
  for (let i = 0; i < saveFile.length; i++) {
    taskList.push(saveFile[i]);
  }
  if (saveFile.length == 1 && saveFile[0]=="") {
    taskDisplay.innerHTML="";
    taskList = [];
    console.log("You have no previous data available !")
  }else{
    taskDisplay.innerHTML="";
    for (let i = 0; i < taskList.length; i++) {
        const task  = taskList[i];
        taskDisplay.innerHTML=taskDisplay.innerHTML+"<li>"+task+"<button class='closeBtn'>X</button></li>";
        console.log("Previous data loaded succesfuly !")

    }
  }

});


taskAdd.addEventListener('click', function taskAddFunction(event) {
    taskList.push(taskInput.value);
    taskInput.value = "";
    const CloseButtons =document.getElementsByClassName('closeBtn');
    taskDisplay.innerHTML=""
    for (let i = 0; i < taskList.length; i++) {
        const task  = taskList[i];
        taskDisplay.innerHTML=taskDisplay.innerHTML+"<li>"+task+"<button class='closeBtn'>X</button></li>";
    }
});
taskDisplay.addEventListener("click", function(event) {
    if (event.target.classList.contains("closeBtn")) {
        var listItem = event.target.parentNode;
        listItem.parentNode.removeChild(listItem);
        itemToRemove = event.target.parentNode.innerText.slice(0, event.target.parentNode.innerText.length - 1);
        finishedTaskList.push(itemToRemove)
        if (taskList.indexOf(itemToRemove) !== -1) {
            taskList.splice(taskList.indexOf(itemToRemove), 1);
        }
    }
});
const listitems =document.getElementsByTagName('li');


const clear = document.querySelector(".clear");
const dateArea = document.getElementById("date");
const list = document.getElementById("list");
//time and date
const today = new Date();
const options = {weekday:"long", month:"short", day:"numeric"};
dateArea.innerHTML = today.toLocaleDateString("en-US", options);

const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

let LIST;
let id;

//add item to local storage
//localStorage.setItem("TODO", JSON.stringify(LIST));

//get item from local storage
let data = localStorage.getItem("TODO");
if(data)
{
    LIST = JSON.parse(data);
    id = LIST.length;
    loadList(LIST);
}
else
{
    LIST = [];
    id = 0;
}

function loadList(array)
{
    array.forEach(function(item)
    {
        addToDo(item.name, item.id, item.done, item.trash);
    })
}

//clear data
clear.addEventListener("click", ()=>
{
    var a = confirm("Are You Sure?");
    if(a)
    {
        localStorage.clear();
        location.reload();
    }
})

function addToDo(todo, id, done, trash)
{
    if(trash)
    {
        return;
    }
    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";
    const item = `
    <li class="item">
        <i class="fa ${DONE} cir" job="complete" id="${id}"></i>
        <p class="text ${LINE}">${todo}</p>
        <i class="fa fa-trash del" job="remove" id="${id}"></i>
    </li>
    `;
    const position = "beforeend";
    list.insertAdjacentHTML(position, item);
}

document.addEventListener('keyup', function(event)
    {
        if(event.keyCode==13)
        {
            const todo = input.value;
            if(todo)
            {
                addToDo(todo, id, false, false);
                LIST.push({
                    name: todo,
                    id : id,
                    done : false,
                    trash : false,
                });
                localStorage.setItem("TODO", JSON.stringify(LIST));
                id++;
            }
            input.value = "";
            console.log(LIST);
        }
    })

function completeToDo(element)
{
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
    LIST[element.id].done = LIST[element.id].done ? false : true;
    alert("Well Done... ");
}
function removeToDo(element)
{
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].trash = true;
}
list.addEventListener("click", function(event)
{
    const element = event.target;
    const elementJob = element.attributes.job.value;

    if(elementJob == "complete")
    {
        completeToDo(element);
    }
    else if(elementJob == "remove")
    {
        removeToDo(element);
    }
    localStorage.setItem("TODO", JSON.stringify(LIST));
})
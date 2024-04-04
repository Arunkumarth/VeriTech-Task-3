const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const editinput = document.getElementById("update-input");
const list = document.getElementById("todo-list");
const btn = document.getElementById("add-btn");
const editForm = document.getElementById("update-form");
const modal=document.getElementById("update-modal");
let edittingId;
try {
    todoArray = JSON.parse(localStorage.getItem("todos")) || [];
} catch (error) {
    console.error("Error parsing JSON:", error);
    todoArray = [];
}
// localStorage.removeItem("todos");
showtodo()

form.addEventListener("submit",myFunc);
editForm.addEventListener("submit",myFunc);
function myFunc(event){
    let count = Date.now().toString(36) + Math.random().toString(36);
    event.preventDefault();
    if(input.value.trim()||editinput.value.trim()){
    if(btn.innerText=="Add"){
        todoArray.unshift({
            id:count,
            name:input.value.trim(),
            status:"Pending"
        })
    }
    else if(btn.innerText=="Edit"){
        todoArray.map(ele=>{
            if(ele.id==edittingId){
                ele.name=editinput.value.trim();
            }
        })
        modal.style.display="none";
        btn.innerText="Add";
        edittingId=null;
    }
    
    count++;
    localStorage.setItem("todos",JSON.stringify(todoArray));
    input.value='';
    showtodo();
}
    else{
        return;
    }
}
function showtodo(){
    if(todoArray.length){
        //Printing
        
            list.innerHTML = todoArray.map((e)=>{
                return `<li class="li-${e.status}" id=${e.id}> 
            <span class="t-name">${e.name}</span>
            <span class="${e.status}">${e.status}</span>
            <span class="t-btn">
            <button id=${e.id} onclick="remove(this.id)"><img src="images/bin.png" alt="del"></button>
            <button id=${e.id} onclick="MarkDone(this.id)"><img src="images/accept.png" alt="done"></button>
            <button id=${e.id} onclick="edit(this.id)"><img src="images/pen.png" alt="edit"></button>
            </span>
            </li>
            `
    }).join('')
    console.log(todoArray);

    }
    else{
        return;
    }
    
}

function remove(id){
   todoArray.map((e)=>{
    if(e.id==id){
        todoArray.splice(todoArray.indexOf(e), 1);
        
    }
})
    localStorage.setItem("todos",JSON.stringify(todoArray));
    const ele = document.getElementById(id);
    list.removeChild(ele);
}

function MarkDone(id){
    todoArray.map((e)=>{
        if(e.id==id){
            e.status=e.status=="Completed"?"Pending":"Completed"
        }
    })
    todoArray.sort((a,b)=>{
        if(a.status=="Pending"){
            return -1;
        }
        else{
            return 0;
        }
    })
    localStorage.setItem("todos",JSON.stringify(todoArray));
    showtodo();
}
function edit(id) {
    btn.innerText="Edit";
    modal.style.display="flex";
    todoArray.map((ele)=>{
        if(ele.id==id){
            editinput.value=ele.name;
            edittingId=ele.id;

        }
    })
}


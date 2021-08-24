 const taskcontainer = document.querySelector(".task_container");
 let globalTaskData = [];
 const generateHTML = (taskData) => `<div id= ${taskData.id} class="  col-md-6  col-lg-4 my-4">
        <div class="card ">
          <div class="card-header d-flex justify-content-end ">
            <button class="btn btn-outline-info ">
              <i class="far fa-pencil"></i>
            </button>
            <button class="btn btn-outline-danger ">
              <i class="fas fa-trash-alt"></i>
            </button>
          </div>
          <div class="card-body">
            <img src=${taskData.image} alt="image" class="card-img">
            <h5 class="card-title mt-4">${taskData.title} </h5>
            <p class="card-text">${taskData.discription}</p>
            <span class="badge bg-primary">${taskData.type}</span>
            
          </div>
          <div class="card-footer ">
            <button class="btn btn-primary ">
              open new
            </button>
          </div>
        </div>
      </div>`;

 const insertToDom = (content) =>
 taskcontainer.insertAdjacentHTML("beforeend" ,content );

 
const addNewData = () => {
//get taskData
  const taskData = {
   id: `${Date.now()}`,
   image:document.getElementById("imageURL").value,
   title:document.getElementById("taskTitle").value,
   type:document.getElementById("taskType").value,
   discription:document.getElementById("taskDiscription").value
  };

  globalTaskData.push(taskData);
// update the localstorage
  localStorage.setItem("tasky",JSON.stringify({card:globalTaskData}));
//genarate html code
  const newCard =generateHTML(taskData);
//inject into dom
  insertToDom(newCard);
//colse the form
  document.getElementById("imageURL").value= "";
  document.getElementById("taskTitle").value= "";
  document.getElementById("taskType").value= "";
  document.getElementById("taskDiscription").value= "";
  return;
};

const loadExistingCards = () => {
// check localstorage
    const getData = localStorage.getItem("tasky");
//parse JSON data , if existing   (stringify - js object=> JSON , parse - JSON=> js object)
    if (!getData) return;
    const taskCards = JSON.parse(getData);
    globalTaskData = taskCards.card ;
    globalTaskData.map((taskData) => {
//genarate html code for those data
    const newCard = generateHTML(taskData);
//inject into dom
    insertToDom(newCard);    
 //colse the form
     document.getElementById("imageURL").value= "";
     document.getElementById("taskTitle").value= "";
     document.getElementById("taskType").value= "";
     document.getElementById("taskDiscription").value= "";
     return;
});
//inject in to dom
    taskcontainer.insertAdjacentHTML("beforeend" , newCard);
    return;
};

const deleteCard = (event) => {
  const targetId = event.target.getAttribute("name");
  const elementType = event.target.tagName;
  const removeTask = globalTaskData.filter((task) => task.id !== targetId);
};

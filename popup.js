document.addEventListener('DOMContentLoaded', function() { //code runs when page loaded
  //references to HTML elements
  const taskInput = document.getElementById('taskInput');
  const addTaskButton = document.getElementById('addTaskButton');
  const taskList = document.getElementById('taskList');
  const hiddenTaskList = document.getElementById('hiddenTaskList');
  const toDoTab = document.getElementById('toDoTab');
  const hiddenTab = document.getElementById('hiddenTab');
  const toDoSection = document.getElementById('toDoSection');
  const hiddenSection = document.getElementById('hiddenSection');

  //shows To-Do section and hides Hidden section  
  function switchToDo() {
    toDoSection.classList.remove('hidden');
    hiddenSection.classList.add('hidden');
    toDoTab.classList.add('active-tab');
    hiddenTab.classList.remove('active-tab');
  }

  //shows Hidden section and hide To-do section, loads hidden tasks from local storage
  function switchHidden() {
    toDoSection.classList.add('hidden');
    hiddenSection.classList.remove('hidden');
    toDoTab.classList.remove('active-tab');
    hiddenTab.classList.add('active-tab');

    // Load hidden tasks
    hiddenTaskList.innerHTML = '';
    chrome.storage.local.get({ hiddenTasks: [] }, function(result) {
      const hiddenTasks = result.hiddenTasks;
      hiddenTasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.className = 'task';
        taskItem.textContent = task;
        hiddenTaskList.appendChild(taskItem);
      });
    });
  }

  //new task added and creates move button for each task. move button moves task to hidden list
  addTaskButton.addEventListener('click', function() {
    const taskText = taskInput.value.trim();
    if (taskText) {
      const taskItem = document.createElement('li');
      taskItem.className = 'task';
      taskItem.textContent = taskText;

      const moveButton = document.createElement('button');
      moveButton.className = 'move-button';
      moveButton.textContent = 'Move';
      moveButton.addEventListener('click', function() {
        chrome.storage.local.get({ hiddenTasks: [] }, function(result) {
          const hiddenTasks = result.hiddenTasks;
          hiddenTasks.push(taskText);
          chrome.storage.local.set({ hiddenTasks: hiddenTasks }, function() {
            taskList.removeChild(taskItem);
          });
        });
      });

      taskItem.appendChild(moveButton);
      taskList.appendChild(taskItem);
      taskInput.value = '';
    }
  });

  //loads task from local storage and populate to-do list when page loaded
  chrome.storage.local.get({ tasks: [] }, function(result) {
    const tasks = result.tasks;
    tasks.forEach(task => {
      const taskItem = document.createElement('li');
      taskItem.className = 'task';
      taskItem.textContent = task;

      const moveButton = document.createElement('button');
      moveButton.className = 'move-button';
      moveButton.textContent = 'Move';
      moveButton.addEventListener('click', function() {
        chrome.storage.local.get({ hiddenTasks: [] }, function(result) {
          const hiddenTasks = result.hiddenTasks;
          hiddenTasks.push(task);
          chrome.storage.local.set({ hiddenTasks: hiddenTasks }, function() {
            taskList.removeChild(taskItem);
          });
        });
      });

      taskItem.appendChild(moveButton);
      taskList.appendChild(taskItem);
    });
  });

  //event listeners for tabs
  toDoTab.addEventListener('click', switchToDo);
  hiddenTab.addEventListener('click', switchHidden);

  // initial tab display
  switchToDo();
});

// document.addEventListener('DOMContentLoaded', function() {
//   const taskInput = document.getElementById('taskInput');
//   const addTaskButton = document.getElementById('addTaskButton');
//   const showHiddenTasksButton = document.getElementById('showHiddenTasksButton');
//   const taskList = document.getElementById('taskList');
//   const hiddenTasksContainer = document.getElementById('hiddenTasksContainer');

//   addTaskButton.addEventListener('click', function() {
//     const taskText = taskInput.value.trim();
//     if (taskText) {
//       const taskItem = document.createElement('li');
//       taskItem.className = 'task';
//       taskItem.textContent = taskText;

//       const moveButton = document.createElement('button');
//       moveButton.className = 'move-button';
//       moveButton.textContent = 'Move';
//       moveButton.addEventListener('click', function() {
//         chrome.storage.local.get({ hiddenTasks: [] }, function(result) {
//           const hiddenTasks = result.hiddenTasks;
//           hiddenTasks.push(taskText);
//           chrome.storage.local.set({ hiddenTasks: hiddenTasks }, function() {
//             taskList.removeChild(taskItem);
//           });
//         });
//       });

//       taskItem.appendChild(moveButton);
//       taskList.appendChild(taskItem);
//       taskInput.value = '';
//     }
//   });

//   showHiddenTasksButton.addEventListener('click', function() {
//     // Check if hidden tasks page is already open
//     const views = chrome.extension.getViews();
//     let hiddenTasksPage = views.find(view => view.location.href.endsWith('hidden.html'));

//     if (!hiddenTasksPage) {
//       hiddenTasksContainer.innerHTML = '';
//       chrome.tabs.create({ url: 'hidden.html' }, function(tab) {
//         const hiddenTasksView = chrome.extension.getViews({ tabId: tab.id })[0];
//         hiddenTasksView.addEventListener('DOMContentLoaded', function() {
//           hiddenTasksContainer.appendChild(hiddenTasksView.document.body);
//           hiddenTasksContainer.style.display = 'block';
//         });
//       });
//     } else {
//       hiddenTasksContainer.style.display = 'block';
//     }
//   });

//   chrome.storage.local.get({ tasks: [] }, function(result) {
//     const tasks = result.tasks;
//     tasks.forEach(task => {
//       const taskItem = document.createElement('li');
//       taskItem.className = 'task';
//       taskItem.textContent = task;

//       const moveButton = document.createElement('button');
//       moveButton.className = 'move-button';
//       moveButton.textContent = 'Move';
//       moveButton.addEventListener('click', function() {
//         chrome.storage.local.get({ hiddenTasks: [] }, function(result) {
//           const hiddenTasks = result.hiddenTasks;
//           hiddenTasks.push(task);
//           chrome.storage.local.set({ hiddenTasks: hiddenTasks }, function() {
//             taskList.removeChild(taskItem);
//           });
//         });
//       });

//       taskItem.appendChild(moveButton);
//       taskList.appendChild(taskItem);
//     });
//   });
// });

 
document.addEventListener('DOMContentLoaded', function() {
  const hiddenTaskList = document.getElementById('hiddenTaskList');

  chrome.storage.local.get({ hiddenTasks: [] }, function(result) {
    const hiddenTasks = result.hiddenTasks;
    hiddenTasks.forEach(task => {
      const taskItem = document.createElement('li');
      taskItem.className = 'task';
      taskItem.textContent = task;
      hiddenTaskList.appendChild(taskItem);
    });
  });
});


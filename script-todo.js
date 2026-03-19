document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');
    const progressFill = document.querySelector('.progress-fill');
    const progressNumbers = document.getElementById('progress-numbers');

    // UPDATE PROGRESS
    const updateProgress = () => {
        const totalTasks = taskList.children.length;
        const completedTasks = document.querySelectorAll('.checkbox:checked').length;

        progressNumbers.textContent = `${completedTasks} / ${totalTasks}`;

        const percentage = totalTasks === 0 
            ? 0 
            : (completedTasks / totalTasks) * 100;

        progressFill.style.width = percentage + "%";
    };

    // ADD TASK
    const addTask = (event) => {
        if (event) event.preventDefault();

        const taskText = taskInput.value.trim();
        if (!taskText) return;

        const li = document.createElement('li');

        li.innerHTML = `
            <div class="task-left">
                <input type="checkbox" class="checkbox">
                <span class="task-text">${taskText}</span>
            </div>
            <div class="task-actions">
                <button class="edit-btn">✏️</button>
                <button class="delete-btn">❌</button>
            </div>
        `;

        const checkbox = li.querySelector('.checkbox');
        const textSpan = li.querySelector('.task-text');
        const deleteBtn = li.querySelector('.delete-btn');
        const editBtn = li.querySelector('.edit-btn');

        // Checklist
        checkbox.addEventListener('change', () => {
            textSpan.classList.toggle('completed');
            updateProgress();
        });

        // Delete
        deleteBtn.addEventListener('click', () => {
            li.remove();
            updateProgress();
        });

        // Edit
        editBtn.addEventListener('click', () => {
            const newText = prompt("Edit task:", textSpan.textContent);
            if (newText !== null && newText.trim() !== "") {
                textSpan.textContent = newText.trim();
            }
        });

        taskList.appendChild(li);
        taskInput.value = '';

        updateProgress();
    };

    addTaskBtn.addEventListener('click', addTask);

    taskInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            addTask(e);
        }
    });

    // Initial progress state
    updateProgress();
});
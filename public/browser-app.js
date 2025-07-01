window.addEventListener('DOMContentLoaded', () => {
  // Elements for toggling sections
  const tasksBtn = document.getElementById('tasks-btn');
  const notesBtn = document.getElementById('notes-btn');
  const pomodoroBtn = document.getElementById('pomodoro-btn');

  const tasksSection = document.getElementById('tasks-section');
  const notesSection = document.getElementById('notes-section');
  const pomodoroSection = document.getElementById('pomodoro-section');

  let currentSection = 'tasks';
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  let notes = JSON.parse(localStorage.getItem('notes')) || [];

  function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  function saveNotes() {
    localStorage.setItem('notes', JSON.stringify(notes));
  }

  function showSection(section) {
    currentSection = section;
    [tasksSection, notesSection, pomodoroSection].forEach(sec => sec.classList.add('hidden'));
    [tasksBtn, notesBtn, pomodoroBtn].forEach(btn => {
      btn.classList.remove('bg-indigo-600', 'text-white');
      btn.classList.add('bg-gray-300', 'text-gray-800');
    });

    const sectionMap = {
      tasks: [tasksSection, tasksBtn],
      notes: [notesSection, notesBtn],
      pomodoro: [pomodoroSection, pomodoroBtn]
    };

    sectionMap[section][0].classList.remove('hidden');
    sectionMap[section][1].classList.add('bg-indigo-600', 'text-white');
    sectionMap[section][1].classList.remove('bg-gray-300', 'text-gray-800');
  }

  tasksBtn.addEventListener('click', () => showSection('tasks'));
  notesBtn.addEventListener('click', () => showSection('notes'));
  pomodoroBtn.addEventListener('click', () => showSection('pomodoro'));

  const taskForm = document.querySelector('.task-form');
  const tasksContainer = document.querySelector('.tasks');
  const filterButtons = document.querySelectorAll('.filter-btn');

  function renderTasks(filter = 'all') {
    tasksContainer.innerHTML = '';

    const filteredTasks = tasks.filter(task => {
      if (filter === 'all') return true;
      if (filter === 'pending') return !task.completed;
      if (filter === 'completed') return task.completed;
    });

    if (filteredTasks.length === 0) {
      tasksContainer.innerHTML = '<p class="text-center text-gray-500">No tasks found.</p>';
    }

    filteredTasks.forEach((task, index) => {
      const taskEl = document.createElement('div');
      let isOverdue = false;
      if (task.dueDate) {
        const due = new Date(task.dueDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (!task.completed && due < today) isOverdue = true;
      }

      taskEl.className = 'task-item flex justify-between items-center p-3 border rounded shadow';
      if (isOverdue) taskEl.classList.add('border-red-500');

      const taskInfo = document.createElement('div');
      taskInfo.innerHTML = `
        <input type="checkbox" ${task.completed ? 'checked' : ''} data-index="${index}" />
        <span class="${task.completed ? 'line-through text-gray-500' : ''} ml-2">${task.name}</span>
        <small class="ml-4 text-gray-400">${task.dueDate || ''}</small>
      `;
      taskEl.appendChild(taskInfo);

      const delBtn = document.createElement('button');
      delBtn.innerHTML = '<i class="fas fa-trash text-red-600"></i>';
      delBtn.setAttribute('data-index', index);
      delBtn.classList.add('delete-task-btn');
      taskEl.appendChild(delBtn);

      tasksContainer.appendChild(taskEl);
    });

    const allCompleted = filteredTasks.length > 0 && filteredTasks.every(task => task.completed);
    const mysteryMsg = document.getElementById('mystery-message');
    if (allCompleted) {
      const random = mysteryTasks[Math.floor(Math.random() * mysteryTasks.length)];
      mysteryMsg.textContent = `🎁 Mystery Task: ${random}`;
      mysteryMsg.classList.remove('hidden');
    } else {
      mysteryMsg.classList.add('hidden');
    }

    populateTaskSelect();
  }

  taskForm.addEventListener('submit', e => {
    e.preventDefault();
    const nameInput = taskForm.elements['name'];
    const dueDateInput = taskForm.elements['dueDate'];
    const nameValue = nameInput.value.trim();
    if (!nameValue) return;
    tasks.push({ name: nameValue, dueDate: dueDateInput.value, completed: false });
    saveTasks();
    nameInput.value = '';
    dueDateInput.value = '';
    renderTasks();
    showSection(currentSection);
  });

  tasksContainer.addEventListener('change', e => {
    if (e.target.type === 'checkbox') {
      const idx = e.target.getAttribute('data-index');
      tasks[idx].completed = e.target.checked;
      saveTasks();
      renderTasks();
      showSection(currentSection);
    }
  });

  tasksContainer.addEventListener('click', e => {
    if (e.target.closest('.delete-task-btn')) {
      const idx = e.target.closest('.delete-task-btn').getAttribute('data-index');
      tasks.splice(idx, 1);
      saveTasks();
      renderTasks();
      showSection(currentSection);
    }
  });

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('bg-indigo-600', 'text-white'));
      btn.classList.add('bg-indigo-600', 'text-white');
      renderTasks(btn.dataset.filter);
    });
  });

  const notesForm = document.getElementById('notes-form');
  const notesList = document.getElementById('notes-list');

  function renderNotes() {
    notesList.innerHTML = '';
    if (notes.length === 0) {
      notesList.innerHTML = '<p class="text-center text-gray-500">No notes added yet.</p>';
      return;
    }
    notes.forEach((note, idx) => {
      const noteDiv = document.createElement('div');
      noteDiv.className = 'border p-3 rounded shadow relative';
      noteDiv.innerHTML = `
        <p>${note}</p>
        <button data-index="${idx}" class="delete-note absolute top-2 right-2 text-red-600 hover:text-red-800">
          <i class="fas fa-trash"></i>
        </button>
      `;
      notesList.appendChild(noteDiv);
    });
  }

  notesForm.addEventListener('submit', e => {
    e.preventDefault();
    const noteText = document.getElementById('note-text').value.trim();
    if (noteText) {
      notes.push(noteText);
      saveNotes();
      document.getElementById('note-text').value = '';
      renderNotes();
      showSection(currentSection);
    }
  });

  notesList.addEventListener('click', e => {
    if (e.target.closest('.delete-note')) {
      const idx = e.target.closest('.delete-note').getAttribute('data-index');
      notes.splice(idx, 1);
      saveNotes();
      renderNotes();
      showSection(currentSection);
    }
  });

  const timerDisplay = document.getElementById('timer-display');
  const startBtn = document.getElementById('start-btn');
  const pauseBtn = document.getElementById('pause-btn');
  const resetBtn = document.getElementById('reset-btn');
  const pomodoroStatus = document.getElementById('pomodoro-status');
  const taskSelect = document.getElementById('task-select');

  let timerDuration = 25 * 60;
  let timer = timerDuration;
  let intervalId = null;
  let isRunning = false;

  function updateTimerDisplay(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    timerDisplay.textContent = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }

  function startTimer() {
    if (isRunning) return;
    if (!taskSelect.value) {
      pomodoroStatus.textContent = 'Please select a task to focus on!';
      return;
    }
    pomodoroStatus.textContent = '';
    isRunning = true;
    intervalId = setInterval(() => {
      if (timer <= 0) {
        clearInterval(intervalId);
        pomodoroStatus.textContent = 'Time’s up! Take a break.';
        isRunning = false;
        stopAmbientSound();
        return;
      }
      timer--;
      updateTimerDisplay(timer);
    }, 1000);

    if (currentAudio && !isPlaying) playAudio();
  }

  function pauseTimer() {
    if (!isRunning) return;
    clearInterval(intervalId);
    isRunning = false;
    if (currentAudio && isPlaying) pauseAudio();
  }

  function resetTimer() {
    clearInterval(intervalId);
    isRunning = false;
    timer = timerDuration;
    updateTimerDisplay(timer);
    pomodoroStatus.textContent = '';
    stopAmbientSound();
  }

  startBtn.addEventListener('click', startTimer);
  pauseBtn.addEventListener('click', pauseTimer);
  resetBtn.addEventListener('click', resetTimer);

  function populateTaskSelect() {
    while (taskSelect.options.length > 1) {
      taskSelect.remove(1);
    }
    tasks.forEach((task, index) => {
      if (!task.completed) {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = task.name;
        taskSelect.appendChild(option);
      }
    });
  }

  const ambientSelect = document.getElementById('ambient-select');
  const toggleSoundBtn = document.getElementById('toggle-sound');

  const ambientSounds = {
    lofi: 'audio/lofi.mp3',
    rain: 'audio/rain.wav'
  };

  let currentAudio = null;
  let isPlaying = false;

  function playAudio() {
    if (currentAudio) {
      currentAudio.play();
      isPlaying = true;
      toggleSoundBtn.textContent = 'Pause';
    }
  }

  function pauseAudio() {
    if (currentAudio) {
      currentAudio.pause();
      isPlaying = false;
      toggleSoundBtn.textContent = 'Play';
    }
  }

  function stopAmbientSound() {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      isPlaying = false;
      toggleSoundBtn.textContent = 'Play';
    }
  }

  function playAmbientSound(soundKey) {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }
    if (!soundKey || !ambientSounds[soundKey]) {
      currentAudio = null;
      isPlaying = false;
      return;
    }
    currentAudio = new Audio(ambientSounds[soundKey]);
    currentAudio.loop = true;
    currentAudio.volume = 0.4;
    playAudio();
  }

  ambientSelect.addEventListener('change', () => {
    const selectedSound = ambientSelect.value;
    playAmbientSound(selectedSound);
  });

  toggleSoundBtn.addEventListener('click', () => {
    if (!currentAudio) {
      const selectedSound = ambientSelect.value.trim();
      if (!selectedSound) return;
      playAmbientSound(selectedSound);
      return;
    }
    isPlaying ? pauseAudio() : playAudio();
  });

  const mysteryTasks = [
    "Do 10 jumping jacks 🏃",
    "Drink a glass of water 💧",
    "Send a meme to a friend 😂",
    "Take a 3-minute dance break 💃",
    "Go stretch your arms 🧘",
    "Write down one thing you're proud of 📓"
  ];

  renderTasks();
  renderNotes();
  populateTaskSelect();
  showSection('tasks');
});

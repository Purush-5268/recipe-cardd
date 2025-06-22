const welcomeScreen = document.getElementById('welcome-screen');
const recipeScreen = document.getElementById('recipe-screen');
const vegBtn = document.getElementById('veg-btn');
const nonVegBtn = document.getElementById('nonveg-btn');
const toggleBtn = document.getElementById('toggle-ingredients');
const ingredients = document.getElementById('ingredients');
const startBtn = document.getElementById('start-cooking');
const resetBtn = document.getElementById('reset');
const timerDisplay = document.getElementById('timer');
const steps = document.querySelectorAll('#steps li');
const progress = document.getElementById('progress');
const animationBox = document.getElementById('animation-box');

let currentStep = 0;
let countdown;
let totalTime = 45 * 60;

// VEG and NON-VEG Ingredient Sets
const vegIngredients = [
  "1 cup flour",

"1/2 cup cocoa powder",

"1 cup sugar",

"1/2 cup milk",

"1/2 cup oil",

"1 tsp baking soda",

"1 tsp vanilla essence",

"1 tbsp vinegar or lemon juice (as egg substitute)"
];

const nonVegIngredients = [
  "1 cup flour",
  "1/2 cup cocoa powder",
  "1 cup sugar",
  "2 eggs",
  "1/2 cup milk",
  "2 tbsp egg white powder",
  "1/2 tsp gelatin"
];

// Function to load selected ingredient list
function loadIngredients(list) {
  ingredients.innerHTML = '';
  list.forEach(item => {
    const li = document.createElement('li');
    li.classList.add('ingredient-item');
    li.textContent = item;
    li.addEventListener('click', () => {
      animationBox.textContent = `🥣 Adding ${item}...`;
      animationBox.classList.add('show');
      setTimeout(() => {
        animationBox.classList.remove('show');
      }, 1500);
    });
    ingredients.appendChild(li);
  });
}

// Show Recipe with VEG Ingredients
vegBtn.addEventListener('click', () => {
  welcomeScreen.classList.add('hidden');
  recipeScreen.classList.remove('hidden');
  loadIngredients(vegIngredients);
});

// Show Recipe with NON-VEG Ingredients
nonVegBtn.addEventListener('click', () => {
  welcomeScreen.classList.add('hidden');
  recipeScreen.classList.remove('hidden');
  loadIngredients(nonVegIngredients);
});

// Toggle Ingredients Visibility
toggleBtn.addEventListener('click', () => {
  ingredients.classList.toggle('hidden');
  toggleBtn.textContent = ingredients.classList.contains('hidden') ? '▶ Show Ingredients' : '▼ Hide Ingredients';
});

// Start Cooking Steps & Timer
startBtn.addEventListener('click', () => {
  if (currentStep === 0) startTimer();

  if (currentStep < steps.length) {
    steps[currentStep].style.backgroundColor = '#00ffcc';
    steps[currentStep].style.color = '#000';
    progress.style.width = `${((currentStep + 1) / steps.length) * 100}%`;
    currentStep++;
    startBtn.textContent = currentStep < steps.length ? '🍽 Next Step' : '✅ Done!';
  } else {
    startBtn.disabled = true;
    startBtn.textContent = '🎉 Completed!';
    startBtn.classList.remove('glow');
  }
});

// Timer Function
function startTimer() {
  countdown = setInterval(() => {
    if (totalTime <= 0) {
      clearInterval(countdown);
      timerDisplay.textContent = "Time's up! ⏰";
      return;
    }

    totalTime--;
    const mins = String(Math.floor(totalTime / 60)).padStart(2, '0');
    const secs = String(totalTime % 60).padStart(2, '0');
    timerDisplay.textContent = `Time Left: ${mins}:${secs}`;
  }, 1000);
}

// Reset Everything
resetBtn.addEventListener('click', () => {
  clearInterval(countdown);
  totalTime = 45 * 60;
  timerDisplay.textContent = "Time Left: 45:00";
  currentStep = 0;
  progress.style.width = '0%';
  startBtn.disabled = false;
  startBtn.textContent = '🍽 Start Cooking';
  ingredients.classList.add('hidden');
  toggleBtn.textContent = '▶ Show Ingredients';

  steps.forEach(step => {
    step.style.backgroundColor = '';
    step.style.color = '';
  });

  recipeScreen.classList.add('hidden');
  welcomeScreen.classList.remove('hidden');
});


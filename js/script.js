const dropdownItems = document.querySelectorAll('.dropdown-item');
const dropdownButton = document.getElementById('difficultyButton');
const playButton = document.getElementById('play-button');

let currentDifficulty = 'easy'; // Default difficulty

// Handle dropdown click
dropdownItems.forEach(item => {
  item.addEventListener('click', function (e) {
    e.preventDefault();

    const selectedValue = this.getAttribute('data-value');
    dropdownButton.textContent = this.textContent;
    localStorage.setItem('difficulty', selectedValue);
    currentDifficulty = selectedValue;
  });
});

// Restore saved difficulty on load
window.addEventListener('load', function () {
  const savedDifficulty = localStorage.getItem('difficulty');
  if (savedDifficulty) {
    currentDifficulty = savedDifficulty;
    const selectedItem = document.querySelector(`[data-value="${savedDifficulty}"]`);
    if (selectedItem) {
      dropdownButton.textContent = selectedItem.textContent;
    }
  }
});

// Only one handler for Play button
playButton.addEventListener('click', function () {
  handleDifficultyChange(currentDifficulty);
});

// Handle redirection
function handleDifficultyChange(difficulty) {
  switch (difficulty) {
    case 'easy':
      window.location.href = 'index_easy.html';
      break;
    case 'medium':
      window.location.href = 'index_medium.html';
      break;
    case 'hard':
      window.location.href = 'index_hard.html';
      break;
    case 'CHALLENGE': // Make sure this matches data-value
      window.location.href = 'index_timeMode.html';
      break;
    default:
      alert('Please choose a difficulty!');
  }
}

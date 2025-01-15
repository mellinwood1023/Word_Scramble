
// Get all dropdown items
const dropdownItems = document.querySelectorAll('.dropdown-item');
const dropdownButton = document.getElementById('difficultyButton');
// let currentDifficulty = 'easy'; // default value

// Add click event listener to each dropdown item
dropdownItems.forEach(item => {
    item.addEventListener('click', function (e) {
        e.preventDefault(); // Prevent default anchor behavior
        // currentDifficulty = this.getAttribute('data-value');

        // Get the selected value
        const selectedValue = this.getAttribute('data-value');

        // Update button text
        dropdownButton.textContent = this.textContent;

        // save to localSstorage
        localStorage.setItem('difficulty', selectedValue);

        // upon clicking play go to proper page
        const button = document.querySelector('.btn');
        button.addEventListener('click', function () {
            handleDifficultyChange(selectedValue);
        });
    });
});

// restore saved difficulty on page load
window.addEventListener('load', function () {
    const savedDifficulty = localStorage.getItem('difficulty');
    if (savedDifficulty) {
        currentDifficulty = savedDifficulty;
        // update buton text to match saved
        const selectedItem = this.document.querySelector(`[data-value="${savedDifficulty}"]`);
        if (selectedItem) {
            dropdownButton.textContent = selectedItem.textContent;
        }
    }
});

// Function to handle the difficulty change
function handleDifficultyChange(difficulty) {
    console.log('Selected difficulty:', difficulty);
    // Add your logic here based on the selected difficulty
    switch (difficulty) {
        case 'easy':
            // link to easy page
            window.location.href = 'index_easy.html';
            break;
        case 'medium':
            // Handle medium mode
            window.location.href = 'index_medium.html';
            break;
        case 'hard':
            // Handle hard mode
            window.location.href = 'index_hard.html';
            break;
    }

}

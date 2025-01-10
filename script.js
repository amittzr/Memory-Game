
document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const movesElement = document.getElementById('step-counter'); // Select moves element
    const matchesElement = document.getElementById('match-counter'); // Select matches element
    const newGameButton = document.getElementById('new-game-button'); // Select the New Game button

    const rows = 6;
    const cols = 5;
    const totalPairs = 15; // Total number of image pairs
    let matchedPairs = 0;  // Counter for matched pairs
    let moves = 0;

    board.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
    board.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
  
    let allImages = [];

    const createBoard = () => {
        board.innerHTML = ''; // Clear the board
        matchedPairs = 0; // Reset matched pairs
        moves = 0; // Reset moves

        // Update stats
        updateStats();

        // Array of image paths (15 images)
        const imagePaths = Array.from({ length: 15 }, (_, i) => `assets/${i + 1}.jpg`);


        // Duplicate images to make pairs and shuffle
        allImages = [...imagePaths, ...imagePaths];
        allImages.sort(() => Math.random() - 0.5);

        // Create the board
        allImages.forEach((imagePath, index) => {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.dataset.index = index;

        // Add image to cell
        const img = document.createElement('img');
        img.src = imagePath;
        cell.appendChild(img);

        board.appendChild(cell);
        });
    };

  
    // Memory game interaction
    let firstPick = null;
    let secondPick = null;

    const updateStats = () => {
        movesElement.textContent = `Moves: ${moves}`;
        matchesElement.textContent = `Matches: ${matchedPairs}`;
      };
  
    board.addEventListener('click', (e) => {
      const cell = e.target.closest('.cell');
      if (!cell || cell.classList.contains('revealed') || cell === firstPick || cell === secondPick) return;
  
      // Reveal the clicked card
      cell.classList.add('revealed');
  
      if (!firstPick) {
        firstPick = cell; // Set the first pick
      } else if (!secondPick) {
        secondPick = cell; // Set the second pick
        moves++;

        // Check for a match
        const img1 = firstPick.querySelector('img').src;
        const img2 = secondPick.querySelector('img').src;
        if (img1 === img2) {
          // Match found: keep both cards revealed
          firstPick = null;
          secondPick = null;
          matchedPairs++;
          if (matchedPairs === totalPairs) {
            setTimeout(() => alert(`Congratulations! You won in ${moves} moves.`), 500);
          }
        }
      } else {
        // Hide the previously revealed unmatched cards
        firstPick.classList.remove('revealed');
        secondPick.classList.remove('revealed');
  
        // Set the new first pick
        firstPick = cell;
        secondPick = null;
      }
      updateStats();
    });

    newGameButton.addEventListener('click', () => {
        createBoard(); // Recreate the game board
      });
    
    createBoard(); // Initialize the game on page load
  });
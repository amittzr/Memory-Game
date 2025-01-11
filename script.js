
// document.addEventListener('DOMContentLoaded', () => {
//     const board = document.getElementById('board');
//     const movesElement = document.getElementById('step-counter'); // Select moves element
//     const matchesElement = document.getElementById('match-counter'); // Select matches element
//     const newGameButton = document.getElementById('new-game-button'); // Select the New Game button

//     const rows = 6;
//     const cols = 5;
//     const totalPairs = 15; // Total number of image pairs
//     let matchedPairs = 0;  // Counter for matched pairs
//     let moves = 0;

//     board.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
//     board.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
  
//     let allImages = [];

//     const createBoard = () => {
//         board.innerHTML = ''; // Clear the board
//         matchedPairs = 0; // Reset matched pairs
//         moves = 0; // Reset moves

//         // Update stats
//         updateStats();

//         // Array of image paths (15 images)
//         const imagePaths = Array.from({ length: 15 }, (_, i) => `assets/${i + 1}.jpg`);


//         // Duplicate images to make pairs and shuffle
//         allImages = [...imagePaths, ...imagePaths];
//         allImages.sort(() => Math.random() - 0.5);

//         // Create the board
//         allImages.forEach((imagePath, index) => {
//         const cell = document.createElement('div');
//         cell.className = 'cell';
//         cell.dataset.index = index;

//         // Add image to cell
//         const img = document.createElement('img');
//         img.src = imagePath;
//         cell.appendChild(img);

//         board.appendChild(cell);
//         });
//     };

  
//     // Memory game interaction
//     let firstPick = null;
//     let secondPick = null;

//     const updateStats = () => {
//         movesElement.textContent = `Moves: ${moves}`;
//         matchesElement.textContent = `Matches: ${matchedPairs}`;
//       };
  
//     board.addEventListener('click', (e) => {
//       const cell = e.target.closest('.cell');
//       if (!cell || cell.classList.contains('revealed') || cell === firstPick || cell === secondPick) return;
  
//       // Reveal the clicked card
//       cell.classList.add('revealed');
  
//       if (!firstPick) {
//         firstPick = cell; // Set the first pick
//       } else if (!secondPick) {
//         secondPick = cell; // Set the second pick
//         moves++;

//         // Check for a match
//         const img1 = firstPick.querySelector('img').src;
//         const img2 = secondPick.querySelector('img').src;
//         if (img1 === img2) {
//           // Match found: keep both cards revealed
//           firstPick = null;
//           secondPick = null;
//           matchedPairs++;
//           if (matchedPairs === totalPairs) {
//             setTimeout(() => alert(`Congratulations! You won in ${moves} moves.`), 500);
//           }
//         }
//       } else {
//         // Hide the previously revealed unmatched cards
//         firstPick.classList.remove('revealed');
//         secondPick.classList.remove('revealed');
  
//         // Set the new first pick
//         firstPick = cell;
//         secondPick = null;
//       }
//       updateStats();
//     });

//     newGameButton.addEventListener('click', () => {
//         createBoard(); // Recreate the game board
//       });
    
//     createBoard(); // Initialize the game on page load
//   });

document.addEventListener('DOMContentLoaded', () => {
  const homePage = document.getElementById('home-page');
  const gamePage = document.getElementById('game-page');
  const board = document.getElementById('board');
  const newGameButton = document.getElementById('new-game-button');
  const returnHomeButton = document.getElementById('return-home-button');
  const movesElement = document.getElementById('step-counter');
  const matchesElement = document.getElementById('match-counter');
  const titleLevel = document.getElementById('level-title');
  const startGameButton = document.getElementById('startGameButton');

  let rows, cols, totalPairs, matchedPairs, moves;
  let firstPick = null;
  let secondPick = null;
  let currentTheme = "assets/normal";
  let level = 'medium';

  // Set default selections on page load
  document.querySelector('.level-button[data-level="medium"]').classList.add('selected');
  document.querySelector('.theme-btn[data-theme="Animals"]').classList.add('selected');

  const setupGame = () => {
    // let imageFolder = "assets/normal";
      if (level === 'easy') {
          rows = 4;
          cols = 4;
      } else if (level === 'medium') {
          rows = 6;
          cols = 5;
      } else if (level === 'hard') {
          rows = 8;
          cols = 6;
      }
      totalPairs = (rows * cols) / 2;
      matchedPairs = 0;
      moves = 0;
      board.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
      board.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
      titleLevel.textContent = `${level.toUpperCase()}`;
      createBoard(currentTheme);
  };

  const createBoard = (imageFolder) => {
      board.innerHTML = '';
      const formats = ['jpg', 'jpeg', 'png'];

      const imagePaths = Array.from({ length: totalPairs }, (_, i) => `${imageFolder}/${i + 1}.jpg`);
      const allImages = [...imagePaths, ...imagePaths];
      allImages.sort(() => Math.random() - 0.5);

      allImages.forEach((imagePath) => {
          const cell = document.createElement('div');
          cell.className = 'cell';
          if(currentTheme === 'assets/simpson'){
            cell.classList.add('cell-simpsons');
            cell.classList.remove('cell-animals');
          }
          else{
            cell.classList.add('cell-animals');
            cell.classList.remove('cell-simpsons');
          }
          const img = document.createElement('img');
          img.src = imagePath;
          cell.appendChild(img);
          board.appendChild(cell);
      });

      matchedPairs = 0;
      moves = 0;
      
      updateStats();
  };

  const updateStats = () => {
      movesElement.textContent = `Moves: ${moves}`;
      matchesElement.textContent = `Matches: ${matchedPairs}`;
  };

  // const resetSelections = () => {
  //     firstPick?.classList.remove('revealed');
  //     secondPick?.classList.remove('revealed');
  //     firstPick = null;
  //     secondPick = null;
  // };

  // board.addEventListener('click', (e) => {
  //     const cell = e.target.closest('.cell');
  //     if (!cell || cell.classList.contains('revealed') || cell === firstPick || cell === secondPick) return;

  //     cell.classList.add('revealed');
  //     if (!firstPick) {
  //         firstPick = cell;
  //     } else if (!secondPick) {
  //         secondPick = cell;
  //         moves++;
  //         const img1 = firstPick.querySelector('img').src;
  //         const img2 = secondPick.querySelector('img').src;
  //         if (img1 === img2) {
  //             firstPick = null;
  //             secondPick = null;
  //             matchedPairs++;
  //             if (matchedPairs === totalPairs) {
  //                 setTimeout(() => alert(`Congratulations! You won in ${moves} moves.`), 500);
  //             }
  //         } else {
  //             resetSelections();
  //         }
  //     }
  //     updateStats();
  // });

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
  

  document.querySelectorAll('.level-button').forEach((button) => {
    button.addEventListener('click', (e) => {
        // Mark the selected level
        document.querySelectorAll('.level-button').forEach((btn) => btn.classList.remove('selected'));
        e.target.classList.add('selected');
  
        level = e.target.dataset.level;
  
        // Enable the start button if both theme and level are selected
        if (currentTheme && level) {
          startGameButton.disabled = false;
        }
    });
});

   // Theme selection
document.querySelectorAll('.theme-btn').forEach((button) => {
  button.addEventListener('click', (e) => {
      // Mark the selected theme
      document.querySelectorAll('.theme-btn').forEach((btn) => btn.classList.remove('selected'));
      document.querySelectorAll('.theme-btn').forEach((btn) => btn.classList.remove('simpson-select'));

      e.target.classList.add('selected');

      const theme = e.target.dataset.theme;
      currentTheme = theme === "Simpson" ? "assets/simpson" : "assets/normal";

      if (theme === "Simpson") {
        e.target.classList.add('simpson-select');
        e.target.classList.remove('selected');
        returnHomeButton.classList.add('simpson-select-home');
        newGameButton.classList.add('simpson-select-home');
      } 
      else {
        e.target.classList.remove('simpson-select');
        returnHomeButton.classList.remove('simpson-select-home');
        newGameButton.classList.remove('simpson-select-home');
      }

      // // Enable the start button if both theme and level are selected
      // if (level && currentTheme) {
      //   startGameButton.disabled = false;
      // }
  });
});

  // Start game button
  startGameButton.addEventListener('click', () => {
    homePage.style.display = 'none';
    gamePage.style.display = 'block';
    setupGame();
  });


  newGameButton.addEventListener('click', setupGame);

  returnHomeButton.addEventListener('click', () => {
      gamePage.style.display = 'none';
      homePage.style.display = 'block';
  });
});


/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * The Book Title Hunter - Word Game
 * Game.js */

 class Game {
    constructor () {
        this.missed = 0;
        this.phrases = this.createPhrases();
        this.activePhrase = null;
    }

    /**
     * Begins game by selecting a random phrase and displaying it to user. 
     * Will also call a function to reset the screen to original state from a previous game.
     */
    startGame() {
        this.activePhrase = null;
        this.resetGameBoard();
        document.getElementById("overlay").style.display = "none";
        this.activePhrase = this.getRandomPhrase();
        this.activePhrase.addPhraseToDisplay();
    }

    /**
     * Will reset the screen to original state from a previous game.
     */
    resetGameBoard() {  
        //remove the letters from the previous game's book title
        const phraseUL = document.querySelector("#phrase ul");
        while (phraseUL.firstChild) {
            phraseUL.removeChild(phraseUL.firstChild);
        } 

        //reset all the chosen keys on the screen's qwerty key board to unchosen
        const keys = Array.from(document.getElementsByClassName('key'));
        keys.forEach(key => {
            key.disabled = false;
            key.classList.remove("chosen", "wrong");
        });

        //reset all the hearts (tries)
        const hearts = Array.from(document.getElementsByClassName("tries"));
        hearts.forEach(heart => {
            heart.firstChild.src = "images/liveHeart.png";
            heart.firstChild.alt = "Heart Icon";
        });

        //reset the hint button
        const hintButton = document.getElementsByClassName("hint")[0];
        hintButton.classList.remove("hidden", "show-author");
        hintButton.textContent = "See the Author, Lose a Heart";
    }

    /**
    * Creates phrases for use in game
    * Instantiates the a book object and randomly chooses 5 titles from an array of book objects
    * @return {array} An array of 5 book titles that could be used in the game
    */
     createPhrases() {
        const bookList = new Books().list;
        const phraseArray = [];
        let i = 0;

        while (i < 5) {
            let randomIndex = Math.floor(Math.random() * bookList.length);
            let testPhrase = bookList[randomIndex].book.toLowerCase();
            if (!phraseArray.includes(testPhrase)) {
                phraseArray.push(testPhrase);
                i++;
           }
        }
        return phraseArray;
    }

    /**
    * Selects a random book title from phrases property - an array of 5 book titles
    * @return {Object} Phrase object chosen to be used
    */
    getRandomPhrase() {
        const newPhrase = this.phrases[Math.floor(Math.random() * this.phrases.length)];
        return new Phrase(newPhrase);
    };

    /**
     * This will process the letter the user selected, 
     * display the leeter if it is in the book title, determine if the letter completes the game.
     * @param {object} button - Letter Button user selected 
     */
    handleInteraction(button) {
        const letter = button.textContent;
        //letter is in book title
        if (this.activePhrase.checkLetter(letter)) {
            this.activePhrase.showMatchedLetter(letter);
            if (!this.checkForWin()) {
                button.disabled = true;
                button.classList.add("chosen");
            } else {
                this.gameOver(true);
            }
        //not in book title
        } else {
            button.disabled = true;
            button.classList.add("wrong");
            if (this.removeLife()) {
                this.gameOver(false);
            }
        }
    }

    /**	Checks for winning move
    * @return {boolean} True if game has been won, false if game wasn't
    */
    checkForWin() {
        const numLettersPhrase = this.activePhrase.phrase.replace(/\s+/g, '').length;   
        const numLettersGuess = document.getElementsByClassName("show").length;
        return (numLettersPhrase === numLettersGuess);
    }

    /**
    * Increases the value of the missed property
    * Removes a life from the scoreboard
    * Checks if player has remaining lives and ends game if player is out 
    */
    removeLife() {
        const triesArray = document.getElementsByClassName("tries");
        const numTries = triesArray.length;
        
        triesArray[this.missed].firstChild.src = "images/lostHeart.png";
        triesArray[this.missed].firstChild.alt = "Lost Heart Icon";
        if (++this.missed === 4) {
            const hintArea = document.getElementsByClassName("hint")[0];
            if (document.getElementsByClassName("show-author").length === 0) {
                hintArea.classList.add("hidden");
            }
        }
        return (this.missed === numTries);
    }

    /**
    *	Displays game over message
    *	@param {boolean} gameWon - Whether or not the user won the game 
    */
    gameOver(gameWon) {
        const gameOverlay = document.getElementById("overlay");

        if (gameWon) {
            gameOverlay.classList.add("win");
            document.getElementById("overlay").style.display = "block";
            this.createFinishedMessage(true);
        } else {
            gameOverlay.classList.add("lose");
            document.getElementById("overlay").style.display = "block";
            this.createFinishedMessage(false);
        }
    }

    /**
    *	Creates game over message
    *	@param {boolean} win - Whether or not the user won the game 
    */
    createFinishedMessage(win) {
        const bookMessage = `<em>${this.activePhrase.phrase}</em> by ${this.findAuthor()}`; 
        const gameOverElement = document.getElementById("game-over-message");
        const gameWonMessage = "You have won the Game!";
        const gameLostMessage = "Your guesses are up";

        if (win) {
            gameOverElement.innerHTML = `<div id='win-message'>${gameWonMessage}</div>`;
        } else {
            gameOverElement.innerHTML = `<div id='lose-message'>${gameLostMessage}</div>`;
        }
        gameOverElement.innerHTML += `<div>${bookMessage}</div>`;
    }

    /**
    *	Handles 'Show Author' button processing - puts author name in hint button.
    *	@param {object} button - pass button object when user clicks Author Hint button 
    */
    handleHint(button) {
        button.classList.add("show-author");
        button.classList.remove("hidden");
        button.innerHTML = this.findAuthor();
        this.removeLife();
    }

    /**
    *	Gets author for current book title (activePhrase) from Book class array
    */
    findAuthor() {
        const bookList = new Books().list;
        const author = bookList.filter((book) => book.book.toLowerCase() === this.activePhrase.phrase);
        return author[0].author;
    }
 }

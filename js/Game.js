/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

 class Game {
    constructor () {
        this.missed = 0;
        this.phrases = this.createPhrases();
        this.activePhrase = null;
    }

    /**
     * Begins game by selecting a random phrase and displaying it to user 
     */
    startGame() {
        this.activePhrase = null;
        this.resetGameBoard();
        document.getElementById("overlay").style.display = "none";
        this.activePhrase = this.getRandomPhrase();
        this.activePhrase.addPhraseToDisplay();
    }

    resetGameBoard() {  
        const phraseUL = document.querySelector("#phrase ul");
        while (phraseUL.firstChild) {
            phraseUL.removeChild(phraseUL.firstChild);
        } 

        const keys = Array.from(document.getElementsByClassName('key'));
        keys.forEach(key => {
            key.disabled = false;
            key.classList.remove("chosen", "wrong");
        });

        const hearts = Array.from(document.getElementsByClassName("tries"));
        hearts.forEach(heart => {
            heart.firstChild.src = "images/liveHeart.png";
            heart.firstChild.alt = "Heart Icon";
        });

        const hintButton = document.getElementsByClassName("hint")[0];
        hintButton.classList.remove("hidden", "show-author");
        hintButton.textContent = "See the Author, Lose a Heart";
    }

    /**
    * Creates phrases for use in game
    * @return {array} An array of phrases that could be used in the game
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
    * Selects random phrase from phrases property
    * @return {Object} Phrase object chosen to be used
    */
    getRandomPhrase() {
        const newPhrase = this.phrases[Math.floor(Math.random() * this.phrases.length)];
        return new Phrase(newPhrase);
    };

    handleInteraction(button) {
        const letter = button.textContent;
        if (this.activePhrase.checkLetter(letter)) {
            this.activePhrase.showMatchedLetter(letter);
            if (!this.checkForWin()) {
                button.disabled = true;
                button.classList.add("chosen");
            } else {
                this.gameOver(true);
            }
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
            document.getElementsByClassName("hint")[0].classList.add("hidden");
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

    handleHint(button) {
        button.classList.add("show-author");
        button.innerHTML = this.findAuthor();
        this.removeLife();
    }

    findAuthor() {
        const bookList = new Books().list;
        const author = bookList.filter((book) => book.book.toLowerCase() === this.activePhrase.phrase);
        return author[0].author;
    }
 }

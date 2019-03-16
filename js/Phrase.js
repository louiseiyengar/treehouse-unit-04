/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * The Book Title Hunter - Word Game
 * Phrase.js */

 class Phrase {
    constructor(phrase) {
        this.phrase = phrase;
    }

    /**
    * Display phrase on game board
    */
    addPhraseToDisplay() {
        const phraseDiv = document.querySelector("#phrase ul");
        const phraseArray = this.phrase.split(" ");

        phraseArray.forEach(word => {
            //Don't want words to be word-wrapped(split on different lines), 
            //so add span around each word li's
            const wordSpan = document.createElement("SPAN");
            wordSpan.classList.add("word-span");
            phraseDiv.appendChild(wordSpan);

            //An li for each letter in a word
            for (let i = 0; i < word.length; i++) {
                const li = document.createElement("LI");
                li.classList.add("hide", "letter", word[i]);
                li.textContent = word[i];
                wordSpan.appendChild(li);
            }

            //add space after each word
            const spaceLi = document.createElement("LI");
            spaceLi.classList.add("space");
            phraseDiv.appendChild(spaceLi);
        });
    }

    /**
     * Checks if the selected letter is in the book title (activePhrase).
     * @param {string} letter - Letter user has selected 
     * @return {boolean} true if letter selected is in book title, false if not
     */
    checkLetter(letter) {
        return (this.phrase.indexOf(letter) > -1);
    }

    /**
     * Shows the matched selected letter each time the letter appears in the book title.
     * @param {string} letter - Letter user has selected 
     */
    showMatchedLetter(letter) {
        const letters = document.querySelectorAll(`.${letter}`);
        letters.forEach(letter => {
            letter.classList.remove("hide");
            letter.classList.add("show");
        });
    }
}

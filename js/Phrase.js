/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
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

        for (let i = 0; i < this.phrase.length; i++) {
            const li = document.createElement("LI");
            
            if (/\s/.test(this.phrase[i])) {
                li.classList.add("space");
                phraseDiv.appendChild(li);
            } else {
                li.classList.add("hide", "letter", this.phrase[i]);
                li.textContent = this.phrase[i];
                phraseDiv.appendChild(li);
            }
        }
    }

    checkLetter(letter) {
        return (this.phrase.indexOf(letter) > -1);
    }

    showMatchedLetter(letter) {
        const letters = document.querySelectorAll(`.${letter}`);
        letters.forEach(letter => {
            letter.classList.remove("hide");
            letter.classList.add("show");
        });
    }
}

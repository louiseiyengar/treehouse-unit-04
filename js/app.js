/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

/**
 * ●	Inside the app.js file, declare a new variable called game that’s not set to anything.
●	Then, add a "click" event listener to the HTML `<button>` element with an `id` of
`btn__reset`. Inside the callback function for this click event listener, use your `game` 
variable to instantiate a new Game object. Call the `startGame()` method on this new Game object.
 */

 var game = null;

 document.addEventListener("click", (e) => {
     if (e.target.id && e.target.id === "btn__reset") {
        game = new Game();
        game.startGame()
     } else if (e.target.className && e.target.className === "key") {
        game.handleInteraction(e.target);
     }
 });

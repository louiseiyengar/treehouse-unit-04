/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

var game = null;

document.addEventListener("click", (e) => {
   if (e.target.id && e.target.id === "btn__reset") {
      game = new Game();
      game.startGame();
   } else if (e.target.className && e.target.className === "key") {
      game.handleInteraction(e.target);
   }
}, false);

document.addEventListener("keyup", (e) => {
   const keys = Array.from(document.getElementsByClassName("key"));
   if (/^[a-zA-Z ]$/.test(e.key)) {
      keys.forEach(key => {
         if ((key.innerText === e.key) && (!key.disabled)) {
            game.handleInteraction(key);
         }
      });
   }
}, false);

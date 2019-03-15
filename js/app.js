/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

document.addEventListener('DOMContentLoaded', () => {

   var game = null;

   document.addEventListener("click", (e) => {
      if (e.target.id && e.target.id === "btn__reset") {
         game = new Game();
         game.startGame();
      } else if (e.target.className) {
         if (e.target.className === "key") {
            game.handleInteraction(e.target);
         } else if (e.target.className === "hint") {
            game.handleHint(e.target);
         }
      }
   }, false);

   document.addEventListener("keyup", (e) => {
      if (/^[a-zA-Z ]$/.test(e.key)) {
         const keys = Array.from(document.getElementsByClassName("key"));
         keys.forEach(key => {
            if ((key.innerText === e.key) && (!key.disabled)) {
               game.handleInteraction(key);
            }
         });
      }
   }, false);

});

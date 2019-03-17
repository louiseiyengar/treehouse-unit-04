/** Treehouse FSJS Techdegree
 *  Project 4 - OOP Game App
 *  The Book Title Hunter - Word Game
*/

document.addEventListener('DOMContentLoaded', () => {
   var game = null;

   document.addEventListener("click", (e) => {
      //handle start game button
      if (e.target.id && e.target.id === "btn__reset") {
         game = new Game();
         game.startGame();
      } else if (e.target.className) {
         //handle clicking on a key on the screen
         if (e.target.className === "key") {
            game.handleInteraction(e.target);
         //handle the 'See Author' hint button
         } else if (e.target.className === "hint") {
            game.handleHint(e.target);
         }
      }
   }, false);

   //Handle typing a letter on a keyboard 
   document.addEventListener("keyup", (e) => {
      //need to ensure we are viewing the 'phrase and keyboard' screen
      if (document.getElementById("overlay").style.display === "none") {
         if (/^[a-zA-Z ]$/.test(e.key)) {
            const keys = Array.from(document.getElementsByClassName("key"));
            key = keys.filter(key => ((key.innerText === e.key) && (!key.disabled)));
            if (key.length === 1) { game.handleInteraction(key[0]); }
         }
      } else {
         //for overlay screen, ensure that typing on keyboard causes you
         //to remain on reset button and you can't tab off the button.
         document.getElementById("btn__reset").focus();
         if(e.key === "Tab") {
            e.preventDefault();
         }
      }
   }, false);
});

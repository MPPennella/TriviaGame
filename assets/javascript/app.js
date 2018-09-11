var game = {
    questions = [],

    // Method setting up the game splash screen and loading questions
    start() {
        // Set up splash screen in #game

        // Placeholder
        $("#game").text("START");

        // TODO: Determine random order of questions loaded from questions array

    }
}

// Begin game when document loads
$(document).ready( game.start );
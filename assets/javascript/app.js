var game = {
    questionData: [],

    // Method setting up the game splash screen and loading questions
    start() {
        // Set up splash screen in #game
        let target = $("#game");
        target.empty();

        let startButton = $("<button>").text("Start");
        
        startButton.on("click", game.askNextQuestion);

        target.append(startButton);
        
        // TODO: Determine random order of questions loaded from questionData array

    },

    askNextQuestion() {
        let target = $("#game");
        target.empty();

        // Placeholder
        let questionText = "What is the answer to this question?";

        // Placeholder
        let answer1Text = "Answer A";

        let answer1Btn = $("<button>").text(answer1Text);
        answer1Btn.on("click", game.showAnswer );

        target.append($("<div>").text(questionText));
        target.append(answer1Btn);
    }, 

    showAnswer() {
        let target = $("#game");
        target.empty();

        let answerImg = $("<img>").attr( {src:"assets/images/TEST.png", alt:"Placeholder" } );
        let answerExpText = "Detailed explanation of answer";

        target.append(answerImg);
        target.append( $("<div>").text(answerExpText) );
    }
}

// Begin game when document loads
$(document).ready( game.start );
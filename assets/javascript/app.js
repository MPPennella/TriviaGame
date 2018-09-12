var game = {
    questionData: [
        {
            questionText: "Which of these artists was known as the Thin White Duke?",
            answers: [ 
                "David Bowie",
                "Elton John",
                "Freddie Mercury",
                "Paul McCartney"
            ],
            img: "thin_white_duke.png",
            explanation: "David Bowie adpoted the performance personna of the Thin White Duke in 1975. Departing from his previous flamboyant glam personnas, the Duke dressed in more conservative cabaret attire. The Duke personna was short-lived, as it was quietly retired after pro-Fascist statements made while being interviewed as the Duke personna stirred up controversy."
        }
    ],

    // Method setting up the game splash screen and loading questions
    start() {
        // Set up splash screen in #game
        let target = $("#game");
        target.empty();

        let startButton = $("<button>").text("Start");
        
        startButton.on("click", game.showNextQuestion);

        target.append(startButton);
        
        // TODO: Determine random order of questions loaded from questionData array

    },

    showNextQuestion() {
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

        // Set timer to move to next phase
        // Placeholder
        let questionsLeft = false;
        setTimeout( questionsLeft ? game.showNextQuestion : game.showScore, 1000);
    },

    showScore() {
        let target = $("#game");
        target.empty();

        target.append( $("<div>").text("Your final score is: ??") )
    }
}

// Begin game when document loads
$(document).ready( game.start );
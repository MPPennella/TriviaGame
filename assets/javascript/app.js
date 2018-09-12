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

    questionList: [],
    currentQuestion: {},

    // Method setting up the game splash screen and loading questions
    start() {
        // Set up splash screen in #game
        let target = $("#game");
        target.empty();

        let startButton = $("<button>").text("Start");
        startButton.on("click", game.showNextQuestion);
        target.append(startButton);
        
        // Copy questions from raw questionData array to questionList array that will be mutated
        // TODO: Randomize order of questions loaded from questionData array
        game.questionList = [...game.questionData];
    },

    showNextQuestion() {
        // Remove a question from the array, set it to be the current question, and create a reference
        let question = game.currentQuestion = game.questionList.pop();

        let target = $("#game");
        target.empty();

        // Display the question
        target.append($("<div>").text( question.questionText ));
        
        // Display buttons for each answer
        // TODO: Randomize order of answers
        for (let i=0; i<question.answers.length; i++) {
            let answerBtn = $("<button>").text( question.answers[i]);
            answerBtn.on("click", game.showAnswer );

            target.append(answerBtn);
        }
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
        let questionsLeft = game.questionList.length;
        setTimeout( questionsLeft>0 ? game.showNextQuestion : game.showScore, 1000);
    },

    showScore() {
        let target = $("#game");
        target.empty();

        target.append( $("<div>").text("Your final score is: ??") )
    }
}

// Begin game when document loads
$(document).ready( game.start );
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
            img: "thin_white_duke.jpg",
            explanation: "David Bowie adpoted the performance personna of the Thin White Duke in 1975. Departing from his previous flamboyant glam personnas, the Duke dressed in more conservative cabaret attire. The Duke personna was short-lived, as it was quietly retired after pro-Fascist statements made while being interviewed as the Duke personna stirred up controversy."
        },
        {
            questionText: "Which artist controversially won the 1989 Grammy Award for Best Hard Rock/Metal Performance Vocal or Instrumental?",
            answers: [ 
                "Jethro Tull",
                "Simon and Garfunkel",
                "AC/DC",
                "Heart"
            ],
            img: "flute_heavy_metal.jpg",
            explanation: "In a huge upset, Jethro Tull's album Crest of a Knave won the 1989 Grammy Award for Best Hard Rock/Metal Performance Vocal or Instrumental, beating out heavy favorite Metallica. Even the band themselves didn't expect to win, and chose not to attend the ceremony. After the win, the band's label took out an add depicting frontman Ian Anderson's signature instrument – the flute – declaring \"The flute is a heavy metal instrument\"."
        }
    ],

    // Parameters for storing quiz info
    questionList: [],
    currentQuestion: {},
    correctAnswer: "",

    // Parameters for timer control
    timer: 0,
    timeLeft: 0,

    // Parameters for score tracking
    correct: 0,
    incorrect: 0,
    timeouts: 0,

    // Method setting up the game splash screen and loading questions
    start() {
        // Initialize game-state
        game.init();

        // Set up splash screen in #game
        let target = $("#game");
        target.empty();

        let startButton = $("<button>").text("Start");
        startButton.on("click", game.showNextQuestion);
        target.append(startButton);
        
    },

    // Sets game parameters to defaults for new game
    init() {
        // Copy questions from raw questionData array to questionList array that will be mutated
        this.questionList = this.randomize([...this.questionData]);

        // Re-initialize score trackers to zero
        this.correct = 0;
        this.incorrect = 0;
        this.timeouts = 0;
    },

    showNextQuestion() {
        // Remove a question from the array, set it to be the current question, and create a reference
        let question = game.currentQuestion = game.questionList.pop();
        // Save correct answer
        game.correctAnswer = question.answers[0];

        let target = $("#game");
        target.empty();

        // Setup timer
        game.timeLeft = 15;
        game.timer = setInterval(function() {
            game.timeLeft -= 1;
            if (game.timeLeft <= 0) {
                game.showAnswer("TIMEOUT");
            }
            console.log(game.timeLeft)
            $(".timer").text(game.timeLeft);
        }, 1000);

        // Display timer
        target.append( $("<div>").text("Time Left: ") );
        target.append( $("<div>").text(game.timeLeft).addClass("timer") );

        // Display the question
        target.append($("<div>").text( question.questionText ));
        
        // Randomize order of answers
        question.answers = game.randomize(question.answers);

        // Display buttons for each answer
        for (let i=0; i<question.answers.length; i++) {
            let answerBtn = $("<button>").text( question.answers[i]);
            answerBtn.on("click", game.showAnswer.bind(null, answerBtn.text()) );

            target.append(answerBtn);
        }
    }, 

    
    showAnswer(scoreInput) {
        // Clears timer from previous phase so it won't continue to run
        clearInterval(game.timer);

        let question = game.currentQuestion;

        let target = $("#game");
        target.empty();

        // Add to score depending on scoreInput value and display answer correctness to player
        let scoreFeedback = $("<div>");
        // "TIMEOUT" indicates player timed out
        if (scoreInput == "TIMEOUT") {
            game.timeouts++;
            scoreFeedback.text("You ran out of time");
        }
        // Otherwise, check if answer passed matches stored correct answer
        else if (scoreInput == game.correctAnswer) {
            game.correct++;
            scoreFeedback.text("Correct!");
        }
        else {
            game.incorrect++;
            scoreFeedback.text("Incorrect!");
        }
        target.append(scoreFeedback);
        
        let answerImg = $("<img>").attr( {src: "assets/images/"+question.img, alt: question.answers[0] } );
        let answerExpText = question.explanation;

        target.append(answerImg);
        target.append( $("<div>").text(answerExpText) );

        // Set timer to move to next phase
        let questionsLeft = game.questionList.length;
        setTimeout( questionsLeft>0 ? game.showNextQuestion : game.showScore, 5*1000);
    },

    // TODO: Add button to restart game
    showScore() {
        let target = $("#game");
        target.empty();

        target.append( $("<div>").text("Your final score is:") );
        target.append( $("<div>").text(`Correct Answers: ${game.correct}`) );
        target.append( $("<div>").text(`Incorrect Answers: ${game.incorrect}`) );
        target.append( $("<div>").text(`Unanswered: ${game.timeouts}`) );
        
    },

    // Uses Fisher-Yates shuffling method to randomize array elements
    randomize(array) {
        // Sorting algorithm
        for (let i=array.length-1; i>0; i--) {
            let j = Math.floor( Math.random()*(i+1) )

            // Swap values at indices i and j
            let temp=array[i];
            array[i]=array[j];
            array[j]=temp;    
        }

        return array;
    }
}

// Begin game when document loads
$(document).ready( game.start );
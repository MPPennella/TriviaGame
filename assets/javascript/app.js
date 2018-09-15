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
        },
        {
            questionText: "Which terminal illness did Queen singer Freddie Mercury die of in 1991?",
            answers: [ 
                "AIDS",
                "Leukemia",
                "Lung cancer",
                "Parkinson's disease"
            ],
            img: "freddie_mercury.jpg",
            explanation: "Freddie Mercurcy passed away from complications arising from AIDS on the 24th of November 1991, after years of public denial that he had contracted the HIV virus. He finally released a statement admitting he had AIDS less than 24 hours before his death."
        },
        {
            questionText: "Which artist had to pay a copyright infringment claim for the cover of their 1984 album?",
            answers: [ 
                "U2",
                "Bruce Springsteen",
                "The Talking Heads",
                "Rush"
            ],
            img: "unforgettable_fire.png",
            explanation: "The photograph of Ireland's Moydrum Castle used for the cover of U2's 1984 release The Unforgettable Fire was deemed to be infringing of the photograph used on the cover of the 1980 book \"In Ruins: The Once Great Houses of Ireland\", which featured the same castle shot from the same angle and using the same filter effect, the only notable difference being the presence of the band members in U2's version."
        },
        {
            questionText: "Queen member Brian May holds a PhD in what subject from Imperial College London?",
            answers: [ 
                "Astrophysics",
                "Music theory",
                "English literature",
                "Economics"
            ],
            img: "brian_may.jpg",
            explanation: "Brian May was studying for a PhD in Astrophysics at Imperial College, studying interplanetary dust in the solar system, when Queen began having major international success. He quit his doctoral studies in 1974 to pursue his music career, but reapplied in 2006, and successfully completed his doctoral thesis in 2007. He credits his ability to complete his thesis after such a long time gap to there being little research done in that particular subfield in the decades separating the beginning and end of his research."
        },
        {
            questionText: "Muppet drummer Animal is speculated to be inspired by which famously wild rock drummer?",
            answers: [ 
                "Keith Moon",
                "Neil Peart",
                "Ringo Starr",
                "Phil Collins"
            ],
            img: "animal.jpg",
            explanation: "While the Muppet character Animal is not a copy of any one drummer, he appears to be modeled after Keith Moon in personality, drumming style, and eyebrows."
        },
        {
            questionText: "Which Pink Floyd member was fired from the band after The Wall was recorded?",
            answers: [ 
                "Richard Wright",
                "Roger Waters",
                "David Gilmour",
                "Nick Mason"
            ],
            img: "richard_wright.jpg",
            explanation: "Keyboardist Richard Wright was let go during production of The Wall for his increasing lack of contributions to the band as relationships between the members deteriorated. To keep up appearances, he was retained as a salaried performer for The Wall tour, which, ironically, meant he was the only band member to turn a profit from that financially disastrous tour. After the later departure of Waters from the band, Wright began contributing to the band again and was rehired."
        }
    ],

    // Parameters for storing quiz info
    questionList: [],
    currentQuestion: {},
    correctAnswer: "",

    // Parameters for timer control
    timer: 0,
    timeLeft: 0,
    questionMaxTime: 15,
    answerShowTime: 5,

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

        let startButton = $("<button>").addClass("startBtn").text("Start");
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

        
        // Display the question
        target.append($("<div>").addClass("question").text( question.questionText ));
        
        // Randomize order of answers
        question.answers = game.randomize(question.answers);

        // Display buttons for each answer
        for (let i=0; i<question.answers.length; i++) {
            let answerBtn = $("<button>").addClass("answerBtn").text( question.answers[i]);
            answerBtn.on("click", game.showAnswer.bind(null, answerBtn.text()) );

            target.append(answerBtn);
        }

        // Setup timer
        game.timeLeft = game.questionMaxTime;
        game.timer = setInterval(function() {
            game.timeLeft -= 1;
            if (game.timeLeft <= 0) {
                game.showAnswer("TIMEOUT");
            }
            console.log(game.timeLeft)
            $(".timer").text(game.timeLeft);
        }, 1000);

        // Display timer
        let timerDiv = $("<div>").addClass("timerDiv");
        timerDiv.text("Time Left: ");
        timerDiv.append( $("<span>").text(game.timeLeft).addClass("timer") );

        target.append(timerDiv);

    }, 

    
    showAnswer(scoreInput) {
        // Clears timer from previous phase so it won't continue to run
        clearInterval(game.timer);

        let question = game.currentQuestion;

        let target = $("#game");
        target.empty();

        // Add to score depending on scoreInput value and display answer correctness to player
        let scoreFeedback = $("<div>").addClass("feedback");
        // "TIMEOUT" indicates player timed out
        if (scoreInput == "TIMEOUT") {
            game.timeouts++;
            scoreFeedback.text("Time's Up!").addClass("timeout");
        }
        // Otherwise, check if answer passed matches stored correct answer
        else if (scoreInput == game.correctAnswer) {
            game.correct++;
            scoreFeedback.text("Correct!").addClass("correct");
        }
        else {
            game.incorrect++;
            scoreFeedback.text("Incorrect!").addClass("incorrect");
        }
        target.append(scoreFeedback);
        
        let answerImg = $("<img>").addClass("answerImg").attr( {src: "assets/images/"+question.img, alt: game.correctAnswer } );
        let answerExpText = question.explanation;

        target.append(answerImg);
        target.append( $("<div>").text(answerExpText) );

        // Set timer to move to next phase
        let questionsLeft = game.questionList.length;
        setTimeout( questionsLeft>0 ? game.showNextQuestion : game.showScore, game.answerShowTime*1000);
    },

    showScore() {
        let target = $("#game");
        target.empty();

        let scoreDiv = $("<div>").addClass("score");
        scoreDiv.append( $("<div>").text(`Correct Answers: ${game.correct}`) );
        scoreDiv.append( $("<div>").text(`Incorrect Answers: ${game.incorrect}`) );
        scoreDiv.append( $("<div>").text(`Unanswered: ${game.timeouts}`) );
        target.append( scoreDiv );

        // Create Reset button to allow players to try again
        let resetBtn = $("<button>").addClass("resetBtn").text("Play Again");
        resetBtn.on("click", function() {
            game.init();
            game.showNextQuestion();
        });
        target.append( resetBtn );
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
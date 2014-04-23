// The Question function is the parent for all other question objects;
// All question objects will inherit from this Question constructor

function Question(theQuestion, theChoices, theCorrectAnswer) {
    // Initialize the instance properties
    this.question = theQuestion;
    this.choices = theChoices;
    this.correctAnswer = theCorrectAnswer;
    this.userAnswer = "";

    // private properties: these cannot be changed by instances
    var newDate = new Date(),
    // Constant variable: available to all instances through the instance method below. This is also a private property.
        QUIZ_CREATED_DATE = newDate.toLocaleDateString();

    // This is the only way to access the private QUIZ_CREATED_DATE variable 
    // This is an example of a privilege method: it can access private properties and it can be called publicly
    this.getQuizDate = function () {
        return QUIZ_CREATED_DATE;
    };

    // A confirmation message that the question was created
    console.log("Quiz Created On: " + this.getQuizDate());

}

// Define the prototype methods that will be inherited
Question.prototype.getCorrectAnswer = function () {
    return this.correctAnswer;
};

Question.prototype.getUserAnswer = function () {
    return this.userAnswer;
};

Question.prototype.displayQuestion = function () {
    var questionToDisplay = "<div class='question'>" + this.question + "</div><ul>";
    choiceCounter = 0;
    this.choices.forEach(function (eachChoice) {
        questionToDisplay += '<li><input type="radio" name="choice" value="' + choiceCounter + '">' + eachChoice + '</li>';
        choiceCounter++;
    })
    questionToDisplay += "</ul>";
    console.log(questionToDisplay);
};

//=================inherite prototype function=============================
function inheritPrototype(childObject, parentObject) {
    // As discussed above, we use the Crockford’s method to copy the properties and methods from the parentObject onto the childObject
    // So the copyOfParent object now has everything the parentObject has 
    var copyOfParent = Object.create(parentObject.prototype);

    //Then we set the constructor of this new object to point to the childObject.
    // Why do we manually set the copyOfParent constructor here, see the explanation immediately following this code block.
    copyOfParent.constructor = childObject;

    // Then we set the childObject prototype to copyOfParent, so that the childObject can in turn inherit everything from copyOfParent (from parentObject)
    childObject.prototype = copyOfParent;
}

//==================child question class=========================

function MultipleChoiceQuestion(question, choices, correctAnswer) {
    Question.call(this,question, choices, correctAnswer);
}
inheritPrototype(MultipleChoiceQuestion, Question);

//=============Drag and drop question==============
function DragDropQuestion(question, choices, correctAnswer) {
    Question.call(this, question, choices, correctAnswer);
}
inheritPrototype(DragDropQuestion, Question);
DragDropQuestion.prototype.displayQuestion = function () {
    console.log(this.question);
};

//create multiple question
var allQuestion = [
    new MultipleChoiceQuestion("who is the tallest man in the world?", ["You", "Tada", "Ipland"], 3),
    new MultipleChoiceQuestion("What is the Capital of Brazil?", ["São Paulo", "Rio de Janeiro", "Brasília"], 2),
    new DragDropQuestion("Drag the correct City to the world map.", ["Washington, DC", "Rio de Janeiro", "Stockholm"], 0)
];

allQuestion.forEach(function (eachQuestion) {
    eachQuestion.displayQuestion();
});

# QuizBox Library

### link to the Landing page: https://quiz-box.herokuapp.com/

## Getting started:

### Step 1:

To start using this library, include the script tag, &lt;script defer type=&quot;text/javascript&quot; src='js/QuizBox.js'&gt;&lt;/script&gt; , and the link tag, &lt;link rel=&quot;stylesheet&quot; type=&quot;text/css&quot; href=&quot;QuizBox.css&quot;&gt; in the HTML file. Moreover, create a JS file and include it in the same HTML file (i.e. include the script tag, &lt;script defer type=&quot;text/javascript&quot; src='example.js'&gt;&lt;/script&gt;) that contains the script tag and the link tag.

** NOTE **: The path for QuizBox.js and QuizBox.css could differ depending on where QuizBox.js and QuizBox.css is placed with repect to the HTML file.

Before moving on to the next step, please ensure that the following tags are included in the HTML file:

- &lt;script defer type=&quot;text/javascript&quot; src='js/QuizBox.js'&gt;&lt;/script&gt;
- &lt;link rel=&quot;stylesheet&quot; type=&quot;text/css&quot; href=&quot;QuizBox.css&quot;&gt;
- &lt;script defer type=&quot;text/javascript&quot; src='example.js'&gt;&lt;/script&gt;


** NOTE **: For demonstration purposes the JS file is called example.js. The name of the JS file does not matter.


### Step 2:

To create your first quiz, you must first create a QuizBox object in your JS file. This can be done as shown below:

        const parentElementOfQuiz = document.querySelector('body');

        const quiz = new QuizBox(parentElementOfQuiz);

Now that your have a QuizBox object, you can start adding questions to the quiz. For example, to make a multiple choice question with one correct answer:

        quiz.createMultipleChoiceOne("What does HTML stand for?", ["HyperText Machine Learning", "HyperText Markup Language", 
        "Hyper Machine Language", "None of the above", "All of the above"], "HyperText Markup Language");


Other types of questions can be created and added to the quiz in a similar manner.

Please refer to the link below that describes the different API functions that can be used to create the Quiz.


### link to the Documentation page: https://quiz-box.herokuapp.com/documentation.html

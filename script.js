function startsWithNumeral(s) {
    return /^\d/.test(s);
}

// Process the lines
function processLines(lines) {
  let setPoints = false;
  let points;

  // Loop through the lines
  for (let i = 0; i < lines.length; i++) {
    line = lines[i];
    console.log('%c' + line, 'color: red');

    // Obtain the quiz title
    if (line.startsWith('Quiz title:')) {
      let title = line.substring('Quiz title: '.length);
      document.getElementById('quiz-title').value = title;
      console.info('Saving quiz title:', title)
    }

    // Obtain the quiz description
    if (line.startsWith('Quiz description:')) {
      let description = line.substring('Quiz description: '.length);
      document.getElementById('quiz-description').innerText = description;
      console.info('Saving quiz description:', description)
    }
    
    // Store points for next question
    if (line.startsWith('Points:')) {
      points = line.substring('Points: '.length).trim();
      setPoints = true;
    }

    // create a question
    if (startsWithNumeral(line)) {
      let question = document.createElement('div');
      question.className = 'question';

      // question box
      let questionInfo = document.createElement('div');
      questionInfo.className = 'questionInfo';
      question.appendChild(questionInfo);

      // question text label
      let questionTextLabel = document.createElement('label');
      questionTextLabel.label = 'questionText';
      questionTextLabel.innerText = 'Question Text:';
      questionInfo.appendChild(questionTextLabel);

      let rightAlign = document.createElement('div');
      rightAlign.className = 'rightAlign';
      questionInfo.appendChild(rightAlign);

      // question points
      let questionPoints = document.createElement('label');
      questionPoints.label = 'questionPoints';
      questionPoints.innerText = 'Points:';
      rightAlign.appendChild(questionPoints);

      let questionPointsInput = document.createElement('input');
      questionPointsInput.type = 'number';
      questionPointsInput.id = 'questionPoints';
      questionPointsInput.name = 'questionPoints';
      questionPointsInput.placeholder = 'Points';
      if (setPoints) {
        questionPointsInput.value = points;
        setPoints = false;
      } else {
        questionPointsInput.value = '1';

      }

      rightAlign.appendChild(questionPointsInput);

      // question text
      let questionTextInput = document.createElement('textarea');
      questionTextInput.id = 'questionText';
      questionTextInput.name = 'questionText';
      questionTextInput.placeholder = 'Question Text';
      questionTextInput.value = line.substring(line.indexOf(' ') + 1);
      questionInfo.appendChild(questionTextInput);

      // question options
      let questionOptions = document.createElement('div');
      questionOptions.className = 'questionOptions';
      let options = document.createElement('div');
      options.className = 'options';
      questionOptions.appendChild(options);

      // add the question to the DOM
      let j = i + 1;
      let nextLine = lines[j];
      let type = 'choice';

      while (j < lines.length) {
        // Check if the next line is a new question
        if (nextLine === '' || nextLine === '\r' || nextLine === '\n') {
          break;
        }

        console.log('%c' + nextLine, 'color: aqua');

        let option = document.createElement('div');
        option.className = 'option';

        let checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'answerCorrect';

        // check if the option is multiple choice or selection
        if (nextLine.startsWith('[')) {
          type = 'selection';
        }

        if (type === 'selection') {
          if (nextLine.startsWith('[*]')) {
            checkbox.checked = true;
          }
          nextLine = nextLine.substring(nextLine.indexOf('] ') + 2);

        } else {
          if (nextLine.startsWith('*')) {
            checkbox.checked = true;
            nextLine = nextLine.substring(nextLine.indexOf(' ') + 1);
          } else {
            nextLine = nextLine.substring(nextLine.indexOf(') ') + 3);

          }
        }



        let optionText = document.createElement('input');
        optionText.type = 'text';
        optionText.className = 'optionText';
        optionText.value = nextLine;

        option.appendChild(checkbox);
        option.appendChild(optionText);
        options.appendChild(option);

        // move to next line
        j++;
        nextLine = lines[j];
      }

      i = j;


      question.appendChild(questionOptions);
      document.querySelector('.quiz-questions').appendChild(question);
    }
  }
}

/* EVENT LISTENERS */
// Add a question
document.getElementById('addQuestionButton').addEventListener('click', function () {
  // create a question
  let question = document.createElement('div');
  question.className = 'question';

  // question box
  let questionInfo = document.createElement('div');
  questionInfo.className = 'questionInfo';
  question.appendChild(questionInfo);

  // question text label
  let questionTextLabel = document.createElement('label');
  questionTextLabel.label = 'questionText';
  questionTextLabel.innerText = 'Question Text:';
  questionInfo.appendChild(questionTextLabel);

  let rightAlign = document.createElement('div');
  rightAlign.className = 'rightAlign';
  questionInfo.appendChild(rightAlign);

  // question points
  let questionPoints = document.createElement('label');
  questionPoints.label = 'questionPoints';
  questionPoints.innerText = 'Points:';
  rightAlign.appendChild(questionPoints);

  let questionPointsInput = document.createElement('input');
  questionPointsInput.type = 'number';
  questionPointsInput.id = 'questionPoints';
  questionPointsInput.name = 'questionPoints';
  questionPointsInput.placeholder = 'Points';
  questionPointsInput.value = '1';
  rightAlign.appendChild(questionPointsInput);

  // question text
  let questionTextInput = document.createElement('textarea');
  questionTextInput.id = 'questionText';
  questionTextInput.name = 'questionText';
  questionTextInput.placeholder = 'Question Text';
  questionInfo.appendChild(questionTextInput);

  // question options
  let questionOptions = document.createElement('div');
  questionOptions.className = 'questionOptions';
  let options = document.createElement('div');
  options.className = 'options';
  questionOptions.appendChild(options);

  // add the question to the DOM
  document.querySelector('.quiz-questions').appendChild(question);

  // add an option 4 times
  for (let i = 0; i < 4; i++) {
    let option = document.createElement('div');
    option.className = 'option';

    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'answerCorrect';

    let optionText = document.createElement('input');
    optionText.type = 'text';
    optionText.className = 'optionText';
    optionText.placeholder = 'Option Text';

    option.appendChild(checkbox);
    option.appendChild(optionText);
    options.appendChild(option);
  }

  question.appendChild(questionOptions);

});

/* MAIN */
let lines = [];

fetch('test.txt')
  .then(response => response.text())
  .then(data => {
    // Split the data by newline and store it in the lines variable
    lines = data.split('\n');

    // Now the lines variable contains the lines of text
    console.log(lines);

    // Process the lines
    processLines(lines);
  })
  .catch(error => {
    console.error('Error:', error);
  });


function startsWithNumeral(s) {
    return /^\d/.test(s);
}

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

// Process the lines
function processLines(lines) {

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

    // create a question
    if (startsWithNumeral(line)) {
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

        if (nextLine.startsWith('*')) {
          checkbox.checked = true;
        }
        // move past the )
        nextLine = nextLine.substring(nextLine.indexOf(') ') + 2);

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
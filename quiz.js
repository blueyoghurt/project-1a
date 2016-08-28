var question1 = {
  prompt: 'What is 10 + 10?',
  options: [10, 20, 30, 50],
  correctAnswerIndex: 1
}

var question2 = {
  prompt: 'Who is Moon Mayor?',
  options: ['Donald Trump', 'Obama', 'Steve Geluso', 'Rachel Lim'],
  correctAnswerIndex: 2
}

var question3 = {
  prompt: 'Which of the following is the heaviest?',
  options: ['Big Mac Burger', 'Wanton Noodle', 'Roasted Duck Rice', 'Pork Chop'],
  correctAnswerIndex: 1
}

var quiz = {
  questions: [question1, question2, question3], // question1 and question2 were defined above!
  isGameOver: false,
  currentQuestion: 0,
  player1Points: 0,
  player2Points: 0,
  questionsAskedIndex: [0, 0, 0]
}

document.addEventListener('DOMContentLoaded',function(){
  console.log('DOM loaded')

  var OptionsAvailable = document.getElementsByClassName('quiz-ans')
  for (var i = 0; i < OptionsAvailable.length; i++){
    OptionsAvailable[i].addEventListener('click', playTurn);
  }
  var reset = document.getElementById('resetB')
  reset.addEventListener('click', restart)

  //var turn;
  console.log('Number of questions', numberOfQuestions())
  numberOfQuestions()
  // returns index of a random unused question as the current question
  quiz.currentQuestion = currentQuestion(0, (numberOfQuestions()-1));
  numberOfAnswers(quiz.currentQuestion);
  populateQuestion();
});

function numberOfQuestions (){
  // console.log('number of questions', quiz.questions.length);
  return quiz.questions.length;
}

function currentQuestion (min,max){
  currentQ = Math.floor(min + Math.random() * ((max-min) +1));
  while (quiz.questionsAskedIndex[currentQ] != 0 ){
    currentQ = Math.floor(min + Math.random() * ((max-min) +1));
  } console.log('Current question is:', currentQ);
  return currentQ;
}

function correctAnswer(index){
  console.log('Correct answer is', quiz.questions[index].correctAnswerIndex);
  return quiz.questions[index].correctAnswerIndex;
}

function numberOfAnswers(index){
  console.log('Number of options are', quiz.questions[index].options.length);
  return quiz.questions[index].options.length;
}

function playTurn(){
  if (this.value == correctAnswer(quiz.currentQuestion)){
    document.getElementById('CorrectAnswer').className = 'container alert alert-success'
    document.getElementById('WrongAnswer').className = 'container alert alert-danger hidden'
    return true;
  }
  document.getElementById('WrongAnswer').className = 'container alert alert-danger'
  document.getElementById('CorrectAnswer').className = 'container alert alert-success hidden'
  return false;
}

// function isGameOver(){
// var questionsAsked = 0;
// for (i=0; i < quiz.questions.length; i++){
//   if (quiz.questionsAskedIndex[i] == 1){
//     questionsAsked += 1;
//   }
// }
// if (questionsAsked == quiz.questions.length){
//   return true;
// }
// else
// console.log(questionsAsked);
// return false;
// }

function whoWon(){
  if (isGameOver()){
    if (quiz.player1Points > quiz.player2Points) {
      return 1;
    } else if (quiz.player1Points < quiz.player2Points){
      return 2;
    } else return 3;
  } else return 0;
}

function restart(){
  console.log('reset pressed');
  quiz.player1Points = quiz.player2Points = 0;
  quiz.isGameOver = false,
  quiz.questionsAskedIndex = [];
  for (i = 0; i < quiz.questions.length; i++ ){
    quiz.questionsAskedIndex[i] = 0;
  }
  for (i=0; i< 2; i++){
    console.log('in for loop');
    document.getElementsByClassName('alert')[i].className += ' hidden';
  }
}

// Populate the question and options for currentQuestion
function populateQuestion(){
  var OptionsAvailable = document.getElementsByClassName('quiz-ans');
  for (i=0 ; i< quiz.questions[quiz.currentQuestion].options.length; i++){
    OptionsAvailable[i].textContent = quiz.questions[quiz.currentQuestion].options[i];
  }
  var question = document.getElementById('QuestionText');
  question.textContent = quiz.questions[quiz.currentQuestion].prompt;
  //  document.getElementById('QuestionNumber').textContent = 'Qn' + ;
}

progress(80, $('#progressBar'));

function progress(percent, $element) {
  var progressBarWidth = percent * $element.width() / 100;
  console.log('progressbar loaded');
  $element.find('div').animate({ width: progressBarWidth }, 500).html(percent + '% ');
}

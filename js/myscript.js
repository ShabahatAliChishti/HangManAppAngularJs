var app = angular.module("HangmanApp",[]);
app.controller("GameController",['$scope','$timeout',function($scope,$timeout){
	//4 words to guess
    var words=["rat","cat","bat","mat"];
    //saray incorrect letters is me ajaengy user ke is array me
	$scope.incorrectLettersChosen=[];
        //saray correct letters is me ajaengy user ke

	$scope.correctLettersChosen=[];
	var selectedWord='';
	$scope.guesses=6;
	$scope.displayWord='';
	$scope.input = {
		letter: ''
	};
    //show random word from words array
	var selectRandomWord = function() {
        //math.round--- this function is use for random word
		var index = Math.round(Math.random()*words.length);
		return words[index];
	}
    //again starting the game this function is use for initalization of game
	var newGame = function() {
		$scope.incorrectLettersChosen = [];
		$scope.correctLettersChosen=[];
		$scope.guesses=6;
		$scope.displayWord="";
        //it gives me selected word
		selectedWord=selectRandomWord();
		var tempDisplayWord='';
		for(var i=0;i<selectedWord.length;i++) {
            //e.g:bat=*** 
			tempDisplayWord+='*';
		}
		$scope.displayWord=tempDisplayWord;
		// Random word selection.
	}
    //whenever use is selecting and typing any input
	$scope.letterChosen = function() {
		// Check if $scope.input.letter is a single letter and an alphabet and not an already chosen letter.
		// Check if its correct.
		for(var i=0;i<$scope.correctLettersChosen.length;i++) {
			if($scope.correctLettersChosen[i].toUpperCase()==$scope.input.letter.toUpperCase()) {
				$scope.input.letter="";
				return;
			}
		}
		for(var i=0;i<$scope.incorrectLettersChosen.length;i++) {
			if($scope.incorrectLettersChosen[i].toUpperCase()==$scope.input.letter.toUpperCase()) {
				$scope.input.letter="";
				return;
			}
		}
		var correct=false;
		for(var i=0;i<selectedWord.length;i++) {
			if(selectedWord[i].toLowerCase()==$scope.input.letter.toLowerCase()) {
				//(0,i)=>grab word from beginning
                //(i+1)
                //slice function use to cut the string
                $scope.displayWord=$scope.displayWord.slice(0,i)+$scope.input.letter.toUpperCase()+$scope.displayWord.slice(i+1);
				//e.g:
                //cat
                //***
                //a
                //*a*
                correct=true;

			}
		}
		if(correct) {
            //put correctletters into array
			$scope.correctLettersChosen.push($scope.input.letter.toUpperCase());
		} else {
            //put incorrect letters into array if flag is false
            //reduce guesses if incorrect
			$scope.guesses--;
			$scope.incorrectLettersChosen.push($scope.input.letter.toUpperCase());
		}
		$scope.input.letter="";
		if($scope.guesses==0) {
			// You Lose
            //restarting the game in .5 second
			$timeout(function() {
				newGame();
			},500);
		}
        //index of if we have still * in it if it is not found the star it means user has guessed everything so i just get a negative one so its means user won the game
		if($scope.displayWord.indexOf("*")==-1) {
			// Show score
			$timeout(function() {
				newGame();
			},500);
		}
	}
	newGame();
}]);
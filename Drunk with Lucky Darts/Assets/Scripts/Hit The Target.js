#pragma strict

var myText : Rigidbody;
var speed : float;
var counter = 0;

function Update () {
    
	counter++;
	
	myText.velocity.z = speed;
	
	if (counter == 160) {
	
		myText.isKinematic = true;
		
		LoadScores();
		
	}

}

function LoadScores() {

	yield WaitForSeconds(2);
	
	Application.LoadLevel("Scores");

}
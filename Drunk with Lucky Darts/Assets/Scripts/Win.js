#pragma strict

function Start () {

	LoadScores();

}

function LoadScores () {

	yield WaitForSeconds(2);
	
	Application.LoadLevel("Scores (post-game)");

}
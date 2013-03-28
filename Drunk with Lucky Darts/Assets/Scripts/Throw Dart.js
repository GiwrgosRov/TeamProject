#pragma strict

import System.IO;

var filePath = "scores.txt";
var dart : Rigidbody;
var darta : Transform;
var counter = 0;
var arrayA = new Array();
var arrayB = new Array();
var screenPoint : Vector3;
var offset : Vector3;
var transformed : Vector3;

function Update () {

	 if (Input.GetMouseButtonDown(0)) {
	 
		dart.MovePosition(Vector3(0.7999306, 12.93894, -4.749727));  // Move the dart up to top
		
		dart.transform.localScale.x = 0.3;
		dart.transform.localScale.y = 0.3;
		dart.transform.localScale.z = 0.3;
		
		dart.transform.Rotate(90, 0, 0);

		//dart.MovePosition(Vector3(0.7836357, 13.0961, 2.799733)); // Hit to target
		
		screenPoint = Camera.main.WorldToScreenPoint(darta.position);
		
		transformed = Camera.main.ScreenToWorldPoint(new Vector3(Input.mousePosition.x, Input.mousePosition.y, screenPoint.z));
		
		transformed.y = transformed.y + 2.5;
	
		Debug.Log("Input.mousePosition.x = " + Input.mousePosition.x);
		Debug.Log("Input.mousePosition.y = " + Input.mousePosition.y);
		
		Debug.Log("metatropi.x = " + transformed.x);
		Debug.Log("metatropi.y = " + transformed.y);
		
		transform.position = Vector3(transformed.x, transformed.y, 2.799733);
		
		ReadFile(filePath);
		SortScores(counter);
		WriteFile(filePath);
		
		RestoreDart();
		
		//LoadWinScreen();
	
	}
	
}

function LoadWinScreen() {

	yield WaitForSeconds(1);
	
	Application.LoadLevel("Win");

}

function RestoreDart() {

	yield WaitForSeconds(2);

	dart.transform.localScale.x = 0.05;
	dart.transform.localScale.y = 0.03;
	dart.transform.localScale.z = 0.03;
	
	dart.transform.Rotate(-90, 0, 0);
	
	dart.MovePosition(Vector3(0.7999306, 9.532817, -4.749727));

}

function WriteFile(filepathIncludingFileName : String) {

    var sw : StreamWriter = new StreamWriter(filepathIncludingFileName);

	for (var i = 0; i < 5; i++) {
	
    	sw.WriteLine(arrayB[i]);
    	
    }

    sw.Flush();

    sw.Close();

}

function ReadFile(filepathIncludingFileName : String) {

    var sr = new File.OpenText(filepathIncludingFileName);

    var input = "";

	for (var i = 0; i < 5; i++) {

        input = sr.ReadLine();
        
        arrayA[i] = input;
        arrayB[i] = input;

    }

    sr.Close();

}

function SortScores (counter : int) {

	arrayB[0] = counter;
	arrayB[1] = arrayA[0];
	arrayB[2] = arrayA[1];
	arrayB[3] = arrayA[2];
	arrayB[4] = arrayA[3];

}
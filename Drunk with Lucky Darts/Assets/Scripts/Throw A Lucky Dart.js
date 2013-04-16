#pragma strict

import System.IO;

var dart : Rigidbody;
var counter = 0;
var arrayA = new Array();
var arrayB = new Array();
var myBool = false;
var filePath;
var myDart : Transform;
var screenPoint : Vector3;
var transformed : Vector3;
var myLabel : GUIText;

function OnGUI () {

	filePath = Application.dataPath + "/scores.txt";
	
	//if (GUI.Button (Rect (50, 250, 200, 20), "Try your Lucky? Dart!")) {   //for testing reasons only (inside Unity)
	if (GUI.Button (Rect (25, 650, 200, 20), "Try your Lucky? Dart!")) {
		
		counter++;
		
		// desides whether the dart that will be thrown will be a lucky one or not
		var randnum: int = Random.Range(1, 3);
		
		// for testing reasons
		//randnum = 2;
		
		// if it is a lucky one
		if (randnum == 1) {
		
			myLabel.text = "Lucky";
		
			// The possibility of hitting the target is 20%
			var randomnumber: int = Random.Range(1, 6);
			
			GetDartReady();
		
			// if the dart hits the bull eye
			if (randomnumber == 1) {
				
				var rangex: double = Random.Range(0.6716456, 0.8471002);
				var rangey: double = Random.Range(12.95, 13.20);
	
				dart.MovePosition(Vector3(rangex, rangey, 2.799733)); // Hit to target
				
				ReadFile(filePath);
				SortScores(counter);
				WriteFile(filePath);
				
				LoadWinScreen();
			
			} 
			else {
			
				do { 
				
					var randx2: double = Random.Range(-0.2184523, 1.710871);
					var randy2: double = Random.Range(12.05341 , 13.85781);
					
				}
				while (((randx2 >= 0.6716456) && (randx2 <= 0.8471002)) && ((randy2 >= 12.95) && (randy2 <= 13.20)));
			
				dart.MovePosition(Vector3(randx2, randy2, 2.799733));
			
			}
			
			RestoreDart();
		
		}
		else {
	
			myBool = true;
			myLabel.text = "Unlucky";
		
		}
	
	}
	
	if (GUI.Button (Rect (1245, 1, 35, 22), "Exit")) {
	
		Application.Quit();
	
	}
	
}

function Update() {

	if (myBool) {
	
		if (Input.GetMouseButtonDown(0)) {
			
			GetDartReady();
		
			screenPoint = Camera.main.WorldToScreenPoint(myDart.position);
			transformed = Camera.main.ScreenToWorldPoint(new Vector3(Input.mousePosition.x, Input.mousePosition.y, screenPoint.z));
			transformed.y = transformed.y + 2.5;
			transform.position = Vector3(transformed.x, transformed.y, 2.799733);
			
			RestoreDart();
			myBool = false;
		
		}
		
	}

}

function LoadWinScreen() {

	yield WaitForSeconds(1);
	
	Application.LoadLevel("Win");

}

function GetDartReady() {

	dart.MovePosition(Vector3(0.7999306, 12.93894, -4.749727));  // Move the dart up to top so as the throw become more smooth
	
	dart.transform.localScale.x = 0.3;
	dart.transform.localScale.y = 0.3;
	dart.transform.localScale.z = 0.3;
	
	dart.transform.Rotate(90, 0, 0);

}

function RestoreDart() {

	yield WaitForSeconds(2);

	dart.transform.localScale.x = 0.05;
	dart.transform.localScale.y = 0.03;
	dart.transform.localScale.z = 0.03;
	
	dart.transform.Rotate(-90, 0, 0);
	
	dart.MovePosition(Vector3(0.4667625, 9.532817, -9.165481));
	
	myLabel.text = "";

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
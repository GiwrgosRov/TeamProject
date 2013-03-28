#pragma strict

import System.IO;

var filePath = "scores.txt";
var dart : Rigidbody;
var counter = 0;
var arrayA = new Array();
var arrayB = new Array();

function OnGUI () {
		
	if (GUI.Button (Rect (50, 500, 200, 20), "Try your Lucky dart!")) {

		counter++;
	
		dart.MovePosition(Vector3(0.7999306, 12.93894, -4.749727));  // Move the dart up to top
		
		dart.transform.localScale.x = 0.3;
		dart.transform.localScale.y = 0.3;
		dart.transform.localScale.z = 0.3;
		
		dart.transform.Rotate(90, 0, 0);
		
		var randomnumber: int = Random.Range(1, 5);
		
		if (randomnumber == 1) {
			
			var rangex: double = Random.Range(0.6716456, 0.8471002);
			var rangey: double = Random.Range(12.95, 13.20 );

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
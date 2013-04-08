#pragma strict

import System.IO;

var values = new Array();
var text1 : GUIText;
var text2 : GUIText;
var text3 : GUIText;
var text4 : GUIText;
var text5 : GUIText;

function Start () {

	var filePath = Application.dataPath + "/scores.txt";
	ReadFile(filePath);
	
	text1.text = values[0];
	text2.text = values[1];
	text3.text = values[2];
	text4.text = values[3];
	text5.text = values[4];

}

function ReadFile(filepathIncludingFileName : String) {

    var sr = new File.OpenText(filepathIncludingFileName);

    var input = "";

	for (var i = 0; i < 5; i++) {

        input = sr.ReadLine();
        
        values[i] = input;

    }

    sr.Close();

}
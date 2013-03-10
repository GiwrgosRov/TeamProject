#pragma strict

var dart : Rigidbody;

function Update() {

	if(Input.GetMouseButtonDown(0)) {
	
		dart.MovePosition(Vector3(0.7999306, 12.93894, -4.749727));  // Move the dart up to top
		
		dart.transform.localScale.x = 0.3;
		dart.transform.localScale.y = 0.3;
		dart.transform.localScale.z = 0.3;
		
		dart.transform.Rotate(90, 0, 0);
		
		var randomnumber: int = Random.Range(1, 15);
		
		if (randomnumber == 1) {
		
			dart.MovePosition(Vector3(0.7836357, 13.0961, 2.799733)); // Hit to target
		
		} 
		else {
		
			dart.MovePosition(Vector3(Random.Range(-0.2184523, 1.710871), Random.Range(12.05341 , 13.85781), 2.799733));
		
		}
		
		RestoreDart();
	
	}
	
}

function RestoreDart() {

	yield WaitForSeconds(2);

	dart.transform.localScale.x = 0.05;
	dart.transform.localScale.y = 0.03;
	dart.transform.localScale.z = 0.03;
	
	dart.transform.Rotate(-90, 0, 0);
	
	dart.MovePosition(Vector3(0.7999306, 9.532817, -4.749727));

}
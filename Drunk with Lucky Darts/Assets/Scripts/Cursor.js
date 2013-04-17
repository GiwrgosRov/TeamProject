var cursorImage : Texture2D;

function Start()
{

	Screen.showCursor = false;
	
}

function OnGUI()

{

	GUI.DrawTexture(new Rect(Input.mousePosition.x, Screen.height - Input.mousePosition.y, 32, 32), cursorImage);
	
}
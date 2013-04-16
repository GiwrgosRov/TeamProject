// 
//  iKriz. (2012) Unity Post Process Mayhem. [Online]. Available at: http://www.ikriz.nl/2012/06/18/unity-post-process-mayhem/ (Accessed: 31 March 2013).
// 
//  This script provides the capability of post-build file copy, after altering the corresponding/appropriate path.
//

using UnityEngine;
using System.Collections;
using System.IO;
using UnityEditor;
using UnityEditor.Callbacks;

public class CopyToBuild : MonoBehaviour {

    private static DirectoryInfo targetdir;
    private static string buildname;
    private static string buildDataDir;
    private static DirectoryInfo projectParent;
 
    // Name of folder in project directory containing files for build
    private static string srcName = "/Assets/scores.txt";
    private static int filecount;
    private static int dircount;
 
    /// Processbuild Function
    [PostProcessBuild] // <- this is where the magic happens
    public static void OnPostProcessBuild(BuildTarget target, string path)
    {
        Debug.Log("Post Processing Build");
 
        // Get Required Paths
        projectParent = Directory.GetParent(Application.dataPath);
        buildname = Path.GetFileNameWithoutExtension(path);
        targetdir = Directory.GetParent(path);
        char divider = Path.DirectorySeparatorChar;
        string dataMarker = "_Data"; // Specifically for Windows Standalone build
        buildDataDir = targetdir.FullName + divider + buildname + dataMarker + divider;
 
        // Do Certain actions on your files (Copy, remove or email them to NASA your decision)
        filecount = 0;
        dircount = 0;
        CopyAll(new DirectoryInfo(projectParent.ToString() + divider + srcName), new DirectoryInfo(buildDataDir));
 
        Debug.Log("Copied: " + filecount + " file" +((filecount!=1)?"s":"")+ ", " + dircount + " folder" +((dircount!=1)?"s":""));
    }
 
    /// <summary>
    /// Recursive Copy Directory Method
    /// </summary>
    public static void CopyAll(DirectoryInfo source, DirectoryInfo target)
    {
        // Check if the target directory exists, if not, create it.
        if (Directory.Exists(target.FullName) == false)
        {
            dircount++;
            Directory.CreateDirectory(target.FullName);
        }
 
        // Copy each file into it’s new directory.
        foreach (FileInfo fi in source.GetFiles())
        {
            filecount++;
            fi.CopyTo(Path.Combine(target.ToString(), fi.Name), true);
        }
 
        // Copy each subdirectory using recursion.
        foreach (DirectoryInfo diSourceSubDir in source.GetDirectories())
        {
            dircount++;
            DirectoryInfo nextTargetSubDir = target.CreateSubdirectory(diSourceSubDir.Name);
            CopyAll(diSourceSubDir, nextTargetSubDir);
        }
    }
}

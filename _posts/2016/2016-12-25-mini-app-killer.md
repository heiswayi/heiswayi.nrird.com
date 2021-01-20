---
layout: project
title: Mini App Killer
description: A simple utility program to kill any running application or process on Windows.
tags: [C#, WPF, Project, Programming]
comments: true
---

Mini App Killer is a simple utility program I wrote in .NET C# that will sit in the system tray for easy access and can be used to kill or end task of any running application or process.

<a href="https://www.dropbox.com/s/4gibswk7iz7gg9d/MiniAppKillerV1.zip?dl=0" class="button big">Download Mini App Killer v1.0 · 55.2 KB</a>



### Screenshots

{% include figure.html src="assets/images/z5hJFH8.png" caption="Listing all running applications" %}

{% include figure.html src="assets/images/TJG1sV1.png" caption="To kill the selected running application/process" %}

{% include figure.html src="assets/images/CxYg1gU.png" caption="Customize filter..." %}

{% include figure.html src="assets/images/jHb3HqI.png" caption="List of processes once filtered by the process name" %}



### Code snippets

Code snippet for getting all running applications:

```csharp
var wmiQueryString = "SELECT ProcessId, ExecutablePath FROM Win32_Process";
using(var searcher = new ManagementObjectSearcher(wmiQueryString))
using(var results = searcher.Get()) {
    var query = from p in Process.GetProcesses()
    join mo in results.Cast<ManagementObject>()
    on p.Id equals(int)(uint) mo["ProcessId"]
    select new {
        Process = p,
        Path = (string)mo["ExecutablePath"],
    };

    if (query.Count() > 0) {
        foreach(var item in query) {
            if (!string.IsNullOrEmpty(item.Process.MainWindowTitle)) {
                // List all running application here...
            }
        }
    }
}
```

Code snippet for killing the application, open file location or show the application _File Properties_ dialog:

```csharp
// To kill the running application based on Process Id.
Process.GetProcessById(item.Process.Id).Kill();

// To open the running application directory and select the executable file.
Process.Start("explorer.exe", "/select, \"" + item.Path + "\"");

// To show the application File Properties
ShowFileProperties(item.Path);

#region Unmanaged code for ShowFileProperties(path)
[DllImport("shell32.dll", CharSet = CharSet.Auto)]
private static extern bool ShellExecuteEx(ref SHELLEXECUTEINFO lpExecInfo);

[StructLayout(LayoutKind.Sequential, CharSet = CharSet.Auto)]
public struct SHELLEXECUTEINFO {
    public int cbSize;
    public uint fMask;
    public IntPtr hwnd;
    [MarshalAs(UnmanagedType.LPTStr)]
    public string lpVerb;
    [MarshalAs(UnmanagedType.LPTStr)]
    public string lpFile;
    [MarshalAs(UnmanagedType.LPTStr)]
    public string lpParameters;
    [MarshalAs(UnmanagedType.LPTStr)]
    public string lpDirectory;
    public int nShow;
    public IntPtr hInstApp;
    public IntPtr lpIDList;
    [MarshalAs(UnmanagedType.LPTStr)]
    public string lpClass;
    public IntPtr hkeyClass;
    public uint dwHotKey;
    public IntPtr hIcon;
    public IntPtr hProcess;
}

private const int SW_SHOW = 5;
private const uint SEE_MASK_INVOKEIDLIST = 12;
public static bool ShowFileProperties(string Filename) {
    SHELLEXECUTEINFO info = new SHELLEXECUTEINFO();
    info.cbSize = System.Runtime.InteropServices.Marshal.SizeOf(info);
    info.lpVerb = "properties";
    info.lpFile = Filename;
    info.nShow = SW_SHOW;
    info.fMask = SEE_MASK_INVOKEIDLIST;
    return ShellExecuteEx(ref info);
}
#endregion
```

Code snippet for filtering the target process names:

```csharp
string[] _targetProcessNames = ... // Array of process names to filter..

var query = from p in Process.GetProcesses()
            where _targetProcessNames.Any(n => n.Equals(p.ProcessName, StringComparison.InvariantCultureIgnoreCase))
            join mo in results.Cast<ManagementObject>()
            on p.Id equals(int)(uint) mo["ProcessId"]
            select new {
              Process = p,
              Path = (string)mo["ExecutablePath"],
            };
```

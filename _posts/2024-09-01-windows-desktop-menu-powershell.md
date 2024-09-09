---
layout: post
title:  "Simple custom desktop user menu using powershell"
date: 2024-09-01
last_modified_at: 2024-09-09
categories: blog
tags: [Powershell] 
cover-img: /assets/img/2024-09-01-windows-start-menu-powershell-cover.png
thumbnail-img: /assets/img/2024-09-01-windows-start-menu-powershell-thumb.png
share-img: /assets/img/2024-09-01-windows-start-menu-powershell-thumb.png
excerpt: "Microsoft recently tucked the 'Sign Out' and 'Switch Users' buttons behind a maze of menus, making them harder to access. Frustrated by this change, I decided to take matters into my own hands. Using PowerShell, I crafted a custom menu that brings these actions back to your fingertips." 
---
Microsoft recently tucked the `Sign Out` and `Switch Users` buttons behind a maze of menus, making them harder to access. Frustrated by this change, I decided to take matters into my own hands. Using PowerShell, I crafted a custom menu that brings these actions back to your fingertips. The script can be pinned to the taskbar, where clicking it will launch it, displaying the custom menu with common user and machine actions.

If you are just interested in the script itself
- Download [the full UserMenu.ps1 script from my Github](https://gist.github.com/BartJolling/d82493c35f2f28c6ee428747da30992b).
- Go to the bottom of this page for instructions on how to launch it.

# Building the Menu
PowerShell is built on the .NET Framework so it can take advantage of .NET classes directly within your scripts. It seemed like a logical choice to build my start menu using Windows Forms. Windows Forms have the built-in `ContextMenuStrip` that I would like to use.

Below code shows how to instantiate a `Form` to host the `ContextMenuStrip`. The form itself should not be shown in the taskbar or on screen, just the menu.

~~~~ powershell
Add-Type -AssemblyName System.Windows.Forms

# Create an invisible form to host the menu
$form = New-Object System.Windows.Forms.Form
$form.Size = New-Object System.Drawing.Size(0,0)
$form.StartPosition = "Manual"
$form.Location = [System.Drawing.Point]::new(
    [System.Windows.Forms.Control]::MousePosition.X, [System.Windows.Forms.Control]::MousePosition.Y)
$form.ShowInTaskbar = $false
$form.Opacity = 0

# Create the menu with user options
$menu = New-Object System.Windows.Forms.ContextMenuStrip

$signOut = $menu.Items.Add("Sign Out")
$signOut.add_Click({
    shutdown.exe -L
    $form.Close()
})

$switchUser = $menu.Items.Add("Switch User")
$switchUser.add_Click({
    tsdiscon.exe
    $form.Close()
})

# Show the menu when the invisible form should be displayed
$form.ContextMenuStrip = $menu
$form.Add_Shown({
    $mousePosition = [System.Windows.Forms.Control]::MousePosition
    $menu.Show($mousePosition.X, $mousePosition.Y - $menu.Height)
})
$form.ShowDialog()
~~~~

Clicking the menu items calls the built-in Windows tools for signing out or switching users.

# Adding icons
I added icons to the menu because they enhance visual clarity and improve overall usability. Icons provide quick visual cues, making it easier for users to identify the actions.

Windows comes with an extensive library of icon resources that anyone can load. But in order to do that, you need to import the corresponding function from the Windows API.

~~~~ powershell
$extractIconExSignature = @"
using System;
using System.Runtime.InteropServices;
public class IconHelper {
    [DllImport("Shell32.dll", CharSet = CharSet.Auto)]
    public static extern int ExtractIconEx(string lpszFile, int nIconIndex, IntPtr[] phiconLarge, IntPtr[] phiconSmall, int nIcons);
}
"@

Add-Type -TypeDefinition $extractIconExSignature
~~~~

For re-use, I wrapped it in a function that gets the icon that is stored at a certain index in the `shell32.dll.num` resource file.

~~~~ powershell
Add-Type -AssemblyName System.Drawing

function Get-IconImage {
    param (
        [int]$IconIndex
    )
    # Path to imageres.dll
    $iconPath = "$env:SystemRoot\SystemResources\shell32.dll.mun"

    # Extract the icon
    $largeIcons = [System.IntPtr[]]::new(1)
    $smallIcons = [System.IntPtr[]]::new(1)
    $result = [IconHelper]::ExtractIconEx($iconPath, $IconIndex, $largeIcons, $smallIcons, 1)

    if ($result -gt 0 -and $smallIcons[0] -ne [System.IntPtr]::Zero) {
        $icon = [System.Drawing.Icon]::FromHandle($largeIcons[0])
        $bitmap = $icon.ToBitmap()
        $icon.Dispose()
        return $bitmap
    }

    return $null
}
~~~~

And then assign icons to all actions in the menu like this:

~~~~ powershell
$signOut.Image = Get-IconImage(217)

$switchUser.Image = Get-IconImage(176)
~~~~ 

# Launching the menu

To be most effective, the menu should display when clicking on an icon in the taskbar. To achieve this, start by creating a shortcut on your desktop with the following target:

~~~~ console
powershell.exe -ExecutionPolicy Bypass -WindowStyle Hidden -File "{local-path}\UserMenu.ps1"
~~~~ 

Replace `{local-path}` with the actual full folder path where you stored the script. Also, set Run to `Minimized` to hide the console window when launching. This is the time to change the icon if you do not want to end up with the default PowerShell icon.

- The command line bypasses the execution policy on your machine to prevent being blocked.
- The window style is set to `Hidden` to avoid showing the window.

For the final step, right click your newly created shortcut on the desktop, click to show more options and then click to pin to taskbar. If you used [the full UserMenu.ps1 script from my Github](https://gist.github.com/BartJolling/d82493c35f2f28c6ee428747da30992b), the result might look like this, after accepting the MIT license.

![User Menu](/assets/img/2024-09-01-windows-start-menu-powershell-result.png)

You can now safely delete the shorcut from the desktop. It is not needed anymore. Enjoy!

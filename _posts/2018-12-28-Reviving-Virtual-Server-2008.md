---
layout: post
title:  "Reviving a Windows Server 2008 Virtual Machine"
date: 2018-12-28
last_modified_at: 2018-12-28
categories: blog
tags: [Hyper-V, Windows Server] 
---

While cleaning up the files on my NAS, I came across some old virtual hard drive files (*.vhd). One that was called 'DevStation' I still recognized from my days as a consultant. My manager had requested someone on the bench to created a standardized virtual machine using VirtualBox that people could bring to their assignments and be up and running with the latest tools in no time.

## Booting

In my home lab I have a Windows Server 2016 with Hyper-V enabled. I created a new virtual machine, gave it 2 GB of RAM, assigned a network adapter, attached the disk, started the machine and connected to it from the Hyper-V management console. The machine booted and I was welcomed by the Windows Server 2008 Web Edition logon screen. 

I already had the following issues:
- I did not remember the password for the Administrator account
- Mouse input was not captured
- The machine did not connect to the network
- The keyboard worked but was set to Azerty

The last issue was quickly 'solved' by digging into my pile of old keyboards.

### Getting Administrator access
I followed [the procedure outlined here](https://serverfault.com/questions/469390/resetting-administrator-password-on-windows-server-2008-r2-over-raid). In short, I:
- shut down the virtual machine 
- pointed the virtual CD-ROM drive to a .iso file of Windows Server 2008, in the VM's settings
- checked the boot sequence to make sure that the virtual machine would boot of the CD-ROM; and 
- then started the machine again.

Once booted, I chose the option to 'Repair your Computer', open a command prompt and replace Utilman.exe with cmd.exe. After doing this, I shut down the machine again, let the machine boot of its hard drive again and now I could reset the password and log in as administrator.

### Capturing the mouse and getting network connectivity
The NIC wasn't detected and the mouse did not capture because the machine had been set up on VirtualBox and I was running it in Hyper-V. What I needed to do:
- In the 'Add/Remove Programs' Control Panel, remove the installed integration services.
- Make Windows automatically detect the correct HAL when booting.
- Install the Hyper-V integration Services.
- In the settings for the virtual machine, make sure all services are enabled.

To make Windows automatically detect the correct HAL:
- start msconfig.exe. 
- Go to the 'Boot' Tab
- Click 'Advanced Options'
- Check the Detect HAL checkbox.
- OK, OK and reboot

For Windows Server 2008, the integration services are not supported anymore but [vmguest.iso can be downloaded from the internet](https://smudj.wordpress.com/2017/03/02/vmguest-iso-for-older-windows-oses-in-win102016/). I downloaded the .iso file on my host machine and mounted it to the CD-ROM drive of the virtual machine.

## Exploring the machine
Turns out that the machine was not very useful anymore. Windows Update doesn't work and all installed software was long expired and not supported anymore. But at least I enjoyed solving the problems and now I can delete these huge virtual disks knowing I'm not losing anything important.


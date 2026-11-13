# DiskScan

**See what's eating your disk.**

A fast, free NTFS disk space analyser for Windows with a cushion treemap.

![DiskScan showing the Tree view, the File type list and the Treemap of a scanned Volume](https://jimmyolsson.github.io/diskscan/screenshots/overview.png)

## Download

**[Download DiskScan for Windows (x64)](https://github.com/jimmyolsson/diskscan/releases/latest/download/diskscan-windows-x86_64.zip)**

The zip holds a single portable `diskscan.exe`: unzip it anywhere and run it. There is no installer. Each release also carries a `SHA256SUMS.txt` so you can verify the download.

- All versions and release notes: [Releases](https://github.com/jimmyolsson/diskscan/releases)
- Website: [jimmyolsson.github.io/diskscan](https://jimmyolsson.github.io/diskscan/)

## Requirements

- Windows 10 or Windows 11, 64-bit (x64).
- NTFS Volumes. Other file systems (FAT32, exFAT, network drives) cannot be scanned.
- Run as administrator. DiskScan reads the Volume's Master File Table (MFT) directly instead of walking every folder, which is what makes a Scan fast. Windows only allows raw access to the MFT from an elevated process, so Windows shows a UAC prompt when DiskScan starts. It only reads; it never changes or deletes files.

### "Windows protected your PC"

The first time you run `diskscan.exe`, Windows SmartScreen may show a blue "Windows protected your PC" dialog. This happens because the exe is not code-signed and is not yet widely downloaded, not because anything harmful was found. To run it, click **More info**, then **Run anyway**. If you prefer, check the download against `SHA256SUMS.txt` from the release first.

## Features

- **MFT-speed Scan**: reads the Master File Table of an NTFS Volume in one pass instead of walking the folder tree.
- **Cushion Treemap**: every file is a Rectangle sized by its size, shaded with Cushions so folders read as raised shapes, with nested Folder Boxes labelled by name and size.
- **Tree view**: the folder hierarchy, largest first, with Share of parent, Share of partition and Items, Files and Folders counts.
- **File type list and Colouring**: File types ranked by combined size and coloured By Size or By File type, with twelve editable Colour groups plus Everything else.
- **Highlight**: select a File type to emphasise every one of its Rectangles while dimming the rest; the Type filter narrows the list as you type.
- **Zoom root with breadcrumbs and Zoom history**: focus the Treemap on any folder, jump back up via the breadcrumb bar, and move Back and Forward through the folders you visited.
- **Reveal in Explorer**: double-click a file to open its location with the file selected.
- **Logical size or Allocated size**: measure by the bytes a file claims or the bytes it occupies on disk (the default).
- **Hard links counted once**: a file with several names shows under each parent, but its size counts only once.

## About this repository

This repository holds DiskScan's releases and website. The source code is not public. Bug reports and ideas are welcome as [issues](https://github.com/jimmyolsson/diskscan/issues).

## Author

Made by Jimmy Olsson ([@jimmyolsson](https://github.com/jimmyolsson)). DiskScan is free to download and use. Copyright (c) 2026 Jimmy Olsson, all rights reserved.

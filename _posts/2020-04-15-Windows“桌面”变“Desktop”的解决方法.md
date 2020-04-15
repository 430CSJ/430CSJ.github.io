---
layout: post
title:  "Windows“桌面”变“Desktop”的解决方法"
date:   2020-04-15 13:12:11 +0800
categories: Windows
tags: Windows Microsoft CMD
comments: 1
---
用着以中文为显示语言的Win10，“桌面”莫名变成了“Desktop”。虽不影响使用，但看着很不爽，就尝试解决。

首先检查桌面目录中的`desktop.ini`，文件存在，且内容未被篡改：
```
[.ShellClassInfo]
LocalizedResourceName=@%SystemRoot%\system32\shell32.dll,-21769
IconResource=%SystemRoot%\system32\imageres.dll,-183
```
然后以管理员权限打开命令提示符，执行<span style=" background-color:#e1ffff">`attrib +r  "%USERPROFILE%\Desktop"`</span>，过一会发现“Desktop”已变回“桌面”，问题解决。

参考资料：<http://bbs.pcbeta.com/forum.php?mod=redirect&goto=findpost&ptid=1709010&pid=46386846>
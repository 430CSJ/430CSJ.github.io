---
layout: post
title:  "Synaptics SMBus TouchPad在Ubuntu下不可用的解决办法"
date:   2020-02-03 22:00:00 +0800
categories: Ubuntu
tags: Ubuntu TouchPad Synaptics Synaptics_SMBus_TouchPad
comments: 1
---
执行：
```shell
sudo modprobe -r psmouse
sudo modprobe psmouse proto=imps
```
然后重启即可。  
参考资料：<https://ubuntuforums.org/showthread.php?t=2233632>
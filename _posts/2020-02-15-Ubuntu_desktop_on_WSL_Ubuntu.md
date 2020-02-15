---
layout: post
title:  "在WSL Ubuntu里安装Ubuntu Desktop"
date:   2020-02-15 15:45:45 +0800
categories: WSL
tags: Ubuntu WSL GNOME Gnome Ubuntu_Desktop Windows10子系统 Windows10Linux子系统 Linux
comments: 1
---
[上一篇文章](/2020/02/14/Xubuntu_on_WSL_Ubuntu/)讲了如何在WSL Ubuntu上安装Xubuntu。如果觉得Xfce4太朴素，可以尝试安装基于GNOME的Ubuntu Desktop。准备过程请参考上一篇文章。如果已经启用WSL、安装WSL Ubuntu和VcXsrv，就可以看下文了。  

### 安装Ubuntu Desktop过程
设置好用户名和密码后执行：
```shell
sudo apt update
sudo apt dist-upgrade
```
如果所使用的网络支持IPv6，下载慢而且不时卡住不动，可能是apt使用了IPv6，而IPv6网络状况不佳，可以尝试给apt命令添加<span style=" background-color:#e1ffff">`-o Acquire::ForceIPv4=true`</span>参数以强制其使用IPv4下载。如果使用IPv4下载还是很慢，建议先修改apt源。  
安装`Ubuntu Desktop`：
```shell
sudo apt install ubuntu-desktop
```
会下载安装很多组件，需要耐心等待……  
安装`mesa-utils`：
```shell
sudo apt install mesa-utils
```
### 尝试启动GNOME
安装完成后可尝试手动启动GNOME，首先启动`dbus`服务：
```shell
sudo service dbus start
```
执行：
```shell
sudo chmod -R 777 ~/.cache
```
然后运行`XLaunch`，选择`One window without titlebar`，其他保持默认，会出现一个黑色窗口。  
启动GNOME：
```shell
DISPLAY=:0 XDG_SESSION_TYPE=x11 gnome-session
```
退出VcXsrv即可关闭gnome-session。
### 制作快速访问
以我的Ubuntu用户目录`/home/csj430`为例，新建`StartGNOME.bat`文件写入如下内容：
```shell
wsl -d ubuntu -u root /etc/init.d/dbus restart
bash -c "cd /home/csj430 && DISPLAY=:0 XDG_SESSION_TYPE=x11 gnome-session"
```
确保`StartGNOME.bat`的路径不带空格。  
以我的`StartGNOME.bat`路径`E:\StartGNOME.bat`为例
新建`GNOME.xlaunch`文件写入如下内容：
```xml
<XLaunch
    WindowMode="Nodecoration"
    ClientMode="StartProgram"
    LocalClient="True"
    Display="0"
    LocalProgram="E:\StartGNOME.bat >nul 2>nul"
    RemoteProgram=""
    RemotePassword=""
    PrivateKey=""
    RemoteHost=""
    RemoteUser=""
    XDMCPHost=""
    XDMCPBroadcast="False"
    XDMCPIndirect="False"
    Clipboard="True"
    ClipboardPrimary="False"
    ExtraParams=""
    Wgl="False"
    DisableAC="False"
    XDMCPTerminate="False"
/>
```
双击`GNOME.xlaunch`即可启动GNOME。

## 参考资料
<http://martin1994.sinaapp.com/archives/970>
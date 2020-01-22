---
layout: post
title:  "2018-10-27 Hadoop resourcemanager启动时报错NoClassDefFoundError解决方法"
date:   2018-10-27 20:18:27 +0000
categories: Hadoop
tags: hadoop Hadoop
comments: 1
hidden: 1
---
安装了hadoop3.0.3，完成配置后，用winutils里3.0.0版本的bin目录替换了原有的bin目录。执行start-all.cmd后，resourcemanager启动时报错：java.lang.NoClassDefFoundError: org/apache/hadoop/yarn/server/timelineservice/collector/TimelineCollectorManager，<http://localhost:8088/>也打不开。  
参考<https://stackoverflow.com/questions/51118358/noclassdeffounderror-org-apache-hadoop-yarn-server-timelineservice-collector-tim>，把~\hadoop-3.0.3\share\hadoop\yarn\timelineservice下的hadoop-yarn-server-timelineservice-3.0.3.jar复制到~\hadoop-3.0.3\share\hadoop\yarn后，resourcemanager启动正常，<http://localhost:8088/>能打开。
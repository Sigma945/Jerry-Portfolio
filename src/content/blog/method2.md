---
title: "VS 編譯舊版framework"
description: "紀錄怎麼解決舊framework的問題"
date: 2026-06-05
notion_id: "3769698a-84a3-807a-b6a1-fce5ba220d17"
---


### **一、 先到nuget下載**[**.net framework版本**](https://www.nuget.org/packages/microsoft.netframework.referenceassemblies.net40)


![image.png](/images/blog/method2/01.png)


### **二、 將副檔名改為.zip後解壓縮**


![image.png](/images/blog/method2/02.png)


### **三、 複製資料夾內的****`build/.NETFramework`****檔案**


![image.png](/images/blog/method2/03.png)


### **四、 覆蓋到本機目錄**


`C:\Program Files (x86)\Reference Assemblies\Microsoft\Framework\.NETFramework`



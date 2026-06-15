---
title: "安裝SQL Server錯誤"
description: "安裝SSMS 2022錯誤排錯方法"
date: 2026-06-05
notion_id: "3769698a-84a3-80a0-9d7d-f90930a3430e"
---


## **在安裝過程遇到找不到Microsoft OLE DB Driver for SQL Server 錯誤**


![image.png](/images/blog/Method/01.png)


### 有兩種情況

1. 單純沒有安裝Microsoft OLE DB Driver for SQL Server
2. 因為舊有的OLE DB Driver卡住

狀況1就很單純只需要去下載  [msoledbsql.msi](https://learn.microsoft.com/en-us/sql/connect/oledb/download-oledb-driver-for-sql-server?view=sql-server-ver17) 來安裝即可


狀況2比較麻煩，要先到控制台 => 程式和功能 ，去找到舊的驅動並移除


 (如果無法移除請參考微軟提供的步驟處理)


移除後再比照狀況1重新安裝驅動


## **在安裝過程找不到指定路徑的錯誤**


![image.png](/images/blog/Method/02.png)


是殘留環境的設定導致的


透過錯誤紀錄 "C:\Program Files\Microsoft SQL Server\160\Setup Bootstrap\Log\20260410_095233\Detail.txt"


確認到是因為安裝時有勾選FILESTREAM，然後Basic安裝方案會自動勾選，加上自動建立 instance ( 例如 `MSSQLSERVER001` )


改使用自訂(Custom)安裝
選完安裝路徑後會到SQL Server安裝中心
選擇新的SQL Server獨立安裝或將功能新增至現有安裝
接下來到特徵選取時只選擇資料庫引擎服務


![image.png](/images/blog/Method/03.png)


並且執行個體組態選擇預設即可(通常沒安裝過會幫你設為MSSQLSERVER)



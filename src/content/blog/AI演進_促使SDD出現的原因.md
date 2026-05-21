---
title: "從 Vibe Coding 到 SDD：AI 開發典範的演進"
description: "從AI的演進過程，和熱門討論技術來看SDD"
date: 2026-05-21
---

# 從 Vibe Coding 到 SDD：AI 開發典範的演進

這幾年 AI 開發的演進，其實不是單純「模型變強」，而是軟體開發的抽象層級不斷上升。

整個過程，可以明顯看到：

> 開發正在從「Implementation-oriented（實作導向）」  
> 走向「Intent-oriented（意圖導向）」。

也就是：

- 人越來越少直接寫 Code
- AI 越來越負責實作
- 人開始專注在需求、流程與產品意圖

這也是後來 SDD（Spec-Driven Development）開始興起的背景。

---

# AI 開發演進時間線

## 2021：AI 開始進入 IDE

代表產品：

- GitHub Copilot

這個階段的核心是：

> AI 成為「程式碼補全工具」

工程師開始可以：

- 自動生成 boilerplate
- 快速寫 CRUD
- 補 test 與 regex
- 降低 syntax 記憶成本

但本質上仍然是：

> 「人寫 Code，AI 協助補全」

---

## 2022–2023：Cursor 與 AI Native IDE 出現

代表產品：

- Cursor

這是第一個真正的轉折點。

AI 不再只是外掛，而是：

> IDE 的核心操作介面

這讓：

- 自然語言開始能直接驅動開發
- 非工程師也能開始做產品
- 開發門檻被大幅降低

此時開發開始從：

- 「寫程式」

轉向：

- 「描述需求」

Vibe Coding 的雛形開始出現。

---

## 2023：No-Code / Workflow 工具爆發

代表產品：

- Make
- n8n

這階段的核心是：

> Workflow abstraction（流程抽象化）

以前需要工程師才能完成的：

- API 串接
- 自動化
- ETL
- Event Flow

開始能透過：

- 拖拉
- 視覺化流程

完成。

這讓大量不具工程背景的人：

> 第一次具備「建立系統」的能力。

---

## 2023–2024：AI Agent 開始出現

代表方向：

- AutoGPT 類型 Agent
- Computer Use Agent
- OpenClaw 類型專案

核心改變：

> AI 開始不只「回答」
> 而是「行動」

AI 開始能：

- 使用 Terminal
- 操作 Browser
- 修改檔案
- 執行工具
- 自主完成任務

這是 AI 從：

- 知識系統

變成：

- 行為系統

的重要轉折。

---

## 2024–2026：Claude 與通用型 Agent 時代

代表產品：

- Claude
- ChatGPT
- Gemini

AI 開始具備：

- 長 context
- reasoning
- coding
- planning
- writing
- tool use
- multimodal 能力

這時 AI 已經不只是：

> Coding Assistant

而開始變成：

> Cognitive Operating System

也因此：

- 「寫 Code」的重要性下降
- 「定義需求與規格」的重要性上升

---

# Vibe Coding 的本質

Vibe Coding 並不只是：

> 「用 AI 幫忙寫程式」

而是：

> 「人負責意圖，AI 負責實作」

開發者開始描述的是：

- 產品感覺
- UX
- 商業邏輯
- Workflow
- Desired Outcome

而不是：

- syntax
- framework API
- implementation detail

這代表：

> Software Development 正在從 Craftsmanship
> 走向 Orchestration。

---

# 為什麼 SDD（Spec-Driven Development）會出現？

當 AI 越來越會寫 Code 後：

真正重要的東西開始變成：

- 規格（Spec）
- Constraints
- Architecture
- Business Rules
- System Intent

因為：

> Code 本身逐漸 commodity 化。

未來的開發流程可能會變成：

1. 人撰寫 Spec
2. AI 根據 Spec 實作
3. Agent 自動測試與修正
4. 人負責驗證與方向控制

也就是：

> 從「Programming」
> 變成「Spec Orchestration」。

---

# 總結

這幾年的 AI 開發演進，本質上是一條：

## 「抽象層級持續提升」的歷史

從：

- 寫 Assembly
- 到高階語言
- 到 Framework
- 到 No-Code
- 到 AI Coding
- 到 Agent
- 到 SDD

整個產業正在逐漸走向：

> 「人描述意圖，AI 負責生成系統」

而這可能就是下一代軟體開發的核心典範。

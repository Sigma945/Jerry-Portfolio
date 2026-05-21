# Jerry Portfolio

個人作品集網站，使用 [Astro](https://astro.build/) 建構，透過 GitHub Pages 部署，Blog 內容支援從 Notion 自動同步。

**Live：** https://sigma945.github.io/Jerry-Portfolio/

---

## 主要功能

- 響應式 Layout（手機 / 平板 / 桌機）
- 深色 / 淺色主題切換（預設深色，偏好儲存於 `localStorage`）
- 中 / 英雙語切換（Nav、按鈕、頁面標題；預設中文）
- Blog
  - 文章側邊欄（漢堡選單，點擊跳轉至列表中對應文章）
  - 完整 Markdown 渲染（含標題、列表、code block、引用、表格、`<details>`、嵌入 iframe / video）
  - Markdown 內可使用任意 HTML 嵌入（YouTube / CodePen / 一般網站）
- Projects（用 JSON 管理）
- RSS Feed（`/rss.xml`，從 blog collection 自動產生）
- Footer 連結（Email / GitHub / RSS，含 SVG icon）
- Notion → Blog 自動同步（排程 + 手動觸發）

---

## 技術棧

| 類別 | 技術 |
| ---- | ---- |
| 框架 | Astro 6 |
| 樣式 | Scoped CSS + CSS Variables（少量 Tailwind v4 utilities） |
| 內容 | Astro Content Collections（Blog md / Projects json） |
| 字型 | Geist + Geist Mono（透過 Google Fonts） |
| 自動化 | GitHub Actions（Deploy / Lint / Notion Sync） |
| 部署 | GitHub Pages |

---

## 專案結構

```
src/
├── components/         共用元件
│   ├── icons/          SVG icon 元件（1em + currentColor 規範）
│   ├── BaseLayout 引用 ─ Nav, Footer
│   ├── Button.astro, Card.astro, PageTitle.astro
│   ├── ThemeToggle.astro, LangToggle.astro
│   └── BlogSidebar.astro
├── layouts/
│   └── BaseLayout.astro
├── pages/              路由
│   ├── index.astro     首頁 (Home)
│   ├── about.astro     關於
│   ├── projects/
│   ├── blog/
│   └── rss.xml.ts      RSS feed 產生器
├── content/            內容
│   ├── blog/           文章 markdown
│   └── projects/       專案 JSON
├── data/               靜態資料
│   └── experience.ts   工作經歷
├── styles/
│   └── global.css      主題變數、字型、grid 背景
├── i18n.ts             翻譯字典 + helper
├── routes.ts           路由集中管理 + path() helper
├── site.ts             站點 metadata（site name / tagline / social）
├── utils/
│   └── date.ts         formatDate util
└── content.config.ts   Content collection schemas

scripts/
└── sync-notion.mjs     Notion 同步腳本

.github/workflows/
├── deploy.yml          推送或 sync 完成後部署
└── sync-notion.yml     從 Notion 拉文章
```

---

## 開發指令

```sh
npm install            # 安裝依賴
npm run dev            # 啟動 dev server (localhost:4321/Jerry-Portfolio/)
npm run build          # 建置至 ./dist/
npm run preview        # 預覽建置結果
npm run lint           # ESLint 檢查
npm run check          # Astro type/template 檢查
npm run sync           # 本機跑一次 Notion 同步（需 .env）
```

---

## Notion → Blog 自動同步

### 流程概覽

```
Notion (Status=Published) → sync script → auto-commit → deploy → site
```

1. 在 Notion `Blog Posts` database 寫文章，狀態切 `Published`
2. GitHub Action 排程或手動觸發 `Sync Notion Posts` workflow
3. 將 Notion 頁面轉為 markdown 寫入 `src/content/blog/`，圖片下載至 `public/images/blog/<slug>/`
4. 變更自動 commit，觸發 deploy workflow 重新發佈

### Notion Database 必要欄位

| Property | Type | 必填 | 說明 |
| -------- | ---- | ---- | ---- |
| Title | Title | ✓ | 文章標題 |
| Slug | Text | ✓ | 檔名 / URL（`a-z 0-9 -`） |
| Date | Date | ✓ | 發佈日期 |
| Status | Select | ✓ | `Draft` / `Published` / `Archived` |
| Description | Text | – | 摘要 |
| Tags | Multi-select | – | 標籤 |
| Cover | Files & media | – | 封面圖（保留欄位） |

### 行為

- `Status = Published`：寫入 / 更新 `src/content/blog/<slug>.md`
- `Status = Draft / Archived`：刪除對應檔案與圖片資料夾
- 同步時透過 `notion_id` frontmatter 追蹤頁面，**改 Slug 會自動 rename**
- 手寫文章（無 `notion_id`）永遠不被腳本動到

### 排程

`.github/workflows/sync-notion.yml`：

- 每月 1 號、15 號 00:00 UTC 自動觸發
- 也可手動：Actions → `Sync Notion Posts` → `Run workflow`

### 本機設定（測試用）

```sh
cp .env.example .env
# 填入 NOTION_TOKEN（Internal Integration）與 NOTION_DATABASE_ID
npm run sync
```

`.env` 已 gitignored；線上由 GitHub Secrets 提供。

---

## CI/CD

| Workflow | 觸發 | 用途 |
| -------- | ---- | ---- |
| `deploy.yml` | push to main / sync 完成 / 手動 | Lint → Build → Deploy 到 GitHub Pages |
| `sync-notion.yml` | 排程（每兩週）/ 手動 | 從 Notion 拉文章並 commit |

Sync 完成後會透過 `workflow_run` 事件鏈式觸發 deploy（GitHub 對 `GITHUB_TOKEN` push 有迴圈防護，需要顯式串接）。

---

## 設計規範

- **顏色**：透過 `src/styles/global.css` 的 CSS 變數（`--bg`、`--fg`、`--muted`、`--accent` 等），元件用 token 不用寫死值
- **間距**：採 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 spacing scale
- **字型**：`var(--font-sans)` / `var(--font-mono)`，meta 文字（日期、tag）一律用 mono
- **元件職責**：每個 `.astro` 自帶 scoped style；資料、路由、i18n 各自獨立模組
- **Icon**：所有 SVG icon 統一放 `src/components/icons/`，遵循 `1em + currentColor` 規範

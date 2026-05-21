export interface ExperienceItem {
  name: string;
  frontend: string;
  /** 與 commonStack.backend 不重複的額外技術 */
  backend: string;
  db: string;
}

/** 所有後端專案共用的基底，僅出現在頁面的「baseline」說明，不重複寫進每筆 experience。 */
export const commonStack = {
  backend: "ASP.NET Core、C#、EF Core、Swagger",
};

export const experience: ExperienceItem[] = [
  {
    name: "線上課程平台",
    frontend: "Nuxt 3、Vue 3、TypeScript、Pinia、Bootstrap 5、Sass",
    backend: ".NET 8、JWT、Worker Service",
    db: "SQL Server、DB First",
  },
  {
    name: "財務管理系統",
    frontend: "Nuxt 3、Vue 3、TypeScript、PrimeVue 4、Tailwind CSS、Pinia",
    backend: ".NET 8、JWT、Quartz.NET",
    db: "SQL Server、Code First",
  },
  {
    name: "員工訓練系統",
    frontend: "Angular 21、TypeScript、Tailwind CSS v4",
    backend: ".NET 10、MediatR、FluentValidation、Dapper",
    db: "PostgreSQL、Code First",
  },
];

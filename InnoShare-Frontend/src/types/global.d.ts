declare module "*.css" {
    const classes: { [key: string]: string };
    export default classes;
  }
  declare global {
    interface Window {
      MathJax: any;  // 让 TypeScript 识别 MathJax 为 any 类型
    }
  }
  export {};
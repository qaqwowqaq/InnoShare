// shims-vue.d.ts
declare module '*.vue' {
    import { DefineComponent } from 'vue';
    const component: DefineComponent<{}, {}, any>;
    export default component;
    
  }
declare module 'markdown-it';
declare module 'markdown-it-mathjax';
declare module 'mathjax';
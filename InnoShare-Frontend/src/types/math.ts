// src/utils/mathjax.ts

declare var MathJax: any;

export function renderMath() {
  if (window.MathJax) {
    MathJax.typeset();
  }
}

export function loadMathJax() {
    if (typeof window.MathJax === 'undefined') {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js';
      script.async = true;
      document.head.appendChild(script);
      
      script.onload = () => {
        console.log('MathJax loaded');
      };
    } else {
      console.log('MathJax already loaded');
    }
  }
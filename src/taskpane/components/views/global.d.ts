// global.d.ts
export { };

declare global {
    interface Window {
        pdfjsLib: typeof import('pdfjs-dist');
    }
}

/**
 * Allow typing for css modules
 * @link https://jaketrent.com/post/typescript-cannot-find-css-module/
 */

declare module '*.module.css' {
  const content: Record<string, string>;
  export default content;
}

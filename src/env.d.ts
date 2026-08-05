/// <reference types="astro/client" />

// @rollup/plugin-yaml turns .yml imports into plain objects at build time.
declare module '*.yml' {
  const value: any;
  export default value;
}

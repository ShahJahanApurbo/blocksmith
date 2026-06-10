import { parse as babelParse } from "@babel/parser"
import type { File } from "@babel/types"

export function parseJsx(fragment: string): File {
  const source = `const __root = (<>${fragment}</>);`
  return babelParse(source, {
    sourceType: "module",
    plugins: ["jsx", "typescript"],
  })
}

import React from "react"
import ReactDOM from "react-dom/client"

import { BlocksmithEditor } from "../src/BlocksmithEditor"
import "../src/styles/editor.css"

const root = document.getElementById("root")
if (!root) {
  throw new Error("Root element #root not found")
}

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <BlocksmithEditor />
  </React.StrictMode>,
)

import escapeHtml from 'escape-html'

import React from 'react'
import { readFile, writeFile } from "fs/promises"
import path from "path"

export async function renderJSXToHTML(jsx) {
  if (typeof jsx === "string" || typeof jsx === "number") {
    return escapeHtml(jsx);
  } else if (jsx == null || typeof jsx === "boolean") {
    return "";
  } else if (Array.isArray(jsx)) {
    const childHtmls = await Promise.all(
      jsx.map((child) => renderJSXToHTML(child))
    );
    let html = "";
    let wasTextNode = false;
    let isTextNode = false;
    for (let i = 0; i < jsx.length; i++) {
      isTextNode = typeof jsx[i] === "string" || typeof jsx[i] === "number";
      if (wasTextNode && isTextNode) {
        html += "<!-- -->";
      }
      html += childHtmls[i];
      wasTextNode = isTextNode;
    }
    return html;
    // return childHtmls.join("");
  } else if (typeof jsx === "object") {
    if (jsx.$$typeof === Symbol.for("react.element")) {
      // 普通 HTML 标签
      if (typeof jsx.type === "string") {
        let html = "<" + jsx.type;
        for (const propName in jsx.props) {
          if (jsx.props.hasOwnProperty(propName) && propName !== "children") {
            html += " ";
            html += propName;
            html += "=";
            html += `"${escapeHtml(jsx.props[propName])}"`;
          }
        }
        html += ">";
        html += await renderJSXToHTML(jsx.props.children);
        html += "</" + jsx.type + ">";
        html = html.replace(/className/g, "class")
        return html;
      }
      // 组件类型如 <BlogPostPage> 
      else if (typeof jsx.type === "function") {
        const Component = jsx.type;
        const props = jsx.props;
        const returnedJsx = await Component(props);
        return renderJSXToHTML(returnedJsx); 
      } else throw new Error("Not implemented.");
    } else throw new Error("Cannot render an object.");
  } else throw new Error("Not implemented.");
}

export async function renderJSXToClientJSX(jsx) {
  if (
    typeof jsx === "string" ||
    typeof jsx === "number" ||
    typeof jsx === "boolean" ||
    jsx == null
  ) {
    return jsx;
  } else if (Array.isArray(jsx)) {
    return Promise.all(jsx.map((child) => renderJSXToClientJSX(child)));
  } else if (jsx != null && typeof jsx === "object") {
    if (jsx.$$typeof === Symbol.for("react.element")) {
      if (typeof jsx.type === "string") {
        return {
          ...jsx,
          props: await renderJSXToClientJSX(jsx.props),
        };
      } else if (typeof jsx.type === "function") {
        const Component = jsx.type;
        const props = jsx.props;
        const isClientComponent = Component.toString().includes("use client")
        if (isClientComponent) {
          return await transformClientComponent(Component, props)
        } else {
          const returnedJsx = await Component(props)
          return renderJSXToClientJSX(returnedJsx)
        }
      } else throw new Error("Not implemented.");
    } else {
      return Object.fromEntries(
        await Promise.all(
          Object.entries(jsx).map(async ([propName, value]) => [
            propName,
            await renderJSXToClientJSX(value),
          ])
        )
      );
    }
  } else throw new Error("Not implemented");
}

export function stringifyJSX(key, value) {
  if (value === Symbol.for("react.element")) {
    // We can't pass a symbol, so pass our magic string instead.
    return "$RE"; // Could be arbitrary. I picked RE for React Element.
  } else if (typeof value === "string" && value.startsWith("$")) {
    // To avoid clashes, prepend an extra $ to any string already starting with $.
    return "$" + value;
  } else {
    return value;
  }
}

export function parseJSX(key, value) {
  if (value === "$RE") {
    return Symbol.for("react.element");
  } else if (typeof value === "string" && value.startsWith("$$")) {
    return value.slice(1);
  } else {
    return value;
  }
}


async function transformClientComponent(Component, props) {

  const raw = Component.toString()
  const children = await renderJSXToClientJSX(props.children)

  const clientComponent = {
    value: raw,
    props: {
      ...props,
      "data-client": true,
      "data-component": Component.name,
      children,
    },
  }

  await createClientComponentJS(clientComponent)

  return React.createElement(
    "div",
    {
      "data-client": true,
      "data-component": Component.name
    }
  )
}

async function createClientComponentJS(Component) {
  const { props, value } = Component
  const name = props["data-component"]
  const filenameRaw = path.join(process.cwd(), "public", "client", name + ".js")
  const filename = path.normalize(filenameRaw)
  const fileContents = `import React from "react"
      export const props = ${JSON.stringify(props)}
      export const jsx = ${value.replaceAll('import_react.default', 'React')}`
  try {
    await writeFile(filename, fileContents)
  } catch (err) {
    console.log("error in writeComponentToDisk", err)
  }
}
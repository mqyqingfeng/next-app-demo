import escapeHtml from 'escape-html'

export function renderJSXToHTML(jsx) {
  if (typeof jsx === "string" || typeof jsx === "number") {
    return escapeHtml(jsx);
  } else if (jsx == null || typeof jsx === "boolean") {
    return "";
  } else if (Array.isArray(jsx)) {
    return jsx.map((child) => renderJSXToHTML(child)).join("");
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
        html += renderJSXToHTML(jsx.props.children);
        html += "</" + jsx.type + ">";
        html = html.replace(/className/g, "class")
        return html;
      }
      // 组件类型如 <BlogPostPage> 
      else if (typeof jsx.type === "function") {
        const Component = jsx.type;
        const props = jsx.props;
        const returnedJsx = Component(props);
        return renderJSXToHTML(returnedJsx); 
      } else throw new Error("Not implemented.");
    } else throw new Error("Cannot render an object.");
  } else throw new Error("Not implemented.");
}
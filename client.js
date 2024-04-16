import * as React from "react"
import { use, useState, startTransition } from "react"
import { createFromFetch } from "react-server-dom-webpack"
import { hydrateRoot } from 'react-dom/client';

// 客户端路由缓存
let clientJSXCache = {}
let currentPathname = window.location.pathname
let updateRoot

function Shell({ data }) {
  console.log("Shell", data)
  const [root, setRoot] = useState(use(data))
  clientJSXCache[currentPathname] = root
  updateRoot = setRoot
  return root
}

let data = createFromFetch(
  fetch(currentPathname + '?jsx')
)

hydrateRoot(document, React.createElement(Shell, { data }))

async function navigate(pathname) {
  currentPathname = pathname;
  if (clientJSXCache[pathname]) {
    updateRoot(clientJSXCache[pathname])
    return
  } else {
    const response = fetch(pathname + '?jsx')
    const root = await createFromFetch(response)
    clientJSXCache[pathname] = root
    startTransition(() => {
      updateRoot(root)
    })
  }
}

window.addEventListener("click", (e) => {
  // 忽略非 <a> 标签点击事件
  if (e.target.tagName !== "A") {
    return;
  }
  // 忽略 "open in a new tab".
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
    return;
  }
  // 忽略外部链接
  const href = e.target.getAttribute("href");
  if (!href.startsWith("/")) {
    return;
  }
  // 组件浏览器重新加载页面
  e.preventDefault();
  // 但是 URL 还是要更新
  window.history.pushState(null, null, href);
  // 调用我们自己的导航逻辑
  navigate(href);
}, true);

window.addEventListener("popstate", () => {
  // 处理浏览器前进后退事件
  navigate(window.location.pathname);
});
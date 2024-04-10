let currentPathname = window.location.pathname;

async function navigate(pathname) {
  currentPathname = pathname;
  const response = await fetch(pathname + "?jsx");
  const jsonString = await response.text();
  if (pathname === currentPathname) {
    console.log(jsonString);
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
// 解析 Markdown 到 HTML 的简单转换器
function markdownToHTML(markdown) {
  return markdown
    .replace(/^# (.*$)/gim, "<h1>$1</h1>")
    .replace(/^## (.*$)/gim, "<h2>$1</h2>")
    .replace(/^### (.*$)/gim, "<h3>$1</h3>")
    .replace(/\*\*(.*)\*\*/gim, "<strong>$1</strong>")
    .replace(/\*(.*)\*/gim, "<em>$1</em>")
    .replace(/^- (.*$)/gim, "<li>$1</li>")
    .replace(/\n/gim, "<br>");
}

// 获取 URL 参数
const params = new URLSearchParams(window.location.search);
const slug = params.get("slug");

if (slug) {
  // 根据 slug 加载 Markdown 文件
  fetch(`posts/${slug}.md`)
    .then((res) => res.text())
    .then((markdown) => {
      // 解析 Markdown 并渲染到页面
      const postContent = document.getElementById("post-content");
      const postTitle = document.getElementById("post-title");

      postContent.innerHTML = markdownToHTML(markdown);

      // 设置标题
      const titleMatch = markdown.match(/^# (.*$)/m);
      if (titleMatch) {
        postTitle.textContent = titleMatch[1];
      }
    })
    .catch((err) => {
      console.error("文章加载失败", err);
      document.getElementById("post-content").innerHTML = "<p>文章不存在。</p>";
    });
}

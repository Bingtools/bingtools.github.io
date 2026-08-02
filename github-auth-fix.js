// =========================================================
// GitHub API Auth Cleanup for bingtools.github.io
// =========================================================
// 公开读取不需要 token，写入从浏览器 localStorage 读取。
// 不会把长期 token 写进前端源码。
(function () {
  var TOKEN_KEY = "bingo_github_token";
  var AUTHOR_KEY = "bingo_author_auth";
  var AUTHOR_PASS = "bingo2026";
  var API_ROOT = "https://api.github.com/repos/Bingtools/Bingo-Tools/";

  // ---------- token 读写 ----------
  function getToken() {
    try { return (localStorage.getItem(TOKEN_KEY) || "").trim(); }
    catch (e) { return ""; }
  }

  function saveToken(token) {
    try {
      if (token) localStorage.setItem(TOKEN_KEY, token.trim());
      else localStorage.removeItem(TOKEN_KEY);
    } catch (e) {}
  }

  function clearStaleToken() { saveToken(""); }

  function ensureToken(actionText) {
    var token = getToken();
    if (token) return token;
    token = prompt(
      (actionText || "写入 GitHub") + "需要 GitHub Token。\n" +
      "请粘贴 fine-grained token，权限至少包含 Bingtools/Bingo-Tools 的 Issues: Read and write。\n" +
      "Token 只保存在你当前浏览器的 localStorage，不会写进网页源码。"
    );
    if (!token) return "";
    token = token.trim();
    saveToken(token);
    return token;
  }

  // ---------- 暴露清理接口 ----------
  window.clearGitHubToken = clearStaleToken;
  window.setGitHubToken = saveToken;
  window.getGitHubToken = getToken;

  // ---------- Monkey-patch XMLHttpRequest ----------
  // 拦截所有指向 Bingtools/Bingo-Tools 仓库的 GitHub API 请求：
  //   GET → 剥离 Authorization 头（公开数据不需要 token，避免 401）
  //   POST / PATCH / DELETE → 用 localStorage token 替换任何硬编码 token
  var _open = XMLHttpRequest.prototype.open;
  var _setReq = XMLHttpRequest.prototype.setRequestHeader;

  XMLHttpRequest.prototype.open = function (method, url) {
    this.__bingoMethod = String(method || "GET").toUpperCase();
    this.__bingoUrl = String(url || "");
    return _open.apply(this, arguments);
  };

  XMLHttpRequest.prototype.setRequestHeader = function (name, value) {
    var hdr = String(name || "").toLowerCase();
    var url = this.__bingoUrl || "";

    // 只处理 Bingtools/Bingo-Tools 仓库的 API 请求
    if (hdr !== "authorization" || url.indexOf(API_ROOT) !== 0) {
      return _setReq.apply(this, arguments);
    }

    var val = String(value || "");

    // 公开 GET 请求：剥离 token，避免失效 token 导致 401
    if (this.__bingoMethod === "GET") {
      return; // 不发送 Authorization 头
    }

    // 写入请求：用 localStorage token 替换硬编码/过期的 token
    var token = getToken();
    if (!token || val.indexOf("ghp_") !== -1) {
      // 当前没有合法 token，或者传进来的是源码里可能失效的老 token
      token = ensureToken("发布 / 更新内容");
    }
    if (!token) return; // 用户取消，不发送请求头

    return _setReq.call(this, name, "Bearer " + token);
  };

  // ---------- 专用写入辅助（用于非 tools.js 触发的写入，如删除、置顶等） ----------
  function apiWrite(method, url, body, actionText) {
    return new Promise(function (resolve, reject) {
      var token = ensureToken(actionText);
      if (!token) { reject("缺少 Token"); return; }
      var xhr = new XMLHttpRequest();
      xhr.open(method, url, true);
      xhr.setRequestHeader("Authorization", "Bearer " + token);
      xhr.setRequestHeader("Accept", "application/vnd.github+json");
      if (body) xhr.setRequestHeader("Content-Type", "application/json");
      xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(xhr.responseText ? JSON.parse(xhr.responseText) : {});
          return;
        }
        if (xhr.status === 401 || xhr.status === 403) clearStaleToken();
        var msg = "error";
        try { msg = JSON.parse(xhr.responseText || "{}").message || msg; } catch (e) {}
        reject(xhr.status + ": " + msg);
      };
      xhr.onerror = function () { reject("网络错误"); };
      xhr.send(body ? JSON.stringify(body) : null);
    });
  }

  // ---------- 作者工具函数 ----------
  function isAuthor() {
    try { return localStorage.getItem(AUTHOR_KEY) === AUTHOR_PASS; }
    catch (e) { return false; }
  }

  function textFix(el) {
    // "回复" → "评论"
    if (el.placeholder && el.placeholder.indexOf("回复") > -1) el.placeholder = "评论...";
    if (el.textContent) el.textContent = el.textContent.replace(/回复/g, "评论");
  }

  function patchDeleteButtons() {
    if (!isAuthor()) return;
    var area = document.getElementById("msgList");
    if (!area) return;

    area.querySelectorAll(".msg-item").forEach(function (item) {
      if (item.querySelector(".msg-item-del")) return;
      var replyBtn = item.querySelector(".msg-item-reply-btn");
      var meta = item.querySelector(".msg-item-meta");
      if (!replyBtn || !meta || !replyBtn.dataset.num) return;

      var del = document.createElement("span");
      del.className = "msg-item-del";
      del.textContent = "删除";
      del.title = "关闭对应 GitHub Issue";
      del.addEventListener("click", function (e) {
        e.stopPropagation();
        if (!confirm("确定删除这条留言？")) return;
        var oldText = del.textContent;
        del.textContent = "...";
        apiWrite("PATCH", API_ROOT + "issues/" + replyBtn.dataset.num, { state: "closed" }, "删除留言")
          .then(function () { item.remove(); })
          .catch(function (err) {
            del.textContent = oldText;
            alert("删除失败: " + String(err).slice(0, 80));
          });
      });
      meta.appendChild(del);
    });
  }

  function fixTextAndButtons() {
    var area = document.getElementById("msgList");
    if (!area) return;
    area.querySelectorAll(".msg-item-reply-btn, .msg-reply-input, .msg-reply-nick, .msg-reply-time").forEach(textFix);
    patchDeleteButtons();
  }

  // ---------- 初始化 ----------
  function boot() {
    // 作者身份切换时触发 token 检查和按钮刷新
    var authorToggle = document.getElementById("authorToggle");
    if (authorToggle) {
      authorToggle.addEventListener("click", function () {
        setTimeout(function () {
          if (isAuthor() && !getToken()) ensureToken("作者写入功能");
          fixTextAndButtons();
        }, 100);
      }, true);
    }

    // 监听留言列表 DOM 变化，自动补充删除按钮
    var msgList = document.getElementById("msgList");
    if (msgList) {
      new MutationObserver(fixTextAndButtons).observe(msgList, { childList: true, subtree: false });
    }

    fixTextAndButtons();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();

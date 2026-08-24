(function () {
  const nav = document.getElementById('mainNav');
  const menu = document.getElementById('mobileMenuBtn');
  const search = document.getElementById('searchInput');
  const grid = document.getElementById('toolGrid');
  const showMore = document.getElementById('showMoreBtn');
  const overlay = document.getElementById('tutorialOverlay');
  const toast = document.getElementById('previewToast');
  let expanded = false;
  let toastTimer;

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
  }

  function setNav(open) {
    nav.classList.toggle('open', open);
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? '关闭导航' : '打开导航');
  }

  menu.addEventListener('click', () => setNav(!nav.classList.contains('open')));
  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      setNav(false);
      nav.querySelectorAll('.rail-nav a').forEach((item) => item.classList.toggle('active', item === link));
    });
  });

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  function refreshList() {
    const hasQuery = search.value.trim().length > 0;
    grid.classList.toggle('registry-collapsed', !expanded && !hasQuery);
    showMore.hidden = hasQuery || grid.children.length <= 10;
    showMore.innerHTML = expanded ? 'COLLAPSE MODULES <span>↑</span>' : 'LOAD ALL MODULES <span>↓</span>';
  }

  showMore.addEventListener('click', () => {
    expanded = !expanded;
    refreshList();
  });
  search.addEventListener('input', refreshList);
  new MutationObserver(refreshList).observe(grid, { childList: true });
  refreshList();

  function openDocs() {
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden', 'false');
    document.getElementById('tutorialClose').focus();
  }

  function closeDocs() {
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
  }

  document.getElementById('tutorialNavBtn').addEventListener('click', openDocs);
  document.getElementById('tutorialShortcut').addEventListener('click', openDocs);
  document.getElementById('tutorialClose').addEventListener('click', closeDocs);
  overlay.addEventListener('click', (event) => { if (event.target === overlay) closeDocs(); });

  ['previewDownloadBtn', 'previewDownloadBtnSecondary'].forEach((id) => {
    document.getElementById(id).addEventListener('click', () => {
      window.location.href = 'https://github.com/Bingtools/bingtools.github.io/releases/download/toolbox-v8.8.56/Bingo_ToolBox_v8.8.56_20260813.exe';
    });
  });

  window.addEventListener('keydown', (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      search.focus();
      search.select();
    }
    if (event.key === 'Escape') {
      closeDocs();
      setNav(false);
      document.getElementById('detailPanel').classList.remove('mobile-open');
    }
  });
})();

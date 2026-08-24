(function () {
  'use strict';

  class CosmicUniverse {
    constructor(containerId) {
      this.container = document.getElementById(containerId);
      if (!this.container || typeof THREE === 'undefined') {
        document.body.classList.add('no-webgl');
        return;
      }
      this.mouseX = 0;
      this.mouseY = 0;
      this.dragX = 0;
      this.dragY = 0;
      this.pointerDown = false;
      this.lastPointer = null;
      this.init();
      this.bind();
      this.animate();
    }

    init() {
      this.scene = new THREE.Scene();
      this.scene.fog = new THREE.FogExp2(0x030305, 0.0022);
      this.camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);
      this.camera.position.z = 9;

      this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      this.renderer.setSize(innerWidth, innerHeight);
      this.renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2));
      this.container.appendChild(this.renderer.domElement);
      this.clock = new THREE.Clock();

      const foregroundGeometry = new THREE.BufferGeometry();
      const foregroundCount = innerWidth < 800 ? 1800 : 3000;
      const foregroundPositions = new Float32Array(foregroundCount * 3);
      for (let i = 0; i < foregroundPositions.length; i++) foregroundPositions[i] = (Math.random() - .5) * 25;
      foregroundGeometry.setAttribute('position', new THREE.BufferAttribute(foregroundPositions, 3));
      const foregroundMaterial = new THREE.PointsMaterial({
        size: .03,
        color: 0xffffff,
        transparent: true,
        opacity: .82,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });
      this.foreground = new THREE.Points(foregroundGeometry, foregroundMaterial);
      this.scene.add(this.foreground);

      const backgroundGeometry = new THREE.BufferGeometry();
      const backgroundCount = innerWidth < 800 ? 2600 : 5000;
      const backgroundPositions = new Float32Array(backgroundCount * 3);
      for (let i = 0; i < backgroundPositions.length; i++) backgroundPositions[i] = (Math.random() - .5) * 80;
      backgroundGeometry.setAttribute('position', new THREE.BufferAttribute(backgroundPositions, 3));
      const backgroundMaterial = new THREE.PointsMaterial({
        size: .05,
        color: 0x88ccff,
        transparent: true,
        opacity: .58,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });
      this.background = new THREE.Points(backgroundGeometry, backgroundMaterial);
      this.scene.add(this.background);

      const accentGeometry = new THREE.BufferGeometry();
      const accentCount = innerWidth < 800 ? 130 : 260;
      const accentPositions = new Float32Array(accentCount * 3);
      for (let i = 0; i < accentPositions.length; i++) accentPositions[i] = (Math.random() - .5) * 38;
      accentGeometry.setAttribute('position', new THREE.BufferAttribute(accentPositions, 3));
      const accentMaterial = new THREE.PointsMaterial({
        size: .085,
        color: 0xa788ff,
        transparent: true,
        opacity: .68,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });
      this.accents = new THREE.Points(accentGeometry, accentMaterial);
      this.scene.add(this.accents);
    }

    bind() {
      addEventListener('mousemove', (event) => {
        this.mouseX = event.clientX - innerWidth / 2;
        this.mouseY = event.clientY - innerHeight / 2;
      }, { passive: true });
      addEventListener('pointerdown', (event) => {
        if (event.target.closest('button, a, .orbit-stack-stage, .panel-overlay')) return;
        this.pointerDown = true;
        this.lastPointer = { x: event.clientX, y: event.clientY };
      });
      addEventListener('pointermove', (event) => {
        if (!this.pointerDown || !this.lastPointer) return;
        this.dragX += (event.clientX - this.lastPointer.x) * .0025;
        this.dragY += (event.clientY - this.lastPointer.y) * .0018;
        this.lastPointer = { x: event.clientX, y: event.clientY };
      });
      addEventListener('pointerup', () => { this.pointerDown = false; this.lastPointer = null; });
      addEventListener('resize', () => {
        this.camera.aspect = innerWidth / innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(innerWidth, innerHeight);
      }, { passive: true });
    }

    animate() {
      const elapsed = this.clock.getElapsedTime();
      const targetX = this.mouseX * .001 + this.dragX;
      const targetY = this.mouseY * .001 + this.dragY;
      this.foreground.rotation.y += ((elapsed * .05 + targetX * .5) - this.foreground.rotation.y) * .075;
      this.foreground.rotation.x += ((elapsed * .02 + targetY * .08) - this.foreground.rotation.x) * .05;
      this.background.rotation.y = elapsed * .01 + this.dragX * .15;
      this.background.rotation.x += (this.dragY * .04 - this.background.rotation.x) * .035;
      this.accents.rotation.y = -elapsed * .018 + this.dragX * .25;
      this.accents.rotation.z = elapsed * .008;
      this.camera.position.x += (this.mouseX * .005 - this.camera.position.x) * .05;
      this.camera.position.y += (-this.mouseY * .005 - this.camera.position.y) * .05;
      this.camera.position.z += (5 - this.camera.position.z) * .025;
      this.renderer.render(this.scene, this.camera);
      requestAnimationFrame(() => this.animate());
    }
  }

  const source = window.BINGO_LOCAL_TOOL_PREVIEW;
  if (!source) return;
  const allTools = source.tools;
  const updateLogs = window.BINGO_UPDATE_LOGS || [];
  const categoryInfo = source.categoryInfo;
  const categoryKeys = Object.keys(categoryInfo);
  const updateTypeLabels = { feature: '功能更新', improvement: '体验优化', fix: '问题修复', docs: '文档更新', planned: '后续计划' };
  const stage = document.getElementById('stackStage');
  const iconRoot = '/stellar-source/assets/tool-icons/';
  const toolIconAliases = {
    '三转四面': '三角面转四边面',
    'Animo v6.2.0': 'Animation Helper'
  };
  const thirdPartyToolNames = new Set(['Animation Helper', 'studiolibrary', 'ADV', 'Animo v6.2.0']);
  const toolAuthorOverrides = { 'P4连接器': '祥子' };
  const fallbackToolIcon = iconRoot + encodeURIComponent('选择工具') + '.png';
  const galleryPreviewRoot = '/stellar-source/assets/tool-previews/';
  const toolByName = new Map(allTools.map((tool) => [tool.name, tool]));
  const galleryItems = [
    ['Animation Helper', 'preview-01.png', 1, 1],
    ['IKFK无缝切换', 'preview-02.png', 1, 1],
    ['studiolibrary', 'preview-03.png', 1, 1],
    ['暴力粘贴', 'preview-04.png', 1, 2],
    ['暴力粘贴', 'preview-05.png', 2, 2],
    ['动画镜像', 'preview-06.png', 1, 1],
    ['动画路径', 'preview-07.png', 1, 2],
    ['动画路径', 'preview-08.png', 2, 2],
    ['改帧颜色', 'preview-09.png', 1, 1],
    ['路径指认', 'preview-10.png', 1, 1],
    ['平滑曲线', 'preview-11.png', 1, 1],
    ['视频参考', 'preview-12.png', 1, 2],
    ['视频参考', 'preview-13.png', 2, 2],
    ['ADV', 'preview-14.png', 1, 1],
    ['对称镜像', 'preview-15.png', 1, 1],
    ['控制搭建', 'preview-16.png', 1, 2],
    ['控制搭建', 'preview-17.png', 2, 2],
    ['批量对齐', 'preview-18.png', 1, 1],
    ['批量约束', 'preview-19.png', 1, 1],
    ['曲线显示调整', 'preview-20.png', 1, 1],
    ['三转四面', 'preview-21.png', 1, 1],
    ['丢失贴图查找器', 'preview-22.png', 1, 1],
    ['模面显隐', 'preview-23.png', 1, 1],
    ['强制显示', 'preview-24.png', 1, 1],
    ['Bingo_物理解算', 'preview-25.png', 1, 1],
    ['Bingo_自动布光', 'preview-26.png', 1, 1],
    ['P4连接器', 'preview-27.png', 1, 1],
    ['文件预览', 'preview-28.png', 1, 1],
    ['杀毒', 'preview-29.png', 1, 1]
  ].map(([name, file, shot, total]) => ({ tool: toolByName.get(name), preview: galleryPreviewRoot + file, shot, total })).filter((item) => item.tool);
  let archiveMode = 'tools';
  let activeCategory = 'all';
  let currentItems = allTools.slice();
  let activeIndex = 0;
  let dragStart = null;
  let dragMoved = false;
  let lastWheel = 0;
  let qrMode = 'wechat';
  let toastTimer;
  let galleryIndex = 0;
  let galleryRendered = false;
  let galleryDragStart = null;
  let galleryDragMoved = false;
  let galleryPointerCardIndex = null;
  let galleryPointerId = null;
  const panelReturnFocus = new Map();

  const categoryLabel = (tool) => categoryInfo[tool.category]?.label || tool.category;
  const iconUrl = (tool) => iconRoot + encodeURIComponent(tool.icon || toolIconAliases[tool.name] || tool.name) + '.png';
  const esc = (value) => String(value).replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));

  function toolCredit(tool) {
    const thirdParty = thirdPartyToolNames.has(tool.name);
    return {
      author: thirdParty ? '原作者' : (toolAuthorOverrides[tool.name] || 'Bingo'),
      ownership: thirdParty ? '第三方工具' : '自研工具',
      ownershipClass: thirdParty ? 'third-party' : 'self-developed'
    };
  }

  function renderCategories() {
    const host = document.getElementById('categorySwitch');
    const keys = archiveMode === 'tools'
      ? ['all', ...categoryKeys]
      : ['all', ...new Set(updateLogs.map((item) => item.type))];
    host.innerHTML = keys.map((key) => {
      const label = key === 'all' ? '全部' : archiveMode === 'tools' ? categoryInfo[key].label : updateTypeLabels[key] || key;
      const sourceItems = archiveMode === 'tools' ? allTools : updateLogs;
      const count = key === 'all' ? sourceItems.length : sourceItems.filter((item) => (archiveMode === 'tools' ? item.category : item.type) === key).length;
      return `<button class="${activeCategory === key ? 'active' : ''}" type="button" data-category="${key}">${label}<span>${count}</span></button>`;
    }).join('');
    host.querySelectorAll('button').forEach((button) => {
      button.addEventListener('click', () => {
        activeCategory = button.dataset.category;
        const sourceItems = archiveMode === 'tools' ? allTools : updateLogs;
        currentItems = activeCategory === 'all' ? sourceItems.slice() : sourceItems.filter((item) => (archiveMode === 'tools' ? item.category : item.type) === activeCategory);
        activeIndex = 0;
        renderCategories();
        renderCards();
      });
    });
  }

  function toolCard(tool, index) {
    return `<button class="orbit-card" type="button" data-index="${index}" aria-label="${esc(tool.name)}">
      <span class="card-inner"><span class="card-glare"></span><span class="card-top">
        <span class="card-index"><small>LOCAL ARCHIVE</small><b>${String(index + 1).padStart(2, '0')} / ${String(currentItems.length).padStart(2, '0')}</b></span>
        <img class="card-icon" src="${iconUrl(tool)}" alt="">
      </span><span class="card-main"><small>${esc(categoryLabel(tool))} / ${esc(tool.category.toUpperCase())}</small><h2>${esc(tool.name)}</h2><p>${esc(tool.desc)}</p></span>
      <span class="card-bottom"><span>${esc(tool.tags.slice(0, 2).join(' · '))}</span><b>OPEN ARCHIVE ↗</b></span></span>
    </button>`;
  }

  function updateCard(item, index) {
    return `<button class="orbit-card update-card" type="button" data-index="${index}" aria-label="${esc(item.title)}">
      <span class="card-inner"><span class="card-glare"></span><span class="card-top">
        <span class="card-index"><small>${esc(item.date)}</small><b>${String(index + 1).padStart(2, '0')} / ${String(currentItems.length).padStart(2, '0')}</b></span>
        <span class="update-version">${esc(item.version)}</span>
      </span><span class="card-main"><small>${esc(item.typeLabel)} / CHANGE LOG</small><h2>${esc(item.title)}</h2><p>${esc(item.summary)}</p></span>
      <span class="card-bottom"><span>${esc(item.tags.join(' · '))}</span><b>READ UPDATE ↗</b></span></span>
    </button>`;
  }

  function renderCards() {
    stage.innerHTML = currentItems.map((item, index) => archiveMode === 'tools' ? toolCard(item, index) : updateCard(item, index)).join('');
    stage.querySelectorAll('.orbit-card').forEach((card) => {
      const image = card.querySelector('img');
      if (image) image.addEventListener('error', () => { image.src = fallbackToolIcon; }, { once: true });
      card.addEventListener('click', () => {
        const index = Number(card.dataset.index);
        if (dragMoved) return;
        if (index === activeIndex) openActiveItem();
        else { activeIndex = index; updateStack(false); }
      });
    });
    updateStack(true);
  }

  function updateStack(entering) {
    const mobile = innerWidth <= 820;
    stage.querySelectorAll('.orbit-card').forEach((card, index) => {
      const diff = index - activeIndex;
      const distance = Math.abs(diff);
      const spacing = mobile ? 79 : 126;
      const y = diff * spacing;
      const z = diff === 0 ? 82 : -120 * distance;
      const rotateX = diff === 0 ? 0 : diff * 25;
      const scale = diff === 0 ? 1.055 : Math.max(.7, 1 - distance * .08);
      card.style.transform = `translateY(${entering ? y + 120 : y}px) translateZ(${entering ? z - 250 : z}px) rotateX(${entering ? rotateX + 18 : rotateX}deg) scale(${entering ? scale * .9 : scale})`;
      card.style.opacity = entering ? '0' : String(Math.max(0, 1 - distance * .24));
      card.style.filter = distance > 2 ? 'blur(1.5px)' : 'none';
      card.style.zIndex = String(100 - distance);
      card.style.pointerEvents = distance > 4 ? 'none' : 'auto';
      card.classList.toggle('active', diff === 0);
      card.tabIndex = diff === 0 ? 0 : -1;
      bindActiveTilt(card, diff, y, z, rotateX, scale);
      if (entering) requestAnimationFrame(() => setTimeout(() => {
        card.style.transform = `translateY(${y}px) translateZ(${z}px) rotateX(${rotateX}deg) scale(${scale})`;
        card.style.opacity = String(Math.max(0, 1 - distance * .24));
      }, index * 36));
    });
    const item = currentItems[activeIndex];
    if (!item) return;
    document.getElementById('activePosition').textContent = `${String(activeIndex + 1).padStart(2, '0')} / ${String(currentItems.length).padStart(2, '0')}`;
    document.getElementById('activeCategory').textContent = archiveMode === 'tools'
      ? `${item.category.toUpperCase()} / ${categoryLabel(item)}`
      : `${item.version} / ${item.typeLabel}`;
  }

  function bindActiveTilt(card, diff, y, z, rotateX, scale) {
    card.onpointermove = null;
    card.onpointerleave = null;
    if (diff !== 0 || matchMedia('(pointer: coarse)').matches) return;
    card.onpointermove = (event) => {
      const rect = card.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width;
      const py = (event.clientY - rect.top) / rect.height;
      const tiltY = (px - .5) * 13;
      const tiltX = (.5 - py) * 11;
      card.style.transform = `translateY(${y}px) translateZ(${z + 22}px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(${scale + .018})`;
      card.querySelector('.card-glare').style.background = `radial-gradient(circle at ${px * 100}% ${py * 100}%, rgba(255,255,255,.2), rgba(255,255,255,0) 58%)`;
    };
    card.onpointerleave = () => {
      card.style.transform = `translateY(${y}px) translateZ(${z}px) rotateX(${rotateX}deg) scale(${scale})`;
      card.querySelector('.card-glare').style.background = '';
    };
  }

  function move(step) {
    if (!currentItems.length) return;
    activeIndex = Math.max(0, Math.min(currentItems.length - 1, activeIndex + step));
    updateStack(false);
  }

  addEventListener('wheel', (event) => {
    if (document.querySelector('.panel-overlay.open') || !document.getElementById('archiveView').classList.contains('active-view')) return;
    const now = Date.now();
    if (now - lastWheel < 420) return;
    if (event.deltaY > 0 && activeIndex < currentItems.length - 1) { move(1); lastWheel = now; }
    if (event.deltaY < 0 && activeIndex > 0) { move(-1); lastWheel = now; }
  }, { passive: true });

  stage.addEventListener('pointerdown', (event) => {
    dragStart = event.clientY;
    dragMoved = false;
    stage.setPointerCapture(event.pointerId);
  });
  stage.addEventListener('pointermove', (event) => {
    if (dragStart === null) return;
    const delta = event.clientY - dragStart;
    if (Math.abs(delta) > 8) dragMoved = true;
    if (Math.abs(delta) > 48) { move(delta > 0 ? -1 : 1); dragStart = event.clientY; }
  });
  stage.addEventListener('pointerup', () => { dragStart = null; setTimeout(() => { dragMoved = false; }, 0); });
  document.getElementById('stackPrev').addEventListener('click', () => move(-1));
  document.getElementById('stackNext').addEventListener('click', () => move(1));
  document.getElementById('stackOpen').addEventListener('click', openActiveItem);
  document.getElementById('galleryOpen').addEventListener('click', openToolGallery);
  document.getElementById('galleryPrev').addEventListener('click', () => moveToolGallery(-1));
  document.getElementById('galleryNext').addEventListener('click', () => moveToolGallery(1));
  document.getElementById('galleryDetailOpen').addEventListener('click', openGalleryTool);
  const toolGalleryStage = document.getElementById('galleryStage');

  function galleryCardAtPoint(clientX, clientY) {
    const directHit = document.elementFromPoint(clientX, clientY)?.closest('.tool-gallery-card');
    if (directHit && toolGalleryStage.contains(directHit)) return directHit;

    return [...toolGalleryStage.querySelectorAll('.tool-gallery-card')]
      .map((card) => ({
        card,
        rect: card.getBoundingClientRect(),
        opacity: Number.parseFloat(card.style.opacity || '0'),
        zIndex: Number.parseInt(card.style.zIndex || '0', 10)
      }))
      .filter(({ card, rect, opacity }) => card.style.pointerEvents !== 'none'
        && opacity > .01
        && clientX >= rect.left && clientX <= rect.right
        && clientY >= rect.top && clientY <= rect.bottom)
      .sort((a, b) => b.zIndex - a.zIndex)[0]?.card || null;
  }

  toolGalleryStage.addEventListener('pointerdown', (event) => {
    if (event.button !== 0 || galleryPointerId !== null) return;
    const card = event.target.closest('.tool-gallery-card') || galleryCardAtPoint(event.clientX, event.clientY);
    galleryPointerCardIndex = card ? Number(card.dataset.galleryIndex) : null;
    galleryPointerId = event.pointerId;
    galleryDragStart = { x: event.clientX, y: event.clientY };
    galleryDragMoved = false;
    toolGalleryStage.setPointerCapture(event.pointerId);
  });
  toolGalleryStage.addEventListener('pointermove', (event) => {
    if (galleryDragStart === null || event.pointerId !== galleryPointerId) return;
    const deltaX = event.clientX - galleryDragStart.x;
    const deltaY = event.clientY - galleryDragStart.y;
    if (Math.hypot(deltaX, deltaY) > 8) galleryDragMoved = true;
    if (Math.abs(deltaX) > 52 && Math.abs(deltaX) > Math.abs(deltaY)) {
      moveToolGallery(deltaX < 0 ? 1 : -1);
      galleryDragStart = { x: event.clientX, y: event.clientY };
    }
  });

  const endGalleryPointer = (event, cancelled = false) => {
    if (galleryPointerId === null || event.pointerId !== galleryPointerId) return;
    const selectedIndex = galleryPointerCardIndex;
    const shouldSelect = !cancelled && !galleryDragMoved && Number.isInteger(selectedIndex);
    galleryDragStart = null;
    galleryDragMoved = false;
    galleryPointerCardIndex = null;
    galleryPointerId = null;
    if (toolGalleryStage.hasPointerCapture(event.pointerId)) toolGalleryStage.releasePointerCapture(event.pointerId);
    if (shouldSelect) activateToolGalleryCard(selectedIndex);
  };
  toolGalleryStage.addEventListener('pointerup', (event) => endGalleryPointer(event));
  toolGalleryStage.addEventListener('pointercancel', (event) => endGalleryPointer(event, true));
  toolGalleryStage.addEventListener('lostpointercapture', (event) => {
    if (event.pointerId !== galleryPointerId) return;
    galleryDragStart = null;
    galleryDragMoved = false;
    galleryPointerCardIndex = null;
    galleryPointerId = null;
  });

  function setPanel(id, open) {
    const panel = document.getElementById(id);
    if (open) panelReturnFocus.set(id, document.activeElement);
    panel.classList.toggle('open', open);
    panel.setAttribute('aria-hidden', String(!open));
    document.body.classList.toggle('panel-open', Boolean(document.querySelector('.panel-overlay.open')));
    document.body.classList.toggle('gallery-open', document.getElementById('galleryOverlay').classList.contains('open'));
    if (open) panel.querySelector('.panel-close').focus();
    else {
      const returnTarget = panelReturnFocus.get(id);
      panelReturnFocus.delete(id);
      if (returnTarget && document.contains(returnTarget)) requestAnimationFrame(() => returnTarget.focus());
    }
  }

  function syncToolBody(tool) {
    const all = document.querySelector('[data-actual-category="all"]');
    if (all) all.click();
    const search = document.getElementById('searchInput');
    search.value = tool.name;
    search.dispatchEvent(new Event('input', { bubbles: true }));
    const copy = () => {
      const overlayBody = document.getElementById('toolOverlayBody');
      const fragment = document.createDocumentFragment();
      document.getElementById('detailPanel').childNodes.forEach((node) => fragment.appendChild(node.cloneNode(true)));
      const detailIcon = fragment.querySelector('.actual-detail-head img');
      if (detailIcon) {
        detailIcon.removeAttribute('onerror');
        detailIcon.alt = `${tool.name}工具原始图标`;
        detailIcon.onerror = () => {
          detailIcon.onerror = null;
          detailIcon.src = fallbackToolIcon;
        };
        detailIcon.src = iconUrl(tool);
      }
      overlayBody.replaceChildren(fragment);
    };
    copy();
    setTimeout(copy, 450);
  }

  function openToolRecord(tool) {
    if (!tool) return;
    document.getElementById('toolOverlayMeta').textContent = `${categoryLabel(tool).toUpperCase()} / ${String(allTools.indexOf(tool) + 1).padStart(2, '0')}`;
    document.getElementById('toolOverlayTitle').textContent = tool.name;
    syncToolBody(tool);
    setPanel('toolOverlay', true);
  }

  function openTool() {
    openToolRecord(currentItems[activeIndex]);
  }

  function galleryCard(item, index) {
    const tool = item.tool;
    const credit = toolCredit(tool);
    const shotLabel = item.total > 1 ? `VIEW ${String(item.shot).padStart(2, '0')} / ${String(item.total).padStart(2, '0')}` : 'MAYA UI';
    return `<button class="tool-gallery-card" type="button" data-gallery-index="${index}" data-category="${esc(tool.category)}" aria-label="${esc(tool.name)}界面预览，作者${esc(credit.author)}，${esc(credit.ownership)}">
      <span class="tool-gallery-index">${String(index + 1).padStart(2, '0')} / ${String(galleryItems.length).padStart(2, '0')}</span>
      <span class="tool-gallery-type">${esc(categoryLabel(tool))}</span>
      <span class="tool-gallery-preview"><img src="${item.preview}" alt="${esc(tool.name)} Maya 工具界面" draggable="false" ${index > 5 ? 'loading="lazy"' : ''}></span>
      <span class="tool-gallery-card-copy"><img class="tool-gallery-tool-icon" src="${iconUrl(tool)}" alt="" draggable="false"><span class="tool-gallery-copy-text"><b>${esc(tool.name)}</b><small class="tool-gallery-view">${esc(shotLabel)} · ${esc(tool.tags.slice(0, 2).join(' / '))}</small><span class="tool-gallery-credit"><span class="tool-gallery-author">作者：${esc(credit.author)}</span><span class="tool-gallery-origin ${credit.ownershipClass}">${esc(credit.ownership)}</span></span></span></span>
    </button>`;
  }

  function activateToolGalleryCard(index) {
    if (!Number.isInteger(index) || index < 0 || index >= galleryItems.length) return;
    if (index === galleryIndex) openGalleryTool();
    else {
      galleryIndex = index;
      updateToolGallery(false);
    }
  }

  function renderToolGallery() {
    if (galleryRendered) return;
    const galleryStage = document.getElementById('galleryStage');
    galleryStage.innerHTML = galleryItems.map(galleryCard).join('');
    document.getElementById('galleryDots').innerHTML = galleryItems.map((item, index) => `<button type="button" data-gallery-dot="${index}" aria-label="查看${esc(item.tool.name)}界面"></button>`).join('');
    galleryStage.querySelectorAll('.tool-gallery-card').forEach((card) => {
      const previewImage = card.querySelector('.tool-gallery-preview img');
      previewImage.addEventListener('error', () => {
        const item = galleryItems[Number(card.dataset.galleryIndex)];
        previewImage.src = iconUrl(item.tool);
        card.classList.add('icon-fallback');
      }, { once: true });
      const toolIcon = card.querySelector('.tool-gallery-tool-icon');
      toolIcon.addEventListener('error', () => { toolIcon.src = fallbackToolIcon; }, { once: true });
      card.addEventListener('click', (event) => {
        if (event.detail !== 0) return;
        activateToolGalleryCard(Number(card.dataset.galleryIndex));
      });
    });
    document.getElementById('galleryDots').querySelectorAll('button').forEach((dot) => dot.addEventListener('click', () => {
      galleryIndex = Number(dot.dataset.galleryDot);
      updateToolGallery(false);
    }));
    galleryRendered = true;
    updateToolGallery(true);
  }

  function updateToolGallery(entering) {
    if (!galleryRendered || !galleryItems.length) return;
    const mobile = innerWidth <= 820;
    const length = galleryItems.length;
    const firstSpacing = mobile ? 174 : 280;
    const depthSpacing = mobile ? 78 : 130;
    const zSpacing = mobile ? 90 : 130;
    const visibleLimit = mobile ? 4 : 7;
    document.getElementById('galleryStage').querySelectorAll('.tool-gallery-card').forEach((card, index) => {
      let diff = index - galleryIndex;
      if (diff > length / 2) diff -= length;
      if (diff < -length / 2) diff += length;
      const distance = Math.abs(diff);
      const direction = Math.sign(diff);
      const x = diff === 0 ? 0 : direction * (firstSpacing + (distance - 1) * depthSpacing);
      const z = diff === 0 ? 0 : -zSpacing * distance;
      const rotateY = diff === 0 ? 0 : direction * -25;
      const scale = diff === 0 ? 1.05 : Math.max(.62, .875 - distance * .025);
      const opacity = distance > visibleLimit ? 0 : diff === 0 ? 1 : Math.max(.1, 1 - distance * .15);
      const entryX = x * 1.08;
      card.style.transform = entering
        ? `translateX(${entryX}px) translateZ(${z - 160}px) rotateY(${rotateY + direction * -6}deg) scale(${scale * .86})`
        : `translateX(${x}px) translateZ(${z}px) rotateY(${rotateY}deg) scale(${scale})`;
      card.style.opacity = entering ? '0' : String(opacity);
      card.style.filter = distance > 4 ? 'blur(1px)' : 'none';
      card.style.zIndex = String(100 - distance);
      card.style.pointerEvents = distance > visibleLimit ? 'none' : 'auto';
      card.classList.toggle('active', diff === 0);
      card.tabIndex = diff === 0 ? 0 : -1;
      card.setAttribute('aria-current', diff === 0 ? 'true' : 'false');
    });
    const item = galleryItems[galleryIndex];
    const tool = item.tool;
    const viewLabel = item.total > 1 ? ` · 界面 ${String(item.shot).padStart(2, '0')} / ${String(item.total).padStart(2, '0')}` : '';
    document.getElementById('galleryCategory').textContent = `${tool.category.toUpperCase()} / ${categoryLabel(tool)}${viewLabel}`;
    document.getElementById('galleryName').textContent = tool.name;
    document.getElementById('galleryDescription').textContent = tool.desc;
    const galleryIcon = document.getElementById('galleryIcon');
    galleryIcon.alt = `${tool.name}工具图标`;
    galleryIcon.onerror = () => { galleryIcon.onerror = null; galleryIcon.src = fallbackToolIcon; };
    galleryIcon.src = iconUrl(tool);
    document.getElementById('galleryCount').textContent = `${String(galleryIndex + 1).padStart(2, '0')} / ${String(length).padStart(2, '0')}`;
    document.getElementById('galleryDetailOpen').setAttribute('aria-label', `查看${tool.name}使用说明`);
    let activeDot;
    document.getElementById('galleryDots').querySelectorAll('button').forEach((dot, index) => {
      const active = index === galleryIndex;
      dot.classList.toggle('active', active);
      dot.tabIndex = active ? 0 : -1;
      if (active) activeDot = dot;
    });
    if (mobile && activeDot && document.getElementById('galleryOverlay').classList.contains('open')) {
      activeDot.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'nearest', inline: 'center' });
    }
  }

  function moveToolGallery(step) {
    if (!galleryItems.length) return;
    galleryIndex = (galleryIndex + step + galleryItems.length) % galleryItems.length;
    updateToolGallery(false);
  }

  function openToolGallery() {
    renderToolGallery();
    updateToolGallery(true);
    setPanel('galleryOverlay', true);
    requestAnimationFrame(() => requestAnimationFrame(() => updateToolGallery(false)));
  }

  document.querySelector('#galleryOverlay .tool-gallery-shell').addEventListener('click', (event) => {
    if (event.target === event.currentTarget) setPanel('galleryOverlay', false);
  });

  function openGalleryTool() {
    const item = galleryItems[galleryIndex];
    if (!item) return;
    setPanel('galleryOverlay', false);
    setTimeout(() => openToolRecord(item.tool), 90);
  }

  function openUpdate() {
    const item = currentItems[activeIndex];
    if (!item) return;
    document.getElementById('updateOverlayMeta').textContent = `${item.date} / ${item.version}`;
    document.getElementById('updateOverlayTitle').textContent = item.title;
    document.getElementById('updateOverlayBody').innerHTML = `
      <p class="update-summary">${esc(item.summary)}</p>
      <ul class="update-change-list">${item.changes.map((change, index) => `<li data-index="${String(index + 1).padStart(2, '0')}">${esc(change)}</li>`).join('')}</ul>
      <div class="update-tags">${item.tags.map((tag) => `<span>${esc(tag)}</span>`).join('')}</div>`;
    setPanel('updateOverlay', true);
  }

  function openActiveItem() {
    if (archiveMode === 'tools') openTool();
    else openUpdate();
  }

  function configureArchive(mode) {
    archiveMode = mode;
    activeCategory = 'all';
    activeIndex = 0;
    if (mode === 'tools') {
      currentItems = allTools.slice();
      document.getElementById('archiveKicker').textContent = 'BINGO / MAYA PRODUCTION SYSTEM';
      document.getElementById('archiveTitlePrimary').textContent = 'Explore More';
      document.getElementById('archiveTitleSecondary').textContent = '开启工具星域';
      document.getElementById('archiveDescription').textContent = '把动画、绑定、模型与特效工具组织成一套可探索的本地制作系统。移动鼠标旋转星空，滚轮切换工具档案。';
      document.getElementById('statLabelOne').textContent = 'LOCAL TOOLS'; document.getElementById('statValueOne').textContent = String(allTools.length);
      document.getElementById('statLabelTwo').textContent = 'MAYA HOST'; document.getElementById('statValueTwo').textContent = '2020—26';
      document.getElementById('statLabelThree').textContent = 'BUILD'; document.getElementById('statValueThree').textContent = 'V8.8.61';
      document.querySelector('.archive-heading .archive-label').textContent = 'TOOL ARCHIVE';
      document.querySelector('#stackOpen span').textContent = '查看工具档案';
    } else {
      currentItems = updateLogs.slice();
      document.getElementById('archiveKicker').textContent = 'BINGO / TOOL UPDATE ORBIT';
      document.getElementById('archiveTitlePrimary').textContent = 'Update Orbit';
      document.getElementById('archiveTitleSecondary').textContent = '记录工具轨迹';
      document.getElementById('archiveDescription').textContent = '用时间轴记录工具新增、体验优化、问题修复与文档更新。滚动切换版本，再打开卡片查看完整变化。';
      document.getElementById('statLabelOne').textContent = 'LOG ENTRIES'; document.getElementById('statValueOne').textContent = String(updateLogs.length);
      document.getElementById('statLabelTwo').textContent = 'CURRENT BUILD'; document.getElementById('statValueTwo').textContent = 'V8.8.61';
      document.getElementById('statLabelThree').textContent = 'STATUS'; document.getElementById('statValueThree').textContent = 'DRAFT';
      document.querySelector('.archive-heading .archive-label').textContent = 'CHANGE LOG';
      document.querySelector('#stackOpen span').textContent = '查看更新详情';
    }
    renderCategories();
    renderCards();
  }

  function showView(view, updateHash = true) {
    const home = view === 'home';
    const archive = view === 'tools' || view === 'updates';
    document.getElementById('homeView').classList.toggle('active-view', home);
    document.getElementById('archiveView').classList.toggle('active-view', archive);
    document.getElementById('novaView').classList.toggle('active-view', view === 'nova');
    document.getElementById('interestView').classList.toggle('active-view', view === 'interest');
    document.querySelectorAll('[data-view]').forEach((button) => button.classList.toggle('active', button.dataset.view === view));
    if (archive) configureArchive(view === 'updates' ? 'updates' : 'tools');
    if (updateHash) history.replaceState(null, '', `#${view}`);
  }

  document.querySelectorAll('[data-view]').forEach((button) => button.addEventListener('click', (event) => {
    event.preventDefault();
    showView(button.dataset.view);
  }));

  const tigerPortrait = document.querySelector('.tiger-portrait-stage');
  const tigerVideo = tigerPortrait && tigerPortrait.querySelector('.tiger-portrait-video');
  if (tigerVideo) {
    const showTigerVideo = () => tigerPortrait.classList.add('video-playing');
    const showTigerPoster = () => tigerPortrait.classList.remove('video-playing');
    const tryTigerPlayback = () => {
      if (document.hidden) return;
      const playback = tigerVideo.play();
      if (playback && typeof playback.catch === 'function') playback.catch(showTigerPoster);
    };
    tigerVideo.addEventListener('playing', showTigerVideo);
    tigerVideo.addEventListener('loadeddata', () => {
      if (!tigerVideo.paused) showTigerVideo();
    });
    tigerVideo.addEventListener('pause', showTigerPoster);
    ['error', 'abort', 'emptied', 'stalled'].forEach((eventName) => tigerVideo.addEventListener(eventName, showTigerPoster));
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) showTigerPoster();
      else tryTigerPlayback();
    });
    if (!tigerVideo.paused && tigerVideo.readyState >= 2) showTigerVideo();
    else {
      showTigerPoster();
      tryTigerPlayback();
    }
  }
  function setupTigerDissolve() {
    const stage = document.querySelector('.tiger-portrait-stage');
    const image = stage && stage.querySelector('.tiger-portrait-base');
    const canvas = document.getElementById('tigerDissolveCanvas');
    if (!stage || !image || !canvas) return;

    const context = canvas.getContext('2d', { alpha: true });
    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const sampleCanvas = document.createElement('canvas');
    const sampleSize = 240;
    sampleCanvas.width = sampleCanvas.height = sampleSize;
    const sampleContext = sampleCanvas.getContext('2d', { willReadFrequently: true });
    let particles = [];
    let geometry = null;
    let frameId = 0;

    const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
    const surfacePulse = (time, start, end) => {
      if (time <= start || time >= end) return 0;
      const progress = (time - start) / (end - start);
      return Math.pow(Math.sin(progress * Math.PI), 1.25);
    };
    function collectParticles() {
      if (!image.naturalWidth || !image.naturalHeight) return;
      sampleContext.clearRect(0, 0, sampleSize, sampleSize);
      sampleContext.drawImage(image, 0, 0, sampleSize, sampleSize);
      const pixels = sampleContext.getImageData(0, 0, sampleSize, sampleSize).data;
      const candidates = [];

      for (let y = 8; y < sampleSize - 8; y += 2) {
        for (let x = 8; x < sampleSize - 8; x += 2) {
          const nx = x / sampleSize;
          const ny = y / sampleSize;
          const ellipse = Math.pow((nx - .5) / .47, 2) + Math.pow((ny - .51) / .47, 2);
          const leftSurface = nx < .49 && ny > .1 && ny < .79 && (nx < .34 || ellipse > .48);
          const rightTemple = nx > .67 && nx < .95 && ny > .12 && ny < .66;
          if (!leftSurface && !rightTemple) continue;

          const pixelIndex = (y * sampleSize + x) * 4;
          const alpha = pixels[pixelIndex + 3] / 255;
          const luminance = (pixels[pixelIndex] * .21 + pixels[pixelIndex + 1] * .72 + pixels[pixelIndex + 2] * .07) / 255;
          if (alpha < .18 || luminance < .18 || Math.random() > .35) continue;

          candidates.push({
            nx,
            ny,
            luminance,
            side: leftSurface ? -1 : 1,
            seed: Math.random(),
            phase: Math.random(),
            size: .2 + Math.random() * .52
          });
        }
      }

      const maximum = innerWidth < 760 ? 360 : 760;
      particles = candidates.sort(() => Math.random() - .5).slice(0, maximum);
    }

    function resizeCanvas() {
      const canvasRect = canvas.getBoundingClientRect();
      const imageRect = image.getBoundingClientRect();
      const pixelRatio = Math.min(devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(canvasRect.width * pixelRatio));
      canvas.height = Math.max(1, Math.round(canvasRect.height * pixelRatio));
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      geometry = {
        width: canvasRect.width,
        height: canvasRect.height,
        offsetX: imageRect.left - canvasRect.left,
        offsetY: imageRect.top - canvasRect.top,
        imageWidth: imageRect.width,
        imageHeight: imageRect.height,
        scale: Math.max(.72, imageRect.width / 620)
      };
      collectParticles();
    }

    function drawWarpRegion(now, intensity, centerNX, centerNY, radiusNX, radiusNY, direction, seed) {
      if (intensity < .01) return;
      const imageX = geometry.offsetX;
      const imageY = geometry.offsetY;
      const width = geometry.imageWidth;
      const height = geometry.imageHeight;
      const centerX = imageX + width * centerNX;
      const centerY = imageY + height * centerNY;
      const radiusX = width * radiusNX;
      const radiusY = height * radiusNY;
      const top = Math.max(imageY, centerY - radiusY);
      const bottom = Math.min(imageY + height, centerY + radiusY);
      const stripHeight = Math.max(1.8, 2.7 * geometry.scale);

      context.save();
      context.translate(centerX, centerY);
      context.scale(radiusX, radiusY);
      const eraseGradient = context.createRadialGradient(0, 0, 0, 0, 0, 1);
      eraseGradient.addColorStop(0, 'rgba(0,0,0,.82)');
      eraseGradient.addColorStop(.6, 'rgba(0,0,0,.48)');
      eraseGradient.addColorStop(1, 'rgba(0,0,0,0)');
      context.globalCompositeOperation = 'destination-out';
      context.globalAlpha = intensity * .72;
      context.fillStyle = eraseGradient;
      context.beginPath();
      context.arc(0, 0, 1, 0, Math.PI * 2);
      context.fill();
      context.restore();

      context.save();
      context.beginPath();
      context.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, Math.PI * 2);
      context.clip();
      context.globalCompositeOperation = 'source-over';
      context.globalAlpha = .54 + intensity * .3;

      for (let y = top; y < bottom; y += stripHeight) {
        const normalizedY = clamp((y - imageY) / height, 0, 1);
        const sourceY = normalizedY * image.naturalHeight;
        const sourceHeight = Math.max(1, stripHeight / height * image.naturalHeight + 1);
        const verticalFalloff = clamp(1 - Math.abs(y - centerY) / radiusY, 0, 1);
        const broadWave = Math.sin(normalizedY * 35 + now * .00145 + seed) * 3.2;
        const fineWave = Math.sin(normalizedY * 91 - now * .00105 + seed * 2.3) * 1.35;
        const outward = direction * intensity * (2.5 + verticalFalloff * 11) * geometry.scale;
        const offsetX = outward + (broadWave + fineWave) * intensity * geometry.scale;
        const offsetY = Math.sin(normalizedY * 47 + now * .0012 + seed) * intensity * 1.5 * geometry.scale;

        context.drawImage(
          image,
          0, sourceY, image.naturalWidth, sourceHeight,
          imageX + offsetX, y + offsetY, width, stripHeight + 1
        );
      }
      context.restore();
    }

    function drawWarpedSurface(now, cycle) {
      const leftIntensity = surfacePulse(cycle, .04, .76);
      const rightCycle = (cycle + .45) % 1;
      const rightIntensity = surfacePulse(rightCycle, .06, .7) * .72;
      drawWarpRegion(now, leftIntensity, .28, .41, .31, .34, -1, 2.4);
      drawWarpRegion(now, rightIntensity, .79, .37, .19, .27, 1, 7.1);
    }

    function drawParticle(particle, now, cycle) {
      const baseX = geometry.offsetX + particle.nx * geometry.imageWidth;
      const baseY = geometry.offsetY + particle.ny * geometry.imageHeight;
      const edgeStrength = clamp(Math.abs(particle.nx - .5) * 2.15 + Math.max(0, .34 - particle.ny), .15, 1.1);
      const sideOffset = particle.side < 0 ? 0 : .47;
      const progress = (cycle + sideOffset + particle.phase * .78) % 1;
      const fadeIn = clamp(progress / .08, 0, 1);
      const fadeOut = clamp((1 - progress) / .3, 0, 1);
      const visibility = fadeIn * fadeOut;
      if (visibility < .012) return;

      const travel = 1 - Math.pow(1 - progress, 2.1);
      const distance = (4 + particle.seed * 34) * travel * edgeStrength * geometry.scale;
      const curl = Math.sin(now * .00125 + particle.phase * 19 + particle.ny * 8);
      const driftX = particle.side * distance * (.68 + particle.seed * .52);
      const driftY = (-distance * (.08 + particle.seed * .2)) + curl * (1.2 + distance * .11);
      const x = baseX + driftX;
      const y = baseY + driftY;
      const alpha = clamp(visibility * (.18 + particle.luminance * .62), 0, .72);
      const radius = particle.size * geometry.scale * (1 + progress * .18);

      if (particle.seed > .88 && distance > 3) {
        const length = Math.min(7 * geometry.scale, distance * .2);
        const magnitude = Math.max(1, Math.hypot(driftX, driftY));
        const tailX = x - (driftX / magnitude) * length;
        const tailY = y - (driftY / magnitude) * length;
        context.beginPath();
        context.moveTo(tailX, tailY);
        context.lineTo(x, y);
        context.lineWidth = Math.max(.35, radius * .58);
        context.strokeStyle = `rgba(219,232,255,${alpha * .34})`;
        context.stroke();
      }

      context.beginPath();
      context.arc(x, y, radius, 0, Math.PI * 2);
      context.fillStyle = `rgba(229,239,255,${alpha})`;
      context.fill();
    }

    function animate(now) {
      if (!geometry) resizeCanvas();
      context.clearRect(0, 0, geometry.width, geometry.height);
      context.globalCompositeOperation = 'source-over';
      context.globalAlpha = .98;
      context.filter = 'contrast(1.08) brightness(.98)';
      context.drawImage(image, geometry.offsetX, geometry.offsetY, geometry.imageWidth, geometry.imageHeight);
      context.filter = 'none';
      const cycle = (now % 9000) / 9000;
      drawWarpedSurface(now, cycle);
      context.globalCompositeOperation = 'lighter';
      context.globalAlpha = 1;
      particles.forEach((particle) => drawParticle(particle, now, cycle));
      context.globalCompositeOperation = 'source-over';
      if (!reducedMotion) frameId = requestAnimationFrame(animate);
    }

    const begin = () => {
      resizeCanvas();
      stage.classList.add('motion-ready');
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(animate);
    };

    if (image.complete) begin();
    else image.addEventListener('load', begin, { once: true });
    const resizeObserver = new ResizeObserver(resizeCanvas);
    resizeObserver.observe(stage);
    addEventListener('resize', resizeCanvas, { passive: true });
  }

  setupTigerDissolve();

  document.getElementById('toolboxOpen').addEventListener('click', () => setPanel('downloadOverlay', true));
  document.getElementById('messageOpen').addEventListener('click', () => setPanel('messageOverlay', true));
  document.querySelectorAll('[data-close-panel]').forEach((button) => button.addEventListener('click', () => setPanel(button.closest('.panel-overlay').id, false)));
  document.querySelectorAll('.panel-overlay').forEach((panel) => panel.addEventListener('click', (event) => { if (event.target === panel) setPanel(panel.id, false); }));

  function toast(message) {
    const element = document.getElementById('sourceToast');
    element.textContent = message;
    element.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => element.classList.remove('show'), 3000);
  }

  document.getElementById('previewDownload').addEventListener('click', () => {
    window.location.href = 'https://github.com/Bingtools/bingtools.github.io/releases/download/toolbox-v8.8.56/Bingo_ToolBox_v8.8.56_20260813.exe';
  });
  const qr = document.getElementById('supportQr');
  const supportSwitch = document.getElementById('supportSwitch');
  supportSwitch.addEventListener('click', () => {
    qrMode = qrMode === 'wechat' ? 'alipay' : 'wechat';
    qr.src = qrMode === 'wechat' ? 'https://bingtools.github.io/assets/wechat-qr.png' : 'https://bingtools.github.io/assets/alipay-qr.png';
    qr.alt = qrMode === 'wechat' ? '微信收款码' : '支付宝收款码';
    supportSwitch.firstChild.textContent = qrMode === 'wechat' ? '切换至支付宝 ' : '切换至微信 ';
  });

  let novaQrMode = 'wechat';
  const novaQr = document.getElementById('novaSupportQr');
  const novaSwitch = document.getElementById('novaSupportSwitch');
  novaSwitch.addEventListener('click', () => {
    novaQrMode = novaQrMode === 'wechat' ? 'alipay' : 'wechat';
    novaQr.src = novaQrMode === 'wechat' ? 'https://bingtools.github.io/assets/wechat-qr.png' : 'https://bingtools.github.io/assets/alipay-qr.png';
    novaQr.alt = novaQrMode === 'wechat' ? '微信收款码' : '支付宝收款码';
    const novaModeLabel = document.getElementById('novaSupportMode');
    novaModeLabel.dataset.mode = novaQrMode;
    novaModeLabel.textContent = novaQrMode === 'wechat' ? '当前方式 · 微信支付' : '当前方式 · 支付宝';
    novaSwitch.querySelector('span').textContent = novaQrMode === 'wechat' ? '切换至支付宝' : '切换至微信';
  });

  document.getElementById('messagePreviewSubmit').addEventListener('click', () => {
    const message = document.getElementById('messageContent');
    if (!message.value.trim()) {
      toast('先写下使用反馈或工具建议吧。');
      message.focus();
      return;
    }
    toast('在线留言功能正在接入，请暂时通过 QQ 交流群提交建议。');
    message.value = '';
  });

  addEventListener('keydown', (event) => {
    const galleryOpen = document.getElementById('galleryOverlay').classList.contains('open');
    if (galleryOpen && event.key === 'ArrowLeft') { event.preventDefault(); moveToolGallery(-1); return; }
    if (galleryOpen && event.key === 'ArrowRight') { event.preventDefault(); moveToolGallery(1); return; }
    if (event.key === 'Escape') {
      document.querySelectorAll('.panel-overlay.open').forEach((panel) => setPanel(panel.id, false));
      return;
    }
    if (document.querySelector('.panel-overlay.open') || !document.getElementById('archiveView').classList.contains('active-view')) return;
    if (event.key === 'ArrowUp') move(-1);
    if (event.key === 'ArrowDown') move(1);
    if (event.key === 'Enter' && document.activeElement?.classList.contains('orbit-card')) openActiveItem();
  });
  addEventListener('resize', () => {
    updateStack(false);
    if (galleryRendered) updateToolGallery(false);
  }, { passive: true });

  const initialView = ['nova', 'tools', 'interest', 'updates'].includes(location.hash.slice(1)) ? location.hash.slice(1) : 'home';
  showView(initialView, false);
  new CosmicUniverse('canvas-container');
})();

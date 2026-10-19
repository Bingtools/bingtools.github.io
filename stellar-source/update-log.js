/*
 * Bingo ToolBox 更新日志数据。
 * 页面展示用版本记录，按实际工具目录持续同步。
 */
window.BINGO_UPDATE_LOGS = [
  {
    date: '2026.09.03',
    version: 'V8.9.15',
    type: 'feature',
    typeLabel: '功能更新',
    title: '52 个正式工具与近期功能同步',
    summary: '按本机 Bingo ToolBox 8.9.15 重新核对工具入口、图标和中文说明，并同步近期新增能力。',
    changes: [
      '正式工具卡更新为 52 个，并保留 1 个随工具箱提供的 Animo 独立入口',
      '新增动作精简、跟随烘焙、空间属性切换、临时控制器、路径重定向与重置姿势',
      '新增裁剪动画、快速烘焙、轻量运动轨迹和平滑所选关键帧独立入口',
      '新增场景内蒙皮复制、批量蒙皮复制与 IK 控制器创建',
      '暴力粘贴支持按名称、命名空间和对象路径自动识别目标',
      '引用功能与路径指认支持递归扫描、类型筛选、去重及更安全的路径处理',
      '裁剪动画右键新增删除播放范围外关键帧与删除所选对象全部关键帧',
      '工具卡片支持在同一真实分类内上下拖动排序，并保存个人顺序',
      '快捷栏新增轻便选择集与快速合并动画层等独立功能'
    ],
    tags: ['8.9.15', '52 TOOLS', 'LOCAL SYNC']
  },
  {
    date: '2026.08.25',
    version: 'V8.8.87',
    type: 'feature',
    typeLabel: '功能更新',
    title: '作者与工具来源标识',
    summary: '完善工具作者、来源和第三方属性展示，让工具档案信息更加清晰。',
    changes: [
      '自研工具统一标记作者 Bingo，并注明为自研工具',
      'P4 连接器作者调整为祥子，保留独立作者信息',
      'Animation Helper、studiolibrary 与 ADV 等工具标记为第三方工具'
    ],
    tags: ['AUTHOR', 'TOOL SOURCE']
  },
  {
    date: '2026.08.24',
    version: 'V8.8.86',
    type: 'improvement',
    typeLabel: '体验优化',
    title: '工具图标与页面图鉴',
    summary: '完善工具原始图标展示，并优化立体页面图鉴的浏览与进入方式。',
    changes: [
      '工具档案卡片优先读取每个工具设置的原始图标',
      '点击任意可见卡片可快速切换到中央焦点',
      '点击中央卡片可直接进入对应工具的使用说明'
    ],
    tags: ['TOOL ICON', '3D GALLERY']
  },
  {
    date: '2026.08.24',
    version: 'V8.8.85',
    type: 'docs',
    typeLabel: '文档更新',
    title: '工具说明内容完善',
    summary: '统一整理工具用途、操作步骤、使用建议和注意事项。',
    changes: [
      '为工具详情补充功能描述、使用步骤和注意事项',
      '详情页面同步展示工具原始图标与分类标签',
      '缺少说明的工具保留待完善提示，方便后续继续维护'
    ],
    tags: ['GUIDE', 'LOCAL DOCS']
  },
  {
    date: '2026.08.23',
    version: 'V8.8.84',
    type: 'improvement',
    typeLabel: '安装优化',
    title: '安装器与 Maya 兼容',
    summary: '整理 Windows EXE 安装流程，并完善 Maya 多版本部署说明。',
    changes: [
      'Windows EXE 安装包支持选择 Maya 2020—2026',
      '安装时自动写入 Bingo ToolBox module 配置',
      '补充关闭 Maya、选择安装路径和首次启动说明'
    ],
    tags: ['INSTALLER', 'MAYA 2020—2026']
  },
  {
    date: '2026.08.22',
    version: 'V8.8.83',
    type: 'fix',
    typeLabel: '问题修复',
    title: '工具箱稳定性修复',
    summary: '修复资源读取与页面切换中的常见问题，提升本地使用稳定性。',
    changes: [
      '修复部分工具图标缺失时卡片显示空白的问题',
      '优化本地路径和中文目录下的资源读取',
      '调整工具入口刷新逻辑，减少页面切换时的状态异常'
    ],
    tags: ['STABILITY', 'COMPATIBILITY']
  }
];

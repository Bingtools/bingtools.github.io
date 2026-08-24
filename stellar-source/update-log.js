/*
 * Bingo ToolBox 更新日志数据。
 * 后续新增记录时，只需按相同格式向数组顶部添加一项。
 * 当前内容为本地页面设计草案，正式发布前可替换为真实发行记录。
 */
window.BINGO_UPDATE_LOGS = [
  {
    date: '2026.08.22',
    version: 'V8.8.61',
    type: 'feature',
    typeLabel: '功能更新',
    title: '本地工具档案系统',
    summary: '完成 40 个本地工具的分类扫描、图标匹配与详情入口整理。',
    changes: [
      '整合动画、绑定、模型、特效与其他工具分类',
      '工具卡片可直接打开功能说明与使用步骤',
      '补充 Maya 2020—2026 兼容信息展示'
    ],
    tags: ['40 TOOLS', 'LOCAL ARCHIVE']
  },
  {
    date: '2026.08',
    version: 'WEB / STELLAR',
    type: 'improvement',
    typeLabel: '体验优化',
    title: '星域交互界面',
    summary: '加入三维星空、鼠标视角旋转与纵向档案卡片交互。',
    changes: [
      '双层粒子星空支持鼠标视差与拖动旋转',
      '工具卡片加入景深、翻滚与玻璃反光效果',
      '下载、指南和支持入口统一为沉浸式浮层'
    ],
    tags: ['THREE.JS', 'INTERACTION']
  },
  {
    date: '2026.08',
    version: 'DOCS / 01',
    type: 'docs',
    typeLabel: '文档更新',
    title: '工具使用说明细化',
    summary: '将工具介绍扩展为用途、操作步骤、使用建议与注意事项。',
    changes: [
      '按工具读取本地说明文档与配图',
      '统一展示功能描述、使用流程和兼容信息',
      '缺少文档的工具保留清晰的待完善状态'
    ],
    tags: ['GUIDE', 'LOCAL DOCS']
  },
  {
    date: '2026.08',
    version: 'INSTALL / EXE',
    type: 'improvement',
    typeLabel: '安装优化',
    title: '一键安装流程说明',
    summary: '整理 EXE 安装、Maya module 自动注册和首次启动流程。',
    changes: [
      '明确安装前关闭 Maya 并保存场景',
      '说明安装包自动注册 module，无需手动配置路径',
      '补充安装完成后的菜单入口和启动步骤'
    ],
    tags: ['INSTALLER', 'MAYA MODULE']
  },
  {
    date: '待记录',
    version: 'NEXT / LOG',
    type: 'planned',
    typeLabel: '后续计划',
    title: '在这里继续记录下一次更新',
    summary: '正式更新工具后，可在日志数据文件顶部添加新版本记录。',
    changes: [
      '填写发布日期和版本号',
      '记录新增功能、修复内容与兼容变化',
      '为重要更新添加对应工具和分类标签'
    ],
    tags: ['DRAFT', 'NEXT RELEASE']
  }
];

const tools = [
  {
    name: "Bingo ToolBox",
    category: "Toolbox",
    icon: "assets/bingo-icon.png",
    version: "Maya 2020-2027",
    status: "Installer",
    summary:
      "个人 Maya 工具箱插件，EXE 安装包支持自定义安装路径（默认 D:/Maya_Tool/Bingo_Tools），用分类、收藏、快捷键和工具注册信息管理脚本，适合把零散 Python/MEL 工具集中起来。",
    tags: ["Toolbox", "Python", "MEL", "EXE"],
    features: [
      "内置动画、绑定、模型、特效、其他等常用工具分类，可按需扩展个人工具库。",
      "支持工具图标、收藏星标、快捷入口、自定义菜单和本地配置持久化。",
      "可把 Python、MEL、EXE、文件夹和常用命令统一登记到工具箱中管理。",
      "EXE 安装包支持自定义安装路径，默认 D:/Maya_Tool/Bingo_Tools，自动创建目录并备份旧版。",
      "已按 Maya 2020-2027 全版本兼容方向整理，一键部署注册 Maya module。"
    ],
    command: `// 在 Maya Script Editor 的 Python 标签中执行:
exec(open(r"D:/Maya_Tool/Bingo_Tools/install.mel", "r").read())`,
    path: "D:/Maya_Tool/Bingo_Tools/",
    download: "https://github.com/Bingtools/Bingo-Tools/releases/download/toolbox-latest/Bingo_ToolBox_Maya2020-2026.exe",
    screenshots: [
      {
        title: "Bingo ToolBox 使用演示",
        src: "assets/Bingo_tools.mp4",
        caption: "Bingo ToolBox 完整操作演示视频，展示工具安装、分类管理和日常使用方法。"
      },
      {
        title: "Picker 面板预览",
        src: "assets/toolbox-ui-picker.gif",
        caption: "用于角色控制器选择和动画操作的 Picker 界面，可把常用控制器整理成直观按钮。"
      },
      {
        title: "编辑器界面预览",
        src: "assets/toolbox-ui-editor.gif",
        caption: "编辑模式下可创建、调整和管理按钮、面板、层级与显示方式。"
      },
      {
        title: "创建按钮流程",
        src: "assets/toolbox-ui-createbuttons.gif",
        caption: "展示按钮创建与绑定流程，方便把脚本或选择命令做成可点击工具。"
      }
    ],
    tutorial: [
      {
        title: "1. 安装方式",
        content: "双击运行 EXE 安装包，安装程序会弹出路径选择窗口，默认路径为 D:/Maya_Tool/Bingo_Tools，可点击「浏览」自定义安装路径。工具文件直接放入所选目录，不会多套一层版本文件夹。Maya 启动时会自动通过 Documents/maya/modules/Bingo_ToolBox.mod 指向实际安装路径。",
        code: "默认安装路径: D:\\Maya_Tool\\Bingo_Tools\nModule 入口: Documents\\maya\\modules\\Bingo_ToolBox.mod\n备份: 安装目录_backup_时间戳\n主入口: scripts\\maya_plugin_manager_ui.py"
      },
      {
        title: "2. 打开工具箱",
        content: "安装完成后重新启动 Maya，在 Maya 顶部菜单栏找到 Bingo 菜单，点击 ToolBox 即可打开工具箱主界面。",
        code: "Maya 菜单栏 → Bingo → ToolBox"
      },
      {
        title: "3. 工具简介",
        content: "Bingo ToolBox 用来把制作中常用的动画、绑定、模型、特效和其他脚本集中到一个面板里。每个工具都可以配置名称、说明、图标、分类和执行命令，适合把零散的 Python、MEL、EXE、文件夹入口或常用流程整理成可点击的工具卡片。",
        code: "工具类型示例:\nAnimation: 姿势镜像、时间轴辅助、选择控制器\nRigging: 蒙皮检查、控制器工具、权重辅助\nModel: 清理场景、批量命名、模型检查\nFX/Other: 特效脚本、文件夹入口、外部程序"
      },
      {
        title: "4. 使用方法简介",
        content: "打开 ToolBox 后先选择左侧分类，再点击工具卡片即可执行。新增工具时右键分类区域选择「新建工具」，填入工具名称、简介、图标和 Python/MEL/EXE 命令；常用工具可以收藏或加入 Maya 顶部菜单，方便日常制作时快速调用。",
        code: "推荐流程:\n1. 选择分类或新建分类\n2. 右键新建工具并填写说明\n3. 粘贴 Python/MEL/EXE 启动命令\n4. 选择图标并保存\n5. 点击工具卡片运行，常用工具可收藏或加入菜单"
      },
      {
        title: "5. 注册脚本工具",
        content: "在工具箱界面中右键点击分类区域，选择「新建工具」。填写工具名称、描述，粘贴 Python 或 MEL 代码，指定图标和快捷键。保存后工具即出现在对应分类中，点击即可执行。",
        code: "# 示例：注册一个快速选择所有控制器的工具\nimport maya.cmds as cmds\nctrls = cmds.ls(\"*_ctrl\", type=\"transform\")\ncmds.select(ctrls)\nprint(f\"已选择 {len(ctrls)} 个控制器\")"
      },
      {
        title: "6. 自定义菜单",
        content: "Bingo ToolBox 支持在 Maya 主菜单栏创建自定义下拉菜单，将常用工具直接暴露在菜单层级中。进入工具箱设置 → 菜单编辑器，拖拽工具到菜单树中即可。",
        code: "// 自定义菜单示例结构：\nBingo/\n  ├── Animation/\n  │   ├── Pose Mirror\n  │   └── Time Machine\n  ├── Rigging/\n  │   ├── Skin Mirror\n  │   └── Controller Check\n  └── Utility/\n      ├── Clean Scene\n      └── Batch Rename"
      },
      {
        title: "7. 卸载方式",
        content: "安装目录下自带卸载脚本。运行 uninstall_Bingo_ToolBox.cmd 会移除 Maya module 入口，之后可手动删除工具目录完成彻底卸载。",
        code: "运行: Documents\\maya\\Bingo_ToolBox\\uninstall_Bingo_ToolBox.cmd\n手动删除: Documents\\maya\\Bingo_ToolBox\\"
      }
    ]
  },
  {
    name: "暴力帧拷贝",
    category: "Animation",
    icon: "assets/python.png",
    version: "Maya 2020-2026",
    status: "Animation Tool",
    summary:
      "一键复制/粘贴控制器姿态与动画数据，支持命名空间处理",
    tags: ["Copy", "Paste", "Pose", "Animation"],
    features: [
      "姿态模式：复制/粘贴当前帧的控制器数值",
      "动画模式：按帧范围批量拷贝动画曲线数据",
      "支持自定义动画范围",
      "忽略命名空间匹配",
      "本地数值存储，支持分类管理"
    ],
    command: `// 暴力帧拷贝
import Bingo_ToolBox.tools.animation.copy_paste as cp
cp.show()`,
    path: "D:/Codex/maya/Bingo_ToolBox_01/tools/animation/",
    screenshots: [
      {
            "title": "暴力帧拷贝界面",
            "src": "assets/tool-copy-paste-new.png",
            "caption": "一键复制/粘贴控制器姿态与动画数据"
      }
],
    tutorial: [
      {
            "title": "使用方法",
            "content": "在 Maya 中选中源控制器，设置姿态/动画模式，点击「一键拷贝」保存数据；选中目标控制器后点击「一键粘贴」。",
            "code": "1. 选择源控制器\n2. 设置模式（姿态/动画）\n3. 点击「一键拷贝」\n4. 选择目标控制器\n5. 点击「一键粘贴」"
      }
]
  },
  {
    name: "动画镜像",
    category: "Animation",
    icon: "assets/python.png",
    version: "Maya 2020-2026",
    status: "Animation Tool",
    summary:
      "基于左右配对控制器镜像姿态与关键帧动画",
    tags: ["Mirror", "Pose", "Animation", "Keyframe"],
    features: [
      "镜像姿态：将选中控制器的姿态镜像到对侧",
      "镜像动画：在指定帧范围内批量镜像关键帧",
      "支持 L→R / R→L 两种方向",
      "自定义左右配对规则（如 L_* ↔ R_*）",
      "IK/FK 通道取反预设",
      "支持镜像骨骼方向 (Joint Orient)"
    ],
    command: `// 动画镜像
import Bingo_ToolBox.tools.animation.mirror_anim as ma
ma.show()`,
    path: "D:/Codex/maya/Bingo_ToolBox_01/tools/animation/",
    screenshots: [
      {
            "title": "动画镜像界面",
            "src": "assets/tool-02-mirror-anim.png",
            "caption": "左右配对控制器镜像姿态与关键帧"
      }
],
    tutorial: [
      {
            "title": "使用方法",
            "content": "选择控制器，设置镜像方向和左右配对标记，点击「镜像姿态」或「镜像动画」即可。",
            "code": "1. 选择控制器\n2. 设置镜像方向\n3. 配置左右配对规则\n4. 点击「镜像姿态」或「镜像动画」"
      }
]
  },
  {
    name: "视频参考",
    category: "Animation",
    icon: "assets/settings.png",
    version: "Maya 2020-2026",
    status: "Animation Tool",
    summary:
      "加载参考视频到 Maya 视口上方，同步时间线逐帧预览",
    tags: ["Video", "Reference", "Animation", "FFmpeg"],
    features: [
      "加载 MP4/MOV/AVI 等常见视频格式",
      "FFmpeg 逐帧提取并同步 Maya 时间线",
      "帧偏移调整，匹配动画起始帧",
      "透明度控制（窗口级真透明）",
      "支持拖拽视频文件到窗口加载",
      "自动设置 Maya 帧范围与视频匹配",
      "紧凑模式：双击缩小为小窗悬浮"
    ],
    command: `// 视频参考
import Bingo_ToolBox.tools.animation.video_ref as vr
vr.show()`,
    path: "D:/Codex/maya/Bingo_ToolBox_01/tools/animation/",
    screenshots: [
      {
            "title": "视频参考界面",
            "src": "assets/tool-03-video-ref.png",
            "caption": "加载参考视频同步时间线逐帧预览"
      }
],
    tutorial: [
      {
            "title": "使用方法",
            "content": "打开工具后点击「加载视频」或拖拽视频文件。需要先安装 FFmpeg，工具会引导安装。",
            "code": "1. 打开视频参考工具\n2. 点击「加载视频」或拖拽文件\n3. 调整帧偏移\n4. 设置透明度\n5. 双击可切换紧凑模式"
      }
]
  },
  {
    name: "路径指认",
    category: "Animation",
    icon: "assets/settings.png",
    version: "Maya 2020-2026",
    status: "Utility",
    summary:
      "文件浏览器，收藏常用目录，快速筛选并打开/导入 Maya 文件",
    tags: ["File", "Browser", "Import", "Favorites"],
    features: [
      "文件夹浏览，支持上一级/路径手动输入",
      "按文件类型筛选：MA/MB/FBX/OBJ/ABC 等",
      "收藏常用目录，双击快速跳转",
      "双击文件打开场景或导入",
      "FBX 静默导入模式",
      "单击文件查看大小和修改时间"
    ],
    command: `// 路径指认
import Bingo_ToolBox.tools.animation.file_browser as fb
fb.show()`,
    path: "D:/Codex/maya/Bingo_ToolBox_01/tools/animation/",
    screenshots: [
      {
            "title": "路径指认界面",
            "src": "assets/tool-browser-import.png",
            "caption": "文件浏览器与批量导入工具界面"
      }
],
    tutorial: [
      {
            "title": "使用方法",
            "content": "点击「浏览」选择目录，或直接输入路径回车。左侧添加常用路径收藏，右侧双击文件打开。",
            "code": "1. 浏览或输入路径\n2. 左侧添加收藏目录\n3. 选择文件类型过滤\n4. 双击文件打开或导入"
      }
]
  },
  {
    name: "批量导入",
    category: "Animation",
    icon: "assets/settings.png",
    version: "Maya 2020-2026",
    status: "Import Tool",
    summary:
      "批量选择并导入 MA/MB/FBX/OBJ/ABC 等文件到 Maya 场景",
    tags: ["Import", "Batch", "FBX", "OBJ"],
    features: [
      "添加多个文件到导入列表",
      "支持 MA/MB/FBX/OBJ/ABC/DXF/AI/EPS/PS/SVG",
      "导入到当前场景 或 每个文件新建场景",
      "进度条显示导入进度",
      "文件类型过滤",
      "导入完成提示成功/失败统计"
    ],
    command: `// 批量导入
import Bingo_ToolBox.tools.animation.batch_import as bi
bi.show()`,
    path: "D:/Codex/maya/Bingo_ToolBox_01/tools/animation/",
    screenshots: [
      {
            "title": "批量导入界面",
            "src": "assets/tool-browser-import.png",
            "caption": "文件浏览器与批量导入工具界面"
      }
],
    tutorial: [
      {
            "title": "使用方法",
            "content": "点击「添加文件」选择要导入的文件，选择导入模式，点击「开始导入」。",
            "code": "1. 点击「添加文件」\n2. 选择导入模式\n3. 设置文件类型过滤\n4. 点击「开始导入」"
      }
]
  },
  {
    name: "创建控制器",
    category: "Rigging",
    icon: "assets/settings.png",
    version: "Maya 2020-2026",
    status: "Rigging Tool",
    summary:
      "批量创建/镜像/合并 Maya 控制器曲线，支持多种预设形状",
    tags: ["Controller", "Rigging", "Curve", "Batch"],
    features: [
      "支持圆形/方形/箭头/十字/星形等 30+ 预设形状",
      "批量选中骨骼后自动创建对应控制器",
      "可选吸附到选中物体、创建 Zero Group",
      "X/Y/Z 轴镜像已有控制器",
      "合并多个控制器形状",
      "居中轴心、冻结变换",
      "自定义颜色索引"
    ],
    command: `// 创建控制器
import Bingo_ToolBox.tools.rigging.create_ctrl as cc
cc.show()`,
    path: "D:/Codex/maya/Bingo_ToolBox_01/tools/rigging/",
    screenshots: [
      {
            "title": "创建控制器界面",
            "src": "assets/tool-06-create-ctrl.png",
            "caption": "批量创建 Maya 控制器曲线"
      }
],
    tutorial: [
      {
            "title": "使用方法",
            "content": "选择形状类型、大小和颜色后，点击「创建单个」生成控制器；选择骨骼后点击「为骨骼批量创建」批量生成。",
            "code": "1. 选择形状类型和大小\n2. 设置颜色\n3. 点击「创建单个」\n4. 或选择骨骼后点击「为骨骼批量创建」"
      }
]
  },
  {
    name: "对称镜像",
    category: "Rigging",
    icon: "assets/settings.png",
    version: "Maya 2020-2026",
    status: "Rigging Tool",
    summary:
      "一键对称镜像骨骼/曲线/网格/定位器，支持命名规则和自定义镜像中心",
    tags: ["Mirror", "Rigging", "Symmetry", "Bone"],
    features: [
      "支持骨骼、曲线、网格、定位器等对象类型",
      "X/Y/Z 轴镜像，可自定义镜像中心点",
      "多种预设命名规则：L_* ↔ R_* / *_l ↔ *_r 等",
      "自定义查找/替换命名规则",
      "骨骼镜像：自动处理 Joint Orient",
      "预览模式：先预览结果再确认执行",
      "自动复制蒙皮权重"
    ],
    command: `// 对称镜像
import Bingo_ToolBox.tools.rigging.symmetry_mirror as sm
sm.show()`,
    path: "D:/Codex/maya/Bingo_ToolBox_01/tools/rigging/",
    screenshots: [
      {
            "title": "对称镜像界面",
            "src": "assets/tool-07-symmetry-mirror.png",
            "caption": "一键对称镜像骨骼/曲线/网格"
      }
],
    tutorial: [
      {
            "title": "使用方法",
            "content": "选择对象，设置镜像轴和命名规则，点击「预览」确认后点击「执行镜像」。",
            "code": "1. 选择要镜像的对象\n2. 设置镜像轴\n3. 配置命名规则\n4. 点击「预览」检查\n5. 确认后点击「执行镜像」"
      }
]
  },
  {
    name: "批量对齐",
    category: "Rigging",
    icon: "assets/settings.png",
    version: "Maya 2020-2026",
    status: "Rigging Tool",
    summary:
      "批量将多个对象对齐到目标对象的位移/旋转，支持等距分布",
    tags: ["Align", "Rigging", "Batch", "Distribution"],
    features: [
      "位置对齐：将源对象移动到目标对象位置",
      "旋转对齐：将源对象旋转匹配目标对象",
      "全对齐：位置 + 旋转一键对齐",
      "X/Y/Z 轴自由勾选",
      "等距分布：在指定轴上均匀分布选中对象",
      "左右交换：快速交换源/目标列表",
      "支持按顺序配对 或 全部对齐到同一目标"
    ],
    command: `// 批量对齐
import Bingo_ToolBox.tools.rigging.batch_align as ba
ba.show()`,
    path: "D:/Codex/maya/Bingo_ToolBox_01/tools/rigging/",
    screenshots: [
      {
            "title": "批量对齐界面",
            "src": "assets/tool-08-batch-align.png",
            "caption": "批量对齐对象位移/旋转"
      }
],
    tutorial: [
      {
            "title": "使用方法",
            "content": "选择源对象点击左栏「+ 添加」，选择目标对象点击右栏「+ 添加」，设置匹配模式后执行对齐。",
            "code": "1. 选择源对象，点击「+ 添加」到左栏\n2. 选择目标对象，点击「+ 添加」到右栏\n3. 设置对齐模式\n4. 勾选需要对齐的轴\n5. 点击执行"
      }
]
  },
  {
    name: "批量约束",
    category: "Rigging",
    icon: "assets/settings.png",
    version: "Maya 2020-2026",
    status: "Rigging Tool",
    summary:
      "批量创建 Parent/Point/Orient/Scale/Aim 约束，支持配对匹配",
    tags: ["Constraint", "Rigging", "Parent", "Batch"],
    features: [
      "Parent 约束 / Point 约束 / Orient 约束 / Scale 约束 / Aim 约束",
      "约束时自动匹配位移/旋转",
      "按顺序配对 或 全部约束到同一目标",
      "左右交换源/目标列表",
      "删除选中约束，批量撤销",
      "约束结果自动分组便于管理"
    ],
    command: `// 批量约束
import Bingo_ToolBox.tools.rigging.batch_constraint as bc
bc.show()`,
    path: "D:/Codex/maya/Bingo_ToolBox_01/tools/rigging/",
    screenshots: [
      {
            "title": "批量约束界面",
            "src": "assets/tool-09-batch-constraint.png",
            "caption": "批量创建各种约束"
      }
],
    tutorial: [
      {
            "title": "使用方法",
            "content": "选择源对象和目标对象分别添加到左右列表，选择约束类型和匹配选项，点击「执行约束」。",
            "code": "1. 选择源对象添加到左栏\n2. 选择目标对象添加到右栏\n3. 选择约束类型\n4. 设置匹配选项\n5. 点击「执行约束」"
      }
]
  },
  {
    name: "P4 连接器",
    category: "Others",
    icon: "assets/settings.png",
    version: "Maya 2020-2026",
    status: "P4 Tool",
    summary:
      "Perforce 版本控制集成，文件浏览、发布、提交、同步一条龙",
    tags: ["P4", "Perforce", "Version Control", "Submit"],
    features: [
      "文件浏览器 + P4 操作集成",
      "自动识别/手动指定 P4 目标路径",
      "发布 Maya 文件到 P4 Workspace",
      "批量 P4 Submit 提交",
      "P4 Check Out / Add / Revert",
      "P4 Get Latest 同步",
      "P4 Status / Info 状态查看",
      "发布当前场景到 P4"
    ],
    command: `// P4 连接器
import Bingo_ToolBox.tools.others.p4_connector as p4
p4.show()`,
    path: "D:/Codex/maya/Bingo_ToolBox_01/tools/others/",
    screenshots: [
      {
            "title": "P4 连接器界面",
            "src": "assets/tool-10-p4-connector.png",
            "caption": "Perforce 版本控制集成"
      }
],
    tutorial: [
      {
            "title": "使用方法",
            "content": "先在「设置 P4 连接」中配置 P4PORT/P4USER/P4CLIENT。选择本地文件后右键关联 P4 目标，即可执行 P4 操作。",
            "code": "1. 设置 P4 连接信息\n2. 浏览本地文件\n3. 右键关联 P4 目标路径\n4. 执行 P4 操作（Add/Edit/Submit 等）"
      }
]
  },
  {
    name: "杀毒",
    category: "Others",
    icon: "assets/mel.png",
    version: "Maya 2020-2026",
    status: "Security Tool",
    summary:
      "扫描 Maya 场景中的恶意脚本和可疑节点，一键清理病毒",
    tags: ["Security", "Virus", "Script", "Clean"],
    features: [
      "扫描当前 Maya 场景中所有脚本节点",
      "病毒库匹配：识别已知病毒名称和代码模式",
      "自动勾选病毒节点",
      "代码可疑度检测",
      "预览脚本内容，确认后删除",
      "一键删除所有病毒节点"
    ],
    command: `// 杀毒
import Bingo_ToolBox.tools.others.virus_scan as vs
vs.show()`,
    path: "D:/Codex/maya/Bingo_ToolBox_01/tools/others/",
    screenshots: [
      {
            "title": "杀毒工具界面",
            "src": "assets/tool-11-virus-scan.png",
            "caption": "扫描并清理 Maya 场景病毒"
      }
],
    tutorial: [
      {
            "title": "使用方法",
            "content": "打开工具后自动列出场景中所有脚本节点。点击「自动勾选病毒节点」，确认无误后点击「删除选中节点」或「一键删除所有病毒节点」。",
            "code": "1. 打开杀毒工具\n2. 点击「自动勾选病毒节点」\n3. 检查勾选结果\n4. 点击「删除选中节点」清理"
      }
]
  }
];

// ===== State =====
const state = {
  category: "All",
  query: "",
  selected: tools[0].name
};

// ===== DOM Refs =====
const moduleGrid = document.getElementById("moduleGrid");
const toolGrid = document.getElementById("toolGrid");
const filterBar = document.getElementById("filterBar");
const detailPanel = document.getElementById("detailPanel");
const searchInput = document.getElementById("searchInput");

// ===== Helpers =====
function escapeHtml(value) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

function escapeAttribute(value) {
  return escapeHtml(value).replaceAll('"', "&quot;");
}

async function copyText(value) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(value);
    return;
  }
  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
}

function normalize(value) {
  return value.toLowerCase().trim();
}

function getVisibleTags(tool) {
  if (tool && tool.name === "Selected Ctrl Mirror") return [];
  var hidden = { Install: true, Menu: true, Shelf: true };
  return (tool.tags || []).filter(function (tag) { return !hidden[tag]; });
}

function getCategories() {
  return ["All", ...Array.from(new Set(tools.map((t) => t.category)))];
}

function getFilteredTools() {
  const query = normalize(state.query);
  return tools.filter((tool) => {
    const catMatch = state.category === "All" || tool.category === state.category;
    const haystack = normalize([tool.name, tool.category, tool.summary, tool.version, tool.status, ...tool.tags, ...tool.features].join(" "));
    return catMatch && (!query || haystack.includes(query));
  });
}

function getToolByName(name) {
  return tools.find(function (tool) { return tool.name === name; }) || tools[0];
}

function selectTool(name, shouldScroll) {
  state.selected = name;
  renderFilters();
  renderToolGrid();
  renderDetail(getToolByName(state.selected));
  if (shouldScroll) {
    document.getElementById("tools").scrollIntoView({ behavior: "smooth" });
  }
}

// 暴露给内联 onclick，确保动态卡片点击在各种浏览器缓存/重绘场景下都能切换详情。
window.selectToolByName = function (name, shouldScroll) {
  selectTool(name, shouldScroll);
};

// ===== Module Grid (hero下面) =====
function renderModuleGrid() {
  if (!moduleGrid) return;
  moduleGrid.innerHTML = tools.map(function (tool) {
    return '<div class="module-card" data-tool="' + escapeAttribute(tool.name) + '" onclick="selectToolByName(this.dataset.tool, true)">' +
      '<div class="module-card-header">' +
        '<img src="' + tool.icon + '" alt="" loading="lazy">' +
        '<div><h3>' + escapeHtml(tool.name) + '</h3>' +
        '<span class="module-status">' + escapeHtml(tool.status) + '</span></div>' +
      '</div>' +
      '<p>' + escapeHtml(tool.summary) + '</p>' +
      '<div class="module-tags">' +
        getVisibleTags(tool).slice(0, 4).map(function (tag) { return '<span class="module-tag">' + escapeHtml(tag) + '</span>'; }).join("") +
      '</div>' +
    '</div>';
  }).join("");

  moduleGrid.querySelectorAll(".module-card").forEach(function (card) {
    card.addEventListener("click", function () {
      state.category = "All";
      if (searchInput) searchInput.value = "";
      state.query = "";
      selectTool(card.dataset.tool, true);
    });
  });
}

function renderModuleGridFiltered() {
  if (!moduleGrid) return;
  moduleGrid.querySelectorAll(".module-card").forEach(function (card) {
    var name = card.dataset.tool.toLowerCase();
    var query = state.query.toLowerCase();
    card.style.display = query && !name.includes(query) ? "none" : "";
  });
}

// ===== Filter Bar =====
function renderFilters() {
  filterBar.innerHTML = "";
  getCategories().forEach((category) => {
    const btn = document.createElement("button");
    btn.className = "filter-btn" + (state.category === category ? " active" : "");
    btn.type = "button";
    btn.textContent = category;
    btn.addEventListener("click", () => {
      state.category = category;
      render();
    });
    filterBar.appendChild(btn);
  });
}

// ===== Tool Grid =====
function renderToolGrid() {
  const filtered = getFilteredTools();
  toolGrid.innerHTML = "";

  if (!filtered.length) {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    empty.textContent = "没有找到匹配的工具";
    toolGrid.appendChild(empty);
    renderDetail(null);
    return;
  }

  if (!filtered.some((t) => t.name === state.selected)) {
    state.selected = filtered[0].name;
  }

  filtered.forEach((tool) => {
    const card = document.createElement("button");
    card.type = "button";
    card.dataset.tool = tool.name;
    card.setAttribute("onclick", "selectToolByName(this.dataset.tool, false)");
    card.className = "tool-card" + (state.selected === tool.name ? " active" : "");
    card.addEventListener("click", () => {
      selectTool(tool.name, false);
    });
    card.innerHTML = `
      <div class="tool-card-header">
        <img src="${tool.icon}" alt="" loading="lazy">
        <div>
          <h3>${escapeHtml(tool.name)}</h3>
          <span class="card-status">${escapeHtml(tool.status)}</span>
        </div>
      </div>
      <p>${escapeHtml(tool.summary)}</p>
      <div class="card-tags">
        ${getVisibleTags(tool).slice(0, 4).map((tag) => `<span class="card-tag">${escapeHtml(tag)}</span>`).join("")}
      </div>
    `;
    toolGrid.appendChild(card);
  });

}

// ===== Detail Panel =====
function renderDetail(tool) {
  if (!tool) {
    detailPanel.innerHTML = "";
    return;
  }

  var screenshotHTML = "";
  if (tool.screenshots && tool.screenshots.length) {
    screenshotHTML = '<div class="tool-screenshot-section"><p class="eyebrow" style="margin-top:0">UI Preview</p>' +
      '<div class="tool-screenshot-grid">' +
      tool.screenshots.map(function (shot) {
        var isVideo = shot.src && /\.mp4$/i.test(shot.src);
        var mediaHTML = isVideo
          ? '<video src="' + escapeAttribute(shot.src) + '" controls playsinline muted loop style="width:100%;height:auto;display:block;background:#1f2937;border-bottom:1px solid var(--c-border-light)"></video>'
          : '<img src="' + escapeAttribute(shot.src) + '" alt="' + escapeAttribute(shot.title) + '" loading="lazy">';
        return '<figure class="tool-screenshot-card">' +
          mediaHTML +
          '<figcaption><strong>' + escapeHtml(shot.title) + '</strong><span>' + escapeHtml(shot.caption) + '</span></figcaption>' +
        '</figure>';
      }).join("") +
      '</div></div>';
  }

  var tutorialHTML = "";
  if (tool.tutorial) {
    tutorialHTML = '<div class="tutorial-section"><p class="eyebrow" style="margin-top:0">Tutorial</p>' +
      tool.tutorial.map(function (step) {
        var codeBlock = "";
        if (step.code) {
          codeBlock = '<pre><code>' + escapeHtml(step.code) + '</code></pre>' +
            '<button class="tutorial-copy-btn" type="button" data-code="' + escapeAttribute(step.code) + '">Copy</button>';
        }
        return '<div class="tutorial-item"><h4>' + escapeHtml(step.title) + '</h4><p>' + escapeHtml(step.content) + '</p>' + codeBlock + '</div>';
      }).join("") + '</div>';
  }

  detailPanel.innerHTML =
    '<p class="eyebrow">' + escapeHtml(tool.category) + '</p>' +
    '<h2>' + escapeHtml(tool.name) + '</h2>' +
    '<p>' + escapeHtml(tool.summary) + '</p>' +
    '<div class="detail-meta">' +
      '<span class="tag">' + escapeHtml(tool.version) + '</span>' +
      '<span class="status-tag">' + escapeHtml(tool.status) + '</span>' +
      getVisibleTags(tool).map(function (tag) { return '<span class="tag">' + escapeHtml(tag) + '</span>'; }).join("") +
    '</div>' +
    '<ul class="feature-list">' +
      tool.features.map(function (f) { return '<li>' + escapeHtml(f) + '</li>'; }).join("") +
    '</ul>' +
    screenshotHTML +
    tutorialHTML +
    '<div class="detail-actions" style="margin-top:16px">' +
      '<button class="copy-btn" type="button" data-code="' + escapeAttribute(tool.command) + '">Copy Command</button>' +
      (tool.download ? '<a class="download-btn-detail" href="' + tool.download + '" download>下载 EXE</a>' : "") +
    '</div>';

  // bind copy buttons
  detailPanel.querySelectorAll(".copy-btn, .tutorial-copy-btn").forEach(function (btn) {
    btn.addEventListener("click", async function (e) {
      var code = e.currentTarget.dataset.code;
      await copyText(code);
      var original = e.currentTarget.textContent;
      e.currentTarget.textContent = "Copied!";
      window.setTimeout(function () {
        e.currentTarget.textContent = original;
      }, 1200);
    });
  });
}

// ===== Main Render =====
function render() {
  renderFilters();
  renderToolGrid();
  renderDetail(getToolByName(state.selected));
}

// ===== Init =====
renderModuleGrid();
render();

if (searchInput) {
  searchInput.addEventListener("input", function (e) {
    state.query = e.target.value;
    state.category = "All";
    document.getElementById("tools").scrollIntoView({ behavior: "smooth" });
    render();
    renderModuleGridFiltered();

  });
}

// 兜底点击处理：确保点击任何工具卡片都会刷新右侧详情面板
// 使用捕获阶段处理，避免按钮焦点/滚动导致详情面板停留在旧工具。
document.addEventListener("click", function (event) {
  var card = event.target.closest && event.target.closest(".module-card, .tool-card");
  if (!card) return;
  var name = card.dataset.tool;
  if (!name) {
    var title = card.querySelector("h3");
    name = title ? title.textContent.trim() : "";
  }
  if (!name) return;
  if (card.classList.contains("module-card")) {
    state.category = "All";
    state.query = "";
    if (searchInput) searchInput.value = "";
  }
  state.selected = name;
  renderFilters();
  renderToolGrid();
  renderDetail(getToolByName(name));
}, true);

// ===== Donate QR =====
(function () {
  var donateBtn = document.getElementById("donateBtn");
  var qrOverlay = document.getElementById("qrOverlay");
  var qrClose = document.getElementById("qrClose");
  var qrImgBox = document.getElementById("qrImgBox");
  var qrTitle = document.getElementById("qrTitle");
  var qrSwitch = document.getElementById("qrSwitch");

  if (!donateBtn) return;

  var isWeChat = true;

  // 全局计数器（GitHub Issue #32，所有访客共享）
  var COUNTER_ISSUE = 32;
  var COUNTER_REPO = "Bingtools/Bingo-Tools";
  var donateCountEl = document.getElementById("donateCount");

  function fetchCounter() {
    if (!donateCountEl) return;
    donateCountEl.textContent = "💛 ...";
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://api.github.com/repos/" + COUNTER_REPO + "/issues/" + COUNTER_ISSUE);
    xhr.setRequestHeader("Authorization", "Bearer " + ((typeof window !== "undefined" && window._GHT) ? window._GHT : ""));
    xhr.setRequestHeader("Accept", "application/vnd.github+json");
    xhr.onload = function () {
      if (xhr.status === 200) {
        var issue = JSON.parse(xhr.responseText);
        donateCountEl.textContent = "💛 " + (issue.body || "0");
      } else {
        donateCountEl.textContent = "💛 0";
      }
    };
    xhr.onerror = function () { donateCountEl.textContent = "💛 0"; };
    xhr.send();
  }

  function addCounter(next) {
    var xhr = new XMLHttpRequest();
    xhr.open("PATCH", "https://api.github.com/repos/" + COUNTER_REPO + "/issues/" + COUNTER_ISSUE);
    xhr.setRequestHeader("Authorization", "Bearer " + ((typeof window !== "undefined" && window._GHT) ? window._GHT : ""));
    xhr.setRequestHeader("Accept", "application/vnd.github+json");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = function () {
      if (xhr.status === 200) {
        var issue = JSON.parse(xhr.responseText);
        donateCountEl.textContent = "💛 " + (issue.body || "0");
      } else {
        // 失败时至少本地 +1 显示
        var local = parseInt(donateCountEl.textContent.replace("💛 ", "") || "0", 10);
        donateCountEl.textContent = "💛 " + (local + 1);
      }
    };
    xhr.onerror = function () {
      var local = parseInt(donateCountEl.textContent.replace("💛 ", "") || "0", 10);
      donateCountEl.textContent = "💛 " + (local + 1);
    };
    xhr.send(JSON.stringify({ body: String(next) }));
  }

  fetchCounter();

  donateBtn.addEventListener("click", function () {
    isWeChat = true;
    qrImgBox.innerHTML = '<img src="assets/wechat-qr.png" alt="微信收款码">';
    qrTitle.innerText = "微信收款码";
    qrSwitch.innerText = "点击切换：支付宝";
    qrOverlay.style.display = "flex";

    // 全局计数 +1
    var now = parseInt(donateCountEl.textContent.replace("💛 ", "") || "0", 10);
    addCounter(now + 1);
  });

  qrClose.addEventListener("click", function () {
    qrOverlay.style.display = "none";
  });

  qrOverlay.addEventListener("click", function (e) {
    if (e.target === qrOverlay) qrOverlay.style.display = "none";
  });

  qrSwitch.addEventListener("click", function () {
    isWeChat = !isWeChat;
    if (isWeChat) {
      qrImgBox.innerHTML = '<img src="assets/wechat-qr.png" alt="微信收款码">';
      qrTitle.innerText = "微信收款码";
      qrSwitch.innerText = "点击切换：支付宝";
    } else {
      qrImgBox.innerHTML = '<img src="assets/alipay-qr.png" alt="支付宝收款码">';
      qrTitle.innerText = "支付宝收款码";
      qrSwitch.innerText = "点击切换：微信";
    }
  });
})();



// ===== Message Board (GitHub Issues API) =====
(function () {
  var OWNER = "Bingtools";
  var REPO = "Bingo-Tools";
  var LABEL = "comment";
  var PIN_LABEL = "pinned";
  var _t = [];
  // GH_TOKEN 从 index.html 注入的 window._GHT 读取，避免在此文件中出现 Token 字符串
  var GH_TOKEN = (typeof window !== "undefined" && window._GHT) ? window._GHT : "";
  var API = "https://api.github.com/repos/" + OWNER + "/" + REPO + "/issues";

  var msgInput = document.getElementById("msgInput");
  var sendBtn = document.getElementById("sendBtn");
  var msgList = document.getElementById("msgList");
  var fontPicker = document.getElementById("msgFontPicker");
  var colorPicker = document.getElementById("msgColorPicker");

  if (!msgInput || !msgList) return;

  // 随机昵称（持久化到localStorage）
  var adjectives = ["快乐的","可爱的","认真的","悠闲的","好奇的","勇敢的","温柔的","机智的"];
  var animals = ["小熊猫","小海豚","小狐狸","小兔子","小松鼠","小企鹅","小考拉","小柴犬","小橘猫","小鹦鹉","小仓鼠","小鹿"];
  var USER_KEY = "bingo_msg_name";
  var AUTHOR_PASS = "bingo2026"; // ← 作者密码，在此修改
  var userName = localStorage.getItem(USER_KEY);
  if (!userName) {
    userName = adjectives[Math.floor(Math.random() * adjectives.length)] + animals[Math.floor(Math.random() * animals.length)];
    localStorage.setItem(USER_KEY, userName);
  }

  // 作者身份切换（需密码验证）
  var authorToggle = document.getElementById("authorToggle");
  var isAuthor = localStorage.getItem("bingo_author_auth") === AUTHOR_PASS;
  if (isAuthor) {
    userName = "作者";
    if (authorToggle) { authorToggle.textContent = "✅ 作者"; authorToggle.classList.add("author-active"); }
  }
  if (authorToggle) {
    authorToggle.addEventListener("click", function () {
      if (!isAuthor) {
        var pass = prompt("请输入作者密码：");
        if (pass === AUTHOR_PASS) {
          isAuthor = true;
          localStorage.setItem("bingo_author_auth", AUTHOR_PASS);
          userName = "作者";
          authorToggle.textContent = "✅ 作者";
          authorToggle.classList.add("author-active");
        } else if (pass !== null) {
          alert("密码错误！");
        }
      } else {
        isAuthor = false;
        localStorage.removeItem("bingo_author_auth");
        userName = adjectives[Math.floor(Math.random() * adjectives.length)] + animals[Math.floor(Math.random() * animals.length)];
        localStorage.setItem(USER_KEY, userName);
        authorToggle.textContent = "🔒 游客";
        authorToggle.classList.remove("author-active");
      }
    });
  }


  fontPicker.addEventListener("change", function () { msgInput.style.fontFamily = fontPicker.value; });
  colorPicker.addEventListener("input", function () { msgInput.style.color = colorPicker.value; });
  msgInput.style.fontFamily = fontPicker.value;
  msgInput.style.color = colorPicker.value;

  function api(method, path, body) {
    return new Promise(function (resolve, reject) {
      var url = path.startsWith("http") ? path : "https://api.github.com" + path;
      // GET 请求加时间戳参数绕过浏览器缓存 & GitHub API 60s CDN 缓存
      // 注意：不能加 Cache-Control/Pragma 等非简单头，否则触发 CORS OPTIONS 预检失败
      if (method === "GET") {
        url += (url.indexOf("?") > -1 ? "&" : "?") + "_t=" + Date.now();
      }
      var xhr = new XMLHttpRequest();
      xhr.open(method, url);
      xhr.setRequestHeader("Authorization", "Bearer " + GH_TOKEN);
      xhr.setRequestHeader("Accept", "application/vnd.github+json");
      if (body) xhr.setRequestHeader("Content-Type", "application/json");
      xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) resolve(xhr.responseText ? JSON.parse(xhr.responseText) : {});
        else reject(xhr.status + ": " + (JSON.parse(xhr.responseText || "{}").message || "error"));
      };
      xhr.onerror = function () { reject("网络错误"); };
      xhr.send(body ? JSON.stringify(body) : null);
    });
  }

  function esc(str) {
    var div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML.replace(/\n/g, "<br>");
  }

  function fmtDate(s) {
    var d = new Date(s);
    var p = function (n) { return (n < 10 ? "0" : "") + n; };
    return d.getFullYear() + "-" + p(d.getMonth() + 1) + "-" + p(d.getDate()) + " " + p(d.getHours()) + ":" + p(d.getMinutes());
  }

  function parseBody(body) {
    var name = "匿名", font = "Nunito, sans-serif", color = "#3d2c5e", text = body || "";
    // 1) 正确格式: [[NAME:xxx]][[FONT:xxx]][[COLOR:xxx]]
    var m = (body || "").match(/^\[\[NAME:(.*?)\]\]\[\[FONT:(.*?)\]\]\[\[COLOR:(.*?)\]\]/);
    // 2) 兼容历史乱码格式: [[NAME:xxx]][[NAME:...]][...[FONT:xxx]]!!COLOR:xxx]]
    if (!m) {
      m = (body || "").match(/^\[\[NAME:(.*?)\]\][\s\S]*?FONT:(.*?)\]\]!!COLOR:(.*?)\]\]/);
    }
    if (m) { name = m[1]; font = m[2]; color = m[3]; text = body.replace(m[0], "").trim(); }
    return { name: name, font: font, color: color, text: text };
  }

  function wrapBody(text, font, color) {
    return "[[NAME:" + userName + "]][[FONT:" + font + "]][[COLOR:" + color + "]]" + text;
  }

  function loadReplies(issueNum, containerEl) {
    containerEl.innerHTML = '<div style="color:var(--c-text-light);font-size:12px;padding:6px 0">加载...</div>';
    api("GET", API + "/" + issueNum + "/comments?per_page=50")
      .then(function (comments) {
        if (!comments.length) { containerEl.innerHTML = ""; return; }
        containerEl.innerHTML = "";
        comments.forEach(function (c) {
          var parsed = parseBody(c.body);
          var div = document.createElement("div");
          div.className = "msg-reply-item";
          div.style.cssText = "padding:6px 0;border-bottom:1px solid rgba(0,0,0,0.05);font-size:13px";
          div.innerHTML = '<div style="font-family:' + parsed.font + ';color:' + parsed.color + ';margin-bottom:2px">' + esc(parsed.text) + '</div><span class="msg-reply-nick" style="font-weight:600;font-size:11px;color:#7c3aed">' + esc(parsed.name) + '</span>' +
            ' <span class="msg-reply-time" style="color:#9ca3af;font-size:11px">' + fmtDate(c.created_at) + '</span>';
          containerEl.appendChild(div);  // 关键：把评论项追加到容器
        });
      })
      .catch(function () { containerEl.innerHTML = '<div style="color:#ef4444;font-size:12px;padding:4px 0">加载失败</div>'; });
  }

  function buildMsgItem(issue, isPinned, insertTop) {
    var parsed = parseBody(issue.body);
    var div = document.createElement("div");
    div.className = "msg-item";
    if (isPinned) div.classList.add("msg-pinned");
    div.innerHTML =
      '<div class="msg-item-content" style="font-family:' + parsed.font + ';color:' + parsed.color + '">' +
        '<span class="msg-nick-prefix">' + esc(parsed.name) + '：</span>' + esc(parsed.text) +
      '</div>' +
      '<div class="msg-item-meta">' +
        (isPinned ? '<span class="msg-pin-badge">📌 已置顶</span>' : '') +
        '<span class="msg-item-time">' + fmtDate(issue.created_at) + '</span>' +
        '<span class="msg-item-reply-btn" data-num="' + issue.number + '" style="cursor:pointer;font-size:12px;color:#7c3aed;margin-left:8px;opacity:0.75">' + (issue.comments ? (issue.comments + " 条评论") : "评论") + '</span>' +
        (isAuthor ? (
          isPinned
            ? '<span class="msg-pin-btn" data-num="' + issue.number + '" data-action="unpin">取消置顶</span>'
            : '<span class="msg-pin-btn" data-num="' + issue.number + '" data-action="pin">📌 置顶</span>'
        ) : '') +
      '</div>' +
      '<div class="msg-reply-box" style="display:none;padding:10px 12px 8px;margin-top:6px;background:rgba(0,0,0,0.03);border-radius:8px;border-left:3px solid #6d28d9">' +
        '<div class="msg-reply-list" style="min-height:20px"></div>' +
        '<div class="msg-reply-input-row" style="display:flex;gap:6px;margin-top:8px">' +
          '<input class="msg-reply-input" placeholder="评论..." maxlength="300">' +
          '<button class="btn-reply-send">发送</button>' +
        '</div>' +
      '</div>';
    if (insertTop) {
      msgList.insertBefore(div, msgList.firstChild);
    } else {
      msgList.appendChild(div);
    }

    var toggle = div.querySelector(".msg-item-reply-btn");
    var replyBox = div.querySelector(".msg-reply-box");
    var replyList = div.querySelector(".msg-reply-list");
    toggle.addEventListener("click", function () {
      var open = replyBox.style.display !== "none";
      replyBox.style.display = open ? "none" : "";
      if (!open && !replyList.dataset.loaded) {
        loadReplies(issue.number, replyList);
        replyList.dataset.loaded = "1";
      }
    });

    var replySend = div.querySelector(".btn-reply-send");
    var replyInput = div.querySelector(".msg-reply-input");
    replySend.addEventListener("click", function () {
      var val = replyInput.value.trim();
      if (!val) return;
      var font = fontPicker.value, color = colorPicker.value;
      var body = wrapBody(val, font, color);

      // 乐观更新：立即显示回复
      replyInput.value = "";
      var tempReply = document.createElement("div");
      tempReply.className = "msg-reply-item";
      tempReply.style.opacity = "0.6";
      tempReply.innerHTML = '<div style="font-family:' + font + ';color:' + color + '">' + esc(val) + '</div>' +
        '<span class="msg-reply-nick">' + (userName || "匿名") + ' </span>' +
        '<div class="msg-reply-time">发送中...</div>';
      replyList.appendChild(tempReply);

      replySend.disabled = true; replySend.textContent = "...";
      api("POST", API + "/" + issue.number + "/comments", { body: body })
        .then(function () {
          replySend.disabled = false; replySend.textContent = "发送";
          delete replyList.dataset.loaded;
          loadReplies(issue.number, replyList);
          replyList.dataset.loaded = "1";
          var cnt = (issue.comments || 0) + 1;
          issue.comments = cnt;
          toggle.textContent = cnt + " 条评论";
        })
        .catch(function (err) {
          tempReply.remove();
          alert("评论失败: " + String(err).slice(0, 80));
          replySend.disabled = false; replySend.textContent = "发送";
        });
    });
    replyInput.addEventListener("keydown", function (e) { if (e.key === "Enter") replySend.click(); });

    // 置顶/取消置顶（仅作者可见可操作）
    var pinBtn = div.querySelector(".msg-pin-btn");
    if (pinBtn) {
      pinBtn.addEventListener("click", function () {
        var num = pinBtn.dataset.num;
        var action = pinBtn.dataset.action;
        pinBtn.textContent = "...";
        if (action === "pin") {
          api("POST", API + "/" + num + "/labels", { labels: [PIN_LABEL] })
            .then(function () { render(); })
            .catch(function (err) { alert("置顶失败: " + String(err).slice(0, 80)); pinBtn.textContent = "📌 置顶"; });
        } else {
          api("DELETE", API + "/" + num + "/labels/" + PIN_LABEL)
            .then(function () { render(); })
            .catch(function (err) { alert("取消置顶失败: " + String(err).slice(0, 80)); pinBtn.textContent = "取消置顶"; });
        }
      });
    }
  }

  function render() {
    msgList.innerHTML = '<div style="text-align:center;color:var(--c-text-light);padding:20px">加载留言...</div>';

    // 两个请求各自独立处理错误，避免一个失败导致整体不显示
    var p1 = api("GET", API + "?labels=" + PIN_LABEL + "&state=open&sort=updated&direction=desc&per_page=100")
      .catch(function (e) { console.warn("[留言板] 置顶列表加载失败:", e); return []; });
    var p2 = api("GET", API + "?labels=" + LABEL + "&state=open&sort=created&direction=desc&per_page=100")
      .catch(function (e) { console.warn("[留言板] 普通列表加载失败:", e); return []; });

    Promise.all([p1, p2]).then(function (results) {
      var pinned  = Array.isArray(results[0]) ? results[0] : [];
      var regular = Array.isArray(results[1]) ? results[1] : [];

      // 从普通列表移除已置顶的（带两个标签的issue只显示在置顶区）
      var pinnedNums = {};
      pinned.forEach(function (p) { pinnedNums[p.number] = true; });
      regular = regular.filter(function (r) { return !pinnedNums[r.number]; });

      msgList.innerHTML = "";

      if (!pinned.length && !regular.length) {
        var empty = document.createElement("div");
        empty.dataset.placeholder = "1";
        empty.style.cssText = "text-align:center;color:var(--c-text-light);padding:16px";
        empty.textContent = "暂无留言，来说两句吧~";
        msgList.appendChild(empty);
        return;
      }

      pinned.forEach(function (issue) { buildMsgItem(issue, true); });
      regular.forEach(function (issue) { buildMsgItem(issue, false); });
    });
  }

  sendBtn.addEventListener("click", function () {
    var val = msgInput.value.trim();
    if (!val) return;
    var font = fontPicker.value, color = colorPicker.value;
    var body = wrapBody(val, font, color);

    // 乐观更新：立即显示（先清除"加载中"占位，防止空列表时只有占位符）
    var placeholder = msgList.querySelector("[data-placeholder]");
    if (placeholder) placeholder.remove();

    var now = new Date();
    var p = function (n) { return (n < 10 ? "0" : "") + n; };
    var timeStr = now.getFullYear() + "-" + p(now.getMonth() + 1) + "-" + p(now.getDate()) +
      " " + p(now.getHours()) + ":" + p(now.getMinutes());

    var temp = document.createElement("div");
    temp.className = "msg-item";
    temp.style.opacity = "0.7";
    temp.innerHTML = '<div class="msg-item-content" style="font-family:' + font + ';color:' + color + '">' +
      '<span class="msg-nick-prefix">' + esc(userName || "匿名") + '：</span>' + esc(val) +
      '</div><div class="msg-item-meta"><span class="msg-item-time">' + timeStr + ' · 发送中...</span></div>';
    msgList.insertBefore(temp, msgList.firstChild);

    msgInput.value = "";
    sendBtn.disabled = true; sendBtn.textContent = "发送中...";

    api("POST", API, { title: "[留言] " + val.slice(0, 30), body: body, labels: [LABEL] })
      .then(function (newIssue) {
        sendBtn.disabled = false; sendBtn.textContent = "发送";
        // 删除临时占位项
        temp.remove();
        // 用 buildMsgItem 直接构建正式留言项（含评论/删除/置顶按钮），插到列表最前
        var placeholder = msgList.querySelector("[data-placeholder]");
        if (placeholder) placeholder.remove();
        // 构造一个与 GitHub API 返回格式一致的 issue 对象
        var fakeIssue = {
          number: newIssue.number,
          body: body,
          comments: 0,
          created_at: new Date().toISOString(),
          labels: newIssue.labels || []
        };
        buildMsgItem(fakeIssue, false, true); // true = 插到顶部
      })
      .catch(function (err) {
        temp.remove();
        alert("发送失败: " + String(err).slice(0, 80));
        sendBtn.disabled = false; sendBtn.textContent = "发送";
      });
  });

  msgInput.addEventListener("keydown", function (e) { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendBtn.click(); } });

  render();
})();

// ===== Page Theme Switcher =====
(function () {
  var root = document.documentElement;
  var buttons = document.querySelectorAll(".theme-btn");
  var customWrap = document.querySelector(".theme-custom");
  var colorInput = document.getElementById("themeColorPicker");
  var STORAGE_KEY = "bingo_page_theme";
  var COLOR_KEY = "bingo_page_custom_color";

  if (!buttons.length || !colorInput) return;

  function clamp(n) { return Math.max(0, Math.min(255, n)); }

  function hexToRgb(hex) {
    var value = String(hex || "#8b5cf6").replace("#", "");
    if (value.length === 3) value = value.split("").map(function (c) { return c + c; }).join("");
    var num = parseInt(value, 16);
    return {
      r: (num >> 16) & 255,
      g: (num >> 8) & 255,
      b: num & 255
    };
  }

  function rgbToHex(rgb) {
    return "#" + [rgb.r, rgb.g, rgb.b].map(function (n) {
      return clamp(Math.round(n)).toString(16).padStart(2, "0");
    }).join("");
  }

  function mix(hex, target, amount) {
    var a = hexToRgb(hex);
    var b = hexToRgb(target);
    return rgbToHex({
      r: a.r + (b.r - a.r) * amount,
      g: a.g + (b.g - a.g) * amount,
      b: a.b + (b.b - a.b) * amount
    });
  }

  function applyCustomColor(hex) {
    var rgb = hexToRgb(hex);
    root.style.setProperty("--visitor-accent", hex);
    root.style.setProperty("--visitor-accent-hover", mix(hex, "#000000", 0.16));
    root.style.setProperty("--visitor-accent-light", mix(hex, "#ffffff", 0.84));
    root.style.setProperty("--visitor-bg-start", mix(hex, "#ffffff", 0.78));
    root.style.setProperty("--visitor-bg-mid", mix(hex, "#e8f0ff", 0.62));
    root.style.setProperty("--visitor-bg-end", mix(hex, "#fff5f0", 0.66));
    root.style.setProperty("--visitor-border", mix(hex, "#ffffff", 0.70));
    root.style.setProperty("--visitor-border-light", mix(hex, "#ffffff", 0.86));
    root.style.setProperty("--visitor-nav-bg", "rgba(" + rgb.r + "," + rgb.g + "," + rgb.b + ",0.12)");
  }

  function setActive(theme) {
    buttons.forEach(function (btn) {
      btn.classList.toggle("active", btn.dataset.theme === theme);
    });
    if (customWrap) customWrap.classList.toggle("active", theme === "custom");
  }

  function applyTheme(theme, color, persist) {
    var nextTheme = theme || "light";
    var nextColor = color || colorInput.value || "#8b5cf6";
    applyCustomColor(nextColor);
    root.setAttribute("data-page-theme", nextTheme);
    colorInput.value = nextColor;
    setActive(nextTheme);
    if (persist) {
      localStorage.setItem(STORAGE_KEY, nextTheme);
      localStorage.setItem(COLOR_KEY, nextColor);
    }
  }

  buttons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      applyTheme(btn.dataset.theme, colorInput.value, true);
    });
  });

  if (customWrap) {
    customWrap.addEventListener("click", function () {
      applyTheme("custom", colorInput.value, true);
    });
  }

  colorInput.addEventListener("input", function () {
    applyTheme("custom", colorInput.value, true);
  });

  applyTheme(localStorage.getItem(STORAGE_KEY) || "light", localStorage.getItem(COLOR_KEY) || colorInput.value, false);
})();

// ===== Tutorial Modal =====
(function () {
  var overlay = document.getElementById("tutorialOverlay");
  var closeBtn = document.getElementById("tutorialClose");
  var navBtn = document.getElementById("tutorialNavBtn");
  if (!overlay || !closeBtn || !navBtn) return;

  function open() { overlay.classList.add("open"); document.body.style.overflow = "hidden"; }
  function close() { overlay.classList.remove("open"); document.body.style.overflow = ""; }

  navBtn.addEventListener("click", function (e) { e.preventDefault(); open(); });
  closeBtn.addEventListener("click", close);
  overlay.addEventListener("click", function (e) { if (e.target === overlay) close(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
})();

// ===== Tiger Heart Interaction =====
(function () {
  var tiger = document.querySelector(".tiger-corner");
  if (!tiger) return;
  tiger.addEventListener("click", function (e) {
    // 同步触发爱心计数 +1
    var donateBtn = document.getElementById("donateBtn");
    if (donateBtn) donateBtn.click();
    for (var i = 0; i < 5; i++) {
      var heart = document.createElement("span");
      heart.className = "tiger-heart";
      heart.textContent = ["❤","💕","💖","💗","💝","✨","💜"][Math.floor(Math.random() * 7)];
      heart.style.left = (e.clientX + (Math.random() - 0.5) * 80) + "px";
      heart.style.top = (e.clientY + (Math.random() - 0.5) * 40) + "px";
      heart.style.animationDuration = (1 + Math.random() * 0.8) + "s";
      heart.style.fontSize = (18 + Math.random() * 22) + "px";
      document.body.appendChild(heart);
      setTimeout(function (h) { return function () { h.remove(); }; }(heart), 1400);
    }
  });
})();

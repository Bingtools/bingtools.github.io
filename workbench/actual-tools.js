(function () {
  const ICON_ROOT = '/stellar-source/assets/tool-icons/';
  const sourceInfo = {
    path: 'D:\\Maya\\_Tool\\Bingo\\_Tools\\tools',
    version: '0.0.4.15',
    maya: '2020–2026',
    scannedAt: '2026-09-03',
    officialToolCount: 52,
    bundledEntryCount: 1,
    downloadUrl: 'https://github.com/Bingtools/bingtools.github.io/releases/download/v0.0.4.15/BingoToolsBox_M_V0.0.4.15.exe',
  };
  const DOC_ROOT = '/stellar-source/assets/tool-docs/';
  const docFolderByTool = {
    '批量处理': 'start_batch_processing',
    '三角面转四边面': '三转四面',
    '裁剪动画': 'crop_animation',
    '快速烘焙': 'fast_bake',
    '轻量运动轨迹': 'light_motion_trail',
    '平滑所选关键帧': 'smooth_selected_keys',
    '跟随烘焙': null,
    'Animo v6.2.0': null,
  };

  const categoryInfo = {
    Animation: { label: '动画', tone: 'violet' },
    Rigging: { label: '绑定', tone: 'blue' },
    Modeling: { label: '模型', tone: 'teal' },
    FX: { label: '特效', tone: 'orange' },
    Others: { label: '其他', tone: 'slate' },
  };

  const tools = [
    { name: '暴力粘贴', category: 'Animation', desc: '保存姿态或指定范围动画，并按名称、命名空间与对象路径自动识别目标后粘贴。', tags: ['批量', '姿态动画', '自动识别'], file: '暴力粘贴.py', maya: '2020、2022–2026' },
    { name: '动画镜像', category: 'Animation', desc: '按左右命名规则镜像角色姿势与动画关键帧。', tags: ['镜像', '关键帧'], file: '动画镜像.py' },
    { name: '动画路径', category: 'Animation', desc: '实时显示并辅助编辑控制器的运动轨迹。', tags: ['Motion Trail', '轨迹'], file: '动画路径.py' },
    { name: '动作精简', category: 'Animation', desc: '安全精简 Bake 后的逐帧关键帧，保留动作轮廓、Breakdown 与可控误差。', tags: ['减帧', '曲线', 'Bake'], file: '动作精简.py' },
    { name: '改帧颜色', category: 'Animation', desc: '为关键帧或时间段设置颜色标记，快速区分动画状态。', tags: ['时间轴', '标记'], file: '改帧颜色.py' },
    { name: '跟随烘焙', category: 'Animation', desc: '先选动画源、再选目标，把目标跟随结果安全烘焙为位置与旋转关键帧。', tags: ['跟随', '烘焙', '约束替代'], file: '跟随烘焙.py' },
    { name: '空间属性切换', category: 'Animation', desc: '保持世界姿态切换旋转顺序或 Space、Parent、Follow、IK/FK 等空间属性。', tags: ['空间切换', '旋转顺序', '保持姿态'], file: '空间属性切换.py' },
    { name: '临时控制器', category: 'Animation', desc: '创建可烘焙的临时控制器，用于整体调整、空间切换、动画修形和枢轴编辑。', tags: ['临时控制器', '动画修形', '枢轴'], file: '临时控制器.py' },
    { name: '路径指认', category: 'Animation', desc: '递归扫描项目目录，按类型或关键词筛选并打开、导入或引用场景资源。', tags: ['路径', '资源', '递归扫描'], file: '路径指认.py' },
    { name: '路径重定向', category: 'Animation', desc: '把角色根运动重新映射到可编辑曲线，并提供脚锁、贴地与高级路径控制。', tags: ['路径', '重定向', '脚锁'], file: '路径重定向.py' },
    { name: '平滑曲线', category: 'Animation', desc: '快速平滑动画曲线，减少抖动与不必要的数值变化。', tags: ['曲线', '平滑'], file: '平滑曲线.py' },
    { name: '视频参考', category: 'Animation', desc: '在 Maya 内加载与播放视频参考，辅助动作对照。', tags: ['视频', '参考'], file: '视频参考.py' },
    { name: '引用功能', category: 'Animation', desc: '将选中内容安全转为引用，并批量添加、加载、替换或移除本地引用。', tags: ['Reference', '场景', 'FBX'], file: '引用功能.py' },
    { name: '重置姿势', category: 'Animation', desc: '按通道、关键帧或时间范围恢复控制器归位值，并兼容 Animo 保存的默认姿势。', tags: ['归位', '姿势', '关键帧'], file: '重置姿势.py' },
    { name: 'Animation Helper', category: 'Animation', desc: '常用动画辅助操作合集，提升关键帧与控制器编辑效率。', tags: ['动画辅助', '效率'], file: 'Animation Helper.py' },
    { name: 'Bingo 重定向工具', category: 'Animation', desc: '将 Mixamo 等来源的骨骼动画重定向到 Maya 角色。', tags: ['Retarget', 'Mixamo'], file: 'Bingo 重定向工具.py' },
    { name: 'Bingo_多视角拍屏', category: 'Animation', desc: '一次生成多个视角的 Playblast，便于检查与提交。', tags: ['Playblast', '多视角'], file: 'Bingo_多视角拍屏.py' },
    { name: '裁剪动画', category: 'Animation', desc: '保留时间轴高亮范围并删除范围外关键帧，右键还可按播放范围或全部清理。', tags: ['crop_animation', '关键帧', '快捷栏'], file: 'crop_animation.py' },
    { name: '快速烘焙', category: 'Animation', desc: '将所选对象的驱动结果烘焙为普通关键帧，支持 1–7 帧采样步长。', tags: ['fast_bake', 'Bake', '采样'], file: 'fast_bake.py' },
    { name: 'IKFK无缝切换', category: 'Animation', desc: '匹配 IK 与 FK 姿势，完成不中断动作的无缝切换。', tags: ['IK/FK', '匹配'], file: 'IKFK无缝切换.py' },
    { name: '轻量运动轨迹', category: 'Animation', desc: '以实时轨迹或缓存曲线检查世界空间运动路径，不修改原动画。', tags: ['light_motion_trail', '实时显示', '缓存曲线'], file: 'light_motion_trail.py' },
    { name: '平滑所选关键帧', category: 'Animation', desc: '对曲线编辑器中选中的内部关键帧做时间加权平滑，降低局部抖动。', tags: ['smooth_selected_keys', 'Graph Editor', '曲线'], file: 'smooth_selected_keys.py' },
    { name: '批量处理', icon: '批量处理', category: 'Animation', desc: '批量打开并处理 Maya 文件，适合重复性的场景任务。', tags: ['批处理', '场景'], file: 'start_batch_processing.py' },
    { name: 'studiolibrary', category: 'Animation', desc: '保存、浏览和复用角色姿势与动画片段。', tags: ['Pose Library', '动画库'], file: 'studiolibrary.py' },
    { name: 'Animo v6.2.0', icon: 'Animation Helper', category: 'Animation', desc: '随工具箱提供的独立动画工具栏入口，包含时间、切线、偏移、滑块与空间切换等模块。', tags: ['动画工具栏', '随附入口', '非主工具卡'], file: 'Animo_v6_launcher.py', sourceType: '随工具箱提供的独立入口（非主工具卡）', sourcePath: 'tool / shared / launchers / Animo_v6_launcher.py' },

    { name: '对称镜像', category: 'Rigging', desc: '按对称关系镜像物体、骨骼或控制器变换。', tags: ['对称', '变换'], file: '对称镜像.py' },
    { name: '对齐工具', category: 'Rigging', desc: '精确匹配对象的位置、旋转和缩放关系。', tags: ['Align', 'Transform'], file: '对齐工具.py' },
    { name: '控制搭建', category: 'Rigging', desc: '快速创建控制器及常用控制结构，统一绑定制作流程。', tags: ['控制器', '搭建'], file: '控制搭建.py' },
    { name: '蒙皮复制', category: 'Rigging', desc: '在当前场景中一对一或一对多复制影响骨骼和蒙皮权重，并可覆盖已有蒙皮。', tags: ['Skin', '权重复制', '一对多'], file: '蒙皮复制.py' },
    { name: '批量对齐', category: 'Rigging', desc: '依据名称或选择顺序批量完成对象对齐。', tags: ['批量', '对齐'], file: '批量对齐.py' },
    { name: '批量蒙皮复制', category: 'Rigging', desc: '按左右文件列表逐对复制蒙皮，支持 FBX、MA、MB 并将结果保存到 Done 目录。', tags: ['批量蒙皮', 'FBX', '文件处理'], file: '批量蒙皮复制.py' },
    { name: '批量约束', category: 'Rigging', desc: '为多组对象快速建立对应约束，减少重复点击。', tags: ['批量', '约束'], file: '批量约束.py' },
    { name: '曲线显示调整', category: 'Rigging', desc: '统一调整 NURBS 控制曲线的显示与可视属性。', tags: ['NURBS', '显示'], file: '曲线显示调整.py' },
    { name: '选择工具', category: 'Rigging', desc: '保存并快速调用常用选择对象，提高复杂绑定操作效率。', tags: ['选择', '集合'], file: '选择工具.py' },
    { name: '约束工具', category: 'Rigging', desc: '集中创建与管理常用 Maya 约束关系。', tags: ['Constraint', '管理'], file: '约束工具.py' },
    { name: 'ADV', category: 'Rigging', desc: '启动 AdvancedSkeleton，完成角色骨架与控制系统搭建。', tags: ['AdvancedSkeleton', '角色绑定'], file: 'ADV.py' },
    { name: 'Bingo_绑定（鱼、蛇、绳子）', category: 'Rigging', desc: '面向鱼、蛇与绳状角色的专项绑定工作流。', tags: ['生物绑定', '绳索'], file: 'Bingo_绑定（鱼、蛇、绳子）.py' },
    { name: 'Bingo_选择集', category: 'Rigging', desc: '创建、整理并调用角色或场景对象选择集。', tags: ['Selection Set', '管理'], file: 'Bingo_选择集.py' },
    { name: 'IK控制器创建', category: 'Rigging', desc: '从连续骨骼链创建可匹配切换的肢体或样条 IK/FK 系统。', tags: ['IK/FK', '控制器', '骨骼链'], file: 'IK控制器创建.py' },

    { name: '丢失贴图查找器', category: 'Modeling', desc: '扫描场景中的贴图路径，定位缺失文件并辅助修复。', tags: ['贴图', '路径修复'], file: '丢失贴图查找器.py' },
    { name: '模面显隐', category: 'Modeling', desc: '快速隐藏或恢复指定模型面，便于局部检查和制作。', tags: ['组件', '显隐'], file: '模面显隐.py' },
    { name: '强制显示', category: 'Modeling', desc: '处理因属性、层级或显示状态导致的对象不可见问题。', tags: ['显示', '修复'], file: '强制显示.py' },
    { name: '三角面转四边面', category: 'Modeling', desc: '辅助将三角面拓扑转换为四边面结构。', tags: ['拓扑', 'Quad'], file: '三角面转四边面.py' },

    { name: 'Bingo_刀光拖尾', category: 'FX', desc: '为武器或高速运动物体创建刀光与拖尾效果。', tags: ['Trail', '武器特效'], file: 'Bingo_刀光拖尾.py' },
    { name: 'Bingo_花瓣飘落', category: 'FX', desc: '快速生成并控制花瓣飘落的程序化效果。', tags: ['粒子', '飘落'], file: 'Bingo_花瓣飘落.py' },
    { name: 'Bingo_速度线', category: 'FX', desc: '创建漫画风格速度线，强化运动与冲击表现。', tags: ['速度线', '漫画特效'], file: 'Bingo_速度线.py' },
    { name: 'Bingo_物理解算', category: 'FX', desc: '为动画对象提供常用物理运动与动力学解算辅助。', tags: ['Dynamics', '解算'], file: 'Bingo_物理解算.py' },
    { name: 'Bingo_下雨特效', category: 'FX', desc: '搭建和调整 Maya 场景中的下雨效果。', tags: ['雨', '环境特效'], file: 'Bingo_下雨特效.py' },
    { name: 'Bingo_自动布光', category: 'FX', desc: '根据常用方案快速创建和管理场景灯光。', tags: ['Lighting', '自动化'], file: 'Bingo_自动布光.py' },

    { name: '批量导FBX', category: 'Others', desc: '批量导出骨骼或场景资源为 FBX 文件。', tags: ['FBX', '批量导出'], file: '批量导FBX.py' },
    { name: '杀毒', category: 'Others', desc: '检查并清理 Maya 场景中的常见恶意脚本与异常节点。', tags: ['安全', '场景清理'], file: '杀毒.py' },
    { name: '文件预览', category: 'Others', desc: '快速预览 Maya 文件与相关资源内容，减少反复打开场景。', tags: ['文件浏览', 'Preview'], file: '文件预览.py' },
    { name: 'P4连接器', category: 'Others', desc: '连接 Perforce 工作流，辅助提交与管理制作文件。', tags: ['Perforce', 'P4'], file: 'P4连接器.py' },
  ];

  const usageGuides = {
    '暴力粘贴': ['在 Maya 中复制需要复用的动画数据。', '选择一个或多个目标对象并打开工具。', '确认粘贴范围后执行，并检查关键帧结果。'],
    '动画镜像': ['选择需要镜像的角色控制器。', '设置左右命名规则、镜像轴和帧范围。', '先预览姿势，再执行镜像或批量镜像动画。'],
    '动画路径': ['选择带动画的控制器或物体。', '点击创建运动轨迹，观察空间运动路径。', '调整动画后刷新轨迹，完成时可清理显示。'],
    '动作精简': ['选择已经 Bake、带逐帧动画的控制器或骨骼。', '设置时间范围并选择高、中或低保留等级。', '执行安全减帧后播放检查；细节不合适时撤销并提高保留等级。'],
    '改帧颜色': ['选择需要标记的关键帧或时间范围。', '打开工具并选择标记颜色。', '应用颜色；需要恢复时使用清除或默认颜色。'],
    '跟随烘焙': ['先选择带动画的源对象 B，再选择需要跟随的目标对象 A。', '确认时间范围与保持偏移选项。', '执行后检查目标的位置和旋转关键帧；整次操作可一次撤销。'],
    '空间属性切换': ['选择需要处理的动画控制器。', '选择旋转顺序，或选择 Space、Parent、Follow、IK/FK 等属性和目标值。', '确认仅当前帧或整段烘焙后执行，并检查世界姿态。'],
    '临时控制器': ['框选时间范围并选择需要调整的对象。', '创建逐个或整体临时控制器，完成空间、枢轴或动画修形。', '确认结果后烘焙并清理；不保留修改时使用直接删除。'],
    '路径指认': ['打开工具并扫描当前场景的资源路径。', '选择需要重定位的文件类型或缺失资源。', '指定新目录并执行替换，保存前检查结果。'],
    '路径重定向': ['读取角色根控制器和需要脚锁的落地控制器。', '生成或指定 NURBS 路径，设置时间范围与脚锁灵敏度。', '应用重定向并烘焙；需要时可恢复应用前动画。'],
    '平滑曲线': ['选择控制器、动画属性或关键帧范围。', '打开曲线平滑工具并设置平滑强度。', '执行后在曲线编辑器中检查，必要时撤销重调。'],
    '视频参考': ['打开工具并载入本地视频文件。', '设置播放起始帧、偏移或同步范围。', '在 Maya 时间轴中播放，对照视频调整动画。'],
    '引用功能': ['打开工具并选择当前场景中的引用项。', '指定新的本地文件或引用路径。', '执行加载或重定向，并检查命名空间与场景内容。'],
    '重置姿势': ['选择需要归位的控制器；也可在通道盒、曲线编辑器或时间轴限定范围。', '点击快捷栏中的重置姿势图标。', '查看成功、跳过和失败统计，并检查当前帧或关键帧结果。'],
    'Animation Helper': ['从工具箱启动 Animation Helper。', '选择控制器或关键帧，再选择需要的动画辅助模块。', '按模块参数执行并在时间轴中确认结果。'],
    'Bingo 重定向工具': ['准备源骨骼动画和目标角色绑定。', '在工具中指定源、目标及骨骼映射。', '设置帧范围后执行重定向与烘焙。'],
    'Bingo_多视角拍屏': ['选择或添加需要拍屏的多个摄像机。', '设置帧范围、分辨率与输出目录。', '开始 Playblast，完成后检查各视角视频。'],
    '裁剪动画': ['选择需要裁剪动画的对象，并在时间轴拖选要保留的范围。', '单击执行常规裁剪；也可右键选择按播放范围删除或删除所选对象全部关键帧。', '执行前确认选择和范围，误操作可立即 Ctrl+Z。'],
    '快速烘焙': ['选择需要烘焙的控制器或物体。', '框选时间范围，或直接使用当前播放范围。', '单击图标并选择每 1–7 帧的采样步长。'],
    'IKFK无缝切换': ['选择需要切换的手臂或腿部控制器。', '选择 IK→FK 或 FK→IK，并设置当前帧或帧范围。', '执行匹配，播放检查切换前后是否连续。'],
    '轻量运动轨迹': ['选择需要观察的控制器或物体。', '选择原版实时轨迹或 Bingo 缓存曲线，设置范围和外观。', '创建并检查路径，完成后用清理轨迹移除临时预览。'],
    '平滑所选关键帧': ['在曲线编辑器中选中需要处理的关键帧。', '单击图标，以 50% 强度执行一次时间加权平滑。', '检查局部抖动是否改善；首尾关键帧不会被修改。'],
    '批量处理': ['将需要处理的 Maya 文件加入任务列表。', '选择处理操作、输出目录和覆盖方式。', '先备份重要文件，再启动批处理并查看日志。'],
    'studiolibrary': ['选择需要保存的角色控制器。', '新建 Pose 或 Animation 条目并填写名称。', '以后从库中双击条目，将姿势或动画应用到角色。'],
    'Animo v6.2.0': ['点击工具箱中的 Animo 独立入口。', '从停靠工具栏选择时间、切线、烘焙、偏移或滑块模块。', '选择控制器后按模块提示执行操作。'],
    '对称镜像': ['选择源对象、骨骼或控制器。', '设置镜像轴与左右命名规则。', '选择目标并执行镜像，检查变换方向。'],
    '对齐工具': ['先选择参考对象，再选择需要对齐的对象。', '勾选位置、旋转或缩放通道。', '执行对齐并检查局部轴与世界空间结果。'],
    '控制搭建': ['选择需要创建控制器的对象或骨骼。', '选择控制器形状、尺寸、颜色和层级选项。', '执行创建，再检查约束与零组结构。'],
    '蒙皮复制': ['读取一个或多个已蒙皮源模型，再读取目标模型。', '核对左右编号；可使用同数量一对一或单源一对多模式。', '执行复制并检查影响骨骼和权重，整次操作可一次撤销。'],
    '批量对齐': ['按参考—目标的顺序选择多组对象，或使用名称匹配。', '设置需要对齐的变换通道。', '执行批量对齐并抽查各组结果。'],
    '批量蒙皮复制': ['向左右列表分别添加 FBX、MA 或 MB 文件。', '用上移、下移明确同一行的配对，并确认数量一致。', '选择输出格式后执行；成功结果会写入目标文件同级的 Done 文件夹。'],
    '批量约束': ['按驱动—被驱动的顺序选择对象组。', '选择约束类型并设置保持偏移等选项。', '执行创建，在通道盒中检查约束连接。'],
    '曲线显示调整': ['选择需要调整的 NURBS 控制曲线。', '设置线宽、颜色或显示属性。', '应用到所选曲线，并在视图中检查效果。'],
    '选择工具': ['选择一组常用角色或场景对象。', '在工具中创建并命名快捷选择项。', '以后点击保存的项目即可恢复该组选择。'],
    '约束工具': ['选择驱动对象和被驱动对象。', '选择父、点、方向等约束类型与参数。', '创建约束后检查权重、偏移和连接状态。'],
    'ADV': ['启动 ADV 并创建或载入 FitSkeleton。', '调整骨骼定位，使其匹配角色模型。', '按 AdvancedSkeleton 流程构建绑定并测试控制器。'],
    'Bingo_绑定（鱼、蛇、绳子）': ['准备模型或用于绑定的引导曲线。', '选择鱼、蛇或绳子类型并设置关节、控制器数量。', '生成绑定后测试弯曲、跟随和整体控制。'],
    'Bingo_选择集': ['选择需要归组的角色或场景对象。', '新建选择集并设置名称或分类。', '通过列表快速调用、更新或管理选择集。'],
    'IK控制器创建': ['选择连续骨骼链的起始与末端关节，至少 3 根且不能分叉。', '设置命名前缀、控制器尺寸和样条链整体控制端。', '创建后使用匹配切换，并在清理前确认原骨骼与蒙皮结果。'],
    '丢失贴图查找器': ['打开工具并扫描当前场景贴图节点。', '查看缺失文件列表并指定可能的新根目录。', '执行搜索与替换，确认贴图重新加载。'],
    '模面显隐': ['进入组件模式并选择需要临时隐藏的模型面。', '点击隐藏所选面继续局部制作。', '完成后使用恢复功能显示全部被隐藏面。'],
    '强制显示': ['选择无法正常显示的对象或其父级。', '运行工具修复层级、属性或显示状态。', '在视图和大纲中确认对象恢复可见。'],
    '三角面转四边面': ['选择需要处理的多边形模型或三角面。', '设置转换范围与拓扑选项。', '执行转换后检查边流、法线和异常面。'],
    'Bingo_刀光拖尾': ['选择武器、控制器或运动路径。', '设置拖尾宽度、长度、持续时间和材质。', '生成效果并播放检查，需要时烘焙或调整。'],
    'Bingo_花瓣飘落': ['设置花瓣模型与发射区域。', '调整数量、速度、风向和时间范围。', '生成并预览效果，满意后缓存或烘焙。'],
    'Bingo_速度线': ['确定摄像机、运动主体和速度方向。', '设置速度线数量、长度、范围与样式。', '生成后从最终摄像机检查画面效果。'],
    'Bingo_物理解算': ['选择需要参与解算的对象或控制器。', '设置重力、阻尼、碰撞和帧范围。', '运行解算，确认结果后烘焙为关键帧。'],
    'Bingo_下雨特效': ['指定下雨区域、摄像机和需要碰撞的物体。', '设置雨滴密度、速度、方向与时间范围。', '创建效果并播放检查，必要时缓存模拟。'],
    'Bingo_自动布光': ['选择需要照明的模型或场景区域。', '选择灯光方案并设置强度、颜色和方向。', '创建灯光组，从渲染视图继续微调。'],
    '批量导FBX': ['添加需要导出的场景文件、骨骼或对象。', '设置输出目录、命名方式和 FBX 选项。', '执行批量导出并检查日志与生成文件。'],
    '杀毒': ['打开工具扫描当前场景与常见脚本位置。', '先查看检测结果，确认异常脚本或节点。', '执行清理后另存场景，并重新打开检查。'],
    '文件预览': ['选择 Maya 文件所在目录或具体文件。', '在预览面板查看缩略图、场景信息或动画内容。', '确认文件后再打开、导入或加入后续流程。'],
    'P4连接器': ['先配置 P4PORT、P4USER 和 Workspace。', '选择本地文件并确认对应的 P4 目标路径。', '按需要执行同步、签出、添加或提交，并查看状态结果。'],
  };

  const filterBar = document.getElementById('filterBar');
  const grid = document.getElementById('toolGrid');
  const detail = document.getElementById('detailPanel');
  const oldSearch = document.getElementById('searchInput');
  const search = oldSearch.cloneNode(true);
  oldSearch.replaceWith(search);

  let activeCategory = 'all';
  let selectedName = tools[0].name;

  function escapeHtml(value) {
    return String(value).replace(/[&<>'"]/g, (char) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
    }[char]));
  }

  function iconUrl(tool) {
    return ICON_ROOT + encodeURIComponent(tool.icon || tool.name) + '.png';
  }

  function categoryLabel(key) {
    return categoryInfo[key] ? categoryInfo[key].label : key;
  }

  function filteredTools() {
    const query = search.value.trim().toLocaleLowerCase('zh-CN');
    return tools.filter((tool) => {
      const inCategory = activeCategory === 'all' || tool.category === activeCategory;
      const haystack = [tool.name, tool.desc, categoryLabel(tool.category)].concat(tool.tags).join(' ').toLocaleLowerCase('zh-CN');
      return inCategory && (!query || haystack.includes(query));
    });
  }

  function renderFilters() {
    const keys = Object.keys(categoryInfo);
    filterBar.innerHTML = ['all'].concat(keys).map((key) => {
      const label = key === 'all' ? '全部' : categoryLabel(key);
      const count = key === 'all' ? tools.length : tools.filter((tool) => tool.category === key).length;
      return `<button class="filter-btn${activeCategory === key ? ' active' : ''}" type="button" data-actual-category="${key}">${label}<span class="actual-filter-count">${count}</span></button>`;
    }).join('');

    filterBar.querySelectorAll('[data-actual-category]').forEach((button) => {
      button.addEventListener('click', () => {
        activeCategory = button.dataset.actualCategory;
        renderFilters();
        renderGrid();
      });
    });
  }

  function localDocUrl(tool) {
    const hasOverride = Object.prototype.hasOwnProperty.call(docFolderByTool, tool.name);
    const folder = hasOverride ? docFolderByTool[tool.name] : tool.name;
    if (!folder) return null;
    return `${DOC_ROOT}${encodeURIComponent(tool.category)}/${encodeURIComponent(folder)}/content.html`;
  }

  function readDocSections(documentNode, matchesHeading) {
    const items = [];
    Array.from(documentNode.querySelectorAll('h2')).filter((heading) => matchesHeading(heading.textContent.trim())).forEach((heading) => {
      let node = heading.nextElementSibling;
      while (node && node.tagName !== 'H2') {
        node.querySelectorAll('li').forEach((item) => {
          const text = item.textContent.replace(/\s+/g, ' ').trim();
          if (text && !items.includes(text)) items.push(text);
        });
        node = node.nextElementSibling;
      }
    });
    return items;
  }

  async function hydrateLocalGuide(tool) {
    const url = localDocUrl(tool);
    if (!url) return;
    try {
      const response = await fetch(url);
      if (!response.ok) return;
      const markup = await response.text();
      const documentNode = new DOMParser().parseFromString(markup, 'text/html');
      const features = readDocSections(documentNode, (heading) => /功能|参数说明|范围说明|路径规则|默认显示与输出|布光预设说明|批量主镜头识别/.test(heading));
      const steps = readDocSections(documentNode, (heading) => !/注意|建议/.test(heading) && /使用|窗口操作|拍屏|引用/.test(heading));
      const notes = readDocSections(documentNode, (heading) => /注意|建议/.test(heading));
      if (selectedName !== tool.name) return;
      const guide = detail.querySelector('.actual-guide-card');
      if (!guide) return;
      const featureList = guide.querySelector('[data-guide-features]');
      const stepList = guide.querySelector('[data-guide-steps]');
      const noteList = guide.querySelector('[data-guide-notes]');
      const status = guide.querySelector('[data-guide-status]');
      if (features.length) {
        featureList.innerHTML = features.map((item) => `<li>${escapeHtml(item)}</li>`).join('');
        featureList.hidden = false;
      }
      if (steps.length) stepList.innerHTML = steps.map((item) => `<li>${escapeHtml(item)}</li>`).join('');
      if (notes.length) noteList.innerHTML = notes.map((item) => `<li>${escapeHtml(item)}</li>`).join('');
      if (features.length || steps.length || notes.length) status.textContent = '已核对本地工具文档';
    } catch (error) {
      // 本地文档不存在时保留依据注册信息整理的说明。
    }
  }

  function renderDetail(tool) {
    const category = categoryInfo[tool.category];
    const usage = usageGuides[tool.name] || [
      `在 Bingo ToolBox 的${category.label}分类中打开该工具。`,
      '根据界面提示选择目标对象并设置参数。',
      '执行前保存场景，完成后检查结果。',
    ];
    const defaultNotes = [
      '执行前保存当前场景；批量处理或结构修改建议先复制一份文件。',
      '先用少量对象或较短帧范围测试，确认结果符合预期后再处理完整内容。',
    ];
    detail.innerHTML = `
      <div class="actual-detail">
        <button class="actual-detail-close" type="button" aria-label="关闭工具详情">×</button>
        <div class="actual-detail-head">
          <img src="${iconUrl(tool)}" alt="" onerror="this.src='https://bingtools.github.io/assets/bingo-icon.png'">
          <div>
            <span class="actual-category actual-category-${category.tone}">${escapeHtml(category.label)}</span>
            <h3>${escapeHtml(tool.name)}</h3>
          </div>
        </div>
        <div class="actual-detail-tags">${tool.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join('')}</div>
        <div class="actual-guide-card">
          <div class="actual-guide-status"><span></span><b data-guide-status>根据本地注册信息整理</b></div>
          <section class="actual-guide-section">
            <div class="actual-guide-label"><span>01</span>功能描述</div>
            <p>${escapeHtml(tool.desc)}</p>
            <ul class="actual-feature-list" data-guide-features hidden></ul>
          </section>
          <section class="actual-guide-section">
            <div class="actual-guide-label"><span>02</span>使用方法</div>
            <ol class="actual-detailed-steps" data-guide-steps>${usage.map((step) => `<li>${escapeHtml(step)}</li>`).join('')}</ol>
          </section>
          <section class="actual-guide-section actual-guide-notes">
            <div class="actual-guide-label"><span>03</span>注意事项</div>
            <ul data-guide-notes>${defaultNotes.map((note) => `<li>${escapeHtml(note)}</li>`).join('')}</ul>
          </section>
        </div>
        <details class="actual-source-details">
          <summary>本地来源与兼容信息</summary>
          <div class="actual-source-card">
            <div class="actual-source-status"><span></span>${escapeHtml(tool.sourceType || '本地工具箱已注册')}</div>
            <code>${escapeHtml(tool.sourcePath || (category.label + ' / ' + tool.file))}</code>
            <small>将随 Bingo ToolBox 安装包提供，无需单独下载。</small>
          </div>
          <div class="actual-compatibility">
            <span><b>版本</b> v${sourceInfo.version}</span>
            <span><b>Maya</b> ${escapeHtml(tool.maya || sourceInfo.maya)}</span>
          </div>
        </details>
      </div>`;
    hydrateLocalGuide(tool);
    detail.querySelector('.actual-detail-close').addEventListener('click', () => {
      detail.classList.remove('mobile-open');
    });
  }

  function renderGrid() {
    const visibleTools = filteredTools();
    document.getElementById('previewToolCount').textContent = visibleTools.length;

    if (!visibleTools.length) {
      grid.innerHTML = '<div class="actual-empty"><b>没有找到匹配工具</b><span>换一个关键词或分类试试</span></div>';
      detail.classList.remove('mobile-open');
      detail.innerHTML = '<div class="actual-empty-detail">当前没有可显示的工具详情</div>';
      return;
    }

    if (!visibleTools.some((tool) => tool.name === selectedName)) selectedName = visibleTools[0].name;
    grid.innerHTML = visibleTools.map((tool) => {
      const category = categoryInfo[tool.category];
      return `
        <button class="tool-card actual-tool-card${tool.name === selectedName ? ' selected' : ''}" type="button" data-actual-tool="${escapeHtml(tool.name)}">
          <img class="actual-tool-icon" src="${iconUrl(tool)}" alt="" onerror="this.src='https://bingtools.github.io/assets/bingo-icon.png'">
          <span class="actual-tool-copy">
            <span class="actual-card-top"><strong>${escapeHtml(tool.name)}</strong><em class="actual-category actual-category-${category.tone}">${escapeHtml(category.label)}</em></span>
            <span class="actual-tool-desc">${escapeHtml(tool.desc)}</span>
            <span class="actual-tool-tags">${tool.tags.map((tag) => `<i>${escapeHtml(tag)}</i>`).join('')}</span>
          </span>
        </button>`;
    }).join('');

    grid.querySelectorAll('[data-actual-tool]').forEach((card) => {
      card.addEventListener('click', () => {
        selectedName = card.dataset.actualTool;
        grid.querySelectorAll('.actual-tool-card').forEach((item) => item.classList.toggle('selected', item === card));
        renderDetail(tools.find((tool) => tool.name === selectedName));
        if (window.matchMedia('(max-width: 900px)').matches) detail.classList.add('mobile-open');
      });
    });

    renderDetail(tools.find((tool) => tool.name === selectedName));
  }

  search.addEventListener('input', renderGrid);
  try {
    renderFilters();
    renderGrid();
  } catch (error) {
    console.error('Bingo 工具列表渲染失败:', error);
  }

  window.BINGO_LOCAL_TOOL_PREVIEW = { tools, sourceInfo, categoryInfo };
})();

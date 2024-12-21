### 2024/12/7
router全部使用index.ts，不要使用js

```plaintext
前端项目结构（暂定）
InnoShare-Frontend/
├── public/                      # 公共资源目录
│   ├── index.html               # 应用入口 HTML 文件
│   ├── favicon.ico              # 网站图标
│   └── ...                      # 其他静态资源
├── src/                         # 项目源码目录
│   ├── assets/                  # 静态资源（图片、字体等）
│   │   ├── images/              # 图片文件
│   │   └── styles/              # 全局样式
│   │       ├── base.scss        # 基础样式
│   │       ├── variables.scss   # SCSS 变量
│   │       └── mixins.scss      # SCSS 混合样式
│   ├── components/              # 公共组件目录
│   │   ├── common/              # 基础组件（按钮、输入框等）
│   │   │   ├── Button.vue       # 通用按钮组件
│   │   │   └── Input.vue        # 通用输入框组件
│   │   ├── layout/              # 布局组件（导航栏、页脚等）
│   │   │   ├── Header.vue       # 页头组件
│   │   │   ├── Footer.vue       # 页脚组件
│   │   │   └── Sidebar.vue      # 侧边栏组件
│   │   └── modules/             # 业务模块组件（与页面对应）
│   │       ├── UserCard.vue     # 用户卡片组件（示例）
│   │       └── AchievementItem.vue # 成果条目组件（示例）
│   ├── views/                   # 页面视图目录
│   │   ├── Home.vue             # 首页
│   │   ├── Login.vue            # 登录页面
│   │   ├── Register.vue         # 注册页面
│   │   ├── AuthRequest.vue      # 认证申请页面
│   │   ├── UserDashboard.vue    # 用户个人中心
│   │   ├── AchievementList.vue  # 学术成果展示页面
│   │   ├── Search.vue           # 检索页面
│   │   ├── Recommendation.vue   # 推荐页面
│   │   └── AdminPanel.vue       # 管理员面板
│   ├── router/                  # 路由配置目录
│   │   └── index.js             # 路由配置文件
│   ├── store/                   # Vuex 状态管理
│   │   ├── index.js             # 主状态管理文件
│   │   ├── modules/             # Vuex 模块化管理
│   │   │   ├── user.js          # 用户相关状态
│   │   │   ├── auth.js          # 认证相关状态
│   │   │   ├── achievements.js  # 学术成果相关状态
│   │   │   ├── search.js        # 检索相关状态
│   │   │   └── admin.js         # 管理员管理相关状态
│   ├── services/                # API 请求服务
│   │   ├── api.js               # Axios 实例配置
│   │   ├── authService.js       # 认证相关 API
│   │   ├── userService.js       # 用户相关 API
│   │   ├── achievementService.js # 学术成果相关 API
│   │   ├── searchService.js     # 检索相关 API
│   │   └── adminService.js      # 管理员相关 API
│   ├── utils/                   # 工具函数目录
│   │   ├── validators.js        # 表单验证函数
│   │   ├── formatters.js        # 数据格式化函数
│   │   └── constants.js         # 常量
│   ├── App.vue                  # 根组件
│   └── main.js                  # 入口文件
├── .env                         # 环境变量配置
├── .gitignore                   # Git 忽略配置
├── babel.config.js              # Babel 配置
├── package.json                 # 项目依赖配置
└── vue.config.js                # Vue CLI 配置

```
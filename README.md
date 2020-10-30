# electron-vue

基于 vue-cli3 和 electron-build 搭建的桌面应用模版，UI 框架使用了 iview 最新版本，本意是熟悉一下 node 和 electron 的 api，目前各种功能持续开发中...

### node 版本要求

本地环境使用的是最新稳定版 v14.14.0，推荐 v11.15.0 以上。

### 项目安装启动

```bash
git clone https://github.com/pitchguy/vue-electron-template.git

cd electron-vue

yarn

electron:serve
```

-   √ Vue-cli3
-   [√ 配置多环境变量](#env)
-   [√ 开发环境去除 ESLint](#ESLint)
-   [√ electron 开发环境配置](#electron)
-   [√ iview 全局引入(可按需)](#iview)
-   [√ Less 全局样式](#Less)
-   [√ 配置 proxy 跨域](#proxy)
-   [√ 静态 static 文件设置](#CopyWebpackPlugin)

### 项目打包

```
yarn build
```

### 项目结构

```bash
├── assets
│   ├── css
│   │   ├── reset.less               # 全局重置样式
│   │   ├── theme.less               # iview主题覆盖css
│   │   └── var.less		         # 全局变量
│   ├── images						 # 图片文件
│   ├── js						     # 公用js文件
├── components						 # 项目公用组件
├── pages							 # 主要页面开发文件夹
├── router							 # 路由文件夹
├── utils							 # 工具类js
├── App.vue							 # 入口页
├── background.js					 # electron入口配置js
├── main.js							 # vue入口配置js文件
├── preload.js 						 # electron开启远程配置项
```

### <span id="pettier">✅ Eslint + Pettier 统一开发规范 </span>

VScode 安装 `eslint` `prettier` `vetur` 插件

在文件 `.prettierrc` 里写 属于你的 pettier 规则

```bash
{
   "printWidth": 120,
   "tabWidth": 2,
   "singleQuote": true,
   "trailingComma": "none",
   "semi": false,
   "wrap_line_length": 120,
   "wrap_attributes": "auto",
   "proseWrap": "always",
   "arrowParens": "avoid",
   "bracketSpacing": false,
   "jsxBracketSameLine": true,
   "useTabs": false,
   "overrides": [{
       "files": ".prettierrc",
       "options": {
           "parser": "json"
       }
   }]
}
```

Vscode setting.json 设置

```bash
    "[vue]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[javascript]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
     // 保存时用eslint格式化
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
    },
    // 两者会在格式化js时冲突，所以需要关闭默认js格式化程序
    "javascript.format.enable": false,
    "typescript.format.enable": false,
    "vetur.format.defaultFormatter.html": "none",
    // js/ts程序用eslint，防止vetur中的prettier与eslint格式化冲突
    "vetur.format.defaultFormatter.js": "none",
    "vetur.format.defaultFormatter.ts": "none",
```

[▲ 回顶部](#top)

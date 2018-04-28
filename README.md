# react-qq-music
> 🎼react全家桶重构 qq 音乐移动端

## 预览（请在手机上观看）

> 可能加载有点慢，服务器在国外🤣 ===> [QQ音乐🎵](http://shenzekun.cn/react-qq-music/build/index.html/)


## 说明

> 本项目是基于我的原生 js 项目[qq 音乐](https://github.com/shenzekun/QMusic)重构完成。

## 更多
> [vue全家桶+typescript重构qq音乐移动端](https://github.com/shenzekun/vue-qq-music)

## 安装方法

打开终端 ，输入：

```bash
git clone git@github.com:shenzekun/vue-qq-music.git
```

切换到克隆下来的文件夹：

```bash
cd vue-qq-music
```

然后输入：

```bash
yarn
```

然后运行

```bash
npm run dev
```

最后在浏览器中打开 http://localhost:8080/

## 项目结构

使用[see-dirtree](https://github.com/shenzekun/see-dirtree) 显示目录树

```
react-qq-music
├──LICENSE
├──README.md
├──package.json
├──yarn-error.log
├──yarn.lock
├──src
│  ├──index.js
│  ├──index.scss
│  ├──registerServiceWorker.js
│  ├──utils
│  │  ├──asyncComponent.jsx
│  │  └──utils.js
│  ├──style
│  │  ├──_var.scss
│  │  ├──reset.scss
│  │  └──utils.scss
│  ├──store
│  │  ├──store.js
│  │  ├──search
│  │  │  ├──action-type.js
│  │  │  ├──action.js
│  │  │  └──reducer.js
│  ├──route
│  │  └──index.js
│  ├──pages
│  │  ├──search
│  │  │  ├──search.jsx
│  │  │  └──search.scss
│  │  ├──recommend
│  │  │  ├──recommend.jsx
│  │  │  └──recommend.scss
│  │  ├──rank
│  │  │  ├──rank.jsx
│  │  │  └──rank.scss
│  │  ├──player
│  │  │  ├──player.jsx
│  │  │  └──player.scss
│  ├──config
│  │  ├──api.js
│  │  ├──server.js
│  │  └──utils.js
│  ├──components
│  │  ├──swiper
│  │  │  ├──swiper.jsx
│  │  │  └──swiper.scss
│  │  ├──loading
│  │  │  ├──loading.jsx
│  │  │  └──loading.scss
│  │  ├──header
│  │  │  ├──header.jsx
│  │  │  └──header.scss
│  ├──assets
│  │  ├──clock_ic.png
│  │  ├──default_pic.jpg
│  │  ├──icon_loading.png
│  │  ├──list_sprite.png
│  │  ├──loading.gif
│  │  ├──logo.png
│  │  ├──search_sprite.png
│  │  └──sprite_play.png
├──scripts
│  ├──start.js
│  └──test.js
├──public
│  ├──favicon.ico
│  ├──index.html
│  └──manifest.json
├──config
│  ├──env.js
│  ├──paths.js
│  ├──polyfills.js
│  ├──webpack.config.dev.js
│  ├──webpack.config.prod.js
│  ├──webpackDevServer.config.js
│  ├──jest
│  │  ├──cssTransform.js
│  │  └──fileTransform.js

22 directories, 56 files.
```


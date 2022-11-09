# RWR Mod 安装器

![license](https://badgen.net/github/license/Kreedzt/rwr-mod-installer)
![latest release](https://badgen.net/github/release/Kreedzt/rwr-mod-installer)
![commits count](https://badgen.net/github/commits/Kreedzt/rwr-mod-installer)
![last commit](https://badgen.net/github/last-commit/Kreedzt/rwr-mod-installer)
![rwr_version](https://badgen.net/badge/RWR/1.95/orange)

该工具通过对 Mod 进行结构文件规范, 使得安装 Mod 更有效便捷

## 快速上手

去 [Release](https://github.com/Kreedzt/rwr-mod-installer/releases) 页面下载最新的构建包, 双击使用即可

当前应用包含如下功能:

-   [x] Mod 打包
-   [x] Mod 安装

## 开发

该项目是基于 [tauri](https://tauri.app/) 进行创建的项目, 同时依赖以下 2 个语言环境:

-   [Nodejs](https://nodejs.org/en/)
-   [Rust](https://www.rust-lang.org/)

在安装好环境后, 本项目依赖 `pnpm` 进行前端包管理

1. 安装 `pnpm`

```bash
npm i -g pnpm
```

2. 使用 `pnpm` 安装前端依赖包

```bash
pnpm i
```

3. 启动开发环境

```
pnpm tauri dev
```

## 构建

参阅 [tauri](https://tauri.app/zh/v1/guides/building/) 文档, 使用如下命令构建:

```bash
pnpm tauri build
```

## 协议

-   [GPLv3](https://opensource.org/licenses/GPL-3.0)

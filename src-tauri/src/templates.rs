pub const TEMPLATE_README_MD: &str = r###"# Mod 名称

- 适配游戏版本: 1.95

> 引用: 此处填写引用内容

> 由 Kreedzt 封包

## 标题2

- 列表项1
- 列表项2"###;

pub const TEMPLATE_CHANGELOG_MD: &str = r###"## 改动说明

## 0.1.0

- Kreedzt: 初次使用 RWR Mod 安装器封包
"###;

pub const TEMPLATE_CONFIG_JSON: &str = r#"{
  "title": "Mod 标题",
  "description": "Mod 描述",
  "authors": [
    "Annoymous"
  ],
  "version": "0.1.0",
  "game_version": "1.95"
}"#;

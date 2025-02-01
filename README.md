# 小红书文案生成器

![Uploading image.png…]()

## 项目简介
本项目是一个基于 **Next.js** 和 **Groq API** 的 **小红书风格文案生成器**，支持生成 **产品文案** 和 **活动文案**，并提供可调节的 **字数要求** 和 **温度** 参数。

## 功能特性
- 📝 **产品/活动文案** 生成
- 📏 **字数可调** (130-300字)
- 🎚️ **温度调节** (控制生成内容的创造性)
- ⏳ **动态加载指示器** (防止用户重复点击)
- 📜 **格式化输出** (支持 Markdown, `<think>` 标签特殊样式)
- 🎨 **美观 UI 设计** (响应式布局 + CSS 样式优化)

## 技术栈
- **前端**: Next.js (React + Hooks)
- **后端 API**: Groq API (DeepSeek-R1 Model)
- **样式**: CSS Modules
- **部署**: Vercel

## 使用方法
### 1️⃣ 安装依赖
```sh
npm install
```

### 2️⃣ 运行本地开发环境
```sh
npm run dev
```
然后访问 `http://localhost:3000`

### 3️⃣ 部署到 Vercel
如果你还没有安装 Vercel CLI:
```sh
npm install -g vercel
```
然后运行：
```sh
vercel
```
按照提示进行部署。

## 目录结构
```
/your-project
  /pages
    index.js         # 主页 UI 逻辑
    /api
      generate.js    # Groq API 调用逻辑
  /styles
    Home.module.css  # 样式文件
  package.json       # 依赖与脚本
  README.md          # 本文件
```

## API 调用方式
本项目的 API 通过 **`/api/generate`** 提供文案生成功能。

**请求示例 (POST 请求)**:
```sh
curl -X POST "https://your-vercel-app.vercel.app/api/generate" \
     -H "Content-Type: application/json" \
     -d '{
           "type": "product",
           "product_name": "DJI Osmo Pocket 3",
           "product_description": "一款便携的云台相机",
           "word_count": 150,
           "temperature": 0.6
         }'
```

**返回示例**:
```json
{
  "text": "你的文案内容..."
}
```

## 贡献
欢迎提交 Issue 和 PR 来改进项目 🎉

## 许可证
MIT License


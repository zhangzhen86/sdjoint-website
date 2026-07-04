# 山东卓恩信息技术有限公司官网静态站点

这是一个可直接部署到 GitHub Pages 的公司介绍网站，内容面向山东卓恩信息技术有限公司的信息化建设、系统集成、机电施工与运维服务。

## 文件结构

- `index.html`：页面结构与中文占位文案
- `styles.css`：响应式样式
- `script.js`：移动端导航与年份
- `assets/hero-infrastructure.svg`：首页视觉资产
- `assets/sdjointlogo.jpg`：公司 Logo

## 本地预览

直接用浏览器打开 `index.html` 即可。也可以在当前目录运行：

```bash
python3 -m http.server 8000
```

然后访问 `http://localhost:8000`。

## 部署到 GitHub Pages

1. 将本目录提交并推送到 GitHub 仓库。
2. 在仓库设置中进入 `Pages`。
3. Source 选择 `Deploy from a branch`。
4. Branch 选择 `master` 或 `main`，目录选择 `/root`。
5. 保存后等待 GitHub 生成访问地址。

## 后续需要补充的内容

- 现场照片、项目照片、资质证书图片
- 更完整的代表项目介绍
- 合作品牌、资质荣誉、服务承诺

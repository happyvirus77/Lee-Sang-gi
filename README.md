# AI Digital Product Maker Portfolio

AI 기반 디지털 프로덕트 제작자 콘셉트의 React + Vite 포트폴리오 사이트입니다. 웹 개발, UI/UX 기획, AI 활용, 영상 제작, 마케팅 역량을 하나의 프리미엄 쇼케이스 형태로 구성했습니다.

## Tech Stack

- React
- Vite
- CSS
- GitHub Pages
- Vercel / Netlify 대응 설정

## Getting Started

```bash
npm install
npm run dev
```

브라우저에서 `http://127.0.0.1:5173/` 또는 Vite가 안내하는 주소로 접속합니다.

## Production Build

```bash
npm run build
npm run preview
```

## Deploy Links

- GitHub Pages: `https://YOUR_GITHUB_USERNAME.github.io/YOUR_REPOSITORY_NAME/`
- Vercel: `https://YOUR_PROJECT.vercel.app/`
- Netlify: `https://YOUR_PROJECT.netlify.app/`

## Folder Structure

```text
src/
  components/
    ProjectModal.jsx
    SectionHeader.jsx
  data/
    portfolioData.js
  hooks/
    useScrollEffects.js
  App.jsx
  App.css
  main.jsx
public/
  _redirects
  favicon.svg
  og-image.svg
  robots.txt
  sitemap.xml
```

## GitHub Pages Setup

1. `package.json`의 `homepage`를 본인 주소로 수정합니다.
2. `.env` 파일을 만들고 저장소 이름을 입력합니다.

```bash
VITE_GITHUB_REPOSITORY=YOUR_REPOSITORY_NAME
```

3. 배포합니다.

```bash
npm run deploy
```

## Git Upload Commands

```bash
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPOSITORY_NAME.git
git push -u origin main
```

## Vercel Deploy

1. GitHub에 코드를 push합니다.
2. Vercel에서 `Add New Project`를 클릭합니다.
3. GitHub 저장소를 선택합니다.
4. Framework Preset은 `Vite`로 둡니다.
5. Build Command는 `npm run build`, Output Directory는 `dist`로 설정합니다.
6. Deploy를 누릅니다.

`vercel.json`이 포함되어 있어 새로고침 시 404가 발생하지 않도록 SPA rewrite가 적용됩니다.

## Netlify Deploy

1. GitHub에 코드를 push합니다.
2. Netlify에서 `Add new site`를 클릭합니다.
3. GitHub 저장소를 선택합니다.
4. Build Command는 `npm run build`, Publish Directory는 `dist`로 설정합니다.
5. Deploy를 누릅니다.

`public/_redirects`가 포함되어 있어 SPA routing refresh 404를 방지합니다.

## Pre-deploy Checklist

- [ ] `npm install` 완료
- [ ] `npm run build` 성공
- [ ] 데스크톱/태블릿/모바일 반응형 확인
- [ ] 브라우저 Console error 확인
- [ ] 영상 자동재생, muted, loop 확인
- [ ] Lighthouse 성능/접근성/SEO 점검
- [ ] `homepage`, `robots.txt`, `sitemap.xml` 도메인 값 수정

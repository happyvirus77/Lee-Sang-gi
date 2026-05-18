# Deployment Guide

이 문서는 GitHub 업로드, GitHub Pages, Vercel, Netlify 배포를 처음 진행하는 사람도 따라 할 수 있도록 정리한 가이드입니다.

## 1. 배포 전 확인

```bash
npm install
npm run build
```

빌드가 성공하면 `dist/` 폴더가 생성됩니다. 이 폴더는 자동 생성 결과물이므로 Git에는 올리지 않습니다.

## 2. GitHub에 업로드

GitHub에서 새 저장소를 만든 뒤 아래 명령어를 실행합니다.

```bash
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPOSITORY_NAME.git
git push -u origin main
```

이미 Git 저장소가 있다면 `git init`과 `git remote add origin ...`은 생략하거나 기존 remote를 확인한 뒤 진행합니다.

## 3. GitHub Pages 배포

GitHub Pages는 Vite의 `base` 경로가 저장소 이름과 맞아야 합니다.

1. `.env` 파일을 프로젝트 루트에 만듭니다.
2. 아래 내용을 본인 저장소 이름으로 수정합니다.

```bash
VITE_GITHUB_REPOSITORY=YOUR_REPOSITORY_NAME
```

3. `package.json`의 `homepage`도 본인 주소로 수정합니다.

```json
"homepage": "https://YOUR_GITHUB_USERNAME.github.io/YOUR_REPOSITORY_NAME/"
```

4. 배포합니다.

```bash
npm run deploy
```

5. GitHub 저장소의 `Settings > Pages`에서 `gh-pages` 브랜치가 배포 소스로 잡혀 있는지 확인합니다.

## 4. Vercel 배포

1. 코드를 GitHub에 push합니다.
2. Vercel에 로그인합니다.
3. `Add New Project`를 클릭합니다.
4. GitHub 저장소를 선택합니다.
5. 설정은 아래처럼 둡니다.

```text
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

6. `Deploy`를 클릭합니다.

`vercel.json`이 포함되어 있어 새로고침 시 `404`가 나지 않도록 `/index.html`로 rewrite됩니다.

## 5. Netlify 배포

1. 코드를 GitHub에 push합니다.
2. Netlify에 로그인합니다.
3. `Add new site > Import an existing project`를 선택합니다.
4. GitHub 저장소를 선택합니다.
5. 설정은 아래처럼 둡니다.

```text
Build command: npm run build
Publish directory: dist
```

6. `Deploy site`를 클릭합니다.

`public/_redirects`가 포함되어 있어 SPA 새로고침 `404` 문제가 방지됩니다.

## 6. SEO 수정 포인트

배포 전 아래 파일에서 임시 값을 실제 도메인으로 바꿔주세요.

- `public/robots.txt`
- `public/sitemap.xml`
- `index.html`의 Open Graph URL 관련 값이 필요하면 추가
- `README.md`의 배포 링크 영역

## 7. 운영 전 체크리스트

- [ ] `npm run build` 성공
- [ ] 모바일, 태블릿, 데스크톱 레이아웃 확인
- [ ] 브라우저 콘솔 에러 확인
- [ ] 프로젝트 영상 자동재생 확인
- [ ] Contact 폼 UI 확인
- [ ] Lighthouse Performance / Accessibility / Best Practices / SEO 점검
- [ ] 실제 배포 URL로 Open Graph 미리보기 확인

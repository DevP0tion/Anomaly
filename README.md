# Anomaly

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Svelte](https://img.shields.io/badge/Svelte-5.39.11-FF3E00?logo=svelte&logoColor=white)](https://svelte.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

SvelteKit으로 구축된 Discord 액티비티로, 림버스 컴퍼니 거울 던전을 모티브로 1인 던전 탐험 컨셉으로 만들고 있습니다.

## 🎮 주요 기능

- **Discord 통합**: 사용자 인증 및 소셜 기능을 위한 원활한 Discord SDK 통합
- **게임 메커니즘**: 
  - [ ] 일반 모험 - 1인 탐험 컨셉 기본 게임 모드
  - [ ] 평행중첩 - 보스 전투에서 다른 유저와 전투하는 로그라이트 PvP 컨텐츠
  - [ ] 익스트림 - 특수 보상 & 업적을 위한 보스 도전형 컨텐츠
  - [ ] 굴절철도 - 다른 유저와 협동하는 보스러시 컨텐츠
- **다국어 지원**: 한국어 및 영어 로케일을 통한 국제화(sveltekit-i18n)
  - 언어 번들은 src/lib/client/locales 폴더를 참고바랍니다.
- **실시간 통신**: 실시간 상호작용을 위한 Socket.io 통합
- **데이터베이스 통합**: 견고한 데이터 관리를 위한 MySQL 데이터베이스
- **반응형 디자인**: Bootstrap 기반 반응형 UI

## 🚀 빠른 시작

### 사전 요구사항

- Node.js (v18 이상)
- MySQL 데이터베이스
- Discord 애플리케이션 (Discord SDK용)
- Cloudflare Tunnel (선택사항, 배포용)

### 설치

1. **저장소 클론**
   ```bash
   git clone https://github.com/yourusername/abnormalities.git
   cd abnormalities
   ```

2. **의존성 설치**
   ```bash
   npm install
   ```

3. **환경 변수 설정**
   ```bash
   cp .example.env .env
   ```
   
   `.env` 파일을 설정에 맞게 편집:
   ```env
   # Discord 설정
   DISCORD_CLIENT_ID=your_discord_client_id
   DISCORD_CLIENT_SECRET=your_discord_client_secret
   
   # 데이터베이스 설정
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_NAME=abnormalities
   ```

4. **Cloudflare Tunnel 설정 (선택사항)**
   ```bash
   cp config.example.yml config.yml
   ```
   
   터널 설정에 맞게 `config.yml` 업데이트.

5. **개발 서버 시작**
   ```bash
   npm run dev
   ```

   `http://localhost:3000`을 방문하여 애플리케이션을 확인하세요.

## 🏗️ 프로젝트 구조

```
abnormalities/
├── src/
│   ├── lib/
│   │   ├── client/           # 클라이언트 측 유틸리티
│   │   │   ├── discord.ts    # Discord SDK 통합
│   │   │   ├── translation.ts # 지역화
│   │   │   └── game/         # 게임 메커니즘
│   │   ├── server/           # 서버 측 유틸리티
│   │   │   ├── db.ts         # 데이터베이스 연결
│   │   │   └── game/         # 서버 측 게임 로직
│   │   └── util/             # 공유 유틸리티
│   │       └── math.ts       # 수학 함수
│   ├── routes/
│   │   ├── game/
│   │   │   ├── exploration/  # 디스코드 서버 전용 탐험 맵? 페이지
│   │   │   ├── field/        # 모험 페이지
│   │   │   └── shelter/      # 자원 관리 및 준비 페이지
│   │   └── api/              # API 엔드포인트
│   └── app.html              # 메인 HTML 템플릿
├── static/                   # 정적 자산
└── socket/                   # Socket.io 서버 (별도 Deno 프로젝트)
```

## 🛠️ 개발

### 사용 가능한 스크립트

- `npm run dev` - 포트 3000에서 개발 서버 시작
- `npm run build` - 프로덕션용 빌드
- `npm run preview` - 프로덕션 빌드 미리보기
- `npm run check` - TypeScript 및 Svelte 검사 실행
- `npm run serve` - Cloudflare Tunnel을 사용한 배포

### 기술 스택

- **프론트엔드**: SvelteKit 2.46.4, Svelte 5.39.11
- **스타일링**: Bootstrap 5 (Sveltestrap 통해), Sass
- **백엔드**: SvelteKit API 라우트를 사용한 Node.js
- **데이터베이스**: mysql2 드라이버를 사용한 MySQL 2
- **실시간**: Socket.io
- **Discord**: Discord Embedded App SDK
- **배포**: Cloudflare Tunnel
- **로깅**: 일일 로테이션을 사용한 Winston

## 🌍 국제화

애플리케이션은 다음 언어를 지원합니다:
- 영어 (`en`)
- 한국어 (`ko`)

언어 파일은 `src/lib/client/locales/`에 위치합니다.

## 📡 Discord 통합

이 애플리케이션은 Discord Activity로 작동하도록 설계되었으며, Discord Embedded App SDK를 활용하여 다음을 제공합니다:
- 사용자 인증

## 🚀 배포

### Cloudflare Tunnel 사용

1. `config.yml` 파일 설정
2. 배포 스크립트 실행:
   ```bash
   npm run serve
   ```

### 수동 배포

1. 애플리케이션 빌드:
   ```bash
   npm run build
   ```

2. `build/` 디렉토리를 호스팅 제공업체에 배포

## 🤝 기여하기

1. 저장소를 포크하세요
2. 기능 브랜치를 생성하세요 (`git checkout -b feature/amazing-feature`)
3. 변경사항을 커밋하세요 (`git commit -m 'Add some amazing feature'`)
4. 브랜치에 푸시하세요 (`git push origin feature/amazing-feature`)
5. Pull Request를 열어주세요

## 📝 라이선스

이 프로젝트는 MIT 라이선스 하에 라이선스됩니다 - 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

## 🐛 이슈

문제를 발견하거나 제안사항이 있으시면 GitHub에서 [이슈를 열어주세요](https://github.com/yourusername/abnormalities/issues).

## 📞 지원

지원 및 질문사항:
- GitHub에서 이슈 생성
- Discord 커뮤니티 참여 (사용 가능한 경우)

---

**참고**: 이 프로젝트는 현재 활발하게 개발 중입니다. 기능과 API가 자주 변경될 수 있습니다.
// =====================================================================
// 텍스트 설정 파일 (이곳의 글자만 수정하시면 사이트에 반영됩니다!)
// =====================================================================

const PORTFOLIO_DATA = {
    // 0. 사이트 공통
    site: {
        logo: "신태선." // 좌측 상단 로고
    },

    // 1. 메인 화면(Hero) 텍스트
    hero: {
        greeting: "Hello, I'm 신태선 👋",
        title: "생동감 넘치는 움직임을<br><span class='gradient-text'>만들어내는</span> 3D 애니메이터.",
        subtitle: "2014년부터 현재까지, 끊임없이 연구하며 캐릭터에 생명력을 불어넣는 작업을 하고 있습니다."
    },

    // 2. 내 소개(About) 텍스트
    about: {
        name: "신태선",
        birthYear: "1990년생",
        description: "저는 2014년부터 애니메이션 업계에서 경력을 쌓아온 10년 차 이상의 3D 애니메이터입니다. 디테일한 움직임과 감정 표현을 통해 매력적인 캐릭터를 완성하는 것을 사랑합니다."
    },

    // 3. 포트폴리오 영상 프로젝트
    // - 유튜브(YouTube) 또는 비메오(Vimeo) 영상 주소를 videoUrl에 복사해 넣으시면 웹사이트에서 바로 영상이 재생됩니다!
    projects: [
        {
            title: "2026 캐릭터 애니메이션 쇼릴(Showreel)",
            description: "가장 최근에 작업한 AAA급 액션 RPG 게임 및 시네마틱 애니메이션 모음입니다.",
            // 유튜브 주소 예시 (인터넷 주소창의 링크를 그대로 넣으세요)
            videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        },
        {
            title: "시네마틱 컷씬 - 대규모 전투",
            description: "모션 캡처 데이터 정제 및 키프레임 애니메이션을 혼합하여 연출한 시네마틱 씬입니다.",
            // 비메오 주소 예시
            videoUrl: "https://vimeo.com/148751763"
        },
        {
            title: "창작 단편 애니메이션",
            description: "기획, 리깅, 애니메이팅까지 모든 과정을 직접 1인 제작으로 완성한 창작 단편 작품입니다.",
            videoUrl: "https://www.youtube.com/watch?v=jNQXAC9IVRw"
        }
    ]
};

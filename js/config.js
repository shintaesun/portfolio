// =====================================================================
// 텍스트 설정 파일 (이곳의 글자만 수정하시면 사이트에 반영됩니다!)
// =====================================================================

const PORTFOLIO_DATA = {
    // 0. 사이트 공통
    site: {
        logo: "S" // 좌측 상단 로고 (1글자 권장)
    },

    // 1. 메인 화면(Hero) 텍스트
    hero: {
        greeting: "신태선 · Senior 3D Animator",
        // 문구가 너무 길면 어색할 수 있어 2줄로 간결하게 수정했습니다.
        title: "움직임에 생명을.<br><span class='gradient-text'>장면에 이야기를.</span>",
        subtitle: "캐릭터의 감정부터 장면의 리듬까지.<br>이야기에 어울리는 움직임을 만듭니다."
    },

    // 2. 내 소개(About) 텍스트
    about: {
        name: "신태선",
        birthYear: "1990년생",
        description: "<strong>자연스러운 움직임을 넘어,<br>장면에 필요한 연기를 만듭니다.</strong><br><br>12년 차 애니메이터로서 쌓아온 경험으로 연출 의도와 앞뒤 장면의 맥락을 읽고, 캐릭터에 맞는 리듬을 찾아냅니다.<br><br>팀의 작업 흐름을 함께 조율하며 완성도 있는 결과를 만드는 시니어 애니메이터입니다."
    },

    // 3. 포트폴리오 영상 프로젝트 (첫 번째 쇼릴 영상 삭제 완료)
    projects: [
        {
            title: "Animation Portfolio",
            description: "첫 단편영화 제작 작업입니다. 캐릭터의 움직임과 장면의 흐름을 통해 이야기를 전하는 작품입니다.",
            videoUrl: "https://youtu.be/k8Fo8Ur8ZTE"
        },
        {
            title: "Animation Portfolio",
            description: "주요 게임 시네마틱 및 캐릭터 애니메이션 작업물 모음입니다.",
            videoUrl: "https://youtu.be/bvdrne2KpY0"
        },
        {
            title: "Animation Portfolio",
            description: "차량 및 제품·상품 소개 영상 작업물 모음입니다.",
            videoUrl: "https://youtu.be/lRzlDQyRKyU"
        }
    ],

    // 4. 연락처(Contact) 정보
    contact: {
        message: "새로운 프로젝트 제안이나 애니메이션 작업 문의가 있으시다면 언제든 편하게 연락주세요!",
        email: "shintaesun00@gmail.com",
        phone: "+82 10-7262-2623"
    }
};

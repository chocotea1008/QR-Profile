const params = new URLSearchParams(window.location.search);
const encodedPayload = params.get("profile");
const root = document.documentElement;

const utilityBar = document.getElementById("utility-bar");
const themePickerWrapper = document.getElementById("theme-picker-wrapper");
const themePicker = document.getElementById("theme-picker");
const mbtiBtn = document.getElementById("mbti-info-btn");
const mbtiTooltip = document.getElementById("mbti-tooltip");

const STORAGE_KEYS = {
    theme: "snapshot-theme"
};

const safeStorage = {
    get(key) {
        try {
            return localStorage.getItem(key);
        } catch (error) {
            console.warn("Storage read blocked", error);
            return null;
        }
    },
    set(key, value) {
        try {
            localStorage.setItem(key, value);
        } catch (error) {
            console.warn("Storage write blocked", error);
        }
    }
};

const THEMES = [
    {
        id: "aurora",
        name: "오로라 드리프트",
        gradient: "radial-gradient(circle at 20% 10%, rgba(72,210,255,0.45), transparent 60%), radial-gradient(circle at 80% 0%, rgba(255,115,190,0.35), transparent 55%)",
        background: "#030714",
        card: "rgba(10,16,33,0.9)",
        accent: "#8bf3ff",
        accentStrong: "#5debd7",
        border: "rgba(141,233,255,0.35)",
        chipBg: "rgba(93,235,215,0.2)",
        chipBorder: "rgba(93,235,215,0.45)",
        text: "#e4fbff"
    },
    {
        id: "neoMint",
        name: "네오 민트웨이브",
        gradient: "radial-gradient(circle at 15% 30%, rgba(52,211,153,0.45), transparent 55%), radial-gradient(circle at 70% 5%, rgba(110,231,183,0.3), transparent 60%)",
        background: "#041912",
        card: "rgba(6,24,18,0.92)",
        accent: "#7ef2c8",
        accentStrong: "#44e1a3",
        border: "rgba(126,242,200,0.35)",
        chipBg: "rgba(68,225,163,0.18)",
        chipBorder: "rgba(68,225,163,0.45)",
        text: "#dcfff1"
    },
    {
        id: "solarInk",
        name: "솔라 잉크",
        gradient: "radial-gradient(circle at 15% 0%, rgba(255,196,107,0.4), transparent 55%), radial-gradient(circle at 80% 20%, rgba(118,75,255,0.35), transparent 55%)",
        background: "#1c1233",
        card: "rgba(24,9,42,0.9)",
        accent: "#ffd166",
        accentStrong: "#ffba08",
        border: "rgba(255,209,102,0.35)",
        chipBg: "rgba(255,186,8,0.2)",
        chipBorder: "rgba(255,209,102,0.45)",
        text: "#fff7df"
    },
    {
        id: "blushTide",
        name: "블러시 타이드",
        gradient: "radial-gradient(circle at 10% 15%, rgba(255,149,178,0.4), transparent 55%), radial-gradient(circle at 70% 30%, rgba(118,169,255,0.35), transparent 55%)",
        background: "#351225",
        card: "rgba(44,14,34,0.92)",
        accent: "#ff89c0",
        accentStrong: "#ff5c8d",
        border: "rgba(255,137,192,0.4)",
        chipBg: "rgba(255,92,141,0.2)",
        chipBorder: "rgba(255,92,141,0.45)",
        text: "#ffeaf2"
    },
    {
        id: "cyberLime",
        name: "사이버 라임",
        gradient: "radial-gradient(circle at 20% 15%, rgba(208,255,84,0.5), transparent 55%), radial-gradient(circle at 80% 25%, rgba(76,201,240,0.35), transparent 55%)",
        background: "#051104",
        card: "rgba(7,25,10,0.92)",
        accent: "#d6ff5c",
        accentStrong: "#b5ff2f",
        border: "rgba(214,255,92,0.4)",
        chipBg: "rgba(181,255,47,0.18)",
        chipBorder: "rgba(181,255,47,0.45)",
        text: "#edffda"
    },
    {
        id: "velvetDawn",
        name: "벨벳 새벽",
        gradient: "radial-gradient(circle at 20% 10%, rgba(255,138,92,0.35), transparent 55%), radial-gradient(circle at 80% 0%, rgba(137,110,255,0.4), transparent 55%)",
        background: "#1a122a",
        card: "rgba(26,16,44,0.92)",
        accent: "#c7a0ff",
        accentStrong: "#e3b8ff",
        border: "rgba(199,160,255,0.4)",
        chipBg: "rgba(195,148,255,0.2)",
        chipBorder: "rgba(195,148,255,0.45)",
        text: "#f6ecff"
    },
    {
        id: "glacier",
        name: "글래시어 글라스",
        gradient: "radial-gradient(circle at 25% 10%, rgba(125,211,252,0.45), transparent 60%), radial-gradient(circle at 80% 30%, rgba(59,130,246,0.35), transparent 55%)",
        background: "#021527",
        card: "rgba(6,24,38,0.9)",
        accent: "#8cd5ff",
        accentStrong: "#5fb4ff",
        border: "rgba(143,213,255,0.4)",
        chipBg: "rgba(95,180,255,0.2)",
        chipBorder: "rgba(95,180,255,0.45)",
        text: "#e6f5ff"
    },
    {
        id: "sandstone",
        name: "샌드스톤 글로우",
        gradient: "radial-gradient(circle at 10% 20%, rgba(255,186,122,0.4), transparent 60%), radial-gradient(circle at 80% 60%, rgba(255,236,179,0.3), transparent 60%)",
        background: "#1f1208",
        card: "rgba(39,20,9,0.92)",
        accent: "#ff9f45",
        accentStrong: "#ffbd66",
        border: "rgba(255,159,69,0.4)",
        chipBg: "rgba(255,189,102,0.2)",
        chipBorder: "rgba(255,159,69,0.45)",
        text: "#fff3e4"
    },
    {
        id: "midnightBerry",
        name: "미드나잇 베리",
        gradient: "radial-gradient(circle at 15% 5%, rgba(255,118,191,0.4), transparent 55%), radial-gradient(circle at 80% 30%, rgba(157,92,255,0.35), transparent 55%)",
        background: "#140111",
        card: "rgba(32,6,33,0.92)",
        accent: "#ff76bf",
        accentStrong: "#ff54a7",
        border: "rgba(255,118,191,0.4)",
        chipBg: "rgba(255,84,167,0.2)",
        chipBorder: "rgba(255,84,167,0.45)",
        text: "#ffe4f5"
    },
    {
        id: "forestPulse",
        name: "포레스트 펄스",
        gradient: "radial-gradient(circle at 20% 5%, rgba(43,255,173,0.4), transparent 55%), radial-gradient(circle at 85% 35%, rgba(0,173,181,0.35), transparent 60%)",
        background: "#03130c",
        card: "rgba(8,34,24,0.92)",
        accent: "#1ee3c7",
        accentStrong: "#07cba4",
        border: "rgba(30,227,199,0.4)",
        chipBg: "rgba(7,203,164,0.2)",
        chipBorder: "rgba(7,203,164,0.45)",
        text: "#e4fff7"
    }
];

const MBTI_SUMMARIES = {
    ENTP: "도전을 즐기며, 새로운 관점을 실험하고 토론으로 해답을 찾는 혁신형 탐험가예요.",
    ENFP: "열정과 공감을 무기로 다채로운 가능성을 엮어내는 아이디어 큐레이터예요.",
    ENTJ: "목표를 명확히 세우고 시스템을 설계해 실행력을 끌어올리는 전략가예요.",
    INTJ: "장기적인 비전을 현실 계획으로 바꾸는 통찰형 설계자예요.",
    INTP: "호기심으로 가설을 세우고 논리로 구조를 세밀하게 다지는 분석가예요.",
    INFJ: "사람과 의미를 잇는 스토리텔러로, 조용하지만 강한 추진력을 지녔어요.",
    ISTJ: "신뢰를 중시하며 체계와 정확도를 통해 안정적인 결과를 만들어내요.",
    ISFP: "감각적인 디테일을 살려 경험을 따뜻하게 디자인하는 감성 메이커예요.",
    ESTJ: "명확한 기준과 빠른 의사결정으로 팀을 굳건히 이끄는 오케스트레이터예요.",
    ESTP: "상황 판단이 빠르고 실행력으로 변화를 즐기는 현장형 액티베이터예요."
};

const defaultProfile = {
    nm: "홍길동",
    mj: "Interactive Media Design",
    st: "20251234",
    mbti: "ENTP",
    kw: ["Generative Art", "UX", "Frontend"],
    em: "hong@example.com",
    gh: "https://github.com/hongclub",
    desc: "낯선 아이디어를 시각화하는 인터랙티브 메이커",
    theme: "aurora"
};

THEMES.forEach(theme => {
    const option = document.createElement("option");
    option.value = theme.id;
    option.textContent = theme.name;
    themePicker.appendChild(option);
});

const applyTheme = themeId => {
    const theme = THEMES.find(item => item.id === themeId) || THEMES[0];
    root.style.setProperty("--page-gradient", theme.gradient);
    root.style.setProperty("--page-bg", theme.background);
    root.style.setProperty("--card-bg", theme.card);
    root.style.setProperty("--accent", theme.accent);
    root.style.setProperty("--accent-strong", theme.accentStrong);
    root.style.setProperty("--border", theme.border);
    root.style.setProperty("--chip-bg", theme.chipBg);
    root.style.setProperty("--chip-border", theme.chipBorder);
    root.style.setProperty("--page-color", theme.text);
    themePicker.value = theme.id;
    safeStorage.set(STORAGE_KEYS.theme, theme.id);
    return theme.id;
};

const parseProfile = () => {
    if (!encodedPayload) {
        return defaultProfile;
    }

    try {
        const decoded = decodeURIComponent(encodedPayload);
        const parsed = JSON.parse(decoded);
        return { ...defaultProfile, ...parsed };
    } catch (error) {
        console.error("Failed to parse profile", error);
        return defaultProfile;
    }
};

const profile = parseProfile();
const storedTheme = safeStorage.get(STORAGE_KEYS.theme);
const initialThemeId = profile.theme || storedTheme || THEMES[0].id;

applyTheme(initialThemeId);

if (!encodedPayload) {
    themePickerWrapper.hidden = false;
    utilityBar.hidden = false;
    themePicker.addEventListener("change", event => {
        applyTheme(event.target.value);
    });
} else {
    themePickerWrapper.hidden = true;
    utilityBar.hidden = true;
}

document.getElementById("profile-name").textContent = profile.nm || defaultProfile.nm;
document.getElementById("profile-major").textContent = profile.mj || "전공 정보 없음";
document.getElementById("profile-id").textContent = profile.st ? `#${profile.st}` : "";
document.getElementById("profile-mbti").textContent = profile.mbti || "-";
document.getElementById("profile-desc").textContent = profile.desc || "설명을 입력해주세요";

const keywordRoot = document.getElementById("profile-keywords");
keywordRoot.textContent = "";

const normalizeKeywords = value => {
    if (!value) return [];
    if (Array.isArray(value)) return value;
    if (typeof value === "string") {
        return value
            .split(/[,-]/)
            .map(token => token.trim())
            .filter(Boolean);
    }
    return [];
};

const keywords = normalizeKeywords(profile.kw);

if (keywords.length === 0) {
    keywordRoot.textContent = "키워드 없음";
} else {
    keywords.forEach(word => {
        const chip = document.createElement("span");
        chip.textContent = word;
        keywordRoot.appendChild(chip);
    });
}

const emailEl = document.getElementById("profile-email");
if (profile.em) {
    const anchor = document.createElement("a");
    anchor.href = `mailto:${profile.em}`;
    anchor.textContent = profile.em;
    emailEl.replaceChildren(anchor);
} else {
    emailEl.textContent = "이메일 없음";
}

const githubEl = document.getElementById("profile-github");
if (profile.gh) {
    const anchor = document.createElement("a");
    anchor.href = profile.gh;
    anchor.target = "_blank";
    anchor.rel = "noreferrer";
    anchor.textContent = profile.gh.replace(/^https?:\/\//, "");
    githubEl.replaceChildren(anchor);
} else {
    githubEl.textContent = "깃허브 링크 없음";
}

const updateMbtiInfo = code => {
    const normalized = (code || "").toUpperCase();
    if (!normalized) {
        mbtiBtn.disabled = true;
        mbtiTooltip.classList.remove("visible");
        mbtiTooltip.textContent = "MBTI 코드가 입력되면 설명을 보여드릴게요.";
        return;
    }
    mbtiBtn.disabled = false;
    mbtiTooltip.textContent = MBTI_SUMMARIES[normalized] || "등록되지 않은 MBTI 코드예요.";
};

updateMbtiInfo(profile.mbti);

mbtiBtn.addEventListener("click", () => {
    if (mbtiBtn.disabled) return;
    mbtiTooltip.classList.toggle("visible");
});

document.addEventListener("click", event => {
    if (!mbtiTooltip.contains(event.target) && event.target !== mbtiBtn) {
        mbtiTooltip.classList.remove("visible");
    }
});

/* ─────────────────────────────────────────────────────────────
   모든 팀의 수치를 이 파일 한 곳에서 관리합니다.
   숫자만 고치면 사이트 전체가 바뀝니다.

   sample: true  → 아직 실제 값을 못 받은 항목 (화면에 "샘플" 표시가 붙음)
   sample: false → 2026년 8월 PDF에서 확인한 실측값
   실제 수치를 채우면 sample 을 false 로 바꿔주세요.
   ───────────────────────────────────────────────────────────── */

const DATA = {

  meta: { period: "2026년 8월", updated: "2026-09-03" },

  /* ═══════════ [1] 아카데미 ═══════════ */
  academy: {
    revenue:     { v: "9.8억",     goal: "12억", rate: 82, note: "목표 대비 −2.2억", dir: "dn", sample: true },
    unitPrice:   { v: "172만",     note: "1인 결제 평균",        sample: true },
    roas:        { v: "417%",      note: "매출 9.8억 / 광고비 2.35억", sample: true },
    refundRate:  { v: "4.2%",      note: "결제 대비 환불",       sample: true },

    /* 초자립 일 판매건수 — 1·2차 라이브 구간에 스파이크 */
    dailySales: {
      total: 571, avg: 18.4, peak: 71, peakDay: "8/27",
      sample: true,
      series: [8,6,9,7,11,14,9,7,6,8,12,38,64,52,21,13,9,7,8,10,9,7,11,14,10,26,71,58,24,13,9]
    },

    /* 마케팅 현황 — 채널별 발행량 / 유입량 / 전환수(신청 리드) */
    channels: [
      { name: "메타 광고",     posts: 33,  visits: 214000, leads: 16327, leadsReal: true, postsReal: true },
      { name: "유튜브",        posts: 14,  visits: 42700,  leads: 388 },
      { name: "인스타그램",    posts: 48,  visits: 26300,  leads: 176 },
      { name: "블로그",        posts: 62,  visits: 18400,  leads: 214 },
      { name: "네이버 검색광고", posts: 0,  visits: 9800,   leads: 421 },
      { name: "카페·커뮤니티",  posts: 27,  visits: 6200,   leads: 98 }
    ],
    channelsSample: true,

    /* 광고 소재 — PDF 실측 */
    creative: {
      made: 33, winning: 7, winRate: 21.2,
      leads: 16327, perCreative: 495, cpl: 14406, adSpend: "2.35억",
      sample: false
    },

    reviews: { count: 1284, score: 4.7, sample: true },

    /* 초자립 성공 고객 (기준: 매출 1천만원 / 2배 달성) */
    success: {
      tenM: 87, double: 41, students: 1642,
      sample: true
    },

    monthly: {
      sample: true,
      series: [{ label: "3월", v: 6.1 }, { label: "4월", v: 7.4 }, { label: "5월", v: 6.8 },
               { label: "6월", v: 8.2 }, { label: "7월", v: 9.1 }, { label: "8월", v: 9.8 }]
    }
  },

  /* ═══════════ [2] 대행 마케팅파트 ═══════════ */
  agencyMarketing: {
    sampleAll: true,
    members:    { v: "7명",     note: "AE 4 · 디자이너 2 · 리더 1" },
    revenue:    { v: "1.42억",  note: "인당 2,029만" },
    clients:    { v: "23개사",  note: "전월 21개사" },
    newClients: { v: "4개사",   note: "이번달 신규" },
    lostClients:{ v: "2개사",   note: "이번달 해지" },
    netChange:  { v: "+2개사",  note: "신규 4 − 해지 2" },
    unitPrice:  { v: "617만",   note: "월 평균 객단가" },
    churnRate:  { v: "8.7%",    note: "해지 2 / 23개사" },
    adSpend:    { v: "4.8억",   note: "고객사 광고비 집행 대행" },
    roas:       { v: "382%",    note: "고객사 평균 광고 효율" },
    creative:   { made: 128, winning: 24, winRate: 18.8 },

    monthly: [{ label: "3월", v: 9800 }, { label: "4월", v: 11200 }, { label: "5월", v: 10600 },
              { label: "6월", v: 12400 }, { label: "7월", v: 13100 }, { label: "8월", v: 14200 }],
    monthlyGoal: 15000,

    clientFlow: [{ label: "3월", v: 18 }, { label: "4월", v: 19 }, { label: "5월", v: 19 },
                 { label: "6월", v: 20 }, { label: "7월", v: 21 }, { label: "8월", v: 23 }],

    tasks: [
      { label: "리포트 자동화 템플릿 구축",  pct: 72, note: "9월 2주차 완료 목표" },
      { label: "소재 A/B 테스트 프로세스화", pct: 88, note: "가이드 문서 검수 단계" },
      { label: "신규 업종(병원) 세일즈 덱",  pct: 45, note: "케이스 스터디 3건 수집 중" },
      { label: "고객사 온보딩 문서화",       pct: 30, note: "착수 단계" }
    ]
  },

  /* ═══════════ [3] 대행팀 유튜브파트 ═══════════ */
  agencyYoutube: {
    sampleAll: true,
    members:    { v: "5명",     note: "PD 3 · 편집 1 · 리더 1" },
    revenue:    { v: "8,600만", note: "인당 1,720만" },
    clients:    { v: "12개사",  note: "전월 11개사" },
    unitPrice:  { v: "717만",   note: "월 평균 객단가" },
    retention:  { v: "9.4개월", note: "평균 유지 기간" },
    ltv:        { v: "6,740만", note: "객단가 × 유지개월" },
    newClients: { v: "2개사",   note: "이번달 신규" },
    lostClients:{ v: "1개사",   note: "이번달 해지" },
    inquiryRate:{ v: "0.09%",   note: "조회수 109만 → 문의 982건" },
    inquiries:  { v: "982건",   note: "이번달 유입 문의" },

    channels: [
      { name: "최용희TV",     views: 412000 },
      { name: "조성구",       views: 218400 },
      { name: "이상한마케팅", views: 156200 },
      { name: "닥터윤",       views: 98700 },
      { name: "김대표",       views: 62400 },
      { name: "기타 7개 채널", views: 143800 }
    ],

    monthly: [{ label: "3월", v: 6200 }, { label: "4월", v: 6800 }, { label: "5월", v: 7100 },
              { label: "6월", v: 7600 }, { label: "7월", v: 8100 }, { label: "8월", v: 8600 }],
    monthlyGoal: 9000,

    wins: [
      "<b>최용희 TV 출연</b> — 지상파 노출 이후 채널 유입 급증",
      "<b>조성구 20만 조회</b> 터짐 — 단일 영상 최고 기록",
      "썸네일 A/B 테스트 도입 후 평균 CTR 개선"
    ],
    tries: [
      "<b>다이소 물품 구매</b> — 소품 예산 절감 실험",
      "<b>크루 최적화</b> — 촬영·편집 인력 배치 재설계",
      "쇼츠 전용 편집 포맷 테스트"
    ]
  },

  /* ═══════════ [4] 커머스 ═══════════ */
  commerce: {
    totalRevenue: { v: "4.47억", note: "더비랩 + 알루바프로 + 대행", sample: false },

    products: [
      { name: "알루바프로", v: 34760, color: "var(--c2)" },
      { name: "더비랩",     v: 7672,  color: "var(--c3)" },
      { name: "대행",       v: 2300,  color: "var(--c1)" }
    ],

    derbylab: {
      revenue: "7,672만", goal: "1억", rate: 77, gap: "목표 대비 −2,328만",
      adSpend: "1,408만", adRate: "18.4%", adBase: "기준 25%", roas: "545%",
      followers: "29,178", views: "52.2만", viewsRaw: "522,398회",
      score: 4.8,
      best: { s: "5.0", t: "너무 잘 쓰고 있고 인생을 구원해 줬다" },
      worst:{ s: "3.0", t: "가격에 비해 너무 조잡하다" },
      pending: "8/20, 8/30 대응 미입력",
      weekGoal: 2258,
      weeks: [{ label: "1주", v: 2023 }, { label: "2주", v: 1640 }, { label: "3주", v: 1737 },
              { label: "4주", v: 1583 }, { label: "5주 (3일)", v: 690 }],
      sample: false
    },

    alubapro: {
      revenue: "3.47억", goal: "3억", rate: 116, gap: "목표 대비 +4,705만",
      adSpend: "7,512만", adRate: "21.6%", adBase: "기준 21%", roas: "462%",
      followers: "68,182", views: "274.2만", viewsRaw: "2,741,727회",
      score: 4.95,
      best: { s: "5.0", t: "안전을 본질로 두는 브랜드라 가격에도 고민 없이 구매" },
      worst:{ s: "2.0", t: "끼우면 빼기 어렵고 브라켓 나사가 갈린다" },
      pending: "7/9, 8/11 대응 미입력",
      weekGoal: 6774,
      weeks: [{ label: "1주", v: 8093 }, { label: "2주", v: 6817 }, { label: "3주", v: 8011 },
              { label: "4주", v: 8510 }, { label: "5주 (3일)", v: 3329 }],
      sample: false
    },

    agency: {
      revenue: "2,300만",
      clients: ["삼성SDS", "연애의정석", "동성회계법인", "커넥트세무회계"],
      sample: false
    },

    /* 아카데미 그로스 — 커머스팀이 지원하는 광고 지표 */
    academyGrowth: {
      posts: 33, postsReal: true,
      views: 1240000, viewsReal: false,
      winning: 7, winRate: 21.2, winningReal: true,
      cpl: 14406, cplReal: true,
      leads: 16327, adSpend: "2.35억"
    }
  }
};

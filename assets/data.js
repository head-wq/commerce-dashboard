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

  /* ═══════════ [3] 대행팀 유튜브파트 ═══════════
     출처: 대행팀(YouTube 파트) 8월 성과 리포트 · 작성일 2026-09-03
     전 항목 실측값입니다. */
  agencyYoutube: {
    sampleAll: false,
    source: "대행팀(YouTube 파트) 8월 성과 리포트 · 2026-09-03 작성",

    revenue:    { v: "5,148만", note: "VAT 포함 · 9개사 계약금액 합계" },
    members:    { v: "4명",     note: "인당 1,287만" },
    clients:    { v: "9곳",     note: "신규 2 · 해지 1" },
    unitPrice:  { v: "572만",   note: "5,148만 / 9곳" },
    retention:  { v: "27.3개월", note: "진행 중 7곳 기준" },
    ltv:        { v: "1.56억",  note: "객단가 572만 × 27.3개월" },
    newClients: { v: "2곳",     note: "모두모의원 · 조유라 변호사" },
    lostClients:{ v: "1곳",     note: "이비안 한의원" },

    /* 업체별 현황 — fee: 월 계약금액(원), views: 8월 누적 조회수, ctr: %, conv: 문의전환 */
    accounts: [
      { name: "조성구 변호사",   channel: "슬기로운 이혼수업",      field: "이혼전문변호사",    months: 46, fee: 5500000, views: 397000, ctr: 11.1, conv: "소통 중" },
      { name: "최용희 변호사",   channel: "용희주도한최변",        field: "형사전문변호사",    months: 34, fee: 7700000, views: 293000, ctr: 6.6,  conv: "소통 중" },
      { name: "정재현 변호사",   channel: "민생구조대",           field: "부동산·민사변호사", months: 32, fee: 6050000, views: 340000, ctr: 6.7,  conv: "성과공유X" },
      { name: "디지털프라임",    channel: "디지털정원장",          field: "치과",             months: 38, fee: 2970000, views: 233000, ctr: 6.6,  conv: "소통 중" },
      { name: "청담해리슨",     channel: "척추박사 닥터 해리슨",   field: "신경외과(수술)",    months: 33, fee: 2860000, views: 85000,  ctr: 9.9,  conv: "10건" },
      { name: "창원수신경외과",  channel: "통증단속반",            field: "신경외과(비수술)",  months: 6,  fee: 6600000, views: 50000,  ctr: 5.7,  conv: "소통 중" },
      { name: "모모동물의료센터", channel: "산책가까?",            field: "동물병원",          months: 3,  fee: 6600000, views: 12000,  ctr: 4.1,  conv: "소통 중" },
      { name: "모두모의원",     channel: "헤어 나오는 시간",       field: "피부과/모발",       months: null, fee: 6600000, views: null, ctr: null, conv: "-", isNew: true },
      { name: "조유라 변호사",   channel: "준비 중",              field: "-",                months: null, fee: 6600000, views: null, ctr: null, conv: "-", isNew: true }
    ],
    accountsNote: "“–” 는 자료 수집 중인 항목입니다 (모두모의원·조유라 변호사의 조회수·CTR·진행 개월차). 신규 2곳의 문의전환은 아직 해당 사항이 없습니다.",

    churned: {
      name: "이비안 한의원", channel: "이명난청완치학교",
      views: 197000, ctr: 7.7, note: "10월까지 계약 마무리"
    },

    news: [
      "<b>최용희 변호사</b> 릴스 <b>41만 조회</b> 달성",
      "<b>최용희 변호사</b> KBS 〈스모킹건〉·〈사건의뢰〉 출연 · 9월 〈시간추적자 설록〉 출연 예정 (촬영 완료)",
      "<b>조성구 변호사</b> 콘텐츠 <b>20만 조회</b> 달성",
      "<b>이비안 한의원</b> 릴스 <b>15만 조회</b> 달성"
    ],
    tries: [
      "<b>현장 브이로그형 콘텐츠</b> 지속 시도 — 다이소 리뷰, 댓글읽기 등 가벼운 정보성·시청자 참여형 포맷",
      "<b>모두모의원 숏폼 중심 채널 운영으로 전환</b> — 기존 롱폼 위주에서 숏폼 비중 확대"
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

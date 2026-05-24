"use client";

import { TrendingUp, HelpCircle, PieChart, AlertTriangle } from "lucide-react";

const ZONE_CONFIG = [
  {
    label: "강력 매수",
    score: "80점 이상",
    color: "text-green-500",
    bg: "bg-green-50",
    dot: "bg-green-500",
    desc: "모든 지표가 강한 상승 신호를 보내고 있어요.",
  },
  {
    label: "매수",
    score: "60 ~ 79점",
    color: "text-blue-600",
    bg: "bg-blue-50",
    dot: "bg-blue-500",
    desc: "긍정적인 지표가 많아 분할 진입을 고려해볼 만해요.",
  },
  {
    label: "중립",
    score: "40 ~ 59점",
    color: "text-zinc-500",
    bg: "bg-zinc-100",
    dot: "bg-zinc-400",
    desc: "상승·하락 신호가 뒤섞여 있어요. 지켜보세요.",
  },
  {
    label: "주의",
    score: "20 ~ 39점",
    color: "text-amber-600",
    bg: "bg-amber-50",
    dot: "bg-amber-500",
    desc: "부정적 지표가 감지됩니다. 신중하게 접근하세요.",
  },
  {
    label: "관망",
    score: "20점 미만",
    color: "text-red-500",
    bg: "bg-red-50",
    dot: "bg-red-500",
    desc: "대부분의 지표가 하락을 가리키고 있어요.",
  },
];

const LEFT_SCORE_ITEMS = [
  {
    title: "기술적 분석 추세",
    maxScore: "30점",
    dotColor: "bg-blue-500",
    items: [
      { label: "200일선보다 10% 이상 위", point: "+15점" },
      { label: "200일선보다 0~10% 위", point: "+8점" },
      { label: "50일선보다 5% 이상 위", point: "+10점" },
      { label: "50일선보다 0~5% 위", point: "+5점" },
      { label: "20일선 위", point: "+5점" },
    ],
  },
  {
    title: "골든 / 데드크로스",
    maxScore: "10점",
    dotColor: "bg-purple-500",
    items: [
      { label: "골든크로스 (50일선 > 200일선)", point: "+10점" },
      { label: "데드크로스 (50일선 < 200일선)", point: "-5점" },
    ],
  },
  {
    title: "RSI 과매수·과매도",
    maxScore: "10점",
    dotColor: "bg-orange-500",
    items: [
      { label: "RSI 30~40 (과매도 회복)", point: "+10점" },
      { label: "RSI 40~50 (저평가 안정)", point: "+8점" },
      { label: "RSI 50~60 (중립)", point: "+6점" },
      { label: "RSI 60~70 (과매수 진입)", point: "+3점" },
      { label: "RSI 70 이상 (과열)", point: "+1점" },
      { label: "RSI 30 미만 (극단적 과매도)", point: "+5점" },
    ],
  },
];

const RIGHT_SCORE_ITEMS = [
  {
    title: "애널리스트 추천도",
    maxScore: "35점",
    dotColor: "bg-green-500",
    items: [
      { label: "매수 80%↑ + 분석 10명↑", point: "+35점" },
      { label: "매수 80%↑", point: "+28점" },
      { label: "매수 70%↑", point: "+22점" },
      { label: "매수 60%↑", point: "+14점" },
      { label: "매수 50%↑", point: "+7점" },
    ],
  },
  {
    title: "모멘텀 오실레이터",
    maxScore: "15점",
    dotColor: "bg-pink-500",
    items: [
      { label: "-30 이하 (강한 반전 신호)", point: "+15점" },
      { label: "-20 ~ -30 (과매도)", point: "+12점" },
      { label: "0 ~ -20 (약세 중립)", point: "+8점" },
      { label: "0 ~ 20 (강세 중립)", point: "+4점" },
      { label: "20 이상 (과매수)", point: "+1점" },
    ],
  },
];

const TERMS = [
  {
    term: "이동평균선",
    subtitle: "Moving Average",
    emoji: "📈",
    desc: "일정 기간 주가의 평균값을 선으로 이은 지표예요. 현재 주가가 선보다 위에 있으면 상승 추세, 아래면 하락 추세로 봐요.",
    detail: [
      { label: "20일선", desc: "단기 추세 — 약 한 달" },
      { label: "50일선", desc: "중기 추세 — 약 두 달 반" },
      { label: "200일선", desc: "장기 추세 — 약 열 달" },
    ],
  },
  {
    term: "골든 / 데드크로스",
    subtitle: "Golden & Dead Cross",
    emoji: "✨",
    desc: "단기 이평선이 장기 이평선을 교차할 때 나타나는 추세 전환 신호예요.",
    detail: [
      { label: "골든크로스", desc: "50일선이 200일선 위로 → 매수 신호" },
      { label: "데드크로스", desc: "50일선이 200일선 아래로 → 경고 신호" },
    ],
  },
  {
    term: "RSI",
    subtitle: "Relative Strength Index",
    emoji: "🌊",
    desc: "주가가 너무 빠르게 올랐는지(과매수), 너무 많이 떨어졌는지(과매도)를 0~100으로 나타내요.",
    detail: [
      { label: "30 이하", desc: "과매도 — 반등 가능성 높음" },
      { label: "30 ~ 70", desc: "정상 구간" },
      { label: "70 이상", desc: "과매수 — 조정 주의" },
    ],
  },
  {
    term: "모멘텀 오실레이터",
    subtitle: "Momentum Oscillator",
    emoji: "⚡",
    desc: "주가 변화 속도를 부드럽게 다듬은 지표예요. -100~100 사이로 표현되며 낮을수록 반등 신호예요.",
    detail: [
      { label: "-20 이하", desc: "과매도 — 반등 신호" },
      { label: "-20 ~ 20", desc: "중립 구간" },
      { label: "20 이상", desc: "과매수 — 조정 주의" },
    ],
  },
];

export default function GuidePage() {
  const renderScoreCard = (item: (typeof LEFT_SCORE_ITEMS)[0]) => (
    <div
      key={item.title}
      className="border border-zinc-100 rounded-2xl bg-white shadow-sm mb-3"
    >
      <div className="flex items-center justify-between py-5 px-4 bg-zinc-50/80 border-b border-zinc-100">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${item.dotColor}`} />
          <h3 className="text-[14px] font-bold text-zinc-900">{item.title}</h3>
        </div>
        <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded font-mono">
          최대 {item.maxScore}
        </span>
      </div>
      <div className="divide-y divide-zinc-50 px-4">
        {item.items.map((sub) => (
          <div
            key={sub.label}
            className="flex items-center justify-between py-3"
          >
            <span className="text-[13px] text-zinc-500 font-medium tracking-tight">
              {sub.label}
            </span>
            <span className="text-[13px] font-bold text-blue-600 font-mono shrink-0">
              {sub.point}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen  text-zinc-900 pt-16 pb-24">
      {/* max-w-5xl로 확장하고 mx-auto로 중앙 배치를 명시해 대시보드 해상도 최적화 */}
      <div className="max-w-5xl mx-auto px-4 space-y-5 ">
        {/* 상단 타이틀 카드 */}
        <div className="bg-white rounded-[24px] p-8">
          <span className="inline-block mb-5 text-blue-600 font-bold text-xs bg-blue-50 px-3 py-1.5 rounded-full">
            주린이 가이드
          </span>
          <h1 className="text-2xl font-extrabold text-zinc-950 leading-snug">
            매수매력도 점수,
            <br />
            <span className="text-blue-600">어떻게 계산될까요?</span>
          </h1>
          <p className="mt-4 text-[14px] text-zinc-400">
            복잡한 주식 지표를 한 점수로 압축했어요. 점수가 만들어지는 기준을
            투명하게 공개합니다.
          </p>
        </div>

        {/* 매수구간 판정 카드 */}
        <div className="bg-white rounded-[24px] p-8 border border-zinc-100 shadow-sm">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-[18px] h-[18px] text-blue-500" />
            <h2 className="text-[16px] font-extrabold text-zinc-950">
              매수구간 판정
            </h2>
          </div>
          <p className="text-xs text-zinc-400 mb-5">
            점수에 따라 5단계로 자동 판정됩니다.
          </p>

          <div className="space-y-2">
            {ZONE_CONFIG.map((z) => (
              <div
                key={z.label}
                className={`flex items-center gap-4 px-4 py-3 rounded-xl ${z.bg}`}
              >
                {/* z.dot 변수를 주입하여 인디케이터 점 색상 복구 */}
                <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${z.dot}`} />
                <div className="w-[68px] shrink-0">
                  <p className={`text-[14px] font-bold ${z.color}`}>
                    {z.label}
                  </p>
                  <p className={`text-[10px] font-mono ${z.color} opacity-60`}>
                    {z.score}
                  </p>
                </div>
                <p className="text-[13px] text-zinc-600 font-medium leading-normal">
                  {z.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-[24px] p-8 border border-zinc-100 shadow-sm">
          <div className="flex items-center gap-2 mb-1">
            <PieChart className="w-[18px] h-[18px] text-blue-500" />
            <h2 className="text-[16px] font-extrabold text-zinc-950">
              100점 배점 구조
            </h2>
          </div>
          <p className="text-xs text-zinc-400 mb-6">
            조건에 부합할수록 점수가 쌓입니다.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
            <div className="space-y-3">
              {LEFT_SCORE_ITEMS.map(renderScoreCard)}
            </div>
            <div className="space-y-3">
              {RIGHT_SCORE_ITEMS.map(renderScoreCard)}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[24px] p-8 border border-zinc-100 shadow-sm">
          <div className="flex items-center gap-2 mb-1">
            <HelpCircle className="w-[18px] h-[18px] text-blue-500" />
            <h2 className="text-[16px] font-extrabold text-zinc-950">
              용어 가이드
            </h2>
          </div>
          <p className="text-xs text-zinc-400 mb-5">
            낯선 용어도 쉽게 이해할 수 있어요.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {TERMS.map((t) => (
              <div
                key={t.term}
                className="border border-zinc-100 rounded-2xl overflow-hidden flex flex-col bg-white shadow-sm"
              >
                <div className="flex items-center gap-3 px-4 py-3 bg-zinc-50/80 border-b border-zinc-100">
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-lg border border-zinc-100 shrink-0">
                    {t.emoji}
                  </div>
                  <div>
                    <h3 className="text-[13.5px] font-bold text-zinc-950">
                      {t.term}
                    </h3>
                    <p className="text-[9px] text-zinc-400 font-mono uppercase tracking-wider">
                      {t.subtitle}
                    </p>
                  </div>
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <p className="text-[13px] text-zinc-500 leading-relaxed mb-4">
                    {t.desc}
                  </p>
                  <div className="space-y-2 pt-2 border-t border-zinc-50">
                    {t.detail.map((d) => (
                      <div
                        key={d.label}
                        className="flex items-start text-[12px]"
                      >
                        <span className="font-bold text-blue-600 w-16 shrink-0">
                          {d.label}
                        </span>
                        <span className="text-zinc-500">{d.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 하단 유의사항 */}
        <footer className="bg-amber-50 border border-amber-100 rounded-[20px] p-5 flex items-start gap-3">
          <AlertTriangle className="w-[18px] h-[18px] text-amber-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-[13px] font-bold text-amber-800 mb-0.5">
              투자 유의사항
            </p>
            <p className="text-[12px] text-amber-700 leading-relaxed font-medium">
              본 점수는 통계 지표를 종합한 참고용 수치입니다. 미래 수익을
              보장하지 않으며, 모든 투자 결정과 책임은 본인에게 있습니다.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

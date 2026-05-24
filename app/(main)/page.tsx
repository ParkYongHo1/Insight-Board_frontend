"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  TrendingUp,
  Zap,
  LayoutDashboard,
  CheckCircle2,
  Activity,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const fadeInUp = (delay: number = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay },
});

const HeroSection = () => (
  <section className="py-32 md:py-24 bg-white overflow-hidden">
    <div className="max-w-7xl mx-auto px-6 text-center">
      <motion.div {...fadeInUp(0)}>
        <h1 className="text-5xl md:text-[84px] font-extrabold tracking-tighter leading-[1.05] text-zinc-950">
          흩어진 주식 데이터가
          <br />
          <span className="text-blue-600">매수 인사이트로</span>
        </h1>
      </motion.div>
      <motion.p
        {...fadeInUp(0.15)}
        className="mt-10 text-xl md:text-2xl text-zinc-500 max-w-2xl mx-auto font-medium leading-relaxed"
      >
        이동평균, RSI, 애널리스트 추천, 모멘텀까지
        <br className="hidden md:block" />
        원하는 종목의 매수매력도를 실시간으로 확인하세요
      </motion.p>
      <motion.div {...fadeInUp(0.3)} className="mt-14">
        <Button
          asChild
          size="lg"
          className="h-16 px-10 bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold rounded-full group transition-all shadow-xl shadow-blue-100"
        >
          <Link href="/sign-in" className="flex items-center gap-2">
            지금 바로 시작하기
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </motion.div>
    </div>
  </section>
);

const PreviewSection = () => {
  return (
    <section className="py-24 bg-zinc-50 border-y border-zinc-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div {...fadeInUp(0)}>
            <span className="text-blue-600 font-bold text-sm tracking-widest uppercase bg-blue-50 px-3 py-1 rounded-full">
              Preview
            </span>
            <h2 className="mt-6 text-4xl font-black tracking-tight text-zinc-950 leading-tight">
              매수 타이밍을 놓치지 않도록
              <br />
              Slack으로 즉시 알림을
            </h2>
            <p className="mt-6 text-lg text-zinc-500 font-medium leading-relaxed">
              매수매력도가 설정한 기준점을 넘으면 연동된 Slack으로 즉시 알림을
              보냅니다. 기술적 분석 지표를 한눈에 확인하세요.
            </p>
            <div className="mt-10 space-y-4">
              {[
                {
                  title: "퀀트 기반 매수매력도",
                  desc: "MA, RSI, 골든크로스, 애널리스트, 모멘텀을 종합한 100점 스코어",
                },
                {
                  title: "Slack 실시간 알림",
                  desc: "설정한 점수 초과 시 Slack으로 즉시 매수 신호 알림",
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="mt-1 bg-blue-600 rounded-full p-1">
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-zinc-900">{item.title}</h4>
                    <p className="text-sm text-zinc-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Slack 알림 UI */}
          <motion.div
            {...fadeInUp(0.2)}
            className="bg-white rounded-[32px] p-6 shadow-2xl border border-zinc-100"
          >
            {/* Slack 헤더 */}
            <div className="flex items-center gap-3 pb-4 border-b border-zinc-100 mb-4">
              <div className="w-9 h-9 bg-[#4A154B] rounded-lg flex items-center justify-center shrink-0">
                <Image
                  src="/slack.svg"
                  alt="Slack Logo"
                  width={16}
                  height={16}
                  className="w-4 h-4"
                />
              </div>
              <div>
                <p className="text-sm font-bold text-zinc-900">Insight Board</p>
              </div>
            </div>

            {/* 알림 본문 */}
            <div className="border-l-4 border-blue-500 pl-4">
              <p className="text-sm font-bold text-zinc-900 mb-1">
                📈 PL 매수매력도 알림
              </p>
              <p className="text-sm text-zinc-600 mb-5">
                <span className="font-bold">PL</span> 의 매수매력도가{" "}
                <span className="font-black text-blue-600">76점</span>에
                도달했습니다!
              </p>

              {/* 지표 - 2컬럼 */}
              <div className="flex gap-6">
                {/* 왼쪽 */}
                <div className="flex-1 space-y-4">
                  <div>
                    <p className="text-sm font-bold text-zinc-800">💰 현재가</p>
                    <p className="text-sm text-zinc-700">$44.35 (▲ 4.40%)</p>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-zinc-800">
                      📊 매수매력도
                    </p>
                    <p className="text-sm text-zinc-700">76 / 100</p>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-zinc-800">
                      📈 50일선 대비
                    </p>
                    <p className="text-sm text-zinc-700">+24.38%</p>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-zinc-800">
                      👨‍💼 애널리스트 매수 비율
                    </p>
                    <p className="text-sm text-zinc-700">79% (19명 커버리지)</p>
                  </div>
                </div>

                {/* 오른쪽 */}
                <div className="flex-1 space-y-4">
                  <div>
                    <p className="text-sm font-bold text-zinc-800">
                      🎯 매수구간
                    </p>
                    <p className="text-sm text-zinc-700">BUY</p>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-zinc-800">📉 RSI</p>
                    <p className="text-sm text-zinc-700">
                      64.3 (과매수 주의 🟡)
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-zinc-800">
                      📈 200일선 대비
                    </p>
                    <p className="text-sm text-zinc-700">+111.12%</p>
                  </div>
                </div>
              </div>

              <p className="text-[11px] text-zinc-400 italic mt-5">
                투자 판단은 본인 책임입니다.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const FeatureSection = () => (
  <section className="py-28 bg-white">
    <div className="max-w-7xl mx-auto px-6">
      <motion.h2
        {...fadeInUp(0)}
        className="text-3xl md:text-4xl font-bold tracking-tight text-center text-zinc-950 mb-20"
      >
        퀀트 투자의 새로운 기준
      </motion.h2>
      <div className="grid md:grid-cols-3 gap-8">
        {[
          {
            icon: BarChart3,
            title: "기술적 분석 자동화",
            desc: "20일·50일·200일 이동평균, RSI, 골든크로스를 실시간으로 자동 계산합니다.",
            color: "text-blue-600",
            bg: "bg-blue-50",
          },
          {
            icon: TrendingUp,
            title: "애널리스트 집계",
            desc: "월스트리트 애널리스트 매수 비율과 커버리지 수를 종합해 신뢰도 높은 점수를 산출합니다.",
            color: "text-zinc-900",
            bg: "bg-zinc-100",
          },
          {
            icon: Zap,
            title: "실시간 Slack 알림",
            desc: "매수매력도가 기준점을 넘으면 Slack으로 즉시 알림을 보내 매수 타이밍을 놓치지 않습니다.",
            color: "text-white",
            bg: "bg-zinc-900",
          },
        ].map((feature, i) => (
          <motion.div
            key={i}
            {...fadeInUp(i * 0.1)}
            className="bg-zinc-50/50 p-10 rounded-[32px] border border-zinc-100 transition-all hover:bg-white hover:shadow-xl group"
          >
            <div
              className={`w-14 h-14 rounded-2xl ${feature.bg} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}
            >
              <feature.icon className={`w-7 h-7 ${feature.color}`} />
            </div>
            <h3 className="text-2xl font-bold tracking-tight text-zinc-950">
              {feature.title}
            </h3>
            <p className="mt-4 text-zinc-500 text-base leading-relaxed font-medium">
              {feature.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const BottomCtaSection = () => (
  <section className="py-32 bg-zinc-950 relative overflow-hidden">
    <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
      <motion.div {...fadeInUp(0)}>
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
          지금 바로 관심 종목의
          <br />
          매수 타이밍을 잡아보세요.
        </h2>
        <div className="mt-12 flex items-center justify-center gap-4">
          <Button
            asChild
            size="lg"
            className="h-16 px-10 bg-white hover:bg-zinc-100 text-zinc-950 text-lg font-bold rounded-full transition-all shadow-2xl"
          >
            <Link href="/sign-up">시작하기</Link>
          </Button>
        </div>
      </motion.div>
    </div>
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />
  </section>
);

const DashboardGuideSection = () => (
  <section className="py-24 bg-white font-sans">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid lg:grid-cols-2 gap-16 items-start">
        {/* 왼쪽: 토스 스타일 설명 */}
        <motion.div className="lg:sticky lg:top-24">
          <span className="text-blue-600 font-bold text-sm tracking-widest uppercase bg-blue-50 px-3 py-1 rounded-full">
            How it works
          </span>
          <h2 className="mt-6 text-4xl font-black tracking-tight text-zinc-950 leading-tight">
            3단계로 완성하는
            <br />
            나만의 주식 대시보드
          </h2>
          <p className="mt-6 text-lg text-zinc-500 font-medium leading-relaxed">
            티커 입력 → 지표 선택 → 저장. 복잡한 설정 없이 클릭 몇 번으로 실시간
            분석 환경을 만들 수 있습니다.
          </p>
          <div className="mt-10 space-y-6">
            {[
              {
                step: "01",
                title: "종목 등록",
                desc: "티커 코드를 입력하면 자동으로 실시간 데이터 수집을 시작합니다.",
              },
              {
                step: "02",
                title: "지표 선택",
                desc: "현재가, RSI, 이동평균, 매수매력도 등 원하는 지표를 골라 테이블을 구성합니다.",
              },
              {
                step: "03",
                title: "실시간 확인",
                desc: "저장 즉시 대시보드가 활성화되고 Slack 알림도 자동으로 연동됩니다.",
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-5 items-start">
                <span className="text-[13px] font-black text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg shrink-0 mt-0.5">
                  {item.step}
                </span>
                <div>
                  <h4 className="font-bold text-zinc-900">{item.title}</h4>
                  <p className="text-sm text-zinc-500 mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* 오른쪽: 하나의 보더 프레임으로 정돈한 대시보드 생성 폼 목업 */}
        <motion.div className="bg-white rounded-[32px] p-6 shadow-2xl border border-zinc-100">
          <div className="p-6 space-y-8">
            {/* 3. 그룹 항목 섹션 */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-blue-600 font-extrabold text-sm">
                <TrendingUp className="w-4 h-4" />
                <span>그룹 항목 (세로 행)</span>
              </div>
              <div className="space-y-2">
                {[
                  { ticker: "RKLB", name: "로켓랩" },
                  { ticker: "PL", name: "플래닛랩스" },
                  { ticker: "ASTS", name: "AST스페이스모바일" },
                ].map((g, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between px-4 py-3 bg-zinc-50 rounded-xl"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-[11px] font-black text-blue-500 font-mono w-4">
                        {i + 1}
                      </span>
                      <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded font-mono">
                        {g.ticker}
                      </span>
                      <span className="text-xs font-semibold text-zinc-700">
                        {g.name}
                      </span>
                    </div>
                    <button className="w-4 h-4 text-zinc-400 hover:text-zinc-600 transition-colors cursor-pointer text-sm font-medium">
                      ×
                    </button>
                  </div>
                ))}
                <div className="flex gap-2 mt-3">
                  <div className="flex-[2] h-10 bg-zinc-50 rounded-xl flex items-center px-3">
                    <span className="text-xs text-zinc-400 font-mono font-medium">
                      예: IONQ, GOOG
                    </span>
                  </div>
                  <div className="flex-1 h-10 bg-zinc-50 rounded-xl flex items-center px-3">
                    <span className="text-xs text-zinc-400 font-medium">
                      별칭
                    </span>
                  </div>
                  <button className="h-10 px-4 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl flex items-center transition-colors cursor-pointer">
                    추가
                  </button>
                </div>
              </div>
            </div>

            {/* 4. 집계 항목 섹션 */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-blue-600 font-extrabold text-sm">
                <BarChart3 className="w-4 h-4" />
                <span>집계 항목 (가로 열)</span>
              </div>
              <div className="space-y-2">
                {[
                  { label: "현재가($)", col: "price" },
                  { label: "매수매력도", col: "purchaseScore" },
                  { label: "50일 이동평균", col: "ma50" },
                  { label: "RSI", col: "rsi" },
                ].map((m, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between px-4 py-3 bg-zinc-50 rounded-xl"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-[11px] font-black text-blue-500 w-4">
                        {i + 1}
                      </span>
                      <span className="text-xs font-semibold text-zinc-700">
                        {m.label}
                      </span>
                    </div>
                    <button className="w-4 h-4 text-zinc-400 hover:text-zinc-600 transition-colors cursor-pointer text-sm font-medium">
                      ×
                    </button>
                  </div>
                ))}
                <div className="flex gap-2 mt-3">
                  <div className="flex-1 h-10 bg-zinc-50 rounded-xl flex items-center px-3">
                    <span className="text-xs text-zinc-400 font-medium">
                      컬럼 선택
                    </span>
                  </div>
                  <button className="h-10 px-4 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl flex items-center transition-colors cursor-pointer">
                    추가
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-zinc-900 font-sans selection:bg-blue-100 tracking-tight">
      <main className="grow pt-20">
        <HeroSection />
        <PreviewSection />
        <FeatureSection />
        <DashboardGuideSection />
        <BottomCtaSection />
      </main>
    </div>
  );
}

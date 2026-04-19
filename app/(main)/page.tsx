"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Database,
  Zap,
  Layers,
  Calculator,
  LayoutDashboard,
  Plus,
  CheckCircle2,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";

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
          흩어진 데이터가
          <br />
          <span className="text-blue-600">성장의 인사이트로</span>
        </h1>
      </motion.div>
      <motion.p
        {...fadeInUp(0.15)}
        className="mt-10 text-xl md:text-2xl text-zinc-500 max-w-2xl mx-auto font-medium leading-relaxed"
      >
        복잡한 데이터베이스 연결부터 실시간 시각화까지
        <br className="hidden md:block" />
        당신의 Raw 데이터를 한눈에 바로 보세요
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

// ✅ 핵심: 설정 미리보기 섹션 (이미지 image_89dcc0.png 컨셉 반영)
const PreviewSection = () => {
  return (
    <section className="py-24 bg-zinc-50 border-y border-zinc-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* 왼쪽: 설명 영역 */}
          <motion.div {...fadeInUp(0)}>
            <span className="text-blue-600 font-bold text-sm tracking-widest uppercase bg-blue-50 px-3 py-1 rounded-full">
              Preview
            </span>
            <h2 className="mt-6 text-4xl font-black tracking-tight text-zinc-950 leading-tight">
              클릭 몇 번으로 완성되는
              <br />
              커스텀 통계 환경
            </h2>
            <p className="mt-6 text-lg text-zinc-500 font-medium leading-relaxed">
              복잡한 SQL 쿼리 없이도 드롭다운 선택만으로 원하는 데이터를
              그룹화하고 집계할 수 있습니다. 설정 즉시 반영되는 인터페이스를
              경험해보세요.
            </p>

            <div className="mt-10 space-y-4">
              {[
                {
                  title: "유연한 그룹핑",
                  desc: "모델별, 서비스별, 날짜별 자유로운 기준 설정",
                },
                {
                  title: "지능형 집계",
                  desc: "토큰 수, 소요 시간 등 핵심 지표 자동 계산",
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

          {/* 오른쪽: 실제 UI 미리보기 (image_89dcc0.png 스타일) */}
          <motion.div
            {...fadeInUp(0.2)}
            className="relative bg-white rounded-[32px] p-8 shadow-2xl border border-zinc-100 overflow-hidden"
          >
            {/* Header Mockup */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-zinc-900 rounded-xl flex items-center justify-center">
                <LayoutDashboard className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-black text-zinc-950">
                [OB] 카디프생명
              </h3>
            </div>

            {/* Info Box */}
            <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-4 flex gap-3 mb-8">
              <Info className="w-5 h-5 text-blue-500 shrink-0" />
              <p className="text-[13px] text-blue-800 font-medium leading-snug">
                카디프생명 ESD 모델별 응답 토큰 및 소요시간 이상치 실시간 탐지
                대시보드
              </p>
            </div>

            {/* Grouping Area */}
            <div className="space-y-6">
              <div>
                <span className="text-[11px] font-black text-zinc-400 tracking-widest uppercase mb-3 block">
                  Grouping Settings
                </span>
                <div className="flex gap-2">
                  <div className="px-4 py-2 bg-white border border-zinc-200 rounded-full text-xs font-bold text-zinc-600 shadow-sm">
                    모델 (MODEL)
                  </div>
                  <div className="px-4 py-2 bg-white border border-zinc-200 rounded-full text-xs font-bold text-zinc-600 shadow-sm">
                    서비스 (SERVICE_TYPE)
                  </div>
                </div>
              </div>

              {/* Metrics Area */}
              <div>
                <span className="text-[11px] font-black text-zinc-400 tracking-widest uppercase mb-3 block">
                  Analysis Metrics
                </span>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      <span className="text-sm font-bold text-zinc-800">
                        토큰수
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-zinc-400 bg-white px-2 py-0.5 rounded border border-zinc-100">
                        합계
                      </span>
                      <span className="text-sm font-black text-blue-600">
                        {">= 815"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decoration Bubble */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-600/5 rounded-full blur-3xl" />
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
        데이터 활용의 새로운 기준
      </motion.h2>
      <div className="grid md:grid-cols-3 gap-8">
        {[
          {
            icon: Database,
            title: "모든 데이터의 연결",
            desc: "복잡한 설정 없이 클릭 몇 번으로 사내의 모든 데이터를 즉시 불러옵니다.",
            color: "text-blue-600",
            bg: "bg-blue-50",
          },
          {
            icon: Zap,
            title: "실시간 데이터 확인",
            desc: "수동 작업 없이도 항상 최신 상태의 데이터를 실시간으로 모니터링하세요.",
            color: "text-zinc-900",
            bg: "bg-zinc-100",
          },
          {
            icon: BarChart3,
            title: "직관적인 시각화 도구",
            desc: "복잡한 수치들을 한눈에 이해할 수 있는 아름다운 차트로 변환합니다.",
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
          지금 바로 데이터의
          <br />
          진짜 가치를 찾아보세요.
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

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-zinc-900 font-sans selection:bg-blue-100 tracking-tight">
      <main className="grow pt-20">
        <HeroSection />
        <PreviewSection />
        <FeatureSection />
        <BottomCtaSection />
      </main>
    </div>
  );
}

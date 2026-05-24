export const THEME_OPTIONS = [
  { value: "SPACE_AERO", label: "우주항공 & 위성 통신" },
  { value: "AI_INFRA", label: "AI 인프라 & 반도체" },
  { value: "QUANTUM_SEC", label: "양자 컴퓨터 & 차세대 보안" },
  { value: "GREEN_ENERGY", label: "신재생 에너지 & 그리드" },
] as const;

export const THEME_LABELS: Record<string, string> = {
  SPACE_AERO: "우주항공 & 위성 통신",
  AI_INFRA: "AI 인프라 & 반도체",
  QUANTUM_SEC: "양자 컴퓨터 & 차세대 보안",
  GREEN_ENERGY: "신재생 에너지 & 그리드",
};

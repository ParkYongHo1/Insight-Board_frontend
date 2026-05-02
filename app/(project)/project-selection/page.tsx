"use client";

import { useRouter } from "next/navigation";
import useUserStore, { useUser } from "@/app/store/session";
import Link from "next/link";
import {
  Database,
  LayoutDashboard,
  ArrowUpRight,
  Clock,
  PlusCircle,
  Info,
  ArrowRight,
} from "lucide-react";

const ProjectSelectPage = () => {
  const router = useRouter();
  const user = useUser();
  const setSelectedProject = useUserStore((state) => state.setSelectedProject);

  const projectList = user?.projectList ?? [];

  const handleSelectProject = (projectId: string) => {
    setSelectedProject(projectId);
    router.push("/");
  };

  return (
    <div className="py-16 px-6 bg-white min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 px-1">
          <h1 className="text-2xl font-bold text-[#191f28] tracking-tight">
            통계를 분석할 프로젝트를 선택해주세요
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectList.map((project) => (
            <div
              key={project.id}
              onClick={() => handleSelectProject(project.id)}
              className="group flex flex-col bg-white rounded-[32px] p-8 transition-all duration-300 border border-[#eff1f3] hover:border-[#3182f6]/30 hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] active:border-[#3182f6]/30 active:shadow-[0_20px_40px_rgba(0,0,0,0.04)] active:scale-[0.98] cursor-pointer relative overflow-hidden h-90"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-11 h-11 bg-[#191f28] rounded-2xl flex items-center justify-center shrink-0 shadow-sm transition-transform group-hover:scale-105 group-active:scale-105">
                    <LayoutDashboard className="w-5.5 h-5.5 text-white" />
                  </div>
                  <h3 className="text-md font-bold text-[#191f28] leading-tight group-hover:text-[#3182f6] group-active:text-[#3182f6] transition-colors line-clamp-2">
                    {project.name}
                  </h3>
                </div>
              </div>

              <div className="grow">
                <div className="flex gap-2.5 p-4 rounded-2xl bg-[#f8faff] border border-[#e8f3ff] group-hover:bg-white group-hover:border-[#3182f6]/20 group-active:bg-white group-active:border-[#3182f6]/20 transition-all">
                  <Info className="w-4 h-4 text-[#3182f6] shrink-0 mt-0.5" />
                  <p className="text-[#4e5968] text-[13.5px] leading-relaxed line-clamp-3 font-medium">
                    {project.description}
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-[#f2f4f6] flex items-center justify-between mt-6">
                <div className="flex items-center gap-1.5 text-[#adb5bd] text-[12px] font-bold">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{project.createdAt.slice(0, 10)}</span>
                </div>
                <div className="w-9 h-9 rounded-full bg-[#f9fafb] flex items-center justify-center group-hover:bg-[#3182f6] group-active:bg-[#3182f6] transition-all shadow-sm  text-[#adb5bd] group-hover:text-white group-active:text-white">
                  <ArrowUpRight className="w-4.5 h-4.5" />
                </div>
              </div>

              <div className="absolute -right-4 -top-4 opacity-[0.02] group-hover:opacity-[0.06] group-active:opacity-[0.06]  transition-opacity pointer-events-none text-[#191f28]">
                <Database size={130} />
              </div>
            </div>
          ))}

          <Link
            href="/request-project"
            className="flex flex-col items-center justify-center bg-[#f2f4f6]/40 rounded-[32px] p-8 border border-dashed border-[#d1d6db] transition-all hover:bg-[#f2f4f6] group h-90"
          >
            <div className="flex flex-col items-center grow justify-center">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-all border border-[#eff1f3]">
                <PlusCircle className="w-6 h-6 text-[#adb5bd]" />
              </div>
              <p className="text-[#4e5968] font-bold text-base">
                새 프로젝트 추가
              </p>
              <p className="text-[#8b95a1] text-[13px] mt-2 font-medium text-center leading-relaxed">
                관리자에게 새로운
                <br />
                프로젝트 설정을 요청하세요
              </p>
            </div>
            <div className="flex items-center justify-center gap-2 font-semibold text-base">
              <span>추가 요청하기</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectSelectPage;

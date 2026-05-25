"use client";

import { useRouter } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useUserStore from "@/app/store/session";
import Link from "next/link";
import {
  LayoutDashboard,
  Clock,
  PlusCircle,
  ArrowRight,
  User,
  BarChart3,
  FileText,
  Loader2,
} from "lucide-react";
import { getDashboards } from "@/app/features/dashboard/api";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useDeleteDashboardMutation } from "../../delete/hooks/use-delete-dashboard-mutation";
import { DashboardDto, DashboardItemDetail } from "../../model/type";
import { isDemoAccount } from "@/app/shared/utils/is-demo";

const DashboardListPage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const user = useUserStore((state) => state.user);
  const isDemo = isDemoAccount(user?.email);

  const { data: dashboards = [], isLoading } = useQuery<DashboardDto[]>({
    queryKey: ["dashboards"],
    queryFn: () => getDashboards(),
  });

  const { mutate: removeDashboard } = useDeleteDashboardMutation({
    onSuccess: () => {
      toast.success("대시보드가 삭제되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["dashboards"] });
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
          "대시보드 삭제 중 오류가 발생했습니다.",
      );
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="animate-spin h-12 w-12 text-[#3182f6]" />
      </div>
    );
  }

  return (
    <div className="py-12 px-6 bg-white min-h-screen font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 px-1 flex flex-col gap-2">
          <div className="flex items-center gap-2 text-[#8b95a1] text-sm font-medium mb-1">
            <span>{user?.name ?? "멤버"}님의 인사이트</span>
            <ArrowRight className="w-3 h-3" />
            <span className="text-[#3182f6] font-bold">대시보드 관리</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[#191f28] tracking-tight md:text-3xl">
            대시보드를 확인하거나 설정을 변경하세요
          </h1>
          {isDemo && (
            <p className="text-sm text-amber-600 bg-amber-50 border border-amber-200 px-4 py-2 rounded-xl font-medium w-fit">
              데모 계정은 조회만 가능합니다.
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dashboards.map((dashboard: DashboardDto) => (
            <div
              key={dashboard.id}
              className="group flex flex-col bg-white rounded-[32px] p-8 transition-all duration-300 border border-[#eff1f3] hover:border-[#3182f6]/30 hover:shadow-[0_24px_48px_rgba(49,130,246,0.06)] relative overflow-hidden h-[510px]"
            >
              <div className="flex items-center gap-3 mb-6 min-w-0">
                <div className="w-11 h-11 bg-[#f2f4f6] rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-[#3182f6]/10 transition-colors">
                  <BarChart3 className="w-5.5 h-5.5 text-[#4e5968] group-hover:text-[#3182f6]" />
                </div>
                <h3 className="text-md font-bold text-[#191f28] leading-tight line-clamp-1">
                  {dashboard.title}
                </h3>
              </div>

              <div className="mb-6">
                <div className="flex gap-2.5 p-4 rounded-2xl bg-[#f8faff] border border-[#e8f3ff] min-h-[70px]">
                  <FileText className="w-4 h-4 text-[#3182f6] shrink-0 mt-0.5" />
                  <p className="text-[#4e5968] text-[13.5px] leading-relaxed line-clamp-2 font-medium">
                    {dashboard.desc || "설명이 없는 대시보드입니다."}
                  </p>
                </div>
              </div>

              <div className="grow space-y-5 overflow-y-auto max-h-[160px] pr-1 scrollbar-thin">
                <div className="space-y-2.5">
                  <p className="text-[11px] font-bold text-[#adb5bd] px-1 uppercase tracking-wider">
                    그룹 항목
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {dashboard.groups?.length > 0 ? (
                      dashboard.groups
                        .slice(0, 3)
                        .map((g: DashboardItemDetail, idx: number) => (
                          <span
                            key={idx}
                            className="px-3 py-1.5 bg-[#f2f4f6] text-[#4e5968] text-[11.5px] font-bold rounded-xl border border-[#e5e8eb]"
                          >
                            {g.alias}
                          </span>
                        ))
                    ) : (
                      <span className="text-[11.5px] text-[#adb5bd] italic px-1">
                        설정 없음
                      </span>
                    )}
                  </div>
                </div>
                <div className="space-y-2.5">
                  <p className="text-[11px] font-bold text-[#adb5bd] px-1 uppercase tracking-wider">
                    집계 항목
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {dashboard.metrics?.length > 0 ? (
                      dashboard.metrics
                        .slice(0, 3)
                        .map((m: DashboardItemDetail, idx: number) => (
                          <span
                            key={idx}
                            className="px-3 py-1.5 bg-[#e8f3ff] text-[#3182f6] text-[11.5px] font-bold rounded-xl border border-[#3182f6]/10"
                          >
                            {m.alias}
                          </span>
                        ))
                    ) : (
                      <span className="text-[11.5px] text-[#adb5bd] italic px-1">
                        설정 없음
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5 mt-8 mb-6 px-1 text-[#8b95a1] text-[12px] font-bold">
                <User className="w-3.5 h-3.5" />
                <span>{dashboard.author}</span>
                <span className="mx-1 text-[#e5e8eb]">|</span>
                <Clock className="w-3.5 h-3.5" />
                <span>
                  {new Date(dashboard.createdAt).toLocaleDateString()}
                </span>
              </div>

              <div className="flex flex-col gap-2 pt-4 border-t border-[#f2f4f6]">
                <div className="flex gap-2">
                  <button
                    onClick={() => router.push(`/dashboard/${dashboard.id}`)}
                    className="flex-[2] h-11 bg-[#3182f6] hover:bg-[#1b64da] text-white rounded-xl font-bold text-[14px] transition-all cursor-pointer shadow-sm active:scale-95"
                  >
                    조회하기
                  </button>

                  {!isDemo && (
                    <>
                      <button
                        onClick={() =>
                          router.push(`/dashboard/${dashboard.id}/edit`)
                        }
                        className="flex-1 h-11 bg-[#f2f4f6] text-[#4e5968] hover:bg-[#e5e8eb] rounded-xl font-bold text-[13px] transition-all cursor-pointer"
                      >
                        수정
                      </button>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <button className="flex-1 h-11 bg-red-50 text-red-500 hover:bg-red-100 rounded-xl font-bold text-[13px] transition-all flex items-center justify-center cursor-pointer">
                            삭제
                          </button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="rounded-[24px]">
                          <AlertDialogHeader>
                            <AlertDialogTitle className="text-xl font-bold text-[#191f28]">
                              정말 삭제할까요?
                            </AlertDialogTitle>
                            <AlertDialogDescription className="text-[#4e5968] leading-relaxed">
                              {dashboard.title} 대시보드를 삭제합니다. <br />
                              삭제된 설정은 복구할 수 없으니 신중하게
                              결정해주세요.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter className="mt-4">
                            <AlertDialogCancel className="rounded-xl border-[#eff1f3] text-[#4e5968] font-bold">
                              취소
                            </AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => removeDashboard(dashboard.id)}
                              className="rounded-xl bg-red-500 hover:bg-red-600 font-bold"
                            >
                              삭제하기
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </>
                  )}
                </div>
              </div>

              <div className="absolute -right-4 -top-4 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity pointer-events-none">
                <LayoutDashboard size={150} />
              </div>
            </div>
          ))}

          {!isDemo && (
            <Link
              href="/dashboard/new"
              className="flex flex-col items-center justify-center bg-[#f2f4f6]/40 rounded-[32px] p-8 border border-dashed border-[#d1d6db] transition-all hover:bg-[#f2f4f6] group h-[510px]"
            >
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform">
                <PlusCircle className="w-7 h-7 text-[#3182f6]" />
              </div>
              <p className="text-[#4e5968] font-bold text-lg">
                새 대시보드 생성
              </p>
              <div className="mt-4 flex items-center gap-1 font-semibold text-[#3182f6]">
                <span>시작하기</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardListPage;

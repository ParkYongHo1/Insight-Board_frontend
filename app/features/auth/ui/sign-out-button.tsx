"use client";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { toast } from "sonner";
import { useSignOut } from "../hooks/use-sign-out";
import { useRouter } from "next/navigation";

const SignOutButton = ({
  variant = "desktop",
}: {
  variant?: "desktop" | "mobile";
}) => {
  const router = useRouter();
  const { mutate: signOut, isPending } = useSignOut({
    onSuccess: () => {
      toast.success("성공적으로 로그아웃되었습니다.", {
        position: "top-center",
      });
      router.push("/sign-in");
    },
    onError: (error) => {
      console.log(error);
      toast.error("로그아웃에 실패했습니다. 다시 시도해주세요.", {
        position: "top-center",
      });
    },
  });
  const handleLogout = () => {
    signOut();
  };
  if (variant === "mobile") {
    return (
      <Button
        onClick={handleLogout}
        disabled={isPending}
        variant="ghost"
        className="justify-start px-4 h-12 text-[#f04452] font-bold hover:bg-[#fdf2f3] rounded-xl w-full"
      >
        <LogOut className="w-5 h-5 mr-3" /> 로그아웃
      </Button>
    );
  }
  return (
    <Button
      onClick={handleLogout}
      disabled={isPending}
      variant="ghost"
      className="rounded-xl cursor-pointer px-0 py-3 text-[#f04452] focus:text-[#f04452] focus:bg-[#fdf2f3]"
    >
      <LogOut className="w-4 h-4 mr-2" />
      <span className="text-sm font-bold">로그아웃</span>
    </Button>
  );
};
export default SignOutButton;

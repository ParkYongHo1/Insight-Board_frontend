import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface DashboardBasicInfoProps {
  title: string;
  desc: string;
  onTitleChange: (v: string) => void;
  onDescChange: (v: string) => void;
}

export const DashboardBasicInfo = ({
  title,
  desc,
  onTitleChange,
  onDescChange,
}: DashboardBasicInfoProps) => (
  <section className="bg-white border border-zinc-200 shadow-sm p-6 space-y-4">
    <h2 className="text-[13px] font-bold text-zinc-400 uppercase tracking-widest">
      기본 설정
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Label className="text-sm font-semibold text-zinc-700 mb-1.5 block">
          대시보드 제목 <span className="text-blue-500">*</span>
        </Label>
        <Input
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder="제목을 입력해주세요"
          className="h-11 bg-white border-zinc-200 rounded-none"
        />
      </div>
      <div>
        <Label className="text-sm font-semibold text-zinc-700 mb-1.5 block">
          대시보드 설명
        </Label>
        <Input
          value={desc}
          onChange={(e) => onDescChange(e.target.value)}
          placeholder="설명을 입력해주세요"
          className="h-11 bg-white border-zinc-200 rounded-none"
        />
      </div>
    </div>
  </section>
);

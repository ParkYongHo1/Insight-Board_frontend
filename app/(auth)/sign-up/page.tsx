import { SignUpForm } from "@/app/features/auth/ui/sign-up-form";

export default function Page() {
  return (
    <div className="w-full">
      <div className="flex items-center justify-center p-6 sm:p-12">
        <SignUpForm />
      </div>
    </div>
  );
}

import SignInForm from "@/app/features/auth/ui/sign-in-form";

const Page = () => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-center p-6 sm:p-12">
        <SignInForm />
      </div>
    </div>
  );
};

export default Page;

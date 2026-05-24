"use client";

import PersonalInfoForm from "@/app/features/profile/ui/personal-info-form";

const Page = () => {
  return (
    <div className="w-full min-h-screen bg-white overflow-y-auto">
      <div className="w-full max-w-7xl mx-auto py-10 px-6 md:px-12 flex flex-col gap-16">
        <PersonalInfoForm />
      </div>
    </div>
  );
};

export default Page;

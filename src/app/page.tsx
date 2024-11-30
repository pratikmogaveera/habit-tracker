import FormTabs from "@/components/FormTabs";

export default function Home() {
  return (
    <main className="grid mx-auto min-h-dvh w-screen max-w-[100vw] p-5 md:p-8 lg:p-20">
      <div className="flex flex-col min-w-[320px] items-center space-y-8">
        <FormTabs />
      </div>
    </main>
  );
}

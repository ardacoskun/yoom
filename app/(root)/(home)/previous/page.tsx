import CallList from "@/components/CallList";
import Title from "@/components/ui/Title";

const Page = () => {
  return (
    <section className="flex size-full flex-col text-white gap-10">
      <Title title="Previous" />
      <CallList type="ended" />
    </section>
  );
};

export default Page;

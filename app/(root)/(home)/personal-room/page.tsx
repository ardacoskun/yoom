"use client";

import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import Title from "@/components/ui/Title";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useGetCallById } from "@/hooks/useGetCallById";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";

interface TableProps {
  title: string;
  description: string;
}

const Table = ({ title, description }: TableProps) => {
  return (
    <div className="flex flex-col items-start gap-2 xl:flex-row">
      <h1 className="text-base font-medium text-sky-1 lg:text-xl xl:min-w-32">
        {title}:
      </h1>
      <h1 className="truncate text-sm font-bold max-sm:max-w-[320px] lg:text-xl">
        {description}
      </h1>
    </div>
  );
};

const Page = () => {
  const router = useRouter();
  const { user } = useUser();
  const { toast } = useToast();
  const client = useStreamVideoClient();

  const meetingId = user?.id;
  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meetingId}?personal=true`;

  const { call } = useGetCallById(meetingId!);

  const fields = [
    { id: 1, title: "Topic", description: `${user?.username}'s meeting room` },
    {
      id: 2,
      title: "Meeting Id",
      description: meetingId,
    },
    {
      id: 3,
      title: "Invite Link",
      description: meetingLink,
    },
  ];

  const startRoom = async () => {
    if (!client || !user) return;

    if (!call) {
      const newCall = client.call("default", meetingId!);

      await newCall.getOrCreate({
        data: {
          starts_at: new Date().toISOString(),
        },
      });
    }

    router.push(`/meeting/${meetingId}?personal=true`);
  };

  return (
    <section className="flex size-full flex-col text-white gap-10">
      <Title title="Personal Room" />

      <div className="flex w-full flex-col gap-8 xl:max-w-[900px]">
        {fields.map((item) => (
          <Table
            key={item.id}
            title={item.title}
            description={item.description!}
          />
        ))}
      </div>
      <div className="flex gap-5">
        <Button className="bg-blue-1" onClick={startRoom}>
          Start Meeting
        </Button>
        <Button
          className="bg-dark-3"
          onClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast({
              title: "Link Copied",
            });
          }}
        >
          Copy Invitation
        </Button>
      </div>
    </section>
  );
};

export default Page;

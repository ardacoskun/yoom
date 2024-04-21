"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useToast } from "@/components/ui/use-toast";
import HomeCard from "./HomeCard";
import MeetingModal from "./MeetingModal";

const MeetingTypeList = () => {
  const router = useRouter();
  const { toast } = useToast();

  const [meetingState, setMeetingState] = useState<
    "isScheduleMeeting" | "isJoiningMeeting" | "isInstantMeeting" | undefined
  >();
  const [values, setValues] = useState({
    dateTime: new Date(),
    description: "",
    link: "",
  });
  const [callDetails, setCallDetails] = useState<Call>();

  const cards = [
    {
      id: 1,
      img: "/icons/add-meeting.svg",
      title: "New Meeting",
      description: "Start an instant meeting",
      handleClick: () => setMeetingState("isInstantMeeting"),
      className: "bg-orange-1",
    },
    {
      id: 2,
      img: "/icons/schedule.svg",
      title: "Schedule Meeting",
      description: "Plan your meeting",
      handleClick: () => setMeetingState("isScheduleMeeting"),
      className: "bg-blue-1",
    },
    {
      id: 3,
      img: "/icons/recordings.svg",
      title: "View Recordings",
      description: "Check out your recordings",
      handleClick: () => router.push("/recordings"),
      className: "bg-purple-1",
    },
    {
      id: 4,
      img: "/icons/join-meeting.svg",
      title: "Join Meeting",
      description: "via invitation link",
      handleClick: () => setMeetingState("isJoiningMeeting"),
      className: "bg-yellow-1",
    },
  ];

  const { user } = useUser();
  const client = useStreamVideoClient();

  const createMeeting = async () => {
    if (!user || !client) return;

    try {
      if (!values.dateTime) {
        toast({
          title: "Please select a date and time",
        });
        return;
      }

      const id = crypto.randomUUID();
      const call = client.call("default", id);

      if (!call) {
        throw new Error("Failed to create call!");
      }

      const startsAt =
        values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || "Instant meeting";

      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
        },
      });
      setCallDetails(call);

      if (!values.description) {
        router.push(`/meeting/${call.id}`);
      }
      toast({
        title: "Meeting created",
      });
    } catch (error) {
      console.log("error", error);
      toast({
        title: "Failed to create meeting",
      });
    }
  };

  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((item) => (
        <HomeCard
          key={item.id}
          img={item.img}
          title={item.title}
          description={item.description}
          className={item.className}
          handleClick={item.handleClick}
        />
      ))}
      <MeetingModal
        isOpen={meetingState === "isInstantMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Start an Instant Meeting"
        className="text-center"
        buttonText="Start Meeting"
        handleClick={createMeeting}
      />
    </section>
  );
};

export default MeetingTypeList;

// @ts-nocheck

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { isEmpty } from "lodash";
import { Call, CallRecording } from "@stream-io/video-react-sdk";
import { useGetCalls } from "@/hooks/useGetCalls";
import MeetingCard from "./meeting/MeetingCard";
import Loader from "./ui/Loader";

interface CallListProps {
  type: "ended" | "upcoming" | "recordings";
}

const CallList = ({ type = "recordings" }: CallListProps) => {
  const router = useRouter();

  const { endedCalls, upcomingCalls, callRecordings, isLoading } =
    useGetCalls();
  const [recordings, setRecordings] = useState<CallRecording>([]);

  const getCallsAndMessage = () => {
    const callTypes = {
      ended: {
        calls: endedCalls,
        message: "No Previous Calls",
      },
      recordings: {
        calls: recordings,
        message: "No Recordings",
      },
      upcoming: {
        calls: upcomingCalls,
        message: "No Upcoming Calls",
      },
    };

    const { calls, message } = callTypes[type] || {
      calls: [],
      message: "",
    };
    return { calls, message };
  };

  const calls = getCallsAndMessage()?.calls as Call[];
  const noCallsMessage = getCallsAndMessage()?.message;

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
      {!isEmpty(calls) ? (
        calls.map((item: Call) => (
          <MeetingCard
            key={item?.id}
            icon={
              type === "ended"
                ? "/icons/previous.svg"
                : type === "upcoming"
                ? "/icons/upcoming.svg"
                : "/icons/recordings.svg"
            }
            title={
              item.state.custom.description.substring(0, 26) || "No description"
            }
            date={
              item.state.startsAt?.toLocaleString() ||
              item.start_time.toLocaleString()
            }
            isPreviousMeeting={type === "ended"}
            buttonIcon1={type === "recordings" ? "/icons/play.svg" : undefined}
            buttonText={type === "recordings" ? "Play" : "Start"}
            handleClick={() =>
              router.push(
                type === "recordings" ? item.url : `/meeting/${item.id}`
              )
            }
            link={
              type === "recordings"
                ? item.url
                : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${item.id}`
            }
          />
        ))
      ) : (
        <h1>{noCallsMessage}</h1>
      )}
    </div>
  );
};

export default CallList;

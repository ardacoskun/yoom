// @ts-nocheck

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isEmpty } from "lodash";
import { Call, CallRecording } from "@stream-io/video-react-sdk";
import MeetingCard from "./meeting/MeetingCard";
import Loader from "./ui/Loader";
import { useToast } from "./ui/use-toast";
import { useGetCalls } from "@/hooks/useGetCalls";

interface CallListProps {
  type: "ended" | "upcoming" | "recordings";
}

const CallList = ({ type }: CallListProps) => {
  const router = useRouter();
  const { toast } = useToast();

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

  useEffect(() => {
    const fetchRecordings = async () => {
      try {
        const callData = await Promise.all(
          callRecordings.map((item) => item.queryRecordings())
        );

        const recordings = callData
          .filter((call) => call.recordings.length > 0)
          .flatMap((item) => item.recordings);

        setRecordings(recordings);
      } catch (error) {
        toast({ title: "Try again later!" });
      }
    };

    if (type === "recordings") {
      fetchRecordings();
    }
  }, [type, callRecordings, toast]);

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
              item?.state?.custom?.description?.substring(0, 26) ||
              item?.filename?.substring(0, 20) ||
              "Personal Meeting"
            }
            date={
              item?.state?.startsAt?.toLocaleString() ||
              item?.start_time.toLocaleString()
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
                ? item?.url
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

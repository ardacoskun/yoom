import { LayoutList } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CallLayoutType } from "./MeetingRoom";

interface CallLayoutDropdownProps {
  setLayout: (value: CallLayoutType) => void;
}

const callLayoutOptions = [
  {
    id: 1,
    label: "Grid",
  },
  {
    id: 2,
    label: "Speaker-Left",
  },
  {
    id: 3,
    label: "Speaker-Right",
  },
];

const CallLayoutDropdown = ({ setLayout }: CallLayoutDropdownProps) => {
  return (
    <DropdownMenu>
      <div className="flex items-center">
        <DropdownMenuTrigger className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]">
          <LayoutList size={20} className="text-white" />
        </DropdownMenuTrigger>
      </div>
      <DropdownMenuContent className="border-dark-1 bg-dark-1 text-white">
        {callLayoutOptions.map((item) => (
          <div key={item.id}>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() =>
                setLayout(item.label.toLowerCase() as CallLayoutType)
              }
            >
              {item.label}
            </DropdownMenuItem>
            <DropdownMenuSeparator className="border-dark-1" />
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CallLayoutDropdown;

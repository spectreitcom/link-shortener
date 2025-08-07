"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CopyIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type Props = {
  content: string;
};

export function CopyToClipboardButton({ content }: Props) {
  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(content);
    toast.success("Copied to clipboard");
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant={"ghost"} onClick={copyToClipboard}>
          <CopyIcon />
        </Button>
      </TooltipTrigger>
      <TooltipContent>Copy shortened url</TooltipContent>
    </Tooltip>
  );
}

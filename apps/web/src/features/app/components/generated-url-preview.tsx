"use client";

import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { CopyIcon } from "lucide-react";
import { toast } from "sonner";

type Props = {
  url: string;
};

export function GeneratedUrlPreview({ url }: Props) {
  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(url);
    toast.success("Copied to clipboard");
  };

  return (
    <Alert>
      <div className={"flex justify-between items-center w-full"}>
        <div>{url}</div>
        <div>
          <Button variant={"ghost"} onClick={copyToClipboard}>
            <CopyIcon />
          </Button>
        </div>
      </div>
    </Alert>
  );
}

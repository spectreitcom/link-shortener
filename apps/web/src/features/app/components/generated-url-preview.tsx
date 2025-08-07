"use client";

import { Alert } from "@/components/ui/alert";
import { CopyToClipboardButton } from "@/features/app/components/copy-to-clipboard-button";

type Props = {
  url: string;
};

export function GeneratedUrlPreview({ url }: Props) {
  return (
    <Alert>
      <div className={"flex justify-between items-center w-full"}>
        <div>{url}</div>
        <div>
          <CopyToClipboardButton content={url} />
        </div>
      </div>
    </Alert>
  );
}

import { getOriginalUrl } from "@/features/app/actions";
import { Suspense } from "react";

type Props = {
  params: Promise<{ code: string }>;
};

export default async function RedirectPage({ params }: Props) {
  const { code } = await params;
  return (
    <Suspense fallback={<div>Please wait...</div>}>
      <AsyncComponent code={code} />
    </Suspense>
  );
}

async function AsyncComponent({ code }: { code: string }) {
  await getOriginalUrl(code);
  return null;
}

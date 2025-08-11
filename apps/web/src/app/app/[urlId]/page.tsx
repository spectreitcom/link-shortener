import { getUrlStatistics } from "@/features/app/actions";

type Props = {
  params: Promise<{ urlId: string }>;
};

export default async function UrlDetailsPage({ params }: Props) {
  const { urlId } = await params;
  await getUrlStatistics(urlId);

  // todo;

  return <div>asdasda</div>;
}

import { getUrl, getUrlStatistics } from "@/features/app/actions";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { StatisticsChart } from "@/features/app/components/statistics-chart";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronLeftIcon } from "lucide-react";
import { DateRange } from "@/features/app/components/date-range";

type Props = {
  params: Promise<{ urlId: string }>;
  searchParams: Promise<{ fromDate?: string; endDate?: string }>;
};

export default async function UrlDetailsPage({ params, searchParams }: Props) {
  const { urlId } = await params;
  const { fromDate, endDate } = await searchParams;

  const urlData = await getUrl(urlId);
  const stats = await getUrlStatistics(urlId, fromDate, endDate);

  return (
    <div>
      <div className={"flex items-center gap-4"}>
        <Button asChild>
          <Link href={"/app"}>
            <ChevronLeftIcon />
          </Link>
        </Button>
        <h3 className={"text-3xl font-bold"}>
          http://localhost:3000/{urlData.code}
        </h3>
      </div>

      <BasicStats
        uniqueVisitCount={stats.uniqueVisitCount}
        visitCount={stats.visitCount}
      />

      <DateRange startDate={fromDate} endDate={endDate} urlId={urlId} />

      <StatisticsChart visits={stats.visits} />
    </div>
  );
}

async function BasicStats({
  visitCount,
  uniqueVisitCount,
}: {
  visitCount: number;
  uniqueVisitCount: number;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
      <Card>
        <CardHeader>
          <CardTitle>Total Visits</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{visitCount}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Unique Visits</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{uniqueVisitCount}</div>
        </CardContent>
      </Card>
    </div>
  );
}

"use client";

import { DateRange } from "@/components/date-range";
import { useRouter } from "next/navigation";
import { format, subDays } from "date-fns";

type Props = {
  value: [string, string];
  urlId: string;
};

export function StatsDateRange({ value, urlId }: Props) {
  const router = useRouter();
  const maxDate = format(new Date(), "yyyy-MM-dd");
  const minDate = format(subDays(new Date(), 30), "yyyy-MM-dd");

  const handleChange = ([fromDate, endDate]: [string, string]) => {
    router.push(`/app/${urlId}?fromDate=${fromDate}&endDate=${endDate}`);
  };

  return (
    <DateRange
      className={"mt-8"}
      onChange={handleChange}
      value={value}
      maxDate={maxDate}
      minDate={minDate}
    />
  );
}

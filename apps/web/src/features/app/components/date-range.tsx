"use client";

import { DatePicker } from "@/components/date-picker";
import { useRouter } from "next/navigation";
import { subDays } from "date-fns";
import { Button } from "@/components/ui/button";

type Props = {
  startDate?: string;
  endDate?: string;
  urlId: string;
};

export function DateRange({ startDate, endDate, urlId }: Props) {
  const router = useRouter();

  const maxFromDate = endDate ? new Date(endDate) : new Date();
  const minFromDate = subDays(maxFromDate, 30);

  const minEndDate: Date | undefined = startDate
    ? new Date(startDate)
    : minFromDate;

  const maxEndDate = new Date();

  const urlSearchParams = new URLSearchParams({
    fromDate: startDate ?? "",
    endDate: endDate ?? "",
  });

  const handleStartDateChange = (value: string) => {
    if (value) {
      urlSearchParams.set("fromDate", value);
    } else {
      urlSearchParams.delete("fromDate");
    }

    router.push(`/app/${urlId}?${urlSearchParams.toString()}`);
  };

  const handleEndDateChange = (value: string) => {
    if (value) {
      urlSearchParams.set("endDate", value);
    } else {
      urlSearchParams.delete("endDate");
    }
    router.push(`/app/${urlId}?${urlSearchParams.toString()}`);
  };

  const handleClear = () => {
    router.push(`/app/${urlId}`);
  };

  return (
    <div className={"mt-8 flex gap-4"}>
      <DatePicker
        value={startDate}
        onChange={handleStartDateChange}
        placeholder={"Start Date"}
        minDate={minFromDate.toISOString()}
        maxDate={maxFromDate.toISOString()}
      />
      <DatePicker
        value={endDate}
        placeholder={"End Date"}
        onChange={handleEndDateChange}
        minDate={minEndDate?.toISOString()}
        maxDate={maxEndDate?.toISOString()}
      />
      <Button onClick={handleClear}>Clear</Button>
    </div>
  );
}

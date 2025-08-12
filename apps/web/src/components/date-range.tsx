"use client";

import { useState } from "react";
import { format, parseISO } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange as DateRangeType } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type Props = {
  value?: [string, string];
  onChange?: ([fromDate, endDate]: [string, string]) => void;
  className?: string;
  minDate?: string;
  maxDate?: string;
};

export function DateRange({
  value,
  onChange,
  className,
  minDate,
  maxDate,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const dateRange: DateRangeType | undefined = value && value[0] && value[1]
    ? {
        from: parseISO(value[0]),
        to: parseISO(value[1]),
      }
    : undefined;

  const handleSelect = (range: DateRangeType | undefined) => {
    if (range?.from && range?.to && onChange) {
      const fromDate = format(range.from, "yyyy-MM-dd");
      const endDate = format(range.to, "yyyy-MM-dd");
      onChange([fromDate, endDate]);
      setIsOpen(false);
    }
  };

  const formatDisplayText = () => {
    if (!dateRange?.from) {
      return "Pick a date range";
    }
    if (dateRange.from && !dateRange.to) {
      return format(dateRange.from, "LLL dd, y");
    }
    if (dateRange.from && dateRange.to) {
      return `${format(dateRange.from, "LLL dd, y")} - ${format(dateRange.to, "LLL dd, y")}`;
    }
  };

  return (
    <div className={cn(className)}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !dateRange && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {formatDisplayText()}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={dateRange?.from}
            selected={dateRange}
            onSelect={handleSelect}
            numberOfMonths={2}
            fromDate={minDate ? parseISO(minDate) : undefined}
            toDate={maxDate ? parseISO(maxDate) : undefined}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

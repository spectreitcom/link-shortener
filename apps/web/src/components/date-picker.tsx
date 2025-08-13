"use client";

import { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Matcher } from "react-day-picker";
import { format } from "date-fns";

type Props = {
  placeholder?: string;
  disabled?: boolean;
  minDate?: string;
  maxDate?: string;
  value?: string;
  onChange?: (value: string) => void;
};

export function DatePicker({
  placeholder,
  disabled,
  minDate,
  maxDate,
  value,
  onChange,
}: Props) {
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | undefined>(value);

  let hidden: Matcher | undefined = undefined;

  const minDateObject = minDate ? new Date(minDate) : undefined;
  const maxDateObject = maxDate ? new Date(maxDate) : undefined;

  if (minDateObject) {
    hidden = {
      before: minDateObject,
    };
  }

  if (maxDateObject) {
    hidden = {
      ...hidden,
      after: maxDateObject,
    };
  }

  const handleSelect = (date: Date | undefined) => {
    if (date) {
      const formattedDate = format(date, "yyyy-MM-dd");
      setSelectedDate(formattedDate);
      setOpen(false);
      onChange?.(formattedDate);
    }
  };

  useEffect(() => {
    if (!value) {
      setSelectedDate(undefined);
    }
  }, [value]);

  return (
    <div className={"relative w-sm"}>
      <Input
        className="bg-background pr-10"
        placeholder={placeholder}
        disabled={disabled}
        defaultValue={selectedDate ?? ""}
      />
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date-picker"
            variant="ghost"
            className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
          >
            <CalendarIcon className="size-3.5" />
            <span className="sr-only">Select date</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto overflow-hidden p-0"
          align="end"
          alignOffset={-8}
          sideOffset={10}
        >
          <Calendar
            mode={"single"}
            hidden={hidden}
            selected={value ? new Date(value) : undefined}
            onSelect={handleSelect}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

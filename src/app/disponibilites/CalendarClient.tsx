"use client";

import { useRouter } from "next/navigation";
import Calendar from "react-calendar";
import { format } from "date-fns";
import "react-calendar/dist/Calendar.css";

interface Props {
  blockedDates: string[];
}

export default function CalendarClient({ blockedDates }: Props) {
  const router = useRouter();
  const blocked = new Set(blockedDates);

  function isBlocked(date: Date): boolean {
    return blocked.has(format(date, "yyyy-MM-dd"));
  }

  function handleClick(date: Date) {
    if (isBlocked(date)) return;
    const d = format(date, "yyyy-MM-dd");
    router.push(`/reservation?checkin=${d}`);
  }

  const today = new Date();
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 border border-[#b8cfc0]/30">
      <Calendar
        onClickDay={handleClick}
        tileDisabled={({ date }) => isBlocked(date)}
        minDate={new Date()}
        defaultActiveStartDate={startOfMonth}
        locale="fr-FR"
        className="w-full"
      />
      <div className="flex gap-6 mt-4 justify-center text-xs text-[#8aab94]">
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 rounded bg-red-200 inline-block" />
          Occupé
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 rounded bg-[#b8cfc0] inline-block" />
          Disponible
        </div>
      </div>
    </div>
  );
}

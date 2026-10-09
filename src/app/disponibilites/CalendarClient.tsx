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

  const today = new Date();
  const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

  function isBlocked(date: Date): boolean {
    return blocked.has(format(date, "yyyy-MM-dd"));
  }

  function isPast(date: Date): boolean {
    return date < todayStart;
  }

  function handleClick(date: Date) {
    if (isBlocked(date) || isPast(date)) return;
    const d = format(date, "yyyy-MM-dd");
    router.push(`/reservation?checkin=${d}`);
  }

  function tileClassName({ date }: { date: Date }): string {
    if (isPast(date)) return "tile-past";
    if (isBlocked(date)) return "tile-blocked";
    return "tile-free";
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 border border-[#b8cfc0]/30">
      <Calendar
        onClickDay={handleClick}
        tileDisabled={({ date }) => isBlocked(date)}
        tileClassName={tileClassName}
        minDate={new Date()}
        defaultActiveStartDate={startOfMonth}
        locale="fr-FR"
        className="w-full"
      />
      <div className="flex gap-6 mt-4 justify-center text-xs text-[#8aab94]">
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 rounded bg-[#b8cfc0]/40 inline-block" />
          Libre
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 rounded bg-red-100 inline-block" />
          Occupé
        </div>
      </div>
    </div>
  );
}

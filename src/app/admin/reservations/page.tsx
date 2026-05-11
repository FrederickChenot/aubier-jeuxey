export const dynamic = "force-dynamic";

import ReservationsManager from "./ReservationsManager";

export default function AdminReservationsPage() {
  return <ReservationsManager reservations={[]} />;
}

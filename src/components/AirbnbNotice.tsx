import BookingLink from "./BookingLink";

export default function AirbnbNotice() {
  return (
    <div className="bg-white rounded-2xl p-8 border border-[#b8cfc0]/30 text-center">
      <p className="text-[#3a3d42] mb-6">Les réservations se font actuellement sur Airbnb</p>
      <BookingLink
        reservationsOpen={false}
        label="Réserver sur Airbnb"
        className="inline-block bg-[#c8813a] hover:bg-[#e8b87a] text-white font-medium px-8 py-3 rounded transition-colors"
      />
    </div>
  );
}

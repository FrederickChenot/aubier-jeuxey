import Link from "next/link";

export const AIRBNB_LISTING_URL = "https://www.airbnb.fr/rooms/1805218518220078185";

interface Props {
  reservationsOpen: boolean;
  label: string;
  className?: string;
  onClick?: () => void;
}

// Bouton « Réserver » du site : formulaire direct, ou annonce Airbnb en mode vitrine.
export default function BookingLink({ reservationsOpen, label, className, onClick }: Props) {
  if (reservationsOpen) {
    return (
      <Link href="/reservation" className={className} onClick={onClick}>
        {label}
      </Link>
    );
  }

  return (
    <a href={AIRBNB_LISTING_URL} target="_blank" rel="noopener noreferrer" className={className} onClick={onClick}>
      Réserver sur Airbnb
    </a>
  );
}

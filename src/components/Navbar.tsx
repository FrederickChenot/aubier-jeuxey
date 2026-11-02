import NavbarClient from "./NavbarClient";
import { loadSettings } from "@/lib/loadSettings";

export default async function Navbar() {
  const { reservations_ouvertes } = await loadSettings();

  return <NavbarClient reservationsOpen={reservations_ouvertes} />;
}

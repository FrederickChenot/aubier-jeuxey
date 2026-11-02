import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Une fois bundlé par Turbopack, node-ical plante à l'exécution ("s.BigInt is not a function")
  // et casse la synchro Airbnb : il doit rester chargé tel quel par Node.
  serverExternalPackages: ["node-ical"],
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;

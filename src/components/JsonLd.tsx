export default function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LodgingBusiness",
        "@id": "https://www.aubier-vosges.fr/#lodging",
        name: "L'Aubier",
        description:
          "Studio 37 m² plain-pied entièrement rénové en 2025 à Jeuxey (Vosges). Lit double 140×190, douche italienne, terrasse bambous privative, parking inclus, WiFi fibre.",
        url: "https://www.aubier-vosges.fr",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Jeuxey",
          postalCode: "88000",
          addressCountry: "FR",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 48.19,
          longitude: 6.43,
        },
        priceRange: "€€",
        numberOfRooms: 1,
        amenityFeature: [
          { "@type": "LocationFeatureSpecification", name: "WiFi", value: true },
          { "@type": "LocationFeatureSpecification", name: "Parking", value: true },
          { "@type": "LocationFeatureSpecification", name: "Climatisation", value: true },
          { "@type": "LocationFeatureSpecification", name: "Terrasse", value: true },
        ],
        offers: {
          "@type": "Offer",
          price: "75",
          priceCurrency: "EUR",
          availability: "https://schema.org/InStock",
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://www.aubier-vosges.fr/#breadcrumb",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: "https://www.aubier-vosges.fr" },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

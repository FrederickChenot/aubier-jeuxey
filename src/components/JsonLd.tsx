export default function JsonLd({ pricePerNight }: { pricePerNight: number }) {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LodgingBusiness",
        "@id": "https://www.aubier-vosges.fr/#lodging",
        name: "L'Aubier",
        description:
          "Studio 37 m² plain-pied entièrement rénové en 2025 à Jeuxey (Vosges). Lit double 140×190, douche italienne, terrasse privative et jardin japonais, parking inclus.",
        url: "https://www.aubier-vosges.fr",
        address: {
          "@type": "PostalAddress",
          streetAddress: "44a Rue d'Épinal",
          postalCode: "88000",
          addressLocality: "Jeuxey",
          addressCountry: "FR",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 48.1946,
          longitude: 6.4854,
        },
        checkinTime: "16:00",
        checkoutTime: "10:00",
        petsAllowed: false,
        smokingAllowed: false,
        numberOfRooms: 1,
        priceRange: `À partir de ${pricePerNight} € la nuit`,
        amenityFeature: [
          { "@type": "LocationFeatureSpecification", name: "Parking", value: true },
          { "@type": "LocationFeatureSpecification", name: "Climatisation", value: true },
          { "@type": "LocationFeatureSpecification", name: "Terrasse", value: true },
          { "@type": "LocationFeatureSpecification", name: "Jardin japonais", value: true },
        ],
        containsPlace: {
          "@type": "Accommodation",
          name: "Studio L'Aubier",
          numberOfBedrooms: 1,
          occupancy: { "@type": "QuantitativeValue", maxValue: 2 },
          petsAllowed: false,
          smokingAllowed: false,
          floorSize: { "@type": "QuantitativeValue", value: 37, unitCode: "MTK" },
        },
        makesOffer: {
          "@type": "Offer",
          price: String(pricePerNight),
          priceCurrency: "EUR",
          availability: "https://schema.org/InStock",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: String(pricePerNight),
            priceCurrency: "EUR",
            unitCode: "DAY",
          },
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

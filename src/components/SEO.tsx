import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description: string;
  path?: string;
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
  keywords?: string;
  noindex?: boolean;
  structuredData?: Record<string, unknown> | Array<Record<string, unknown>>;
}

const siteName = "TaskFlow Pro";

export const SEO = ({
  title,
  description,
  path = "/",
  image,
  imageAlt,
  type = "website",
  keywords,
  noindex = false,
  structuredData,
}: SEOProps) => {
  const siteUrl =
    import.meta.env.VITE_SITE_URL ||
    (typeof window !== "undefined" ? window.location.origin : "https://example.com");

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const canonicalUrl = `${siteUrl}${normalizedPath}`;
  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  const robotsContent = noindex ? "noindex, nofollow" : "index, follow";

  const templateUrl = import.meta.env.VITE_OG_IMAGE_TEMPLATE_URL;
  const fallbackDynamicImage = `https://dummyimage.com/1200x630/0f172a/e2e8f0.png&text=${encodeURIComponent(
    fullTitle
  )}`;

  const dynamicImageUrl = templateUrl
    ? templateUrl
        .replace("{title}", encodeURIComponent(fullTitle))
        .replace("{description}", encodeURIComponent(description))
        .replace("{siteName}", encodeURIComponent(siteName))
        .replace("{path}", encodeURIComponent(normalizedPath))
        .replace("{url}", encodeURIComponent(canonicalUrl))
    : fallbackDynamicImage;

  const resolvedImage = image ?? dynamicImageUrl;
  const imageUrl = resolvedImage.startsWith("http") ? resolvedImage : `${siteUrl}${resolvedImage}`;
  const resolvedImageAlt = imageAlt ?? `${fullTitle} social preview image`;

  const defaultStructuredData: Array<Record<string, unknown>> = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: siteName,
      url: siteUrl,
      description,
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: fullTitle,
      description,
      url: canonicalUrl,
      isPartOf: {
        "@type": "WebSite",
        name: siteName,
        url: siteUrl,
      },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: imageUrl,
      },
    },
  ];

  const extraStructuredData = structuredData
    ? Array.isArray(structuredData)
      ? structuredData
      : [structuredData]
    : [];

  const combinedStructuredData = [...defaultStructuredData, ...extraStructuredData];

  return (
    <Helmet prioritizeSeoTags>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={robotsContent} />
      {keywords ? <meta name="keywords" content={keywords} /> : null}

      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:alt" content={resolvedImageAlt} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:image:alt" content={resolvedImageAlt} />

      {combinedStructuredData.map((schema, index) => (
        <script key={`jsonld-${index}`} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};

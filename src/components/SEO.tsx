import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
  keywords?: string;
  noindex?: boolean;
}

const siteName = "TaskFlow Pro";

export const SEO = ({
  title,
  description,
  path = "/",
  image = "/og-taskflow.png",
  type = "website",
  keywords,
  noindex = false,
}: SEOProps) => {
  const siteUrl =
    import.meta.env.VITE_SITE_URL ||
    (typeof window !== "undefined" ? window.location.origin : "https://example.com");

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const canonicalUrl = `${siteUrl}${normalizedPath}`;
  const imageUrl = image.startsWith("http") ? image : `${siteUrl}${image}`;
  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  const robotsContent = noindex ? "noindex, nofollow" : "index, follow";

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

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
    </Helmet>
  );
};

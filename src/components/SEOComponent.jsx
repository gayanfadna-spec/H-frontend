import { Helmet } from 'react-helmet-async';

const SEOComponent = ({ title, description, url, image }) => {
  const siteName = "Shopstore.lk";
  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  const defaultDesc = "Discover our exclusive collection of premium accessories designed for the modern connoisseur.";
  
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description || defaultDesc} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url || "https://shopstore.lk"} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || defaultDesc} />
      {image && <meta property="og:image" content={image} />}

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url || "https://shopstore.lk"} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description || defaultDesc} />
      {image && <meta property="twitter:image" content={image} />}
    </Helmet>
  );
};

export default SEOComponent;

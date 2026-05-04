import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

export function GlobalSEO() {
  const location = useLocation();

  return (
    <Helmet>
      {/* Global SEO improvements - Hardcoded to Korean as per user request */}
      <html lang="ko" />
      
      {/* Enhanced mobile meta tags */}
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content="TunisiaTrip" />
      <meta name="application-name" content="TunisiaTrip" />
      <meta name="msapplication-TileColor" content="#1e40af" />
      <meta name="theme-color" content="#1e40af" />
      
      {/* Enhanced robots directives */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1" />
      
      {/* Geographic targeting - Audience (KR) + Content (TN) */}
      <meta name="geo.region" content="KR" />
      <meta name="geo.placename" content="Seoul, South Korea" />
      <meta name="DC.coverage" content="Tunisia" />
      <meta name="ICBM" content="37.5665, 126.9780" />
      
      {/* Content language and charset */}
      <meta httpEquiv="content-language" content="ko" />
      
      {/* Security headers */}
      <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
      <meta httpEquiv="X-Frame-Options" content="DENY" />
      <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
      
      {/* Performance hints */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//images.unsplash.com" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* Sitemap and robots */}
      <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
      
      {/* Alternate language versions - Single version (KO) */}
      <link rel="alternate" hrefLang="ko" href={`https://tunisiatrip.kr${location.pathname}`} />
      <link rel="alternate" hrefLang="x-default" href={`https://tunisiatrip.kr${location.pathname}`} />
      
      {/* Organization structured data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "@id": "https://tunisiatrip.kr/#organization",
          "name": "TunisiaTrip",
          "alternateName": "튀니지 트립",
          "url": "https://tunisiatrip.kr",
          "logo": {
            "@type": "ImageObject",
            "url": "https://tunisiatrip.kr/uploads/72002146-2908-4d85-aabb-31ce43c71062.png",
            "width": 1200,
            "height": 630
          },
          "description": "튀니지 여행정보, 액티비티, 날씨정보를 제공하는 전문 여행 가이드",
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "TN",
            "addressLocality": "튀니스"
          },
          "areaServed": {
            "@type": "Country",
            "name": "Tunisia"
          },
          "knowsAbout": [
            "튀니지 여행",
            "사하라 사막 투어", 
            "튀니지 관광명소",
            "북아프리카 여행",
            "지중해 여행",
            "카르타고 유적",
            "시디 부 사이드"
          ],
          "sameAs": [
            "https://tunisiatrip.kr"
          ]
        })}
      </script>
      
      {/* Website structured data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "@id": "https://tunisiatrip.kr/#website",
          "url": "https://tunisiatrip.kr",
          "name": "TunisiaTrip",
          "description": "튀니지 여행정보, 액티비티, 날씨정보를 한눈에! 사하라 사막부터 지중해 해변까지 완벽한 튀니지 여행 가이드",
          "publisher": {
            "@id": "https://tunisiatrip.kr/#organization"
          },
          "inLanguage": ["ko"],
          "potentialAction": {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": "https://tunisiatrip.kr/?q={search_term_string}"
            },
            "query-input": "required name=search_term_string"
          }
        })}
      </script>
    </Helmet>
  );
}
import React from 'react';

export default function HtmlViwser({ htmlContent }) {
  return <div dangerouslySetInnerHTML={{ __html: htmlContent.length > 70 ? `${htmlContent.substring(0, 70)}. . .`:htmlContent}} />;
}

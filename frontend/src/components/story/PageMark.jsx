import React from 'react';
import { useLocation } from 'react-router-dom';
import ArtifactIcon from './ArtifactIcon';
import { pageFor } from '../../lib/pageStory';

// Small coloured icon + task eyebrow for a page hero (each page owns one moment of the day).
export default function PageMark({ style }) {
  const page = pageFor(useLocation().pathname);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', ...style }}>
      <ArtifactIcon name={page.icon} size={30} tile />
      <span style={{ fontFamily: 'var(--sn-font-body)', fontWeight: 800, fontSize: '.8125rem', letterSpacing: '.08em', textTransform: 'uppercase', color: `var(--sc-${page.tone})` }}>
        {page.task}
      </span>
    </div>
  );
}

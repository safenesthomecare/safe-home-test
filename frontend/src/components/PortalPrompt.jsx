import React, { useEffect, useState } from 'react';
import { X, Users } from 'lucide-react';
import { companyInfo } from '../data/mock';

const KEY = 'portalPromptDismissed';
const SHOW_AFTER_MS = 2500;
const AUTO_HIDE_MS = 25000;

// Temporary floating note pointing new employees to the team portal.
const PortalPrompt = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try { if (sessionStorage.getItem(KEY)) return; } catch (e) { /* storage unavailable */ }
    const show = setTimeout(() => setVisible(true), SHOW_AFTER_MS);
    const hide = setTimeout(() => setVisible(false), SHOW_AFTER_MS + AUTO_HIDE_MS);
    return () => { clearTimeout(show); clearTimeout(hide); };
  }, []);

  const close = () => {
    setVisible(false);
    try { sessionStorage.setItem(KEY, '1'); } catch (e) { /* ignore */ }
  };

  if (!visible) return null;

  return (
    <div className="portal-prompt" role="status" aria-live="polite">
      <div className="portal-prompt-icon" aria-hidden="true"><Users size={20} /></div>
      <p className="portal-prompt-text">
        Are you looking for the team portal? Access it{' '}
        <a href={companyInfo.teamPortalUrl} target="_blank" rel="noopener noreferrer" onClick={close}>here</a>
      </p>
      <button type="button" className="portal-prompt-close" onClick={close} aria-label="Close message">
        <X size={18} />
      </button>
    </div>
  );
};

export default PortalPrompt;

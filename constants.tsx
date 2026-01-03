
import React from 'react';

export const COLORS = {
  primary: '#1a1a1a',
  secondary: '#d4af37', // Gold for that designer feel
  accent: '#7c3aed',
  bg: '#fcfcfc'
};

export const Icons = {
  Send: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
  ),
  Mic: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>
  ),
  Wardrobe: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.38 3.46L16 2.14V2l-4 1.2L8 2v.14l-4.38 1.32a2 2 0 0 0-1.42 1.91V19a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5.37a2 2 0 0 0-1.42-1.91z"></path><path d="M12 5v16"></path><path d="M4 8h16"></path></svg>
  )
};

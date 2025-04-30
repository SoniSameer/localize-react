export const getTitleByRoute = (pathname, viewMode) => {
  // For landing page
  if (pathname === '/') {
    return 'My Library';
  }

  // For localized content page
  if (pathname === '/localised-content') {
    return viewMode === 'advanced' ? 'Compare Drafts' : 'Localised Draft';
  }

  return 'My Library'; // default fallback
}; 
// Prefix public-folder URLs so they work from any address:
// at the site root ("") and under a sub-path such as GitHub Pages ("/safe-home-test").
// CRA fills PUBLIC_URL from the build setting; it is empty for a normal root deploy.
export const asset = (path) => `${process.env.PUBLIC_URL || ''}${path}`;

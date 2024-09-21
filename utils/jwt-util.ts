const isTokenExpired = (token: string | null): boolean => {
  if (!token) return true;

  // Split the token (header, payload, signature)
  const tokenParts = token.split('.');

  if (tokenParts.length !== 3) {
    return true;
  }

  try {
    // Decode the payload from base64
    const payload = JSON.parse(atob(tokenParts[1]));

    // Check for the 'exp' claim and compare it to the current time
    if (payload.exp) {
      const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
      return payload.exp < currentTime; // True if token is expired
    }

    return false; // No expiration claim, treat as non-expired
  } catch (error) {
    return true; // Invalid token
  }
}

export { isTokenExpired };
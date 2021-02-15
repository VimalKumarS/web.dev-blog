class FallbackOnErrorPlugin {
  constructor(fallbackURL) {
    // Pass in a URL that you know is cached.
    this.fallbackURL = fallbackURL;
  }

  fetchDidSucceed({response}) {
    // If the network request returned a 2xx response,
    // just use it as-is.
    if (response.ok) {
      return response;
    };

    // Otherwise, throw an error to trigger handlerDidError.
    throw new Error(`Error response (${response.status})`);
  }

  // Invoked whenever the strategy throws an error during handling.
  handlerDidError() {
    // This will match the cached URL regardless of whether
    // there's any query parameters, i.e. those added
    // by Workbox precaching.
    return caches.match(this.fallbackURL, {
      ignoreSearch: true,
    });
  }
}
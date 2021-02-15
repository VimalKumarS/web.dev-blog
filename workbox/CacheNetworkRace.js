import {Strategy} from 'workbox-strategies';

// Instead of extending an existing strategy,
// this extends the generic Strategy base class.
class CacheNetworkRace extends Strategy {
  // _handle is the standard entry point for our logic.
  _handle(request, handler) {
    // handler is an instance of the StrategyHandler class,
    // and exposes helper methods for interacting with the
    // cache and network.
    const fetchDone = handler.fetchAndCachePut(request);
    const matchDone = handler.cacheMatch(request);

    // The actual response generation logic relies on a "race"
    // between the network and cache promises.
    return new Promise((resolve, reject) => {
      fetchDone.then(resolve);
      matchDone.then((response) => response && resolve(response));

      // Promise.allSettled() is implemented in recent browsers.
      Promise.allSettled([fetchDone, matchDone]).then(results => {
        if (results[0].status === 'rejected' &&
            !results[1].value) {
          reject(results[0].reason);
        }  
      });
    });
  }
}

//Ref-https://web.dev/extending-workbox/
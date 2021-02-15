import { NetworkFirst } from 'workbox-strategies';

class DedupeNetworkFirst extends NetworkFirst {
    constructor(options) {
        super(options);
        // This maps inflight requests to response promises.
        this._requests = new Map();
    }

    // _handle is the standard entry point for our logic.
    async _handle(request, handler) {
        let responsePromise = this._requests.get(request.url);

        if (responsePromise) {
            // If there's already an inflight request, return a copy
            // of the eventual response.
            const response = await responsePromise;
            return response.clone();
        } else {
            // If there isn't already an inflight request, then use
            // the _handle() method of NetworkFirst to kick one off.
            responsePromise = super._handle(request, handler);
            this._requests.set(request.url, responsePromise);
            try {
                const response = await responsePromise;
                return response.clone();
            } finally {
                // Make sure to clean up after a batch of inflight
                // requests are fulfilled!
                this._requests.delete(request.url);
            }
        }
    }
}
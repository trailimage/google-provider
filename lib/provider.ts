import { MapProvider } from '@trailimage/models';
import { MapConfig } from '@toba/map';
import { unlist } from '@toba/tools';
import { IncomingMessage } from 'http';
import { parse } from 'url';
import { GoogleConfig } from '@toba/google-drive';
import { loadTrack } from './track';
import { googleDrive } from './client';

export interface ProviderConfig extends MapConfig {
   api: GoogleConfig;
}

class GoogleProvider extends MapProvider<ProviderConfig> {
   track(postKey: string) {
      return loadTrack(postKey);
   }

   authorizationURL() {
      return Promise.resolve(googleDrive.client.authorizationURL);
   }

   async getAccessToken(req: IncomingMessage) {
      const url = parse(req.url, true);
      const code = unlist(url.query['code'], true);
      return googleDrive.client.getAccessToken(code);
   }
}

/**
 * Google Provider singleton.
 */
export const provider = new GoogleProvider();

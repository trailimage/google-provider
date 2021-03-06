import { MapProvider } from '@trailimage/models'
import { MapConfig } from '@toba/map'
import { unlist } from '@toba/node-tools'
import { IncomingMessage } from 'http'
import { parse } from 'url'
import { GoogleConfig } from '@toba/google-drive'
import { loadTrack, streamGPX } from './track'
import { googleDrive } from './client'
import { Writable } from 'stream'

export interface ProviderConfig extends MapConfig {
   api: GoogleConfig
}

class GoogleProvider extends MapProvider<ProviderConfig> {
   track(postKey: string) {
      return loadTrack(postKey)
   }

   gpx(postKey: string, stream: Writable) {
      return streamGPX(postKey, stream)
   }

   authorizationURL() {
      return Promise.resolve(googleDrive.client.authorizationURL)
   }

   async getAccessToken(req: IncomingMessage) {
      if (req.url === undefined) {
         throw 'Unable to get access token for missing URL'
      }
      const url = parse(req.url, true)
      const code = unlist(url.query['code'], true)

      if (code) {
         return googleDrive.client.getAccessToken(code)
      } else {
         throw 'Unable to retrieve access token code'
      }
   }

   clearCache() {
      return
   }
}

/**
 * Google Provider singleton.
 */
export const provider = new GoogleProvider()

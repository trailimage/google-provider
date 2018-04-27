import { GoogleConfig } from '@toba/google-drive';
import { Config as AuthConfig } from '@toba/oauth';
import { Post, blog } from '@trailimage/models';

/**
 * @see http://code.google.com/apis/console/#project:1033232213688
 */
export const testConfig: GoogleConfig = {
   apiKey: process.env['GOOGLE_DRIVE_KEY'],
   folderID: '0B0lgcM9JCuSbMWluNjE4LVJtZWM',
   useCache: false,
   cacheSize: 0,
   auth: {
      clientID: process.env['GOOGLE_CLIENT_ID'],
      secret: process.env['GOOGLE_SECRET'],
      callback: 'http://localhost/auth/google',
      token: {
         type: null,
         access: process.env['GOOGLE_ACCESS_TOKEN'],
         accessExpiration: null as Date,
         refresh: process.env['GOOGLE_REFRESH_TOKEN']
      }
   } as AuthConfig
};

export const postWithGPX = new Post();
export const postWithoutGPX = new Post();

postWithGPX.title = 'With Nick and Kayla on Mores Mountain';
postWithGPX.key = 'with-gpx';
postWithGPX.id = '1';

postWithoutGPX.title = 'Any title';
postWithoutGPX.key = 'without-gpx';
postWithGPX.id = '2';

blog.addPost(postWithGPX).addPost(postWithoutGPX);
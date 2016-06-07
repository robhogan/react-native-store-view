/* @flow */

import {
  NativeModules,
  NativeAppEventEmitter
} from 'react-native';

const NativeStoreViewManager = NativeModules.RJHStoreViewManager;

//This is needed to ensure that the RCTNativeAppEventEmitter module is registered (even if we're not listening) so that
//sendAppEventWithName does not fail from the native end.
NativeAppEventEmitter;

export type LoadProductParameters = {
  iTunesItemIdentifier: number,
  affiliateToken?: string,
  campaignToken?: string,
  providerToken?: string
}

export default class StoreViewManager {
  static loadProductWithParameters(params: LoadProductParameters): Promise {
    return new Promise((resolve, reject) => {
      NativeStoreViewManager.loadProductWithParameters(params, (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    });
  }

  static presentViewController(animated = true): Promise {
    return new Promise((resolve, reject) => {
      NativeStoreViewManager.presentViewController(animated, (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    });
  }
}

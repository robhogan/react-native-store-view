/* @flow */

import {
  NativeModules,
  NativeAppEventEmitter
} from 'react-native';

const NativeStoreViewManager = NativeModules.RJHStoreViewManager;

type LoadProductParameters = {
  iTunesItemIdentifier: string,
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

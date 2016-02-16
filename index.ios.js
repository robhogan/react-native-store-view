/* @flow */

import { NativeModules } from 'react-native';

var { NativeAppEventEmitter } = require('react-native');

var subscription = NativeAppEventEmitter.addListener(
  'EventReminder',
  (reminder) => console.log(reminder.name)
);

const NativeStoreProductViewManager = NativeModules.RJHStoreViewManager;

type LoadProductParameters = {
  iTunesItemIdentifier: string,
  affiliateToken?: string,
  campaignToken?: string,
  providerToken?: string
}

export class StoreProductViewManager {
  static loadProductWithParameters(params: LoadProductParameters): Promise {
    return new Promise((resolve, reject) => {
      NativeStoreProductViewManager.loadProductWithParameters(params, (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    });
  }

  static presentViewController(animated = true): Promise {
    return new Promise((resolve, reject) => {
      NativeStoreProductViewManager.presentViewController(animated, (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    });
  }
}
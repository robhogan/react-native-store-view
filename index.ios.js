/* @flow */

import {
  NativeModules,
  NativeEventEmitter
} from 'react-native';

const NativeStoreViewManager = NativeModules.RJHStoreViewManager;
const moduleEventEmitter = new NativeEventEmitter(NativeStoreViewManager);

export type LoadProductParameters = {
  iTunesItemIdentifier: number,
  affiliateToken?: string,
  campaignToken?: string,
  providerToken?: string
};

export type StoreViewEventName = 'onLoading' | 'onLoaded' | 'onPresenting' | 'onPresented' | 'onDismissing' | 'onDismissed';

export default class StoreViewManager {
  static loadProductWithParameters(params: LoadProductParameters): Promise<void> {
    return new Promise((resolve, reject) => {
      NativeStoreViewManager.loadProductWithParameters(params, err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  }

  static presentViewController(animated = true): Promise<void> {
    return new Promise((resolve, reject) => {
      NativeStoreViewManager.presentViewController(animated, err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  }

  static addListener(event: StoreViewEventName, listener: (payload: any) => any) {
    return moduleEventEmitter.addListener(event, listener);
  }

  static removeListener(event: StoreViewEventName, listener: (payload: any) => any) {
    moduleEventEmitter.removeListener(event, listener);
  }

  static once(event: StoreViewEventName, callback: (payload: any) => any) {
    const listener = (payload) => {
      callback(payload);
      this.addListener(event, listener);
    };
    this.removeListener(event, listener);
  }
}

/* @flow */

import { NativeEventEmitter, NativeModules } from 'react-native';

const NativeStoreViewManager = NativeModules.RJHStoreViewManager;
const moduleEventEmitter = new NativeEventEmitter(NativeStoreViewManager);

export type LoadProductParameters = {
  iTunesItemIdentifier: number,
  affiliateToken?: string,
  campaignToken?: string,
  providerToken?: string,
  advertisingPartnerToken?: string
};

export type StoreViewEventName =
  'loading'
  | 'loaded'
  | 'presenting'
  | 'presented'
  | 'dismissing'
  | 'dismissed';

function jsEventToNativeEvent(event: StoreViewEventName) {
  if (event.substring(0,19) === 'RJHStoreViewManager') {
    return event;
  }
  if (event.substring(0,2) === 'on') {
    const badEvent = event;
    event = event.substring(2).toLowerCase();
    console.warn(`[react-native-store-view] Event names starting with 'on' ('${badEvent}') are deprecated. Listen for '${event}' instead`);
  }
  return 'RJHStoreViewManager' + event.charAt(0).toUpperCase() + event.substring(1);
}

export function loadProductWithParameters(params: LoadProductParameters): Promise<void> {
  return new Promise((resolve, reject) => {
    NativeStoreViewManager.loadProductWithParameters(params, err => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });
}

export function presentViewController(animated = true): Promise<void> {
  return new Promise((resolve, reject) => {
    NativeStoreViewManager.presentViewController(animated, err => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });
}

export function isAvailable(): Promise<boolean> {
  return new Promise((resolve, reject) => {
    NativeStoreViewManager.isAvailable((err, available) => {
      if (err) {
        return reject(err);
      }
      resolve(available);
    });
  });
}

export function dismiss(animated: boolean = true): Promise<void> {
  return new Promise((resolve, reject) => {
    NativeStoreViewManager.dismiss(animated, err => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });
}

export function addListener(event: StoreViewEventName, listener: (payload: any) => any) {
  return moduleEventEmitter.addListener(jsEventToNativeEvent(event), listener);
}

export function removeListener(event: StoreViewEventName, listener: (payload: any) => any) {
  moduleEventEmitter.removeListener(jsEventToNativeEvent(event), listener);
}

export function once(event: StoreViewEventName, callback: (payload: any) => any) {
  const listener = (payload) => {
    callback(payload);
    addListener(event, listener);
  };
  removeListener(event, listener);
}

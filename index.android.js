/* @flow */

export type LoadProductParameters = {
  iTunesItemIdentifier: number,
  affiliateToken?: string,
  campaignToken?: string,
  providerToken?: string
};

export type StoreViewEventName =
  'loading'
  | 'loaded'
  | 'presenting'
  | 'presented'
  | 'dismissing'
  | 'dismissed';

export function loadProductWithParameters(params: LoadProductParameters): Promise<void> {
  return Promise.reject(new Error('[react-native-store-view] Not available on Android'));
}

export function presentViewController(animated = true): Promise<void> {
  return Promise.reject(new Error('[react-native-store-view] Not available on Android'));
}

export function isAvailable(): Promise<boolean> {
  return Promise.resolve(false);
}

export function dismiss(animated: boolean = true): Promise<void> {
  return Promise.reject(new Error('[react-native-store-view] Not available on Android'));
}

export function addListener(event: StoreViewEventName, listener: (payload: any) => any) {
}

export function removeListener(event: StoreViewEventName, listener: (payload: any) => any) {
}

export function once(event: StoreViewEventName, callback: (payload: any) => any) {
}

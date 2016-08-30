/* @flow */

export type LoadProductParameters = {
  iTunesItemIdentifier: number,
  affiliateToken?: string,
  campaignToken?: string,
  providerToken?: string
};

export type StoreViewEventName = 'onLoading' | 'onLoaded' | 'onPresenting' | 'onPresented' | 'onDismissing' | 'onDismissed';

export default class StoreViewManager {
  static loadProductWithParameters(params: LoadProductParameters): Promise<void> {
    return Promise.reject(new Error('[react-native-store-view] Not available on Android'));
  }

  static presentViewController(animated = true): Promise<void> {
    return Promise.reject(new Error('[react-native-store-view] Not available on Android'));
  }

  static isAvailable(): Promise<boolean> {
    return Promise.resolve(false);
  }

  static dismiss(animated: boolean = true): Promise<void> {
    return Promise.reject(new Error('[react-native-store-view] Not available on Android'));
  }

  static addListener(event: StoreViewEventName, listener: (payload: any) => any) {}

  static removeListener(event: StoreViewEventName, listener: (payload: any) => any) {}

  static once(event: StoreViewEventName, callback: (payload: any) => any) {}
}

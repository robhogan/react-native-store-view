# ReactNativeStoreView

Wraps SKStoreProductViewController to open items in the App Store from within react-native projects.

[![CI Status](https://travis-ci.org/rh389/react-native-store-view.svg?branch=master)](https://travis-ci.org/rh389/react-native-store-view) [![npm version](https://badge.fury.io/js/react-native-store-view.svg)](https://badge.fury.io/js/react-native-store-view)

![Demo gif](https://i.imgur.com/BlFbKmx.gif)

## Installation

### With link
1. `npm install --save react-native-store-view`
2. `react-native link`

### With CocoaPods
1. `npm install --save react-native-store-view`
2. Add `pod 'ReactNativeStoreView', :path => '../node_modules/react-native-store-view'` to your project's `Podfile`, modifying the path as necessary.
3. `pod install`

## API

### isAvailable():Promise<boolean>
Resolves with a boolean indicating whether SKStoreProductViewController is available on the current platform (iOS >= 6.0). Resolves false on Android.

### loadProductWithParameters(params):Promise<void>
Load a product in the background, in preparation for displaying. Resolves when loading is complete, or rejects with an passed-through error if the underlying call fails.

`params` is an object with up to four properties, corresponding to [SKStoreProductViewController's parameters](https://developer.apple.com/library/ios//documentation/StoreKit/Reference/SKITunesProductViewController_Ref/index.html#//apple_ref/doc/constant_group/Product_Dictionary_Keys)
 - `iTunesItemIdentifier` (number, required)
 - `affiliateToken` (string, optional)
 - `campaignToken` (string, optional)
 - `providerToken` (string, optional)
 
### presentViewController(animated:boolean = true):Promise<void>
Display the store view as a modal. Resolve when animation completes.

### dismiss(animated:boolean = true):Promise<void>
Dismiss the store programmatically (not required if the user dismisses the store). Resolve when animation completes.

### addListener(eventName:string, callback:(payload: any) => any)
Add a listener for the given event (see below).

### removeListener(eventName:string, callback:(payload: any) => any)
Removes the specified listener for the specified event. Be sure to pass the same function reference as passed to addListener.

### once(eventName:string, callback:(payload: any) => any)
Calls the callback at most once on the next occurrence of the event. Cleans up after itself if the event fires.

## Events

The module fires events:
 - `onLoading` - Begun loading a product in the background.
 - `onLoaded` - Product loaded and ready to present.
 - `onPresenting` - `presentViewController` has been called.
 - `onPresented` - `presentViewController` has finished animating and the store is now in the foreground.
 - `onDismissing` - Either `dismiss` has been called or the user has pressed `Done`.
 - `onDismissed` - `dismiss` has finished animating and the store is gone from view.

## Example usage

```js
import React, {Component} from "react";
import {Text, View, TouchableHighlight} from "react-native";
import StoreViewManager from "react-native-store-view";

class ReactNativeStoreViewExample extends Component {

  componentDidMount() {
    this.dismissListener = () => { console.log('Store view dismissed'); }
    StoreViewManager.addListener('onDismiss', this.dismissListener);
  }
  
  componentWillUnmount() {
    StoreViewManager.removeListener('onDismiss', this.dismissListener);
  }

  render() {
    return (
      <View>
        <TouchableHighlight onPress={this.onPressButton}>
          <Text>
            Tap here to open the app store
          </Text>
        </TouchableHighlight>
      </View>
    );
  }

  onPressButton() {
    StoreViewManager.loadProductWithParameters({
      iTunesItemIdentifier: 364709193 //The only mandatory parameter is a numeric App Store ID. This one is iBooks.
      //, affiliateToken: 'string'
      //, campaignToken: 'string'
      //, providerToken: 'string'
    })
      .then(() => {
        console.log('SKStoreProductViewController successfully loaded the product over the net, but is not yet displaying anything');
        StoreViewManager.presentViewController();
      })
      .then(() => {
        console.log('SKStoreProductViewController is now modal. When it is dismissed, we\'ll return to this view.');
      })
      .catch((err) => {
        console.error(err);
      });
  }
}
```

See the [`ReactNativeStoreViewExample`](https://github.com/rh389/react-native-store-view/tree/master/ReactNativeStoreViewExample) project for more.

## Known limitations
`SKStoreProductViewController` is *not supported* for use in a simulator environment, and so neither is this module. You'll need to test your application using a real device.

## License
ReactNativeStoreView is available under the MIT license. See the LICENSE file for more info.

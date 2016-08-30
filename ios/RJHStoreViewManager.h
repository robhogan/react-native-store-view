//
//  RJHReactStoreViewManager.h
//  ReactNativeStoreView
//
//  Created by Rob Hogan on 09/02/2016.
//

#import <Foundation/Foundation.h>
#import "RCTBridgeModule.h"
#import "RCTEventEmitter.h"

@import StoreKit;

@interface RJHStoreViewManager : RCTEventEmitter <RCTBridgeModule, SKStoreProductViewControllerDelegate>

@property (nonatomic) SKStoreProductViewController *storeProductView;
@property bool hasListeners;

@end
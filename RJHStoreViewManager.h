//
//  RJHReactStoreViewManager.h
//  ReactNativeStoreView
//
//  Created by Rob Hogan on 09/02/2016.
//  Copyright © 2016 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "RCTBridgeModule.h"

@import StoreKit;

@interface RJHStoreViewManager : NSObject <RCTBridgeModule, SKStoreProductViewControllerDelegate>

@property (nonatomic) SKStoreProductViewController *storeProductView;

@end
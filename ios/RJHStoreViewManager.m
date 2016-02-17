#import "RJHStoreViewManager.h"
#import "RCTUtils.h"
#import "RCTLog.h"
#import "RCTEventDispatcher.h"

@implementation RJHStoreViewManager
@synthesize bridge = _bridge;

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(loadProductWithParameters:(NSDictionary *)args callback: (RCTResponseSenderBlock)callback)
{
    //Validate args
    if ([args objectForKey:@"iTunesItemIdentifier"] == nil ||
        ![[args objectForKey:@"iTunesItemIdentifier"] isKindOfClass:[NSNumber class]]) {
        return callback(@[RCTMakeError(@"Must specify an iTunesItemIdentifier as a number", nil, args)]);
    }

    // Initialize the Store Product View
    self.storeProductView = [[SKStoreProductViewController alloc] init];
    self.storeProductView.delegate = self;

    [self.storeProductView loadProductWithParameters:
        @{
          SKStoreProductParameterITunesItemIdentifier : [args objectForKey:@"iTunesItemIdentifier"],
            SKStoreProductParameterAffiliateToken: [args objectForKey:@"affiliateToken"],
            SKStoreProductParameterCampaignToken: [args objectForKey:@"campaignToken"],
            SKStoreProductParameterProviderToken: [args objectForKey:@"providerToken"]
        } completionBlock:^(BOOL result, NSError *error) {
        if (!result) {
            if (error) {
                callback(@[RCTMakeError(@"Failed to load product.", error, args)]);
            } else {
                callback(@[RCTMakeError(@"Unknown error loading product.", nil, args)]);
            }
        } else {
            callback(@[[NSNull null]]);
        }
    }];
}

RCT_EXPORT_METHOD(presentViewController: (BOOL)animated callback: (RCTResponseSenderBlock)callback)
{
    dispatch_async(dispatch_get_main_queue(),
                   ^{
                       UIViewController *ctrl = [[[[UIApplication sharedApplication] delegate] window] rootViewController];
                       [ctrl presentViewController:self.storeProductView animated:animated completion:^() {
                           if (callback != nil) {
                               callback(@[[NSNull null]]);
                           }
                       }];
                   });
}


RCT_EXPORT_METHOD(isAvailable:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    if ([SKStoreProductViewController class]) {
        // SKStoreProductViewController is available
        return resolve(@true);
    } else {
        return reject(nil, @"[RJHStoreViewManager] SKStoreProductViewController is unavailable.", nil);
    }
}

RCT_EXPORT_METHOD(dismiss)
{
    [self productViewControllerDidFinish:self.storeProductView];
}

-(void)productViewControllerDidFinish:(nonnull SKStoreProductViewController *)controller
{
    [controller dismissViewControllerAnimated:true completion:nil];
    NSLog(@"[RJHStoreViewManager] SKStoreProductViewController dismissed.");

    [self.bridge.eventDispatcher sendAppEventWithName:@"ReactNativeStoreViewOnDismiss" body:nil];
}

@end
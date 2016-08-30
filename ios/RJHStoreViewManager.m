#import <TargetConditionals.h>
#import "RJHStoreViewManager.h"
#import "RCTUtils.h"
#import "RCTLog.h"

@implementation RJHStoreViewManager

RCT_EXPORT_MODULE();

- (dispatch_queue_t)methodQueue
{
    return dispatch_get_main_queue();
}

RCT_EXPORT_METHOD(loadProductWithParameters:(NSDictionary *)args callback: (RCTResponseSenderBlock)callback)
{
    NSError *error = nil;
    NSDictionary* nativeParams = [self transformAndValidateLoadProductParamaters:args error:&error];

    if (nativeParams == nil) {
        return callback(@[error.userInfo]);
    }

    #if TARGET_IPHONE_SIMULATOR
    return callback(@[RCTMakeError(@"ReactNativeStoreView cannot be used in a Simulator.", error, args)]);
    #endif

    // Initialize the Store Product View
    self.storeProductView = [[SKStoreProductViewController alloc] init];
    self.storeProductView.delegate = self;

    if (self.hasListeners) {
        [self sendEventWithName:@"onLoading" body:nil];
    }

    [self.storeProductView loadProductWithParameters: nativeParams completionBlock:^(BOOL result, NSError *error) {
        if (!result) {
            if (error) {
                callback(@[RCTMakeError(@"Failed to load product.", error, args)]);
            } else {
                callback(@[RCTMakeError(@"Unknown error loading product.", nil, args)]);
            }
        } else {
            if (self.hasListeners) {
                [self sendEventWithName:@"onLoaded" body:nil];
            }
            callback(@[[NSNull null]]);
        }
    }];
}

RCT_EXPORT_METHOD(presentViewController: (BOOL)animated callback: (RCTResponseSenderBlock)callback)
{
    UIViewController *rootViewController = RCTPresentedViewController();
    if (self.hasListeners) {
        [self sendEventWithName:@"onPresenting" body:nil];
    }
    [rootViewController presentViewController:self.storeProductView animated:animated completion:^() {
        if (self.hasListeners) {
            [self sendEventWithName:@"onPresented" body:nil];
        }
        if (callback != nil) {
            callback(@[[NSNull null]]);
        }
    }];
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
    [controller dismissViewControllerAnimated:true completion:^{
        if (self.hasListeners) {
            [self sendEventWithName:@"onDismissed" body:nil];
        }
    }];
    NSLog(@"[RJHStoreViewManager] SKStoreProductViewController dismissed.");

    if (self.hasListeners) {
        [self sendEventWithName:@"onDismissing" body:nil];
    }
}

-(NSDictionary *)transformAndValidateLoadProductParamaters:(nonnull NSDictionary *)args error:(NSError **)errorPtr
{
    //Validate args
    if ([args objectForKey:@"iTunesItemIdentifier"] == nil ||
        ![[args objectForKey:@"iTunesItemIdentifier"] isKindOfClass:[NSNumber class]]) {
        *errorPtr = [NSError errorWithDomain:@"ReactNativeStoreView"
                                        code:400
                                    userInfo:RCTMakeError(@"Must specify an iTunesItemIdentifier as a number", nil, args)];
        return nil;
    }

    NSMutableDictionary* nativeParams = [[NSMutableDictionary alloc] initWithCapacity:4];

    [nativeParams setObject: [args objectForKey:@"iTunesItemIdentifier"] forKey: SKStoreProductParameterITunesItemIdentifier];

    if ([args objectForKey:@"affiliateToken"] != nil && [[args objectForKey:@"affiliateToken"] isKindOfClass:[NSString class]]) {
        [nativeParams setObject: [args objectForKey:@"affiliateToken"] forKey: SKStoreProductParameterAffiliateToken];
    }

    if ([args objectForKey:@"campaignToken"] != nil && [[args objectForKey:@"campaignToken"] isKindOfClass:[NSString class]]) {
        [nativeParams setObject: [args objectForKey:@"campaignToken"] forKey: SKStoreProductParameterCampaignToken];
    }

    if ([args objectForKey:@"providerToken"] != nil && [[args objectForKey:@"providerToken"] isKindOfClass:[NSString class]]) {
        [nativeParams setObject: [args objectForKey:@"providerToken"] forKey: SKStoreProductParameterProviderToken];
    }

    return nativeParams;
}

-(void)startObserving {
    self.hasListeners = YES;
}

-(void)stopObserving {
    self.hasListeners = NO;
}

-(NSArray<NSString *> *)supportedEvents {
    return @[@"onLoading",
             @"onLoaded",
             @"onPresenting",
             @"onPresented",
             @"onDismissing",
             @"onDismissed"
    ];
}

@end

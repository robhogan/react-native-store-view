#
# Be sure to run `pod lib lint ReactNativeStoreView.podspec' to ensure this is a
# valid spec before submitting.
#
# Any lines starting with a # are optional, but their use is encouraged
# To learn more about a Podspec see http://guides.cocoapods.org/syntax/podspec.html
#

Pod::Spec.new do |s|
  s.name             = "ReactNativeStoreView"
  s.version          = "0.1.1"
  s.summary          = "A React Native wrapper for SKStoreProductView."
  s.description      = "A React Native wrapper for SKStoreProductView, for iOS App Store interaction from RN apps."
  s.homepage         = "https://github.com/rh389/react-native-store-view.git"
  s.license          = 'MIT'
  s.author           = { "Rob Hogan" => "roberthogan@blueyonder.co.uk" }
  s.source           = { :git => "https://github.com/rh389/react-native-store-view.git", :tag => s.version.to_s }
  s.platform     = :ios, '7.0'
  s.requires_arc = true
  s.source_files = 'ios/RJHStoreViewManager.{h,m}'
  s.public_header_files = 'ios/*.h'
  s.frameworks = 'UIKit', 'StoreKit'
  s.dependency 'React'
end

require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name             = "ReactNativeStoreView"
  s.version          = package["version"]
  s.summary          = "A React Native wrapper for SKStoreProductView."
  s.description      = package["description"]
  s.homepage         = package["homepage"]
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

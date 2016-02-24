'use strict';

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';

import StoreViewManager from 'react-native-store-view';

class ReactNativeStoreViewExample extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={this.onPressButton}>
          <Text style={styles.instructions}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('ReactNativeStoreViewExample', () => ReactNativeStoreViewExample);

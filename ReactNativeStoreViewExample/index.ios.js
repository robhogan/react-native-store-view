/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
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

  componentDidMount() {

  }

  onPressButton() {
    StoreViewManager.loadProductWithParameters({
        iTunesItemIdentifier: 364709193
      })
      .then(() => StoreViewManager.presentViewController())
      .then(() => {
        console.log('SKStoreProductViewController presented')
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

import React, { Component } from "react";
import { ActivityIndicator, AppRegistry, ScrollView, StyleSheet, Text, View, TouchableHighlight } from "react-native";
import StoreViewManager from "react-native-store-view";

type State = {
  loading: boolean;
  log: [string];
  startTime: number;
};

class ReactNativeStoreViewExample extends Component<void, void, State> {
  state: State = {
    loading: false,
    log: [],
    startTime: Date.now()
  };

  listeners: {[key: string]: Function} = {};

  componentDidMount() {
    ['onLoading', 'onLoaded', 'onPresenting', 'onPresented', 'onDismissing', 'onDismissed'].forEach(eventName => {
      this.listeners[eventName] = () => this.log(eventName);
    });
    Object.keys(this.listeners).forEach(event => StoreViewManager.addListener(event, this.listeners[event]));
  };

  componentWillUnmount() {
    Object.keys(this.listeners).forEach(event => StoreViewManager.removeListener(event, this.listeners[event]));
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={() => this.onPressButton()} style={styles.button} underlayColor="#EEE">
          <Text style={styles.instructions}>
            Tap here to open the app store
          </Text>
        </TouchableHighlight>

        <ActivityIndicator
          animating={this.state.loading}
          style={{height: 80}}
          size="large"
        />

        <ScrollView style={styles.log}>
          {this.state.log.map((item, i) => <Text key={i}>{item}</Text>)}
        </ScrollView>
      </View>
    );
  }

  onPressButton() {
    this.setState({ loading: true });
    StoreViewManager.isAvailable()
      .then(available => {
        if (!available) {
          throw new Error('Not available on this platform');
        }
        return StoreViewManager.loadProductWithParameters({
          iTunesItemIdentifier: 364709193 //The only mandatory parameter is a numeric App Store ID. This one is iBooks.
          //, affiliateToken: 'string'
          //, campaignToken: 'string'
          //, providerToken: 'string'
        })
      })
      .then(() => {
        this.setState({ loading: false });
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

  log(eventName: string) {
    this.setState({
      log: this.state.log.concat('+' + ((Date.now() - this.state.startTime) / 1000).toPrecision(4) + 's: ' + eventName)
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
  instructions: {
    textAlign: 'center',
    color: '#333333',
    fontSize: 15
  },
  button: {
    marginTop: 50,
    padding: 5,
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 10,
    height: 50,
    width: 150
  },
  log: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#CCC',
    padding: 5,
    flex: 1,
    marginBottom: 10
  }
});

AppRegistry.registerComponent('ReactNativeStoreViewExample', () => ReactNativeStoreViewExample);

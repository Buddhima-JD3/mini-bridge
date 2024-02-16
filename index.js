const my = {
  // Store for registered callbacks
  callbacks: {},

  // An `initiate` function for easy configuration
  initiate: function (config) {
    Object.keys(config).forEach(function(key) {
      this.registerCallback(key, config[key]);
    }.bind(this)); // bind `this` to the callback function
  },

  registerCallback: function (key, callback) {
    this.callbacks[key] = callback;
  },

  
  // Utility method to call registered callbacks
  callCallback: function (key, data) {
    if (typeof this.callbacks[key] === 'function') {
      this.callbacks[key](data);
    } else {
      console.error(`Callback for '${key}' not registered.`);
    }
  },

  // getMyAuthCode method
  getMyAuthCode: function (data) {
    console.log('Executing getMyAuthCode with data:', data);
    window.flutter_inappwebview.callHandler('my.getAuthCode', data)
      .then(response => {
        this.callCallback('authCodeReceived', "Auth Code Sent to Flutter");
      });
  },

  // mySyncAuthCode method
  mySyncAuthCode: function () {
    window.flutter_inappwebview.callHandler('mySyncAuthCode')
      .then(result => {
        this.callCallback('AuthCode', result.code);
      });
  },

  // getUserConsent method
  getUserConsent: function (data) {
    console.log('myGetUserConsent', data);
    window.flutter_inappwebview.callHandler('my.getUserConsent', data)
      // .then(response => {
      //   this.callCallback('userConsentReceived', "Token Sent to Flutter");
      // });
  },

  // mySyncUserConsent method
  mySyncUserConsent: function () {
    window.flutter_inappwebview.callHandler('mySyncUserConsent')
      .then(result => {
        console.log(JSON.stringify(result));
        // Assuming result is the direct object returned from Flutter
        // and contains the userConsentData property
        this.callCallback('UserConsentData', JSON.stringify(result));
      });
  },

  // tradePay method
  tradePay: function (data) {
    console.log('myTradePay', data);
    window.flutter_inappwebview.callHandler('my.tradePay', data)
      .then(result => {
        this.callCallback('tradePaymentProcessed', result);
      });
  },

  // mySyncTradePay method
  mySyncTradePay: function () {
    window.flutter_inappwebview.callHandler('mySyncTradePay')
      .then(result => {
        this.callCallback('TradePayData', JSON.stringify(result));
      });
  },

  // Setup event listeners for custom events
  setupEventListeners: function () {
    document.addEventListener('mySyncAuthCode', (e) => {
      this.callCallback('syncAuthCodeEvent', e.detail);
    });

    document.addEventListener('mySyncTradePay', (e) => {
      this.callCallback('syncTradePayEvent', e.detail);
    });

    document.addEventListener('mySyncUserConsent', (e) => {
      this.callCallback('userConsentEvent', e.detail);
    });
  }
};

// Initialize event listeners
my.setupEventListeners();

window.my = my;

// Export the `my` object

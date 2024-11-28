# WMA-Bridge Communication

This is a JavaScript library designed to facilitate seamless communication between mini-applications and mobile applications. It provides structured methods to handle authorization codes, user consent data, and trade payment data with callback functions for success and failure scenarios.

## Features

- **Authorization Code Grant**: Retrieve authorization codes seamlessly.
- **User Consent Management**: Efficiently manage user consent data.
- **Trade Payment Integration**: Simplify handling transaction details.
- **Asynchronous Communication**: Use callbacks to handle asynchronous responses.


# Procedures

To use JS bridge, refer to the following steps:

## Step 1: Native Usage

### Use in Plain HTML

```html
<head>
  <script src="https://cdn.jsdelivr.net/gh/Buddhima-JD3/wma-bridge@master/index.js" type="module"></script>
</head>
```
or

### Install JS bridge

Run the following code in the root directory of the mini program project:

```bash
npm install wma-bridge --save
```
For more information about NPM, refer to NPM Package Management.

## Step 2: Use JS bridge

### Use in Plain HTML

To use JS bridge in plain html, you need to import the file   `index.js` from `wma-bridge`.

**Sample code**

```html
<!DOCTYPE html>
<html>
  <head>
    <script src="https://cdn.jsdelivr.net/gh/Buddhima-JD3/wma-bridge@master/index.js" type="module"></script>
  </head>
  <body>
  <button id="getAuthCodeBtn">Get Auth Code</button>

  <script type="module">
    document.addEventListener('DOMContentLoaded', function () {
      if (window.my && typeof my.initiate === 'function') {
        my.initiate({
          'AuthCode': {
            success: function (data) {
              console.log('AuthCode received:', data);
              document.dispatchEvent(new CustomEvent('authCodeSuccess', { detail: data }));
            },
            fail: function (err) {
              console.error('Auth Code Sync Error:', err);
              document.dispatchEvent(new CustomEvent('authCodeFailure', { detail: err }));
            }
          },
        });
      }

      document.getElementById('getAuthCodeBtn').addEventListener('click', function () {
        if (window.my && typeof my.getAuthCode === 'function') {
          const data = {
            clientId: 'clientId',
            redirectUrl: 'redirectUrl'
          };
          my.getAuthCode(data);
        }
      });

    });
  </script>
</body>
</html>
```

or

### Native mini programs

To use JS bridge in native mini programs, you need to import the `wma-bridge` package on the mini program page. Then you can call the JSAPIs exported by the package. To learn more, check the sample code below. 

**Sample code**

```javascript
import { my, syncAuthCode } from 'wma-bridge'

ngOnInit(): void {

    my.initiate({
      [syncAuthCode]: {
        success: (res) => this.customMethod(res),
        fail: (err) => console.error('Custom Error Message', err),
      },
    });
    
    const data = {
      clientId: 'clientId',
      redirectUrl: 'redirectUrl'
    };
    my.getAuthCode(JSON.stringify(data), {
      success: function (res) {
        console.log('Success:', res);
      },
      fail: function (err) {
        console.error('Fail:', err);
      },
    });
  }

```

## Step 3: Method Calling Procedure

### 3.1 my.getAuthCode

Use this API to request the authorization code.

```javascript
import { my } from 'wma-bridge'

    const data = {
          clientId: 'clientId',
          redirectUrl: 'redirectUrl'
        };

    my.getAuthCode(data, {
      success: function (res) {
        console.log('Success:', res);
      },
      fail: function (err) {
        console.error('Fail:', err);
      },
    });
```

#### Input Parameters

| Property | Type     | Required | Description |
|----------|----------|:----------:| ----------|
|   clientId |   String |   Y | ClientId Which is Generated from Server When On-boarding Process |
|   redirectUrl|   String |  Y |  Redirect URL of the Merchant Which is Used in On-boarding Process |

### 3.2 syncAuthCode

Use this API to synchronize the authorization code via this callback. Use the OpenAPI endpoints to exhange the code to a token.

```javascript
import { my, syncAuthCode } from 'wma-bridge'

    my.initiate({
      [syncAuthCode]: {
        success: (res) => this.customMethod(res),
        fail: (err) => console.error('Custom Error Message', err),
      },
    });
```

#### Success Callback Function

| Property | Type     | Required | Description |
|----------|----------|:----------:| ----------|
|   code |   String |   Y | Authorization Code  |

### 3.3 my.getTradePay

Use this API to initiate the payment flow via this callback.

```javascript
import { my } from 'wma-bridge'

    const data = {
          data.orderId = 'orderId';
          data.currencyCode = 'currencyCode';
          data.amount = 'amount',
          data.token = 'token';
        };

    my.getTradePay(data, {
      success: function (res) {
        console.log('Success:', res);
      },
      fail: function (err) {
        console.error('Fail:', err);
      }
    });
```
#### Input Parameters

| Property | Type     | Required | Description |
|----------|----------|:----------:| ----------|
|   orderId |   String |   Y | Merchant Generated OrderId  |
|   currencyCode|   String |  N | Currency Code  |
|   amount|   String |  Y | Total Transaction Amount |
|   token|   String |  Y |  The Token Which is Granted from Authorization Server |

### 3.4 syncTradePayData

Use this API to synchronize payment response details via this callback.

```javascript
import { my, syncTradePayData } from 'wma-bridge'

     my.initiate({
      [syncTradePayData]: {
        success: (res) => this.customMethod(res),
        fail: (err) => console.error('Custom Error Message', err),
      },
    });
```

#### Success Callback Function

| Property | Type     | Required | Description |
|----------|----------|:----------:| ----------|
|   auxNo |   String |   Y | Transaction Reference Number  |


## License
MIT




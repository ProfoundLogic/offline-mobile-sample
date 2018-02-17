/*
 * Example of puimobile_default.js written in Revealing Module Pattern
 */

// Place all end-user code in `pui.mobile`
pui.mobile = (function (ns) {
  var done = null;

  /**
  * Perform sync
  * If any local order data exists, send it to the server, then get back an updated
  * inventory list.
  * @param {object} connection Object containing server URL and port information for this connection.
  * @param {string} connection.name The connection name.
  * @param {string} connection.host The server name or IP address.
  * @param {string} connection.port The port number for this connection.
  * @param {boolean} connection.ssl Use https?
  * @param {string} connection.parm The parameter to use with this connection.
  * @param {string} connection.baseURL A convenience property containing the base URL for this connection, formatted using the above properties (e.g., "https://yourServer:8080")
  * @param {string} connection.syncURL A convenience property containing a formatted `sync` URL (e.g., "https://yourServer:8080/sync?parameter=abc")
  * @param {function} callback Callback function that must be called when the sync process has completed.
  */
  ns.sync = function (connection, callback) {
    var config = {
      headers: { "Content-Type": "application/json" },
      url: connection.syncURL,
      method: "post",
      handler: syncHandler
    };

    // Retrieve order info from local storage
    var orders = getObject("orders");

    if (orders || true) {
      // config.postData = JSON.stringify({ orders: orders });
      config.postData = JSON.stringify({ orders: [{ orid: 1, ordtlid: 1, orprid: 2579, orqty: 1, orprice: 56.73 }] });
    }

    // Send sync request to server
    done = callback;
    ajaxJSON(config);
  }

  /**
  * AJAX sync request handler
  */
  function syncHandler(response) {
    // The response will be an updated Products file, so store it to the
    // device and remove the orders that have already been sent.
    if (response.products) {
      storeObject("products", response.products);
      removeObject("orders");
    }
    done();
  }

  /**
  * Retrieve a JavaScript object from device
  */
  function getObject(key) {
    var obj = window.localStorage.getItem(key);

    return JSON.parse(obj);
  }

  /**
  * Store a JavaScript object to device
  */
  function storeObject(key, obj) {
    window.localStorage.setItem(key, JSON.stringify(obj));
  }

  /**
  * Remove a JavaScript object from device
  */
  function removeObject(key) {
    window.localStorage.removeItem(key);
  }

  return ns;
})(pui.mobile || {});


pui.mobile = (function (ns) {
  ns.run = function () {

  };

  return ns;
})(pui.mobile || {});
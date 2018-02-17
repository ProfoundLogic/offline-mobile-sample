function sync(req, res) {
    // Write out orders if any exist
    if (req.body && req.body.orders) {
        req.body.orders.forEach(function(order) {
            pjs.query("INSERT INTO ORDDTL SET ? WITH NC", order);
        });
        console.log(req.body.orders[0]);
        
    }

    var records = pjs.query("SELECT * FROM PRODUCTSP");
    var products = { products: records };

    console.log(req.body.orders);
    // console.log(products);
    res.send(products);
}

exports.run = sync;

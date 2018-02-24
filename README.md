# Profound UI sample offline app

Working sample code for an offline Profound UI mobile application and its corresponding Node.js web service. When installed, files that make up a simple shopping app will be downloaded from a server to the Profound UI mobile app and then executed in a disconnected,"offline" manner. Products can be purchased with no network connection between the mobile device and the back-end web service. Once a connection is re-established, the queued orders can be sent to the web service, where they will be written to tables on the IBM i.

## Requirements

* The Profound UI mobile app installed from the iOS or Android app store
* Node.js and Profound.js installed either on a PC or IBM i
* An IBM i

## Installation

Follow these instructions to produce a working offline app.

### Profound.js

* Install Node.js and Profound.js, which will provide the web service.  This can be done on either a PC or IBM i.
* Clone this repository into a subfolder in the `modules` folder.
* Copy the relevant `app.post("/sync"...)` line from the included `start.js` file to the actual one in the root Profound.js folder.
* Adjust the `pathlist` property in `config.js` in the root Profound.js folder, using the included `config.js` as a guide. The pathlist should contain both the sample web service module as well as the sample data library that will be created on the IBM i (if they both have the same name, only one pathlist entry is needed).
* Move `puimobile_default.js` and `puimobile_default.json` to the Profound UI "user data" JavaScript folder (`<profound_js>/htdocs/profoundui/userdata/js`).  These files comprise the actual offline app that will be downloaded to the mobile device and run.

### IBM i

* Create a library to contain your sample data, making sure that the library name is included in the `pathlist` property defined in the previous section.
* Create the products, order header, and order detail files, by executing the included `ORDHDR.sql` and `ORDDTL.sql` scripts.  Be sure to edit the scripts to contain your own library name.  SQL scripts can be run either from IBM Access Client Solutions on your PC or by issuing a statement on the IBM i like

```
> RUNSQLSTM SRCSTMF('QSQLSRC/ORDDTL.sql') COMMIT(*NONE) NAMING(*SQL)
```

## Running the offline app

Start the web service from command line by setting your current directory to the Profound.js directory, then issuing this command.

```
node start.js
```

From the Profound UI mobile app, define a connection that points to the Node web service. On the connection configuration screen, slide the `Offline mode` switch to `on`.

TODO: complete instructions, describe sync() and run() functions.
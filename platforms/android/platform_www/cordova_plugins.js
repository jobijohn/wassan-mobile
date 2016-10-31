cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "id": "com.brodysoft.sqlitePlugin.SQLitePlugin",
        "file": "plugins/com.brodysoft.sqlitePlugin/www/SQLitePlugin.js",
        "pluginId": "com.brodysoft.sqlitePlugin",
        "clobbers": [
            "SQLitePlugin"
        ]
    },
    {
        "id": "org.apache.cordova.dialogs.notification",
        "file": "plugins/org.apache.cordova.dialogs/www/notification.js",
        "pluginId": "org.apache.cordova.dialogs",
        "merges": [
            "navigator.notification"
        ]
    },
    {
        "id": "org.apache.cordova.dialogs.notification_android",
        "file": "plugins/org.apache.cordova.dialogs/www/android/notification.js",
        "pluginId": "org.apache.cordova.dialogs",
        "merges": [
            "navigator.notification"
        ]
    },
    {
        "id": "cordova-plugin-inappbrowser.inappbrowser",
        "file": "plugins/cordova-plugin-inappbrowser/www/inappbrowser.js",
        "pluginId": "cordova-plugin-inappbrowser",
        "clobbers": [
            "cordova.InAppBrowser.open",
            "window.open"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "com.brodysoft.sqlitePlugin": "1.0.3",
    "org.apache.cordova.console": "0.2.12",
    "org.apache.cordova.dialogs": "0.2.11",
    "cordova-plugin-inappbrowser": "1.6.0-dev"
};
// BOTTOM OF METADATA
});
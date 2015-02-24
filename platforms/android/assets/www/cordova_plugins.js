cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/com.quantcast.phonegapplugin/www/QuantcastMeasurement.js",
        "id": "com.quantcast.phonegapplugin.QuantcastMeasurementPlugin",
        "clobbers": [
            "window.QuantcastMeasurement"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "com.quantcast.phonegapplugin": "1.1.0",
    "com.google.playservices": "19.0.0"
}
// BOTTOM OF METADATA
});
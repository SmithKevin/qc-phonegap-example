/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
   // Consolidated setup.   This is the easiest way to start the Quantcast SDK.
    onDeviceReady: function() {
        QuantcastMeasurement.setDebugLogging(true);   //Be sure this is not left on in production builds
        QuantcastMeasurement.uploadEventCount(100);   //Setting this value is almost never required.  This is really just for testing
        QuantcastMeasurement.setUpQuantcastMeasurement('0zc5v23gnvnbid2y-hmmzpb10u0ejwb4p', 'User label', ['abel1', 'label2'] );
        
        app.receivedEvent('deviceready');
    },
    
    /***These functions are used if you are using the manual setup.   Except in complex audience labeling, the above consolidated method should be used.  
    /   You should NEVER use both setUpQuantcastMeasurement and beginMeasurementSession.
    */
    onDeviceReadyManual:function() {
        document.addEventListener('pause', app.onPause, false);
        document.addEventListener('resume', app.onResume, false);
        
        QuantcastMeasurement.setDebugLogging(true);
        QuantcastMeasurement.setGeoLocation(true);
        QuantcastMeasurement.uploadEventCount(100);
        QuantcastMeasurement.beginMeasurementSession(app.hashcallback, '1baal30usbrl0ed2-tjb0tbwca3tb5s4r', 'User label', 5 )
        
        app.receivedEvent('deviceready');
        
    },
    
    
    onPause: function() {
        QuantcastMeasurement.pauseMeasurementSession(['label1', 'label2']);
    },
        
    onResume: function() {
        QuantcastMeasurement.resumeMeasurementSession(['label1', 'label2']);
    },
    /*** End manual setup ***/

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },
    
    hashcallback: function(hash){
        alert("SUCCESS: \r\n"+hash );
    },
        
    optOutCallback: function(optedOut){
        alert("IS Opted out: \r\n"+optedOut );
    },
        
    //event logging
    logEvent: function(){
        QuantcastMeasurement.logEvent('ButtonPress', ['label1', 'label2']);
    },
    //updating user identifier.  This is especially useful in measuring cross platform usage of your app.
    //any username or email identifiers are immediately one-way hashed and the original value never leaves the device or is stored.   
    changeUser: function(){
        QuantcastMeasurement.recordUserIdentifier(app.hashcallback, 'username', null);
    },
        
    displayOptOut: function(){
        QuantcastMeasurement.displayUserPrivacyDialog(app.optOutCallback);
    },
        
    goGoogle: function(){
        var ref = window.open('http://google.com', '_blank', 'location=yes');
    }
};

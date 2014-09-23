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
        //console.log("DID IT");
        var buttonClicked = document.getElementById("btn");
        buttonClicked.addEventListener("click", this.getLocation);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },
    
    getLocation: function(){
       
        navigator.geolocation.getCurrentPosition(app.successCallback, app.errorCallback); 
        
    },
							

    successCallback: function(position) {
        var msg = "You are at latitude = " + position.coords.latitude + 
                    " longitude = " + position.coords.longitude;
        alert(msg);
        var gotGeo = document.getElementById("geo");
        gotGeo.innerHTML = "You are at latitude = " + position.coords.latitude + " longitude = " + position.coords.longitude;
      
        var request = XMLHttpRequest();
        request.open("GET", "http://open.mapquestapi.com/geocoding/v1/reverse?" + "key=Fmjtd|luur2hurn0%2Cbg%3Do5-9wasly&location=" +
        position.coords.latitude + "," + position.coords.longitude);
        
            request.onreadystatechange = function() {
                if (request.readyState == 4) {
                    if (request.status == 200 || request.status == 0) {
                        var maps = JSON.parse(request.responseText);
                        console.log(maps.results[0].locations[0].adminArea5);
                        var gotGeo = document.getElementById("geo");
                        
                        gotGeo.innerHTML = maps.results[0].locations[0].adminArea5;
                    }
                }
            },
        request.send();
        
    },

     errorCallback: function(error) {
      alert(error.code);
    },

};

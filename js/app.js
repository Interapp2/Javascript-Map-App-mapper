
var initialMap;
var markers = [];

var ViewModel = function(){
  var self = this;
  self.filteredList = ko.observableArray([]);
  self.siteSelect = ko.observable();

  self.Taiwan = new google.maps.LatLng(24.1875992,120.1553106);

  if (window.matchMedia("(max-width: 500px)").matches||window.matchMedia("(max-height: 500px)").matches) {
    self.Zoom = 7;
    self.Taiwan = new google.maps.LatLng(24.3875992,119.8553106);
    } else {
    self.Zoom = 8;
    self.Taiwan = new google.maps.LatLng(24.1875992,120.1553106);
  }


  initialMap = new google.maps.Map(
    document.getElementById('map'),
    {center: self.Taiwan, zoom:self.Zoom});

   google.maps.event.addDomListener(window, 'resize', function() {
     var newZoom;
     var newLatLng;

     if (window.matchMedia("(min-width: 600px)").matches) {
       newZoom = 8;
       newlatLng = new google.maps.LatLng(24.1875992,120.1553106);
     } else {
       newZoom = 7;
       newlatLng = new google.maps.LatLng(25.1875992,119.2553106);
     }
     initialMap.setZoom(newZoom);
     initialMap.setCenter(newlatLng);
   });

   self.locationList = ko.observableArray([]);

   var Location = function(data) {
      this.title = data.title;
      this.siteType = data.siteType;
      this.location = data.location;
      this.isVisible = ko.observable(true);
      this.marker = ko.observable();
    };

   locations.forEach(function(locationItem) {
     self.locationList.push(new Location(locationItem));
   });

//This function makes individual markers, the for loop create the array of markers

   var makeMarker = function(i){
         // Get the position from the location array.
         var position = self.locationList()[i].location;
         var title = self.locationList()[i].title;
         // Create a marker per location, and put into markers array.
          var marker = new google.maps.Marker({
           position: position,
           title: title,
           animation: google.maps.Animation.DROP,
           id: i,
           });

          marker.addListener('click', function() {
            populateInfoWindow(this, largeInfowindow,self.locationList()[i]);
            marker.setAnimation(google.maps.Animation.BOUNCE);
            setTimeout(function () {marker.setAnimation(null);}, 1400);
           });
        return marker;
     };

   for (var i = 0; i < self.locationList().length; i++) {
        var markers2 = makeMarker(i);

        // Push the marker to our array of markers.
        markers.push(markers2);
        self.locationList()[i].marker = markers2;
        self.locationList()[i].marker.setIcon("img/marker.png");
        self.locationList()[i].marker.setMap(initialMap);
      }

  self.selectedType = ko.observable(siteType[0].option);

//The function create filter list based on type of sites, marker logo also change with selections

  self.filterList = function(clickedKey){
    self.clickedType = ko.observable(clickedKey.option);
    self.mapIcon = clickedKey.icon;
    self.filtering = ko.computed(function() {
       var listItem = self.locationList();
       for (var i = 0; i < listItem.length; i++) {
         if (self.clickedType() === listItem[i].siteType||self.clickedType()==="All Markers") {
           listItem[i].isVisible(true);
           listItem[i].marker.setAnimation(google.maps.Animation.DROP);
           listItem[i].marker.setIcon(self.mapIcon);
           listItem[i].marker.setMap(initialMap);
           }
           else {
           listItem[i].isVisible(false);
           listItem[i].marker.setMap(null);
           }
       }
     });
   };

var largeInfowindow = new google.maps.InfoWindow();

//these function populates the news Screen



//this function toggles between bouncing the markers when clicked or stop the bouncing ones

self.bouncingMarker = function(clickedSite){
    var marker = clickedSite.marker;
    var center = clickedSite.location;
    populateInfoWindow(this.marker, largeInfowindow,clickedSite);
    initialMap.setCenter(center);
    marker.setAnimation(google.maps.Animation.BOUNCE);
    setTimeout(function () {marker.setAnimation(null);}, 1400);
    };
};

var newsPageTitle = ko.observable();

var newsLoadArray = ko.observableArray([]);

//This function populates the infoWindow

self.displayNews = function(index){
  var nytSearch = locations[index].city;
  newsPageTitle('News about '+locations[index].title);

  var nytimeUrl = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q='+nytSearch+'&sort=newest&api-key=06330fd619a64f27a2337e9f8874389e';
  newsLoadArray([]);

   $.getJSON(nytimeUrl,function(data){
   var articles = data.response.docs;
   for (var i=0; i<articles.length; i++){
     var currentArticle = articles[i];
     newsLoadArray.push(currentArticle);
     }
    }).fail(function(e){
     newsPageTitle("Sorry!! We are unable load news articles for this site!");
   });
};

function populateInfoWindow(marker, infowindow) {

    //This is the DOM for the Infowindow
    var infoWindowContentString = '<div id="windowContent">' +
        '<h5 id="title">'+ marker.title + '</H5>' +
        '<div id = "panot" ></div>' +
        '<div id="siteDesc">'+ locations[marker.id].description +'</div>'+
        '</div>';

    newsOnButtonVisible(true);
    newsOnButtonText('News for '+marker.title);

    if (infowindow.marker != marker) {
      // Clear the infowindow content to give the streetview time to load.
      infowindow.setContent('');
      newsScreenVisibleClose();
      infowindow.marker = marker;
      // Make sure the marker property is cleared if the infowindow is closed.
      infowindow.addListener('closeclick', function() {
        infowindow.marker = null;
        newsOnButtonVisible(false);
      });

      var streetViewService = new google.maps.StreetViewService();
      var radius = 50;
      // In case the status is OK, which means the pano was found, compute the
      // position of the streetview image, then calculate the heading, then get a
      // panorama from that and set the options

      var getStreetView = function(data, status) {
        if (status == google.maps.StreetViewStatus.OK) {
          var nearStreetViewLocation = data.location.latLng;
          var heading = google.maps.geometry.spherical.computeHeading(
            nearStreetViewLocation, marker.position);
            infowindow.setContent(infoWindowContentString);
            var panoramaOptions = {
              position: nearStreetViewLocation,
              pov: {
                heading: heading,
                pitch: 30
              }
            };
          var panorama = new google.maps.StreetViewPanorama(
            document.getElementById('panot'), panoramaOptions);
        } else {
          infowindow.setContent('<div>' + marker.title + '</div>' +
            '<div>No Street View for this site was found</div>');
        }

        markerID(marker.id);
/*
        document.getElementById("newsOn").addEventListener("click",function(){
          newsButtonOpen();
        });
*/

      };
      // Use streetview service to get the closest streetview image within
      // 50 meters of the markers position
      streetViewService.getPanoramaByLocation(marker.position, radius, getStreetView);
      // Open the infowindow on the correct marker.
      infowindow.open(initialMap, marker);
    }
}

//The following function open and close menu (and closes news panel before opening menu)

function newsButtonOpen(){
  closeNav();
  newsScreenVisible(true);
  displayNews(markerID());
}

 function openNav() {
     newsScreenVisibleClose();
     mapCentering();

     if (window.matchMedia("(max-width: 500px)").matches) {
       document.getElementById("mySidenav").style.width = "200px";
       } else {
       document.getElementById("mySidenav").style.width = "300px";
     }
 }

 /* Set the width of the side navigation to 0, close menu */
 function closeNav() {
     mapCentering();
     document.getElementById("mySidenav").style.width = "0";
 }


//This function create and show the drop down list
function dropDownFunction() {
   document.getElementById("myDropdown").classList.contains('show');
 }

 function dropDownRemove() {
    document.getElementById("myDropdown").classList.remove('show');
 }

 function newsScreenVisibleClose(){
   newsScreenVisible(false);
   }

function mapCentering(){
   var mapCenter = {lat: 24.1875992, lng: 120.1553106};
   initialMap.setCenter(mapCenter);
 }

function displayErrorMsg(){
  alert("Something went badly wrong, we are unable to load the map to drive this app! Please try again later!");
}

function initApp() {
  ko.applyBindings(new ViewModel());
}

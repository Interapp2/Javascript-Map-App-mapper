# Udacity Neighborhood Map Project - Taiwan Tour Map

This app is the project to demonstrate the use of **knockout.js framework**, the **Google Maps API.**, and a **third party API** (New York Times API in this case). The application is a part of Udacity's Front-End Nanodegree.

This is the third submitted version of the app (updated based on Review no.2).

## Code

**HTML** - `Index.html` contains the DOM and data-bindings using knockout.js.

**JS** - The app is based on 2 created JS files and 2 library JS files

The created JS files include:
- `app.js` (The main application file and the ViewModel)
- `model.js` (Contains the data and model for the file)

The library JS files include:
- `jquery-3.2.1.min.js` (The minified jquery framework)
- `knockout-3.4.2.js` (Knockout framework)

**CSS** - The CSS file, `style.css`, contains the styling framework for the app

## Features and Functions

The app use Google Maps to create a tour map of Taiwan with Taiwan's top sites.

The site is fully responsive and tested for both PC and Mobile (Nexus, Galaxy and iPhones). For mobile device with smaller screens, the infoWindow does not contain streetviews to save space and the map is at a smaller zoom.

You get a full screen Google Map, populated the top tour locations.

You can click open a side menu which will allow you to use a dropdown meny to filter the markers based on:
- `All Markers`
- `Famous Buildings`
- `Natural Wonders`
- `Historical Sites`

Once selected, different markers are used to represent different sites.

When a user click on a site on the list or on a marker, an InfoWindow will be provided with the site's **_street view, a basic description, as well as a button to open up a news panel_** to show news for this site.

The news panel is driven by the New York Times API, and provide the news for the selected site. The News Panel can be closed or closed automatically when a new marker is pressed or the side menu is opened again.

When a site marker is clicked, it will bounce.

The attribution for both Google Maps and New York Times are provided which link to their developer pages.

## APIs

**Google Maps API** drives the map, marker and streetview.

**New York Times API** provides news content to drive the news panel.

## Installation

Clone or download the folder/repo and open the index.html file and enjoy!

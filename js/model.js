  // Create a new blank array for all the listing markers.

 var $nytHeaderElem = $('#nytimes-header');
 var $nytElem = $('#nytimes-articles');

  var locations = [
      {title: 'Taipei 101', siteType: 'Famous Building', location: {lat: 25.0336395, lng: 121.5647513},
      city: "Taipei", description: "The Taipei 101 / TAIPEI 101, formerly known as the Taipei World Financial Center – is a landmark supertall skyscraper in Xinyi District, Taipei, Taiwan."},
      {title: 'Alishan Mountain Forest Reserve', siteType: 'Nature Wonder', location: {lat: 23.508628, lng: 120.8012478},
      city: "Nantou", description: "Alishan National Scenic Area is in central Taiwan. It's dominated by the Alishan Mountains, which feature cloud-ringed peaks and green valleys. The area is home to Tsou aboriginal villages, known for tea production"},
      {title: 'Yehliu GeoPark', siteType: 'Nature Wonder', location: {lat: 25.2063437, lng: 121.6905666},
      city: "Keelung", description: "Yehliu is a cape on the north coast of Taiwan. It’s known for Yehliu Geopark, a landscape of honeycomb and mushroom rocks eroded by the sea. Well-known formations named for their shapes include the Queen’s Head and Dragon’s Head."},
      {title: 'Taroko Gorge', siteType: 'Nature Wonder', location: {lat: 24.1587068, lng: 121.6216297},
      city: "Hualien", description: "Taroko National Park is one of the nine national parks in Taiwan and was named after the Taroko Gorge, the landmark gorge of the park carved by the Liwu River."},
      {title: 'Anping Old Fort', siteType: 'Historical Site', location: {lat: 23.0014852, lng: 120.1602821},
      city: "Tainan", description: "Fort Zeelandia (Chinese: 熱蘭遮城) was a fortress built over ten years from 1624 to 1634 by the Dutch East India Company (VOC), in the town of Anping (Tainan) on the island of Formosa (present-day Taiwan), during their 38-year rule over the western part of that island. "},
      {title: 'National Taichung Theater', siteType:'Famous Building',location: {lat: 24.1629111, lng: 120.6405815},
      city: "Taichung", description: "The National Taichung Theater is an opera house in the Taichung’s 7th Redevelopment Zone of Taichung, Taiwan. The estimated area of the structure is 57,685 square metres."},
      {title: 'Gaomei Wetland', siteType: 'Nature Wonder', location: {lat: 24.3126937, lng: 120.5432196},
      city: "Taichung", description: "Gaomei Wetlands (Chinese: 高美溼地; pinyin: Gāoměi Shīdì), officially Gaomei Wetland Preservation Area is a wetland in Qingshui District, Taichung, Taiwan."},
      {title: 'Lungshan Temple', siteType: 'Historical Site', location: {lat: 25.0371623, lng: 121.4999007},
      city: "Taipei", description: "Lungshan Temple of Manka is a Buddhist temple in Wanhua District, Taipei, Taiwan. The temple was built in Taipei in 1738 by settlers from Fujian during Qing rule in honor of Guanyin."}
    ];

  var filterLocations = [];

  var siteType = [
    {option: "All Markers",icon:"img/marker.png"},
    {option: "Famous Building", icon:"img/building.png"},
    {option: "Nature Wonder",icon:"img/nature.png"},
    {option: "Historical Site",icon:"img/history.png"}
    ];

  var newsScreenVisible = ko.observable(false);
  var newsOnButtonVisible = ko.observable(false);
  var newsOnButtonText = ko.observable();
  var markerID = ko.observable();

  var mapStyles = [
      {
        featureType: 'water',
        stylers: [
          { color: '#19a0d8' }
        ]
      },{
        featureType: 'administrative',
        elementType: 'labels.text.stroke',
        stylers: [
          { color: '#ffffff' },
          { weight: 6 }
        ]
      },{
        featureType: 'administrative',
        elementType: 'labels.text.fill',
        stylers: [
          { color: '#e85113' }
        ]
      },{
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [
          { color: '#efe9e4' },
          { lightness: -40 }
        ]
      },{
        featureType: 'transit.station',
        stylers: [
          { weight: 9 },
          { hue: '#e85113' }
        ]
      },{
        featureType: 'road.highway',
        elementType: 'labels.icon',
        stylers: [
          { visibility: 'off' }
        ]
      },{
        featureType: 'water',
        elementType: 'labels.text.stroke',
        stylers: [
          { lightness: 100 }
        ]
      },{
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [
          { lightness: -100 }
        ]
      },{
        featureType: 'poi',
        elementType: 'geometry',
        stylers: [
          { visibility: 'on' },
          { color: '#f0e4d3' }
        ]
      },{
        featureType: 'road.highway',
        elementType: 'geometry.fill',
        stylers: [
          { color: '#efe9e4' },
          { lightness: -25 }
        ]
      }
    ];

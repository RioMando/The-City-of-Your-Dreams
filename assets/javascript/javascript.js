

var categories = ["Housing", "Cost of Living", "Startups", "Venture Capital", "Travel Conectivity", "Commute", "Business Freedom", "Safety", "Healthcare", "Education", "Environmental Quality", "Economy", "Taxation", "Internet Access", "Leixure & Culture", "Tolerance", "Outdors"];
   	var values = [];
	var citiesScored = [];
	var citiesToDisplay = [];
	var cityScoreAccumulated = 0;
	var cityName = "";
	var totalScore = 0;
	var cityBeenScored = {};
	var i = 0;
    var m = 0;
    var countArrayCities = 0;
    var citiesCounter = true;
    var locationCounter = 0;
 	var displayCity = "";
   	var locs = [];

    var sort = $("#sortable").sortable({ axis: "y", containment: "#ballot", scroll: false });
    var sort1 = $("#sortable").disableSelection();
    $('form').submit(function(e){
        e.preventDefault();
        var dataValue = 1.7;
        
    $('#thedata').val($("#sortable").sortable("serialize"));
    var data = $('#thedata').val();
    var dataSplit = data.split("&");
    $("li").each(function() {
        $(this).attr("data-value", dataValue);
        dataValue = dataValue - .1;
    });
    console.log(dataSplit);
    for (var i = 0; i < dataSplit.length; i++) {
        dataSplit[i] = parseInt(dataSplit[i].substr(dataSplit[i].indexOf("=") + 1, dataSplit[i].length - 1));
        values[dataSplit[i] - 1] = $("#ranking_" + dataSplit[i]).attr("data-value");
    }
    console.log(values);
        return false;
    }); 
	// urban area query
    var uaList = ["aarhus", "adelaide", "albuquerque", "almaty", "amsterdam", "anchorage", "ankara", "asheville", "asuncion", "athens", "atlanta", "auckland", "austin", "baku", "bali", "bangkok", "barcelona", "beijing", "beirut", "belfast", "belgrade", "belize-city", "bengaluru", "berlin", "bern", "birmingham","bogota", "boise", "bologna", "bordeaux", "boston", "boulder", "bozeman", "bratislava", "brisbane", "bristol", "brussels", "bucharest", "budapest", "buenos-aires", "buffalo", "cairo", "calgary", "cambridge", "cape-town", "caracas", "cardiff", "casablanca", "charleston", "charlotte", "chattanooga", "chennai", "chiang-mai", "chicago", "chisinau", "christchurch", "cincinnati", "cleveland", "cluj-napoca", "cologne", "colorado-springs", "columbus", "copenhagen", "cork", "curitiba", "dallas", "dar-es-salaam", "delhi", "denver", "des-moines", "detroit", "doha", "dresden", "dubai", "dublin", "dusseldorf", "edinburgh", "edmonton", "eindhoven", "eugene", "florence", "florianopolis", "fort-collins", "frankfurt", "fukuoka", "gdansk", "geneva", "glasgow", "gothenburg", "grenoble", "guadalajara", "guatemala-city", "halifax", "hamburg", "hannover", "havana", "helsinki", "ho-chi-minh-city", "hong-kong", "honolulu", "houston", "hyderabad", "indianapolis", "innsbruck", "istanbul", "jacksonville", "jakarta", "johannesburg", "kansas-city", "karlsruhe", "kathmandu", "kiev", "kingston", "knoxville", "krakow", "kuala-lumpur", "lagos", "la-paz", "las-palmas-de-gran-canaria", "las-vegas","lausanne", "leipzig", "lille", "lima", "lisbon", "liverpool", "ljubljana", "london", "los-angeles", "louisville", "luxembourg", "lviv", "lyon", "madison", "madrid", "malaga", "malmo", "managua", "manchester", "manila", "marseille", "medellin", "melbourne", "memphis", "mexico-city", "miami", "milan", "milwaukee", "minneapolis-saint-paul", "minsk", "montevideo", "montreal", "moscow", "mumbai", "munich", "nairobi", "nantes", "naples", "nashville", "new-orleans", "new-york", "nice", "nicosia", "oklahoma-city", "omaha", "orlando", "osaka", "oslo", "ottawa", "oulu", "oxford", "palo-alto", "panama", "paris", "perth", "philadelphia", "phnom-penh", "phoenix", "phuket", "pittsburgh", "portland-me", "portland-or", "porto", "porto-alegre", "prague", "providence", "quito", "raleigh", "reykjavik", "richmond", "riga", "rio-de-janeiro", "riyadh", "rochester", "rome", "rotterdam", "saint-petersburg", "salt-lake-city", "san-antonio", "san-diego", "san-francisco-bay-area", "san-jose", "san-juan", "san-luis-obispo", "san-salvador", "santiago", "santo-domingo", "sao-paulo", "sarajevo", "saskatoon", "seattle", "seoul", "seville", "shanghai", "singapore", "skopje", "sofia", "st-louis", "stockholm", "stuttgart", "sydney", "taipei", "tallinn", "tampa-bay-area", "tampere", "tartu", "tashkent", "tbilisi", "tehran", "tel-aviv", "the-hague", "thessaloniki", "tokyo", "toronto", "toulouse", "tunis", "turin", "turku", "uppsala", "utrecht", "valencia", "valletta", "vancouver", "victoria", "vienna", "vilnius", "warsaw", "washington-dc", "wellington", "winnipeg", "wroclaw", "yerevan", "zagreb", "zurich"];

    //storing values
    $("#submit").on("click", function() {
        i = 0;
        m = 0;
        countArrayCities = 0;
        citiesCounter = true;
        locationCounter = 0;
        locs = [];        
        citiesScored = [];
        citiesToDisplay = [];
        citiesBeenScored = [];    
        values = [];
        $("#top10display").empty();
        $("select option:selected").each(function () {
            var selected = $(this).val();
            values.push(selected);
        });
        console.log(values);
    	getScore(countArrayCities);
    });
    	// urban area scores
    function getScore(count) {
        if (count < uaList.length) {
        	var scoreURL = "https://api.teleport.org/api/urban_areas/slug:" + uaList[count] + "/scores/";
			
			$.ajax({
				url: scoreURL,
				method: "GET"
			}).done(function(response) {
				// console.log(response);
				var results = response.categories;
				var score = 0;
				cityScoreAccumulated = 0;
				// console.log(results);
				var summary = response.summary;
				// console.log(summary);
			
				for (var j = 0; j < 17; j++) {
					score = response.categories[j].score_out_of_10;
					cityScoreAccumulated = cityScoreAccumulated + (score * values[j]);
				}// Enf For-Loop j
                countArrayCities++;
                getScore(countArrayCities);
				arrayScoredCities();
			});// End .done()
        }//End if-else

    } //End function getScore()

    // });

    //Function to make the array of the cities with overall and call to organize and locate cities
    function arrayScoredCities() {
        var cityName = uaList[m];
        var totalScore = cityScoreAccumulated;
        var cityBeenScored = {
            city: cityName,
            score: totalScore
        };
        citiesScored.push(cityBeenScored);
        // organizeCities(citiesScored);
        m++;
        if (m == uaList.length && citiesCounter === true) {   // <<<<<<<<<<< LOOK: Return to m === 254 when file is debuged
            console.log("cities");
            organizeCities(); 
            citiesCounter = false;
            cityLocation(locationCounter);
        }
    }; //End of arrayScoredCities

    console.log("Sorted: " , citiesScored);

    // Sorting of the array with bubble sort method
    function organizeCities(){
        console.log(citiesScored);
        var len = citiesScored.length;
        for (var i = len-1; i >= 0; i--){
          for(var j = 1; j <= i; j++){
            if(citiesScored[j-1].score < citiesScored[j].score){
               var temp = citiesScored[j-1];
               citiesScored[j-1] = citiesScored[j];
               citiesScored[j] = temp;
            }
          }
        }
    };

    // urban a location
    function cityLocation(counter) {
        if (counter < 10) {
    	    var locationURL = "https://api.teleport.org/api/urban_areas/slug:" + citiesScored[counter].city + "/";		

	    	$.ajax({
				url: locationURL,
				method: "GET"
			}).done(function(response) {
			//console.log(response);
	       		var latitude = (response.bounding_box.latlon.north + response.bounding_box.latlon.south)/2;
	   		    var longitude = (response.bounding_box.latlon.west + response.bounding_box.latlon.east)/2;
	     		locs.push({lat: latitude, lng: longitude});
	  			// if (locs.length == 10) {
	  			// // console.log("locations" + JSON.stringify(locs));
	  			// // displayTenTopCities();
	  			// // initMap();
	  			// } // End of "if (locs.length"
                locationCounter++;
                cityLocation(locationCounter);
			}); //End of .done 

        } else if (counter >= 10) {
            displayTenTopCities();
            initMap();
        }//End of if-else-if

    } //End of cityLocation

    //Function to display the top 10 cities before the map
    function displayTenTopCities() {
        for (l = 0; l<10; l++) {
            var res = String.fromCharCode(65+l);
            displayCity = (res+". "+citiesScored[l].city + " " + (citiesScored[l].score).toFixed(4)+",   ");
            console.log(displayCity);
            $("#top10display").append(displayCity);
        }
    }//End of displayTenTopCities()

    //Function to display the cities in the map
    function initMap() {
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 2,
            center: {lat: 30.000, lng: 10.000}
        }); // End var map

        // Create an array of alphabetical characters used to label the markers.
        var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

        // Add some markers to the map.
        // Note: The code uses the JavaScript Array.prototype.map() method to
        // create an array of markers based on a given "locations" array.
        // The map() method here has nothing to do with the Google Maps API.
        var markers = locs.map(function(location, i) {
            return new google.maps.Marker({
                position: location,
                label: labels[i % labels.length]
            }); //End return new
        }); // End var markers

        // Add a marker clusterer to manage the markers.
        var markerCluster = new MarkerClusterer(map, markers, {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
    } //End function initMap()



// <!-- google api -->  //
src="https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/markerclusterer.js"


// <!-- render map -->
defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBQRt4CNGQ8gYV01AuKqMSYBbxX1-F7QQ0&callback=initMap"
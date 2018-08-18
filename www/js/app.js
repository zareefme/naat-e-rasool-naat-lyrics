angular.module("naat_e_rasool_naat_lyrics", ["ngCordova","ionic","ionMdInput","ionic-material","ion-datetime-picker","ionic.rating","utf8-base64","angular-md5","chart.js","pascalprecht.translate","tmh.dynamicLocale","ionicLazyLoad","naat_e_rasool_naat_lyrics.controllers", "naat_e_rasool_naat_lyrics.services"])
	.run(function($ionicPlatform,$window,$interval,$timeout,$ionicHistory,$ionicPopup,$state,$rootScope){

		$rootScope.appName = "Naat e Rasool Naat lyrics" ;
		$rootScope.appLogo = "data/images/naatpw.jpg" ;
		$rootScope.appVersion = "1.0" ;
		$rootScope.headerShrink = false ;

		$ionicPlatform.ready(function() {
			//required: cordova plugin add ionic-plugin-keyboard --save
			if(window.cordova && window.cordova.plugins.Keyboard) {
				cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
				cordova.plugins.Keyboard.disableScroll(true);
			}

			//required: cordova plugin add cordova-plugin-statusbar --save
			if(window.StatusBar) {
				StatusBar.styleDefault();
			}
			// this will create a banner on startup
			//required: cordova plugin add cordova-plugin-admobpro --save
			if (typeof AdMob !== "undefined"){
				var admobid = {};
				admobid = {
					banner: "ca-app-pub-1940548373638118/6493325542",
					interstitial: "ca-app-pub-1940548373638118/7415524974",
					rewardvideo: ""
				};
				$timeout(function(){
					
				}, 1000);
			
			
				$timeout(function(){
				}, 30000);
			}

			localforage.config({
				driver : [localforage.WEBSQL,localforage.INDEXEDDB,localforage.LOCALSTORAGE],
				name : "naat_e_rasool_naat_lyrics",
				storeName : "naat_e_rasool_naat_lyrics",
				description : "The offline datastore for Naat e Rasool Naat lyrics app"
			});


			//required: cordova plugin add cordova-plugin-network-information --save
			$interval(function(){
				if ( typeof navigator == "object" && typeof navigator.connection != "undefined"){
					var networkState = navigator.connection.type;
					if (networkState == "none") {
						$window.location = "retry.html";
					}
				}
			}, 5000);

			//required: cordova plugin add onesignal-cordova-plugin --save
			if(window.plugins && window.plugins.OneSignal){
				window.plugins.OneSignal.enableNotificationsWhenActive(true);
				var notificationOpenedCallback = function(jsonData){
					try {
						$timeout(function(){
							$window.location = "#/naat_e_rasool_naat_lyrics/" + jsonData.notification.payload.additionalData.page ;
						},200);
					} catch(e){
						console.log("onesignal:" + e);
					}
				}
				window.plugins.OneSignal.startInit("6141250b-089b-4e5e-b7bd-3f8ba72e44f9").handleNotificationOpened(notificationOpenedCallback).endInit();
			}    


		});
		$ionicPlatform.registerBackButtonAction(function (e){
			if($ionicHistory.backView()){
				$ionicHistory.goBack();
			}else{
				$state.go("naat_e_rasool_naat_lyrics.dashboard");
			}
			e.preventDefault();
			return false;
		},101);
	})


	.filter("to_trusted", ["$sce", function($sce){
		return function(text) {
			return $sce.trustAsHtml(text);
		};
	}])

	.filter("trustUrl", function($sce) {
		return function(url) {
			return $sce.trustAsResourceUrl(url);
		};
	})

	.filter("trustJs", ["$sce", function($sce){
		return function(text) {
			return $sce.trustAsJs(text);
		};
	}])

	.filter("strExplode", function() {
		return function($string,$delimiter) {
			if(!$string.length ) return;
			var $_delimiter = $delimiter || "|";
			return $string.split($_delimiter);
		};
	})

	.filter("strDate", function(){
		return function (input) {
			return new Date(input);
		}
	})
	.filter("strHTML", ["$sce", function($sce){
		return function(text) {
			return $sce.trustAsHtml(text);
		};
	}])
	.filter("strEscape",function(){
		return window.encodeURIComponent;
	})
	.filter("strUnscape", ["$sce", function($sce) {
		var div = document.createElement("div");
		return function(text) {
			div.innerHTML = text;
			return $sce.trustAsHtml(div.textContent);
		};
	}])

	.filter("objLabel", function(){
		return function (obj) {
			var new_item = [];
			angular.forEach(obj, function(child) {
				new_item = [];
				var indeks = 0;
				angular.forEach(child, function(v,l) {
					if (indeks !== 0) {
					new_item.push(l);
				}
				indeks++;
				});
			});
			return new_item;
		}
	})
	.filter("objArray", function(){
		return function (obj) {
			var new_items = [];
			angular.forEach(obj, function(child) {
				var new_item = [];
				var indeks = 0;
				angular.forEach(child, function(v){
						if (indeks !== 0){
							new_item.push(v);
						}
						indeks++;
					});
					new_items.push(new_item);
				});
			return new_items;
		}
	})


.config(["$translateProvider", function ($translateProvider){
	$translateProvider.preferredLanguage("en-us");
	$translateProvider.useStaticFilesLoader({
		prefix: "translations/",
		suffix: ".json"
	});
}])


.config(function(tmhDynamicLocaleProvider){
	tmhDynamicLocaleProvider.localeLocationPattern("lib/ionic/js/i18n/angular-locale_{{locale}}.js");
	tmhDynamicLocaleProvider.defaultLocale("en-us");
})


.config(function($stateProvider, $urlRouterProvider,$sceDelegateProvider,$httpProvider,$ionicConfigProvider){
	try{
		// Domain Whitelist
		$sceDelegateProvider.resourceUrlWhitelist([
			"self",
			new RegExp('^(http[s]?):\/\/(w{3}.)?naat\.pw/.+$'),
			new RegExp('^(http[s]?):\/\/(w{3}.)?youtube\.com/.+$'),
		]);
	}catch(err){
		console.log("%cerror: %cdomain whitelist","color:blue;font-size:16px;","color:red;font-size:16px;");
	}
	$stateProvider
	.state("naat_e_rasool_naat_lyrics",{
		url: "/naat_e_rasool_naat_lyrics",
			abstract: true,
			templateUrl: "templates/naat_e_rasool_naat_lyrics-side_menus.html",
			controller: "side_menusCtrl",
	})

	.state("naat_e_rasool_naat_lyrics.about_us", {
		url: "/about_us",
		views: {
			"naat_e_rasool_naat_lyrics-side_menus" : {
						templateUrl:"templates/naat_e_rasool_naat_lyrics-about_us.html",
						controller: "about_usCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("naat_e_rasool_naat_lyrics.categories", {
		url: "/categories",
		cache:true,
		views: {
			"naat_e_rasool_naat_lyrics-side_menus" : {
						templateUrl:"templates/naat_e_rasool_naat_lyrics-categories.html",
						controller: "categoriesCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("naat_e_rasool_naat_lyrics.dashboard", {
		url: "/dashboard",
		views: {
			"naat_e_rasool_naat_lyrics-side_menus" : {
						templateUrl:"templates/naat_e_rasool_naat_lyrics-dashboard.html",
						controller: "dashboardCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("naat_e_rasool_naat_lyrics.faqs", {
		url: "/faqs",
		views: {
			"naat_e_rasool_naat_lyrics-side_menus" : {
						templateUrl:"templates/naat_e_rasool_naat_lyrics-faqs.html",
						controller: "faqsCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("naat_e_rasool_naat_lyrics.home", {
		url: "/home",
		views: {
			"naat_e_rasool_naat_lyrics-side_menus" : {
						templateUrl:"templates/naat_e_rasool_naat_lyrics-home.html",
						controller: "homeCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("naat_e_rasool_naat_lyrics.naat_alphabet_wise", {
		url: "/naat_alphabet_wise",
		views: {
			"naat_e_rasool_naat_lyrics-side_menus" : {
						templateUrl:"templates/naat_e_rasool_naat_lyrics-naat_alphabet_wise.html",
						controller: "naat_alphabet_wiseCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("naat_e_rasool_naat_lyrics.new_added_naats", {
		url: "/new_added_naats",
		cache:false,
		views: {
			"naat_e_rasool_naat_lyrics-side_menus" : {
						templateUrl:"templates/naat_e_rasool_naat_lyrics-new_added_naats.html",
						controller: "new_added_naatsCtrl"
					},
			"fabButtonUp" : {
						template: '<button id="fab-up-button" ng-click="scrollTop()" class="button button-fab button-fab-bottom-right button-energized-900 spin"><i class="icon ion-arrow-up-a"></i></button>',
						controller: function ($timeout) {
							$timeout(function () {
								document.getElementById("fab-up-button").classList.toggle("on");
							}, 900);
						}
					},
		}
	})

	.state("naat_e_rasool_naat_lyrics.new_added_naats_bookmark", {
		url: "/new_added_naats_bookmark",
		views: {
			"naat_e_rasool_naat_lyrics-side_menus" : {
						templateUrl:"templates/naat_e_rasool_naat_lyrics-new_added_naats_bookmark.html",
						controller: "new_added_naats_bookmarkCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("naat_e_rasool_naat_lyrics.new_added_naats_singles", {
		url: "/new_added_naats_singles/:id",
		cache:false,
		views: {
			"naat_e_rasool_naat_lyrics-side_menus" : {
						templateUrl:"templates/naat_e_rasool_naat_lyrics-new_added_naats_singles.html",
						controller: "new_added_naats_singlesCtrl"
					},
			"fabButtonUp" : {
						template: '<button id="fab-up-button" ng-click="scrollTop()" class="button button-fab button-fab-bottom-right button-energized-900 spin"><i class="icon ion-arrow-up-a"></i></button>',
						controller: function ($timeout) {
							$timeout(function () {
								document.getElementById("fab-up-button").classList.toggle("on");
							}, 900);
						}
					},
		}
	})

	.state("naat_e_rasool_naat_lyrics.new_naat_youtube", {
		url: "/new_naat_youtube",
		cache:false,
		views: {
			"naat_e_rasool_naat_lyrics-side_menus" : {
						templateUrl:"templates/naat_e_rasool_naat_lyrics-new_naat_youtube.html",
						controller: "new_naat_youtubeCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("naat_e_rasool_naat_lyrics.new_naat_youtube_singles", {
		url: "/new_naat_youtube_singles/:snippetresourceIdvideoId",
		cache:false,
		views: {
			"naat_e_rasool_naat_lyrics-side_menus" : {
						templateUrl:"templates/naat_e_rasool_naat_lyrics-new_naat_youtube_singles.html",
						controller: "new_naat_youtube_singlesCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("naat_e_rasool_naat_lyrics.popular_naats", {
		url: "/popular_naats",
		cache:false,
		views: {
			"naat_e_rasool_naat_lyrics-side_menus" : {
						templateUrl:"templates/naat_e_rasool_naat_lyrics-popular_naats.html",
						controller: "popular_naatsCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("naat_e_rasool_naat_lyrics.popular_naats_singles", {
		url: "/popular_naats_singles/:snippetresourceIdvideoId",
		cache:false,
		views: {
			"naat_e_rasool_naat_lyrics-side_menus" : {
						templateUrl:"templates/naat_e_rasool_naat_lyrics-popular_naats_singles.html",
						controller: "popular_naats_singlesCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("naat_e_rasool_naat_lyrics.popular_naats_singles_singles", {
		url: "/popular_naats_singles_singles/:snippetresourceIdvideoId",
		cache:false,
		views: {
			"naat_e_rasool_naat_lyrics-side_menus" : {
						templateUrl:"templates/naat_e_rasool_naat_lyrics-popular_naats_singles_singles.html",
						controller: "popular_naats_singles_singlesCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("naat_e_rasool_naat_lyrics.post_bookmark", {
		url: "/post_bookmark",
		cache:false,
		views: {
			"naat_e_rasool_naat_lyrics-side_menus" : {
						templateUrl:"templates/naat_e_rasool_naat_lyrics-post_bookmark.html",
						controller: "post_bookmarkCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("naat_e_rasool_naat_lyrics.post_singles", {
		url: "/post_singles/:id",
		cache:true,
		views: {
			"naat_e_rasool_naat_lyrics-side_menus" : {
						templateUrl:"templates/naat_e_rasool_naat_lyrics-post_singles.html",
						controller: "post_singlesCtrl"
					},
			"fabButtonUp" : {
						template: '<button id="fab-up-button" ng-click="scrollTop()" class="button button-fab button-fab-bottom-right button-energized-900 spin"><i class="icon ion-arrow-up-a"></i></button>',
						controller: function ($timeout) {
							$timeout(function () {
								document.getElementById("fab-up-button").classList.toggle("on");
							}, 900);
						}
					},
		}
	})

	.state("naat_e_rasool_naat_lyrics.posts", {
		url: "/posts/:categories",
		cache:true,
		views: {
			"naat_e_rasool_naat_lyrics-side_menus" : {
						templateUrl:"templates/naat_e_rasool_naat_lyrics-posts.html",
						controller: "postsCtrl"
					},
			"fabButtonUp" : {
						template: '<button id="fab-up-button" ng-click="scrollTop()" class="button button-fab button-fab-bottom-right button-energized-900 spin"><i class="icon ion-arrow-up-a"></i></button>',
						controller: function ($timeout) {
							$timeout(function () {
								document.getElementById("fab-up-button").classList.toggle("on");
							}, 900);
						}
					},
		}
	})

	.state("naat_e_rasool_naat_lyrics.radio", {
		url: "/radio",
		views: {
			"naat_e_rasool_naat_lyrics-side_menus" : {
						templateUrl:"templates/naat_e_rasool_naat_lyrics-radio.html",
						controller: "radioCtrl"
					},
			"fabButtonUp" : {
						template: '<button id="fab-up-button" ng-click="scrollTop()" class="button button-fab button-fab-bottom-right button-energized-900 spin"><i class="icon ion-arrow-up-a"></i></button>',
						controller: function ($timeout) {
							$timeout(function () {
								document.getElementById("fab-up-button").classList.toggle("on");
							}, 900);
						}
					},
		}
	})

	.state("naat_e_rasool_naat_lyrics.radio_bookmark", {
		url: "/radio_bookmark",
		views: {
			"naat_e_rasool_naat_lyrics-side_menus" : {
						templateUrl:"templates/naat_e_rasool_naat_lyrics-radio_bookmark.html",
						controller: "radio_bookmarkCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("naat_e_rasool_naat_lyrics.radio_naats", {
		url: "/radio_naats",
		views: {
			"naat_e_rasool_naat_lyrics-side_menus" : {
						templateUrl:"templates/naat_e_rasool_naat_lyrics-radio_naats.html",
						controller: "radio_naatsCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("naat_e_rasool_naat_lyrics.radio_singles", {
		url: "/radio_singles/:id",
		cache:false,
		views: {
			"naat_e_rasool_naat_lyrics-side_menus" : {
						templateUrl:"templates/naat_e_rasool_naat_lyrics-radio_singles.html",
						controller: "radio_singlesCtrl"
					},
			"fabButtonUp" : {
						template: '<button id="fab-up-button" ng-click="scrollTop()" class="button button-fab button-fab-bottom-right button-energized-900 spin"><i class="icon ion-arrow-up-a"></i></button>',
						controller: function ($timeout) {
							$timeout(function () {
								document.getElementById("fab-up-button").classList.toggle("on");
							}, 900);
						}
					},
		}
	})

	.state("naat_e_rasool_naat_lyrics.recent_added_naats", {
		url: "/recent_added_naats",
		views: {
			"naat_e_rasool_naat_lyrics-side_menus" : {
						templateUrl:"templates/naat_e_rasool_naat_lyrics-recent_added_naats.html",
						controller: "recent_added_naatsCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("naat_e_rasool_naat_lyrics.save_naats", {
		url: "/save_naats",
		views: {
			"naat_e_rasool_naat_lyrics-side_menus" : {
						templateUrl:"templates/naat_e_rasool_naat_lyrics-save_naats.html",
						controller: "save_naatsCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("naat_e_rasool_naat_lyrics.slide_tab_menu", {
		url: "/slide_tab_menu",
		views: {
			"naat_e_rasool_naat_lyrics-side_menus" : {
						templateUrl:"templates/naat_e_rasool_naat_lyrics-slide_tab_menu.html",
						controller: "slide_tab_menuCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("naat_e_rasool_naat_lyrics.users", {
		url: "/users",
		views: {
			"naat_e_rasool_naat_lyrics-side_menus" : {
						templateUrl:"templates/naat_e_rasool_naat_lyrics-users.html",
						controller: "usersCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("naat_e_rasool_naat_lyrics.youtube", {
		url: "/youtube",
		cache:false,
		views: {
			"naat_e_rasool_naat_lyrics-side_menus" : {
						templateUrl:"templates/naat_e_rasool_naat_lyrics-youtube.html",
						controller: "youtubeCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("naat_e_rasool_naat_lyrics.youtube_singles", {
		url: "/youtube_singles/:snippetresourceIdvideoId",
		cache:false,
		views: {
			"naat_e_rasool_naat_lyrics-side_menus" : {
						templateUrl:"templates/naat_e_rasool_naat_lyrics-youtube_singles.html",
						controller: "youtube_singlesCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	$urlRouterProvider.otherwise("/naat_e_rasool_naat_lyrics/dashboard");
});

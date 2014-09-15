'use strict';

angular.module('flickrReaderApp', [
  'ngResource',
  'ngRoute',
  'ui.router',
  'ngSanitize',
  'angular-loading-bar',
  'ngAnimate',
  'anim-in-out'
])

  .config(['$stateProvider','$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.when("", "/flickr/list");

    // For any unmatched url, send to /flickr/list
    $urlRouterProvider.otherwise("/flickr/list");

    $stateProvider
      .state('flickr', {

        // create abstract view to make data available for children
        abstract: true,
        url: '/flickr',
        templateUrl: './views/flickr.html',
        controller: 'flickrContentCtrl',
        resolve: {

          // String value resolves to service
          dataService: 'dataService',

          // service is executed by ui-router and value returned to controller as topicsnew
          topics: ['dataService', function (dataService) {
            return dataService.
              getData().
              then(function(data){
                return data
              }, function(err){
                console.log(err)
              });
          }]
        }
      })

      .state('flickr.list', {
        url: '/list',

        // loaded into ui-view of parent's template
        templateUrl: './views/flickr.list.html',
        onEnter: function () {
          console.log("enter state flickr.list");
        }
      })

      .state('flickr.detail', {
        url: '/:id',

        // loaded into ui-view of parent's template
        templateUrl: './views/flickr.detail.html',

        // resolve data so user can access detail state via outside url
        resolve: {
          data: ['topics', function(topics){
            return topics.data;
          }]
        },

        controller: ['$scope', '$stateParams', '$state', 'data', function ($scope, $stateParams, $state, data) {
          $scope.item = data.items[$stateParams.id];

          // when url is unknown or item does not exist jump to flickr.list state
          if (!$scope.item){$state.go("flickr.list")}
        }],

        onEnter: ['$location', '$anchorScroll', function ($location, $anchorScroll) {
          console.log("enter state flickr.detail");

          // set position anchorScroll is supposed to jump to
          $location.hash('top');

          // call $anchorScroll() to jump to top of detail page
          $anchorScroll();
        }]
      })
  }])
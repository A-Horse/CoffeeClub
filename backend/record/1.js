var myapp = angular.module('myApp', ['leaflet-directive']);

myapp.directive('popup', ['$http', '$compile', function($http, $compile) {
    return {
        restrict: 'E',
        scope: {
            estacao: "="
        },
        templateUrl: 'popup.html'
    };
}]);

myapp.controller('PredictionCtrl',
    function($http, $scope, ServicoEstacoes) {
        var promiseEstacoes = ServicoEstacoes.getEstacoes();
        $scope.markers = [];
        promiseEstacoes.then(function(estacoes) {
            $scope.estacoes = estacoes.estacoes;
            var i = 0;
            angular.forEach($scope.estacoes, function(estacao) {
                $scope.markers.push({
                    lat: estacao.latitude, 
                    lng: estacao.longitude, 
                    getMessageScope: function() { return $scope; },
                    message: "<popup estacao='estacoes[" + i + "]'></popup>"
                });
                i++;
            });
        });
        angular.extend($scope, {
            poaCenter: {
                lat: -30.035,
                lng: -51.17,
                zoom: 12
            }
        });
    }
);

myapp.factory('ServicoEstacoes', function($http, $q) {
    return {
        getEstacoes: function() {
            var d = $q.defer();
            var url = 'data.json';
            var saida = { estacoes: [], estacaoSelecionada: null };
            $http.get(url)
            .success(function(estacoes){
                angular.forEach(estacoes, function(estacao) {
        					if (saida.estacaoSelecionada === null) {
        						saida.estacaoSelecionada = estacao.estacao;
        					}
        					saida.estacoes.push(estacao);
                });
                d.resolve(saida);
            })
            .error(function(msg, code) {
                d.reject(msg);
            });
            return d.promise;
        }
    };
});

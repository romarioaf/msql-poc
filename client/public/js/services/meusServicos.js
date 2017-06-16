angular.module('msqlpoc')
.service('CompartilharDadosService', function() {
    var microservice = {};

    var setMicro = function(micro) {
        console.log(micro);
        microservice = micro;
    }

    var getMicro = function(){
        return microservice;
    }

    return {
        setMicro: setMicro,
        getMicro: getMicro
    };
});



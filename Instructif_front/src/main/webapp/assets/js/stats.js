$(document).ready(function() {

    var mapContainer = document.getElementById("etablissementsList");
    var mapContainer2 = document.getElementById('lowIpsList');

    mapContainer.style.width = '100%';
    mapContainer.style.height = '400px';

    mapContainer2.style.width = '100%';
    mapContainer2.style.height = '400px';

    const mapListeEtablissements = new ol.Map({
        target: mapContainer,
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM(),
            }),
        ],
        view: new ol.View({
            center: [0, 0],
            zoom: 2,
        }),
    });

    const mapIPSBas = new ol.Map({
        target: mapContainer2,
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM(),
            }),
        ],
        view: new ol.View({
            center: [0, 0],
            zoom: 2,
        }),
    });

    $.ajax({
        type: 'GET',
        url: 'action-servlet?todo=stats', // Replace with the correct URL to your Java EE servlet
        data: {
            todo: 'stats'
        },
        dataType: 'json'
    })
        .done(function(response) {
            console.log('Response', response);

            $('#elevesInscrits').html(response.nbEleve);
            $('#coursAujd').html(response.nbCours);
            $('#demandesSoutien').html(response.nbDemandes);
            $('#ipsBas').html(response.nbIPS);

            $('#etabEleves').html(response.etabEleves);

        })
        .fail(function(error) {
            console.log('Error', error);
            alert("Erreur lors de l'appel AJAX");
        })
        .always(function () {

        });
});
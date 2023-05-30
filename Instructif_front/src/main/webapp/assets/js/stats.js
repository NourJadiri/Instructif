$(document).ready(function() {

    $.ajax({
        type: 'POST',
        url: 'action-servlet?todo=stats', // Replace with the correct URL to your Java EE servlet
        data: {
            todo: 'stats'
        },
        dataType: 'json'
    })
        .done(function(response) {
            console.log('Response', response);

            $('#nbEleve').html(response.nbEleve);
            $('#nbCours').html(response.nbCours);
            $('#nbDemandes').html(response.nbDemandes);
            $('#nbIPS').html(response.nbIPS);
            $('#etabEleves').html(response.etabEleves);

        })
        .fail(function(error) {
            console.log('Error', error);
            alert("Erreur lors de l'appel AJAX");
        })
        .always(function () {

        });
});
$(document).ready(function() {
    initNiveaux();
    // Handle form submission
    $('#bouton-inscription').click(function(event) {
        event.preventDefault(); // Prevent the default form submission

        // Retrieve form data
        var email = $('#email').val().trim();
        var password = $('#password').val().trim();
        var firstName = $('#firstName').val().trim();
        var lastName = $('#lastName').val().trim();
        var code = $('#code').val().trim();
        var classId = $('#class').val();
        var dateOfBirth = $('#date').val();

        if(email === '' || password === '' || firstName === '' || lastName === '' || code === '' || dateOfBirth === '')
        {
            $("#error-message").empty().append("Tous les champs sont à remplir obligatoirement.");
            return;
        }

        console.log(`${email} - ${password}`);

        // Create data object
        var data = {
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName,
            code: code,
            class: classId,
            date: dateOfBirth
        };

        // Send AJAX request to your servlet endpoint
        $.ajax({
            type: 'POST',
            url: 'action-servlet?todo=inscription', // Replace with the URL of your servlet endpoint
            data: data,
            success: function(response) {
                if(response.inscription === true){
                    console.log(`Inscription effectuée avec succès`)
                    window.location.href = 'login.html'
                }
                else{
                    var errorMessage = $('<p>').text("Echec de l'inscription")
                    $('#error-message').empty().append(errorMessage);
                    console.log("Echec");
                }
            },
            error: function() {
                // Handle error response from the servlet
                console.log("non")
            }
        });
    });
});

function initNiveaux(){
    let niveauxList = $("#class");

    $.ajax({
        type: "GET",
        url: "action-servlet?todo=afficher-niveaux",
        dataType: "json",

        success: function(response){

            let niveaux = response.niveaux;

            $.each(niveaux, function(index, niveau){
                var option = $('<option></option>').val(niveau.id).html(niveau.nom);
                $('#class').append(option);
            });
        },

        error: function(){
            console.log("Error loading student classes");
        }
    })

}
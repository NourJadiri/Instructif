$(document).ready(function() {
    // Handle form submission
    $('#bouton-connexion').click(function(e) {
        e.preventDefault(); // Prevent the form from submitting normally

        // Get the form values
        var email = $('#login').val();
        var password = $('#password').val();

        // Create an AJAX request
        $.ajax({
            type: 'POST',
            url: 'action-servlet?todo=connexion', // Replace with the correct URL to your Java EE servlet
            data: {
                login: email,
                password: password
            },
            success: function(response) {
                console.log(response)
                if(response.connexion === true){
                    window.location.href = 'demandeDeCours.html'
                    console.log(`Authentication : ${response.eleve}`)
                }
                else{
                    var errorMessage = $('<p>').text('Mauvais email ou mot de passe').css('color', 'var(--bs-warning)');
                    $('#error-message').empty().append(errorMessage);
                    $('login').val('')
                    $('password').val('')
                    console.log("Echec de l'authentification")
                }
            },
            error: function() {
                // Handle any errors that occur during the AJAX request
                console.log('Login failed');
            }
        });
    });
});
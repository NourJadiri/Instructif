$(document).ready(function() {
    // Handle form submission
    $('#bouton-inscription').click(function(event) {
        event.preventDefault(); // Prevent the default form submission

        // Retrieve form data
        var email = $('#email').val();
        var password = $('#password').val();
        var firstName = $('#firstName').val();
        var lastName = $('#lastName').val();
        var code = $('#code').val();
        var classId = $('#class').val();
        var dateOfBirth = $('#date').val();

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
                if(response.inscription === 'true'){
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
                // For example, show an error message to the user
                console.log("non")
            }
        });
    });
});
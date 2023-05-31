$(document).ready(function() {

    if (window.location.href === "http://localhost:8080/Instructif_front_war/demandeDeCours.html"){
        $.ajax({
            type: 'POST',
            url: `action-servlet?todo=afficher-matieres`, // Replace with the correct URL to your Java EE servlet
            success: function(response) {
                $('#error-message').empty();
                console.log(response);
                //console.log(window.location.href);
                var matieres = $('#optionsList');
                response.matieres.forEach(function (matiere) {
                    var option = document.createElement('option');
                    option.setAttribute("value", matiere.id);
                    option.innerHTML = matiere.nom;
                    matieres.append(option);
                })
            },
            error: function() {
                // Handle any errors that occur during the AJAX request
                console.log("Erreur dans l'affichage des matieres");
            }
        });
    }

    $("#bouton-demande").click(function (e) {
        e.preventDefault();

        var matiere = document.getElementById("optionsList").value;
        var message = document.getElementById("message").value;
        console.log(matiere, message)

        $.ajax({
            type: "POST",
            url: `action-servlet?todo=demande-de-cours`,
            data : {
                matiere : matiere,
                message : message,
            },
            success: function (response){
                $('#error-message').empty();
                console.log(response.cours)

                if (response.cours != null) {
                    var img = document.createElement("img");
                    img.src = "assets/img/products/1.jpg";
                    img.alt = "ayayaya"

                    $('#visio').empty();

                    $("#visio").append(img);

                    var intervenantNameDiv = document.createElement("div");
                    $(intervenantNameDiv).css(
                        {
                            "margin-right": "10%",
                            "margin-left": "10%",
                        }
                    )

                    var intervenantInfo = $("<p>");

                    $(intervenantInfo).val( `${response.cours.intervenant.prenom} ${response.cours.intervenant.nom}`);// changer par nom + prenom de l'intervenant

                    $(intervenantInfo).addClass("text-center fw-bold text-success mb-2");
                    $(intervenantNameDiv).append($(intervenantInfo));

                    // On vide la div visio

                    $("#visio").append($(intervenantNameDiv));

                    console.log(response.cours.intervenant)

                    var bouton = document.createElement("button");
                    bouton.value = "raccrocher";
                    document.getElementById("visio").appendChild(bouton);

                    // rendre le bouton et les zones de textes non cliquable pendant une consultation
                    $('#optionsList, #message, button[type="submit"]').prop('disabled', true);
                }
                else {
                    document.getElementById("formulaire").innerHTML += "Aucun Enseignant n'est disponible pour le moment, merci de réessayer dans 15 minutes"
                }
            },
            error: function () {
                console.log("Echec de la demande")
            }
        })
    })


function checkForCours(){

}

});
$(document).ready(function() {

    if (window.location.href === "http://localhost:8080/InstructIF/demandeDeCours.html"){
        $.ajax({
            type: 'POST',
            url: `action-servlet?todo=afficher-matieres`, // Replace with the correct URL to your Java EE servlet
            success: function(response) {
                $('#error-message').empty();
                //console.log(window.location.href);
                var matieres = document.getElementById("optionsList");
                response.matieres.forEach(function (matiere){
                    var option = document.createElement('option');
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
                if (response.cours!=null) {
                    var img = document.createElement("img");
                    img.src = "assets/img/products/1.jpg";
                    img.alt = "ayayaya"
                    document.getElementById("visio").innerHTML = response.cours.intervenant ;// changer par nom + prenom de l'intervenant
                    document.getElementById("visio").appendChild(img);
                    console.log(response.cours.intervenant)

                    var bouton = document.createElement("button")
                    bouton.value = "raccrocher";
                    document.getElementById("visio").appendChild(bouton);
                    // rendre le bouton et les zones de textes non cliquable pendant une consultation
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



});
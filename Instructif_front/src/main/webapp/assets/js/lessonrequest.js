$(document).ready(function() {

    $.ajax({
        type: 'GET',
        url: `action-servlet?todo=afficher-matieres`,
        dataType: "json",

        success: function(response) {
            $('#error-message').empty();
            //console.log(window.location.href);
            var matieres = document.getElementById("optionsList");

            response.matieres.forEach(function (matiere){
                var option = $('<option></option>').val(matiere.id).html(matiere.nom);
                $('#optionsList').append(option);
            })
        },
        error: function() {
            // Handle any errors that occur during the AJAX request
            console.log("Erreur dans l'affichage des matieres");
        }
    });

    $("#bouton-demande").click(function (e) {
        e.preventDefault();
        let matiere = document.getElementById("optionsList").value;
        let message = document.getElementById("message").value;
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
                    localStorage.setItem('cours_actuel_id', response.cours.id)
                    let img = document.createElement("img");
                    img.src = "assets/img/products/1.jpg";
                    img.alt = "ayayaya"

                    $('#visio').empty();

                    $(`#visio`).append(img);

                    let bouton = document.createElement("button");
                    bouton.value = "raccrocher";
                    bouton.id = "bouton_raccrocher";
                    bouton.innerText = "Test";
                    document.getElementById("visio").appendChild(bouton);
                    let intervenantNameDiv = document.createElement("div");

                    $(intervenantNameDiv).css(
                        {
                            "margin-right": "10%",
                            "margin-left": "10%",
                        }
                    )
                    let intervenantInfo = document.createElement('p')
                    intervenantInfo.innerText = response.cours.intervenant.prenom + " " + response.cours.intervenant.nom
                    $(intervenantInfo).addClass("text-center fw-bold text-success mb-2");

                    $(intervenantNameDiv).append($(intervenantInfo));
                    // On vide la div visio

                    $("#visio").append($(intervenantNameDiv));

                    localStorage.setItem("nomIntervenant", response.cours.intervenant.nom)


                    localStorage.setItem("prenomIntervenant", response.cours.intervenant.prenom)

                    // rendre le bouton et les zones de textes non cliquable pendant une consultation
                    $("#bouton-demande").prop("disabled",true);
                    $("#message").prop("disabled",true);
                    terminerVisio();
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
    checkForCours()
    terminerVisio()

});
function checkForCours() {
    let cours_actuel_id = localStorage.getItem('cours_actuel_id')
    console.log(cours_actuel_id)
    if (cours_actuel_id != null) {
        let img = document.createElement("img");
        img.src = "assets/img/products/1.jpg";
        img.alt = "ayayaya"

        $('#visio').empty();

        $(`#visio`).append(img);

        let bouton_raccrocher = document.createElement("button");
        bouton_raccrocher.value = "raccrocher";
        bouton_raccrocher.id = "bouton_raccrocher"
        bouton_raccrocher.innerText = "Test";

        // il faut rajouter un eleme,t d'image

        document.getElementById("visio").appendChild(bouton_raccrocher);

        let nomIntervenant = localStorage.getItem("nomIntervenant");
        let prenomIntervenant = localStorage.getItem("prenomIntervenant");

        let intervenantNameDiv = document.createElement("div");

        $(intervenantNameDiv).css(
            {
                "margin-right": "10%",
                "margin-left": "10%",
            }
        )
        let intervenantInfo = document.createElement('p')

        intervenantInfo.innerText = prenomIntervenant + " " + nomIntervenant
        $(intervenantInfo).addClass("text-center fw-bold text-success mb-2");

        $(intervenantNameDiv).append($(intervenantInfo));
        // On vide la div visio

        $("#visio").append($(intervenantNameDiv));

        // rendre le bouton et les zones de textes non cliquable pendant une consultation
        $('#optionsList, #message, button[type="submit"]').prop('disabled', true);
    }
}

function terminerVisio(){
    $("#bouton_raccrocher").click(function () {
        $.ajax({
            type: 'POST',
            url: `action-servlet?todo=terminerVisio`,
            success: function (response) {
                $('#error-message').empty();
                console.log(response);
                let notation = $("#notation")
                notation.show();
                let note;
                const etoiles = $(".etoiles");
                etoiles.each(function(){
                    $(this).click(function () {
                        note = $(this)[0].value;
                        console.log(note);
                    })
                });
                $('#envoyernote').click(function (){
                    $.ajax({
                        type:'POST',
                        url: `action-servlet?todo=noterCours`,
                        data: { note : note },
                        success: function (response) {

                        },
                        error: function (){
                            console.log("Erreur lors de la notation")
                        }
                    })
                })
            },
            error: function () {
                // Handle any errors that occur during the AJAX request
                console.log("Erreur lors de la fin du cours");
            }
        })
        localStorage.clear()
    })
}

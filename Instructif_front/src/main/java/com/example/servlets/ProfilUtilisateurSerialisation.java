package com.example.servlets;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import metiers.Eleve;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;

public class ProfilUtilisateurSerialisation extends Serialisation{
    @Override
    public void serialize(HttpServletRequest request, HttpServletResponse response) throws IOException {
        JsonObject container = new JsonObject();
        HttpSession session = request.getSession(false);

        Eleve eleve = (Eleve)session.getAttribute("eleve");
        JsonObject jsonEleve = new JsonObject();
        boolean success = false;

        if(eleve != null){
            success = true;
            jsonEleve.addProperty("id",eleve.getId());
            jsonEleve.addProperty("prenom",eleve.getPrenom());
            jsonEleve.addProperty("nom",eleve.getNom());
            jsonEleve.addProperty("username",eleve.getMail());

            JsonObject jsonEtablissement = new JsonObject();
            jsonEtablissement.addProperty("code",eleve.getEtablissement().getCodeEtablissement());
            jsonEtablissement.addProperty("nom",eleve.getEtablissement().getNom());
            jsonEtablissement.addProperty("commune",eleve.getEtablissement().getCommune());

            jsonEleve.add("etablissement",jsonEtablissement);
        }

        String operation = request.getParameter("todo");
        container.addProperty(operation, success);

        container.add("eleve",jsonEleve);

        System.out.println(container);

        PrintWriter out = this.getWriter(response);
        Gson gson = new GsonBuilder().setPrettyPrinting().serializeNulls().create();

        gson.toJson(container, out);
        out.close();
    }
}

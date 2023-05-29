package com.example.servlets;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import metiers.Etablissement;

public class StatsSerialisation extends Serialisation{
    @Override
    public void serialize(HttpServletRequest request, HttpServletResponse response) throws IOException {
        JsonObject container = new JsonObject();

        long nbEleve = (long)request.getAttribute("nbEleve");
        long nbCours = (long)request.getAttribute("nbCours");
        long nbDemandes = (long)request.getAttribute("nbDemandes");
        long nbIPS = (long)request.getAttribute("nbIPS");
        List<Etablissement> etabEleves = (List<Etablissement>)request.getAttribute("etabEleves");

        container.addProperty("nbEleve", nbEleve);
        container.addProperty("nbCours", nbCours);
        container.addProperty("nbDemandes", nbDemandes);
        container.addProperty("nbIPS", nbIPS);
        container.addProperty("etabEleves", etabEleves.get(0).toString());
        
        PrintWriter out = this.getWriter(response);
        Gson gson = new GsonBuilder().setPrettyPrinting().serializeNulls().create();
        gson.toJson(container, out);
        out.close();
    }
}
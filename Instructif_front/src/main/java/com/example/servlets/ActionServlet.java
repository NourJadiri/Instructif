package com.example.servlets;

import dao.JpaUtil;
import views.DemanderCoursSerialisation;
import views.MatiereSerialisation;
import views.ProfilEleveSerialisation;
import views.ProfilEnseignantSerialisation;
import views.StatsSerialisation;

import java.io.*;
import javax.servlet.ServletException;
import javax.servlet.http.*;
import javax.servlet.annotation.*;

@WebServlet(name = "actionservlet", value = "/action-servlet")
public class ActionServlet extends HttpServlet {
    private String message;

    public void init() throws ServletException {
        super.init();
        JpaUtil.creerFabriquePersistance();
    }

    public void service(HttpServletRequest request, HttpServletResponse response) throws IOException {
        request.getSession();

        //System.out.println("TEST Appel au servlet de login");
        response.setContentType("text/html");
        String todo = request.getParameter("todo");
        System.out.println("Trace : todo = " + todo);
        switch(todo){
            case "connexion-eleve":
                new AuthentifierEleveAction().execute(request);
                new ProfilEleveSerialisation().serialize(request,response);
                break;
            case "connexion-enseignant":
                new AuthentifierEnseignantAction().execute(request);
                new ProfilEnseignantSerialisation().serialize(request, response);
                break;
            case "inscription":
                new InscriptionEleveAction().execute(request);
                new ProfilEleveSerialisation().serialize(request, response);
                break;
            case "stats":
                new StatsAction().execute(request);
                new StatsSerialisation().serialize(request, response);
                break;
            case "afficher-matieres":
                new DemanderCoursAction().listMatiere(request);//changer pour une fonction de la classe ou changer de classe
                new MatiereSerialisation().serialize(request,response);
                break;
            case "demande-de-cours":
                new DemanderCoursAction().execute(request);
                new DemanderCoursSerialisation().serialize(request,response);
                break;
        }
    }

    public void destroy() {
        JpaUtil.fermerFabriquePersistance();
        super.destroy();
    }
}
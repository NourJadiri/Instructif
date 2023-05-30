package com.example.servlets;

import metiers.Cours;
import metiers.Eleve;
import metiers.Matiere;
import metiers.Message;
import views.MatiereSerialisation;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;

public class DemanderCoursAction extends Action{

    @Override
    public void execute(HttpServletRequest request) {
        Long matiereId = null;
        HttpSession session = request.getSession(false);
        Eleve eleve = (Eleve) session.getAttribute("eleve");
        System.out.println(eleve.toString());
        String matiere = request.getParameter("matiere");
        String message = request.getParameter("message");
        List<Matiere> matieres = sc.toutesMatiere();
        for (Matiere m : matieres) {
            if (m.getNomMatiere().equals(matiere)){
                matiereId = m.getId();
            }
        }
        Cours cours = sc.effectuerDemandeCours(eleve, matiereId, message);
        if (cours != null) {
            session.setAttribute("cours",cours);
        } else {
            System.out.println("Demande refusé");
            session.setAttribute("cours", null);
        }
    }

    public void listMatiere(HttpServletRequest request){
        List<Matiere> matieres = sc.toutesMatiere();
        request.setAttribute("matieres", matieres);
    }
}

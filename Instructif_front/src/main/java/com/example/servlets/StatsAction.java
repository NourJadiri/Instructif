package com.example.servlets;

import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import metiers.Etablissement;
import metiers.Service;

public class StatsAction extends Action{

    @Override
    public void execute(HttpServletRequest request) {
        Service s = new Service();
        
        long nbEleve = s.compterEleves();
        long nbCours = s.compterCoursDuJours();
        long nbDemandes = s.compterCoursTotal();
        long nbIPS = s.compterElevesIpsBas(81);
        List<Etablissement> etabEleves = s.listeTousEtablissements();
        
        request.setAttribute("nbEleve", nbEleve);
        request.setAttribute("nbCours", nbCours);
        request.setAttribute("nbDemandes", nbDemandes);
        request.setAttribute("nbIPS", nbIPS);
        request.setAttribute("etabEleves", etabEleves);
    }
}
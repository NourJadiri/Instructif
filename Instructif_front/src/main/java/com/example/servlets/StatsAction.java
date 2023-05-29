package com.example.servlets;

import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import metiers.Etablissement;
import metiers.Service;

public class StatsAction extends Action{

    @Override
    public void execute(HttpServletRequest request) {
        
        long nbEleve = sc.compterEleves();
        long nbCours = sc.compterCoursDuJours();
        long nbDemandes = sc.compterCoursTotal();
        long nbIPS = sc.compterElevesIpsBas(81);
        List<Etablissement> etabEleves = sc.listeTousEtablissements();
        
        request.setAttribute("nbEleve", nbEleve);
        request.setAttribute("nbCours", nbCours);
        request.setAttribute("nbDemandes", nbDemandes);
        request.setAttribute("nbIPS", nbIPS);
        request.setAttribute("etabEleves", etabEleves);
    }
}
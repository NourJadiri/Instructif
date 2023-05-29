package com.example.servlets;

import metiers.Eleve;
import metiers.Intervenant;
import metiers.Service;

import javax.persistence.criteria.CriteriaBuilder;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Objects;

public class AuthentifierEleveAction extends Action{

    @Override
    public void execute(HttpServletRequest request) {

        String accountType = request.getParameter("accountOption");

        HttpSession session = request.getSession(false);
        String login = request.getParameter("login");
        String password = request.getParameter("password");

        Eleve eleve = sc.authentificationEleve(login, password);

        if(eleve != null){
            session.setAttribute("eleve" , eleve);
        }else{
            System.out.println("Echec de l'authentification");
            session.setAttribute("eleve", null);
        }

    }

}

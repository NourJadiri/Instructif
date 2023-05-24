package com.example.servlets;

import metiers.Eleve;
import metiers.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

public class AuthentifierEleveAction extends Action{
    Service sc = new Service();
    @Override
    public void execute(HttpServletRequest request) {
        Service sc = new Service();

        String login = request.getParameter("login");
        String password = request.getParameter("password");

        Eleve eleve = sc.authentificationEleve(login , password);

        if(eleve != null){
            request.setAttribute("eleve" , eleve);
            System.out.println(eleve);
        }else{
            System.out.println("Echec de l'authentification");
        }
    }
}

package com.example.servlets;

import metiers.Cours;
import metiers.Intervenant;

import javax.persistence.criteria.CriteriaBuilder;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

public class CoursIntervenantEnAttente extends Action{
    @Override
    public void execute(HttpServletRequest request) {
        HttpSession session = request.getSession(false);

        Intervenant intervenant = (Intervenant) session.getAttribute("intervenant");

        Cours coursActuel = intervenant.getCoursActuel();

        session.setAttribute("coursActuel",coursActuel);
    }
}

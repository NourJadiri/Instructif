package com.example.servlets;

import dao.JpaUtil;

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

        System.out.println("TEST Appel au servlet de login");
        response.setContentType("text/html");
        String todo = request.getParameter("todo");
        System.out.println("Trace : todo = " + todo);
        switch(todo){
            case "connexion":
                new AuthentifierEleveAction().execute(request);
                new ProfilUtilisateurSerialisation().serialize(request,response);
                break;
            case "inscription":
                new InscriptionEleveAction().execute(request);
                new ProfilUtilisateurSerialisation().serialize(request, response);
                break;
        }
    }

    public void destroy() {
        JpaUtil.fermerFabriquePersistance();
        super.destroy();
    }
}
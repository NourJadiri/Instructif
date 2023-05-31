package com.example.servlets;

import dao.JpaUtil;
import metiers.Eleve;
import metiers.Service;

import java.util.List;

public class Main {
    public static void main(String[] args) {

    }

    public static void annulerCours(Eleve eleve){
        JpaUtil.creerFabriquePersistance();
        Service sc = new Service();
        sc.terminerVisio(eleve.getCoursActuel());
        JpaUtil.fermerFabriquePersistance();
    }
}

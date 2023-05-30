package views;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import metiers.Eleve;
import metiers.Intervenant;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Objects;

public class ProfilEnseignantSerialisation extends Serialisation{
    @Override
    public void serialize(HttpServletRequest request, HttpServletResponse response) throws IOException {
        HttpSession session = request.getSession(false);

        Gson gson = new GsonBuilder().setPrettyPrinting().serializeNulls().create();
        JsonObject container = new JsonObject();

        Intervenant intervenant = (Intervenant) session.getAttribute("intervenant");
        String intervenantString;
        boolean success = !(intervenant == null);

        container.addProperty("connexion", success);
        if(intervenant != null){
            intervenantString = gson.toJson(intervenant);
            JsonObject jsonIntervenant = JsonParser.parseString(intervenantString).getAsJsonObject();
            container.add("intervenant", jsonIntervenant);
        }


        // On ecrit sur le flux de sortie
        PrintWriter out = this.getWriter(response);
        gson.toJson(container, out);

        System.out.println(container);
    }
}

package views;

import com.google.gson.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import metiers.Etablissement;

public class StatsSerialisation extends Serialisation{
    @Override
    public void serialize(HttpServletRequest request, HttpServletResponse response) throws IOException {
        JsonObject container = new JsonObject();
        JsonArray etablissementsArray = new JsonArray();
        Gson gson = new GsonBuilder().setPrettyPrinting().serializeNulls().create();

        long nbEleve = (long)request.getAttribute("nbEleve");
        long nbCours = (long)request.getAttribute("nbCours");
        long nbDemandes = (long)request.getAttribute("nbDemandes");
        long nbIPS = (long)request.getAttribute("nbIPS");

        List<Etablissement> etabEleves = (List<Etablissement>)request.getAttribute("etabEleves");

        container.addProperty("nbEleve", nbEleve);
        container.addProperty("nbCours", nbCours);
        container.addProperty("nbDemandes", nbDemandes);
        container.addProperty("nbIPS", nbIPS);

        for(Etablissement etab : etabEleves){
            String etablissementString = gson.toJson(etab);

            JsonObject jsonEtablissement = JsonParser.parseString(etablissementString).getAsJsonObject();

            etablissementsArray.add(jsonEtablissement);
        }

        container.add("etablissements", etablissementsArray);

        PrintWriter out = this.getWriter(response);
        gson.toJson(container, out);
        out.close();
    }
}
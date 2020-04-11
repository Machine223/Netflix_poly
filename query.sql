-- Query -- Liste des requêtes à implanter

SET search_path TO schema_films;

-- 1. Affichez toutes les informations sur un film spécifié par 
-- l'utilisateur (selon le titre).

-- SELECT * 
-- FROM Film
-- WHERE Film.titre LIKE ${titleName}; --faire une fonction

CREATE OR REPLACE FUNCTION infoFilm(arg VARCHAR(40)) 
RETURNS TRIGGER AS $infoFilm$
BEGIN
    SELECT *
    FROM Film
    WHERE Film.titre = $arg;
END;
$infoFilm$ LANGUAGE plpgsql;

-- 2. Pour chaque genre de film, listez tous les titres de films ainsi que la dernière date à laquelle
-- un film a été acheté(DVD) ou visionné
-- Q/R forum : sortie souhaité  -- Comédie, la grande vadrouille, 10/03/2020
-- SELECT à utiliser CASES




-- 3. Pour chaque genre de film, trouvez les noms et courriels des membres qui les ont visionnés 
-- le plus souvent. Par exemple, Amal Z est le membre qui a visionné le plus de documentaires
-- animaliers

SELECT Film.genre, MAX(Membre.courriel), Membre.nom
FROM Membre, VisionnementFilm, Film
WHERE Membre.membreID = VisionnementFilm.membreID AND VisionnementFilm.filmID = Film.filmID
GROUP BY Film.genre, Membre.nom;

-- 4. Trouvez le nombre total de films groupés par réalisateur.

SELECT P.nom, COUNT(F.filmID) as TotalFilmsRealisateur
FROM Participation R, Personne P, Film F
WHERE R.personneID = P.personneID AND R.filmID = F.filmID AND R.typeRole = 'réalisateur'
GROUP BY P.nom;

-- 5. Trouvez les noms des membres dont le coût total d’achat de DVD est plus élevé que la
-- moyenne.

SELECT Membre.nom , SUM(AchatDVD.cout) somme
FROM Membre, AchatDVD
WHERE Membre.membreID = AchatDVD.membreID
GROUP BY Membre.nom
HAVING SUM(AchatDVD.cout) > (
    SELECT AVG(somme) FROM(
        SELECT SUM(AchatDVD.cout) AS somme
        FROM AchatDVD, Membre
        WHERE Membre.membreID = AchatDVD.membreID
        GROUP BY Membre.membreID
    ) AS inner_query
);

-- 6. Ordonnez et retournez les films en termes de quantité totale vendue (DVD) et en nombre de
-- visionnements.





-- 7. Trouvez le titre et le prix des films qui n’ont jamais été commandés sous forme de DVD mais
-- qui ont été visionnés plus de 10 fois.
-- Q/R forum :Requête 7: En fait, même le DVD n'a pas de prix, selon l'étude de cas. Donc oui, pour répondre à la requête 7, il semble raisonnable d'ajouter un attribut prix au film.

SELECT DISTINCT Film.title, Film




-- 8. Trouvez le nom et date de naissance des acteurs qui jouent dans les films qui sont visionnés
-- le plus souvent (soit plus que la moyenne)
-- Q/R forum : Requête 8: La requête indique clairement la date de naissance. Donc ce que vous devez vous demander, c'est si c'est une bonne idée de stocker l'âge d'un acteur, et sinon, quelle serait votre solution pour 
-- faire une bonne modélisation ET répondre à la requête.






-- 9. Trouvez le nom du ou des réalisateurs qui ont réalisé les films qui ont le plus grand nombre
-- de nominations aux oscars. Par exemple, Woody Allen et Steven Spielberg ont réalisé 10
-- films qui ont été nominés aux oscars.





-- 10. Trouvez le nom des réalisateurs qui ont été le plus souvent nominés aux oscars mais qui
-- n’ont jamais gagné d’oscar






-- 11. Trouvez les films (titre, année) qui ont gagné le plus d’oscars. Listez également leur
-- réalisateurs et leurs acteurs






-- 12. Quelles paires de femmes québécoises ont le plus souvent travaillé ensemble dans différents
-- films ?






-- 13. Comment a évolué la carrière de Woody Allen ? (On veut connaitre tous ses rôles dans un
-- film (réalisateur, acteur, etc.) du plus ancien au plus récent)



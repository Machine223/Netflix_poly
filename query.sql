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
 
SELECT Film.genre, Film.titre,
(CASE 
    WHEN VisionnementFilm.dateVisionnement > AchatDVD.dateEnvoi
    THEN VisionnementFilm.dateVisionnement
    ELSE AchatDVD.dateEnvoi 
    END
) AS date_Achat_Visionnment   
FROM Film , VisionnementFilm, DVD, AchatDVD
WHERE   VisionnementFilm.filmID = Film.filmID 
AND     VisionnementFilm.filmID = DVD.filmID
AND     DVD.dvdID = AchatDVD.dvdID
ORDER BY date_Achat_Visionnment;



-- 3. Pour chaque genre de film, trouvez les noms et courriels des membres qui les ont visionnés 
-- le plus souvent. Par exemple, Amal Z est le membre qui a visionné le plus de documentaires
-- animaliers

SELECT Film.genre, MAX(Membre.courriel), Membre.nom
FROM Membre, VisionnementFilm, Film
WHERE Membre.membreID = VisionnementFilm.membreID AND VisionnementFilm.filmID = Film.filmID
GROUP BY Film.genre, Membre.nom;

-- 4. Trouvez le nombre total de films groupés par réalisateur.

SELECT P.nom, COUNT(F.filmID) AS TotalFilmsRealisateur
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

SELECT Film.titre, COUNT(Film.filmID) AS total_DVD_Visionnement
FROM Film, AchatDVD, DVD
WHERE Film.filmID = DVD.filmID AND DVD.filmID = AchatDVD.dvdID
GROUP BY Film.titre
UNION ALL
SELECT Film.titre, COUNT(Film.filmID) AS total_DVD_Visionnement
FROM Film, VisionnementFilm
WHERE Film.filmID = VisionnementFilm.filmID
GROUP BY Film.titre
ORDER BY total_DVD_Visionnement;

-- 7. Trouvez le titre et le prix des films qui n’ont jamais été commandés sous forme de DVD mais
-- qui ont été visionnés plus de 10 fois.
-- Q/R forum :Requête 7: En fait, même le DVD n'a pas de prix, selon l'étude de cas. 
-- Donc oui, pour répondre à la requête 7, il semble raisonnable d'ajouter un attribut prix au film.

SELECT Film.titre, VisionnementFilm.cout 
FROM Film, VisionnementFilm
WHERE Film.filmID = VisionnementFilm.filmID AND Film.filmID NOT IN (
    SELECT DVD.filmID
    FROM AchatDVD , DVD
    WHERE DVD.filmID = AchatDVD.dvdID
)
GROUP BY Film.titre, VisionnementFilm.cout 
HAVING COUNT(VisionnementFilm.filmID)>10;


-- 8. Trouvez le nom et date de naissance des acteurs qui jouent dans les films qui sont visionnés
-- le plus souvent (soit plus que la moyenne)
-- Q/R forum : Requête 8: La requête indique clairement la date de naissance. Donc ce que vous devez vous demander, c'est si c'est une bonne idée de stocker l'âge d'un acteur, et sinon, quelle serait votre solution pour 
-- faire une bonne modélisation ET répondre à la requête.

-- TODO: Faire la date de naissance a place de l'age
SELECT Personne.nom, Personne.age,
FROM Personne NATURAL JOIN(
    SELECT Film.filmID
    FROM Film NATURAL JOIN VisionnementFilm
    GROUP BY Film.filmID
    HAVING COUNT(Film.filmID) > (
        SELECT AVG(nombrevisionnements) FROM (
            SELECT COUNT(Film.filmID) AS nombreVisionnements
            FROM Film NATURAL JOIN VisionnementFilm
            GROUP BY Film.filmID) AS FilmCount
        )
) AS FilmsPopulaires


-- 9. Trouvez le nom du ou des réalisateurs qui ont réalisé les films qui ont le plus grand nombre
-- de nominations aux oscars. Par exemple, Woody Allen et Steven Spielberg ont réalisé 10
-- films qui ont été nominés aux oscars.


SELECT DISTINCT(personne.nom) FROM personne NATURAL JOIN participation WHERE
personne.personneid IN (
	SELECT personneid FROM (

		SELECT personneid, count(filmid) AS nominations FROM
			(
				SELECT * FROM participation NATURAL JOIN 
					(
						SELECT distinct(filmid) FROM nominationoscars
					) AS filmsNomines
			) AS lol
			GROUP BY personneid
			
		) AS nominationCount
	WHERE nominations = (SELECT max(nominations) FROM
		(
			SELECT personneid, count(filmid) AS nominations FROM
			(
				SELECT * FROM participation NATURAL JOIN 
					(
						SELECT distinct(filmid) FROM nominationoscars
					) AS filmsNomines
			) AS lol
			GROUP BY personneid
		) AS nominationCount
			where personneid IN (
			SELECT personneid FROM participation 
			where typerole = 'producteur'
		)
	)	
) and typerole = 'producteur'


-- 10. Trouvez le nom des réalisateurs qui ont été le plus souvent nominés aux oscars mais qui
-- n’ont jamais gagné d’oscar

SELECT distinct(personne.nom) FROM personne NATURAL JOIN participation WHERE
personne.personneid IN 
(
SELECT personneid FROM (

	SELECT personneid, count(filmid) AS nominations FROM
		(
			SELECT * FROM participation NATURAL JOIN 
				(
					SELECT distinct(filmid) FROM nominationoscars
				) AS filmsNomines
		) AS lol
		GROUP BY personneid
		
	) AS nominationCount
WHERE nominations = (SELECT max(nominations) FROM
(
	SELECT personneid, count(filmid) AS nominations FROM
	(
		SELECT * FROM participation NATURAL JOIN 
			(
				SELECT distinct(filmid) FROM nominationoscars
			) AS filmsNomines
	) AS lol
	GROUP BY personneid
) AS nominationCount
	WHERE personneid IN (
		SELECT personneid FROM participation 
		WHERE typerole = 'réalisateur'
	)
)) and typerole = 'réalisateur'




-- 11. Trouvez les films (titre, année) qui ont gagné le plus d’oscars. Listez également leur
-- réalisateurs et leurs acteurs
SELECT titre, dateProduction FROM film NATURAL JOIN 
(
	SELECT filmid, count(categorie) FROM GagnantOscars
	GROUP BY filmid
) AS nmbGagne
where nmbGagne.count = 
(
SELECT max(countGagne) FROM (
	SELECT count(categorie) AS countGagne FROM GagnantOscars
	GROUP BY filmid
) AS subquery
)




-- 12. Quelles paires de femmes québécoises ont le plus souvent travaillé ensemble dans différents
-- films ?

SELECT nbContacts, p1, p2, pers1.nom AS nom1, pers2.nom AS nom2 FROM(
SELECT COUNT(p1.filmid) AS nbContacts, p1.personneid AS p1, p2.personneid AS p2 FROM participation AS p1 JOIN participation AS p2 ON p2.filmid = p1.filmid
WHERE p1.personneid != p2.personneid
GROUP BY(p1.personneid, p2.personneid)
) AS rencontres
JOIN personne AS pers1 ON rencontres.p1 = pers1.personneid 
JOIN personne AS pers2 ON rencontres.p2 = pers2.personneid
WHERE pers1.sexe = 'F' and pers2.sexe = 'F' and pers1.nationalite = 'Quebec' and pers2.nationalite = 'Quebec'
and nbContacts =
(
SELECT max (nbcontacts) FROM 
(
SELECT nbContacts, p1, p2, pers1.nom AS nom1, pers2.nom AS nom2 FROM(
SELECT COUNT(p1.filmid) AS nbContacts, p1.personneid AS p1, p2.personneid AS p2 FROM participation AS p1 JOIN participation AS p2 ON p2.filmid = p1.filmid
WHERE p1.personneid != p2.personneid
GROUP BY(p1.personneid, p2.personneid)
) AS rencontres
JOIN personne AS pers1 ON rencontres.p1 = pers1.personneid 
JOIN personne AS pers2 ON rencontres.p2 = pers2.personneid
WHERE pers1.sexe = 'F' and pers2.sexe = 'F' and pers1.nationalite = 'Quebec' and pers2.nationalite = 'Quebec'
) AS maxContacts
)


-- 13. Comment a évolué la carrière de Woody Allen ? (On veut connaitre tous ses rôles dans un
-- film (réalisateur, acteur, etc.) du plus ancien au plus récent)

SELECT typerole FROM personne NATURAL JOIN participation NATURAL JOIN film
where nom = 'Woody Allen'
order by(dateproduction)

-- ***************************************************************************************
-- 6) Exprimez en algèbre relationnelle les requêtes 1, 2 et 5. (5 points)

-- 1. Affichez toutes les informations sur un film spécifié par 
-- l'utilisateur (selon le titre).


FilmSpecifier = π titre, genre, dateProduction, dureeTotalMinutes (σ Film.titre = 'titleName'(Film))

-- 2. Pour chaque genre de film, listez tous les titres de films ainsi que la dernière date à laquelle
-- un film a été acheté(DVD) ou visionné
-- Q/R forum : sortie souhaité  -- Comédie, la grande vadrouille, 10/03/2020
-- SELECT à utiliser CASES
 
SELECT Film.genre, Film.titre,
(CASE 
    WHEN VisionnementFilm.dateVisionnement > AchatDVD.dateEnvoi
    THEN VisionnementFilm.dateVisionnement
    ELSE AchatDVD.dateEnvoi 
    END
) AS date_Achat_Visionnment   
FROM Film , VisionnementFilm, DVD, AchatDVD
WHERE   VisionnementFilm.filmID = Film.filmID 
AND     VisionnementFilm.filmID = DVD.filmID
AND     DVD.dvdID = AchatDVD.dvdID
ORDER BY date_Achat_Visionnment;


R1 = (π dateVisionnement (VisionnementFilm)) EQUIJOIN (π dateEnvoi (AchatDVD)) VisionnementFilm.filmID = AchatDVD.filmID
R2 = σ VisionnementFilm.dateVisionnement > AchatDVD.dateEnvoi(R1) 
R3 = (π filmID (Film)) NATURALJOIN (π filmID (VisionnementFilm)) NATURALJOIN 
	 (π filmID,dvdID (DVD)) (π filmID,dvdID (AchatDVD)) 
R4 = π genre,titre (R3)
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

R1 = (π membreID (Membre)) NATURALJOIN (π membreID ( σ SUM(AchatDVD.cout)(AchatDVD)))
R2 = σ SUM(AchatDVD.cout)(AchatDVD) > R1
R3 = (π membreID (Membre)) NATURALJOIN (π membreID ( R2))
R4 =  π nom , SUM(AchatDVD.cout) somme (R3)

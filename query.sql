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
FROM Personne NATURAL JOIN
    (
    SELECT Film.filmID
    FROM Film NATURAL JOIN VisionnementFilm
    GROUP BY Film.filmID
    HAVING COUNT(Film.filmID) > (
        SELECT AVG(nombrevisionnements) FROM (
            SELECT COUNT(Film.filmID) as nombreVisionnements
            FROM Film NATURAL JOIN VisionnementFilm
            GROUP BY Film.filmID
            ) as FilmCount
        )
    ) as FilmsPopulaires


-- 9. Trouvez le nom du ou des réalisateurs qui ont réalisé les films qui ont le plus grand nombre
-- de nominations aux oscars. Par exemple, Woody Allen et Steven Spielberg ont réalisé 10
-- films qui ont été nominés aux oscars.


select distinct(personne.nom) from personne natural join participation where
personne.personneid in 
(
select personneid from (

select personneid, count(filmid) as nominations from
	(
		select * from participation natural join 
			(
				select distinct(filmid) from nominationoscars
			) as filmsNomines
	) as lol
	group by personneid
	
) as nominationCount
WHERE nominations = (select max(nominations) from
(
	select personneid, count(filmid) as nominations from
	(
		select * from participation natural join 
			(
				select distinct(filmid) from nominationoscars
			) as filmsNomines
	) as lol
	group by personneid
) as nominationCount
	where personneid IN (
	select personneid from participation 
	where typerole = 'producteur'
)
) 
	) and typerole = 'producteur'


-- 10. Trouvez le nom des réalisateurs qui ont été le plus souvent nominés aux oscars mais qui
-- n’ont jamais gagné d’oscar

select distinct(personne.nom) from personne natural join participation where
personne.personneid in 
(
select personneid from (

select personneid, count(filmid) as nominations from
	(
		select * from participation natural join 
			(
				select distinct(filmid) from nominationoscars
			) as filmsNomines
	) as lol
	group by personneid
	
) as nominationCount
WHERE nominations = (select max(nominations) from
(
	select personneid, count(filmid) as nominations from
	(
		select * from participation natural join 
			(
				select distinct(filmid) from nominationoscars
			) as filmsNomines
	) as lol
	group by personneid
) as nominationCount
	where personneid IN (
	select personneid from participation 
	where typerole = 'réalisateur'
)
) 
	) and typerole = 'réalisateur'




-- 11. Trouvez les films (titre, année) qui ont gagné le plus d’oscars. Listez également leur
-- réalisateurs et leurs acteurs
select titre, dateProduction from film natural join 
(
	select filmid, count(categorie) from GagnantOscars
	group by filmid
) as nmbGagne
where nmbGagne.count = 
(
select max(countGagne) from (
	select count(categorie) as countGagne from GagnantOscars
	group by filmid
) as subquery
)




-- 12. Quelles paires de femmes québécoises ont le plus souvent travaillé ensemble dans différents
-- films ?

select nbContacts, p1, p2, pers1.nom as nom1, pers2.nom as nom2 from(
select COUNT(p1.filmid) as nbContacts, p1.personneid as p1, p2.personneid as p2 from participation as p1 join participation as p2 on p2.filmid = p1.filmid
where p1.personneid != p2.personneid
group by(p1.personneid, p2.personneid)
) as rencontres
join personne as pers1 on rencontres.p1 = pers1.personneid 
join personne as pers2 on rencontres.p2 = pers2.personneid
where pers1.sexe = 'F' and pers2.sexe = 'F' and pers1.nationalite = 'Quebec' and pers2.nationalite = 'Quebec'
and nbContacts =
(
select max (nbcontacts) from 
(
select nbContacts, p1, p2, pers1.nom as nom1, pers2.nom as nom2 from(
select COUNT(p1.filmid) as nbContacts, p1.personneid as p1, p2.personneid as p2 from participation as p1 join participation as p2 on p2.filmid = p1.filmid
where p1.personneid != p2.personneid
group by(p1.personneid, p2.personneid)
) as rencontres
join personne as pers1 on rencontres.p1 = pers1.personneid 
join personne as pers2 on rencontres.p2 = pers2.personneid
where pers1.sexe = 'F' and pers2.sexe = 'F' and pers1.nationalite = 'Quebec' and pers2.nationalite = 'Quebec'
) as maxContacts
)






-- 13. Comment a évolué la carrière de Woody Allen ? (On veut connaitre tous ses rôles dans un
-- film (réalisateur, acteur, etc.) du plus ancien au plus récent)

select typerole from personne natural join participation natural join film
where nom = 'Woody Allen'
order by(dateproduction)




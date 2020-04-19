
-- ***************************************************************************************
-- 6) Exprimez en algèbre relationnelle les requêtes 1, 2 et 5. (5 points)

-- 1. Affichez toutes les informations sur un film spécifié par 
-- l'utilisateur (selon le titre).


FilmSpecifier = π titre, genre, dateProduction, dureeTotalMinutes (σ Film.titre = 'titleName'(Film))

-- 2. Pour chaque genre de film, listez tous les titres de films ainsi que la dernière date à laquelle
-- un film a été acheté(DVD) ou visionné
-- Q/R forum : sortie souhaité  -- Comédie, la grande vadrouille, 10/03/2020
-- SELECT à utiliser CASES

R1 = (π dateVisionnement (VisionnementFilm)) EQUIJOIN (π dateEnvoi (AchatDVD)) VisionnementFilm.filmID = AchatDVD.filmID
R2 = σ VisionnementFilm.dateVisionnement > AchatDVD.dateEnvoi(R1) 
R3 = (π filmID (Film)) NATURALJOIN (π filmID (VisionnementFilm)) NATURALJOIN 
	 (π filmID,dvdID (DVD)) (π filmID,dvdID (AchatDVD)) 
R4 = π genre,titre (R3)
-- 5. Trouvez les noms des membres dont le coût total d’achat de DVD est plus élevé que la
-- moyenne.


R1 = (π membreID (Membre)) NATURALJOIN (π membreID ( σ SUM(AchatDVD.cout)(AchatDVD)))
R2 = σ SUM(AchatDVD.cout)(AchatDVD) > R1
R3 = (π membreID (Membre)) NATURALJOIN (π membreID ( R2))
R4 =  π nom , SUM(AchatDVD.cout) somme (R3)

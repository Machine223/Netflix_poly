
SET search_path TO schema_films;

CREATE TABLE IF NOT EXISTS Membre(
    membreId VARCHAR (40),
    motDePasse VARCHAR (20) NOT NULL, --ENCRYPTED check function or type
    nom VARCHAR (20),
    adressePostal zip_code NOT NULL,
    PRIMARY KEY (membreId)
);

CREATE TABLE IF NOT EXISTS MembreMensuel(
    membreId VARCHAR (40),
    prixAbonnement NUMERIC (6, 2) NOT NULL,
    dateEcheance DATE NOT NULL,
    PRIMARY KEY (membreId),
    FOREIGN KEY (membreId) REFERENCES Membre(membreId)
);

CREATE TABLE IF NOT EXISTS MembreVue(
    membreId VARCHAR (40),
    film_payperview NUMERIC(6, 2) NOT NULL,
    PRIMARY KEY (membreId),
    FOREIGN KEY (membreId) REFERENCES Membre(membreId)
);

CREATE TABLE IF NOT EXISTS CarteCredit(
    numero BIGINT UNIQUE,
    titulaire VARCHAR (20) NOT NULL,
    dateExpiration DATE NOT NULL,
    CCV INTEGER NOT NULL,
    membreId VARCHAR (40) NOT NULL,
    PRIMARY KEY (numero),
    FOREIGN KEY (membreId) REFERENCES Membre (membreId)
);

CREATE TABLE IF NOT EXISTS Film(
    numero INTEGER,
    titre VARCHAR (40) NOT NULL,
    genre VARCHAR (20) NOT NULL,
    dateProduction DATE,
    dureeTotalMinutes INTEGER,
    PRIMARY KEY (numero)
);

CREATE TABLE IF NOT EXISTS DVD( 
    numero VARCHAR (20),
    filmNo INTEGER,
    PRIMARY KEY (numero),
    FOREIGN KEY (filmNo) REFERENCES Film(numero)
);

CREATE TABLE IF NOT EXISTS Personne(
    personneId INTEGER,
    nom VARCHAR (20) NOT NULL,
    age INTEGER,
    sexe sexType,
    nationalite VARCHAR (20),
    PRIMARY KEY (personneId)
);

CREATE TABLE IF NOT EXISTS Participation( 
    personneId INTEGER,
    filmId INTEGER,
    typeRole VARCHAR (20),
    salaire DECIMAL(6,2), 
    PRIMARY KEY (filmId, personneId, typeRole),
    FOREIGN KEY (personneId) REFERENCES Personne(personneId),
    FOREIGN KEY (filmId) REFERENCES Film(numero)
);


CREATE TABLE IF NOT EXISTS CeremonieOscars(
    oscarId INTEGER,
    lieu VARCHAR (20) NOT NULL,
    dateOscar DATE NOT NULL,
    maitreCeremonie VARCHAR (20) NOT NULL,
    PRIMARY KEY (oscarId)
);

CREATE TABLE IF NOT EXISTS NominationOscars(
    oscarId INTEGER,
    filmId INTEGER,
    categorie VARCHAR (40) NOT NULL,
    PRIMARY KEY (oscarId, filmId, categorie),
    FOREIGN KEY (oscarId) REFERENCES CeremonieOscars(oscarId),
    FOREIGN KEY (filmId) REFERENCES Film(numero)
);

CREATE TABLE IF NOT EXISTS GagnantOscars(
    oscarId INTEGER,
    filmId INTEGER,
    categorie VARCHAR (40) NOT NULL,
    PRIMARY KEY (oscarId, filmId, categorie),
    FOREIGN KEY (oscarId) REFERENCES CeremonieOscars(oscarId),
    FOREIGN KEY (filmId) REFERENCES Film(numero)
);

CREATE TABLE IF NOT EXISTS VisionnementFilm(
    membreId VARCHAR (40),
    filmNo INTEGER,
    dateVisionnement DATE,
    dureeVisionnement INTEGER,
    PRIMARY KEY (membreId, filmNo, dateVisionnement),
    FOREIGN KEY (membreId) REFERENCES Membre(membreId),
    FOREIGN KEY (filmNo) REFERENCES Film(numero)
);

CREATE TABLE IF NOT EXISTS AchatDVD(
    membreId VARCHAR (40),
    DVDNo VARCHAR (20),
    cout INTEGER , -- implementer un calcul pour la distance Chaque km coûte 25 cents.
    distance NUMERIC(6,3) NOT NULL,
    dateEnvoi DATE,
    PRIMARY KEY (membreId, DVDNo),
    FOREIGN KEY (membreId) REFERENCES Membre(membreId),
    FOREIGN KEY (DVDNo) REFERENCES DVD(numero) -- to check as dvd has composed pks 
);


-- Query -- Liste des requêtes à implanter

-- 1. Affichez toutes les informations sur un film spécifié par 
-- l'utilisateur (selon le titre)

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




-- 3. Pour chaque genre de film, trouvez les noms et courriels des membres qui les ont visionnés 
-- le plus souvent. Par exemple, Amal Z est le membre qui a visionné le plus de documentaires
-- animaliers
-- TODO
SELECT Membre.nom AS Nom, Film.genre 
FROM Membre NATURAL JOIN VisionnementFilm
-- WHERE VisionnementFilm > 200
-- GROUP BY Membre.membreId , VisionnementFilm.membreId 





-- 4. Trouvez le nombre total de films groupés par réalisateur.






-- 5. Trouvez les noms des membres dont le coût total d’achat de DVD est plus élevé que la
-- moyenne.






-- 6. Ordonnez et retournez les films en termes de quantité totale vendue (DVD) et en nombre de
-- visionnements.





-- 7. Trouvez le titre et le prix des films qui n’ont jamais été commandés sous forme de DVD mais
-- qui ont été visionnés plus de 10 fois.
-- Q/R forum :Requête 7: En fait, même le DVD n'a pas de prix, selon l'étude de cas. Donc oui, pour répondre à la requête 7, il semble raisonnable d'ajouter un attribut prix au film.





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



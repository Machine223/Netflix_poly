-- DATA insertion

INSERT INTO Membre(membreId, motDePasse, nom, adressePostal)
VALUES
('alexander@gmail.com', 'alex1234', 'ALEX GIBBS', 'H4A1E1'),
('ismael@gmail.com', 'ismae345', 'ISMAEL FABER', 'H2L2G2'),
('alexa@gmail.com', 'alexa32', 'ALEXA REYNOLDS', 'H1W1A3'),
('laura@gmail.com', 'laura28', 'LAURA DONOVAN', 'H1Y1X6'),
('xavi@outlook.com', 'xavi243', 'XAVI GIBBS', 'H2A3M4'),
('leo@gmail.com', 'leomama23', 'LEO CHARLSON', 'H4L2H4');

INSERT INTO MembreMensuel(membreId, prixAbonnement, dateEcheance)
VALUES
('alexa@gmail.com', 15, DATE(10-08-2020)),
('laura@gmail.com', 15, DATE(10-05-2021)),
('xavi@gmail.com', 15, DATE(10-06-2021)),
('leo@gmail.com', 15, DATE(10-07-2021));

INSERT INTO MembreVue (membreId, film_payperview)
VALUES
('alexander@gmail.com', 5),
('ismael@gmail.com', 5);

INSERT INTO CarteCredit(numero, titulaire, dateExpiration, CCV, membreId)
VALUES
(4539711103420778,  DATE(01-05-2021), 100, 'alexander@gmail.com'),
(4024007188923493,  DATE(01-07-2022), 203, 'ismael@gmail.com'),
(4485999614309226,  DATE(01-04-2023), 445, 'alexa@gmail.com'),
(4485889214195010,  DATE(01-02-2024), 141, 'laura@gmail.com'),
(4916698435434648,  DATE(01-03-2021), 607, 'xavi@gmail.com'),
(4556168915226323,  DATE(01-09-2022), 174, 'leo@gmail.com');

INSERT INTO Film(numero, titre, genre, dateProduction, dureeTotalMinutes)
VALUES
(1, 'Jurassic World', 'action', DATE(01-01-2015), 120),
(2, 'E.T. the Extra-Terrestrial ', 'action', DATE(01-01-1982), 132),
(3, 'Indiana Jones and the Temple of Doom', 'action', DATE(01-01-1984), 140),
(4, 'man in black 3', 'comedie', DATE(01-01-2008), 132),
(5, 'Empire of the Sun', 'action', DATE(25-11-1987), 153),
(6, 'JOKER', 'drame', DATE(01-01-2019), 143),
(7, 'Parasite', 'romance', DATE(01-01-2012), 150);

INSERT INTO DVD(numero, filmNo)
VALUES
(601,1),
(602,1),
(603,4),
(604,5),
(605,6);



INSERT INTO Personne(personnageId, nom, age, sexe, nationalite)
VALUES
( 1, 'Chris Pratt', 21, 'M', 'USA'),
( 2, 'Henry Thomas', 14, 'M', 'USA'),
( 3, 'Harrison Ford', 38, 'M', 'USA'),
( 4, 'Will Smith', 35, 'M', 'USA'),
( 5, 'Steven Spielberg', 41, 'M', 'Canada'),
( 6, 'Mark Bridges', 20, 'M', 'Russie'),
( 7, 'Joaquin Phoenix', 20, 'M', ' Puerto Rico');
( 8, 'Bong Joon', 49, 'M', ' Puerto Rico');

INSERT INTO Participation(personneId, filmId, typeRole, salaire)
VALUES
( 1, 1, 'acteur', 500),
( 2, 2, 'acteur', 100),
( 3, 3, 'acteur', 500),
( 4, 4, 'acteur', 500),
( 5, 5, 'producteur', 1000),
( 6, 6, 'costume design', 400),
( 7, 6, 'acteur', 900);
( 8, 7, 'réalisateur', 900);

INSERT INTO CeremonieOscars(oscarId, lieu, dateOscar, maitreCeremonie)
VALUES
( 56, 'California', DATE(01-02-2000), 'Leonard De Caprio'),
( 57, 'California', DATE(01-02-2006), 'Angelina Joly'),
( 58, 'California', DATE(01-02-2017), 'Kevin Heart'),
( 59, 'California', DATE(01-02-2018), 'Brad Pit');

INSERT INTO NominationOscars(oscarId, filmId, categorie)
VALUES
( 56, 5,'Meilleur producteur'),
( 57, 6,'Meilleur acteur'),
( 58, 7,'costume design' ),
( 59, 8,'Meilleur acteur' );

INSERT INTO GagnantOscars(oscarId, filmId, categorie)
VALUES
( 56, 5,'Meilleur producteur'),
( 57, 6,'Meilleur acteur'),
( 58, 7,'costume design'),
( 59, 8,'Meilleur acteur' );

INSERT INTO VisionnementFilm(membreId, filmNo, dateVisionnement, dureeVisionnement)
VALUES
('alexander@gmail.com', 4, DATE(01-03-2019), 132 ),
('ismael@gmail.com', 5, DATE(01-06-2019), 153 ),
('alexa@gmail.com', 6, DATE(01-09-2019), 143 ),
('laura@gmail.com',7, DATE(01-11-2019), 70 );


INSERT INTO AchatDVD(membreId, DVDNo, distance, dateEnvoi)
VALUES
('alexander@gmail.com', 602, 10, DATE(01-04-2019) ),
('ismael@gmail.com', 602, 8, DATE(01-07-2019) ),
('alexa@gmail.com', 603, 12, DATE(01-10-2019) ),
('laura@gmail.com',604, 6, DATE(01-09-2019) );

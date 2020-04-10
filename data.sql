-- DATA insertion
SET search_path TO schema_films;

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
('alexa@gmail.com', 15, DATE'2019-04-21'),
('laura@gmail.com', 15, DATE'2019-04-21'),
('xavi@outlook.com', 15, DATE'2019-04-21'),
('leo@gmail.com', 15, DATE'2019-04-21');

INSERT INTO MembreVue (membreId, film_payperview)
VALUES
('alexander@gmail.com', 5),
('ismael@gmail.com', 5);

INSERT INTO CarteCredit(numero, titulaire, dateExpiration, CCV, membreId)
VALUES
(4539711103420778, 'ALEX GIBBS', DATE'2020-04-04', 100, 'alexander@gmail.com'),
(4024007188923493, 'ISMAEL FABER', DATE'2020-04-04', 203, 'ismael@gmail.com'),
(4485999614309226, 'ALEXA REYNOLDS', DATE'2020-04-04', 445, 'alexa@gmail.com'),
(4485889214195010, 'LAURA DONOVAN', DATE'2020-04-04', 141, 'laura@gmail.com'),
(4916698435434648, 'XAVI GIBBS', DATE'2020-04-04', 607, 'xavi@outlook.com'),
(4556168915226323, 'LEO CHARLSON', DATE'2020-04-04', 174, 'leo@gmail.com');

INSERT INTO Film(numero, titre, genre, dateProduction, dureeTotalMinutes)
VALUES
(1, 'Jurassic World', 'action', DATE'2015-01-01', 120),
(2, 'E.T. the Extra-Terrestrial ', 'action',  DATE'1982-01-01', 132),
(3, 'Indiana Jones :Temple of Doom', 'action', DATE'1984-01-01', 140),
(4, 'Men in black 3', 'comedie',  DATE'2008-01-01', 132),
(5, 'Empire of the Sun', 'action',  DATE'1987-01-01', 153),
(6, 'JOKER', 'drame', DATE'2019-01-01', 143),
(7, 'Parasite', 'romance', DATE'2019-01-01', 150);

INSERT INTO DVD(numero, filmNo)
VALUES
(601,1),
(602,2),
(603,4),
(604,5),
(605,6);

INSERT INTO Personne(personneId, nom, age, sexe, nationalite)
VALUES
( 1, 'Chris Pratt', 21, 'M', 'USA'),
( 2, 'Henry Thomas', 14, 'M', 'USA'),
( 3, 'Harrison Ford', 38, 'M', 'USA'),
( 4, 'Will Smith', 35, 'M', 'USA'),
( 5, 'Steven Spielberg', 41, 'M', 'Canada'),
( 6, 'Mark Bridges', 20, 'M', 'Russie'),
( 7, 'Joaquin Phoenix', 20, 'M', ' Puerto Rico'),
( 8, 'Bong Joon', 49, 'M', ' Puerto Rico');

INSERT INTO Participation(personneId, filmId, typeRole, salaire)
VALUES
( 1, 1, 'acteur', 500),
( 2, 2, 'acteur', 100),
( 3, 3, 'acteur', 500),
( 4, 4, 'acteur', 500),
( 5, 5, 'producteur', 1000),
( 6, 6, 'costume design', 400),
( 7, 6, 'acteur', 900),
( 8, 7, 'réalisateur', 900);

INSERT INTO CeremonieOscars(oscarId, lieu, dateOscar, maitreCeremonie)
VALUES
( 56, 'California', DATE'2017-01-01', 'Leonard De Caprio'),
( 57, 'California', DATE'2018-01-01', 'Angelina Joly'),
( 58, 'California', DATE'2019-01-01', 'Kevin Heart'),
( 59, 'California', DATE'2020-01-01', 'Brad Pit');

INSERT INTO NominationOscars(oscarId, filmId, categorie)
VALUES
( 57, 5,'Meilleur producteur'),
( 58, 6,'Meilleur acteur'),
( 58, 6,'costume design' ),
( 59, 7,'Meilleur acteur' );

INSERT INTO GagnantOscars(oscarId, filmId, categorie)
VALUES
( 57, 5,'Meilleur producteur'),
( 58, 6,'Meilleur acteur'),
( 58, 7,'costume design'),
( 59, 7,'Meilleur acteur' );

INSERT INTO VisionnementFilm(membreId, filmNo, dateVisionnement, dureeVisionnement)
VALUES
('alexander@gmail.com', 4,  DATE'2017-10-01', 132 ),
('alexander@gmail.com', 4,  DATE'2018-04-01', 132 ),
('ismael@gmail.com', 4,  DATE'2018-11-01', 132 ),
('ismael@gmail.com', 5,  DATE'2018-10-01', 153 ),
('alexa@gmail.com', 6, DATE'2019-02-01', 143 ),
('laura@gmail.com',7, DATE'2019-03-01', 70 );


INSERT INTO AchatDVD(membreId, DVDNo, cout, distance, dateEnvoi)
VALUES
('alexander@gmail.com',604, 25, 100,  DATE'2019-01-01'),
('alexander@gmail.com',602, 25, 100,  DATE'2019-02-01'),
('alexander@gmail.com',601, 25, 100,  DATE'2019-03-01'),
('ismael@gmail.com', 602, 20, 80, DATE'2018-01-01'),
('ismael@gmail.com', 603, 20, 80, DATE'2018-01-01'),
('alexa@gmail.com',604, 30, 120, DATE'2019-01-01'),
('laura@gmail.com',605, 15, 60,  DATE'2019-01-01');

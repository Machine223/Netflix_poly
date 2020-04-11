"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.data = `SET search_path =  schema_films;

INSERT INTO Membre(membreID , nom, courriel, motDePasse, adressePostal, isAdmin)
VALUES
(DEFAULT, 'ADMIN', 'admin@admin.com', 'admin123', 'H4A1E1', true),
(DEFAULT, 'ALEX GIBBS', 'alexander@gmail.com', 'alex1234', 'H4A1E1', false),
(DEFAULT, 'ISMAEL FABER','ismael@gmail.com', 'ismae345', 'H2L2G2', false),
(DEFAULT, 'ALEXA REYNOLDS','alexa@gmail.com', 'alexa32',  'H1W1A3', false),
(DEFAULT, 'LAURA DONOVAN', 'laura@gmail.com', 'laura28', 'H1Y1X6', false),
(DEFAULT, 'XAVI GIBBS', 'xavi@outlook.com', 'xavi243',  'H2A3M4', false),
(DEFAULT, 'LEO CHARLSON', 'leo@gmail.com', 'leomama23', 'H4L2H4', false);

INSERT INTO MembreMensuel(membreID, prixAbonnement, dateDebut, dateEcheance)
VALUES
(4, 15.00, DATE'2019-04-21', DATE'2020-03-21'),
(5, 15.00, DATE'2019-04-21', DATE'2020-03-21'),
(6, 15.00, DATE'2019-04-21', DATE'2020-03-21');

INSERT INTO MembreVue (membreID, nbFilmVue)
VALUES
(2, 4),
(3, 5);

INSERT INTO CarteCredit(membreID, numero, titulaire, dateExpiration, CCV)
VALUES
(2,'4539711103420778', 'ALEX GIBBS', DATE'2020-04-04', 100 ),
(3,'4024007188923493', 'ISMAEL FABER', DATE'2020-04-04', 203),
(4,'4485999614309226', 'ALEXA REYNOLDS', DATE'2020-04-04', 445),
(5,'4485889214195010', 'LAURA DONOVAN', DATE'2020-04-04', 141),
(6,'4916698435434648', 'XAVI GIBBS', DATE'2020-04-04', 607),
(7,'4556168915226323', 'LEO CHARLSON', DATE'2020-04-04', 174);

INSERT INTO Film(titre, genre, dateProduction, dureeTotalMinutes)
VALUES
('Jurassic World', 'action', DATE'2015-01-01', 120),
('E.T. the Extra-Terrestrial ', 'action',  DATE'1982-01-01', 132),
('Indiana Jones :Temple of Doom', 'action', DATE'1984-01-01', 140),
('Men in black 3', 'comedie',  DATE'2008-01-01', 132),
('Empire of the Sun', 'action',  DATE'1987-01-01', 153),
('JOKER', 'drame', DATE'2019-01-01', 143),
('Parasite', 'romance', DATE'2019-01-01', 150);

INSERT INTO DVD(numeroInstance, filmID)
VALUES
(1,1),
(2,2),
(1,4),
(1,5),
(1,6);

INSERT INTO Personne( nom, age, sexe, nationalite)
VALUES
('Chris Pratt', 21, 'M', 'USA'),
('Henry Thomas', 14, 'M', 'USA'),
('Harrison Ford', 38, 'M', 'USA'),
('Will Smith', 35, 'M', 'USA'),
('Stevene Spielberg', 41, 'F', 'Canada'),
('Mark Bridges', 20, 'M', 'Russie'),
('Joaquin Phoenix', 20, 'M', ' Puerto Rico'),
('Bong Joon', 49, 'M', ' Puerto Rico');

INSERT INTO Participation(personneID, filmID, typeRole, salaire)
VALUES
( 1, 1, 'acteur', 500),
( 2, 2, 'acteur', 100),
( 3, 3, 'acteur', 500),
( 4, 4, 'acteur', 500),
( 5, 5, 'producteur', 1000),
( 6, 6, 'costume design', 400),
( 7, 6, 'acteur', 900),
( 8, 7, 'réalisateur', 900);

INSERT INTO CeremonieOscars(oscarID, lieu, dateOscar, maitreCeremonie)
VALUES
( 56, 'California', DATE'2017-01-01', 'Leonard De Caprio'),
( 57, 'California', DATE'2018-01-01', 'Angelina Joly'),
( 58, 'California', DATE'2019-01-01', 'Kevin Heart'),
( 59, 'California', DATE'2020-01-01', 'Brad Pit');

INSERT INTO NominationOscars(oscarID, filmID, categorie)
VALUES
( 57, 5,'Meilleur producteur'),
( 58, 6,'Meilleur acteur'),
( 58, 6,'costume design' ),
( 59, 7,'Meilleur acteur' );

INSERT INTO GagnantOscars(oscarID, filmID, categorie)
VALUES
( 57, 5,'Meilleur producteur'),
( 58, 6,'Meilleur acteur'),
( 58, 7,'costume design'),
( 59, 7,'Meilleur acteur' );

INSERT INTO VisionnementFilm(membreID, filmID, cout, dateVisionnement, dureeVisionnement)
VALUES
(2, 4, 05.00, DATE'2017-10-01', 132 ),
(4, 4, 00.00, DATE'2018-04-01', 132 ),
(4, 4, 00.00, DATE'2018-04-02', 132 ),
(4, 4, 00.00, DATE'2018-04-03', 132 ),
(4, 4, 00.00, DATE'2018-04-04', 132 ),
(4, 4, 00.00, DATE'2018-04-05', 132 ),
(4, 4, 00.00, DATE'2018-04-06', 132 ),
(4, 4, 00.00, DATE'2018-04-07', 132 ),
(4, 4, 00.00, DATE'2018-04-08', 132 ),
(4, 4, 00.00, DATE'2018-04-09', 132 ),
(4, 4, 00.00, DATE'2018-04-10', 132 ),
(4, 4, 00.00, DATE'2018-04-11', 132 ),
(4, 4, 00.00, DATE'2018-04-12', 132 ),
(5, 4, 00.00, DATE'2018-11-01', 132 ),
(6, 5, 00.00, DATE'2018-10-01', 153 ),
(6, 6, 00.00, DATE'2019-02-01', 143 ),
(7, 7, 00.00, DATE'2019-03-01', 70 );


INSERT INTO AchatDVD(membreID, dvdID, cout, distance, dateEnvoi)
VALUES
(2,1, 25, 100,  DATE'2019-01-01'),
(2,1, 25, 100,  DATE'2019-02-01'),
(2,1, 25, 100,  DATE'2019-03-01'),
(3,2, 20, 80 ,  DATE'2018-01-01'),
(3,3, 20, 80 ,  DATE'2018-01-01'),
(3,4, 30, 120,  DATE'2019-01-01'),
(4,5, 15, 60 ,  DATE'2019-01-01');

;`;
//# sourceMappingURL=populateDB.js.map
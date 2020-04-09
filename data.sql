-- TODO
--SET search_path to xxxxxxx
--INSERT INTO

-- CREATE TABLE IF NOT EXISTS Membre(
--     adresseCourriel VARCHAR (20),
--     motDePasse VARCHAR (20) NOT NULL, --ENCRYPTED check function or type
--     nom VARCHAR (20),
--     adressePostal zip_code NOT NULL,
--     PRIMARY KEY (adresseCourriel)
-- );

-- CREATE TABLE IF NOT EXISTS MembreMensuel(
--     adresseMembre VARCHAR (20),
--     prixAbonnement NUMERIC (6, 2) NOT NULL,
--     dateEcheance DATE NOT NULL,
--     PRIMARY KEY (adresseMembre),
--     FOREIGN KEY (adresseMembre) REFERENCES Membre(adresseCourriel)
-- );

-- CREATE TABLE IF NOT EXISTS MembreVue(
--     adresseMembre VARCHAR (20),
--     film_payperview NUMERIC(6, 2) NOT NULL,
--     PRIMARY KEY (adresseMembre),
--     FOREIGN KEY (adresseMembre) REFERENCES Membre(adresseCourriel)
-- );

-- CREATE TABLE IF NOT EXISTS CarteCredit(
--     numero INTEGER,
--     titulaire VARCHAR (20) NOT NULL,
--     dateExpiration DATE NOT NULL,
--     CCV INTEGER NOT NULL,
--     adresseMembre VARCHAR (20) NOT NULL,
--     PRIMARY KEY (numero),
--     FOREIGN KEY (adresseMembre) REFERENCES Membre (adresseCourriel)
-- );

-- CREATE TABLE IF NOT EXISTS Film(
--     numero VARCHAR (20),
--     titre VARCHAR (30) NOT NULL,
--     genre VARCHAR (20) NOT NULL,
--     dateProduction DATE,
--     dureeTotal INTEGER,
--     PRIMARY KEY (numero)
-- );

-- CREATE TABLE IF NOT EXISTS DVD( 
--     numero VARCHAR (20),
--     filmNo VARCHAR (20),
--     PRIMARY KEY (numero, filmId),
--     FOREIGN KEY filmNo REFERENCES Film(numero)
-- );

-- CREATE TABLE IF NOT EXISTS Personnage(
--     personnageId VARCHAR (20),
--     nom VARCHAR (20) NOT NULL,
--     age INTEGER,
--     sexe sexType,
--     nationalite VARCHAR (20),
--     PRIMARY KEY (personnageId)
-- );

-- CREATE TABLE IF NOT EXISTS RolePersonnage(
--     roleId VARCHAR (20),
--     personnageId VARCHAR (20) NOT NULL,
--     nom VARCHAR (20) NOT NULL,
--     salaire DECIMAL(6,2),
--     PRIMARY KEY (roleId),
--     FOREIGN KEY personnageId REFERENCES Personnage(personnageId)
-- );

-- CREATE TABLE IF NOT EXISTS Oscar(
--     oscarId VARCHAR (20),
--     lieu VARCHAR (20) NOT NULL,
--     dateOscar DATE NOT NULL,
--     maitreCeremonie VARCHAR (20) NOT NULL,
--     PRIMARY KEY (oscarId)
-- );

-- CREATE TABLE IF NOT EXISTS NominationOscar(
--     oscarId VARCHAR (20),
--     filmId VARCHAR (20),
--     categorie VARCHAR (20) NOT NULL,
--     aGagne BOOLEAN,
--     PRIMARY KEY (oscarId, filmId),
--     FOREIGN KEY oscarId REFERENCES Oscar(oscarId),
--     FOREIGN KEY filmId REFERENCES Film(numero)
-- );

-- CREATE TABLE IF NOT EXISTS CommandeFilm(
--     adresseMembre VARCHAR (20),
--     filmNo VARCHAR (20),
--     dateVisionnement DATE,
--     dureeVisionnement INTEGER,
--     PRIMARY KEY (adresseMembre, filmNo),
--     FOREIGN KEY (adresseMembre) REFERENCES Membre(adresseCourriel),
--     FOREIGN KEY (filmNo) REFERENCES Film(numero)
-- );

-- CREATE TABLE IF NOT EXISTS AchatDVD(
--     adresseMembre VARCHAR (20),
--     DVDNo VARCHAR (20),
--     cout INTEGER NOT NULL,
--     distance NUMERIC(6,3) NOT NULL,
--     dateEnvoi DATE,
--     PRIMARY KEY (adresseMembre, DVDNo),
--     FOREIGN KEY (adresseMembre) REFERENCES Membre(adresseCourriel),
--     FOREIGN KEY (DVDNo) REFERENCES DVD(numero) -- to check as dvd has composed pks 
-- );

INSERT INTO Membre(adresseCourriel, motDePasse, nom, adressePostal)
VALUES
('alexander@gmail.com', 'alex1234', 'alex', '123street'),
('ismael@gmail.com', 'ismae345', 'ismael', '456street'),
('alexa@gmail.com', 'alexahi', 'alexa', '226 adress'),
('laura@gmail.com', 'laura28', 'lolo4049', '220 lorence street'),
('letmebd@outlook.com', 'xahi', 'coolPass', '333 adress'),
('lemma@gmail.com', 'lemmama', 'lele', '123 flower street'),

INSERT INTO MembreMensuel(adresseCourriel, prixAbonnement, dateEcheance)
VALUES
('alexa@gmail.com', 100, DATE(05-05-2020)),
('laura@gmail.com', 3.99, DATE(10-05-2021)),

INSERT INTO MembreVue (adresseCourriel, film_payperview)
VALUES
('alexander@gmail.com', 100),
('ismael@gmail.com', 5.99),

INSERT INTO CarteCredit(numero, titulaire, dateExpiration, CCV, adresseCourriel)
VALUES
(5336995555,  DATE(05-05-2020), 100, 'alexander@gmail.com'),
(5336995540,  DATE(08-05-2020), 203, 'alexander@gmail.com'),
(5336995556,  DATE(05-05-2020), 131, 'ismael@gmail.com'),
(1233524341,  DATE(05-07-2020), 141, 'alexa@gmail.com'),

INSERT INTO Film(numero, titre, genre, dateProduction, dureeTotalMinutes)
VALUES
(00000000001, 'Nemo1', 'comedie', DATE(01-01-2000), 120),
(00000000002, 'Nemo2', 'comedie', DATE(01-01-2004), 132),
(00000000003, 'Nemo3', 'comedie', DATE(01-01-2010), 140),
(00000000004, 'man in black', 'action', DATE(01-01-2008), 132),
(00000000005, 'man in black 2', 'action', DATE(01-01-2012), 110),
(00000000006, 'lovely love', 'romance', DATE(01-01-2008), 132),
(00000000007, 'lovely love 2', 'romance', DATE(01-01-2012), 110)

-- INSERT INTO DVD(numero, filmNo)
-- VALUES
-- ()
--TODO!!!

INSERT INTO Personnage(personnageId, nom, age, sexe, nationalite)
VALUES
('0000000000001', 'Alex', 21, 'M', 'Canada'),
('0000000000002', 'Alexandra', 26, 'F', 'Canada'),
('0000000000003', 'ismael', 42, 'M', 'Canada'),
('0000000000004', 'Issam', 50, 'M', 'Italie'),
('0000000000005', 'Laura', 41, 'F', 'Canada'),
('0000000000006', 'Yana', 20, 'F', 'Russie'),

INSERT INTO RolePersonnage(roleId, personnageId, nom, salaire)
VALUES
('000000000001'. '0000000000001', 'artiste', 500),
('000000000002'. '0000000000002', 'artisteSecondaire', 100),
('000000000003'. '0000000000003', 'artiste', 500),
('000000000004'. '0000000000004', 'artiste', 500),
('000000000005'. '0000000000005', 'producer', 1000),
('000000000006'. '0000000000006', 'producer', 500),

INSERT INTO Oscar(oscarId, lieu, dateOscar, maitreCeremonie)
VALUES
('0000000000001', 'Montreal', DATE(01-01-2000), 'Kevin Heart'),
('0000000000002', 'Dubai', DATE(01-01-2004), 'Angelina Joly')
('0000000000003', 'Montreal', DATE(01-01-2010), 'Leonard De Caprio'),
('0000000000004', 'Dubai', DATE(01-01-2016), 'Hong Kong')

-- INSERT INTO CommandeFilm(adresseCourriel, filmNo, dateVisionnement, dureeVisionnement)
-- VALUES
-- ('alexander@gmail.com', )
--TODO!!

-- INSERT INTO OscarNomine(numero, filmNo)
-- VALUES
-- ()
--TODO!!!

-- INSERT INTO achatDVD(numero, filmNo)
-- VALUES
-- ()
--TODO!!! (DVD)

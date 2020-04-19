-- Membre(membreID, nom,courriel, motDePassse, adressePostal, isAdmin)
-- PK: membreID

-- MembreMensuel(membreID, prixAbonnement, dateDebut, dateEcheance)
-- PK: membreID
-- FK: membreID REFERENCES Membre(membreID)

-- MembreVue(membreID, film_payperview)
-- PK: membreID
-- FK: membreID REFERENCES Membre(membreID)

-- CarteCredit(carteID,membreID, numero, titulaire, dateExpiration, CCV)
-- PK: (carteID,membreID)
-- FK: adresseMembre REFERENCES Membre(membreID) 
-- FK: membreID REFERENCES Membre(membreID) 

-- Film(filmID, titre, genre, dateProduction, duréeTotal)
-- PK: filmID

-- DVD(dvdID , numeroInstance, filmID)
-- PK: (dvdID,filmID)
-- FK: filmID REFERENCES Film(filmID)

-- Personne(personneID, nom, age sexe, nationalité)
-- PK: personneID

-- Participation(personneID, filmID, typeRole, salaire)
-- PK: (personneID, filmID, typeRole)
-- FK: personneID REFERENCES Personne(id)
-- FK: filmID REFERENCES Film(filmID)

-- CérémonieOscars(oscarID, lieu, date, maitreCérémonie)
-- PK: oscarID

-- NominationOscars(oscarID, filmID, catégorie)
-- PK: (oscarID, filmID, catégorie)
-- FK: oscarID REFERENCES Oscar(oscarID)
-- FK: filmID REFERENCES Film(filmID)

-- GagnatOscars(oscarID, filmID, catégorie)
-- PK: (oscarID, filmID, catégorie)
-- FK: oscarID REFERENCES Oscar(oscarID)
-- FK: filmID REFERENCES Film(filmID)

-- VisionnementFilm(membreID, filmID, cout, dateVisionnement, duréVisionnement)
-- PK: (membreID, filmID)
-- FK: filmID REFERENCES Film(filmID)
-- FK: membreID REFERENCES Membre(membreID)

-- AchatDVD(achatID, membreID, dvdID, cout, distance, dateEnvoi)
-- PK: (achatID)
-- FK: dvdID REFERENCES DVD(dvdID)
-- FK: membreID REFERENCES Membre(membreID)


-- CREATE DATABASE TP4;

CREATE SCHEMA schema_films;

-- Contraintes
SET search_path TO schema_films;

CREATE DOMAIN zip_code varchar(6) 
    CONSTRAINT valid_zipcode 
    CHECK (VALUE ~ '[A-Z0-9-]+');

CREATE DOMAIN sexType AS CHAR
	CHECK (VALUE IN ('M', 'F'));


-- Schema Tables
SET search_path TO schema_films;

CREATE TABLE IF NOT EXISTS Membre(
    membreID SERIAl, 
    nom VARCHAR (20),
    courriel VARCHAR (40),
    motDePasse VARCHAR(255) NOT NULL, 
    adressePostal zip_code NOT NULL,
    isAdmin BOOLEAN NOT NULL,
    PRIMARY KEY (membreID)
);

CREATE TABLE IF NOT EXISTS MembreMensuel(
    membreID INTEGER,
    prixAbonnement NUMERIC (4, 2) NOT NULL,
    dateDebut DATE NOT NULL,
    dateEcheance DATE NOT NULL,
    PRIMARY KEY (membreID),
    FOREIGN KEY (membreID) REFERENCES Membre(membreID)
    ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS MembreVue(
    membreID INTEGER,
    nbFilmVue INTEGER NOT NULL,
    PRIMARY KEY (membreID),
    FOREIGN KEY (membreID) REFERENCES Membre(membreID)
    ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS CarteCredit(
    carteID SERIAL,
    membreID INTEGER,
    numero CHAR(16) UNIQUE NOT NULL,
    titulaire VARCHAR(255) NOT NULL,
    dateExpiration DATE NOT NULL,
    CCV INTEGER NOT NULL,
    PRIMARY KEY (carteID, membreID),
    FOREIGN KEY (membreID) REFERENCES Membre (membreID)
);

CREATE TABLE IF NOT EXISTS Film(
    filmID SERIAL,
    titre VARCHAR (40) NOT NULL,
    genre VARCHAR (20) NOT NULL,
    dateProduction DATE,
    dureeTotalMinutes INTEGER,
    PRIMARY KEY (filmID)
);

CREATE TABLE IF NOT EXISTS DVD( 
    dvdID SERIAL UNIQUE,
    numeroInstance INTEGER,
    filmID INTEGER,
    PRIMARY KEY (dvdID, filmID),
    FOREIGN KEY (filmID) REFERENCES Film(filmID)
);

CREATE TABLE IF NOT EXISTS Personne(
    personneID SERIAL,
    nom VARCHAR (20) NOT NULL,
    age INTEGER,
    sexe sexType,
    nationalite VARCHAR (20),
    PRIMARY KEY (personneID)
);

CREATE TABLE IF NOT EXISTS Participation( 
    personneID INTEGER,
    filmID INTEGER,
    typeRole VARCHAR (20),
    salaire DECIMAL(6,2), 
    PRIMARY KEY (filmID, personneID, typeRole),
    FOREIGN KEY (personneID) REFERENCES Personne(personneID),
    FOREIGN KEY (filmID) REFERENCES Film(filmID)
);


CREATE TABLE IF NOT EXISTS CeremonieOscars(
    oscarID INTEGER,
    lieu VARCHAR (20) NOT NULL,
    dateOscar DATE NOT NULL,
    maitreCeremonie VARCHAR (20) NOT NULL,
    PRIMARY KEY (oscarID)
);

CREATE TABLE IF NOT EXISTS NominationOscars(
    oscarID INTEGER,
    filmID INTEGER,
    categorie VARCHAR (40) NOT NULL,
    PRIMARY KEY (oscarID, filmID, categorie),
    FOREIGN KEY (oscarID) REFERENCES CeremonieOscars(oscarID),
    FOREIGN KEY (filmID) REFERENCES Film(filmID)
);

CREATE TABLE IF NOT EXISTS GagnantOscars(
    oscarID INTEGER,
    filmID INTEGER,
    categorie VARCHAR (40) NOT NULL,
    PRIMARY KEY (oscarID, filmID, categorie),
    FOREIGN KEY (oscarID) REFERENCES CeremonieOscars(oscarID),
    FOREIGN KEY (filmID) REFERENCES Film(filmID)
);

CREATE TABLE IF NOT EXISTS VisionnementFilm(
    membreID INTEGER,
    filmID INTEGER,
    cout NUMERIC(4, 2) NOT NULL,
    dateVisionnement DATE,
    dureeVisionnement INTEGER,
    PRIMARY KEY (membreID, filmID, dateVisionnement),
    FOREIGN KEY (membreID) REFERENCES Membre(membreID),
    FOREIGN KEY (filmID) REFERENCES Film(filmID)
);

CREATE TABLE IF NOT EXISTS AchatDVD(
    achatID SERIAL,
    membreID INTEGER NOT NULL,
    dvdID INTEGER NOT NULL,
    cout NUMERIC(4, 2) NOT NULL , 
    distance INTEGER,
    dateEnvoi DATE NOT NULL,
    PRIMARY KEY (achatID),
    FOREIGN KEY (membreID) REFERENCES Membre(membreID),
    FOREIGN KEY (dvdID) REFERENCES DVD(dvdID) 
);



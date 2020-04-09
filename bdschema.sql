-- Membre(membreId, motDePassse, nom, adressePostal)
-- PK: membreId

-- MembreMensuel(adresseMembre, prixAbonnement, dateDébut, dateEchéance)
-- PK: adresseMembre
-- FK: adresseMembre REFERENCES Membre(membreId)

-- MembreVue(adresseMembre, film_payperview)
-- PK: adresseMembre
-- FK: adresseMembre REFERENCES Membre(membreId)

-- CarteCredit(numéro, titulaire, adresseMembre, dateExpiration, ccv)
-- PK: numéro
-- FK: adresseMembre REFERENCES Membre(membreId) -- discutable (ajouté pas spécifié)

-- Film(numéro, titre, genre, dateProduction, duréeTotal)
-- PK: numéro

-- DVD(numéro, filmId)
-- PK: numéro
-- FK: filmId REFERENCES Film(numéro)

-- Personne(personneid, nom, age sexe, nationalité)
-- PK: id

-- Participation(personneId, filmId, typeRole, salaire)
-- PK: (personneId, filmId, typeRole)
-- FK: personneId REFERENCES Personne(id)
-- FK: filmId REFERENCES Film(numéro)

-- CérémonieOscars(oscarId, lieu, date, maitreCérémonie)
-- PK: oscarId

-- NominationOscars(oscarId, filmId, catégorie)
-- PK: (oscarId, filmId, catégorie)
-- FK: oscarId REFERENCES Oscar(oscarId)
-- FK: filmId REFERENCES Film(numéro)

-- GagnatOscars(oscarId, filmId, catégorie)
-- PK: (oscarId, filmId, catégorie)
-- FK: oscarId REFERENCES Oscar(oscarId)
-- FK: filmId REFERENCES Film(numéro)

-- VisionnementFilm(adresseMembre, numéroFilm, dateVisionnement, duréVisionnement)
-- PK: (adresseMembre, numéroFilm)
-- FK: numéroFilm REFERENCES Film(numéro)
-- FK: adresseMembre REFERENCES Membre(membreId)

-- AchatDVD(adresseMembre, numéroDVD, cout, distance, dateEnvoi)
-- PK: (adresseMembre, numéroDVD)
-- FK: numéroDVD REFERENCES DVD(numéro)
-- FK: adresseMembre REFERENCES Membre(membreId)

CREATE DATABASE filmsbd;

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
    numero INTEGER UNIQUE,
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
    categorie VARCHAR (20) NOT NULL,
    PRIMARY KEY (oscarId, filmId, categorie),
    FOREIGN KEY (oscarId) REFERENCES CeremonieOscars(oscarId),
    FOREIGN KEY (filmId) REFERENCES Film(numero)
);

CREATE TABLE IF NOT EXISTS GagnantOscars(
    oscarId INTEGER,
    filmId INTEGER,
    categorie VARCHAR (20) NOT NULL,
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

-- CREATE TABLE IF NOT EXISTS Pannier(
--    NoPaiement VARCHAR (20),
--    DatePaiement DATE NOT NULL,
--    MontantPaiement NUMERIC (7,3) NOT NULL,
--    ModeDePaiement VARCHAR (20) NOT NULL,
--    ReservationId VARCHAR (20) NOT NULL,
--    CarteDeCreditId INTEGER ,
--    PRIMARY KEY (NoPaiement),
--    FOREIGN KEY (ReservationId) REFERENCES reservation(NoReservation),
--    FOREIGN KEY (CarteDeCreditId) REFERENCES CarteDeCredit(NoCarte)
-- );



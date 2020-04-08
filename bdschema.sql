-- Membre(adresseCourriel, motDePassse, nom, adressePostal)
-- PK: adresseCourriel

-- MembreMensuel(adresseMembre, prixAbonnement, dateDébut, dateEchéance)
-- PK: adresseMembre
-- FK: adresseMembre REFERENCES Membre(adresseCourriel)

-- MembreVue(adresseMembre, film_payperview)
-- PK: adresseMembre
-- FK: adresseMembre REFERENCES Membre(adresseCourriel)

-- CarteCredit(numéro, titulaire, adresseMembre, dateExpiration, ccv)
-- PK: numéro
-- FK: adresseMembre REFERENCES Membre(adresseCourriel) -- discutable (ajouté pas spécifié)

-- Film(numéro, titre, genre, dateProduction, duréeTotal)
-- PK: numéro

-- -- how does this shit workÉ
-- DVD(numéro, filmId)
-- PK: numéro
-- FK: filmId REFERENCES Film(id)

-- personne(id, nom, age sexe, nationalité)
-- PK: id

-- personneDuFilm(personneId, filmId)
-- PK: (personneId, filmId)
-- FK: personneId REFERENCES personne(id)
-- FK: filmId REFERENCES Film(numéro)

-- --discutable ce qui est fait/
-- Role(personneId, nom, salaire)
-- PK: personneId
-- FK: personneId REFERENCES personne(id)

-- Oscar(oscarId, catégorie, lieu, date, maitreCérémonie)
-- PK: oscarId

-- NominationOscar(oscarId, personneId, catégorie)
-- PK: (oscarId, personneId)
-- FK: oscarId REFERENCES Oscar(oscarId)
-- FK: personneId REFERENCES personne(id)

-- CommandeFilm(adresseMembre, numéroFilm, dateVisionnement, duréVisionnement)
-- PK: (adresseMembre, numéroFilm)
-- FK: numéroFilm REFERENCES Film(numéro)
-- FK: adresseMembre REFERENCES Membre(adresseCourriel)

-- AchatDVD(adresseMembre, numéroDVD, cout, distance, dateEnvoi)
-- PK: (adresseMembre, numéroDVD)
-- FK: numéroDVD REFERENCES DVD(numéro)
-- FK: adresseMembre REFERENCES Membre(adresseCourriel)

CREATE DATABASE filmsbd;

CREATE SCHEMA schema_films;

-- Contraintes
SET search_path TO schema_films;

CREATE DOMAIN zip_code varchar(6) 
    CONSTRAINT valid_zipcode 
    CHECK (VALUE ~ '[A-Z0-9-]+');

CREATE DOMAIN sexType AS CHAR
	CHECK (VALUE IN ('M', 'F'));

SET search_path TO schema_films;

CREATE TABLE IF NOT EXISTS Membre(
    adresseCourriel VARCHAR (20) UNIQUE,
    motDePasse VARCHAR (20) NOT NULL, --ENCRYPTED check function or type
    nom VARCHAR (20),
    adressePostal zip_code NOT NULL,
    PRIMARY KEY (adresseCourriel)
);

CREATE TABLE IF NOT EXISTS MembreMensuel(
    adresseMembre VARCHAR (20),
    prixAbonnement NUMERIC (6, 2) NOT NULL,
    dateEcheance DATE NOT NULL,
    PRIMARY KEY (adresseMembre),
    FOREIGN KEY (adresseMembre) REFERENCES Membre(adresseCourriel)
);

CREATE TABLE IF NOT EXISTS MembreVue(
    adresseMembre VARCHAR (20),
    film_payperview NUMERIC(6, 2) NOT NULL,
    PRIMARY KEY (adresseMembre),
    FOREIGN KEY (adresseMembre) REFERENCES Membre(adresseCourriel)
);

CREATE TABLE IF NOT EXISTS CarteCredit(
    numero INTEGER,
    titulaire VARCHAR (20) NOT NULL,
    dateExpiration DATE NOT NULL,
    CCV INTEGER NOT NULL,
    adresseMembre VARCHAR (20) NOT NULL,
    PRIMARY KEY (numero),
    FOREIGN KEY (adresseMembre) REFERENCES Membre (adresseCourriel)
);

CREATE TABLE IF NOT EXISTS Film(
    numero VARCHAR (20),
    titre VARCHAR (30) NOT NULL,
    genre VARCHAR (20) NOT NULL,
    dateProduction DATE,
    dureeTotal INTEGER,
    PRIMARY KEY (numero)
);

CREATE TABLE IF NOT EXISTS DVD( 
    numero VARCHAR (20),
    filmNo VARCHAR (20),
    PRIMARY KEY (numero),
    FOREIGN KEY (filmNo) REFERENCES Film(numero)
);

CREATE TABLE IF NOT EXISTS personne(
    personneId VARCHAR (20),
    nom VARCHAR (20) NOT NULL,
    age INTEGER,
    sexe sexType,
    nationalite VARCHAR (20),
    PRIMARY KEY (personneId)
);

CREATE TABLE IF NOT EXISTS Rolepersonne(
    roleId VARCHAR (20),
    personneId VARCHAR (20) NOT NULL,
    nom VARCHAR (20) NOT NULL,
    salaire DECIMAL(6,2),
    PRIMARY KEY (roleId),
    FOREIGN KEY (personneId) REFERENCES personne(personneId)
);

CREATE TABLE IF NOT EXISTS Oscar(
    oscarId VARCHAR (20),
    lieu VARCHAR (20) NOT NULL,
    dateOscar DATE NOT NULL,
    maitreCeremonie VARCHAR (20) NOT NULL,
    PRIMARY KEY (oscarId)
);

CREATE TABLE IF NOT EXISTS NominationCategorieOscar(
    oscarId VARCHAR (20),
    filmId VARCHAR (20),
    categorie VARCHAR (20) NOT NULL,
    PRIMARY KEY (oscarId, filmId),
    FOREIGN KEY (oscarId) REFERENCES Oscar(oscarId),
    FOREIGN KEY (filmId) REFERENCES Film(numero)
);

CREATE TABLE IF NOT EXISTS GagnantsCategorieOscar(
    oscarId VARCHAR (20),
    filmId VARCHAR (20),
    categorie VARCHAR (20) NOT NULL,
    PRIMARY KEY (oscarId, filmId),
    FOREIGN KEY (oscarId) REFERENCES Oscar(oscarId),
    FOREIGN KEY (filmId) REFERENCES Film(numero)
);

CREATE TABLE IF NOT EXISTS CommandeFilm(
    adresseMembre VARCHAR (20),
    filmNo VARCHAR (20),
    dateVisionnement DATE,
    dureeVisionnement INTEGER,
    PRIMARY KEY (adresseMembre, filmNo),
    FOREIGN KEY (adresseMembre) REFERENCES Membre(adresseCourriel),
    FOREIGN KEY (filmNo) REFERENCES Film(numero)
);

CREATE TABLE IF NOT EXISTS AchatDVD(
    adresseMembre VARCHAR (20),
    DVDNo VARCHAR (20),
    cout INTEGER NOT NULL,
    distance NUMERIC(6,3) NOT NULL,
    dateEnvoi DATE,
    PRIMARY KEY (adresseMembre, DVDNo),
    FOREIGN KEY (adresseMembre) REFERENCES Membre(adresseCourriel),
    FOREIGN KEY (DVDNo) REFERENCES DVD(numero) 
);



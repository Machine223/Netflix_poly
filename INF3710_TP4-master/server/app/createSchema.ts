export const schema: string = `
SET search_path = schema_films;

DROP SCHEMA IF EXISTS schema_films CASCADE;
CREATE SCHEMA schema_films;

CREATE DOMAIN zip_code varchar(6) 
    CONSTRAINT valid_zipcode 
    CHECK (VALUE ~ '[A-Z0-9-]+');

CREATE DOMAIN sexType AS CHAR
	CHECK (VALUE IN ('M', 'F'));

CREATE TABLE IF NOT EXISTS Membre(
    membreID SERIAl,
    nom VARCHAR (20),
    courriel VARCHAR (40),
    motDePasse VARCHAR(255) NOT NULL, --ENCRYPTED check function or type
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
    PRIMARY KEY (filmID) ON DELETE CASCADE
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
    membreID INTEGER,
    dvdID INTEGER,
    cout NUMERIC(4, 2) NOT NULL ,
    distance INTEGER,
    dateEnvoi DATE NOT NULL,
    PRIMARY KEY (achatID),
    FOREIGN KEY (membreID) REFERENCES Membre(membreID),
    FOREIGN KEY (dvdID) REFERENCES DVD(dvdID)
);

`;

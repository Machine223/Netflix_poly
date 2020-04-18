SET search_path TO schema_films;

CREATE TRIGGER t1 AFTER INSERT ON ACHATDVD
EXECUTE FUNCTION calculer_cout_dvd()

CREATE OR REPLACE FUNCTION calculer_cout_dvd() 
RETURNS TRIGGER AS $infoFilm$
BEGIN

-- we want to select the adress of the member
SELECT * FROM Membre
WHERE ( SELECT Membre.adressePostal 
        FROM Membre JOIN ACHATDVD ON Membre.membre = Achatdvd.membre
      ) as subquery
END;
$infoFilm$ LANGUAGE plpgsql;
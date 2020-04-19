SET search_path TO schema_films;

CREATE OR REPLACE FUNCTION calculer_cout_dvd() 
RETURNS TRIGGER AS $$
BEGIN
	new.cout = 
	(
    CASE
    WHEN (select distinct(
    ) from membre natural join ACHATDVD 
    where membre.membreid = ((select membreid from new) = "H4A1E1") THEN 50
    ELSE 25
	END
	);
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER t1 BEFORE INSERT ON ACHATDVD
FOR EACH ROW 
EXECUTE FUNCTION calculer_cout_dvd();


Membre(membreID, nom,courriel, motDePassse, adressePostal, isAdmin)
PK: membreID

MembreMensuel(membreID, prixAbonnement, dateDebut, dateEcheance)
PK: membreID
FK: membreID REFERENCES Membre(membreID)

MembreVue(membreID, film_payperview)
PK: membreID
FK: membreID REFERENCES Membre(membreID)

CarteCredit(carteID,membreID, numero, titulaire, dateExpiration, CCV)
PK: (carteID,membreID)
FK: adresseMembre REFERENCES Membre(membreID) 
FK: membreID REFERENCES Membre(membreID) 

Film(filmID, titre, genre, dateProduction, duréeTotal)
PK: filmID

DVD(dvdID , numeroInstance, filmID)
PK: (dvdID,filmID)
FK: filmID REFERENCES Film(filmID)

Personne(personneID, nom, age sexe, nationalité)
PK: personneID

Participation(personneID, filmID, typeRole, salaire)
PK: (personneID, filmID, typeRole)
FK: personneID REFERENCES Personne(id)
FK: filmID REFERENCES Film(filmID)

CérémonieOscars(oscarID, lieu, date, maitreCérémonie)
PK: oscarID

NominationOscars(oscarID, filmID, catégorie)
PK: (oscarID, filmID, catégorie)
FK: oscarID REFERENCES Oscar(oscarID)
FK: filmID REFERENCES Film(filmID)

GagnatOscars(oscarID, filmID, catégorie)
PK: (oscarID, filmID, catégorie)
FK: oscarID REFERENCES Oscar(oscarID)
FK: filmID REFERENCES Film(filmID)

VisionnementFilm(membreID, filmID, cout, dateVisionnement, duréVisionnement)
PK: (membreID, filmID)
FK: filmID REFERENCES Film(filmID)
FK: membreID REFERENCES Membre(membreID)

AchatDVD(achatID, membreID, dvdID, cout, distance, dateEnvoi)
PK: (achatID)
FK: dvdID REFERENCES DVD(dvdID)
FK: membreID REFERENCES Membre(membreID)

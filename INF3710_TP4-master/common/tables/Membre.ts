export class Membre {
    membreID : number;
    nom: string;
    courriel: string;
    motDePasse: string;
    adressePostal: string;
    isAdmin: boolean;

    constructor(membreID: number, nom: string, motDePasse: string, courriel: string,
                adressePostal: string, isAdmin: boolean) {
        this.membreID = membreID;
        this.nom = nom;
        this.motDePasse = motDePasse;
        this.courriel = courriel;
        this.adressePostal = adressePostal;
        this.isAdmin = isAdmin;
    }
}
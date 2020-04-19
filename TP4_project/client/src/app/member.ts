

export interface PostalAddress {
    addressNumber: number;
    streetName: string;
    appartmentNumber: number | null;
    postalCode: string;
    city: string;
}

export interface Date {
    day: number;
    month: number;
    year: number;
}

// export interface creditCard {
//     number: number;
//     titulaire: string;
//     expirationDate: Date;
//     ccv: number;
// }

// export interface PostalAddress {
//     addressNumber: number;
//     streetName: string;
//     appartmentNumber: number | null;
//     postalCode: string;
//     city: string;
// }

export interface Date {
    day: number;
    month: number;
    year: number;
}

export interface EmailAddress {
    local: string,
    domain: string;
}

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

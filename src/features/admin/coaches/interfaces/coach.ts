export interface Coach {
    id: number;
    name: string;
    title: string;
    email: string | null | undefined;
    bio: string;
    specialties: string[];
    certifications: string[];
    image: string;
}
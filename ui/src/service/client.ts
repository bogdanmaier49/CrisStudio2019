import axios from 'axios';

const DOMAIN = 'http://localhost:8080/CrisStudio';
const BASE_LINK = DOMAIN + '/web';
export const BASE_LINK_IMAGES = DOMAIN + '/Images';
export const BASE_LINK_MATERIALE_COPERTA = BASE_LINK_IMAGES + '/MaterialeCoperta';
export const BASE_LINK_TIP_COPERTA = BASE_LINK_IMAGES + '/TipuriCoperta';

export const DIRECTORY_GALERY_ALBUME = 'Albume';

export interface Address {
    id?: number;
    country?: string;
    region?: string;
    city?: string;
    street?: string;
}

export interface Role {
    id?: number;
    name?: string;
}

export interface User {
    id?: number;
    email?: string;
    password?: string;
    first_name?: string;
    last_name?: string;
    phone?: string;
    created_date?: string;
    role?: Role;
    address?: Address;
}

export interface MaterialCoperta {
    id?: number;
    nume?: string;
    descriere?: string;
    imagine?: string;
}

export interface TipCoperta {
    id?: number;
    nume?: string;
    descriere?: string;
    imagine?: string;
}

export interface DimensiuniCoperta {
    id?: number;
    dimensiuni?: string;
}

export interface Album {
    id?: number;
    tipCoperta?: TipCoperta;
    materialCoperta?: MaterialCoperta;
    dimensiuniCoperta?: DimensiuniCoperta;
    linkPoze?: string;
    numarPagini?: number;
    textCoperta?: string;
    coltareMetal?: string;
}

export interface OrderAlbum {
    id?: number;
    dataPlasare?: string;
    dataTerminare?: string;
    album?: Album;
    user?: User;
    numarBucati?: number;
    cutieAlbum?: string;
    faceOff?: string;
    copertaAlbum?: string;
    paspartou?: string;
    machetare?: string;
    materialTablou?: string;
    dimensiuneTablou?: string;
    numarTablouri?: number;
    cutieStick?: string; 
    mapaStick?: string;
    numarCutiiStick?: number;
    numarMapeStick?: number;
    copertaBuretata?: string;
    mentiuni?: string;
}

export interface Image {
    fileName: string;
    path: string;
}

export const GET_allUsers = (token: string) => {
    return axios.get(BASE_LINK + '/user.php', {
        headers:{
            'Authorization': token
        }
    });
}

export const PATCH_user = (token: string, user: User) => {
    return axios.patch(BASE_LINK + '/user.php', user, {
        headers:{
            'Authorization': token
        }
    });
}

export const getUserFromToken = (token: string, onSuccess: (user?: User)=>void, onFail: (err?: any)=>void) => {

    axios.get(BASE_LINK + '/auth.php', {
        headers:{
            'Authorization': token
        }
    }).then((res)=>{
        let user:User = res.data.body;
        onSuccess(user);
    }).catch((err)=>{
        onFail(err);
    });

}

export const doLogIn = (email: string, password: string, onSuccess: (token?: string)=>void, onFail: (err: string) => void) => {
    axios.post(
        BASE_LINK + '/auth.php', 
        {email: email, password: password}, 
    ).then((res: any)=>{
        onSuccess(res.data.body);
    }).catch((err)=>{onFail(err);});
}

export const doRegister = (user: User, onSuccess: (res: any) => void, onFail: (err: string) => void) => {
    axios.post(
        BASE_LINK + '/user.php', 
        JSON.stringify(user), 
    ).then((res: any)=>{
        onSuccess(res.data);
    }).catch((err)=>{onFail(err);});
}


export const GET_dimensiuniCoperta = () => {
    return axios.get(BASE_LINK + '/dimensiuni.php');
}

export const POST_dimensiuniCoperta = (token?: string, postData?: DimensiuniCoperta) => {
    return axios.post(
        BASE_LINK + '/dimensiuni.php', 
        JSON.stringify(postData), 
    );
}

export const PATCH_dimensiuniCoperta = (token?: string, patchData?: DimensiuniCoperta) => {
    return axios.patch(
        BASE_LINK + '/dimensiuni.php', 
        JSON.stringify(patchData), 
    );
}

export const DELETE_dimensiuniCoperta = (token?: string, postData?: DimensiuniCoperta) => {
    return axios.delete(
        BASE_LINK + '/dimensiuni.php', 
        {data: JSON.stringify(postData)}
    );
}


export const GET_materialeCoperta = () => {
    return axios.get(BASE_LINK + '/materiale.php');
}

export const POST_materialeCoperta = () => {
    
}

export const PATCH_materialeCoperta = (token: string, materialCoperta: MaterialCoperta) => {
    return axios.patch(BASE_LINK + '/materiale.php', materialCoperta, {
        headers:{
            'Authorization': token
        }
    });
}

export const DELETE_materialeCoperta = () => {
    
}


export const GET_tipCoperta = () => {
    return axios.get(BASE_LINK + '/tipcoperta.php');
}

export const POST_tipCoperta = () => {
    
}

export const PATCH_tipCoperta = (token: string, tipCoperta: TipCoperta) => {
    return axios.patch(BASE_LINK + '/tipcoperta.php', tipCoperta, {
        headers:{
            'Authorization': token
        }
    });
}

export const DELETE_tipCoperta = () => {
    
}


export const GET_comenziAlbume = (token: string) => {
    return axios.get(BASE_LINK + '/order.php', {
        headers: {
            'Authorization': token
        }
    });
}

export const POST_orderAlbum = (token: string, order: OrderAlbum) => {
    return axios.post(BASE_LINK + '/order.php', order, {
        headers: {
            'Authorization': token
        }
    });
}


export const PATCH_orderAlbum = (token: string, id: number) => {
    return axios.patch(BASE_LINK + '/order.php?id='+id, {
        headers: {
            'Authorization': token
        }
    });
}

export const GET_AlbumeGaleryPhotos = () => {
    return axios.get(BASE_LINK + '/images.php?folder=' + DIRECTORY_GALERY_ALBUME);
}
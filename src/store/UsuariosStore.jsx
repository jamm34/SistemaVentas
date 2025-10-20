import { create } from "zustand";
import { MostrarUsuarios, ObtenerIdAuthSupabase } from "../index";

export const useUsuariosStore = create((set)=>({
    dataUsuarios: [],
    MostrarUsuarios:async()=>{
        const id_auth = await ObtenerIdAuthSupabase();
        const response = await MostrarUsuarios({id_auth:id_auth});
        set({dataUsuarios: response})
        return response;
    }
}))

import { create } from "zustand";
import { MostrarModulos } from "../index";

export const useModuloStore = create((set)=>({
    dataModulos: [],
    mostrarModulos:async()=>{
        const response = await MostrarModulos()
        set({dataModulos: response})
        return response;
    }
}))
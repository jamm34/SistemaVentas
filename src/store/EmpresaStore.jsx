import { create } from "zustand"
import { InsertarEmpresa, MostrarEmpresasXidUsuario, } from "../index"

export const useEmpresaStore = create((set) => ({
    dataempresa: null,
        mostrarEmpresa: async (p) => {
        const response = await MostrarEmpresasXidUsuario(p)
        const empresa = response && response.length > 0 ? response[0] : null;
        set({ dataempresa: empresa })
        return response;
    },
    insertarempresa: async (p)=>{
       const response = await InsertarEmpresa(p) 
       console.log("respuesta empresa", response);
    }
}));
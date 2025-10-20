import { create } from "zustand";
import { BuscarProductos, EditarProductos, EliminarProductos, GenerarCodigo, InsertarProductos, MostrarProductos } from "../index";

export const useProductosStore = create((set, get) => ({
    refetchs: null,
    buscador: "",
    setBuscador: (p) => {
        set({ buscador: p });
    },
    dataProductos: [],
    productosItemSelect: [],
    parametros: {},
    mostrarProductos: async (p) => {
        const response = await MostrarProductos(p);
        set({ parametros: p });
        set({ dataProductos: response });
        set({ productosItemSelect: response[0] });
        set({ refetchs: p.refetchs })
        return response;
    },
    selectProductos: (p) => {
        set({ productosItemSelect: p })
    },
    insertarProductos: async (p) => {
        const response = await InsertarProductos(p);
        const { mostrarProductos } = get();
        const { parametros } = get();
        set(mostrarProductos(parametros));
        return response;
    },
    eliminarProductos: async (p) => {
        await (EliminarProductos(p))
        const { mostrarProductos } = get();
        const { parametros } = get();
        set(mostrarProductos(parametros))
    },
    editarProductos: async (p) => {
        await (EditarProductos(p))
        const { mostrarProductos } = get();
        const { parametros } = get();
        set(mostrarProductos(parametros))
    },
    buscarProductos: async (p) => {
        const response = await BuscarProductos(p);
        set({ dataProductos: response });
        return response;
    },
    codigoGenerado: 0,
    generarCodigo: () => {
        const response = GenerarCodigo({ id: 2 })
        set({ codigoGenerado: response })
    }
}));
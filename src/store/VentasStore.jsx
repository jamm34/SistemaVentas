import { create } from "zustand";
import { EliminarVentasIncompletas, InsertarVentas, MostrarVentasXSucursal } from "../index";

export const useVentasStore = create((set) => ({
    dataVentas: [],
    idVenta: 0,
    resetearVentas: () => set({
        idVenta: 0
    }),
    insertarVentas: async (p) => {
        const result = await InsertarVentas(p);
        set({ idVenta: result?.id })
        return result;
    },
    eliminarventasIncompletas: async (p) => {
        await EliminarVentasIncompletas(p);
    },
    mostrarVentasXSucursal: async (p) => {
        const response = await MostrarVentasXSucursal(p);
        set({ dataVentas: response });
        set({ idVenta: response[0]?.id || 0 })
        return response;
    },

}))
import { create } from "zustand";
import { EliminarVentasIncompletas, InsertarVentas } from "../index";

export const useVentasStore = create((set) => ({
    idVenta: 0,
    insertarVentas: async (p) => {
        const result = await InsertarVentas(p);
        set({ idVenta: result?.id })
        return result;
    },
    eliminarventasIncompletas: async (p) => {
        await EliminarVentasIncompletas(p);
    }
}))
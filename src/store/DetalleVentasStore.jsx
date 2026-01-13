import { create } from "zustand";
import { EliminarDetalleVentas, InsertarDetalleVentas, MostrarDetalleVenta } from "../index";

export const useDetalleVentasStore = create((set, get) => ({
    dataDetalleVenta: [],
    parametros: {},
    total: 0,
    mostrarDetalleVenta: async (p) => {
        const response = await MostrarDetalleVenta(p);
        set({ parametros: p });
        set({ dataDetalleVenta: response });
        let total = 0;
        response?.forEach((item) => {
            const array = Object.values(item);
            total += array[4]
        })
        set({ total: total })
        return response;
    },
    insertarDetalleVentas: async (p) => {
        await InsertarDetalleVentas(p);

    },
    eliminarDetalleVentas: async (p) => {
        await EliminarDetalleVentas(p);
        const { mostrarDetalleVenta } = get()
        const { parametros } = get()
        set(mostrarDetalleVenta(parametros))
    },
}));
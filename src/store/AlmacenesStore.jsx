import { create } from "zustand";
import { EliminarAlmacen, InsertarStockAlmacenes, MostrarStockAlmacenXSucursal } from "../index";

export const useAlmacenesStore = create((set) => ({
    dataAlmacen: [],
    mostrarAlmacen: async (p) => {
        const response = await MostrarStockAlmacenXSucursal(p);
        set({ dataAlmacen: response });
        return response;
    },
    insertarStockAlmacenes: async (p) => {
        await InsertarStockAlmacenes(p);
    },
    eliminarAlmacen: async (p) => {
        await EliminarAlmacen(p);
    },
    editarUseInventarios: async () => {
        // await EditarUsoInventariosProductos(p);
    }
}))
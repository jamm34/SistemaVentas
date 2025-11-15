import { create } from "zustand";
import { EliminarAlmacen, InsertarStockAlmacenes, MostrarAlmacenXSucursal, MostrarStockAlmacenXSucursal } from "../index";

export const useAlmacenesStore = create((set) => ({
    dataAlmacen: [],
    dataAlmacenXSucursalXProducto: [],
    mostrarAlmacen: async (p) => {
        const response = await MostrarStockAlmacenXSucursal(p);
        set({ dataAlmacen: response });
        return response;
    },
    mostrarAlmacenXSucursal: async (p) => {
        const response = await MostrarAlmacenXSucursal(p);
        set({ dataAlmacenXSucursalXProducto: response });
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
import { toast } from 'sonner';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';


const initialState = {
    items: [],
    total: 0,
    statePantallaCobro: false,
    tipoCobro: "efectivo",
}

function calcularTotal(items) {
    return items.reduce((total, item) => total + item._precio_venta * item._cantidad, 0);
}

export const useCartVentasStore = create(
    persist(
        (set) => ({
            ...initialState,
            addItem: (p) =>
                set((state) => {
                    //Verificar si el producto esta en el carrito
                    const existingItem = state.items.find(
                        (item) => item._id_producto === p._id_producto
                    )
                    if (existingItem) {
                        //Si el producto ya existe, aumentar la cantidad
                        const updateItems = state.items.map((item) => {
                            if (item._id_producto === p._id_producto) {
                                return { ...item, _cantidad: item._cantidad + 1, _total: item._total + p._cantidad * p._precio_venta };
                            }
                            return item;
                        })
                        return { items: updateItems, total: calcularTotal(updateItems) }
                    }
                    else {
                        //Si el producto no existe, agregar al carrito
                        return { items: [...state.items, p], total: calcularTotal([...state.items, p]) }
                    }
                }),
            removeItem: (p) => set((state) => ({
                items: state.items.filter((item) => item !== p)
            })),
            resetState: () => set({ ...initialState }),
            addCantidadItem: (p) => set((state) => {
                const updateItems = state.items.map((item) => {
                    if (item._id_producto === p._id_producto && item._cantidad > 0) {
                        const updatedItem = { ...item, _cantidad: item._cantidad + 1 };
                        updatedItem._total = updatedItem._cantidad * updatedItem._precio_venta
                        return updatedItem;
                    }
                    return item;
                });
                return { items: updateItems, total: calcularTotal(updateItems) };
            }),
            restarCantidadItem: (p) => set((state) => {
                const updateItems = state.items.map((item) => {
                    if (item._id_producto === p._id_producto && item._cantidad > 0) {
                        const updatedQuantity = item._cantidad - 1;
                        if (updatedQuantity === 0) {
                            return null;
                        }
                        else {
                            const updatedItem = { ...item, _cantidad: updatedQuantity };
                            updatedItem._total = updatedItem._cantidad * updatedItem._precio_venta
                            return updatedItem;
                        }
                    }
                    return item;
                }).filter(Boolean)//filtrado de elementps nulos
                return { items: updateItems, total: calcularTotal(updateItems) }
            }),
            setStatePantallaCobro: (p) =>
                set((state) => {
                    if (state.items.length === 0) {
                        toast.warning('No hay productos en el carrito')
                        return { state }
                    } else {
                        return {
                            statePantallaCobro: !state.statePantallaCobro,
                            tipoCobro: p.tipoCobro
                        }
                    }
                })
        }),
        {
            name: 'cart-ventas-storage'
        }
    )
);

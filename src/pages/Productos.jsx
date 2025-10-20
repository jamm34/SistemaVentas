import { useQuery } from "@tanstack/react-query";
import { ProductosTemplate, useProductosStore, Spinner1, useEmpresaStore, useSucursalesStore, useCategoriasStore } from "../index";



export function Productos() {
    const { mostrarCategorias } = useCategoriasStore();
    const { mostrarSucursales } = useSucursalesStore();
    const { mostrarProductos, buscarProductos, buscador, setRefetch } = useProductosStore();
    const { dataempresa } = useEmpresaStore();
    //Mostar producto
    const { isLoading, error, refetch } = useQuery({
        queryKey: ["mostrar productos", dataempresa?.id],
        queryFn: () =>
            mostrarProductos({ _id_empresa: dataempresa?.id, refetchs: refetch }),

        enabled: !!dataempresa?.id, refetchOnWindowFocus: false
    });

    //Buscar productos
    useQuery({
        queryKey: ["Buscar productos", buscador],
        queryFn: () => buscarProductos({ id_empresa: dataempresa?.id, buscador: buscador }),
        enabled: !!dataempresa, refetchOnWindowFocus: false
    });
    //Mostrar sucursales
    useQuery({
        queryKey: ["mostrar sucursales", dataempresa?.id],
        queryFn: () => mostrarSucursales({ id_empresa: dataempresa?.id }),
        enabled: !!dataempresa, refetchOnWindowFocus: false
    });

    //Mostrar categorias
    useQuery({
        queryKey: ["mostrar categorias", dataempresa?.id],
        queryFn: () => mostrarCategorias({ id_empresa: dataempresa?.id }),
        enabled: !!dataempresa, refetchOnWindowFocus: false
    });

    if (isLoading) {
        return <Spinner1 />;
    }
    if (error) {
        return <span>Ocurrio un error: {error.message}</span>
    }
    return <ProductosTemplate />

}
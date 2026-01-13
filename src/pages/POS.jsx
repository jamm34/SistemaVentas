import { useQuery } from "@tanstack/react-query";
import { POSTemplate, Spinner1, SpinnerSecundario, useAlmacenesStore, useEmpresaStore, useProductosStore, useSucursalesStore, useVentasStore } from "../index";



export function POS() {
    const { dataempresa } = useEmpresaStore();
    const { buscarProductos, buscador } = useProductosStore();
    const { mostrarAlmacenXSucursal } = useAlmacenesStore();
    const { productosItemSelect } = useProductosStore();
    const { sucursalesItemSelectAsignadas, dataSucursales } = useSucursalesStore();
    const { mostrarVentasXSucursal } = useVentasStore();
    //Buscar productos
    useQuery({
        queryKey: ["Buscar productos", buscador],
        queryFn: () => buscarProductos({ id_empresa: dataempresa?.id, buscador: buscador }),
        enabled: !!dataempresa,
        refetchOnWindowFocus: false
    });
    const { isLoading, error } = useQuery({
        queryKey: ["mostrar almacen por sucursal",
            sucursalesItemSelectAsignadas?.id_sucursal],
        queryFn: () => mostrarAlmacenXSucursal({
            id_sucursal: sucursalesItemSelectAsignadas.id_sucursal
        }), enabled: !!sucursalesItemSelectAsignadas?.id_sucursal
    });

    if (isLoading) {
        return <SpinnerSecundario texto={"Cargando ventas..."} />
    }
    if (error) {
        return <div>Error al cargar las ventas {error.message}</div>
    }
    return (
        <POSTemplate />
    );
};
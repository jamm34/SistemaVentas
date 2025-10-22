import { useQuery } from "@tanstack/react-query";
import { POSTemplate, useEmpresaStore, useProductosStore } from "../index";



export function POS() {
    const { dataempresa } = useEmpresaStore();
    const { buscarProductos, buscador } = useProductosStore();

    //Buscar productos
    useQuery({
        queryKey: ["Buscar productos", buscador],
        queryFn: () => buscarProductos({ id_empresa: dataempresa?.id, buscador: buscador }),
        enabled: !!dataempresa,
        refetchOnWindowFocus: false
    });
    return (
        <POSTemplate />
    );
};
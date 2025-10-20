import { Routes, Route, data } from "react-router-dom";
import { Home, Login, ProtectedRoute, UserAuth, Configuraciones, Categorias, useUsuariosStore, Spinner1, Productos, useEmpresaStore, POS } from "../index";
import { useQuery } from "@tanstack/react-query";

export function MyRoutes() {
  const { user } = UserAuth();
  const { dataUsuarios, MostrarUsuarios } = useUsuariosStore();
  const { mostrarEmpresa } = useEmpresaStore();
  const { isLoading, error } = useQuery({ queryKey: ["mostrar usuarios"], queryFn: MostrarUsuarios, refetchOnWindowFocus: false });

  const { data: dtempresa } = useQuery({
    queryKey: ["mostrar empresa", dataUsuarios?.id],
    queryFn: () => mostrarEmpresa
      ({ _id_usuario: dataUsuarios?.id }), enabled: !!dataUsuarios?.id, refetchOnWindowFocus: false
  });

  if (isLoading) {
    return <Spinner1 />
  }
  if (error) {
    return <span>Error: {error.message}</span>
  }
  return (

    <Routes>
      <Route element={<ProtectedRoute user={user} redirectTo="/login" />}>
        <Route path="/" element={<Home />} />
        <Route path="/configuracion" element={<Configuraciones />} />
        <Route path="/configuracion/categorias" element={<Categorias />} />
        <Route path="/configuracion/productos" element={<Productos />} />
        <Route path="/pos" element={<POS />} />
      </Route>

      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

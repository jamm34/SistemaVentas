import { useEffect, useRef, useState, } from "react";
import styled from "styled-components";
import { v } from "../../../styles/variables";
import {
  InputText,
  Btn1,
  useProductosStore,
  ConvertirCapitalize,
  ContainerSelector,
  Switch1,
  Selector,
  useSucursalesStore,
  ListaDesplegable,
  useCategoriasStore,
  Checkbox1,
  Btngenerarcodigo,
  useAlmacenesStore,
  EliminarAlmacen
} from "../../../index";
import { useForm } from "react-hook-form";
import { useEmpresaStore } from "../../../store/EmpresaStore";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Device } from "../../../styles/Breakpoints"
import Swal from "sweetalert2";


export function RegistrarProductos({
  onClose,
  dataSelect,
  accion,
  setIsExploding,
  state
}) {
  if (!state) return;

  //Validacion de checkbox
  const [isChecked1, setIsChecked1] = useState(true);
  const [isChecked2, setIsChecked2] = useState(false);
  const [seVendePor, setSeVendePor] = useState("UNIDAD")
  const handleCheckboxChange = (checkboxNumber) => {
    if (checkboxNumber === 1) {
      setIsChecked1(true);
      setIsChecked2(false);
      setSeVendePor("UNIDAD")
    } else {
      setIsChecked1(false);
      setIsChecked2(true);
      setSeVendePor("GRANEL");

    }
  }

  const { insertarProductos, editarProductos,
    generarCodigo, codigoGenerado, refetchs
  } = useProductosStore();
  const { dataempresa } = useEmpresaStore();
  const { insertarStockAlmacenes, mostrarAlmacen, dataAlmacen, eliminarAlmacen } = useAlmacenesStore();

  const [stateInventarios, setStateInventarios] = useState(false);

  const [stateEnabledStock, setStateEnabledStock] = useState(false);

  const { sucursalesItemSelect, dataSucursales, selectSucursal } = useSucursalesStore();
  const [stateSucursalesLista, setStateSucursalesLista] = useState();
  const [stateCategoriasLista, setStateCategoriasLista] = useState();
  const { datacategorias, selectCategoria, categoriasItemSelect } = useCategoriasStore();
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["Mostrar stock por sucursal", { id_producto: dataSelect.id, id_sucursal: sucursalesItemSelect.id }],
    queryFn: () => mostrarAlmacen({ id_sucursal: sucursalesItemSelect.id, id_producto: dataSelect.id })
  })

  const { register, formState: { errors }, handleSubmit, } = useForm();
  const { isPending, mutate: doInsertar } = useMutation({
    mutationFn: insertar,
    mutationKey: "insertar productos",
    onError: (err) => console.log("El error", err.message),
    onSuccess: () => cerrarFormulario(),
  });
  const handlesub = (data) => {
    doInsertar(data);
  };
  const cerrarFormulario = () => {
    onClose();
    setIsExploding(true);
  };

  async function insertar(data) {
    if (!randomCodeinterno) {
      generarCodigoInterno();
    }
    if (!randomCodebarras) {
      generarCodigoBarra();
    }
    if (data.precio_venta.trim() === "") {
      data.precio_venta = 0;
    }
    if (data.precio_compra.trim() === "") {
      data.precio_compra = 0;
    }
    if (stateInventarios) {
      if (!dataAlmacen) {
        if (data.stock.trim() === "") {
          data.stock = 0;
        }
        if (data.stock_minimo.trim() === "")
          data.stock = 0;
      }
    }

    if (accion === "Editar") {
      const p = {
        _id: dataSelect.id,
        _nombre: data.nombre,
        _precio_venta: parseFloat(data.precio_venta),
        _precio_compra: parseFloat(data.precio_compra),
        _id_categoria: categoriasItemSelect.id,
        _codigo_barra: randomCodebarras ? randomCodebarras : codigoGenerado,
        _codigo_interno: randomCodeinterno ? randomCodeinterno : codigoGenerado,
        _id_empresa: dataempresa.id,
        _sevende_por: seVendePor,
        _maneja_inventarios: stateInventarios

      };

      await editarProductos(p);

    } else {
      const p = {
        _nombre: data.nombre,
        _precio_venta: parseFloat(data.precio_venta),
        _precio_compra: parseFloat(data.precio_compra),
        _id_categorias: categoriasItemSelect.id,
        _codigo_barra: randomCodebarras ? randomCodebarras : codigoGenerado,
        _codigo_interno: randomCodeinterno ? randomCodeinterno : codigoGenerado,
        _id_empresa: dataempresa.id,
        _sevende_por: seVendePor,
        _maneja_inventarios: stateInventarios,
        _maneja_multiprecios: false
      };
      console.log(p);
      const id_producto_nuevo = await insertarProductos(p);
      if (stateInventarios) {
        const palmacenes = {
          id_sucursal: sucursalesItemSelect.id,
          id_producto: id_producto_nuevo,
          stock: parseFloat(data.stock),
          stock_minimo: parseFloat(data.stock_minimo)
        }
        console.log(palmacenes);
        await insertarStockAlmacenes(palmacenes);
      }
    }
  }

  //inicio Region generar codigo automatico
  const [randomCodeinterno, setRandomCodeinterno] = useState("");
  const [randomCodebarras, setRandomCodebarras] = useState("");
  function generarCodigoBarra() {
    generarCodigo();
    setRandomCodebarras(codigoGenerado);
    dataSelect.codigo_barra = codigoGenerado;
  }
  function generarCodigoInterno() {
    generarCodigo();
    setRandomCodeinterno(codigoGenerado);
    dataSelect.codigo_interno = codigoGenerado;
  }

  const handleChangeBarra = (event) => {
    setRandomCodebarras(event.target.value);
  }
  const handleChangeinterno = (event) => {
    setRandomCodeinterno(event.target.value);
  }
  useEffect(() => {
    if (accion != "Editar") {
      generarCodigoInterno();
    }
    else {
      setRandomCodeinterno(dataSelect.codigo_interno);
      setRandomCodebarras(dataSelect.codigo_barra);
      dataSelect.sevende_por === "UNIDAD"
        ? handleCheckboxChange(1)
        : handleCheckboxChange(0);
      dataSelect.maneja_inventarios
        ? setStateInventarios(true)
        : setStateInventarios(false);
      dataSelect.maneja_inventarios
        ? setStateEnabledStock(true)
        : setStateEnabledStock(false);
    }
  }, [])
  //fin region de prueba

  //region Validar accion

  //fin validar accion
  // useEffect(() => {
  //   if (accion === "Editar") {
  //     setColor(dataSelect.color);
  //     setFileurl(dataSelect.icono);
  //   }
  // }, []);


  //Check inventarios
  function checkUseInventarios() {
    if (accion === "Editar") {
      if (stateInventarios) {
        Swal.fire({
          title: "¿Estás seguro(a)?",
          text: "Si desactiva se eliminara el stock, ¡no podrá recuperar este registro!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Si, eliminar",
        }).then(async (result) => {
          if (result.isConfirmed) {
            setStateInventarios(false);
            await eliminarAlmacen({ id: dataAlmacen.id });
          }
        });
      } else {
        setStateInventarios(false);
      }
    } else {
      setStateInventarios(!stateInventarios);
    }
  }

  return (
    <Container>
      {isPending ? (
        <span>...🔼</span>
      ) : (
        <div className="sub-contenedor">
          <div className="headers">
            <section>
              <h1>
                {accion == "Editar" ? "Editar productos" : "Registrar nuevo producto"}
              </h1>
            </section>

            <section>
              <span onClick={() => {
                refetchs();
                onClose();
              }}>x</span>
            </section>
          </div>

          <form className="formulario" onSubmit={handleSubmit(handlesub)}>
            <section className="seccion1">
              <article>
                <InputText icono={<v.iconoflechaderecha />}>
                  <input
                    className="form__field"
                    defaultValue={dataSelect.nombre}
                    type="text"
                    placeholder="producto"
                    {...register("nombre", {
                      required: true,
                    })}
                  />
                  <label className="form__label">Productos</label>
                  {errors.nombre?.type === "required" && (
                    <p>Campo requerido</p>
                  )}
                </InputText>
              </article>
              <article>
                <InputText icono={<v.iconoflechaderecha />}>
                  <input
                    className="form__field"
                    defaultValue={dataSelect.precio_venta}
                    step="0.01"
                    type="number"
                    placeholder="precio venta"
                    {...register("precio_venta")}
                  />
                  <label className="form__label">Precio venta</label>

                </InputText>
              </article>
              <article>
                <InputText icono={<v.iconoflechaderecha />}>
                  <input
                    className="form__field"
                    defaultValue={dataSelect.precio_compra}
                    step="0.01"
                    type="number"
                    placeholder="precio venta"
                    {...register("precio_compra")}
                  />
                  <label className="form__label">Precio de compra</label>

                </InputText>
              </article>
              <article className="contentPadreGenerar">
                <InputText icono={<v.iconoflechaderecha />}>
                  <input
                    className="form__field"
                    value={randomCodebarras}
                    onChange={handleChangeBarra}
                    step="1"
                    type="text"
                    placeholder="codigo de barras"
                  />
                  <label className="form__label">Código de barras</label>

                  <ContainerBtngenerar >
                    <Btngenerarcodigo titulo="Generar" funcion={generarCodigoBarra} />
                  </ContainerBtngenerar>
                </InputText>
              </article>
              <article>
                <InputText icono={<v.iconoflechaderecha />}>
                  <input
                    className="form__field"
                    value={randomCodeinterno}
                    onChange={handleChangeinterno}
                    step="1"
                    type="text"
                    placeholder="codigo inerno"

                  />
                  <label className="form__label">Código interno</label>

                  <ContainerBtngenerar >
                    <Btngenerarcodigo titulo="Generar" funcion={generarCodigoInterno} />
                  </ContainerBtngenerar>
                </InputText>

              </article>

            </section>

            <section className="seccion2">
              <label>Se vende por:</label>
              <ContainerSelector>
                <label>Unidad</label>
                <Checkbox1 isChecked={isChecked1} onChange={() => handleCheckboxChange(1)} />
                <label>Granel</label>
                <Checkbox1 isChecked={isChecked2} onChange={() => handleCheckboxChange(2)} />
              </ContainerSelector>
              <ContainerSelector>
                <label>Categorias</label>
                <Selector
                  state={stateCategoriasLista}
                  funcion={
                    () => setStateCategoriasLista(!stateCategoriasLista)}
                  texto1="💼"
                  texto2={categoriasItemSelect?.nombre}
                  color="#4ec4e7 de" />
                <ListaDesplegable
                  funcion={selectCategoria}
                  data={datacategorias}
                  state={stateCategoriasLista}
                  top="4rem"
                  setState={() => setStateCategoriasLista(!stateCategoriasLista)} />
              </ContainerSelector>
              <ContainerSelector>
                <label>Controlar stock</label>
                <Switch1
                  state={stateInventarios}
                  setState={checkUseInventarios} />

              </ContainerSelector>
              {stateInventarios && (
                <ContainerStock>
                  <ContainerSelector>

                    <label>Sucursal</label>
                    <Selector
                      state={stateSucursalesLista}
                      funcion={
                        () => setStateSucursalesLista(!stateSucursalesLista)}
                      texto1="💼"
                      texto2={sucursalesItemSelect?.nombre}
                      color="#054558ff de" />
                    <ListaDesplegable refetch={refetch}
                      funcion={selectSucursal}
                      data={dataSucursales}
                      state={stateSucursalesLista}
                      top="4rem"
                      setState={() => setStateSucursalesLista(!stateSucursalesLista)} />
                  </ContainerSelector>
                  {
                    stateEnabledStock && (
                      <ContainerMensajeStock>
                        <span>Para editar el stock vaya al modulo de kardex</span>
                      </ContainerMensajeStock>
                    )}

                  <article>
                    <InputText icono={<v.iconoflechaderecha />}>
                      <input disabled={stateEnabledStock}
                        className="form__field"
                        defaultValue={dataAlmacen?.stock}
                        step="1"
                        type="number"
                        placeholder="stock"
                        {...register("stock")}
                      />
                      <label className="form__label">stock</label>
                    </InputText>
                  </article>
                  <article>
                    <InputText icono={<v.iconoflechaderecha />}>
                      <input disabled={stateEnabledStock}
                        className="form__field"
                        defaultValue={dataAlmacen?.stock_minimo}
                        step="1"
                        type="number"
                        placeholder="stock minimo"
                        {...register("stock_minimo")}
                      />
                      <label className="form__label">stock minimo</label>

                    </InputText>

                  </article>
                </ContainerStock>
              )}
            </section>


            <Btn1
              icono={<v.iconoguardar />}
              titulo="Guardar"
              bgcolor="#4ec4e7de"
            />
          </form>
        </div>
      )}
    </Container>
  );

}
const Container = styled.div`
  transition: 0.5s;
  top: 0;
  left: 0;
  position: fixed;
  background-color: rgba(10, 9, 9, 0.5);
  display: flex;
  width: 100%;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  z-index: 1000;

  .sub-contenedor {
    position: relative;
    width: 700px;
    max-width: 90%;
    border-radius: 20px;
    background: ${({ theme }) => theme.bgtotal};
    box-shadow: -10px 15px 30px rgba(10, 9, 9, 0.4);
    padding: 13px 36px 20px 36px;
    z-index: 100;
    overflow-y: auto;
    height: calc(100vh - 20px);

    .headers {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;

      h1 {
        font-size: 20px;
        font-weight: 500;
      }
      span {
        font-size: 20px;
        cursor: pointer;
      }
    }
    .formulario {
        display: grid;
        grid-template-columns: 1fr;
        gap: 15px;
        @media ${Device.tablet}{
          grid-template-columns:repeat(2,1fr);
          
        }
      .seccion1,
      .seccion2{
        gap: 20px;
        display: flex;
        flex-direction: column;
      }
        .contentPadreGenerar{
          position: relative;
        }
    }
  }
`;

const ContentTitle = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 20px;

  svg {
    font-size: 25px;
  }
  input {
    border: none;
    outline: none;
    background: transparent;
    padding: 2px;
    width: 40px;
    font-size: 28px;
  }
`;
const PictureContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  border: 2px dashed #f9d70b;
  border-radius: 5px;
  background-color: rgba(249, 215, 11, 0.1);
  padding: 8px;
  position: relative;
  gap: 3px;
  margin-bottom: 8px;

  .ContentImage {
    overflow: hidden;
    img {
      width: 100%;
      object-fit: contain;
    }
  }
  input {
    display: none;
  }
`;
const ContainerStock = styled.div`
  border: 1px solid rgba(240, 104, 46, 0.9);
  display: flex;
  border-radius: 15px;
  padding: 12px;
  flex-direction: column;
  background-color: rgba(240, 127, 46, 0.05)

`;
const ContainerBtngenerar = styled.div`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
`;

const ContainerMensajeStock = styled.div`
  text-align: center;
  color: #f9184c;
  background-color: rgba(249, 24, 35, 0.2);
  border-radius: 10px;
  padding: 5px;
  margin: 10px;
`

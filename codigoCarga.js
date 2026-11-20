const form = document.getElementById("formRevision");

 // const aviso = document.getElementById("aviso");   

let urlAnexosActuales={};
let nombresAnexosActuales = {};
let esCorreccion;
let data = null;

//
//v1 
// const direccionEnlace="https://script.google.com/macros/s/AKfycbyc-hYSXKTjRN_I9lLpPHFzmsRo40ypzObsD1MvNvLwLjoHFpkAXXeodvCG-CqPacmEeA/exec";
   const direccionEnlace="https://script.google.com/macros/s/AKfycbyc-hYSXKTjRN_I9lLpPHFzmsRo40ypzObsD1MvNvLwLjoHFpkAXXeodvCG-CqPacmEeA/exec";


 const aviso = document.getElementById("aviso");

const tbody  = document.getElementById("tablaBody");


function obtenerNumeroFila() {

    const filas =
        document.querySelectorAll(
            "#tablaBody tr:not(.ejemplo)"
        );

    return filas.length + 1;
}

function agregarFila(numeroFila){

    const tbody = document.getElementById("tablaBody");
    const i = Number(numeroFila);
    if (!Number.isInteger(i) || i < 2) {
        throw new Error("Número de fila inválido: " + numeroFila);
    }

    
    
    const fila = document.createElement("tr");
    fila.dataset.filaHoja = i;


    fila.innerHTML = `
                           <td 
                                <input type="text" name="NoTurnadoR${i}"  id="NoTurnadoR${i}" readonly>
                                
                                > </td>                    
         
                           <td>
                           <input type="text" name="folioR${i}"  id="folioR${i}" readonly>
                             </td>
                        

                            <td>
                            <input type="date" name="fechaRecepcionR${i}" id="fechaRecepcionR${i}" readonly>
                            </td>
                           
                     <td>
                            <input type="text" name="tipoDocumentoR${i}" id="tipoDocumentoR${i}" readonly>
                     </td>
                     
                     <td >
                     <input 
                     readonly 
                     class="paso"
                     name="turnadoAR${i}"
                     id="turnadoAR${i}"
                     readonly
                     > 
                    </td>
                     <td>
                                <input type="text" name="correspondenciaR${i}" id="correspondenciaR${i}" readonly>
                       </td>
                                      
                       <td>
                                      <input type="date" name="fechaFolioR${i}" id="fechaFolioR${i}" readonly>
                       </td>
                                      
                        <td>
                                      <input type="text" name="noOficioR${i}" id="noOficioR${i}" readonly>

                        </td>   
                      
                        <td>
                                    <textarea name="remitenteR${i}" id="remitenteR${i}" readonly></textarea>

                       </td>     

                        <td>
                             
                                   <input type="text" name="dirigidoAR${i}" id="dirigidoAR${i}"readonly>

                        </td>
                         
                        <td> 
                                <input
                                       name="nombreCarpetaR${i}"
                                       id="nombreCarpetaR${i}"
                                       class="input_tabla paso"
                                       aria-label="Nombre de la Carpeta"
                                       readonly
                                 >
                                <div class="contenedorArchivo">

                                

                                     <span 
                                             id="nombreaArchivoR${i}" 
                                             class="nombreArchivo"
                                             readonly
                                     ></span>
                


                                     <textarea
                                           id="urlCarpetaR${i}"
                                           name="urlCarpetaR${i}"
                                           class="auto-expand input_tabla paso"
                                           rows="1"
                                           readonly                
                                           style="resize:none;"
                                           aria-label="Url de la carpeta de Anexos"
                                     > </textarea>  

                                </div>
                        </td>  
                                   


                    <td>

                         <textarea  name="asuntoR${i}" id="asuntoR${i}" readonly></textarea>
                    </td>
                     
                    
                    <td>
                             <input type="date"  name="fechaLimiteR${i}"  id="fechaLimiteR${i}" readonly>

                     </td>     
                             
                      <td>
                                     <input type="date" name="fechaTurnadoR${i}" id="fechaTurnadoR${i}" readonly>

                      </td>

                    
                    
                        <td> 
                            <input class="label_table" type="text" name="medioTurnadoR${i}" id="medioTurnadoR${i}" readonly>
                       </td>     
                        <td>     
                                  <input type="text" name="instruccionR${i}" id="instruccionR${i}" readonly>
                        </td>     
                        <td>
                                     <input type="text" name="archivadoEnR${i}" id="archivadoEnR${i}" readonly>
                        </td>
                        
                        <td>
                        <input type="checkbox"  name="recepciondeAcuseA1R${i}" id="recepciondeAcuseA1R${i}">    
                        <input type="date"  name="FRecepciondeAcuseA1R${i}" id="FRecepciondeAcuseA1R${i}">
                        
                        </td>     
                           <td>
                                     <input  type="text" name="estatusA1R${i}" id="estatusA1R${i}">
                         </td>     
                           <td>
                                     <textarea name="observacionesA1R${i}" id="observacionesA1R${i}" ></textarea>
                          </td>     
                          <td>
                                     <input type="file" name="archivoRespuestaA1R${i}" id="archivoRespuestaA1R${i}">
                          </td>
                           
                          <td>
                        <input type="checkbox"  name="recepciondeAcuseA2R${i}" id="recepciondeAcuseA2R${i}">    
                        <input type="date"  name="FRecepciondeAcuseA2R${i}" id="FRecepciondeAcuseA2R${i}">
                        
                        </td>     
                           <td>
                                     <input  type="text" name="estatusA2R${i}" id="estatusA2R${i}">
                         </td>     
                           <td>
                                     <textarea name="observacionesA2R${i}" id="observacionesA2R${i}" ></textarea>
                          </td>     
                          <td>
                                     <input type="file" name="archivoRespuestaA2R${i}" id="archivoRespuestaA2R${i}">
                          </td>






                          <td>
                        <input type="checkbox"  name="recepciondeAcuseA3R${i}" id="recepciondeAcuseA3R${i}">    
                        <input type="date"  name="FRecepciondeAcuseA3R${i}" id="FRecepciondeAcuseA3R${i}">
                        
                        </td>     
                           <td>
                                     <input  type="text" name="estatusA3R${i}" id="estatusA3R${i}">
                         </td>     
                           <td>
                                     <textarea name="observacionesA3R${i}" id="observacionesA3R${i}" ></textarea>
                          </td>     
                          <td>
                                     <input type="file" name="archivoRespuestaA3R${i}" id="archivoRespuestaA3R${i}">
                          </td>


                          <td>
                        <input type="checkbox"  name="recepciondeAcuseA4R${i}" id="recepciondeAcuseA4R${i}">    
                        <input type="date"  name="FRecepciondeAcuseA4R${i}" id="FRecepciondeAcuseA4R${i}">
                        
                        </td>     
                           <td>
                                     <input  type="text" name="estatusA4R${i}" id="estatusA4R${i}">
                         </td>     
                           <td>
                                     <textarea name="observacionesA4R${i}" id="observacionesA4R${i}" ></textarea>
                          </td>     
                          <td>
                                     <input type="file" name="archivoRespuestaA4R${i}" id="archivoRespuestaA4R${i}">
                          </td>




                          <td>
                        <input type="checkbox"  name="recepciondeAcuseA5R${i}" id="recepciondeAcuseA5R${i}">    
                        <input type="date"  name="FRecepciondeAcuseA5R${i}" id="FRecepciondeAcuseA5R${i}">
                        
                        </td>     
                           <td>
                                     <input  type="text" name="estatusA5R${i}" id="estatusA5R${i}">
                         </td>     
                           <td>
                                     <textarea name="observacionesA5R${i}" id="observacionesA5R${i}" ></textarea>
                          </td>     
                          <td>
                                     <input type="file" name="archivoRespuestaA5R${i}" id="archivoRespuestaA5R${i}">
                          </td>

               
    `;

    tbody.appendChild(fila);

}
const AreaFolios = new Map([
   
    ["Admin_140601"     ,"Admin"           ],
    ["Acuerdos_140703"  ,"Acuerdos"        ],
    ["Planeacion_520604","Planeacion"      ],
    ["Sadmin_430709"    ,"Sadministrativos"],
    ["Direc_650478"     ,"Direccion"   ], 
    ["DivPlan_890320"   ,"DivPlaneacion"   ],  
    ["DivProye_154456"  ,"DivProyectos"   ] 
]);
function setSelectValue(selectId, value) {
  const select = document.getElementById(selectId);
  if (!select) return;

  select.value = value;
  select.dispatchEvent(new Event("change"));
}





function convertirBaseAObjeto(registros) {

    const data = {
        __filas: []
    };

    const filasRegistradas = new Set();

    for (const registro of registros) {

        const numeroFila = Number(registro.filaHoja);

        if (!Number.isInteger(numeroFila) || numeroFila < 2) {
            throw new Error("Número de fila inválido");
        }

        if (filasRegistradas.has(numeroFila)) {
            throw new Error("Fila duplicada: " + numeroFila);
        }

        filasRegistradas.add(numeroFila);
        data.__filas.push(numeroFila);

        for (const [nombre, valor] of Object.entries(registro)) {

            if (nombre === "filaHoja") continue;

            data[`${nombre}R${numeroFila}`] = valor ?? "";

        }
    }

    data.__filas.sort((a, b) => a - b);

    return data;
}








document
    .getElementById("cargarArea")
    .addEventListener("click", cargarDatosPorFolio);

    async function cargarfoliotest(){
    const folio = document
        .getElementById("folioInput")
        .value
        .trim();

    if (!folio) {
        alert("Ingrese un folio.");
        return;
    }
    const areaSel = AreaFolios.get(folio);

    if (!areaSel) {
        alert("Folio no encontrado.");
        return;
    }

    // Cargar dependencia
setSelectValue(
        "area",
        areaSel
    );
}
const folio = document
        .getElementById("folioInput")
        .value
        .trim();
const areaInput = document
        .getElementById("area");
const areaEncabezado = document
        .getElementById("AreadeRecepcion");
        
function actualizarEncabezado() {

    const area =
        areaInput.options[areaInput.selectedIndex]?.textContent || "";

    
    areaEncabezado.textContent =area;
}



areaInput.addEventListener("change", actualizarEncabezado);
let temporizadorEspera=null;

function mostrarEstadoCarga(mensaje) {

    const toast =
        document.getElementById("estadoCarga");

    toast.textContent = mensaje;

    toast.classList.add("mostrar");

    let puntos = 0;

    clearInterval(temporizadorEspera);

    temporizadorEspera =
        setInterval(() => {

            puntos =
                (puntos + 1) % 4;

            toast.textContent =
                mensaje +
                ".".repeat(puntos);

        }, 500);
}

function terminarEstadoCarga(mensaje) {

    const toast = document.getElementById("estadoCarga");

    toast.classList.remove("mostrar");
               
}






function restaurarTabla(data) {

    const tbody = document.getElementById("tablaBody");

    // 1. Limpiar las filas anteriores
    tbody.replaceChildren();

    // 2. Crear todas las filas necesarias
    for (const numeroFila of data.__filas) {
        agregarFila(numeroFila);
    }

    // 3. Cargar sus valores
    Object.keys(data).forEach(name => {

        if (name === "__filas") return;

        const campo = document.getElementById(name);

        if (!campo) return;
        /*
        if (campo.type === "date") {
            campo.value = fechaParaInput(data[name]);
        } else {
        */    
const valor = data[name];

if (campo.type === "checkbox") {

    campo.checked =
        valor === true ||
        valor === "true" ||
        valor === "on" ||
        valor === 1;

} else if (campo.type === "file") {

    // Los archivos no se restauran asignando .value
    return;

} else if (campo.tagName === "TD") {

    campo.textContent = valor ?? "";

} else {

    campo.value = valor ?? "";

}
        //}
    });
}
const areasRespuesta = {
    1: "Direccion",
    2: "DivPlaneacion",
    3: "DivProyectos",
    4: "Sadministrativos",
    5: "Acuerdos"
};

document.getElementById("tablaBody")
    .addEventListener("change", async function(event) {

        const campoHTML = event.target;

        const coincidencia = campoHTML.name?.match(
            /^(recepciondeAcuse|FRecepciondeAcuse|estatus|observaciones|archivoRespuesta)A([1-5])R(\d+)$/
        );

        if (!coincidencia) return;

        const nombreCampo = coincidencia[1];
        const numeroArea = Number(coincidencia[2]);
        const filaHoja = Number(coincidencia[3]);

        const area = areasRespuesta[numeroArea];

        const fila = campoHTML.closest("tr");

        if (
            !fila ||
            Number(fila.dataset.filaHoja) !== filaHoja
        ) return;

        const areaActual =
            document.getElementById("area").value;

        // Cada área modifica únicamente sus respuestas.
        // El administrador puede editar cualquiera.
        if (areaActual !== "Admin" && areaActual !== area) {
            return;
        }

        const noOficio =
            document.getElementById(`noOficioR${filaHoja}`)?.value.trim();

        const tipoDocumento =
            document.getElementById(`tipoDocumentoR${filaHoja}`)?.value.trim();

        let valor;

        if (campoHTML.type === "checkbox") {
            valor = campoHTML.checked;

        } else if (campoHTML.type === "file") {

            const archivo = campoHTML.files?.[0];

            if (!archivo) return;

            if (archivo.size > 3 * 1024 * 1024) {
                alert("El archivo no debe superar 3 MB.");
                return;
            }

            valor = await leerArchivoRespuesta(archivo);

        } else {
            valor = campoHTML.value;
        }

        try {

            const res = await fetch(direccionEnlace, {
                method: "POST",
                body: JSON.stringify({
                    action: "guardarCambioRespuesta",
                    filaHoja,
                    noOficio,
                    tipoDocumento,
                    area,
                    campo: nombreCampo,
                    valor
                })
            });

            if (!res.ok) {
                throw new Error(`Error HTTP ${res.status}`);
            }

            const respuesta = await res.json();

            if (respuesta.success !== true) {
                throw new Error(
                    respuesta.message ||
                    "No se pudo guardar el cambio"
                );
            }

            console.log("Campo guardado:", campoHTML.name);

        } catch (error) {

            alert(
                `No se guardó ${campoHTML.name}: ${error.message}`
            );
        }
    });

function leerArchivoRespuesta(archivo) {

    return new Promise((resolve, reject) => {

        const lector = new FileReader();

        lector.onload = () => resolve({
            nombre: archivo.name,
            tipo: archivo.type || "application/octet-stream",
            contenido: String(lector.result).split(",")[1]
        });

        lector.onerror = () =>
            reject(new Error("No se pudo leer el archivo"));

        lector.readAsDataURL(archivo);
    });
}




function mostrarColumnasPorArea(area) {

    const grupos = {
        Direccion: 1,
        DivPlaneacion: 2,
        DivProyectos: 3,
        Sadministrativos: 4,
        Acuerdos: 5
    };

    const esAdmin = area === "Admin";
    const grupoVisible = grupos[area];

    const tabla = document.querySelector(
        ".capturaDeDatos"
    );

    const titulosGrupos = tabla.querySelectorAll(
        "thead tr:first-child th"
    );

    const encabezados = tabla.querySelectorAll(
        "thead tr:nth-child(2) th"
    );

    const filas = tabla.querySelectorAll(
        "tbody tr"
    );

    // Grupo 0: columnas generales (1 a 17)
    // Grupos 1 a 5: cuatro columnas por área
    for (let grupo = 1; grupo <= 5; grupo++) {

        const visible =
            esAdmin || grupo === grupoVisible;

        const titulo = titulosGrupos[grupo];

        if (titulo) {
            titulo.style.display = visible ? "" : "none";

            // Solo Admin ve nombres de áreas
            titulo.style.visibility =
                esAdmin ? "visible" : "hidden";
        }

        const inicio = 17 + (grupo - 1) * 4;

        for (let columna = inicio;
             columna < inicio + 4;
             columna++) {

            const encabezado = encabezados[columna];

            if (encabezado) {
                encabezado.style.display =
                    visible ? "" : "none";

                // Solo Admin ve títulos de respuestas
                encabezado.style.visibility =
                    esAdmin ? "visible" : "hidden";
            }

            filas.forEach(fila => {

                const celda = fila.children[columna];

                if (celda) {
                    celda.style.display =
                        visible ? "" : "none";
                }

            });
        }
    }
}






async function cargarDatosPorFolio() {
      
      const folio = document
        .getElementById("folioInput")
        .value
        .trim();

    if (!folio) {
        alert("Ingrese un folio.");
        return;
    }
    const areaSel = AreaFolios.get(folio);

    if (!areaSel) {
        alert("Folio no encontrado.");
        return;
    }
    const boton = document.getElementById("cargarArea");
    boton.disabled = true;
    mostrarEstadoCarga("Cargando registros");
    // Cargar dependencia
    setSelectValue(
        "area",
        areaSel
              );

try {      
const res = await fetch(direccionEnlace,{
    method:"POST",
    body: JSON.stringify({
        action:"cargarTabla",
        area:areaSel
    })
});
 if (!res.ok) {
            throw new Error("Error HTTP " + res.status);
        }



const respuesta = await res.json();

 if (respuesta.success !== true) {
            throw new Error(
                respuesta.message ||
                respuesta.error ||
                "No fue posible cargar los registros"
            );
        }




if (!Array.isArray(respuesta.data)) {
            throw new Error(
                "Apps Script no devolvió un arreglo de registros"
            );
        }        

// Apps Script debe devolver un arreglo
const registros = respuesta.data;





// Convertimos toda la base en un objeto
const objetoCompleto = convertirBaseAObjeto(registros);

// Creamos las filas y asignamos sus valores
restaurarTabla(objetoCompleto);

// Conservamos el objeto para utilizarlo después
data = objetoCompleto;

mostrarColumnasPorArea(areaSel);

alert(
            `Se cargaron ${objetoCompleto.__filas.length} registros.`
        );

    } catch (error) {

        console.error("Error de carga:", error);

        alert("Error al cargar: " + error.message);

    } finally {

        terminarEstadoCarga();
        boton.disabled = false;

    }
}

import { Box, SelectChangeEvent, Tab, Tabs } from "@mui/material";
import { useEffect, useState } from "react";
import { TabPanel, a11yProps } from "../../components/tools/MultiViewPanel";
import SearchSettled from "../AttachFile/components/SearchSettled";
import Button from "../../components/common/Button";
import InputSelectOnlyValue from "../../components/common/InputSelectOnlyValue";
import { useAttachFile } from "../AttachFile/hooks/useAttachFile";
import { optionAccountType } from "../../components/tools/OptionsValuesSelects";
import TextFieldOutlined from "../../components/common/TextFieldOutline";
import { useDataGlobal } from "../../redux/Redux-actions/useDataGlobal";

const trackingHistory = [
  {
    date: "hoy",
    data: [
      {
        id: 1, // id tracking
        imageUser: null, // imagen usuario
        name: "Evelin", // userid traiga name user
        title: "Radicado creado", //idfilesstate traiga nombre de estado
        date: "28 de abril, 9:30am", // tracking date
        type: "Administrativo", // files_type
        acountType: "Factura Proveedor", // files_account_type
        description:
          "Inicio proceso de radicacion, ingreso documentos para validar", // tracking descripcion
      },
      {
        id: 2,
        imageUser: null, // imagen usuario
        name: "Elizabeth", // userid traiga name user
        title: "Radicado creado", //idfilesstate traiga nombre de estado
        date: "28 de abril, 8:30am", // tracking date
        type: "Administrativo", // files_type
        acountType: "Factura Proveedor", // files_account_type
        description:
          "los documentos cumplen con todos los requerimientos, pero se debe negociar la fecha final de entrega con hermeco", // tracking descripcion
      },
      {
        id: 3,
        imageUser: null, // imagen usuario
        name: "Evelin", // userid traiga name user
        title: "Radicado creado", //idfilesstate traiga nombre de estado
        date: "28 de abril, 7:30am", // tracking date
        type: "Administrativo", // files_type
        acountType: "Factura Proveedor", // files_account_type
        description: "Inicio proceso", // tracking descripcion
      },
    ],
  },
  {
    date: "ayer",
    data: [
      {
        id: 4,
        imageUser: null, // imagen usuario
        name: "Evelin", // userid traiga name user
        title: "Radicado creado", //idfilesstate traiga nombre de estado
        date: "27 de abril, 8:21 PM", // tracking date
        type: "Administrativo", // files_type
        acountType: "Factura Proveedor", // files_account_type
        description: "Inicio proceso", // tracking descripcion
      },
    ],
  },
];

const Tracking = () => {
  const {
    showValue,
    handleChange,
    settled,
    setSettled,
    notFile,
    document,
    onType,
    onNumber,
    handleTrackingBySettled,
    handleTrackingByDocument,
    success,
  } = useAttachFile();
  const { changeTitleSection } = useDataGlobal();

  useEffect(() => {
    changeTitleSection("Trazabilidad")
  },[])

  return (
    <main className=" layout home">
      <section className="layout-section">
        <div className="layout-left">
          <div className="flex flex-col flex-auto px-6 py-10 sm:pt-18 sm:pb-20">
            {/* activity feed */}
            <div className="w-full max-w-3xl">
              {/* title */}
              <div className="text-4xl font-extrabold tracking-tight leading-none">
                Todas Las Actividades
              </div>
              <div className="mt-1.5 text-lg text-[#64748b]">
                Los movimientos del archivo se veran reflejados de manera
                individual, comenzando con los mas recientes.
              </div>

              <article className="my-[15px] p-3 bg-white rounded-3xl h-auto">
                <Box sx={{ with: "100%" }}>
                  <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <Tabs
                      value={showValue}
                      onChange={handleChange}
                      aria-label="Area TI"
                      variant="scrollable"
                    >
                      <Tab label="Filtrar Por radicado" {...a11yProps(0)} />
                      <Tab
                        label="Filtrar por Tipo y Numero de Documento"
                        {...a11yProps(1)}
                      />
                    </Tabs>
                  </Box>
                  <TabPanel value={showValue} index={0}>
                    <Box>
                      <form onSubmit={handleTrackingBySettled}>
                        <div className="md:flex md:flex-wrap">
                          <article className="w-full">
                            <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                              Numero de Radicado
                            </label>
                            <SearchSettled
                              label={"Radicado"}
                              value={settled}
                              setValue={setSettled}
                              selected={["FINALIZADO"]}
                              required
                            />
                          </article>
                        </div>
                        <Button name="Buscar Archivo" />
                        {notFile && (
                          <div className="text-red-600">
                            no hemos encontrado informacion
                          </div>
                        )}
                      </form>
                    </Box>
                  </TabPanel>
                  <TabPanel value={showValue} index={1}>
                    <Box>
                      <form onSubmit={handleTrackingByDocument}>
                        <div className="md:flex md:flex-wrap">
                          <article className="md:w-1/2">
                            <InputSelectOnlyValue
                              type={"text"}
                              title="Tipo de cuenta"
                              placeholder="cuenta de"
                              required
                              value={document.type}
                              // onChange={handleAccountType}
                              onChange={(e: SelectChangeEvent) =>
                                onType(e.target.value)
                              }
                              itemDefault="selecciona el tipo de cuenta"
                              items={optionAccountType}
                            />
                          </article>
                          <article className="md:w-1/2">
                            <label className="block my-2 mx-2 mt-4 text-base font-semibold dark:text-white">
                              Numero de Documento
                            </label>
                            <TextFieldOutlined
                              type={"text"}
                              label={"Numero"}
                              value={document.number}
                              setValue={onNumber}
                              required
                            />
                          </article>
                        </div>
                        <Button name="Buscar Archivo" />
                        {notFile && (
                          <div className="text-red-600">
                            no hemos encontrado informacion
                          </div>
                        )}
                      </form>
                    </Box>
                  </TabPanel>
                </Box>
              </article>

              {success && (
                <div className="mt-8">
                  <ol>
                    {trackingHistory.map((track, index) => (
                      <div key={index}>
                        {/* date separator */}
                        <li className="relative flex py-7">
                          <div className="relative py-2 px-8 text-md text-white font-medium leading-5 rounded-full bg-tertiary">
                            {track.date}
                          </div>
                        </li>

                        {/* data */}
                        {track.data.map((info, index) => (
                          <li className="relative flex py-7">
                            {index !== track.data.length - 1 && (
                              <div className="absolute top-7 left-5 w-0.5 h-full -ml-px bg-gray-300 dark:bg-gray-600"></div>
                            )}
                            <div
                              className="relative flex flex-auto flex-row"
                              key={info.id}
                            >
                              {/* icon  or image */}
                              {info.imageUser ? (
                                <img
                                  src={info.imageUser}
                                  className="shrink-0 w-10 h-10 mr-4 rounded-full overflow-hidden object-cover object-center"
                                  alt="image user"
                                />
                              ) : (
                                <div className="flex shrink-0 items-center justify-center w-10 h-10 mr-4 rounded-full bg-gray-400">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6 text-white"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                                    />
                                  </svg>
                                </div>
                              )}

                              {/* content */}
                              <div className="flex flex-col flex-auto items-start">
                                <div>
                                  El usuario <strong>{info.name}</strong> a
                                  ejecutado <strong>{info.title}</strong>
                                </div>
                                <div className="mt-2 text-[#64748b]">
                                  {info.date} Archivo:{" "}
                                  <strong className="text-tertiary">
                                    {info.type}
                                  </strong>{" "}
                                  de tipo{" "}
                                  <strong className="text-tertiary">
                                    {info.acountType}
                                  </strong>
                                </div>

                                <div className="mt-4 px-5 rounded-lg bg-gray-200 dark:gray-800">
                                  {info.description}
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </div>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Tracking;

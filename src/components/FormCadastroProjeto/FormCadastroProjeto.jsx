import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"

import schemaProjetoInicial from "./validation"
import TabelaWbs from "../TabelaWbs"
import Button from "../Button"
import axios from "../../services/axios"
import { formatarEstrutura } from "../../utils/formatarEstrutura"

function FormCadastroProjeto() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      valorHora: 0,
    },
    resolver: yupResolver(schemaProjetoInicial),
  })
  const navigate = useNavigate()

  const [render, setRender] = useState(0);
  const [nivel1Edicao, setNivel1Edicao] = useState(false);

  const [tabelaWBS, setTabelaWBS] = useState([
    {
      nivel: "1",
      descricao: "Objetivo Final",
    },
  ])
  
  useEffect(() => {}, [render]);

  const gerarJsonProjeto = (data) => {
    const projeto = {
      nome_projeto: data.nomeProjeto,
      descricao_projeto: data.descricaoProjeto,
      valor_hora_projeto: data.valorHora,
      sub_projetos: [],
    }

    const estrutura = formatarEstrutura(tabelaWBS)
    projeto.sub_projetos = estrutura

    return projeto
  }

  const cadastrarProjeto = async (data) => {
    const projeto = gerarJsonProjeto(data)

    //console.log(projeto)
    await axios.post("/projeto/cadastrar", projeto).then(() => {
      navigate("/projetos")
    })
  }
  
  const handlerBlur = (evento) => {
	  let tabela = tabelaWBS
	  tabela[0].descricao = evento.target.value
	  setTabelaWBS(tabela)
	  setRender(render + 1)
  }

  return (
    <form onSubmit={handleSubmit(cadastrarProjeto)}>
      <div className="mt-4 flex flex-col">
        <label
          htmlFor="nomeProjeto"
          className="text-base font-medium text-on-light"
        >
          Título do Projeto
        </label>
        <input
          type="text"
          id="nomeProjeto"
          className="w-1/2 rounded-md border border-n70 p-1"
          {...register("nomeProjeto")}
          onBlur={(e)=>{handlerBlur(e)}}
        />
        {errors?.nomeProjeto && (
          <label
            htmlFor="nomeProjeto"
            className="text-sm font-light text-error"
          >
            {errors.nomeProjeto.message}
          </label>
        )}
      </div>
      <div className="mt-4 flex flex-col">
        <label
          htmlFor="descricaoProjeto"
          className="text-base font-medium text-on-light"
        >
          Descrição
        </label>
        <input
          type="text"
          className="w-1/2 rounded-md border border-n70 p-1"
          {...register("descricaoProjeto")}
        />
        {errors?.descricaoProjeto && (
          <label
            htmlFor="descricaoProjeto"
            className="text-sm font-light text-error"
          >
            {errors.descricaoProjeto.message}
          </label>
        )}
      </div>
      <div className="mt-4 flex flex-col">
        <label
          htmlFor="valorHora"
          className="text-base font-medium text-on-light"
        >
          Valor/Hora de trabalho
        </label>
        <input
          type="number"
          step="any"
          className="w-1/2 rounded-md border border-n70 p-1"
          {...register("valorHora")}
        />
        {errors?.valorHora && (
          <label htmlFor="valorHora" className="text-sm font-light text-error">
            {errors.valorHora.message}
          </label>
        )}
      </div>
      <div className="ml-5 mt-5">
        <h2 className="text-xl font-semibold text-on-light">WBS</h2>
        <TabelaWbs tabelaWBS={tabelaWBS} setTabelaWBS={setTabelaWBS} edicaoNivel1={false}/>
      </div>
      <div className="mt-5 flex justify-end gap-5">
        <Button
          texto="Cancelar"
          tipo="button"
          className="rounded-[10px] border-2 border-bg22 p-2 text-lg font-semibold text-bg22"
          onClick={() => navigate("/projetos")}
        />
        <Button
          texto="Confirmar"
          tipo="submit"
          className="rounded-[10px] bg-primary50 p-2 text-lg font-semibold text-on-primary"
        />
      </div>
    </form>
  )
}

export default FormCadastroProjeto

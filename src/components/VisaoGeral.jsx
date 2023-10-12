/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import PropTypes from "prop-types"
import Button from "./Button"

import Swal from 'sweetalert2'
import axios from "../services/axios"

import { BsPlayFill } from "react-icons/bs"

function VisaoGeral({ nomeProjeto, descricaoProjeto, liderProjeto, DataProjetoIniciado }) {
  const [projetoNaoIniciado, setProjetoNaoIniciado] = useState(!DataProjetoIniciado);

  // pegando o mes-ano atual
  const dataAtual = new Date();
  const ano = dataAtual.getFullYear();
  const mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
  const dataInicio = `${mes}-${ano}`;

  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    setProjetoNaoIniciado(!DataProjetoIniciado);
  }, [DataProjetoIniciado]);

  const handleIniciarProjetoClick = async () => {
    const data = {
      "data_inicio_projeto": dataInicio
    }
    const response = await (await axios.post(`/projeto/${id}/iniciarprojeto`, data)
      .then(res => {
        setProjetoNaoIniciado(false)
        Swal.fire('Projeto já iniciado!', '', 'sucess');
      })
      .catch(error => {
        console.log("error", error);
      }))
  }

  const handleExcluirProjetoClick = async  () => {
    const confirmacao = await Swal.fire({
      icon: 'warning',
      title: 'Cuidado!',
      text: 'Tem certeza que deseja excluir esse projeto?',
      showDenyButton: true,
      confirmButtonText: 'Sim',
      denyButtonText: `Não`,
    });

    if (confirmacao.isConfirmed) {
      try {
        const response = await axios.delete(`/projeto/deletar/${id}`);
        Swal.fire('Excluído com sucesso!', '', 'success');
        navigate("/projetos")
      } catch (error) {
        console.error('Erro ao excluir o projeto:', error);
      }
    }
  };

  return (
    <div className="m-5 rounded-md bg-bg100 p-4 drop-shadow-md">
      <h2 className="text-xl font-medium text-on-light">Visão Geral</h2>
      <hr className="border-n90" />

      <div className="my-3 flex justify-between">
        <div className="flex max-w-2xl flex-col gap-2">
          <h3 className="text-2xl font-medium text-complementary-20">
            {nomeProjeto}
          </h3>
          <p className="text-n20">
            {descricaoProjeto}
          </p>
        </div>
        <div className="flex flex-col gap-5">
          {projetoNaoIniciado && (
            <>
              <Button
                texto="Iniciar projeto"
                iconeOpcional={BsPlayFill}
                iconeTamanho="20px"
                className="mr-5 flex h-2/6 items-center gap-1 rounded-[10px] bg-primary50 p-2 text-lg font-semibold text-on-primary"
                onClick={handleIniciarProjetoClick}
              />
              <Button
                texto="Excluir projeto"
                iconeOpcional={BsPlayFill}
                iconeTamanho="20px"
                onClick={handleExcluirProjetoClick}
                className="mr-5 flex h-2/6 items-center gap-1 rounded-[10px] bg-primary51 p-2 text-lg font-semibold text-on-primary"
              />
            </>
          )}
        </div>
      </div>

      <span className="mt-2 inline-grid grid-cols-2 gap-2 text-n20">
        <span className="font-semibold text-complementary-20">
          Líder do projeto:
        </span>
        <span>{}</span>
      </span>
      <br />
      <span className="mt-2 inline-grid grid-cols-2 gap-2 text-n20">
        <span className="font-semibold text-complementary-20">
          Info Relevante:
        </span>
        <span>{}</span>
      </span>
      <br />
      <span className="mt-2 inline-grid grid-cols-2 gap-2 text-n20">
        <span className="font-semibold text-complementary-20">
          Info Relevante:
        </span>
        <span>{}</span>
      </span>
    </div>
  )
}

VisaoGeral.propTypes = {
  nomeProjeto: PropTypes.string.isRequired,
  descricaoProjeto: PropTypes.string,
  liderProjeto: PropTypes.string
}

export default VisaoGeral

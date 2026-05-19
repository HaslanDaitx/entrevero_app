import { useState } from "react"

function Localizacao() {
  const [cep, setCep] = useState("")
  const [endereco, setEndereco] = useState(null)
  const [mostrarEndereco, setMostrarEndereco] = useState(false)
  const [erro, setErro] = useState("")

  async function buscarLocalizacao() {
    const cepLimpo = cep.replace(/\D/g, "")

    if (cepLimpo.length !== 8) {
      setErro("Digite um CEP válido com 8 números.")
      setEndereco(null)
      setMostrarEndereco(false)
      return
    }

    try {
      const resposta = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`)
      const dados = await resposta.json()

      if (dados.erro) {
        setErro("CEP não encontrado.")
        setEndereco(null)
        setMostrarEndereco(false)
        return
      }

      setEndereco(dados)
      setMostrarEndereco(true)
      setErro("")
    } catch {
      setErro("Erro ao buscar o CEP.")
      setEndereco(null)
      setMostrarEndereco(false)
    }
  }

  return (
    <section className="mb-8 bg-white rounded-3xl shadow-sm border border-slate-200 p-6">
      <div className="flex flex-col md:flex-row md:items-end gap-4">
        <div className="flex-1">
          <h2 className="text-xl font-bold text-slate-800">
            Localização do evento
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Informe o CEP para buscar os dados pelo ViaCEP.
          </p>

          <label className="block text-sm font-semibold text-slate-700 mt-4 mb-1">
            CEP
          </label>

          <input
            type="text"
            placeholder="Ex: 95560000"
            value={cep}
            onChange={(event) => setCep(event.target.value)}
            className="w-full border border-slate-300 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="button"
          onClick={buscarLocalizacao}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-xl transition"
        >
          Buscar localização
        </button>

        {endereco && (
          <button
            type="button"
            onClick={() => setMostrarEndereco(!mostrarEndereco)}
            className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-6 py-2 rounded-xl transition"
          >
            {mostrarEndereco ? "Esconder" : "Exibir"}
          </button>
        )}
      </div>

      {erro && (
        <p className="mt-4 bg-red-50 text-red-600 text-sm px-4 py-2 rounded-xl">
          {erro}
        </p>
      )}

      {endereco && mostrarEndereco && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200">
            <p className="text-xs text-slate-500">CEP</p>
            <p className="font-bold text-slate-800">{endereco.cep}</p>
          </div>

          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200">
            <p className="text-xs text-slate-500">Cidade</p>
            <p className="font-bold text-slate-800">{endereco.localidade}</p>
          </div>

          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200">
            <p className="text-xs text-slate-500">Bairro</p>
            <p className="font-bold text-slate-800">
              {endereco.bairro || "Não informado"}
            </p>
          </div>

          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200">
            <p className="text-xs text-slate-500">Av/Rua</p>
            <p className="font-bold text-slate-800">
              {endereco.logradouro || "Não informado"}
            </p>
          </div>
        </div>
      )}
    </section>
  )
}

export default Localizacao
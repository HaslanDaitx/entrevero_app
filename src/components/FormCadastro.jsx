import { useState } from "react"

function FormCadastro({ onCadastrar }) {
  const [nome, setNome] = useState("")
  const [telefone, setTelefone] = useState("")
  const [imagem, setImagem] = useState("")
  const [egresso, setEgresso] = useState(false)
  const [pagou, setPagou] = useState(false)
  const [erro, setErro] = useState("")

  function alterarTelefone(event) {
    const apenasNumeros = event.target.value.replace(/\D/g, "")
    const telefoneLimitado = apenasNumeros.slice(0, 11)

    setTelefone(telefoneLimitado)
  }

  function formatarNome(nomeDigitado) {
    return nomeDigitado
      .toLowerCase()
      .split(" ")
      .filter((palavra) => palavra !== "")
      .map((palavra) => palavra.charAt(0).toUpperCase() + palavra.slice(1))
      .join(" ")
  }

  function cadastrarPessoa(event) {
    event.preventDefault()

    if (!nome.trim() || !telefone.trim()) {
      setErro("Nome e telefone são obrigatórios.")
      return
    }

    if (telefone.length < 10) {
      setErro("Informe um telefone válido com DDD. Ex: 51 999999999.")
      return
    }

    const nomeFormatado = formatarNome(nome)

    const novaPessoa = {
      id: Date.now(),
      nome: nomeFormatado,
      telefone,
      imagem,
      egresso,
      pagou,
    }

    onCadastrar(novaPessoa)

    setNome("")
    setTelefone("")
    setImagem("")
    setEgresso(false)
    setPagou(false)
    setErro("")
  }

  return (
  <form onSubmit={cadastrarPessoa} className="space-y-4">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="md:col-span-2">
        <label className="block text-sm font-semibold text-slate-700 mb-1">
          Nome
        </label>
        <input
          type="text"
          placeholder="Digite o nome"
          value={nome}
          onChange={(event) => setNome(event.target.value)}
          className="w-full border border-slate-300 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1">
          Telefone
        </label>
        <input
          type="text"
          inputMode="numeric"
          maxLength={11}
          placeholder="Ex: 51 999999999"
          value={telefone}
          onChange={alterarTelefone}
          className="w-full border border-slate-300 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>

    <div>
      <label className="block text-sm font-semibold text-slate-700 mb-1">
        URL da imagem
      </label>
      <input
        type="text"
        placeholder="Cole a URL da imagem"
        value={imagem}
        onChange={(event) => setImagem(event.target.value)}
        className="w-full border border-slate-300 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
        <p className="text-sm font-semibold text-slate-700 mb-2">
          Egresso/Convidado?
        </p>

        <div className="flex gap-4">
          <label className="flex items-center gap-2 text-sm text-slate-600">
            <input
              type="radio"
              name="egresso"
              checked={egresso === true}
              onChange={() => setEgresso(true)}
            />
            Sim
          </label>

          <label className="flex items-center gap-2 text-sm text-slate-600">
            <input
              type="radio"
              name="egresso"
              checked={egresso === false}
              onChange={() => setEgresso(false)}
            />
            Não
          </label>
        </div>
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
        <p className="text-sm font-semibold text-slate-700 mb-2">
          Pagou?
        </p>

        <div className="flex gap-4">
          <label className="flex items-center gap-2 text-sm text-slate-600">
            <input
              type="radio"
              name="pagou"
              checked={pagou === true}
              onChange={() => setPagou(true)}
            />
            Sim
          </label>

          <label className="flex items-center gap-2 text-sm text-slate-600">
            <input
              type="radio"
              name="pagou"
              checked={pagou === false}
              onChange={() => setPagou(false)}
            />
            Não
          </label>
        </div>
      </div>
    </div>

    {erro && (
      <p className="bg-red-50 text-red-600 text-sm px-4 py-2 rounded-xl">
        {erro}
      </p>
    )}

    <button
      type="submit"
      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-xl transition"
    >
      Cadastrar
    </button>
  </form>
)
}

export default FormCadastro
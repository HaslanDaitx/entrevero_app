import { useState } from "react"
import Header from "./components/Header"
import CardPessoa from "./components/CardPessoa"
import FormCadastro from "./components/FormCadastro"
import Localizacao from "./components/Localizacao"

function App() {
  const [pessoas, setPessoas] = useState([])
  const [nomeUsuario, setNomeUsuario] = useState("")

  const totalConfirmados = pessoas.filter((pessoa) => pessoa.pagou).length
  const totalPendentes = pessoas.filter((pessoa) => !pessoa.pagou).length

  function adicionarPessoa(novaPessoa) {
    const listaAtualizada = [...pessoas, novaPessoa]

    listaAtualizada.sort((a, b) =>
      a.nome.toLowerCase().localeCompare(b.nome.toLowerCase())
    )

    setPessoas(listaAtualizada)
    setNomeUsuario(novaPessoa.nome)
  }

  function confirmarPagamento(id) {
    const listaAtualizada = pessoas.map((pessoa) => {
      if (pessoa.id === id) {
        return {
          ...pessoa,
          pagou: true,
        }
      }

      return pessoa
    })

    setPessoas(listaAtualizada)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-50">
      <Header name={nomeUsuario} />

      <main className="max-w-7xl mx-auto px-6 py-8">
        <section className="mb-8 bg-white rounded-3xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-2xl font-bold text-slate-800">
            Sistema de cadastro do Entrevero
          </h2>

          <p className="text-slate-500 mt-2">
            Cadastre os participantes, acompanhe o status de pagamento e veja a
            lista de confirmados.
          </p>
        </section>

        <Localizacao />

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          <div className="md:col-span-2 bg-white rounded-3xl shadow-sm border border-slate-200 p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  Participantes
                </h2>

                {pessoas.length === 0 && (
                  <p className="text-sm text-slate-500">
                    Nenhum cadastro realizado ainda.
                  </p>
                )}
              </div>

              {pessoas.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {totalConfirmados > 0 && (
                    <span className="bg-green-100 text-green-700 text-sm font-semibold px-4 py-2 rounded-full">
                      {totalConfirmados} confirmado(s)
                    </span>
                  )}

                  {totalPendentes > 0 && (
                    <span className="bg-red-100 text-red-700 text-sm font-semibold px-4 py-2 rounded-full">
                      {totalPendentes} pendente(s)
                    </span>
                  )}
                </div>
              )}
            </div>

            {pessoas.length === 0 ? (
              <div className="border border-dashed border-slate-300 rounded-3xl p-10 text-center">
                <div className="w-16 h-16 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
                  +
                </div>

                <h3 className="text-lg font-bold text-slate-700 mt-4">
                  Nenhum participante cadastrado
                </h3>

                <p className="text-slate-500 mt-2">
                  Use o formulário ao lado para adicionar o primeiro
                  participante.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {pessoas.map((pessoa) => (
                  <CardPessoa
                    key={pessoa.id}
                    pessoa={pessoa}
                    onConfirmarPagamento={confirmarPagamento}
                  />
                ))}
              </div>
            )}
          </div>

          <aside className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 md:sticky md:top-6">
            <h2 className="text-xl font-bold text-slate-800 mb-1">
              Cadastro
            </h2>

            <p className="text-sm text-slate-500 mb-5">
              Preencha os dados para gerar o card.
            </p>

            <FormCadastro onCadastrar={adicionarPessoa} />
          </aside>
        </section>
      </main>
    </div>
  )
}

export default App
import { useState } from "react"
import { Trash2 } from "lucide-react"

function CardPessoa({
  pessoa,
  onConfirmarPagamento,
  onRemoverParticipante,
}) {
  const [mostrarTelefone, setMostrarTelefone] = useState(false)

  return (
    <div
      onClick={() => setMostrarTelefone(!mostrarTelefone)}
      className="relative bg-white border border-slate-200 rounded-3xl shadow-sm p-5 text-center hover:shadow-md transition cursor-pointer"
    >
      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation()

          const confirmar = window.confirm(
            `Deseja realmente excluir ${pessoa.nome}?`
          )
          if (confirmar) {
            onRemoverParticipante(pessoa.id)
          }
        }}
        className="absolute top-4 right-4 p-2 rounded-xl text-red-500 hover:bg-red-50 hover:text-red-700 transition"
      >
        <Trash2 size={18} />
      </button>

      {pessoa.imagem ? (
        <img
          src={pessoa.imagem}
          alt={pessoa.nome}
          className="w-16 h-16 rounded-2xl object-cover mx-auto border border-slate-200"
        />
      ) : (
        <div className="w-16 h-16 rounded-2xl bg-blue-100 mx-auto flex items-center justify-center text-blue-700 font-bold text-2xl">
          {pessoa.nome.charAt(0).toUpperCase()}
        </div>
      )}

      <h4 className="font-bold text-slate-800 mt-4">{pessoa.nome}</h4>

      <p className="text-sm text-slate-500 mt-1">
        {pessoa.egresso ? "Egresso/Convidado" : "Estudante"}
      </p>

      {mostrarTelefone && (
        <p className="text-sm font-semibold text-slate-700 mt-2">
          Tel: {pessoa.telefone}
        </p>
      )}

      <div className="mt-4 flex justify-center">
        <span
          className={`text-xs font-semibold px-3 py-1 rounded-full ${
            pessoa.pagou
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {pessoa.pagou ? "Confirmado" : "Não confirmado"}
        </span>
      </div>

      {!pessoa.pagou && (
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation()
            onConfirmarPagamento(pessoa.id)
          }}
          className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white text-sm font-semibold py-2 rounded-xl transition"
        >
          Confirmar pagamento
        </button>
      )}
    </div>
  )
}

export default CardPessoa
function CardPessoa({ pessoa }) {
  return (
    <div className="bg-white border border-slate-200 rounded-3xl shadow-sm p-5 text-center hover:shadow-md transition">
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
    </div>
  )
}

export default CardPessoa
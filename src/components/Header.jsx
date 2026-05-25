import logoComputacao from "../assets/logo.png"

function Header(props) {
  return (
    <header className="bg-[#003fd1] text-white shadow">
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-wide">
            Entrevero App
          </h1>

          <p className="text-blue-100 mt-2">
            Seja bem-vindo, {props.name || "visitante"}!
          </p>
        </div>

        <img
          src={logoComputacao}
          alt="Logo Computação Ulbra Torres"
          className="h-16 sm:h-20 w-auto object-contain"
        />
      </div>
    </header>
  )
}

export default Header
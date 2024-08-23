import solIcon from '../../assets/images/sol-pro-salud.webp'
import Input from '../UI/Input'

const Header = () => {
  return (
    <div className="mb-6 flex items-center justify-between">
    <div className="flex items-center gap-5">
      <img src={solIcon} alt="Pro Salud" className="w-[100px]" />
      <h1 className="font-heading text-2xl font-bold">Pro Salud Spa</h1>
    </div>
    <div className="flex items-center gap-4">
      <div className="relative w-full max-w-md">
        <div className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"></div>
        <Input placeHolder="Buscar Paciente..." type="search" />
      </div>
      <button
        class="inline-flex h-9 cursor-pointer items-center justify-center whitespace-nowrap rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
        data-id="8"
      >
        Agregar Paciente
      </button>
    </div>
  </div>
  )
}

export default Header;
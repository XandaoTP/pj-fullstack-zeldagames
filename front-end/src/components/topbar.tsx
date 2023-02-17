import logo from '../components/images/logo.png'

export function TopBar () {
    return (
        <header className="flex justify-center bg-stone-900">
            <img src={logo} alt="The legend of Zelda" className="py-5 w-20"/> 
        </header>
    )
}
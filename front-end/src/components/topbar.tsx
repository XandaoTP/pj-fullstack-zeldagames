import logo from '../assets/images/logo.png';
import { useRef, useState } from "react";
import '../assets/css/topbar.css'
import { Link } from 'react-router-dom';


export function TopBar () {
    const [isOpen, setIsOpen] = useState("");
    const [search, setSearch] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    const handleClick = () => {
        if(!isOpen) {
            inputRef.current?.focus();
        }
        setIsOpen(!Boolean(isOpen) ? "open" : "")
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearch(e.target.value);
        console.log(search)
    return (
        <header className="flex justify-center bg-black mb-3 opacity-75">
            <img src={logo} alt="The legend of Zelda" className="py-5 w-20 ml-auto"/>  
            <Link to='/addgame' className="text-white ml-auto mt-auto mb-2 border-2 border-sky-500 p-4 rounded-xl bg-neutral-600">Adicionar novo jogo</Link>
        </header>
    )
}
import logo from '../assets/images/logo.png';
import { useRef, useState } from "react";
import '../assets/css/topbar.css'


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
        <header className="flex justify-between ">
            <img src={logo} alt="The legend of Zelda" className="py-5 w-20"/> 
            <div className="relative text-center">
                <div className={` search ${isOpen}`}>
                    <input
                        ref={inputRef}
                        onChange={handleChange}
                        placeholder="Find a zelda Game"
                        type="text" 
                    />
                    <button
                        onClick={handleClick}
                        className={
                            `uil uil-${
                                isOpen ?
                                "multiply" : "search"}`
                            }>
                    </button>
                    
                </div>         
            </div>
        </header>
    )
}
import { useContext } from 'react';
import { Link } from 'react-router-dom';

import illustrationImg from '../assets/images/illustration.svg'; 
import logoImg from '../assets/images/logo.svg'; 

import '../style/auth.scss'; 
import { Button } from '../components/Button'; 

import { TestContext } from '../App';

import '../style/button.scss';


export function NewRoom(){
    const {value, setValue} = useContext(TestContext);

    return(
        <div id="page-auth">
            <aside>
                <img src = {illustrationImg} alt ='ilustração simbolizando perguntas e respostas'/>
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo-real</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImg} alt="Letmeask" />
                    <h2>Criar uma nova sala</h2>
                    <form  action="">
                        <input 
                        type="text"
                        placeholder="Nome da sala"
                         />
                         <Button type="submit"> 
                           Criar sala 
                         </Button>
                    </form>
                    <p>
                       Quer entrar em sala existente ?
                       <Link to="/">clique aqui</Link>
                    </p>
                </div>
            </main>
        </div>

    )
}


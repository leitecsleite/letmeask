
import { useHistory, useParams } from 'react-router-dom';

import logoImg from '../assets/images/logo.svg'; 
import { Button } from '../components/Button';
import { Question } from '../components/Questions';
import { RoomCode } from '../components/RoomCode';
import checkImg from '../assets/images/check.svg'; 
import answerImg from '../assets/images/answer.svg'; 

import { useRoom } from '../hooks/useRoom';

import '../style/rooms.scss'; 
import { database } from '../services/firebase';



type RoomsParams = {
    id:string; 
}



export function AdminRoom(){
     
    const history = useHistory(); 
    const params = useParams<RoomsParams>(); 
    const roomId = params.id; 
    const {title, questions} = useRoom(roomId);
   
   async function handleEndRoom (){
       await database.ref(`rooms/${roomId}`).update({
           endedAt: new Date(), 
       })

       history.push("/"); 
   }
   
   async function handleDeleteQuestion(questionId: String){
        if(window.confirm("Tem certeza que você deseja excluir esta pergunta?")){
            await database.ref(`rooms/${roomId}/questions/${questionId}`).remove(); 

        }
    }


    async function handleCheckQuestionAsAnswered(questionId: string){
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isAnswered:true, 
        })
    }
  

    async function handleHighlightQuestion(questionId:string) {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isHighlighted:true, 
        })
        
    }

    return(
        <div className= "page-room">
            <header>
                <div className ="content">
                    <img src={logoImg} alt="letmeask" />
                    <div>
                       <RoomCode code= {roomId} />
                       <Button isOutlined onClick = {handleEndRoom} >Encerrar Sala</Button>
                    </div>
                </div>
            </header>

            <main>
                <div className ='room-title'>
                    <h1>Sala {title}</h1>
                    {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
                </div>

                <div className = "question-list">
                {questions.map(questions => {
                    return(
                        <Question
                          key = {questions.id}
                          content = {questions.content}
                          author ={questions.author}
                          isAnswered ={questions.isAnswered}
                          isHighlighted = {questions.isHighlighted}
                        >
                            
                           {!questions.isAnswered && (
                            <>
                               <button
                                 type= "button"
                                 onClick= {() => handleCheckQuestionAsAnswered(questions.id)}
                          
                                >
                                 <img src={checkImg} alt="Marcar pergunta respondida" />
                                </button>

                                <button
                                   type = "button"
                                   onClick = {() => handleHighlightQuestion(questions.id)}
                                >
                                  <img src={answerImg} alt="Dar destaque à pergunta" />
                                 </button> 
                                 </>
                             )} 
                        

                          <button
                            type = "button"
                            onClick = {() => handleDeleteQuestion(questions.id)}
                          >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                               <path d="M3 5.99988H5H21" stroke="#737380" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M8 5.99988V3.99988C8 3.46944 8.21071 2.96074 8.58579 2.58566C8.96086 2.21059 9.46957 1.99988 10 1.99988H14C14.5304 1.99988 15.0391 2.21059 15.4142 2.58566C15.7893 2.96074 16 3.46944 16 3.99988V5.99988M19 5.99988V19.9999C19 20.5303 18.7893 21.039 18.4142 21.4141C18.0391 21.7892 17.5304 21.9999 17 21.9999H7C6.46957 21.9999 5.96086 21.7892 5.58579 21.4141C5.21071 21.039 5 20.5303 5 19.9999V5.99988H19Z" stroke="#737380" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                          </button>
                       
                       </Question>
                    )
                })}
                </div>
            </main>
            
        </div>
    )
}
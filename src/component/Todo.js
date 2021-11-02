import React, { useEffect, useState } from 'react'
import todo from '../images/todo.png'



const getLocalItems = () => {
    let list = localStorage.getItem('lists');

    if(list){
        return JSON.parse(localStorage.getItem('lists')); 
    }else{
        return [];
    }
}

const Todo = () => {

    const [inputdata,setInputData] = useState('');
    const [items, setItems] = useState(getLocalItems());
    const [toggleSubmit, setToggleSubmit] = useState(true);
    const [isEditItem, setIsEditItem] = useState(null);

     const addItem = () => {
         if(!inputdata){

         }
         else if(inputdata && !toggleSubmit){
             setItems(
                 items.map((elem) => {
                     
                        if(elem.id === isEditItem){
                         return {...elem, name:inputdata}
                        }
                        return elem;
                    
                 })
             )

             setToggleSubmit(true);
             setInputData('');
       
             setIsEditItem(null);
         }
         else{
             const allInput = {id: new Date().getTime().toString(), name: inputdata}
        setItems([...items,allInput]);
        setInputData('');
     }
    }

    const deleteItem = (ind) => {
    
       const updateditems = items.filter((elem) => {
        return ind !== elem.id;
       })

       setItems(updateditems);
    }

    const editItem  = (id) => {
      let newEditItems  = items.find((elem) => {
           return elem.id === id;
      });

      setToggleSubmit(false);
      setInputData(newEditItems.name);

      setIsEditItem(id);

    }

    const removeAll = () => {
        setItems([]);
    }

    useEffect(() => {
      localStorage.setItem('lists',JSON.stringify(items));
    },[items]);
    return (
    <>
     
     <div className='main-div'>
         <div className='child-div'>
          <figure>
              <img src={todo} alt='todoicon'/>
              <figcaption>Add Your List Here ✌</figcaption>
          </figure>

          <div className='addItem'>
           <input type='text' placeholder='✍ Add Items...' 
               value = {inputdata}
               onChange={(e) =>
                   setInputData(e.target.value)
               }
           />
             {
               toggleSubmit ? <i className="fa fa-plus add-Btn" title='Add item' 
                onClick={addItem}
           /> :
           <i className="far fa-edit edit-Btn" title='Update item' 
                onClick={addItem}
           />
           }

          </div>

          <div className='showItem'>

          {
              items.map((elem) => {
              return (
                <div className='eachItem' key={elem.id}>
              <h4>{elem.name}</h4>
              <i className='fa fa-edit edit-Btn' title='Edit item'
                  onClick={() => editItem(elem.id)}
              />
              <i className='fa fa-trash-alt trash-Btn' title='Delete item'
                  onClick={() => deleteItem(elem.id)}
              />
           </div>
          
              )
              })
          }
         </div>
         <div className='showItems'>
         <button className='btn effect04' 
         onClick={removeAll}><span>Remove All</span></button>
         </div>

         </div>
     </div>

    </>
    )
}


export default Todo
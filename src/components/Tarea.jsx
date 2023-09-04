import React, { useEffect } from 'react'
import '../styles/tarea.css'

const Tarea = ({work, visibleForm, setVisibleForm, setUpdateInfo, deleteW, update}) => {
    
  const handleEdit = id => {
       
        setVisibleForm(!visibleForm)
        setUpdateInfo(id)
        update(id)
  }
  
    return (
       
        <div className="works">
            <ul className='list__works'>

                <li className='item__works'>
                    <h4 className='title__item'>Title</h4>
                    <span className='value__item'>
                        {work?.title}
                    </span>
                </li>
               
                <li className='item__works'>
                    <h4 className='title__item'>Description</h4>
                    <span className='value__item'>
                        {work?.description}
                    </span>
                </li>

                <li className='item__works'>
                    <h4 className='title__item'>Completed</h4>
                    <span className={`value__item ${work?.completed ? 'good' : 'bad'}`}>
                        {
                        work?.completed
                        ?
                        'Yes'
                        :
                        'No'
                        }
                    </span>
                </li> 
            </ul>

            <i class='bx bx-edit' onClick={() => handleEdit(work?.id)}></i>
            <i class='bx bx-trash' onClick={() => deleteW(work?.id)}></i>

        </div>
  
    )
}

export default Tarea
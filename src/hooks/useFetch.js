import axios from 'axios'
import { useEffect, useState } from 'react'

const useFetch = () => {

    const [works, setWorks] = useState([]);
    const [singleWork, setSingleWork] = useState(null);

    const allWork = () => {

        axios
            .get('https://tareasserver-q3pl.onrender.com/todos')
            .then(res => {
                setWorks(res.data);
            })
            .catch(err => console.log(err));
    }

    const workById = async (id) => {
        
        try {
            const response = await axios.get(`https://tareasserver-q3pl.onrender.com/todos/${id}`);
            
            setSingleWork(() => response.data); 
        } catch (err) {
            console.log(err);
        }
    }

    // Esto es un efecto secundario que se ejecutará cada vez que singleWork cambie
    useEffect(() => {

        if (singleWork !== null) {
           
        }
        
    }, [singleWork]);

    const addWork = data => {

        axios
            .post('https://tareasserver-q3pl.onrender.com/todos', data)
            .then(res => {
                
                allWork();
            })
            .catch(err => console.log(err));

    }

    const updateWork = (id, data) => {

        axios
            .put(`https://tareasserver-q3pl.onrender.com/todos/${id}`, data)
            .then(res => {
               
                allWork()
            })
            .catch(err => console.log(err));
    }

    const deleteWork = id => {

        axios
            .delete(`https://tareasserver-q3pl.onrender.com/todos/${id}`)
            .then(res => {
             
                allWork();
            })
            .catch(err => console.log(err));
    }

    return [works, allWork, workById, singleWork, addWork, updateWork, deleteWork];
}

export default useFetch
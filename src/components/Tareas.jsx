import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch"
import Tarea from "./Tarea";
import '../styles/tareas.css'
import { useForm } from "react-hook-form";

const Tareas = () => {

    //--------- scripts, states, hooks-------------

    const [works, allWork, workById, singleWork, addWork, updateWork, deleteWork] = useFetch();
    const [visibleForm, setVisibleForm] = useState(false)
    const [updateInfo, setUpdateInfo] = useState()
    const [loading, setLoading] = useState(false)
    const [isWorkByIdComplete, setIsWorkByIdComplete] = useState(false);
    const { register, reset, handleSubmit } = useForm()

    //---------------------useEfect's---------------------------------------------

    useEffect(() => {

        setLoading(false)
        allWork()
        setLoading(true)
    }, [])

    useEffect(() => {

        setLoading(false)
        if (isWorkByIdComplete) {
            // Accede a singleWork cuando isWorkByIdComplete sea true
            const data = singleWork;

            reset({
                title: data?.title,
                description: data?.description,
                completed: data?.completed,
            });
        }
        setLoading(true)

    }, [isWorkByIdComplete, reset, singleWork]);

    //----------function's------------------------------
    const addNewWork = () => {

        reset({
            title: '',
            description: '',
            completed: false,
        });

        setVisibleForm(!visibleForm)
    }

    const update = async (id) => {

        setLoading(false)
        await workById(id);
        setIsWorkByIdComplete(true);
        setLoading(true)
    }

    const deleteW = id => {

        setLoading(false)
        deleteWork(id)
        setLoading(true)
    }

    const submit = data => {
        
        setLoading(false)
        if (updateInfo) {

            updateWork(updateInfo, data)
            allWork()
            setUpdateInfo()

        } else {

            addWork(data)

        }

        setVisibleForm(!visibleForm)

        reset({
            title: '',
            description: '',
            completed: '',
        });
        setLoading(true)
    }

    const close = () => {

        setVisibleForm(!visibleForm)
        setUpdateInfo()
        reset({
            title: '',
            description: '',
            completed: '',
        });
    }
    //-----------return------------------------------
    console.log(works)
    return (
        <div className="main__works">
            <div className="container__works">
                
                
                <h2 className="title__works">works</h2>

                <i onClick={addNewWork} class='bx bx-comment-add'>New</i>

                <img className='pacman__img' src="/fotos/pacman.png" alt="" />

                <div className={`form__container loading ${loading ? 'hide_form' : 'show_form'}`}>Loading...</div>
                <div className={`form__container ${!visibleForm ? 'hide_form' : 'show_form'}`}>

                    <form onClick={e => e.stopPropagation()} className={`form__work `} onSubmit={handleSubmit(submit)}>
                        <h4 className="close__btn" onClick={() => close()}>X</h4>
                        <div className="form__group">
                            <label className='form__label' htmlFor="title">Title</label>
                            <input className="form__input"{...register('title')} type="textarea" id="title" />
                        </div>
                        <div className="form__group description">
                            <label className='form__label' htmlFor="description">Description</label>

                            <textarea name="textarea" rows="10" cols="50" className="form__input  description"{...register('description')} type="textarea" id="description">Write something here</textarea>
                        </div>
                        <div className="form__group">
                            <label className='form__label' htmlFor="completed">Completed</label>
                            <input className="form__input check" {...register('completed')} type="checkbox" id="completed" />
                        </div>
                        <button className="form__btn">{updateInfo ? 'Update' : 'ADD'}</button>
                    </form>
                </div>

                <div className="scroll__container">

                    {
                        works?.map(work => (
                            <Tarea
                                key={work?.id}
                                work={work}
                                setVisibleForm={setVisibleForm}
                                visibleForm={visibleForm}
                                setUpdateInfo={setUpdateInfo}
                                deleteW={deleteW}
                                update={update}
                            />
                        ))
                    }

                </div>
                <div className="data__container">
                <h4 className="database">dataBase: <span className={`${!works.length == 0 ? 'conected' : 'disconected'}`}>{!works.length == 0 ? 'conected' : 'Disconnected'}</span></h4>
                </div>
            </div>

        </div>
    )
}

export default Tareas
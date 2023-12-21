import { useState, useEffect } from "react";
import {useDropzone} from 'react-dropzone'
import {useNavigate } from "react-router-dom";
import axios from "axios";
import upload_icon from "./../assets/upload.png";
import delete_icon from "./../assets/delete.svg";
// import Result from './pages/Result';

export default function LandingPage({setRes}) {
    // const inputRef = useRef(null);
    const navigate = useNavigate();
    const [file, setFile] = useState([]);
    const [isDisabled, setDisabled] = useState(true);
    const [loading, setLoading] = useState(false);
    const { getRootProps, getInputProps} = useDropzone({
        accept: {
            'audio/wav': ['.wav']
        },
        onDrop: (acceptedFiles) => {
            setFile(acceptedFiles);
            setDisabled(false);
            console.log(file);
        },
        maxFiles:1
    });

    useEffect(() => {
        if (file.length > 0) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
        if (loading === true) {
            setDisabled(true);
        }
    }, [file, loading])

    const handleRemove = (name) => {
        setFile(file.filter(item => item.name !== name));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file[0]);
        setLoading(true);
        setDisabled(true);
        await axios.post('http://localhost:5000/predict', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((res) => {
            console.log(res);
            setRes(res.data);
            navigate('/result');

        }).catch((err) => {
            console.log(err);
        })
    }

    return (
        <div className="w-full h-screen bg-zinc-200">
            <div className="container mx-auto">
                <div className="w-full min-h-screen flex justify-center items-center">
                    <div className="w-1/2 h-auto bg-white rounded-3xl px-8 py-6">
                        <h1 className="text-3xl font-bold"> PCG <br/> ASSISTANT</h1>
                        <div className="mt-8">
                            <span>
                                <p className="text-xl font-semibold text-start">Upload PCG</p>
                            </span>
                        </div>
                            <div className="flex justify-center content-center mt-2">
                                <div {...getRootProps({className: 'dropzone'})} className="w-full h-[312px] bg-green-999 bg-opacity-10 rounded-lg border-dashed border-2 border-green-999 p-8 hover:cursor-pointer">
                                    <div className="flex justify-center items-center">
                                        <img src={upload_icon} alt="icon_upload" />
                                    </div>
                                    <div className="mt-10">
                                        <div>
                                            <input {...getInputProps()}/>
                                            <p className="text-2xl font-semibold hover:cursor-pointer mb-2">Drag & Drop Files or <span className="underline text-green-999">Browse</span></p>
                                            <p className="opacity-70">Supported Format : *.WAV</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-8">
                                {file.map((item) => {
                                    return (
                                        <div className="w-full h-16 flex justify-between items-center rounded-lg border-solid border-2 border-green-999 px-8">
                                            <span className="text-xl">{item.name}</span>
                                            <button onClick={()=>handleRemove(item.name)}> <img src={delete_icon} alt="delete"/></button>
                                        </div>
                                    )
                                })}
                            </div>
                            <div>
                                <button onClick={handleSubmit} className="w-full mt-12 bg-green-999 rounded-lg text-white text-2xl font-bold p-4 disabled:opacity-50" disabled={isDisabled}>{loading === false ? 'Upload File' : 'Loading...'}</button>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
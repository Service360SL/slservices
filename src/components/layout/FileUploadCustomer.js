import React from 'react';
import { useState } from 'react';
import '../../style/Customer/PostVacancyForm.css'

function FileUpload() {
    const [file, setFile] = useState()
    function handleFile(event) {
        setFile(event.target.files[0])
        console.log(event.target.files[0])
    }

    function handleUpload() {
        const formData = new FormData()
        formData.append('file', file)
        fetch('url',
            {
                method: "POST",
                body: formData
            }).then((response) => response.json()).then(
                (result) => {
                    console.log('success', result)
                }
            )
            .catch(error => {
                console.error("Error:", error)
            })
    }
    return (
        <div>
            <form onSubmit={handleUpload}>
                <input type="file" name="file" onChange={handleFile} />
                <button className='upload_1'>Upload</button>
            </form>
        </div>

    );

}

export default FileUpload;
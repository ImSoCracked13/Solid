import { createSignal, createEffect } from 'solid-js';

function FileUpload() {
    const [files, setFiles] = createSignal([]);

    createEffect(() => {
        fetch('http://localhost:5000/api/files')
            .then(res => res.json())
            .then(data => setFiles(data));
    });

    const handleUpload = async (event) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
        
        await fetch('http://localhost:5000/api/upload', {
            method: 'POST',
            body: formData
        });
        
        fetch('http://localhost:5000/api/files')
            .then(res => res.json())
            .then(data => setFiles(data));
    };

    const handleDelete = async (id) => {
        await fetch(`http://localhost:5000/api/files/${id}`, {
            method: 'DELETE'
        });
        
        setFiles(files().filter(file => file._id !== id));
    };

    return (
        <div>
            <input type="file" onChange={handleUpload} />
            <ul>
                {files().map(file => (
                    <li>
                        {file.filename} 
                        <button onClick={() => handleDelete(file._id)}>Delete</button>
                        <a href={`http://localhost:5000/api/files/download/${file._id}`} download>
                            <button>Download</button>
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default FileUpload;
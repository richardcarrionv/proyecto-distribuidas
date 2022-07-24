import {useState} from 'react';


const useEntity = (init) => {
    const [form, setForm] = useState(init)

    const handleChange = (key) => (value) => {
        setForm({...form, [key]: value});
    };

    return [form, handleChange]
}

export default useEntity;
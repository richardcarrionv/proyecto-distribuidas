import {useState} from 'react';


const useForm = (initEntity, displayForm, api) => {

    const [entity, setEntity] = useState(initEntity)

    const handleChange = (key) => (value) => {
        if(key == 'latitude'){
            setEntity({...entity, latitude: value})
            console.log(entity)
        }
        setEntity({...entity, [key]: value});
    };

    const save = () => {
        if (entity.id == null) {
            api.create(entity);
        } else {
            api.update(entity);
        }
        displayForm.hide()
    };

    const edit = (row) => () => {
        setEntity(row);
        displayForm.show()
    };

    const del = (id) => () => {
        return api.del(id);
    };

    const createNew = () => {
        setEntity({...initEntity});
        displayForm.show()
    };

    const createNewWithCustomProperties = (customProperties) => {
        setEntity({...initEntity, ...customProperties})
        displayForm.show()
    }

    return {
        entity,
        handleChange,
        createNew,
        createNewWithCustomProperties,
        edit,
        del,
        save,
        setEntity
    }

}

export default useForm;
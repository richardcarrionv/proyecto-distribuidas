import {useState} from 'react';


const useDisplay = (init) => {

    const [display, setDisplay] = useState(init);

    const hide = () => { setDisplay(false)}
    const show = () => { setDisplay(true)}

    return { display, show, hide }
}

export default useDisplay;
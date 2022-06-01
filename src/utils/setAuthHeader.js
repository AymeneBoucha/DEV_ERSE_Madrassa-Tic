import axios  from "axios";

const setAuthHeader = (accessToken) => {
    if (accessToken) {
        axios.defaults.headers = {
            xaccesstoken :  accessToken,
        } 
    }else {
        delete axios.defaults.headers.head ;
    }
};

export default setAuthHeader;
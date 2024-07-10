import * as React from "react";
import { Button, Text } from '@fluentui/react-components';
import { useNavigate } from "react-router-dom";
import { Loader } from "../Loader/loader";
import { getAccessToken } from "../services/Accesstoken";
import { useEffect } from "react";
const Main: React.FC = () => {
    ////states
    const navigate = useNavigate();
    const [loading, setLoading] = React.useState(true)

    ///navigate to search screen

    const handleSearch_Click = () => {
        navigate("/SearchPage")
    }
    // navigate to transform screen
    const handleTransform_Click = () => {
        navigate("/ExceltblComponent")
    }

    ///logout function
    const handleLogout_Click = () => {
        setLoading(true)
        window.localStorage.clear();
        let token = getAccessToken();
        if (token == null || token == "" || token == undefined) {
            setTimeout(() => {
                setLoading(false);
                window.location.reload();
            }, 1000);
        } else {
            setLoading(false);
        }
    }

    //// check token 
    useEffect(() => {
        let storedToken = getAccessToken();
        storedToken = storedToken ? JSON.parse(storedToken) : null;
        setLoading(false);
    }, []);
    return (
        <>
            <div style={{
                paddingTop: "20vh",
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <div style={{ marginBottom: '20px', textAlign: 'center' }}>
                    <Text style={{ fontWeight: 'bold' }}>Menu</Text>
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <Button style={{ backgroundColor: '#005A9E', color: '#fff', width: '100px' }} onClick={handleSearch_Click}>Search</Button>
                </div>
                <div>
                    <Button style={{ backgroundColor: '#005A9E', color: '#fff', width: '100px' }} onClick={handleTransform_Click}>  Document Viewer</Button>
                </div>

                <div style={{ marginTop: '20px' }}>
                    <Button style={{ backgroundColor: '#005A9E', color: '#fff', width: '100px' }} onClick={handleLogout_Click}>Logout</Button>
                </div>
            </div>

            {loading ? <Loader /> : ""}

        </>
    );
};

export default Main;

import * as React from "react";
import { Button, Dropdown, Input, Label, Option, Subtitle2, Text } from '@fluentui/react-components';
import { ArrowLeftRegular } from "@fluentui/react-icons";
import { useNavigate } from "react-router-dom";
const SearchForm: React.FC = () => {

    const navigate = useNavigate();

    const gotoMainPage = () => {
        navigate("/");
    }
    return (
        <div style={{ padding: "5px" }}>
            <div style={{ padding: "8px", display: "flex" }}>

                <ArrowLeftRegular onClick={gotoMainPage} style={{ fontSize: "x-large", cursor: "pointer" }} />
                <div style={{ display: "flex", justifyContent: "center", width: "82%" }}>
                    <Subtitle2>Search</Subtitle2>
                </div>

            </div>

            <div style={{ display: "flex", padding: "8px" }}>
                <Label style={{ fontWeight: "bold" }}>Query 1</Label>
            </div>

            <div style={{ paddingTop: "10px" }}>
                <div style={{ display: "flex", justifyContent: "center", padding: "8px" }}>
                    <Input placeholder="String" style={{ width: "80%" }} />
                </div>

                <div style={{ display: "flex", justifyContent: "center", padding: "8px" }}>
                    <Dropdown placeholder="Scope" style={{ width: "80%", minWidth: "80%", maxWidth: "80%" }}>
                        <Option>per file</Option>
                        <Option>global</Option>
                    </Dropdown>
                </div>

                <div style={{ display: "flex", justifyContent: "center", padding: "8px" }}>
                    <Input placeholder="Keywords" style={{ width: "80%" }} />
                </div>

                <div style={{ display: "flex", justifyContent: "center", padding: "8px" }}>
                    <Input placeholder="Prompt" style={{ width: "80%" }} />
                </div>

                <div style={{ display: "flex", justifyContent: "center", padding: "8px" }}>
                    <Button style={{ backgroundColor: '#005A9E', color: '#fff', width: "30%" }}>Search</Button>
                </div>
            </div>
        </div>
    );
};

export default SearchForm;

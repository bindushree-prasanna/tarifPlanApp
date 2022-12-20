/**
 * 
 * function to FetchTarifData
 * View the tarif plan
 * sort by charges, download speed and upload speed
 * tab view to display
 */
import React, { useEffect, useState } from "react";
import axios from "axios";
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./TarifDisplay.scss";
import "./tarifStyles.css"
// import "dist/_include-media.scss";

function FetchTarifData() {
    const [plans, setPlans] = useState([]);
    let increment = 1;
    let sortedData;
    useEffect(() => {
        axios
            .get(`https://mocki.io/v1/16fb8f94-09ca-4a59-804c-55adf401e115`)
            .then((response) => {
                console.log(response);
                setPlans(response.data.Tarif);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const sortByCharges = () => {
        const tarifCopy = [...plans];
        sortedData = tarifCopy.sort((a, b) => {
            return parseFloat(a.charges) - parseFloat(b.charges);
        })
        setPlans(sortedData);
    }

    const sortByUploadSpeed = () => {
        const tarifCopy = [...plans];
        sortedData = tarifCopy.sort((a, b) => {
            return parseFloat(b.upload) - parseFloat(a.upload);
        })
        setPlans(sortedData);
    }

    const sortByDownloadSpeed = () => {
        const tarifCopy = [...plans];
        sortedData = tarifCopy.sort((a, b) => {
            return parseFloat(b.download) - parseFloat(a.download);
        })
        setPlans(sortedData);
    }
    return (
        <div>
            <div className="d-button">
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Sort by
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => sortByCharges()}>Low Prices</Dropdown.Item>
                        <Dropdown.Item onClick={() => sortByUploadSpeed()}>Upload Speed</Dropdown.Item>
                        <Dropdown.Item onClick={() => sortByDownloadSpeed()}>Download Speed</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
            {plans.map((plan) => (
                <>
                    <div className="div-container">
                        <div className="item">{increment}</div>
                        <div className="item" key={plan.id}>
                            {plan.title}
                        </div>
                        <div>
                            <div>
                                <span>Download</span>
                                <div> <button disabled> &darr; {plan.download} </button> </div>
                            </div>
                            <div>
                                <span>Upload</span>
                                <div> <button disabled> &uarr; {plan.upload} </button> </div>
                            </div>
                        </div>
                        <div className="item-list">
                            {plan.description.map((item) => (
                                <ul>
                                    <li>{item} </li>
                                </ul>
                            ))}
                        </div>
                        <div className="item-button">
                            <div>{plan.charges}</div>
                            <div>
                                <button>{`To Tarif >`} </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-display">
                        {increment = increment + 1}
                    </div>
                </>
            ))}
        </div>
    );
}

export default FetchTarifData;

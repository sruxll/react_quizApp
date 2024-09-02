import React, { useState, useEffect } from 'react';
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import axios from 'axios';
import { FilterMatchMode } from "primereact/api";
import { InputText } from "primereact/inputtext";


function Submissions() {
    const [data, setData] = useState([]);

    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });

    useEffect(() => { 
        axios.get('/api/fetchsubmission').then(response => {
            setData(response.data);
        }).catch(error => {
            console.error('Error fetching submission data:', error);
        });
    }, []);
           
    return (
        <div>
            <InputText 
            onInput={(e) =>
                setFilters({
                    global: {value: e.target.value, matchMode: FilterMatchMode.CONTAINS},
                })
            }/>
            <DataTable value={data} sortedMode="multiple" filters={filters}
                paginator rows={10} rowsPerPageOptions={[1,2,3,4,5,6,7,8,9,10]} totalRecords={10}>
                {/* <Column field="submissionID" header="SubmissionID" /> */}
                <Column field="username" header="Username" />
                <Column field="assignmentName" header="Assignment name" sortable />
                <Column field="score" header="Score (%)" sortable />
                <Column field="timeStamp" header="Submission time" sortable />
            </DataTable>
        </div>
    );
};

export default Submissions;

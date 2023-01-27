import React, { useEffect, useState } from "react";
import '../styles/FetchData.css';
import Pagination from "./Pagination";

let PageSize = 10;

const FetchData = () => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const getApi = (_start) => {
        fetch(`https://jsonplaceholder.typicode.com/posts?_start=${(_start - 1) * 10}&_limit=10`)
            .then((response) => response.json())
            .then((data) => setData(data));
    }

    useEffect(() => {
        getApi(currentPage);
    }, [currentPage])


    console.log(`currentPage ${currentPage}`);
    return (
        <div>
            <table className="table">
                <tr>
                    <th>ID</th>
                    <th>USER ID</th>
                    <th>TITLE</th>
                </tr>
                {data && data.length > 0 && data.map((item, index) => (
                    <TableRow key={item.id} item={item} />
                ))
                }
            </table>
            <Pagination
                currentPage={currentPage}
                totalCount={100}
                pageSize={PageSize}
                onPageChange={page => setCurrentPage(page)}
            />
        </div>

    );
}

const TableRow = ({ item }) => {
    const [desc, setDesc] = useState('');
    return (
        <tr key={item.id} onClick={() => {
            setDesc(item.body)
        }}>
            <td>{item.id}</td>
            <td>{item.userId}</td>
            <td className="title">
                <a href="#">{item.title}</a>
                <div className="description">
                    {desc}
                </div>
            </td>
        </tr>
    );

}

export default FetchData;
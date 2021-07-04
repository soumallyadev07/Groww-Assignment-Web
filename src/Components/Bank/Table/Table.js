import React, { useState, useEffect } from 'react'
import axios from 'axios'
import DataRow from '../DataRow/DataRow'

function Table() {


    const [items, setItems] = useState([])
    var url_string = window.location.href
    var url = new URL(url_string);
    var cityName = url.searchParams.get("city");
    var bankName =  url.searchParams.get("bank_name");

    const [city, setCity] = useState("MUMBAI")
    const [bank, setBank] = useState("ABHYUDAYA COOPERATIVE BANK LIMITED")
    const [isLoading, setIsLoading] = useState(true)

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setitemsPerPage] = useState(10);


    const [pageNumberLimit, setPageNumberLimit] = useState(10);
    const [maxPageLimit, setMaxPageLimit] = useState(10);
    const [minPageLimit, setMinPageLimit] = useState(0);

    const changePage = (event) => {
        console.log(event.target.id)
        setCurrentPage(Number(event.target.id))
    }

    var pages = []
    for(let i=1; i<=Math.ceil(items.length/itemsPerPage); i++){
        pages.push(i);
    }


    const indexOfLastItem = currentPage*itemsPerPage
    const indexOdFirstItem = indexOfLastItem - itemsPerPage
    
    const renderPageNumbers = pages.map(number=>{

        if(number < maxPageLimit+1 && number > minPageLimit){
            return (
                <li key={number} className={currentPage == number ? "page-item active" : "page-item"} >
                    <a className="page-link" id={ Number(number) } onClick={changePage} >{number}</a>
                </li>
            )
        }
        else{
            return null
        }
    })


    function handleResultChange(e){
        setitemsPerPage(Number(e.target.value))
    }

    useEffect (() => {
        const fetchItems = async () => {
            if(cityName != null || bankName != null){
                setCity(cityName)
                setBank(bankName)
            }
            console.log(cityName, bankName, "ebiufu3rbf")          
            const result = await axios(`https://vast-shore-74260.herokuapp.com/banks?city=${cityName}&bank_name=${bankName}`)

            console.log(result.data)
            setItems(result.data)
            setIsLoading(false)
        }
        fetchItems()
    }, [])

    const handleNextButton = () => {

        if(currentPage+1 <= pages.length){
            setCurrentPage(currentPage+1)

            if(currentPage+1 > maxPageLimit){
                setMaxPageLimit(maxPageLimit+pageNumberLimit)
                setMinPageLimit(minPageLimit+pageNumberLimit)
            }
        }
    }

    const handlePreviousButton = () => {
        if (currentPage-1 > 0){
            setCurrentPage(currentPage-1)
            if((currentPage-1)%pageNumberLimit == 0){
                setMaxPageLimit(maxPageLimit-pageNumberLimit)
                setMinPageLimit(minPageLimit-pageNumberLimit)
            }
        }
    }

    let pageIncBtn = null
    if(pages.length > maxPageLimit){
        pageIncBtn = <li className={currentPage == pages.length ? "page-item disabled" : "page-item"}><a className="page-link" onClick={handleNextButton} > &hellip; </a></li>
    }

    let pageDecBtn = null
    if(pages.length > maxPageLimit){
        pageDecBtn = <li className={currentPage == 1 ? "page-item disabled" : "page-item"}><a className="page-link" onClick={handlePreviousButton} > &hellip; </a></li>
    }


    const [filterName, setFilterName] = useState("ifsc")
    const [filterFn, setFilterFn] = useState({fn: items => {return items}})

    function handleFilterChange(e){
        setFilterName(e.target.value)
    }


    function handleSearch(e){
        let target = e.target
        setTimeout(() => {  
            setFilterFn({
                fn: items => {
                    if(target.value == ""){
                        return items
                    }
                    else{
                        console.log(filterName);
                        return items.filter(x => x[filterName].toLowerCase().includes(target.value.toLowerCase()))
                    }
                }
            })
        }, 2000);
    }

    const currentItems = filterFn.fn(items).slice(indexOdFirstItem, indexOfLastItem)
    pages = pages.slice(0,filterFn.fn(items).length - 1)
    console.log(pages)


    return (
        <div className="container-fluid justify-content-center">
            <h1 className='p-2 text-center'>{ city }</h1>
            <h2 className='text-center'>{ bank }</h2>
            <div className='p-2 d-flex justify-content-end'>

                <div className="p-1 mb-3">
                    <select id="Select" className="btn btn-secondary" onChange={handleFilterChange}>
                        <option value="none" defaultValue disabled hidden>
                            Select Category
                        </option>
                        <option value="ifsc">IFSC</option>
                        <option value="branch">Branch</option>
                        <option value="address">Address</option>
                    </select>
                </div>
                <div className="p-1 mb-3">
                    <input type="text" className="form-control" placeholder="" onChange={handleSearch}/>
                </div>
            </div>
            <div className="table-responsive ">
                <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-center">
                        <li className={currentPage == 1 ? "page-item disabled" : "page-item"}><a className="page-link" onClick={handlePreviousButton} >Previous</a></li>
                        { pageDecBtn }
                        { renderPageNumbers }
                        { pageIncBtn }
                        <li className={currentPage == pages.length ? "page-item disabled" : "page-item"}><a className="page-link" onClick={handleNextButton} >Next</a></li>
                    </ul>
                </nav>
                <div className="p-1 mb-3 text-right">
                    <select id="Select" className="btn btn-secondary"  onChange={handleResultChange} >
                        <option value="none" defaultValue disabled hidden>
                            Results Per Page
                        </option>
                        <option value="10" >10</option>
                        <option value="25" >25</option>
                        <option value="50" >50</option>
                        <option value="100" >100</option>
                        <option value="150" >150</option>
                    </select>
                </div>
                <table className="table table-hover table-bordered table-striped">
                    <thead className="thead-dark">
                        <tr>
                        <th scope="col" className="align-middle">Bank</th>
                        <th scope="col" className="align-middle">IFSC</th>
                        <th scope="col" className="align-middle">Branch</th>
                        <th scope="col" className="align-middle">Bank ID</th>
                        <th scope="col" className="align-middle text-center">Address</th>
                        <th scope="col" className="align-middle w-25 text-center">Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        <DataRow isLoading={isLoading} items={currentItems} />
                    </tbody>
                </table>
            </div>
            <div className='p-2 d-flex justify-content-end'>
                
            </div>
        </div>
    )
}

export default Table

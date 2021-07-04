import React from 'react'
import Navbar from '../Components/Home/Navbar/Navbar';
import Table from '../Components/Home/Table/Table';
function Home() {
    return (
        <div>
            <div className="container-fluid">
                <Navbar/>
                <Table/>
            </div>
        </div>
    )
}

export default Home

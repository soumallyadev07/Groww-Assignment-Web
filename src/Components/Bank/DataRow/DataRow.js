import React from 'react'

function DataRow( { items, isLoading } ) {
    return isLoading ? (<h1>Loading...</h1>) : (
        <>
            {items.map(item => (
                        <tr key={item.ifsc} style={{fontSize: "12px"}}>
                            <td className="align-middle">{ item.bank_name }</td>
                            <td className="align-middle">{ item.ifsc }</td>
                            <td className="align-middle">{ item.branch }</td>
                            <td className="align-middle">{ item.bank_id }</td>
                            <td className="align-middle text-center">{ item.address }</td>
                            <td className="align-middle text-center">
                                <button type="button" className="btn btn-info btn-sm" data-toggle="modal" data-target={ "#" + item.ifsc } >More Details</button>
                            </td>
                            <div className="modal fade" id={ item.ifsc } tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel" >Full Details</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <p><strong>Bank Name: </strong>{ item.bank_name }</p>
                                        <p><strong>Bank ID: </strong>{ item.bank_id }</p>
                                        <p><strong>IFSC: </strong>{ item.ifsc }</p>
                                        <p><strong>Branch: </strong>{ item.branch }</p>
                                        <p><strong>Address: </strong>{ item.address }</p>
                                        <p><strong>City: </strong>{ item.city }</p>
                                        <p><strong>District: </strong>{ item.district }</p>
                                        <p><strong>State: </strong>{ item.state }</p>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </tr>
            ))}
        </>
    )
}

export default DataRow
